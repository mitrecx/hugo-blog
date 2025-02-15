---
date: '2025-02-09T12:50:38+08:00'
draft: false
title: '基于Flask和火山引擎豆包大模型实现chatbot'
categories:
  - 聊天机器人
---
## 1 效果预览
实现效果图:
![基于Flask和火山引擎豆包大模型实现chatbot效果图](/images/2025/250209_demo_chatbot.gif)

[体验一下](http://101.132.158.23:5000/chat)

[附: 源码地址](https://github.com/mitrecx/FlaskApp)



## 2 前提条件

### 2.1 环境准备
- Python 3.11+
- Flask 3.1.0
- PyCharm 或其他 IDE

### 2.2 火山引擎豆包大模型账号注册
在[火山引擎官网](https://www.volcengine.com/)上注册并登录，然后在控制台中找到“豆包大模型”服务，创建应用并获取API Key和Secret Key。



## 3 实现步骤


### 3.1 搭建项目
使用 PyCharm 创建一个 Flask 项目. (或其他 IDE 创建一个 Python 项目，并[安装 Flask](https://flask.palletsprojects.com/en/stable/installation/#))

项目目录结构如下：
<img src="/images/2025/250211_project_arch.png" alt="描述" width="400"/>

主要有
- app.py 负责处理请求，并调用火山引擎豆包大模型API。
- templates 目录下的 html 文件负责前端展示。
- 项目中涉及的依赖在 requirements.txt 文件中。

### 3.2 代码编写

`app.py`的文件的核心代码如下.


数据库使用 sqlite, 初始化部分如下:
```python
# ...
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chat.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# 数据模型
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)


class ChatSession(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now)
    is_used = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # 关联用户
    messages = db.relationship('ChatMessage', backref='session', lazy='dynamic')


class ChatMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.String(36), db.ForeignKey('chat_session.id'))
    role = db.Column(db.String(10))
    content = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.now)

# 初始化数据库
with app.app_context():
    db.create_all()

#...
```

新用户注册功能:
```python
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        hashed_pw = generate_password_hash(password)
        if User.query.filter_by(username=username).first():
            flash('用户名已存在')
            return redirect(url_for('register'))
        new_user = User(username=username, password=hashed_pw)
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        return redirect(url_for('chat'))
    return render_template('register.html')

```

登录/登出功能:
```python

# 登录路由
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('chat'))
        flash('用户名或密码错误')
    return render_template('login.html')


# 登出路由
@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"success": True}), 200
```

聊天页面:
```python
@app.route('/chat')
@login_required
def chat():
    sessions = ChatSession.query.filter_by(user_id=current_user.id).order_by(ChatSession.created_at.desc()).all()
    session_data = []
    for s in sessions:
        last_msg = s.messages.order_by(ChatMessage.timestamp.desc()).first()
        session_data.append({
            "id": s.id,
            "created_at": s.created_at.strftime("%Y-%m-%d %H:%M"),
            "preview": last_msg.content[:20] + '...' if last_msg else "新会话"
        })
    return render_template('chat.html', sessions=session_data)

```

创建聊天的会话, 这是为了让聊天机器人能记住上下文:
```python
@app.route('/create-session', methods=['POST'])
@login_required
def create_session():
    try:
        # 检查是否存在未使用的会话
        unused_session = ChatSession.query.filter_by(is_used=False, user_id=current_user.id).order_by(
            ChatSession.created_at.desc()).first()

        if unused_session:
            return jsonify({
                "success": True,
                "session_id": unused_session.id,
                "created_at": unused_session.created_at.strftime("%Y-%m-%d %H:%M"),
                "is_new": False  # 标记是否为新建
            })

        # 创建新会话
        response = client.context.create(
            model='ep-20250123190804-d927p',
            mode="session",
            messages=[{"role": "system", "content": "你是豆包，是由字节跳动开发的 AI 人工智能助手"}],
            ttl=datetime.timedelta(minutes=60)
        )
        token = response.id

        new_session = ChatSession(id=token, is_used=False, user_id=current_user.id)
        db.session.add(new_session)
        db.session.commit()

        return jsonify({
            "success": True,
            "session_id": token,
            "created_at": new_session.created_at.strftime("%Y-%m-%d %H:%M"),
            "is_new": True
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

```

聊天流式接口, 实现流式返回对话结果:
```python
@app.route('/chat-stream', methods=['POST'])
def chat_stream():
    # 在生成器外部捕获所有请求数据
    token = request.headers.get('X-Auth-Token')
    user_content = request.json.get('message', '')

    # 标记会话已使用
    current_session = ChatSession.query.get(token)
    if current_session and not current_session.is_used:
        current_session.is_used = True
        db.session.commit()

    # 保存用户消息到数据库
    user_msg = ChatMessage(
        session_id=token,
        role='user',
        content=user_content
    )
    db.session.add(user_msg)
    db.session.commit()  # 立即提交用户消息

    # 创建生成器函数并保持上下文
    def generate():
        # 使用流式API获取回复
        stream = client.context.completions.create(
            context_id=token,
            model='ep-20250123190804-d927p',
            messages=[{"role": "user", "content": user_content}],
            stream=True
        )

        full_response = []
        for chunk in stream:
            if chunk.choices and chunk.choices[0].delta.content:
                content = chunk.choices[0].delta.content
                full_response.append(content)
                yield content  # 流式返回内容

        # 流结束后保存AI回复
        ai_msg = ChatMessage(
            session_id=token,
            role='assistant',
            content=''.join(full_response)
        )
        db.session.add(ai_msg)
        db.session.commit()

    # 使用stream_with_context保持请求上下文
    return Response(stream_with_context(generate()), mimetype='text/plain')

```


## 4 部署
部署到 Alibaba Cloud Linux 机器上，使用 Gunicorn 作为 WSGI HTTP 服务器。
```bash
# 先登录到服务器上然后依次执行下面命令

# 1. 创建项目目录
mkdir /opt/myapp/

# 2. 把项目代码(FlaskApp)传入 /opt/myapp/

# 3. 进入项目目录并安装依赖
cd /opt/myapp/FlaskApp
pip install -r requirements.txt

# 4. 安装gunicorn
pip install gunicorn

# 5. 创建 Gunicorn 服务文件
sudo vim /etc/systemd/system/myflask.service
```
把下面内容写入到文件中:
```
[Unit]
Description=Gunicorn Flask App
After=network.target

[Service]
EnvironmentFile=/opt/myapp/FlaskApp/.env
User=josie
WorkingDirectory=/opt/myapp/FlaskApp
ExecStart=/opt/myapp/FlaskApp/venv/bin/gunicorn --bind 0.0.0.0:5000 app:app

[Install]
WantedBy=multi-user.target
```

```bash
# 6. 启动 Gunicorn 服务
sudo systemctl daemon-reload
sudo systemctl start flaskapp
sudo systemctl enable flaskapp

# 7. 查看服务状态
systemctl status myflask
```