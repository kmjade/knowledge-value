---
aliases:
  - LLM Wiki
  - LLM-Wiki 方法论
  - AI知识编译
created: 2026-05-27
type: concept
topic: productivity
status: reviewed
---

# LLM-Wiki

## 定义

LLM-Wiki 是 Andrej Karpathy 提出的知识管理方法论，核心理念是将 AI（LLM）作为"编译器"，从原始资料中自动生成结构化的 Wiki 知识库，解决静态知识库缺乏"记忆"的核心痛点。

## 核心原理

### 三层架构

```
raw/        →    人类维护的原始资料
  │
  │  /wiki-compile (AI 编译)
  ▼
wiki/       →    AI 生成的结构化知识
  │
  │  查询（快速定位）
  ▼
用户         →    消费知识，不用翻原始资料
```

### 为什么需要 LLM-Wiki？

**问题**: Obsidian 是静态知识库，没"记忆"。
- 每次 AI 访问需要扫描大量文件 → 烧 Token
- 上下文超长 → 失忆 → 输出质量下降
- 缺少自动摘要和索引 → 定位效率低

**解决**: Wiki 提供"预编译记忆"
- AI 提前编译原始资料 → 结构化知识
- 查询时只读 Wiki → 极速定位
- 增量更新 → 自动维护

### 三条公理

1. **单一 Vault** — 全部内容在一个 Vault，通过规则隔离
2. **AI 是编译器** — AI 职责是编译知识，不是对话闲聊
3. **信息有生命周期** — 不是所有信息都值得永久存储

## 关键要点

1. `raw/` 人类维护，AI 只读不修改
2. `wiki/` AI 独占写入，人类只读
3. 所有 Wiki 页面必须有 `Sources` 部分
4. 优先更新现有页面，而非创建新页面
5. 使用 `[[]]` 建立知识链接网络

## 相关概念

- [[PARA-Method]] — LLM-Wiki 与 PARA 融合形成完整知识管理系统
- [[Information-Lifecycle]] — ephemeral → operational → reference → evergreen
- [[Second-Brain]] — AI 驱动的第二大脑
- [[Semantic-Pollution]] — 未分类信息的语义污染问题
- [[Context-Switching-Cost]] — 多库切换的认知成本

## 实践应用

- **本文档库**即基于 PARA+LLM-Wiki 架构
- **Skills 体系**: `/triage` 分拣, `/wiki-compile` 编译, `/context` 状态, `/lint` 检查
- **编译流程**: raw → wiki (concepts + entities + sources)

## 参考资源

- [[Andrej-Karpathy]] — LLM-Wiki 概念提出者
- [[Claude-Code]] — 实现 LLM-Wiki 的 AI 编程工具
- [[Hermes-Agent]] — LLM-Wiki 的参考实现

## Sources

- [[3 Resources/productivity/raw/articles/LifeOS × LLM-Wiki 融合系统.md]]
- [[3 Resources/productivity/raw/articles/封神组合！Claude Code+LLM Wiki+Obsidian 一站式打通 AI 知识库.md]]
- [[3 Resources/productivity/raw/articles/PARA + LLM-WIKI 架构，实现个人知识与生活管理的自动化革命.md]]
