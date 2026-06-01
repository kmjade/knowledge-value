---
title: Finance 架构规则
aliases: [Finance Architecture Rules, 财经规则]
created: 2026-06-01
type: rules
topic: finance
---

# Finance 架构规则

## 目录结构

```
2 Areas/03-Finance/                    Area 行动层
├── RULES.md                           本文件
├── economic-calendar/                 被动：经济事件
│   └── 2026/MM/                       月目录（数字）
├── market-analysis/                   主动：市场研判
│   └── YYYY/MM/                       年/月
├── daily-trade/                       执行：交易记录
│   └── YYYY/M Month/                  年/月（英文月名）
├── 03-Finance.md                      Area MOC
├── Finance-知识库完善.md               工作清单
└── RULES.md                           本文件
└── Finance-知识库完善.md               工作清单

3 Resources/300/332.6-Investment-and-Trading/  Resource 知识层
├── CLAUDE.md                          Schema
├── raw/                               原始资料 (AI 只读)
├── wiki/                              编译产物 (AI 独占)
└── 01-10/                             10 章框架
```

## 命名规则

| 规则 | 示例 |
|------|------|
| 目录：英文 | `economic-calendar` · `market-analysis` · `daily` |
| 日历文件：`经济日历 YYYY-MM-DD.md` | `经济日历 2026-06-01.md` |
| 分析文件：`分析-YYYY-MM-DD.md` | `分析-2026-06-01.md` |
| 日志文件：`finance-YYYY-MM-DD.md` | `finance-2026-06-01.md` |
| 日历 月目录：`MM` (数字) | `05` · `06` |
| 日志 月目录：`M Month` (英文) | `6 June` |

## 数据流

```
06:00 Cron → economic-calendar/ (自动)
          ↓
      市场分析/       (手动：盘前研判)
          ↓
      daily/          (手动：盘中记录·盘后反思)
          ↓
      raw/            (归档：日历+分析入 332.6/raw/)
          ↓
      wiki/compile    (编译：提取概念·更新实体)
```

## 操作守则

| 操作 | 频率 | 工具 |
|------|:---:|------|
| 日历抓取 | 每日 06:00 | Cron (Hermes Agent) |
| 盘前分析 | 每日 | 手动 (模板填充) |
| 盘中记录 | 每笔 | `daily/finance-YYYY-MM-DD.md` |
| 盘后复盘 | 每日 15min | 交易日志反思 |
| 数据归档 | 月末 | raw/ 同步 |
| Wiki 编译 | 按需 | `/wiki-compile 332.6` |

## 禁止

- ❌ 经济日历手动编辑（自动抓取产物）
- ❌ raw/ 目录手动修改
- ❌ 交易记录事后美化（保留原始情绪状态）
- ❌ wiki/ 目录手动编辑（AI 独占）
