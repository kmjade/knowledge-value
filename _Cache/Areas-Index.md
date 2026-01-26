---
title: Areas Cache
date: 2026-01-26
tags: [cache, areas]
---

# Areas 緩存索引

> 最後更新：2026-01-26

---

## 📊 統計信息

| 指標 | 數值 |
|------|------|
| 總筆記數 | 5 |
| 文件夾數 | 6 |
| 最後更新 | 2026-01-26 |

---

## 📁 按文件夾分類

### 01-Health/
| 文件名 | 檢視頻率 | 上次檢視 |
|--------|----------|----------|
| 健康管理.md | - | - |

### 02-Career/
| 文件名 | 檢視頻率 | 上次檢視 |
|--------|----------|----------|
| 職業發展.md | - | - |

### 03-Finance/
| 文件名 | 檢視頻率 | 上次檢視 |
|--------|----------|----------|
| 財務規劃.md | - | - |

### 04-Relationships/
| 文件名 | 檢視頻率 | 上次檢視 |
|--------|----------|----------|
| (待添加) | - | - |

### 05-Learning/
| 文件名 | 檢視頻率 | 上次檢視 |
|--------|----------|----------|
| (待添加) | - | - |

### 06-Lifestyle/
| 文件名 | 檢視頻率 | 上次檢視 |
|--------|----------|----------|
| (待添加) | - | - |

---

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

---

## ⚠️ 待處理項目

- [ ] 為領域添加 frontmatter 屬性（importance, review-frequency, last-reviewed）
- [ ] 設置檢視頻率
- [ ] 建立領域與項目的關聯

---

> 💡 **提示**: 此緩存文件由 `/para-刷新缓存` 命令自動生成。手動修改可能導致數據不一致。
