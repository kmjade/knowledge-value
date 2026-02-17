---
title: Areas Cache
date: 2026-02-15
tags: [cache, areas]
---

# Areas 緩存索引

## 📊 Areas 統計

| 指標 | 數值 |
|------|------|
| 總筆記數 | 6 |
| 活躍領域 | 6 |
| 已完成領域 | 0 |
| 擱置領域 | 0 |

## 📋 領域列表

### 01-Health/
| 領域筆記 | 狀態 | 連結數 | 最後更新 |
|----------|------|--------|----------|
| | - | - | |

### 02-Career/
| 領域筆記 | 狀態 | 連結數 | 最後更新 |
|----------|------|--------|----------|
| 職業發展.md | 活躍 | | |

### 03-Finance/
| 領域筆記 | 狀態 | 連結數 | 最後更新 |
|----------|------|--------|----------|
| 財務規劃.md | 活躍 | | |

### 04-Relationships/
| 領域筆記 | 狀態 | 連結數 | 最後更新 |
|----------|------|--------|----------|
| | - | - | |

### 05-Learning/
| 領域筆記 | 狀態 | 連結數 | 最後更新 |
|----------|------|--------|----------|
| | - | - | |

### 06-Lifestyle/
| 領域筆記 | 狀態 | 連結數 | 最後更新 |
|----------|------|--------|----------|
| | - | - | |

## 🔗 關聯項目

```dataview
TABLE without ID
  file.link AS "領域",
  file.outlinks.length AS "連結數",
  filter(file.outlinks, (l) => startswith(l.path, "1 Projects")) AS "關聯項目"
FROM "2 Areas"
WHERE file.name != this.file.name
SORT file.outlinks.length DESC
```

## 📈 領域活動排名

```dataview
TABLE without ID
  file.link AS "領域",
  file.mtime AS "最後更新",
  file.outlinks.length AS "連結數"
FROM "2 Areas"
WHERE file.name != this.file.name
SORT file.mtime DESC
LIMIT 5
```

---

## ⚙️ 管理

### 🔄 更新頻率
- **每月更新**: 檢視領域進度和目標
- **季度更新**: 評估目標達成情況
- **年度更新**: 重新評估領域優先級

### 🎯 待辦事項
- [ ] 設置領域檢視頻率
- [ ] 建立領域與項目的關聯
- [ ] 更新Areas-Index.md的統計數據
- [ ] 檢查所有領域模板的一致性

---

## 📞 維護

**最後更新**: 2026-02-15
**維護者**: Claudian
**下次更新**: 2026-03-15
