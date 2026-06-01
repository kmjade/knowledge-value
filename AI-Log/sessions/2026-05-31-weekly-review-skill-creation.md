---
created: 2026-05-31
type: session-log
project: PARA × LLM-Wiki 融合系统 — Skills 实现
status: completed
tags:
  - weekly-review
  - skill-creation
  - command-creation
---

# 会话记录：weekly-review 技能与指令创建

**日期**: 2026-05-31
**主题**: 基于 [[03-Skills 完整设计|03-Skills 完整设计]] Skill 5 规范，创建 `/weekly-review` 的完整双轨实现
**状态**: ✅ 已完成

---

## 会话摘要

用户要求为「每週回顧與知識蒸餾」功能创建 Skill 和 Command。Claudian 依据设计文档第三章 Skill 5 的完整规范，创建了双轨实现：完整的 Skill 包（含 skill.json + 详细指令）和简化的 Command 文件。

---

## 产出物

### 1. Skill 包 `.claude/skills/weekly-review/`

| 文件 | 大小 | 说明 |
|------|------|------|
| `skill.json` | 250B | 元数据：名称、描述、指令文件、命令注册 |
| `weekly-review.md` | 8.7KB | 六步骤完整执行逻辑、错误处理、注意事項 |

### 2. Command 文件 `.claude/commands/weekly-review.md`

| 文件 | 大小 | 说明 |
|------|------|------|
| `weekly-review.md` | 4.6KB | 精简版指令，六步骤概要 + 参数说明 |

### 3. 使用指南 `1 Projects/📁 已完成/PARA+LLM-Wiki 融合系统/weekly-review-使用指南.md`

独立使用指南，包含快速上手、参数说明、典型场景、FAQ。

---

## 设计决策

| 决策点 | 选择 | 理由 |
|--------|------|------|
| Skill vs Command | 两者都创建 | Skill 提供完整逻辑和自动触发能力，Command 提供简洁调用入口 |
| 週記合併策略 | 保留人類區塊，覆蓋 AI 區塊 | 與 daily-open 保持一致的設計哲學 |
| 歸檔安全檢查 | wikilink 引用檢測 | 避免歸檔破壞現有知識網絡 |
| 批量編譯上限 | 每子庫 10 個 | 控制單次運行成本，超出排入下週 |
| 可中斷設計 | `--step N` 參數 | 支持從任意步驟恢復 |

---

## 與現有系統的整合

```
/weekly-review
  ├── Step 1-2: 讀取 Periodic/daily/ → 生成 Periodic/weekly/
  ├── Step 3:   調用 /wiki-compile --incremental
  ├── Step 4:   移動過期文件 → 4 Archives/
  ├── Step 5:   掃描 1 Projects/ 狀態
  └── Step 6:   調用 lint 邏輯 → AI-Log/
```

---

## 後續建議

1. 在本週日實際運行一次 `/weekly-review` 驗證完整流程
2. 根據首次運行結果微調參數（如歸檔天數、編譯批次大小）
3. 考慮添加 SessionStart hook：每週一自動提示上週回顧
