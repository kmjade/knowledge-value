---
title: ROS2集成开发环境搭建
status: active
priority: medium
tags: [esp32/examples, ros2/development]
aliases: [ROS2集成开发环境搭建, 开发环境]
created: 2026-02-19
modified: 2026-02-19
source: https://www.yahboom.com/public/upload/upload-html/1706344007/ROS2集成开发环境搭建.html
related:
  - [[MicroROS机器人控制板]]
  - [[ROS2安装Humble]]
  - [[ROS2工作空间]]
---

# ROS2集成开发环境搭建

> 理论上，在ROS2中，只需要记事本就可以编写基本的ROS2程序，但是为了提高开发效率，可以安装集成开发环境，这里推荐使用：vscode。

---

## 1、使用vscode

由于本章的教程案例会在docker容器内演示，所以这里讲解如何配置vscode访问docker来做开发。这部分教程在前面章节【Docker----6、docker中机器人开发环境搭建----6.2、使用vscode访问docker】已有，这里不再赘述。

如果读者不需要在docker中进行开发，是直接在小车上开发，只需忽略教程中关于vscode操作docker的内容即可。其它步骤基本一样。

---

## 2、使用终端

在ROS2中，需要频繁的使用到终端，推荐一款较为好用的终端：Terminator，效果如下：

![image-20231023123012987](https://www.yahboom.com/public/upload/upload-html/1706344007/image-20231023123012987.png)

### 2.1 安装

```bash
sudo apt install terminator
```

### 2.2 启动

快捷键 `Ctrl+Alt+T` 启动。

### 2.3 Terminator 常用快捷键

**关于在同一个标签内的操作：**

| 快捷键 | 说明 |
| --- | --- |
| Alt+Up | 移动到上面的终端 |
| Alt+Down | 移动到下面的终端 |
| Alt+Left | 移动到左边的终端 |
| Alt+Right | 移动到右边的终端 |
| Ctrl+Shift+O | 水平分割终端 |
| Ctrl+Shift+E | 垂直分割终端 |
| Ctrl+Shift+Right | 在垂直分割的终端中将分割条向右移动 |
| Ctrl+Shift+Left | 在垂直分割的终端中将分割条向左移动 |
| Ctrl+Shift+Up | 在水平分割的终端中将分割条向上移动 |
| Ctrl+Shift+Down | 在水平分割的终端中将分割条向下移动 |
| Ctrl+Shift+S | 隐藏/显示滚动条 |
| Ctrl+Shift+F | 搜索 |
| Ctrl+Shift+C | 复制选中的内容到剪贴板 |
| Ctrl+Shift+V | 粘贴剪贴板的内容到此处 |
| Ctrl+Shift+W | 关闭当前终端 |
| Ctrl+Shift+Q | 退出当前窗口，当前窗口的所有终端都将被关闭 |
| Ctrl+Shift+X | 最大化显示当前终端 |
| Ctrl+Shift+Z | 最大化显示当前终端并使字体放大 |
| Ctrl+Shift+N or Ctrl+Tab | 移动到下一个终端 |
| Ctrl+Shift+P or Ctrl+Shift+Tab | 移动到之前的一个终端 |

**关于各个标签之间的操作：**

| 快捷键 | 说明 |
| --- | --- |
| F11 | 全屏开关 |
| Ctrl+Shift+T | 打开一个新的标签 |
| Ctrl+PageDown | 移动到下一个标签 |
| Ctrl+PageUp | 移动到上一个标签 |
| Ctrl+Shift+PageDown | 将当前标签与其后一个标签交换位置 |
| Ctrl+Shift+PageUp | 将当前标签与其前一个标签交换位置 |
| Ctrl+Plus (+) | 增大字体 |
| Ctrl+Minus (-) | 减小字体 |
| Ctrl+Zero (0) | 恢复字体到原始大小 |
| Ctrl+Shift+R | 重置终端状态 |
| Ctrl+Shift+G | 重置终端状态并clear屏幕 |
| Super+g | 绑定所有的终端，以便向一个输入能够输入到所有的终端 |
| Super+Shift+G | 解除绑定 |
| Super+t | 绑定当前标签的所有终端，向一个终端输入的内容会自动输入到其他终端 |
| Super+Shift+T | 解除绑定 |
| Ctrl+Shift+I | 打开一个窗口，新窗口与原来的窗口使用同一个进程 |
| Super+i | 打开一个新窗口，新窗口与原来的窗口使用不同的进程 |

---

## 3、使用git

### 3.1 安装

日常工作中，因为都是团队协作，且涉及版本管理，所以git是绕不开的技能。git 是一个免费和开源的分布式版本控制系统，在Ubuntu下安装git：

```bash
sudo apt install git
```

### 3.2 Git 基本操作

Git 的工作就是创建和保存你项目的快照及与之后的快照进行对比。

本章将对有关创建与提交你的项目快照的命令作介绍。

Git 常用的是以下6个命令：**git clone**、**git push**、**git add**、**git commit**、**git checkout**、**git pull**，后面我们会详细介绍。

![img](https://www.yahboom.com/public/upload/upload-html/1706344007/git-command.jpg)

**说明：**
- workspace：工作区
- staging area：暂存区/缓存区
- local repository：版本库或本地仓库
- remote repository：远程仓库

一个简单的操作步骤：

```bash
$ git init
$ git add .
$ git commit
```

- `git init` - 初始化仓库
- `git add .` - 添加文件到暂存区
- `git commit` - 将暂存区内容添加到仓库中

#### 3.2.1 创建仓库命令

下表列出了git创建仓库的命令：

| 命令 | 说明 |
| --- | --- |
| `git init` | 初始化仓库 |
| `git clone` | 拷贝一份远程仓库，也就是下载一个项目 |

#### 3.2.2 提交与修改

下表列出了有关创建与提交你的项目的快照的命令：

| 命令 | 说明 |
| --- | --- |
| `git add` | 添加文件到暂存区 |
| `git status` | 查看仓库当前的状态，显示有变更的文件 |
| `git diff` | 比较文件的不同，即暂存区和工作区的差异 |
| `git commit` | 提交暂存区到本地仓库 |
| `git reset` | 回退版本 |
| `git rm` | 将文件从暂存区和工作区中删除 |
| `git mv` | 移动或重命名工作区文件 |
| `git checkout` | 分支切换 |
| `git switch` (Git 2.23 版本引入) | 更清晰地切换分支 |
| `git restore` (Git 2.23 版本引入) | 恢复或撤销文件的更改 |

#### 3.2.3 提交日志

| 命令 | 说明 |
| --- | --- |
| `git log` | 查看历史提交记录 |
| `git blame <file>` | 以列表形式查看指定文件的历史修改记录 |

#### 3.2.4 远程操作

| 命令 | 说明 |
| --- | --- |
| `git remote` | 远程仓库操作 |
| `git fetch` | 从远程获取代码库 |
| `git pull` | 下载远程代码并合并 |
| `git push` | 上传远程代码并合并 |

关于更多git工具的使用可以在终端下输入：`git --help` 查看帮助文档。

---

## 相关文档

- [[ROS2安装Humble]] - ROS2安装步骤
- [[ROS2工作空间]] - 工作空间管理
- [[ROS2常用命令工具]] - 命令参考
