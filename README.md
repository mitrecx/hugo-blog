新建博客文章:
```bash
# 创建新文章，content 后面的路径是文章存放的目录，xxx.md 是文件名, 可自定义
hugo new content/post/2025/xxx.md
```

编译博客为静态页面:
```bash
# -D 表示包含草稿文章，编译所有内容
hugo -D
```

启动本地服务器预览:
```bash
hugo server -D
```