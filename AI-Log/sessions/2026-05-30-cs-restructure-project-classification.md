---
title: 2026-05-30 — CS 目录重整 + 富福项目规划 + 生成艺术知识库 + OS 分类码
created: 2026-05-30
tags: [session-log, triage, project, classification, generative-art]
---

# 会话记录 · 2026-05-30

## 操作概要

| # | 阶段 | 内容 | 文件数 |
|:--:|------|------|:--:|
| 1 | 目录重整 | 004.6 三目录 DDC 编号修正 + 网络合并 | ~30 编辑 |
| 2 | 富福 v1 | 智能小车完整设计方案（硬件/软件/BOM） | 1 |
| 3 | 富福 实施规划 | WBS 任务分解 + 里程碑 + 风险 + 测试 | 1 |
| 4 | 富福 v2 | RoboMaster 参考优化（CAN/串级PID/BNO055） | 1 |
| 5 | 富福 v3 | HiWonder 悬挂履带底盘优化对比 | 1 |
| 6 | 富福 接线图 | 引脚分配 + 电源拓扑 | 1 |
| 7 | 算法哲学 | Cartographic Drift 算法哲学 + p5.js 制品 | 2 |
| 8 | 生成艺术 KB | algorithmic-art 知识库构建（raw + wiki） | 11 |
| 9 | OS 分类码 | Windows/Linux/macOS/Android/HarmonyOS 四大体系 | 2 |

---

## 一、CS 目录重整 (004.6)

### Step 1: `004.6-数据库与数据结构` → `004.5-数据库与数据结构`

- DDC 编号错误修正：数据库应归 DDC 004.5（数据存储），非 004.6（网络）
- 更新 20 条链接 × 14 个文件
- 入口页重命名 + CLAUDE.md domain 更新

### Step 2: 合并网络目录

- `004.6 Computer Networks` → `004.6-计算机网络`（英文 40 文件）
- `004.7-计算机网络/` 内容并入：
  - `wiki/` → 直接迁移（7 concepts + 1 entity）
  - 独有章节 → `06-路由与交换/`、`07-无线与移动/`、`08-网络编程/`、`09-云计算与SDN/`
  - 重叠章节 → `_from-004.7/` 归档
- Tags 批量更新：`DDC/004.7` → `DDC/004.6` × 12 文件
- 删除原两个目录

### 验证结果

- ✅ `004.5-数据库与数据结构/` 27 files
- ✅ `004.6-计算机网络/` 66 files
- ✅ 零残留旧引用

### 产出

- [[AI-Log/restructure-report-004.6-three-dirs-2026-05-30|执行报告]]

---

## 二、富福智能小车项目

### 文档体系 (7 文件)

| 文件 | 类型 | 内容 |
|------|:---|------|
| [[1 Projects/富福-履带式智能小车/富福-v1-方案\|v1 方案]] | 设计 | 硬件选型 + 软件架构 + BOM (¥2,415) |
| [[1 Projects/富福-履带式智能小车/富福-v2-优化方案\|v2 优化]] | 优化 | RoboMaster 参考：CAN/串级PID/BNO055 (+¥83) |
| [[1 Projects/富福-履带式智能小车/富福-v3-HiWonder优化\|v3 优化]] | 优化 | HiWonder 悬挂底盘深度对比 + 三方案 |
| [[1 Projects/富福-履带式智能小车/富福-实施规划\|实施规划]] | 执行 | 53 任务 WBS + 6 检查点 + 9 风险 |
| [[1 Projects/富福-履带式智能小车/富福-接线图\|接线图]] | 参考 | Arduino/Pi 5 引脚分配 + 电源拓扑 |
| [[1 Projects/富福-履带式智能小车/算法哲学-Cartographic-Drift\|算法哲学]] | 艺术 | Cartographic Drift 宣言 |
| `cartographic-drift.html` | 制品 | 交互生成艺术 HTML |

### v1 关键升级（linter 修改）

- 下位机新增 ESP32（配合 Pan-Tilt 云台）
- 新增 Waveshare 2-Axis Pan-Tilt Camera 模块
- ST3215 总线舵机 + JSON 指令集

---

## 三、生成艺术知识库

### 新建 `3 Resources/generative-art/`

```
3 Resources/generative-art/
├── CLAUDE.md              Schema
├── README.md              入口
├── raw/algorithmic-art-skill.md   原始 SKILL.md
└── wiki/
    ├── concepts/algorithmic-philosophy.md
    ├── concepts/seeded-randomness.md
    ├── concepts/generative-art-artifact.md
    ├── concepts/cartographic-drift.md
    ├── entities/p5js.md
    ├── sources/source-algorithmic-art-skill.md
    ├── index.md
    └── log.md
```

编译统计：4 概念 + 1 实体 + 1 来源 + index + log = 8 wiki 页面

---

## 四、OS 分类码体系

### 完整对照表

| OS | UDC | DDC | CLC | LCC |
|----|:---:|:---:|:---:|:---:|
| Windows | `004.451.8Windows` | `005.446` | `TP316.7` | `QA76.774.M434` |
| Windows Server | `004.451.8Windows Server` | `005.4476` | `TP316.86` | `QA76.774.M434` |
| Linux | `004.451Linux` | `005.432` | `TP316.85` | `QA76.774.L46` |
| macOS | `004.451macOS` | `005.446` | `TP316.84` | `QA76.774.M33` |
| HarmonyOS | `004.451HarmonyOS` | `005.445` | `TP316.4` | `QA76.774.H37` |
| Android | `004.451Android` | `005.445` | `TP316.89` | `QA76.774.A53` |
| Unix | `004.451Unix` | `005.432` | `TP316.81` | `QA76.774.U64` |

### 文档位置

- [[操作系统分类码|OS 分类码详解]]
- [[3 Resources/000 Knowledge/004 Computer Science & technology/004.4-软件/004.4-软件|004.4 软件入口]]

### 关键发现

- HarmonyOS CLC = `TP316.4`（分布式操作系统），非 `TP316.89`（移动OS）
- 中国高校图书馆采用双分类号：`TP316.4` + `TN929.53`
- UDC 通过字母扩展区分具体 OS（`004.451` + 名称）

---

## 五、新建/更新文件汇总

| 目录 | 新建 | 编辑 |
|------|:---:|:---:|
| `004.5-数据库与数据结构/` | — | 目录重命名 |
| `004.6-计算机网络/` | 14 (迁移) | 目录重组 |
| `004.4-软件/` | 2 | — |
| `04-操作系统/` | 1 | 1 |
| `00-MOCs/` | — | 2 |
| `README.md` (CS) | — | 1 |
| `004 Computer Science & technology.md` | — | 1 |
| `1 Projects/富福-*/` | 7 | 4 (交叉引用) |
| `3 Resources/generative-art/` | 11 | — |
| `AI-Log/` | 2 | — |
| **合计** | **37** | **~30** |

---

*会话结束 · 2026-05-30*
