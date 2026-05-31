---
title: "【obsidian指南】配置obsidian git插件，实现obsidian数据定时同步到github仓库(Mac电脑)"
source: "https://blog.csdn.net/qq_41653564/article/details/156830834"
author:
  - "[[qq_41653564]]"
published: 2026-01-11
created: 2026-05-29
description: "文章浏览阅读3.7k次，点赞14次，收藏23次。最近学了AI agent应用，想着将自己存储在obsidian上的本地笔记数据让大模型能访问到，于是打算利用obsidian工具 + github私有库的方式去实现，之前都是用现成在线知识库，所以记录下这次配置经验。(MAC电脑端)在obsidian输入快捷键\"_obsidian github"
tags:
  - "clippings"
---
### 背景

最近学了AI agent 应用，想着将自己存储在obsidian上的本地笔记数据让大模型能访问到，于是打算利用obsidian工具 + github私有库的方式去实现，之前都是用现成在线知识库，所以记录下这次配置经验。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/88e7f0d18cad4fc5a9fd03503f2b3c54.png)

### 步骤

**以下步骤——默认，电脑里已经下载了obsidian工具哈。相关版本如下⬇️**

| 类型 | 名称 |
| --- | --- |
| 操作系统 | mac os(非移动端) |
| obsidian版本 | version 1.10.6 |

#### Step-1 下载插件

**1.1 进入obsidian界面，点击左下角设置**  

**1.2 开启安全模式(当前，是已开启状态)，同时，点击"浏览插件市场"，搜索“git”并确认正确的工具名(如下图)，然后安装。**  
。

  

#### Step-2 配置obsidian

**⚠️⚠️这边是默认电脑里已经安装了 `git 工具` 了，没安装的伙伴需要在网上自寻搜索mac安装git工具的方式。具体，检验电脑里是否有git工具，则电脑新建一个命令行输入： `git --version` 。**

  
  
**2.1 Obsidian初始化仓库**  
➡️➡️ **(MAC电脑端)输入快捷键" `Cmd + P` "，搜索栏输入 `Git: Initialize a new repo` ，进行初始化。**

➡️➡️ **确认是否初始化完成：(MAC电脑端)输入快捷键" `Cmd + P` "，搜索栏输入 `Git: Open source control view` ，出现下面类似结构，说明初始化完成**  
  
  
**2.2 Obsidian配置github关联**  
➡️➡️ **(MAC电脑端)输入快捷键" `Cmd + P` "，搜索栏输入 `Git: Edit remotes` ，Remote name选 `origin` ，url格式： `https://github.com/你的用户名/你的仓库名.git` 。**  
  
➡️➡️ **(MAC电脑端)输入快捷键" `Cmd + P` "，搜索栏输入 `Git: Set upstream branch` ，选择： `origin/main` ，完成主分支设置(只需要设置一次)。**  

**2.3 Obsidian传输文件到github**  
➡️➡️ **方法一：命令行传输**  
(MAC电脑端)在obsidian输入快捷键" `Cmd + P` "，然后搜索栏输入 `Git: Commit all changes` 。  

➡️➡️ **方法二：手动提交传输**  
  

#### Step-3 配置obsidian插件(mac版)

**3.1 进入插件设置**  
![](https://i-blog.csdnimg.cn/direct/bbc03df0a3f045c690d1b4990e8c368c.png)

**3.2 按照以下解释，进行心仪配置**  
![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/bcbf652cacad4aaf892bfb4427af17fb.png#pic_center)

**3.3 配置.gitignore**  
**使得上传到github的信息是有价值的，而不是，包含一些没必要的信息。mac电脑打开obsidian，输入快捷键" `Cmd + P` "，搜索栏选择下图指令，复制下面的代码，然后保存** 。  

```python
############################
# Obsidian - 必须忽略（强烈推荐）
############################

# 工作区状态（窗口/当前文件/布局，多设备必冲突）
.obsidian/workspace
.obsidian/workspace.json

# 缓存文件（无价值，可再生）
.obsidian/cache/
.obsidian/index.db
.obsidian/index.db-shm
.obsidian/index.db-wal

############################
# Obsidian - 可选忽略
############################

# 同步/发布相关（你不用官方 Sync/Publish 可忽略）
.obsidian/graph.json
.obsidian/appearance.json

############################
# 系统垃圾
############################

.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes

############################
# 编辑器/临时文件
############################

*.tmp
*.temp
*.bak
*.swp
*.swo

############################
# 日志
############################

*.log

python运行123456789101112131415161718192021222324252627282930313233343536373839404142434445464748
```

### 参考信息

[1-让 Obsidian 笔记拥有 Git 的力量：版本控制+自动同步一步到位](https://blog.csdn.net/m0_73735578/article/details/153405272)  
[2-Obsidian通过github实现同步（Obsidian Git）](https://zhuanlan.zhihu.com/p/657924375)  
[3-Obsidian Git 改名为 Git 了？启用该插件后如何配置？](https://forum-zh.obsidian.md/t/topic/33184)  
[4-chat gpt如何安装obsidian 插件](https://chatgpt.com/share/69636ddd-3400-8005-8e8f-7a3cc324dd20)