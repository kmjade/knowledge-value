---
title: "封神组合！Claude Code+LLM Wiki+Obsidian 一站式打通 AI 知识库"
source: "https://mp.weixin.qq.com/s/d-z-QLUF7g0aL4LorqYykg"
author:
  - "[[偶偶偶偶偶然]]"
published:
created: 2026-05-26
description: "之前分享过关于 hermes，LLM wiki，Obsidian 相关的文章。但我发现了一些缺陷。"
compiled: false
tags:
  - "clippings"
triaged: true
triaged_at: 2026-05-27T09:00:56
triaged_to: ai-ml
---
偶偶偶偶偶然 *2026年5月26日 20:00*

### 大家好，我是偶然，AI洞察，AI智能体，AI实战案例分享

****👇点击关注，每** 篇文章能给你带来一定的收获 **👇****

之前分享过关于 hermes，LLM wiki，Obsidian 相关的文章。

但我发现了一些缺陷。

其一：有三个软件，搞一个知识库需要三个软件，切来切去的非常的麻烦，至少我觉得很烦。

其二：就是如果用软件来实现 LLM wiki ，那它是固定的一个知识库处理工作流，没办法改动。

这里我再解释一下 LLM wiki 它的作用是什么先。

LLM wiki 这个概念主要是 Karpathy 大神提出来的，它最大的作用就是给知识库装上记忆的工作流。

因为 obsidian 是一个静态的知识库，它并没有记忆。

这就会导致每次你使用 Claude Code 去调用 obsidian 的时候，它就需要几乎查看你整个的知识库，这就会非常的烧 token，运行的速度也非常的慢。

LLM wiki 我认为最大的作用就是为整个知识库加上记忆，这样就算你的 Agent 由于上下文过长，导致失去记忆，也能通过 LLM wiki 迅速知道你的整个知识库。

一旦给知识库加上了记忆，在 AI 访问的时候就能非常迅速的定位到你想要的内容，同时极大程度减少 Token 的消耗。

因为 wiki 带了记忆，所以我就不再使用 hermes 了，而是直接采用 Claude Code 就行了，再加上用 skills 的方式来实现 wiki ，这样这三个东西就都在一个软件中，不再需要切来切去。

（文章中的 skills 感兴趣的找我拿就好啦！）

### Obsidian

Obsidian，是一个本地私有、纯文件管理、双向链接的超强笔记 / 知识库软件。

首先我们安装 Obsidian 打开：https://obsidian.md/download

![[Pasted image 20260526204224.png]]

下载完成后，我们在本地建立一个知识库的仓库，我建立了三个知识库，有点多，后续我会把它们整合成一个。

![[Pasted image 20260526204258.png]]

然后输入名称，选择存放的位置，要记得存放在哪里。

![[Pasted image 20260526204316.png]]

创建成功后就会出现一个这样的界面，这样就是创建好了。

![[Pasted image 20260526204332.png]]

### Claude Code

因为 wiki 已经能解决记忆的问题了，所以我不再使用 hermes ，而是直接选用 Claude Code 。

安装 Claude Code 其实只要安装 Claudian 插件就可以了

Claudian 插件可以在github 上下载，也可以关注我，然后回复【Claudian】获得这个插件。

然后找到知识库的这个专门存放插件的目录，把这个插件放在这个目录下面。

![[Pasted image 20260526204416.png]]

完成插件的存放之后，我重启一下 obsidian ，选择信任一下仓库的插件。

![[Pasted image 20260526204436.png]]

然后点击设置把安全模式关闭，然后打开 Claudian ，然后设置。

![[Pasted image 20260526204506.png]]

我们打开 Ton API ：https://sub2api.sgyer.cn/ 找到 API 密钥。

![[Pasted image 20260526204522.png]]

然后我们点击创建密钥。

![[Pasted image 20260526204612.png]]

然后我们点击使用密钥。

![[Pasted image 20260526204630.png]]

然后我们回到 Claudian 插件，选择 Claude ，把刚才的密钥复制进行。

![[Pasted image 20260526204651.png]]

配置完模型之后，再打开聊天窗口就可以使用 Claude Code 了。

