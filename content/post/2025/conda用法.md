---
date: '2025-02-15T14:10:07+08:00'
draft: false
title: 'Conda用法'
tags: ['Conda', 'Python']
categories: ['Python']
---
# Conda环境管理完全指南

## 1 Conda 是什么
Conda 是一个开源的包管理器和环境管理工具，主要用于管理和部署软件包，尤其是 Python 和其他科学计算语言的包。它不仅可以安装和管理包，还可以管理环境，允许你创建独立的、可隔离的工作环境。还能自动解决软件包依赖关系。

环境隔离:
每个环境独立存储 Python 解释器 和 安装包.

例子: 
- 项目A 需要Python 3.6 + TensorFlow 1.x
- 项目B 需要Python 3.9 + TensorFlow 2.x
- 临时实验需要最新测试版工具

[Miniconda 下载地址与安装方法](https://docs.anaconda.com/miniconda/install/)

Miniconda 和 Anaconda 都是用于管理 Python 环境和包的工具，区别：
- Anaconda: 是一个完整的发行版，预安装了许多常用的科学计算和数据分析工具包，如 NumPy、Pandas、SciPy、Matplotlib、Jupyter 等。安装包非常大，通常有 3GB 以上。
- Miniconda: 是一个轻量级的发行版，只有 Conda 和 Python 本身，用户需要手动安装所需的其他包。它的安装包非常小，通常只有 100MB 左右。


## 2 命令详解

### 2.1 环境管理
```bash
# 创建指定Python版本的环境, -n/--name: 指定环境名称, python=3.8 表示指定 python 的版本为 3.8
conda create -n myenv python=3.8

# 进入/激活环境
conda activate myenv
# 退出环境
conda deactivate 

# 列出所有环境
conda info --envs
# 或者
conda env list


# 克隆现有环境, --clone: 克隆源环境
conda create --clone myenv -n myenv_backup

# 删除整个环境,  --all: 删除所有安装包
conda remove -n myenv --all
# 删除指定包 numpy
conda remove -n myenv numpy
```

### 2.2 包管理
```bash
# 查看已安装包列表
conda list

# 安装包
conda install package_name

# 批量安装多个包（-y自动确认）
conda install package_name1 package_name2 package_name3 -y
# -y: 自动确认安装

# 更新包
conda update package_name
# 更新所有包
conda update --all

# 卸载包
conda remove package_name
# 卸载所有包
conda remove --all
```

指定渠道下载包:
```bash
conda install -c pytorch pytorch=1.12.0
```
- `-c` 是 Conda 的一个选项，表示从指定的 **渠道（channel）**安装包。这里的 **pytorch 是 Conda 的一个官方渠道，专门提供与 PyTorch 相关的包**。通过指定 `-c pytorch`，你告诉 Conda 从这个渠道安装 PyTorch。
- 如果没有指定渠道，Conda 会默认从 **defaults** 渠道安装包。

**conda-forge** 是一个社区驱动的 Conda 包管理和发布渠道（channel），它提供了大量的开源软件包。与 Conda 默认的 defaults 渠道相比，conda-forge 由全球的开发者社区共同维护，目的是提供更广泛的包支持，尤其是一些较新的或者不在默认渠道中的包。

### 2.3 环境配置迁移
```bash
# 导出环境配置
conda env export > environment.yml
# > : 将输出重定向到文件

# 根据配置文件创建环境
conda env create -f environment.yml
# -f/--file: 指定配置文件路径
```

## 3 AI开发环境搭建实例

### 3.1 创建PyTorch环境
```bash
conda create -n pytorch_demo python=3.9
conda activate pytorch_demo

# 从pytorch官方源安装（-c参数指定源）
conda install pytorch torchvision torchaudio 
         -c pytorch -c conda-forge
```

### 3.2 环境配置文件示例
```yaml
# environment.yml
name: vision_project  # 环境名称
channels:             # 软件源列表
  - conda-forge
  - defaults
dependencies:         # 依赖项
  - python=3.8
  - opencv=4.5.5
  - numpy=1.21.2
  - pip:              # 混合使用pip安装
    - tensorflow==2.8.0
```

## 4 help
遇到问题？尝试运行 `conda --help` 查看所有支持命令！