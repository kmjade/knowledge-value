---
title: DataviewJS 外掛
interest-level: ⭐⭐⭐⭐
last-reviewed: 2026-01-26
tags:
  - resource/productivity
  - tool/obsidian
  - dataviewjs
  - javascript
---

# DataviewJS 外掛

> Dataview 的高級功能，使用 JavaScript 構建自定義數據查詢和視圖

---

## 📖 基礎概念

### DataviewJS 是什麼？

DataviewJS 是 Dataview 外掛的進階功能，允許你：

- 使用完整的 JavaScript 編寫查詢邏輯
- 創建完全自定義的輸出格式
- 調用 Obsidian API 和其他外掛
- 處理複雜的數據計算和轉換
- 生成交互式界面

### Dataview vs DataviewJS

| 特性 | Dataview | DataviewJS |
|------|----------|------------|
| 語法 | 聲明式查詢語言 | JavaScript |
| 複雜度 | 簡單到中等 | 任意複雜度 |
| 靈活性 | 受限於預定義格式 | 完全自定義 |
| 學習曲線 | 簡單 | 需要 JavaScript 知識 |
| 性能 | 優化查詢 | 取決於代碼效率 |

---

## 🔧 安裝與設置

### 啟用 DataviewJS

1. 打開 Obsidian 設置 → 社群外掛 → Dataview
2. 啟用 **"Enable JavaScript queries"** 選項
3. 重新加載 Obsidian（如果提示）

### 安全注意事務

⚠️ **重要安全警告**：

- DataviewJS 可以執行任意 JavaScript 代碼
- 只在可信來源共享的筆記中使用
- 避免在第三方模板中啟用
- 謹慎處理用戶輸入和外部數據

---

## 🚀 基本語法

### 代碼塊格式

DataviewJS 使用 ````dataviewjs` 標記：

````markdown
```dataviewjs
dv.table(
  ["名稱", "數量"],
  dv.pages("#book")
    .where(p => p.pages)
    .map(p => [p.file.link, p.pages])
)
```
````

### dv 對象

`dv` 是 DataviewJS 提供的核心對象，包含所有 API 方法。

---

## 📝 核心 API

### 1. dv.pages() - 獲取筆記

```dataviewjs
// 獲取所有筆記
const allPages = dv.pages();

// 從路徑獲取
const projects = dv.pages('"1 Projects"');

// 從標籤獲取
const books = dv.pages('#book');

// 篩選筆記
const activeProjects = dv.pages('"1 Projects"')
  .where(p => p.status === 'active');
```

### 2. dv.table() - 創建表格

```dataviewjs
dv.table(
  ["標題", "狀態", "截止日期"],
  dv.pages('"1 Projects"')
    .where(p => p.status)
    .map(p => [
      p.file.link,
      p.status,
      p.due || "無"
    ])
)
```

### 3. dv.list() - 創建列表

```dataviewjs
dv.list(
  dv.pages('"3 Resources"')
    .where(p => p.interest)
    .map(p => p.file.link)
)
```

### 4. dv.paragraph() - 創建段落

```dataviewjs
const count = dv.pages('"1 Projects"').length;
dv.paragraph(`**項目總數：** ${count}`);
```

### 5. dv.header() - 創建標題

```dataviewjs
dv.header(2, "活躍項目列表");
dv.list(
  dv.pages('"1 Projects"')
    .where(p => p.status === 'active')
    .map(p => p.file.link)
)
```

---

## 🎯 常用示例

### 1. 統計數據面板

```dataviewjs
// 項目統計
const projects = dv.pages('"1 Projects"');
const active = projects.where(p => p.status === 'active').length;
const completed = projects.where(p => p.status === 'completed').length;
const total = projects.length;

dv.header(3, "📊 項目統計");
dv.table(
  ["指標", "數值"],
  [
    ["總項目", total],
    ["活躍中", active],
    ["已完成", completed],
    ["進度", `${Math.round(completed/total*100)}%`]
  ]
);
```

### 2. 自定義格式表格

```dataviewjs
// 帶狀態圖標的表格
dv.table(
  ["📝 項目", "狀態", "⭐ 優先權", "📅 截止"],
  dv.pages('"1 Projects"')
    .where(p => p.status)
    .sort(p => p.priority, 'asc')
    .map(p => [
      p.file.link,
      p.status === 'active' ? '🟢' : '⏸️',
      '⭐'.repeat(p.priority || 0),
      p.due || '-'
    ])
)
```

### 3. 時間序列數據

```dataviewjs
// 本週創建的筆記
const oneWeekAgo = moment().subtract(7, 'days');
const recent = dv.pages()
  .where(p => p.file.ctime >= oneWeekAgo)
  .sort(p => p.file.ctime, 'desc');

