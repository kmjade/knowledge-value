---
title: Resources Cache
date: 2026-01-26
tags: [cache, resources]
---

# Resources 緩存索引

> 最後更新：2026-01-26

---

## 📊 統計信息

| 指標 | 數值 |
|------|------|
| 總筆記數 | 28 |
| 文件夾數 | 12 |
| 最後更新 | 2026-01-26 |

---

## 📁 按主題分類

### 01-Tech/

#### Programming/
| 文件名 | 興趣程度 |
|--------|----------|
| Programming.md | - |

#### AI-ML/
| 文件名 | 興趣程度 |
|--------|----------|
| AI-ML.md | - |
| 機器學習.md | - |

#### Data-Science/
| 文件名 | 興趣程度 |
|--------|----------|
| Data-Science.md | - |
| 數據分析方法.md | - |

### 02-Learning/

#### Courses/
| 文件名 | 興趣程度 |
|--------|----------|
| Courses.md | - |
| PARA學習與實施計劃.md | - |

#### Books/
| 文件名 | 興趣程度 |
|--------|----------|
| Books.md | - |

### 03-Productivity/

#### Tools/
| 文件名 | 興趣程度 |
|--------|----------|
| Tools.md | - |
| Obsidian 外掛精選.md | ⭐⭐⭐⭐⭐ |
| PARA工作流.md | ⭐⭐⭐⭐⭐ |
| PARA歸檔結構.md | ⭐⭐⭐⭐⭐ |
| 專案管理.md | - |

#### Methods/
| 文件名 | 興趣程度 |
|--------|----------|
| Methods.md | - |
| PARA指南.md | ⭐⭐⭐⭐⭐ |
| 時間管理.md | ⭐⭐⭐⭐⭐ |
| Dataview 使用指南.md | ⭐⭐⭐⭐⭐ |
| 前端數據可視化.md | ⭐⭐⭐⭐⭐ |
| Inbox 工作流.md | ⭐⭐⭐⭐⭐ |
| Getting Things Done.md | ⭐⭐⭐⭐⭐ |

### 04-Interests/

#### Travel/
| 文件名 | 興趣程度 |
|--------|----------|
| Travel.md | - |

#### Cooking/
| 文件名 | 興趣程度 |
|--------|----------|
| Cooking.md | - |

#### Hobbies/
| 文件名 | 興趣程度 |
|--------|----------|
| Hobbies.md | - |

### 05-Reference/

#### Documents/
| 文件名 | 興趣程度 |
|--------|----------|
| Documents.md | - |

#### Templates/
| 文件名 | 興趣程度 |
|--------|----------|
| Templates.md | - |

---

## 🔥 熱門資源 (Top 10)

| 排名 | 文件名 | 興趣程度 | 創建日期 |
|------|--------|----------|----------|
| 1 | Obsidian 外掛精選.md | ⭐⭐⭐⭐⭐ | 2026-01-26 |
| 2 | PARA工作流.md | ⭐⭐⭐⭐⭐ | 2026-01-26 |
| 3 | PARA歸檔結構.md | ⭐⭐⭐⭐⭐ | 2026-01-26 |
| 4 | PARA指南.md | ⭐⭐⭐⭐⭐ | 2026-01-26 |
| 5 | 時間管理.md | ⭐⭐⭐⭐⭐ | 2026-01-26 |
| 6 | Dataview 使用指南.md | ⭐⭐⭐⭐⭐ | 2026-01-26 |
| 7 | 前端數據可視化.md | ⭐⭐⭐⭐⭐ | 2026-01-26 |
| 8 | Inbox 工作流.md | ⭐⭐⭐⭐⭐ | 2026-01-26 |
| 9 | Getting Things Done.md | ⭐⭐⭐⭐⭐ | 2026-01-26 |
| 10 | 專案管理.md | - | - |

---

## 📊 按興趣程度分類

### ⭐⭐⭐⭐⭐
- Obsidian 外掛精選.md
- PARA工作流.md
- PARA歸檔結構.md
- PARA指南.md
- 時間管理.md
- Dataview 使用指南.md
- 前端數據可視化.md
- Inbox 工作流.md
- Getting Things Done.md

### ⭐⭐⭐⭐
- (無)

### ⭐⭐⭐
- (無)

### ⭐⭐
- (無)

### ⭐
- (無)

### 未評級
- Programming.md
- AI-ML.md
- 機器學習.md
- Data-Science.md
- 數據分析方法.md
- Courses.md
- PARA學習與實施計劃.md
- Books.md
- Tools.md
- 專案管理.md
- Methods.md
- Travel.md
- Cooking.md
- Hobbies.md
- Documents.md
- Templates.md
- Projects-Index.md (待移至 _Cache)
- Areas-Index.md (待移至 _Cache)
- Resources-Index.md (待移至 _Cache)
- PARA-Overview.md (待移至 _Cache)

---

## 🔗 相關項目和領域

```dataview
TABLE without ID
  file.link AS "資源",
  file.outlinks.length AS "連結數",
  filter(file.outlinks, (l) => startswith(l.path, "1 Projects")) AS "關聯項目"
FROM "3 Resources"
WHERE file.name != this.file.name AND !startswith(file.name, "_Cache")
SORT file.outlinks.length DESC
LIMIT 10
```

---

## ⚠️ 待處理項目

- [ ] 為資源添加 `interest-level` 屬性
- [ ] 為資源添加 `last-reviewed` 屬性
- [ ] 建立資源與項目/領域的關聯
- [ ] 移動 _Cache/ 下的索引文件到 _Cache/ 文件夾

---

> 💡 **提示**: 此緩存文件由 `/para-刷新缓存` 命令自動生成。手動修改可能導致數據不一致。
