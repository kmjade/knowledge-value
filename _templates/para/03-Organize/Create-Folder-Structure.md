---
title: 原子任務：建立 PARA 資料夾結構
type: atomic-task
difficulty: beginner
estimated-time: 20-30 minutes
completion-criteria:
  - Projects 資料夾已建立
  - Areas 資料夾已建立
  - Resources 資料夾已建立
  - Archives 資料夾已建立
  - 子資料夾結構完整
---

# 任務目標
建立完整的 PARA 資料夾結構

## PARA 資料夾結構概覽

```
PARA/
├── 1 Projects/          # 有明確目標和期限的項目
├── 2 Areas/            # 持續維護的生活領域
├── 3 Resources/        # 有興趣的主題資源
├── 4 Archives/         # 已完成或過時的內容
└── README.md           # PARA 系統說明
```

---

## 資料夾清單

### 主資料夾建立

- [ ] `1 Projects/` - 項目資料夾
- [ ] `2 Areas/` - 領域資料夾
- [ ] `3 Resources/` - 資源資料夾
- [ ] `4 Archives/` - 歸檔資料夾

---

## Projects 資料夾結構

### 基礎結構
- [ ] `1 Projects/🚀 進行中/` - 進行中的項目
- [ ] `1 Projects/⏸️ 暫停中/` - 暫停的項目
- [ ] `1 Projects/✅ 已完成/` - 已完成的項目

### 可選子結構
- [ ] `1 Projects/01-Learning/` - 學習項目
- [ ] `1 Projects/02-Work/` - 工作項目
- [ ] `1 Projects/03-Personal/` - 個人項目
- [ ] `1 Projects/04-Creative/` - 創作項目

---

## Areas 資料夾結構

### 核心領域結構
- [ ] `2 Areas/01-Health/` - 健康領域
- [ ] `2 Areas/02-Career/` - 職業領域
- [ ] `2 Areas/03-Finance/` - 財務領域
- [ ] `2 Areas/04-Relationships/` - 人際關係領域
- [ ] `2 Areas/05-Learning/` - 學習領域
- [ ] `2 Areas/06-Lifestyle/` - 生活領域

### 每個領域可選子結構
- [ ] `{Area}/README.md` - 領域說明文件
- [ ] `{Area}/📋 維護清單/` - 維護任務清單
- [ ] `{Area}/📊 監控指標/` - 監控指標記錄

---

## Resources 資料夾結構

### 主分類結構
- [ ] `3 Resources/01-Tech/` - 技術資源
- [ ] `3 Resources/02-Learning/` - 學習資源
- [ ] `3 Resources/03-Productivity/` - 效率資源
- [ ] `3 Resources/04-Automation/` - 自動化資源
- [ ] `3 Resources/05-Reference/` - 參考資料
- [ ] `3 Resources/06-Social/` - 社交資源

### 每個類別可選子結構
- [ ] `{Resource}/README.md` - 類別說明文件
- [ ] `{Resource}/📚 書籍/` - 書籍筆記
- [ ] `{Resource}/📄 文章/` - 文章收藏
- [ ] `{Resource}/🎥 影片/` - 影片收藏

---

## Archives 資料夾結構

### 按年份歸檔
- [ ] `4 Archives/2024/` - 2024 年歸檔
- [ ] `4 Archives/2025/` - 2025 年歸檔
- [ ] `4 Archives/2026/` - 2026 年歸檔

### 按類型歸檔
- [ ] `4 Archives/by-type/Projects-Old/` - 舊項目歸檔
- [ ] `4 Archives/by-type/Areas-Old/` - 舊領域歸檔
- [ ] `4 Archives/by-type/Resources-Old/` - 舊資源歸檔

### 按狀態歸檔
- [ ] `4 Archives/by-status/completed/` - 已完成項目
- [ ] `4 Archives/by-status/cancelled/` - 已取消項目

---

## 命名規則建議

### 資料夾命名
- **Projects**：使用狀態前綴（如：🚀 進行中、⏸️ 暫停中、✅ 已完成）
- **Areas**：使用編號前綴（如：01-Health、02-Career）
- **Resources**：使用編號前綴（如：01-Tech、02-Learning）
- **Archives**：使用年份或類型前綴（如：2024、by-type）

### 文件命名
- **Projects**：`[年份]-[季度]-具體項目名稱.md`
- **Areas**：`[領域名稱].md` 或 `[領域名稱]/[具體方面].md`
- **Resources**：`[主題名稱].md` 或 `[類別]/[主題]/[子主題].md`
- **Archives**：`歸檔：[原標題].md` 或 `[類別-Old]/[年份]/[具體說明].md`

---

## 設置步驟

### 步驟 1：建立主資料夾（5 分鐘）

