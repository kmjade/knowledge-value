---
title: Knowledge+PARA+LLM-Wiki融合系统
aliases:
  - 融合系统
  - Fusion System
  - 知识管理系统
created: 2026-05-29
status: active
tags: [knowledge-system, architecture, meta]
---

# Knowledge + PARA + LLM-Wiki 融合系統

> 本 vault 的核心架構文檔——DDC 知識分類 × PARA 行動管理 × AI Agent 構建。

## 快速導航

| 文檔 | 說明 |
|------|------|
| [[PARA+LLM-Wiki 整合系统架构设计文档 v1.1\|📐 架構設計 v1.1]] | 完整[[1 Projects/📁 已完成/PARA+LLM-Wiki 融合系统/设计文档/PARA+LLM-Wiki 整合系统架构设计文档 v1.0\|📐 架構設計 v1.0]]v1.0\|📐 架構設計 v1.0]] | 初始設計文檔 |
| [[_META-INDEX]] | 全局導航入口 |

## 三大支柱

| 支柱 | 角色 | 實現 |
|------|------|------|
| **PARA** | 行動管理 | 0 Inbox → 1 Projects / 2 Areas / 3 Resources / 4 Archives |
| **DDC** | 知識分類 | 3 Resources/ 下 000–900 杜威十進制分類 |
| **LLM-Wiki** | 知識編譯 | raw/ → wiki/ AI 編譯 + Agent 直接構建 KB |

## 核心工作流

```
用戶指令 → DDC分類 → KB骨架創建 → 品質檢查 → Git提交
    │
    └── 每個 KB：MOC + 00-09章節 + 99資源 = 標準化結構
```

## 相關

- [[3 Resources|3 Resources 總索引]]
- [[_meta/⚙️ 系统配置/知识库结构概览|知識庫結構概覽]]
