---
title: "Obsidian Git 改名为 Git 了？启用该插件后如何配置？"
source: "https://forum-zh.obsidian.md/t/topic/33184/20"
author:
  - "[[NaN0921]]"
published: 2024-04-16
created: 2026-05-29
description: "请仔细说明自己遇到的问题，以下是参考模板。这里不要求非得按模板发帖，但内容中包含相关要素能让大家更好地帮助你。 遇到的问题 我在网上找到了用GitHub备份obsidian的教程，其中写道需要一个名为“Obsidian Git”的插件，但是在community plugin里面"
tags:
  - "clippings"
---
请仔细说明自己遇到的问题，以下是参考模板。这里不要求非得按模板发帖，但内容中包含相关要素能让大家更好地帮助你。

---

# 遇到的问题

我在网上找到了用GitHub备份obsidian的教程，其中写道需要一个名为“Obsidian Git”的插件，但是在community plugin里面只搜到了同作者名的“Git”，而没有“Obsidian Git”。

下载安装Git并enable之后，点进相应的设置页面，显示“Git is not ready. When all settings are correct you can configure auto backup, etc."。

但是搜到的所有教程上，enable之后都是直接设置backup的时间间隔，而没有其他的配置指导。

想请问一下可以怎么实现git同步？

---

## Comments

> **Azona77** · [2024-04-16](https://forum-zh.obsidian.md/t/topic/33184/2)
> 
> 楼主检查一下插件设置内有没有添加git的路径

> **NaN0921** · [2024-04-16](https://forum-zh.obsidian.md/t/topic/33184/3)
> 
> 有，但是不知道怎么配置qwq，或许有教程帖子推荐吗？  
> 
> [![Screenshot 2024-04-15 at 7.36.15 PM](https://forum-zh.obsidian.md/uploads/default/optimized/2X/8/8fcb7698ebaaf18d3a43a1083c409c0ce2da6ee1_2_290x500.png)
> 
> Screenshot 2024-04-15 at 7.36.15 PM920×1582 128 KB
> 
> ](https://forum-zh.obsidian.md/uploads/default/original/2X/8/8fcb7698ebaaf18d3a43a1083c409c0ce2da6ee1.png "Screenshot 2024-04-15 at 7.36.15 PM")

> **Azona77** · [2024-04-16](https://forum-zh.obsidian.md/t/topic/33184/4)
> 
> 就是在下面Custom Git binary path还是Custom Git directory path来着的，填上你的安装路径

> **NaN0921** · [2024-04-16](https://forum-zh.obsidian.md/t/topic/33184/5)
> 
> 请问是vault的位置吗？

> **Azona77** · [2024-04-16](https://forum-zh.obsidian.md/t/topic/33184/6)
> 
> 是你的Git安装目录

> **NaN0921** · [2024-04-16](https://forum-zh.obsidian.md/t/topic/33184/7)
> 
> 我没有安装git，只是用终端配置过，这样是不能使用git同步功能吗？

> **Azona77** · [2024-04-16](https://forum-zh.obsidian.md/t/topic/33184/8) · 1 likes
> 
> 具体我也不清楚了 我是填上Git安装路径就可用了

> **NaN0921** · [2024-04-16](https://forum-zh.obsidian.md/t/topic/33184/9)
> 
> 好的谢谢你的回复，我再看看～

> **Probe** · [2024-04-16](https://forum-zh.obsidian.md/t/topic/33184/10)
> 
> 这插件自己没带一套 “完整的 git 程序”,  
> 它只是借你系统里的现成 git, 所以得在操作系统里, 事先安装好 git
> 
> [Git - 安装 Git 160](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)
> 
> > 只搜到了同作者名的“Git”，而没有“Obsidian Git”。
> 
> 就是同一个, 可能因为 Ob 官方要求所有社区插件不许带 “Obsidian” 字样

> **青柠** · [2024-04-16](https://forum-zh.obsidian.md/t/topic/33184/11)
> 
> 你应该还没有把笔记备份到github，当第一次把所有笔记推送到远程仓库后，后面写笔记ob的Git插件就可以自动推送push了，设置以下自动推送间隔时间就行了

> **jasondev324** · [2024-06-21](https://forum-zh.obsidian.md/t/topic/33184/12)
> 
> 我没有这个 git path咋搞啊

> **Azona77** · [2024-06-21](https://forum-zh.obsidian.md/t/topic/33184/13)
> 
> 就是你的git安装路径，安装一个git

> **ki** · [2024-07-17](https://forum-zh.obsidian.md/t/topic/33184/14)
> 
> 楼主解决了吗，我也遇到了同样的问题

> **02546** · [2024-08-29](https://forum-zh.obsidian.md/t/topic/33184/16)
> 
> 配置了，但是无法运行git指令，这么提示的。。。。巨烦啊

> **ZoZou** · [2024-09-01](https://forum-zh.obsidian.md/t/topic/33184/18)
> 
> 创建git仓库了吗，我这边git装在默认路径，没配置也行

> **Edgar** · [2024-11-11](https://forum-zh.obsidian.md/t/topic/33184/19)
> 
> github 换成ssh的模式就可以了，如果你将git加入到了环境变量，git插不需要任何配置的

> **guohc** · [2024-11-13](https://forum-zh.obsidian.md/t/topic/33184/20) · 1 likes
> 
> [![image](https://forum-zh.obsidian.md/uploads/default/optimized/3X/8/7/87519587b6a3d3da839a761045c0867c2e785ce8_2_690x491.png)
> 
> image1648×1173 116 KB
> 
> ](https://forum-zh.obsidian.md/uploads/default/original/3X/8/7/87519587b6a3d3da839a761045c0867c2e785ce8.png "image")
> 
>   
> 试试这个

> **trayxie** · [2025-08-08](https://forum-zh.obsidian.md/t/topic/33184/21)
> 
> 太有用了，谢谢你