#### 創建 PARA 主結構
```bash
# 在 Obsidian vault 根目錄執行
mkdir -p "1 Projects"
mkdir -p "2 Areas"
mkdir -p "3 Resources"
mkdir -p "4 Archives"
```

或在 Obsidian 中：
1. 點擊「創建資料夾」
2. 依序創建四個主資料夾
3. 設定資料夾名稱

---

### 步驟 2：建立 Projects 子資料夾（5 分鐘）

#### 創建 Projects 子結構
```bash
mkdir -p "1 Projects/🚀 進行中"
mkdir -p "1 Projects/⏸️ 暫停中"
mkdir -p "1 Projects/✅ 已完成"
```

或在 Obsidian 中：
1. 打開「1 Projects」資料夾
2. 依序創建三個子資料夾
3. 設定資料夾名稱和表情符號

---

### 步驟 3：建立 Areas 子資料夾（10 分鐘）

#### 創建 Areas 子結構
```bash
mkdir -p "2 Areas/01-Health"
mkdir -p "2 Areas/02-Career"
mkdir -p "2 Areas/03-Finance"
mkdir -p "2 Areas/04-Relationships"
mkdir -p "2 Areas/05-Learning"
mkdir -p "2 Areas/06-Lifestyle"
```

或在 Obsidian 中：
1. 打開「2 Areas」資料夾
2. 依序創建六個核心領域資料夾
3. 設定資料夾名稱和編號

---

### 步驟 4：建立 Resources 子資料夾（5 分鐘）

#### 創建 Resources 子結構
```bash
mkdir -p "3 Resources/01-Tech"
mkdir -p "3 Resources/02-Learning"
mkdir -p "3 Resources/03-Productivity"
mkdir -p "3 Resources/04-Automation"
mkdir -p "3 Resources/05-Reference"
```

或在 Obsidian 中：
1. 打開「3 Resources」資料夾
2. 依序創建主分類資料夾
3. 設定資料夾名稱和編號

---

### 步驟 5：建立 Archives 子資料夾（5 分鐘）

#### 創建 Archives 子結構
```bash
mkdir -p "4 Archives/2024"
mkdir -p "4 Archives/2025"
mkdir -p "4 Archives/2026"
mkdir -p "4 Archives/by-type/Projects-Old"
mkdir -p "4 Archives/by-type/Areas-Old"
mkdir -p "4 Archives/by-type/Resources-Old"
```

或在 Obsidian 中：
1. 打開「4 Archives」資料夾
2. 創建年度資料夾和類型資料夾
3. 設定資料夾名稱

---

## 測試驗證

### 測試 1：資料夾結構檢查

#### 檢查清單
- [ ] 所有主資料夾已建立
- [ ] 子資料夾結構完整
- [ ] 資料夾命名符合規則
- [ ] 結構清晰易懂

#### 視覺檢查
```
你的 PARA 資料夾應該像這樣：
├── 1 Projects/
│   ├── 🚀 進行中/
│   ├── ⏸️ 暫停中/
│   └── ✅ 已完成/
├── 2 Areas/
│   ├── 01-Health/
│   ├── 02-Career/
│   ├── 03-Finance/
│   ├── 04-Relationships/
│   ├── 05-Learning/
│   └── 06-Lifestyle/
├── 3 Resources/
│   ├── 01-Tech/
│   ├── 02-Learning/
│   ├── 03-Productivity/
│   ├── 04-Automation/
│   └── 05-Reference/
└── 4 Archives/
    ├── 2024/
    ├── 2025/
    ├── 2026/
    └── by-type/
        ├── Projects-Old/
        ├── Areas-Old/
        └── Resources-Old/
```

---

### 測試 2：資料夾操作測試

#### 創建測試文件
- [ ] 在「1 Projects/🚀 進行中/」創建測試文件
- [ ] 在「2 Areas/01-Health/」創建測試文件
- [ ] 在「3 Resources/01-Tech/」創建測試文件
- [ ] 在「4 Archives/2026/」創建測試文件

#### 移動測試
- [ ] 將測試文件從「1 Projects/🚀 進行中/」移動到「1 Projects/✅ 已完成/」
- [ ] 將測試文件從「3 Resources/01-Tech/」移動到「4 Archives/2026/」

---

## 驗證標準

- [ ] Projects 資料夾已建立
- [ ] Areas 資料夾已建立
- [ ] Resources 資料夾已建立
- [ ] Archives 資料夾已建立
- [ ] 子資料夾結構完整
- [ ] 資料夾命名符合規則
- [ ] 測試文件創建和移動正常

## 下一步

完成此原子任務後，繼續學習：
- [[Create-Projects-Template.md]] - 建立 Projects 模板
- [[Create-Areas-Template.md]] - 建立 Areas 模板
- [[Create-Resources-Template.md]] - 建立 Resources 模板
- [[Create-Archives-Template.md]] - 建立 Archives 模板
