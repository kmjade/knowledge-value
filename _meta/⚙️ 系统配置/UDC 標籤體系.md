---
title: UDC 標籤體系 UDC Tag System
title-en: UDC Tag System
status: active
tags: [system, tag, udc, classification]
aliases: [UDC Tags, UDC Label System]
created: 2026-02-16
modified: 2026-02-16
language: mixed
---

# UDC 標籤體系 / UDC Tag System

> 基於 Universal Decimal Classification (UDC) 的標籤系統，用於知識分類與組織。
> A tag system based on Universal Decimal Classification (UDC) for knowledge classification and organization.

---

## 標籤架構 / Tag Architecture

```
UDC 標籤體系 / UDC Tag System
│
├── #udc/0xx  - 總類 Generalities
├── #udc/1xx  - 哲學 Philosophy  
├── #udc/2xx  - 宗教 Religion
├── #udc/3xx  - 社會科學 Social Sciences
├── #udc/4xx  - 語言學 Philology
├── #udc/5xx  - 自然科學 Natural Sciences
├── #udc/6xx  - 應用科學 Applied Sciences
├── #udc/7xx  - 藝術 Arts
├── #udc/8xx  - 文學 Literature
└── #udc/9xx  - 歷史與地理 History & Geography
```

---

## 主要類別標籤 / Main Class Tags

### #udc/0xx - 總類 / Generalities

| 標籤 Tag | 說明 Description | UDC Code |
|----------|-----------------|----------|
| #udc/000 | 總論 General works | 000 |
| #udc/001 | 知識論 Knowledge theory | 001 |
| #udc/001.1 | 資訊科學 Information science | 001.1 |
| #udc/004 | 資訊科技 Information technology | 004 |
| #udc/005 | 程式設計 Programming | 005 |

### #udc/1xx - 哲學 / Philosophy

| 標籤 Tag | 說明 Description | UDC Code |
|----------|-----------------|----------|
| #udc/100 | 哲學 Philosophy | 100 |
| #udc/150 | 心理學 Psychology | 150 |
| #udc/160 | 邏輯學 Logic | 160 |
| #udc/170 | 倫理學 Ethics | 170 |
| #udc/178 | 科技倫理 Technology ethics | 178 |

### #udc/3xx - 社會科學 / Social Sciences

| 標籤 Tag | 說明 Description | UDC Code |
|----------|-----------------|----------|
| #udc/300 | 社會科學 Social sciences | 300 |
| #udc/330 | 經濟學 Economics | 330 |
| #udc/340 | 法學 Law | 340 |
| #udc/347 | 商法 Commercial law | 347 |
| #udc/370 | 教育學 Education | 370 |

### #udc/5xx - 自然科學 / Natural Sciences

| 標籤 Tag | 說明 Description | UDC Code |
|----------|-----------------|----------|
| #udc/500 | 自然科學 Natural sciences | 500 |
| #udc/510 | 數學 Mathematics | 510 |
| #udc/519 | 機率與統計 Probability & Statistics | 519 |
| #udc/530 | 物理學 Physics | 530 |
| #udc/570 | 生物學 Biology | 570 |

### #udc/6xx - 應用科學 / Applied Sciences ⭐

| 標籤 Tag | 說明 Description | UDC Code |
|----------|-----------------|----------|
| #udc/600 | 應用科學 Applied sciences | 600 |
| #udc/620 | 工程學 Engineering | 620 |
| #udc/621 | 機械工程 Mechanical engineering | 621 |
| #udc/621.3 | 電機工程 Electrical engineering | 621.3 |
| #udc/621.39 | 電信 Telecommunications | 621.39 |
| #udc/681 | 精密儀器 Precision instruments | 681 |
| #udc/681.3 | 電腦 Computers | 681.3 |

### #udc/7xx - 藝術 / Arts

| 標籤 Tag | 說明 Description | UDC Code |
|----------|-----------------|----------|
| #udc/700 | 藝術 Arts | 700 |
| #udc/740 | 繪畫 Drawing | 740 |
| #udc/745 | 設計 Design | 745 |
| #udc/745.4 | UI設計 UI design | 745.4 |
| #udc/745.5 | 互動設計 Interaction design | 745.5 |
| #udc/760 | 圖案設計 Graphic arts | 760 |
| #udc/776 | 影像處理 Image processing | 776 |

### #udc/8xx - 文學 / Literature

| 標籤 Tag | 說明 Description | UDC Code |
|----------|-----------------|----------|
| #udc/800 | 文學 Literature | 800 |
| #udc/808 | 修辭學 Rhetoric | 808 |
| #udc/808.5 | 技術寫作 Technical writing | 808.5 |