dv.header(3, "📅 本週新筆記");
dv.table(
  ["筆記", "創建時間"],
  recent.map(p => [p.file.link, p.file.ctime.toLocaleString()])
);
```

### 4. 標籤分析

```dataviewjs
// 統計常用標籤
const tagCounts = {};
dv.pages()
  .forEach(p => {
    p.file.tags.forEach(t => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });

const sortedTags = Object.entries(tagCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10);

dv.header(3, "🏷️ 熱門標籤");
dv.table(
  ["標籤", "使用次數"],
  sortedTags
)
```

### 5. 分組顯示

```dataviewjs
// 按狀態分組顯示項目
const projects = dv.pages('"1 Projects"');
const groups = {};

projects.forEach(p => {
  const status = p.status || '未分類';
  if (!groups[status]) groups[status] = [];
  groups[status].push(p);
});

Object.entries(groups).forEach(([status, items]) => {
  dv.header(4, status);
  dv.list(items.map(p => p.file.link));
});
```

### 6. 進度條

```dataviewjs
// 項目進度條
const project = dv.pages('"1 Projects"').find(p => p.file.name.includes('目標'));
const progress = project.progress || 0;
const bar = '█'.repeat(Math.floor(progress/10)) + '░'.repeat(10 - Math.floor(progress/10));

dv.paragraph(`
### ${project.file.link}
${bar} ${progress}%
`)
```

### 7. 多表聯動

```dataviewjs
// 顯示項目及其關聯的領域
const projects = dv.pages('"1 Projects"');
const areas = dv.pages('"2 Areas"');

projects.forEach(project => {
  const relatedAreas = areas.filter(area =>
    area.file.outlinks.some(link => link.path === project.file.path)
  );

  if (relatedAreas.length > 0) {
    dv.paragraph(`**${project.file.link}** 屬於：`);
    dv.list(relatedAreas.map(a => a.file.link));
  }
});
```

---

## 🔄 數據處理

### 過濾數據

```dataviewjs
// 多條件過濾
const filtered = dv.pages('"1 Projects"')
  .where(p => p.status === 'active') // 活躍狀態
  .where(p => p.due) // 有截止日期
  .where(p => p.due >= moment()) // 未過期
  .where(p => p.priority >= 3); // 高優先權
```

### 排序數據

```dataviewjs
// 多字段排序
const sorted = dv.pages('"1 Projects"')
  .sort(p => p.priority, 'asc') // 先按優先權
  .sort(p => p.due, 'asc'); // 再按截止日期
```

### 數據變換

```dataviewjs
// 提取和轉換數據
const data = dv.pages('"3 Resources"')
  .map(p => ({
    name: p.file.name,
    interest: p['interest-level']?.length || 0,
    tags: p.file.tags.length
  }));
```

### 聚合計算

```dataviewjs
// 計算統計信息
const pages = dv.pages('"1 Projects"');
const avgPriority = pages
  .filter(p => p.priority)
  .reduce((sum, p) => sum + p.priority, 0) / pages.length;

dv.paragraph(`平均優先權：${avgPriority.toFixed(2)}`);
```

---

## 🎨 高級技巧

### 1. 使用 CSS 樣式

```dataviewjs
dv.el('div', {cls: 'dataview-highlight'}, (el) => {
  dv.el('span', '重點內容', {cls: 'highlight-text'});
});
```

配合 CSS：
```css
.dataview-highlight {
  padding: 10px;
  background: var(--background-secondary);
}
```

### 2. 條件渲染

```dataviewjs
const projects = dv.pages('"1 Projects"');

if (projects.length === 0) {
  dv.paragraph("❌ 沒有找到項目");
} else if (projects.length < 5) {
  dv.list(projects.map(p => p.file.link));
} else {
  dv.table(
    ["項目", "狀態"],
    projects.map(p => [p.file.link, p.status])
  );
}
```

### 3. 動態日期計算

```dataviewjs
// 計算距離截止還有多少天
const projects = dv.pages('"1 Projects"')
  .where(p => p.due);

dv.table(
  ["項目", "截止日期", "剩餘天數"],
  projects.map(p => {
    const daysLeft = Math.floor(moment(p.due).diff(moment(), 'days'));
    const urgency = daysLeft <= 3 ? '🔥' : daysLeft <= 7 ? '⚠️' : '✅';
    return [p.file.link, p.due, `${urgency} ${daysLeft} 天`];
  })
)
```

### 4. 錯誤處理

```dataviewjs
try {
  const data = dv.pages('"特殊路徑"');
  dv.list(data.map(p => p.file.link));
} catch (error) {
  dv.paragraph(`❌ 發生錯誤：${error.message}`);
}
```

---

## 📚 與 Obsidian API 集成

### 訪問當前文件

```dataviewjs
const currentFile = dv.current();
dv.paragraph(`當前文件：${currentFile.file.link}`);
```

### 使用外掛 API

```dataviewjs
// 訪問 Tasks 外掛數據（需要先檢查外掛是否安裝）
const tasks = app.plugins.plugins['dataview'].api
  .tasks('"待辦事項"')
  .where(t => !t.completed)
  .limit(10);

dv.list(tasks.map(t => t.text));
```

---

## ⚡ 性能優化

### 1. 限制查詢範圍

```dataviewjs
// ❌ 查詢整個庫
const all = dv.pages();

// ✅ 限定路徑
const projects = dv.pages('"1 Projects"');
```

### 2. 鏈式過濾

```dataviewjs
// ✅ 多次過濾比單次複雜條件更快
const filtered = dv.pages('"1 Projects"')
  .where(p => p.status)
  .where(p => p.priority)
  .where(p => p.status === 'active');
```

### 3. 避免重複查詢

```dataviewjs
// ❌ 重複查詢
dv.list(dv.pages('"1 Projects"').map(p => p.file.name));
dv.table(["名稱"], dv.pages('"1 Projects"').map(p => [p.file.name]));

// ✅ 緩存結果
const projects = dv.pages('"1 Projects"');
dv.list(projects.map(p => p.file.name));
dv.table(["名稱"], projects.map(p => [p.file.name]));
```

---

## 🐛 調試技巧

### 1. 使用 console.log

```dataviewjs
const data = dv.pages('"1 Projects"');
console.log(data); // 在瀏覽器控制台查看
```

打開控制台：`Ctrl+Shift+I` (Windows) 或 `Cmd+Option+I` (Mac)

### 2. 檢查數據類型

```dataviewjs
const p = dv.pages('"1 Projects"').first();
console.log(typeof p.status);
console.log(Array.isArray(p.tags));
```

### 3. 分步測試

```dataviewjs
// 先測試獲取數據
const pages = dv.pages('"1 Projects"');
dv.paragraph(`找到 ${pages.length} 個項目`);

// 再測試過濾
const filtered = pages.where(p => p.status === 'active');
dv.paragraph(`其中 ${filtered.length} 個活躍`);

// 最後顯示結果
dv.list(filtered.map(p => p.file.link));
```

---

## 📖 學習資源

### 官方文檔
- [Dataview GitHub](https://github.com/blacksmithgu/obsidian-dataview)
- [DataviewJS API 文檔](https://blacksmithgu.github.io/obsidian-dataview/api/)

### 社群資源
- [Obsidian 論壇 - Dataview](https://forum.obsidian.md/c/plugins/dataview/9)
- [Reddit - r/ObsidianMD](https://www.reddit.com/r/ObsidianMD/)

### 相關筆記
- [[3 Resources/03-Productivity/Methods/Dataview 使用指南]]
- [[3 Resources/03-Productivity/Methods/前端數據可視化]]

---

## ✅ 快速參考

### 常用 API 方法

| 方法 | 說明 | 示例 |
|------|------|------|
| `dv.pages()` | 獲取筆記 | `dv.pages('"1 Projects"')` |
| `dv.table()` | 創建表格 | `dv.table(["A","B"], [[1,2],[3,4]])` |
| `dv.list()` | 創建列表 | `dv.list([1,2,3])` |
| `dv.paragraph()` | 創建段落 | `dv.paragraph("文本")` |
| `dv.header()` | 創建標題 | `dv.header(2, "標題")` |
| `dv.el()` | 創建元素 | `dv.el('div', '內容')` |
| `dv.current()` | 當前文件 | `dv.current()` |

### 常用鏈式方法

| 方法 | 說明 |
|------|------|
| `.where()` | 過濾 |
| `.sort()` | 排序 |
| `.map()` | 變換 |
| `.limit()` | 限制數量 |
| `.first()` | 第一個 |
| `.last()` | 最後一個 |
| `.length` | 數量 |

---

> **提示**: DataviewJS 功能強大但需要 JavaScript 基礎。建議先熟練使用普通 Dataview，再逐步學習 DataviewJS。