![[Pasted image 20260526204708.png]]

### Wiki

Wiki 才是本文的重中之重，而且在知识库中它也是重中之重，它决定了你的知识库能用到什么一个程度。

我们先看一下 karpathy 的原文。

![[Pasted image 20260526204727.png]]

可以看到他是由 Ingest，Query，Lint ，输入，查询，检索来组成 wiki 这个工作流的。

Ingest：负责输入，内容整理，比如给内容打标签，关联，上摘要，索引等。

Query：内容的搜索，生成图标等。

Lint：维护整个知识库的情况，有没有死链，不关联的链接。

之前我是直接用 wiki 软件来实现 karpathy 所说的 wiki 思想，但这里会有一个特别大的问题。

就是 Ingest ，Query，Lint 这些功能是固定的，没办法更改的。

什么意思呢？

就比如说 Ingest 输入，我不想给上传到 wiki 的内容打上标签，软件是没办法更改这个的，它的 Ingest 功能就是会打上标签。

就是因为软件这种不灵活的方式，所以我选择采用 Skills 的方式来实现 Ingest，Query，Lint 这三个功能，再组合起来形成 wiki 工作流。

实现方式：

首先我们需要在 Obsidian 知识库中建立 wiki 的目录。

![[Pasted image 20260526204818.png]]

Raw 输入：

Articles：文章（我一般放飞书文档，公众号文章）。

Papers：论文。

Transcripts：存放转录文本原稿语音转文字、会议纪要、对话录音文稿、访谈台词、视频字幕、口述记录、聊天原始文本。

Meeting\_notes：会议记录。

Archive：原文存档（比如处理完 Articles 的文章后会存档到这里）。

Assets：存放静态原始资源文件图片、截图、音频、视频、图标、附件、素材原图、设计文件、本地资源。

wiki 处理：

Concepts：概念，可以理解为某个观点的解释。

Entities：物品、地点、建筑、人名关键实体对象。

Sources：从 raw 原始资料提炼后的精简版的摘要。

Bridge：与原知识库打通，轻关联文档。

Index：索引，快速查找摘要，实体，概念。

Log：wiki 的操作日志，比如 Lint 修复操作，Ingest 输入操作，用于溯源。

以上这个目录是我自己搭建的，大家可以根据自己的情况来搭建目录，如果你是用 wiki 软件的话，哪目录软件会帮你搭建好。

目录搭建完成后，我们就要给 obsidian 加上 skills 了。

我们找到知识库.claude 下的 skills 的文件把这三个 skills 放进去。

![[Pasted image 20260526204842.png]]

然后我们在 Claudian 中 / 然后相关的 skills 就可以使用了。

![[Pasted image 20260526204857.png]]

到这里，我们就彻底在一个软件中打通了 claude code ，obsidian，LLM wiki 。

### 总结

本文中 skills 实现 wiki 的方式非常的灵活，目录和相关功能都可以更改。

这里我只是举例了我自己常用的一个 wiki 目录，大家可以根据自己的情况调整 wiki 目录，以及 ingest，lint，query 技能。

文章中的 skills 感兴趣的找我拿就好啦！

本期的内容就到这里了，感谢你的耐心。

如果看完喜欢，请帮忙转发分享一下，你的点赞转发，就是我更新下去的动力



[只用 8 个插件，我的 Obsidian 直接变超级知识库](https://mp.weixin.qq.com/s?__biz=MzAwOTc0MjE2Nw==&mid=2247487736&idx=1&sn=c47c5ff37e1fe00cf0704e3a92c840c3&scene=21#wechat_redirect)

[建议每个人都尽早用 AI 搭建个人知识库](https://mp.weixin.qq.com/s?__biz=MzAwOTc0MjE2Nw==&mid=2247487686&idx=1&sn=59114822ddfec8e2ab4ab1b1e3843bc8&scene=21#wechat_redirect)

[终于搞定！Obsidian 完美打通微信，一键同步](https://mp.weixin.qq.com/s?__biz=MzAwOTc0MjE2Nw==&mid=2247487769&idx=1&sn=53cd63d4cb30345934bdabdc01f32a17&scene=21#wechat_redirect)

