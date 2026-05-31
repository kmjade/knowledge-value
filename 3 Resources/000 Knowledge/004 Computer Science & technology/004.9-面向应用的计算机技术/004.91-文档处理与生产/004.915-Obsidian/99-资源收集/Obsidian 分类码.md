---
title: Obsidian 分类码对照 — DDC · UDC · CLC · LCC
aliases: [Obsidian Classification Codes, Obsidian 分類碼]
tags: [classification, obsidian, pkm, ddc, udc, clc, lcc]
created: 2026-05-31
updated: 2026-05-31
---

# Obsidian 分类码对照

> Obsidian 在四大图书馆分类体系中的精确分类号——一个跨「文档处理」与「知识管理」双重身份的工具。

---

## 一、四体系总览

| 体系 | 类号 | 名称 | 分类逻辑 |
|:---:|:---:|------|------|
| **DDC** | `005.52` | Word processing / Office applications | 以「软件功能」分类 |
| **UDC** | `004.91` | Document processing and production | 以「技术本质」分类 |
| **CLC** | `TP317.1` | 办公自动化系统 | 以「应用场景」分类 |
| **LCC** | `QA76.76.T48` | Text editors / Word processing | 以「计算机科学」分类 |

---

## 二、Obsidian 的双重分类问题

Obsidian 同时具有**两种身份**，导致在不同体系中归入不同类目：

| 视角 | 归类 | 逻辑 |
|------|:---:|------|
| **技术本质**（它是什么） | 文档处理器 — UDC `004.91` | 它本质上是 Markdown 渲染器 + 文件管理器 + 编辑器 |
| **使用目的**（用来做什么） | PKM 工具 — DDC `001` | 它被用来做知识管理、Zettelkasten、第二大脑 |

> 详见：[[为什么 Obsidian 归 文档处理与生产]] — 技术层 vs 概念层的双轴分类

---

## 三、DDC 层级详解

```
000 — 计算机科学、信息与总类 (Computer science, information & general works)
  └── 005 — 计算机编程、程序与数据 (Computer programming, programs, data)
       └── 005.5 — 通用应用软件 (General purpose application software)
            ├── 005.52 — 字处理 (Word processing) ← Obsidian
            ├── 005.54 — 电子表格 (Spreadsheets)
            └── 005.57 — 个人信息管理 (Personal information management)
```

### DDC 备选类号

| 类号 | 名称 | 适用场景 |
|:---:|------|------|
| `005.52` | **Word processing** | ✦ 主分类 — 文档编辑与格式化 |
| `005.57` | Personal information management | 侧重知识管理/PIM 功能 |
| `006.7` | Multimedia systems | 侧重图谱视图/Canvas |
| `005.43` | Systems programs | 侧重软件系统层面 |

---

## 四、UDC 层级详解

```
004 — 计算机科学 (Computer Science and Technology)
  └── 004.9 — 面向应用的计算机技术 (Application-oriented computer-based techniques)
       └── 004.91 — 文档处理与生产 (Document processing and production)
            ├── 004.912 — 字处理 (Word processing)
            ├── 004.915 — 桌面出版 (Desktop publishing)
            └── 004.918 — 数字出版 (Digital publishing)
```

### UDC 字母扩展

| 类号 | 工具 |
|:---:|------|
| `004.91Obsidian` | Obsidian |
| `004.91Notion` | Notion |
| `004.91Logseq` | Logseq |
| `004.912Word` | Microsoft Word |
| `004.915Adobe InDesign` | Adobe InDesign |

> **注**：UDC 不使用独立子类号区分 Obsidian，而是归入 `004.91` 大类后通过字母扩展区分具体产品——这与 CLC 为每种应用分配独立子类号的做法不同。

---

## 五、CLC 层级详解（中图法）

```
T — 工业技术
  └── TP — 自动化技术、计算机技术
       └── TP31 — 计算机软件
            └── TP317 — 应用软件（程序包）
                 ├── TP317.1 — 办公自动化系统 ← Obsidian · Notion · Office
                 ├── TP317.2 — 字处理软件 (Word · Pages)
                 ├── TP317.3 — 文字处理/排版 (LaTeX · Markdown)
                 ├── TP317.4 — 桌面出版系统 (InDesign · Scribus)
                 ├── TP317.42 — 向量绘图 (Illustrator)
                 └── TP317.46 — 图像处理 (Photoshop)
```

### CLC 为什么用 TP317.1？

TP317.1「办公自动化系统」涵盖所有以**办公效率、信息组织、知识管理**为目的的应用软件。Obsidian 虽然有强大的 Markdown 编辑能力（接近 TP317.3），但其核心定位是**个人知识管理**（PKM），归入办公自动化类最合理。

---

## 六、LCC 层级详解

```
Q — 科学 (Science)
  └── QA — 数学·计算机科学 (Mathematics. Computer Science)
       └── QA76 — 计算机软件 (Computer software)
            └── QA76.76 — 特殊类型的计算机软件 (Special types of software)
                 ├── QA76.76.I58 — 集成软件 (Integrated software)
                 ├── QA76.76.T48 — 文本编辑器/字处理 (Text editors)
                 └── QA76.76.T49 — 相关信息处理工具
```

### LCC 备选

| 类号 | 视角 |
|:---:|------|
| `QA76.76.T48` | 文本编辑器（技术本质） |
| `QA76.76.I58` | 集成软件（插件生态丰富） |
| `Z52.5` | 文档处理工具（以出版物为中心） |

