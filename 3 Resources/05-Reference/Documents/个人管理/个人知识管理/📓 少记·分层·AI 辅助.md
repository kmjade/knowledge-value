---
aliases:
project:
# 管理
title: 📓 少记·分层·AI 辅助
para: project
domain:
  - "[[Digital Organization]]"
created: 2026-01-08 01:15
status: active
tags:
  - "#learning"
  - "#para"
  - "#ai"
---
# 📓 少记·分层·AI 辅助
---
> [!note] **核心概念**：
> 在 AI 时代，筆記的價值在于「少而精」而不是「多而杂」。通過分层（Raw → Core） + AI 快速摘要，我们把低價值噪音留在 Raw 层，只把「可执行、可复用、可連接」的核心內容搬进 Core 层（即 PARA 中的 Projects / Areas / Resources）。

## 1️⃣ 文章要點（3‑点法）
# 效率
2. **潜在争议**：有人认为大量原始素材对后期模型訓練有價值，但实际使用中会导致「上下文污染」。  
3. **可行动建議**：采用「Inbox → Raw → Core」二階段篩選：24 h 复审后，只保留满足三条规则的筆記（未来使用場景、價值转变、单一钩子），其余歸檔或刪除。

---

> **後續动作**（待辦）  
- [x] 将本筆記从 Inbox 移动到对应的 PARA 分類（见下文）。 ✅ 2026-01-08
- [ ] 在 `3 Resources/學習/少记法` 中創建學習手册。  
# 管理


---

# 管理

| PARA 维度   | 目標資料夾                           | 說明                                                                          | 示例檔案路徑                              |
| --------- | ------------------------------- | --------------------------------------------------------------------------- | ----------------------------------- |
# 管理
# 管理
| Resources | `3 Resources/學習/少记法`            | 若该筆記是 學習/參考 资料，放在資源层。这里的筆記会被其他專案或领域引用。                                      | `3 Resources/學習/少记法/少记·分层·AI 辅助.md` |

# 管理

---

### 3️⃣ 學習资料（Resources）示例

檔案路徑：`3 Resources/學習/少记法/少记·分层·AI 辅助 手册.md`

```markdown
---
title: "少记·分层·AI 辅助 手册"
date: "{{tp.date.now('YYYY-MM-DD')}}"
type: resource
status: "active"
tags: ["#learning", "#para", "#ai"]
---

# 少记·分层·AI 辅助 手册

## 目標
帮助使用者在 AI 環境下實現**少记、分层、可复用**的筆記体系。

## 關鍵步骤
1. **捕获** → 使用 QuickAdd 把所有原始資訊塞进 `0 Personals/📥 00_InBox`。  
2. **AI 初筛** → 在 `00_InBox` 中運行 Templater 模板 `note-summary.md`（調用 `gpt‑oss:120b‑cloud`），生成 **3‑点摘要**（结论、争议、行动）。  
3. **24 h 二次篩選** → 運行 `moveToCore.js`，只保留满足“三条规则”的筆記并搬入 `01_Core`（对应的 Projects/Areas/Resources）。  
4. **定期歸檔** → 每周在 `09_Weekly Review.md` 中触发 `autoArchive.js`，把已完成且超过 30 天的筆記移至 `04 Archives`。

## 案例
- **原始筆記**：`0 Personals/📥 00_InBox/📓 少记·分层·AI 辅助.md`  
- **AI 摘要**：见原始筆記的 “文章要點（3‑点法）”。  
- **最终歸檔**：`3 Resources/學習/少记法/少记·分层·AI 辅助.md`

## 常见問題
- **Q：为什么不直接把原始筆記放在 Resources？**  
# 知識庫

- **Q：如何快速批量搬迁？**  
  A：使用 Obsidian Custom JS 配合 `moveToCore.js`，可一次處理全部超过 24 h 的 Raw 筆記。  

---

# 管理
```
---

# 管理

# 管理

```markdown
---
# 管理
date: "{{tp.date.now('YYYY-MM-DD')}}"
type: area
status: "active"
tags: ["#para", "#management"]
---

# PARA 框架在 Obsidian 中的实战手册（针对 Areas）

## 目錄
1. [檔案结构总览](#檔案结构总览)  
2. [从 Inbox 到 Core 的全流程](#从-inbox-到-core-的全流程)  
3. [專案、领域、資源的划分原則](#專案领域資源的划分原則)  
# 配置
5. [維護与歸檔（Weekly Review）](#維護与歸檔)  

---

### 1️⃣ 檔案结构总览

0 Personals/
  ├─ 📥 00_InBox/ ← 所有即时捕获的原始筆記
  └─ 📦 01_Core/ ← 经篩選后的核心筆記（符合三条规则）
1 Projects/
2 Areas/
3 Resources/
4 Archives/ ← 已完成或不再活跃的記錄

### 2️⃣ 从 Inbox 到 Core 的全流程
| 步骤 | 操作方式 | 外掛/腳本 |
|------|----------|-----------|
| **捕获** | QuickAdd → “捕获原始素材” → 填寫标题 + 內容 | QuickAdd Macro + `Create a raw.js` |
| **AI 初筛** | 在 `00_InBox` 中運行 Templater 模板 `note-summary.md`（調用 `gpt‑oss:120b‑cloud`） | Templater |
| **24 h 二次篩選** | 腳本 `moveToCore.js` 自動檢查三条规则 → 搬入对应的 `01_Core` 子資料夾 | Custom JS |
| **歸檔** | 每周打開 `09_Weekly Review.md` → 腳本 `autoArchive.js` 将 `status: done` 且 >30 天的筆記搬至 `04_Archives` | Custom JS |

### 3️⃣ 專案 / 领域 / 資源 的划分原則
| 类型 | 何时使用 | 示例 |
|------|----------|------|
| **Project** | 有明确起止時間、可交付成果的任務 | “撰写《少记·分层·AI 辅助》文章”。 |
# 管理
| **Resource** | 静态參考资料、學習材料 | “少记法學習手册”。 |

# 配置
- **QuickAdd**：創建宏 `捕获原始素材`（两段 Prompt + Run JS）。  
- **Templater**：模板 `note-summary.md`（調用 Ollama）。  
- **Dataview**：在 `01_Core` 中創建看板，实时展示各类筆記的数量与狀態。  
- **Obsidian Custom JS**：放置 `moveToCore.js` 与 `autoArchive.js`，在 Settings → Custom JS → *Run daily* 中设定時間点。  

### 5️⃣ 維護与歸檔（Weekly Review）
在 `09_Weekly Review.md`（Periodic Notes）底部加入：
每次打開该周报时，腳本会自動把已完成且超过 30 天的筆記歸檔，保持核心库整洁。

---

> **📌 小结**  
1️⃣ 所有原始資訊进入 `0 Personals/📥 00_InBox`。  
2️⃣ 用 AI 生成 3‑点摘要并放回同檔案。  
3️⃣ 24 h 后执行 `moveToCore.js`，只保留满足 **未来使用場景 / 價值转变 / 单一钩子** 的筆記。  
4️⃣ 根据內容类型搬到 **Projects / Areas / Resources**。  
5️⃣ 每周歸檔，保持轻量化的第二大脑。


```