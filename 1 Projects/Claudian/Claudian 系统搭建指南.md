---
title: Claudian 系统搭建指南
date: 2026-01-22
tags: [Claudian, Obsidian, 系统搭建, 教程]
para: projects
status: in-progress
language: zh-cn
---

# Claudian 系统搭建指南

> **来源**: [[0 Personals/📥 00_InBox/Obsidian +Claudian  搭建AI 时代下最好的知识管理方案.md]]
> **目标**: 15 分钟完成 Obsidian + Claudian 系统搭建

## 概述

本指南将教你如何从零开始搭建一个 AI 驱动的知识管理系统：
- ✅ **Obsidian** - 笔记软件
- ✅ **Claudian** - AI 插件
- ✅ **Claude Code** - AI 命令行工具
- ✅ **CC Switch** - AI 服务转发工具

前置需求：安装智谱 AI 配置见 [[1 Projects/Claudian/智谱 AI 配置实战.md]]

---

## STEP 1: 安装 Obsidian

### 1.1 下载软件

**Obsidian 是什么？**
- 一款免费的笔记软件
- 支持 Markdown 格式
- 最大特点：笔记互相链接，形成知识网络

**下载方式**
- 公众号后台回复「AI笔记系统」获取新手包
- 或访问 obsidian.md 官网下载

**系统要求**
- Mac 用户: `Obsidian-1.10.6.dmg`
- Windows 用户: `Obsidian-1.10.6.exe`
- 双击安装，一路下一步

### 1.2 下载数字仓库（开箱即用）

**这是什么？**
预配置好的仓库文件夹，包含：
- ✓ Claudian 插件
- ✓ 4 个 Skills 技能包
- ✓ MCP 服务器配置
- ✓ 快捷指令

你不需要手动安装任何插件，下载解压就能用！

**操作步骤**
1. 下载 `数字仓库.zip`
2. 解压到合适位置（推荐 **iCloud** 或 **OneDrive**，便于多设备同步）

### 1.3 用 Obsidian 打开仓库

1. 打开 Obsidian，看到欢迎界面
2. 左下角切换语言为「简体中文」
3. 点击「**打开本地仓库**」（重要：不是创建新仓库！）
4. 选择刚解压的 `数字仓库` 文件夹
5. 点击「打开」

> [!warning] 重要提示
> 首次打开会询问是否信任此仓库的插件
> 点击「**信任作者并启用插件**」

🎉 **恭喜！** 插件和技能包已经自动生效，无需额外配置。

---

## STEP 2: 安装 Claude Code

### 2.1 为什么要安装？

Claudian 插件需要依赖 Claude Code 才能运行：
- Claude Code 是 Anthropic 官方命令行工具
- Claudian 通过它调用 AI 能力

### 2.2 安装步骤

**Mac / Linux 用户**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows 用户**
1. 先安装 Git for Windows
2. 打开 PowerShell，运行：
```powershell
irm https://claude.ai/install.ps1 | iex
```

### 2.3 验证安装

在终端运行：
```bash
claude --version
```

如果显示版本号，说明安装成功！

---

## STEP 3: 安装 CC Switch

### 3.1 CC Switch 是干什么的？

**问题**: Claude 官方的 AI 服务在国内不太好用
**解决**: CC Switch 把请求转发到国内的智谱 AI
**优势**: 不需要梯子，速度快

### 3.2 下载安装

**安装包下载**
- 公众号后台回复「AI笔记系统」获取
- 或访问相关下载页面

**系统要求**
- Mac 用户: `CC-Switch-v3.9.1-macOS.zip`
- Windows 用户: `CC-Switch-v3.9.1-Windows-Portable.zip`

**安装步骤**
1. 下载对应系统的安装包
2. 解压
3. 双击打开 CC Switch

**安装完成！** 🎊

---

## 下一步

系统软件已安装完成，接下来需要配置 AI 服务：
- → [[1 Projects/Claudian/智谱 AI 配置实战.md]]

---

## 相关主题

- [[2 Areas/Claudian/Claudian 技能系统.md]] - 了解技能包机制
- [[2 Areas/Claudian/Claudian MCP 服务器.md]] - 了解 MCP 服务器
- [[2 Areas/Claudian/Claudian 命令体系.md]] - 了解命令系统
- [[3 Resources/Claudian/Obsidian + Claudian 集成方案.md]] - 了解整体架构

## 故障排除

| 问题 | 解决方案 |
|-----|---------|
| Obsidian 无法打开仓库 | 确认选择的是「打开本地仓库」而非「创建新仓库」 |
| 插件未启用 | 检查是否点击了「信任作者并启用插件」 |
| Claude Code 版本不显示 | 检查终端路径，可能需要重启终端 |
| CC Switch 无法启动 | 检查下载的安装包是否与系统匹配（Windows/Mac） |

---

## 资源

- 官方文档: https://obsidian.md
- Claude Code 文档: https://claude.ai/code
- CC Switch 项目: [相关仓库地址]
- 新手包下载: 公众号回复「AI笔记系统」

---

**状态**: ✅ 系统安装完成，待配置 AI 服务
**下一步**: 配置智谱 AI（见相关笔记）
