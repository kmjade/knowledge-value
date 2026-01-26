---
aliases:
  - 卡片盒筆記
  - Zettelkasten System
tags:
  - zettelkasten
  - area
---

# Zettels / 卡片盒筆記系統

> [!info] 系統概覽
> 原子化筆記系統，每張卡片只記錄一個核心思想，通過鏈接形成知識網絡。

> [!tip] 完整指南
> 想深入了解 Zettelkasten 方法論？請參閱 [[Zettelkasten]] 完整指南。

---

## 📖 系統說明 / System Overview

### Zettelkasten 核心原則

1. **原子性（Atomicity）** - 每張卡片只包含一個想法
2. **自主性（Autonomy）** - 卡片可以獨立理解
3. **鏈接性（Linkage）** - 通過鏈接建立知識關聯
4. **編號系統（Numbering）** - 使用唯一標識符管理卡片

### 為何使用 Zettelkasten？

- 🧠 **促進創造性思維**：通過知識連接產生新想法
- 📚 **長期知識累積**：建立可持續成長的知識庫
- 🔗 **發現隱藏關聯**：自動發現不同概念之間的連結
- 💡 **減輕認知負擔**：將想法外化到筆記系統

---

## 🗂️ 文件夾結構 / Folder Structure

```
📁 5 Zettels/
├── 📄 5 Zettels.md            # 系統概覽頁面（本文件）
├── 💡 fleeting/               # 閃念筆記（臨時）
├── 📚 literature/            # 文獻筆記
├── 📌 permanent/             # 永久筆記
└── 🗂️ structure/             # 結構筆記
```

---

## 📝 卡片類型 / Card Types

| 類型 | 說明 | 生命週期 | 範例 |
|------|------|---------|------|
| **閃念筆記** | 快速記錄想法和靈感 | 臨時，定期清理 | 💡 閃念-深度工作-想法 |
| **文獻筆記** | 記錄閱讀內容 | 長期參考 | 📚 深度工作-Cal Newport-第3章 |
| **永久筆記** | 標準化的核心思想 | 永久保存 | 📌 深度工作-定義 |
| **結構筆記** | 組織和概覽主題 | 持續更新 | 🗂️ 健康管理-結構 |

---

## 📊 系統統計 / Statistics

### 總體統計

```dataview
TABLE WITHOUT ID
  type AS 類型,
  length(rows) AS 數量,
  round(length(filter(rows, (r) => file.mtime > date(today) - dur(7 days))), 0) AS 本週更新
FROM "5 Zettels"
WHERE file.name != this.file.name
GROUP BY 1
SORT length(rows) DESC
```

### 最近創建的卡片

```dataview
TABLE
  file.link AS 卡片,
  type AS 類型,
  dateformat(file.ctime, "YYYY-MM-DD") AS 創建日期
FROM "5 Zettels"
WHERE file.name != this.file.name
SORT file.ctime DESC
LIMIT 10
```

### 鏈接密度

```dataview
TABLE WITHOUT ID
  "平均鏈接數" AS 指標,
  round(sum(length(file.outlinks)) / length(rows), 2) AS 數值
FROM "5 Zettels"
WHERE file.name != this.file.name
GROUP BY 1
```

### 孤立卡片（無鏈接）

```dataview
TABLE
  file.link AS 卡片,
  type AS 類型
FROM "5 Zettels"
WHERE length(file.outlinks) = 0 AND length(file.inlinks) = 0 AND file.name != this.file.name
SORT file.mtime DESC
```

---

## 🔍 按標籤瀏覽 / Browse by Tags

```dataview
TABLE
  tags AS 標籤,
  length(rows) AS 卡片數
FROM "5 Zettels"
WHERE file.name != this.file.name
FLATTEN tags
GROUP BY tags
SORT length(rows) DESC
LIMIT 20
```

---

## 🎯 快速操作 / Quick Actions

### 創建新卡片

> [!tip] 創建建議
> 建議使用 QuickAdd 設置快捷鍵來快速創建各類型的卡片。

**閃念筆記**：快速記錄想法
**永久筆記**：記錄標準化的核心思想
**文獻筆記**：記錄閱讀內容
**結構筆記**：組織相關卡片

### 系統維護

- [ ] 清理舊的閃念筆記（轉換為永久筆記或刪除）
- [ ] 檢查並連接孤立卡片
- [ ] 更新結構筆記
- [ ] 審查並更新過時的卡片

---

## 🔄 工作流建議 / Workflow Suggestions

### 每日工作流（15-30 分鐘）

1. **收獲階段**（5-10 分鐘）
   - 記錄所有閃念筆記
   - 快速閱讀並記錄文獻筆記

2. **處理階段**（10-15 分鐘）
   - 審閱昨天的閃念筆記
   - 將有價值的筆記轉換為永久筆記
   - 建立鏈接到相關卡片

3. **回顧階段**（5 分鐘）
   - 瀏覽最近的永久筆記
   - 發現新的連結和關聯

### 每週工作流（30-60 分鐘）

1. **整理與連接**（20-40 分鐘）
   - 處理所有未整理的閃念筆記
   - 將文獻筆記轉換為永久筆記
   - 深入探索現有卡片之間的連結

2. **系統維護**（10-20 分鐘）
   - 檢查孤立的卡片
   - 檢查過時或不準確的卡片
   - 更新相關的結構筆記

---

## 📌 卡片命名規範 / Naming Conventions

### 閃念筆記
```
閃念-主題.md
範例：閃念-深度工作.md
```

### 文獻筆記
```
書名-作者-章節.md
範例：深度工作-Cal Newport-第3章.md
```

### 永久筆記
```
主題-具體概念.md
範例：健康-WHO定義.md
```

### 結構筆記
```
主題-結構.md
範例：健康管理-結構.md
```

---

## 🔗 關連筆記 / Related Notes

- [[Digital Organization]]
- [[Note-Taking Workflows]]
- [[PARA Methodology]]
- [[Zettelkasten]] - 完整的 Zettelkasten 方法論指南
- [[How to Take Smart Notes]]

---

## 📌 常見問題 / FAQ

**Q: 閃念筆記應該保留多久？**
A: 建議每週處理一次。有價值的轉換為永久筆記，無價值的刪除。

**Q: 如何知道兩張卡片是否應該連接？**
A: 如果卡片之間有直接或間接的關聯（主題相關、因果關係、比較關係、應用關係），就應該連接。

**Q: 孤立卡片需要處理嗎？**
A: 是的。嘗試找到相關的卡片建立連接。如果找不到，可能需要重新審查卡片內容或刪除。

**Q: 結構筆記何時創建？**
A: 當某個主題下有多個永久筆記（建議至少 5 個）時，創建結構筆記來組織它們。

---

## 📅 系統健康檢查 / System Health Check

- [ ] 本週創建了至少 10 張永久筆記？
- [ ] 平均每張卡片有 2 個以上的鏈接？
- [ ] 孤立卡片比率低於 10%？
- [ ] 所有閃念筆記都已處理？
- [ ] 結構筆記已更新？

---

**最後更新**：`{{date:YYYY-MM-DD}}`
**下次系統檢查**：`{{date+1W:YYYY-MM-DD}}`
