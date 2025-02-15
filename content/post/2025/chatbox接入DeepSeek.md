---
date: '2025-02-15T23:51:34+08:00'
draft: false
title: 'Chatbox接入DeepSeek'
categories:
  - 聊天机器人
tags:
  - Chatbox
  - DeepSeek
---

## 1 下载安装 Chatbox

[Chatbox AI](https://chatboxai.app/zh) 是一款 AI 客户端应用和智能助手，支持众多先进的 AI 模型和 API，可在 Windows、MacOS、Android、iOS、Linux 和网页版上使用。
Chatbox 软件有多种用途，但作为一个模型 API 和 **本地模型的连接工具**，其主要功能是免费的。

可以在 [Chatbox AI](https://chatboxai.app/zh) 官网下载安装 Chatbox.


## 2 配置模型
因为 DeepSeek 是开源模型, 很多厂商都有提供 DeepSeek 的模型(且几乎都是免费的), 这里介绍两种方式获取 DeepSeek 模型服务. 
当然, 选择其他厂商或自己训练 DeepSeek 模型也是可以的.

从各个厂商获取 DeepSeek 模型服务就是获取 **访问三要素**:
1. **url**
2. **API Key**
3. **model 名称**

不管啥厂商, 获取方式都非常简单, 基本上在官网点几下鼠标就可以完成的.

### 2.1 通过火山引擎获取 DeepSeek 模型
进入[火山方舟](https://console.volcengine.com/ark), 创建 "接入点", 如下图:
![火山DeepSeek1](/images/2025/250215_chatbox2.png)

接入点创建完成后, 点击 "API 调用", 然后选择 "通过 API Key 授权", 如下图:
![火山DeepSeek2](/images/2025/250215_chatbox3.png)

至此, 拿到了访问三要素.

### 2.2 通过 NVIDIA NIM 获取 DeepSeek 模型
英伟达获取方式更简单, 直接在 [deepseek 模型页面](https://build.nvidia.com/deepseek-ai/deepseek-r1)上就能看到:
![英伟达DeepSeek](/images/2025/250215_chatbox4.png)

## 3 配置 Chatbox
> 操作步骤:
> "Settings" -> "Add Custom Provider" -> 填写信息(主要是url, api key, model)保存即可.

如下图:
![配置chatbox1](/images/2025/250215_chatbox1.png)
![配置chatbox2](/images/2025/250215_chatbox5.png)

## 4 测试

![测试chatbox](/images/2025/250215_chatbox6.gif)
可以在 "Settings" 中切换不同的模型, 测试效果.