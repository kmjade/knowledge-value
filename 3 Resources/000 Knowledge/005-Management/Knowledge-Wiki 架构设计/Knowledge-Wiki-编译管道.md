---
aliases:
  - 知识编译管道详解
  - Knowledge Compilation Pipeline
created: 2026-06-02
version: "1.0"
status: stable
type: design
parent: "[[PARA+LLM-Wiki 融合系统]]"
tags: [architecture, compilation, pipeline]
---

# 知识编译管道

> raw/ → wiki/ 的完整编译流程
> 拆分自 [[1 Projects/PARA+LLM-Wiki 融合系统/设计文档/PARA+LLM-Wiki 整合系统架构设计文档 v1.0]]

## 六阶段流程

```
1. 预检 (Preflight) — 加载子库 Schema + 现有知识状态
2. 扫描 (Scanner) — 识别未编译/已修改的源文件
3. 提取 (Extractor) — 概念 + 实体 + 关系三层提取
4. UDC 标引 (Indexing) — 自动生成 ddc·udc·clc·lcc (UC-07+UC-42)
5. 编译 (Compiler) — 创建/更新 wiki/ 页面 + 链接生成
6. 验证 (Validator) — 质量校验 + 日志记录
```

## 增量编译

默认模式，只处理 `compiled: false` 或源文件已修改的文件。

## 质量校验

- [ ] 所有页面含 `## Sources`
- [ ] 所有页面有 ddc+udc+clc+lcc frontmatter
- [ ] 交叉链接已建立
- [ ] wiki/index.md 已更新
