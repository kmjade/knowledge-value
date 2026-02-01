---
title: QuickAdd PARA内嵌腳本
aliases:
  - QuickAdd Inline Scripts
  - PARA自動化腳本
# 配置
type: reference
created: 2026-01-29
tags:
  - quickadd
  - templater
  - para
  - 自動化
  - 腳本
interest-level: 4
study-status: completed
# 整理
para: resources
language: zh-cn
---

# QuickAdd PARA内嵌腳本

> [!info] 說明
> 本文檔收集了QuickAdd外掛中用于PARA自動化的常用内嵌腳本，可直接在QuickAdd Choice中調用。

---

## PARA分類腳本

### 自動新增PARA標籤

```javascript
// QuickAdd 内嵌腳本
<%*
const paraOptions = ["project", "area", "resource", "archive"];
const choice = await tp.system.suggester(
    ["Project (專案)", "Area (领域)", "Resource (資源)", "Archive (歸檔)"],
    paraOptions,
    false,
    "選擇PARA分類"
);

if (choice) {
    const tag = paraOptions[paraOptions.indexOf(choice)];
    tR += `\ntags: [${tag}]`;
}
%>
```

### 自動移动到对应資料夾

```javascript
// QuickAdd 内嵌腳本
<%*
const currentPath = tp.file.path;
const targetFolders = {
    project: "1 Projects",
    area: "2 Areas",
    resource: "3 Resources",
    archive: "4 Archives"
};

// 获取当前選擇的標籤
const tags = tp.file.tags || [];
let targetFolder = "0 Inbox";

// 檢查標籤决定目標資料夾
if (tags.includes("#project")) {
    targetFolder = targetFolders.project;
} else if (tags.includes("#area")) {
    targetFolder = targetFolders.area;
} else if (tags.includes("#resource")) {
    targetFolder = targetFolders.resource;
} else if (tags.includes("#archive")) {
    targetFolder = targetFolders.archive;
}

if (targetFolder !== "0 Inbox") {
    await tp.file.move(`${targetFolder}/${tp.file.title}.md`);
    tR += `\n已移动到: ${targetFolder}`;
} else {
    tR += `\n檔案未標記分類，保持在Inbox`;
}
%>
```

---

## 自動化創建腳本

### 創建專案筆記

```javascript
// QuickAdd 内嵌腳本
<%*
const projectTitle = await tp.system.prompt("專案名称");
const projectFolder = `1 Projects/${projectTitle}`;

// 創建專案資料夾（如果不存在）
await tp.file.create_new("", projectFolder);

// 創建專案主筆記
const projectContent = `---
title: ${projectTitle}
created: ${tp.date.now("YYYY-MM-DD")}
status: active
tags: [project]
para: projects
---

# ${projectTitle}

## 專案目標
- [[]]

## 截止日期
- [[]]

## 相關Area
- [[]]

## 子任務
- [ ] 任務1
- [ ] 任務2
`;

await tp.file.create_new(projectContent, `${projectFolder}/${projectTitle}.md`);
tR += `\n已創建專案: ${projectTitle}`;
%>
```

---

## 檔案名格式化腳本

### 自動新增日期前缀

```javascript
// QuickAdd 内嵌腳本
<%*
const datePrefix = tp.date.now("YYYY-MM-DD");
const originalName = tp.file.title;
const newName = `${datePrefix}-${originalName}`;
await tp.file.rename(`${newName}.md`);
# 更新
%>
```

---

# 方法

# 配置

1. 打開 QuickAdd 設置
2. 創建新的 Choice，类型選擇 "User Script"
3. 将上述腳本貼上到 "Template" 区域
4. 設置触发快捷键
5. 使用时選擇对应的 Choice 運行腳本

### 快捷键示例

| 操作 | 建議快捷键 |
|------|-------------|
| 快速PARA分類 | `Ctrl+Shift+P` |
| 創建專案 | `Ctrl+Shift+N` |
| 日期前缀 | `Ctrl+Shift+D` |
| 移动檔案 | `Ctrl+Shift+M` |

---

## 注意事項

1. **腳本执行顺序** - 内嵌腳本按从上到下顺序执行
2. **变量传递** - 使用 `tp.*` 对象获取上下文
3. **错误處理** - 新增 `try-catch` 块處理异常
4. **檔案存在檢查** - 移动前檢查目標資料夾是否存在

---

## 相關資源

# 指南
# 工作流
# 指南
