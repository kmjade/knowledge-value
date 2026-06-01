---
created: 2026-05-31
type: test-plan
topic: triage-accuracy
parent: "[[Skill-triage-工作清单]]"
---

# Triage 准确率测试 — TE-02

> FR-011: 时效性分类准确率 ≥ 85%

---

## 测试样本 (20 文件)

### 🏃 ephemeral (5 样本)

| # | 文件名 | 内容摘要 | 正确答案 | 关键词信号 |
|:--:|--------|----------|:------:|------|
| E1 | 明天买灯泡.md | "明天去五金店买一个LED灯泡，厨房的坏了" | ephemeral | 明天+买+具体物品 |
| E2 | 周五前交报告.md | "周五下班前把Q2分析报告发给主管，抄送团队" | ephemeral | 截止+交+日期 |
| E3 | 提醒-缴信用卡.md | "5月31日前缴信用卡账单，最低还款额2000" | ephemeral | 日期+缴+金额 |
| E4 | 预约牙医.md | "下周三下午3点预约牙医洗牙，电话13800138000" | ephemeral | 预约+日期+电话 |
| E5 | 快递取件.md | "今天下午5点前叫顺丰取件，单号已生成" | ephemeral | 今天+动作+时间 |

### 📋 operational (5 样本)

| # | 文件名 | 内容摘要 | 正确答案 | 关键词信号 |
|:--:|--------|----------|:------:|------|
| O1 | 项目周会记录.md | "项目周会记录\n出席: 张三李四王五\n议题: Q3规划、资源分配\n下一步: 张负责方案" | operational | 会议+项目+任务分配 |
| O2 | API重构方案.md | "API重构方案 v2\n背景: 现有API响应慢\n方案: 引入缓存层+异步\n排期: 2周开发+1周测试" | operational | 方案+项目+日程 |
| O3 | 竞品分析报告.md | "竞品分析\n对比: Notion vs Obsidian vs 飞书\n维度: 功能/价格/生态\n结论: 推荐Obsidian" | operational | 报告+分析+项目 |
| O4 | 用户反馈汇总.md | "用户反馈汇总\n收集渠道: 客服+问卷\n主要问题: 登录慢、导出失败\n优先级: P0登录 P1导出" | operational | 汇总+优先级+任务 |
| O5 | 需求评审记录.md | "需求评审\nPRD: 暗色模式\n评审意见: UI需调整，技术可行\n批准: 进入开发" | operational | 评审+需求+项目 |

### 📚 reference (5 样本)

| # | 文件名 | 内容摘要 | 正确答案 | 关键词信号 |
|:--:|--------|----------|:------:|------|
| R1 | LLM价格对比2026.md | "2026大模型API价格对比\n来源: https://example.com/pricing\nGPT-5: $0.01/token..." | reference | URL+长文+技术术语 |
| R2 | GTD方法论详解.md | "GTD方法论详解\n作者: David Allen\n来源: Getting Things Done 书摘\n五步流程: 捕获→理清→组织..." | reference | 作者+书摘+方法论 |
| R3 | Transformer论文笔记.md | "Attention Is All You Need\n发表: 2017 NeurIPS\n核心贡献: 自注意力机制..." | reference | 论文+发表+来源 |
| R4 | Obsidian插件开发指南.md | "Obsidian插件开发指南\n来源:官方文档\n环境: Node.js + TypeScript..." | reference | 教程+来源+技术 |
| R5 | 知识管理最佳实践.md | "知识管理最佳实践\n参考: Tiago Forte, Niklas Luhmann\n方法: Zettelkasten + PARA..." | reference | 参考+长文+来源 |

### 🌲 evergreen (5 样本)

| # | 文件名 | 内容摘要 | 正确答案 | 关键词信号 |
|:--:|--------|----------|:------:|------|
| V1 | 二阶思维.md | "二阶思维\n定义: 考虑决策的连锁反应\n原理: 每个行动有直接后果+后续后果\n框架: 1.识别直接效果 2.推演二阶 3.评估" | evergreen | 定义+原理+框架+无日期 |
| V2 | 反脆弱性.md | "反脆弱性\n概念: 系统在压力下变强\n提出者: Nassim Taleb\n三态: 脆弱/坚韧/反脆弱" | evergreen | 概念+定义+理论 |
| V3 | 复利效应.md | "复利效应\n原理: 收益产生收益的指数增长\n公式: A=P(1+r)^n\n应用: 投资/学习/习惯" | evergreen | 原理+公式+概念 |
| V4 | 奥卡姆剃刀.md | "奥卡姆剃刀\n法则: 如无必要勿增实体\n来源: 14世纪哲学家William of Ockham\n应用: 设计/决策/科学" | evergreen | 法则+概念+无日期 |
| V5 | 心流状态.md | "心流状态\n定义: 完全沉浸的最优体验\n提出者: Mihaly Csikszentmihalyi\n条件: 明确目标+即时反馈+技能匹配" | evergreen | 定义+概念+理论 |