---

## 技術相關標籤 / Tech-Related Tags

### 資訊科技 / Information Technology

```
#udc/tech/           # 技術標籤前綴
├── #udc/tech/ai           # 人工智慧 AI
├── #udc/tech/ml            # 機器學習 Machine Learning
├── #udc/tech/dl            # 深度學習 Deep Learning
├── #udc/tech/web           # 網頁開發 Web Development
├── #udc/tech/backend       # 後端開發 Backend
├── #udc/tech/frontend      # 前端開發 Frontend
├── #udc/tech/devops        # DevOps
├── #udc/tech/cloud         # 雲端技術 Cloud
├── #udc/tech/security      # 資訊安全 Security
├── #udc/tech/database      # 資料庫 Database
├── #udc/tech/network       # 網路工程 Network
└── #udc/tech/quantum      # 量子計算 Quantum Computing
```

### 程式語言 / Programming Languages

```
#udc/lang/          # 程式語言標籤前綴
├── #udc/lang/python        # Python
├── #udc/lang/java          # Java
├── #udc/lang/javascript    # JavaScript
├── #udc/lang/typescript   # TypeScript
├── #udc/lang/go            # Go
├── #udc/lang/rust          # Rust
├── #udc/lang/csharp        # C#
└── #udc/lang/cpp           # C++
```

---

## 標籤使用範例 / Tag Usage Examples

### 技術學習筆記 / Tech Learning Note

```yaml
---
title: Python 學習筆記
tags:
  - #udc/681.3        # 電腦 Computers
  - #udc/005          # 程式設計 Programming
  - #udc/lang/python  # Python
  - #para/area/learning
  - #zettel/type/permanent
---
```

### AI 領域筆記 / AI Field Note

```yaml
---
title: LangChain 學習筆記
tags:
  - #udc/681.3        # 電腦
  - #udc/tech/ai      # 人工智慧
  - #udc/tech/ml      # 機器學習
  - #para/area/learning
---
```

### 設計相關筆記 / Design Note

```yaml
---
title: UI 設計原則
tags:
  - #udc/745.4        # UI 設計
  - #udc/700           # 藝術
  - #para/area/learning
---
```

---

## UDC + PARA 整合標籤 / Combined Tags

### 領域 + 分類 / Area + Classification

```
#para/area/learning + #udc/6xx
├── #para/area/learning + #udc/004    # 資訊科技學習
├── #para/area/learning + #udc/681.3  # 電腦科學學習
└── #para/area/learning + #udc/005    # 程式設計學習

#para/area/career + #udc/3xx
├── #para/area/career + #udc/330       # 經濟學
└── #para/area/career + #udc/340       # 法學
```

### 項目 + 分類 / Project + Classification

```
#para/project/learning + #udc/tech/ai
# 學習項目 - AI 領域
```

---

## 快速查詢表 / Quick Reference

### 常見技術分類 / Common Tech Classifications

| 領域 Field | UDC Tag | 說明 Description |
|-----------|---------|------------------|
| 電腦科學 | #udc/004 | Computer Science |
| 軟體工程 | #udc/005 | Software Engineering |
| 電腦硬體 | #udc/681.3 | Computer Hardware |
| AI/ML | #udc/004 + #udc/519 | AI/Machine Learning |
| 網路工程 | #udc/621.39 | Network Engineering |
| 電子工程 | #udc/621.3 | Electrical Engineering |
| UI 設計 | #udc/745.4 | UI Design |
| 數據科學 | #udc/519.5 | Data Science |
| 技術寫作 | #udc/808.5 | Technical Writing |
| 科技倫理 | #udc/178 | Technology Ethics |

---

## 標籤命名規則 / Tag Naming Conventions

1. **格式 Format**: 使用 `#udc/` 前綴
2. **語言 Language**: 英文為主
3. **層級 Hierarchy**: 使用 `/` 表示層級
4. **數字 Number**: 對應 UDC 編號

### 範例 Examples

> [!examples] UDC 

```
#udc/004           # 資訊科技總論
#udc/004.8         # 資訊安全
#udc/681.3         # 電腦
#udc/tech/ai       # 人工智慧（擴展標籤）
#udc/lang/python    # Python 語言
```

---

## 相關筆記 / Related Notes

- [[UDC 知識庫]] - UDC Knowledge Base
- [[UDC Subject System Guide]] - UDC 分類指南
- [[技術學習]] - Tech Learning Hub
- [[tag-system-guide]] - 現有標籤系統

---

*分類: _meta/系統配置*
*語言: English / 繁體中文 混排*
*更新: 2026-02-16*
