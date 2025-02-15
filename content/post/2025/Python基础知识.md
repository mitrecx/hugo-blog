---
date: '2025-02-14T01:02:32+08:00'
draft: false
title: 'Python基础知识'
categories: ["Python语言基础"]
tags: ["Python语言基础"]
---
# Python基础知识

## 1. 环境搭建

### 1.1 Python 安装与配置
	
- Homebrew(`brew install python`)命令安装：适合 Mac 用户。
- [官方 Python 安装包](https://www.python.org/downloads/)：直接从 Python 官网下载安装，适合直接使用 Python。
- Miniconda/Anaconda：适合需要环境管理和科学计算库的用户。
- pyenv：适合需要管理多个 Python 版本的用户。

### 1.2 IDE 选择 
- PyCharm, JetBrains 开发, 完全免费, 支持 AI 加持
- Visual Studio Code(VSCode), 微软开发, 完全免费, 支持 AI 加持
- Trae, 字节开发, 完全免费, 天生 AI 加持


### 1.3 虚拟环境管理
使用 venv（Python 内置）:
```bash
# 创建虚拟环境
python -m venv myenv

# 激活虚拟环境
source myenv/bin/activate

# 退出虚拟环境
deactivate
```

[使用 conda]({{< ref "post/2025/conda用法.md" >}})（推荐）:
```bash
# 创建虚拟环境
conda create -n myenv python=3.8    

# 激活虚拟环境
conda activate myenv

# 退出虚拟环境
conda deactivate
```


## 2. 基本语法
### 2.1 变量和数据类型 变量命名规则
- 只能包含字母、数字和下划线
- 不能以数字开头
- 区分大小写
- 不能使用 Python 关键字

```python
# 正确的命名
user_name = "张三"
age = 25
_private = "私有变量"

# 错误的命名
2user = "错误"  # 不能以数字开头
user-name = "错误"  # 不能使用连字符
```

基本数据类型
```python
# 数字类型
integer = 42  # 整数
float_num = 3.14  # 浮点数

# 字符串
string = "Hello, Python!"
multiline = """多行
字符串"""

# 布尔值
is_true = True
is_false = False

# 列表
my_list = [1, 2, 3, "Python"]

# 元组
my_tuple = (1, 2, 3)

# 字典
my_dict = {"name": "张三", "age": 25}

# 集合
my_set = {1, 2, 3}
```

### 2.2 运算符 
算术运算符

```python
a = 10
b = 3

print(a + b)  # 加法：13
print(a - b)  # 减法：7
print(a * b)  # 乘法：30
print(a / b)  # 除法：3.3333...
print(a // b) # 整除：3
print(a % b)  # 取余：1
print(a ** b) # 幂运算：1000
```

比较运算符
```python
print(a == b)  # 等于：False
print(a != b)  # 不等于：True
print(a > b)   # 大于：True
print(a < b)   # 小于：False
print(a >= b)  # 大于等于：True
print(a <= b)  # 小于等于：False
```

### 2.3 注释规范 
单行注释
```python
# 这是一个单行注释
x = 1  # 行尾注释


"""
这是多行注释
可以写多行
Python 文档字符串
"""

def calculate_area(radius):
    """
    计算圆的面积
    
    参数:
        radius (float): 圆的半径
    
    返回:
        float: 圆的面积
    """
    return 3.14 * radius ** 2
```

### 2.4 代码缩进
Python 使用缩进来表示代码块，通常使用 4 个空格作为一个缩进级别：
```python
def check_number(n):
    if n > 0:
        print("正数")
        if n > 100:
            print("大于100")
    elif n == 0:
        print("零")
    else:
        print("负数")

# 错误的缩进示例
def wrong_indent():
print("这行会报错")  # IndentationError

```