---

## 测试协议

### 准备

```bash
# 1. 创建测试目录
mkdir -p "0 Inbox/_test_accuracy"

# 2. 将以上 20 个样本创建为 .md 文件
# 文件名: E1-明天买灯泡.md, O1-项目周会记录.md, ...

# 3. 备份当前 Inbox
mv "0 Inbox" "0 Inbox_backup"
```

### 执行

```
/triage --scope _test_accuracy --dry-run
```

### 评分

| 指标 | 计算方式 |
|------|----------|
| 总体准确率 | 正确分类数 / 20 |
| ephemeral 召回 | E类正确数 / 5 |
| operational 召回 | O类正确数 / 5 |
| reference 召回 | R类正确数 / 5 |
| evergreen 召回 | V类正确数 / 5 |

**通过标准**: 总体准确率 ≥ 85% (≥ 17/20)

---

## 边缘用例 (加分项)

| # | 样本 | 难点 | 正确答案 |
|:--:|------|------|:------:|
| X1 | "读完这篇RAG论文，下周组会分享" | 双重属性 | operational + reference |
| X2 | "张三 13800138000 腾讯产品经理" | 人物识别 | people |
| X3 | "" (空文件) | 空文件 | 跳过+警告 |
| X4 | "test" (4字) | 过短 | → 日记 fleeting |

---

---

## TE-01: Scanner 8 场景单元测试

### 测试文件

在 `0 Inbox/_test_scanner/` 创建以下文件:

| # | 文件名 | 内容 | 预期结果 |
|:--:|--------|------|:--------:|
| S1 | normal.md | "# 正常笔记\n内容..." | ✅ 扫描到 |
| S2 | triaged.md | `---\ntriaged: true\n---\n# 已分拣` | ❌ 跳过 (triaged) |
| S3 | empty.md | (空, 5 bytes) | ⚠️ 警告 + 跳过 |
| S4 | not-md.txt | "text file" | ❌ 跳过 (非.md) |
| S5 | in-processed.md | (放在 `_processed/` 子目录) | ❌ 跳过 (_processed) |
| S6 | deep/nested.md | (放在子目录) | ✅ 递归扫描 |
| S7 | binary.md | 二进制内容 | ⚠️ 警告 + 跳过 |
| S8 | large.md | 500KB 内容 | ✅ 正常扫描 |

### 执行

```
/triage --scope _test_scanner --dry-run
```

### 通过标准

| # | 用例 | 通过 |
|:--:|------|:----:|
| S1 | 正常文件被扫描 | |
| S2 | triaged 文件被跳过 | |
| S3 | 空文件警告 | |
| S4 | 非.md 被跳过 | |
| S5 | _processed 被跳过 | |
| S6 | 子目录递归 | |
| S7 | 二进制跳过 | |
| S8 | 大文件正常 | |

---

---

## TE-03: 端到端 5 流水线集成测试

### 测试矩阵

| # | 流水线 | 命令 | 验证点 |
|:--:|--------|------|--------|
| P1 | Full | `/triage --scope _test_scanner` | 完整 6 步执行，文件移动，日志写入 |
| P2 | DryRun | `/triage --scope _test_scanner --dry-run` | 仅分析预览，无文件移动 |
| P3 | SingleFile | `/triage --file "E1-明天买灯泡.md"` | 单文件分类+路由 |
| P4 | Scoped | `/triage --scope clippings` | 仅扫描 Clippings/ |
| P5 | Error | `/triage --scope _nonexistent` | 优雅处理空/无效 scope |

### 通过标准

| # | 验证 | ✅ |
|:--:|------|:--:|
| P1 | 文件正确移动到目标，triaged: true 写入 | |
| P2 | 输出预览但内容不变 | |
| P3 | 单个文件被正确分类 | |
| P4 | 只扫描指定子目录 | |
| P5 | 无崩溃，输出友好提示 | |

---

## 执行记录

| 2026-06-01 | AI | ✅ 8/8 | — | — | — | TE-01 全部通过 |
| — | — | — | — | — | — | 待执行 |

---

> 📎 关联: [[Skill-triage-工作清单\|工作清单 TE-02]]
