---
title: Projects Cache
date: 2026-01-26
tags: [cache, projects]
---

# Projects 緩存索引

> 最後更新：2026-01-26

---

## 📊 統計信息

| 指標 | 數值 |
|------|------|
| 總筆記數 | 6 |
| 文件夾數 | 4 |
| 最後更新 | 2026-01-26 |

---

## 📁 按文件夾分類

### 01-Learning/
| 文件名 | 狀態 | 截止日期 |
|--------|------|----------|
| Obsidian學習計劃.md | - | - |
| PARA 學習計畫.md | - | - |

### 02-Work/
| 文件名 | 狀態 | 截止日期 |
|--------|------|----------|
| 建立知識庫.md | - | - |

### 03-Personal/
| 文件名 | 狀態 | 截止日期 |
|--------|------|----------|
| (待添加) | - | - |

### 04-Creative/
| 文件名 | 狀態 | 截止日期 |
|--------|------|----------|
| (待添加) | - | - |

---

## 📋 按狀態分類

### Active
- (無)

### On-Hold
- (無)

### Completed
- (無)

---

## 🔗 內部連結

```dataview
TABLE without ID
  file.link AS "筆記",
  file.outlinks.length AS "連結數",
  file.inlinks.length AS "被連結數"
FROM "1 Projects"
WHERE file.name != this.file.name
SORT file.outlinks.length DESC
```

---

## ⚠️ 待處理項目

- [ ] 為項目添加 frontmatter 屬性（status, due, priority）
- [ ] 設置項目截止日期
- [ ] 建立項目之間的關聯

---

> 💡 **提示**: 此緩存文件由 `/para-刷新缓存` 命令自動生成。手動修改可能導致數據不一致。