---

## 七、同类工具分类号对照

| 工具 | DDC | UDC | CLC | LCC | 类型 |
|------|:---:|:---:|:---:|:---:|------|
| **Obsidian** | `005.52` | `004.91` | `TP317.1` | `QA76.76.T48` | 本地 PKM |
| Notion | `005.57` | `004.91` | `TP317.1` | `QA76.76.I58` | 云端 PKM |
| Logseq | `005.52` | `004.91` | `TP317.1` | `QA76.76.T48` | 本地 PKM |
| Roam Research | `005.57` | `004.91` | `TP317.1` | `QA76.76.I58` | 云端 PKM |
| Heptabase | `005.57` | `004.91` | `TP317.1` | `QA76.76.I58` | 可视化 PKM |
| Joplin | `005.52` | `004.91` | `TP317.1` | `QA76.76.T48` | 本地开源 PKM |
| Word | `005.52` | `004.912` | `TP317.2` | `Z52.5.M52` | 字处理 |
| LaTeX | `686.22544` | `004.915` | `TP317.3` | `Z253.4.L38` | 学术排版 |
| InDesign | `006.686` | `004.915` | `TP317.4` | `Z253.532.A34` | 桌面出版 |
| VS Code | `005.13` | `004.43` | `TP317.1` | `QA76.76.T48` | 代码编辑器 |

---

## 八、四体系分类哲学对比

| 体系 | Obsidian 归属 | 分类逻辑 | 观察 |
|------|:---:|------|------|
| **DDC** | 005.52（字处理） | 以「软件功能」分类 | 将 Obsidian 视为文档工具 |
| **UDC** | 004.91（文档处理） | 以「技术本质」分类 | 粗粒度——同类工具共享类号 |
| **CLC** | TP317.1（办公自动化） | 以「应用场景」分类 | TP317 细分最精确——每种子类有独立号 |
| **LCC** | QA76.76.T48（文本编辑） | 以「计算机科学」分类 | QA 是 CS 大类，适合学术环境 |

---

## 九、阿土伯套件对照（Adobe Suite vs PKM 工具）

| 工具 | CLC | 角色 |
|------|:---:|------|
| Obsidian | `TP317.1` | 知识操作系统的宿主平台 |
| InDesign | `TP317.4` | 桌面出版——版面组合 |
| Photoshop | `TP317.46` | 图像处理——点阵 |
| Illustrator | `TP317.42` | 向量绘图——图形 |

> 在 CLC `TP317.x` 体系下，Obsidian 和 Adobe 套件平级排列——这套体系将所有「应用软件」平等对待，不区分「创意工具」和「知识工具」。

---

## 十、在本 Vault 中的对应

| 主题 | Vault 位置 | 状态 |
|------|-----------|:---:|
| Obsidian 实体页 | [[3 Resources/000 Knowledge/wiki/entities/Obsidian\|Obsidian]] (000) | ✅ 完整 |
| Obsidian 实体页 | [[3 Resources/000 Knowledge/006 Artificial Intelligence/wiki/entities/Obsidian\|Obsidian]] (AI) | ✅ 完整 |
| Obsidian KB 入口 | [[Obsidian (MOC)]] | ✅ 9章知识库 |
| 双重分类说明 | [[为什么 Obsidian 归 文档处理与生产]] | ✅ 已创建 |
| Obsidian KB (004.91) | [[004.91-文档处理与生产/Obsidian/]] | ✅ 完整 |
| 同类分类码 | [[InDesign 分类码]] | ✅ 完整 |
| 分类码参考样式 | [[操作系统分类码]] | ✅ 完整 |
| 分类体系实体 | [[CLC-中國圖書館分類法]] · [[DDC]] · [[UDC]] · [[LCC]] | ✅ 已创建 |

---

## 十一、CLC TP317 完整细分（应用软件全家福）

| 类号 | 子类 | 代表软件 |
|:---:|------|------|
| `TP317.1` | **办公自动化系统** | Obsidian · Notion · Office · WPS |
| `TP317.2` | 字处理软件 | Word · Pages · LibreOffice Writer |
| `TP317.3` | 文字处理/学术排版 | LaTeX · Markdown 编辑器 |
| `TP317.4` | **桌面出版系统** | InDesign · Scribus · QuarkXPress |
| `TP317.42` | 图形设计软件 | Illustrator · CorelDRAW · Figma |
| `TP317.46` | 图像处理软件 | Photoshop · GIMP · Affinity Photo |
| `TP317.48` | 多媒体制作 | Premiere · After Effects · DaVinci |
| `TP317.6` | 数据库管理软件 | Access · Airtable · FileMaker |

---

## 参考

- [[3 Resources/000 Knowledge/wiki/entities/Obsidian\|Obsidian]] — 000 Knowledge 实体页（含完整描述、优劣势、在系统中的角色）
- [[为什么 Obsidian 归 文档处理与生产]] — 双重分类深度分析
- [[InDesign 分类码]] — 同类分类码参考样式
- [[操作系统分类码]] — 四体系分类码对照（本页参考样式）
- [[CLC-中國圖書館分類法]] · [[DDC]] · [[UDC]] · [[LCC]]
- 国家图书馆.《中国图书馆分类法》（第五版，2010）
- OCLC. *Dewey Decimal Classification* (DDC 23, 2011)
