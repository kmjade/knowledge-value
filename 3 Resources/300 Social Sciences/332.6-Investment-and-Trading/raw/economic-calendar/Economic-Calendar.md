---
title: 经济日历
tags: [trading, economic-calendar, metatrader]
created: 2026-05-27
aliases: [Economic Calendar, 财经日历]
triaged: true
triaged_at: 2026-05-29T17:30:00
triaged_to: 3 Resources/300 Social Sciences/330-经济学/332.6-Investment-and-Trading/raw/economic-calendar/
original_path: 0 Inbox/03-Productivity/MetaTrader/99-资源收集/
compiled: true
compiled_at: 2026-05-29
compiled_to:
  - wiki/concepts/经济日历
  - wiki/concepts/经济指标
  - wiki/entities/Forex-Factory
---

# 经济日历

> 每日 06:00 自动更新（Cron Job: `33a573fb2e35`）

## 近期日历

```dataview
TABLE date as 日期, file.ctime as 生成时间
FROM "3 Resources/300 Social Sciences/330-经济学/332.6-Investment-and-Trading/raw/economic-calendar"
WHERE contains(file.name, "经济日历")
SORT file.name DESC
LIMIT 10
```

## 今日重要事件

查看今日文件：[[经济日历 {{date}}]]

## 本周重点关注

| 日期 | 货币 | 事件 | 影响 |
|------|------|------|------|
| | | | |

## 如何使用

1. 每天早上 6:00 自动抓取全球重大经济事件
2. 重点关注 **红色/三星** 高影响事件
3. 事件前 15 分钟避免新开仓
4. 事件后等 5 分钟看方向再参与

## 数据来源

- Forex Factory
- Investing.com
- DailyFX

---

## 相关笔记

- [[../../08-交易系统/08-交易系统\|08 交易系统]]
- [[../../02-技术分析/02-技术分析\|02 技术分析]]
- [[../../04-风险管理/04-风险管理\|04 风险管理]]
- [[MetaTrader\|Wiki: MetaTrader]]
