---
aliases:
  - Finance Wiki
  - 财务知识库
created: 2026-05-26
type: wiki-schema
topic: finance
---

# Finance Wiki Schema

财务理财知识库，采用 LLM-Wiki 方法论组织。

## 目录结构

```
finance/
├── CLAUDE.md          # 本文件 - 子库 schema
├── raw/               # 原始资料（人类维护，AI 只读）
│   ├── articles/      # 文章摘录
│   ├── papers/        # 论文笔记
│   ├── books/         # 书籍笔记
│   └── conversations/ # 对话记录
├── wiki/              # LLM 编译产物（AI 独占写入）
│   ├── index.md       # 知识索引
│   ├── log.md         # 编译日志
│   ├── concepts/      # 概念页面
│   ├── entities/      # 实体页面（公司、产品等）
│   └── sources/       # 来源溯源
└── outputs/           # 基于 Wiki 生成的制品
```

## 核心概念域

### 投资基础
- 资产配置
- 风险管理
- 投资组合理论
- 市场分析

### 金融工具
- 股票 (Stocks)
- 债券 (Bonds)
- 基金 (Funds)
- ETF
- 期权 (Options)
- 加密货币 (Crypto)

### 交易策略
- 价值投资
- 技术分析
- 量化交易
- 趋势跟踪

### 个人理财
- 预算管理
- 税务规划
- 保险配置
- 退休规划

## 页面模板

### 概念页面
```markdown
# [概念名称]

## 定义
[一句话定义]

## 核心原理
[详细解释]

## 实践应用
[具体案例]

## 相关概念
- [[related-concept-1]]

## Sources
- [[source-file-name]]
```

### 金融产品实体页面
```markdown
# [产品名称]

## 基本信息
- 类型: stock/fund/etf/bond/crypto
- 代码:
- 市场:

## 核心指标
- 市值:
- PE:
- 股息率:

## 分析笔记
[投资分析]

## 相关概念
- [[related-concept-1]]

## Sources
- [[source-file-name]]
```

## 编译规则

1. **数据脱敏**: 个人财务数据不进入 wiki/
2. **raw/ 只读**: AI 不修改原始资料
3. **sources 必须**: 所有 wiki 页面必须标注来源
4. **链接优先**: 使用 `[[]]` 建立知识连接

## 使用命令

- `/wiki-compile finance` - 编译此知识库
- `/triage` - 将新资料分拣到 raw/

