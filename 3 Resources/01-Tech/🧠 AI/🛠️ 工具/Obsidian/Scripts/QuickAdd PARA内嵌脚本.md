---
title: QuickAdd PARA内嵌脚本
aliases:
  - QuickAdd Inline Scripts
  - PARA自动化脚本
  - QuickAdd配置
type: reference
created: 2026-01-29
tags:
  - quickadd
  - templater
  - para
  - 自动化
  - 脚本
interest-level: 4
study-status: completed
source: 收集整理
para: resources
language: zh-cn
---

# QuickAdd PARA内嵌脚本

> [!info] 说明
> 本文档收集了QuickAdd插件中用于PARA自动化的常用内嵌脚本，可直接在QuickAdd Choice中调用。

---

## PARA分类脚本

### 自动添加PARA标签

```javascript
// QuickAdd 内嵌脚本
<%*
const paraOptions = ["project", "area", "resource", "archive"];
const choice = await tp.system.suggester(
    ["Project (项目)", "Area (领域)", "Resource (资源)", "Archive (归档)"],
    paraOptions,
    false,
    "选择PARA分类"
);

if (choice) {
    const tag = paraOptions[paraOptions.indexOf(choice)];
    tR += `\ntags: [${tag}]`;
}
%>
```

### 自动移动到对应文件夹

```javascript
// QuickAdd 内嵌脚本
<%*
const currentPath = tp.file.path;
const targetFolders = {
    project: "1 Projects",
    area: "2 Areas",
    resource: "3 Resources",
    archive: "4 Archives"
};

// 获取当前选择的标签
const tags = tp.file.tags || [];
let targetFolder = "0 Inbox";

// 检查标签决定目标文件夹
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
    tR += `\n文件未标记分类，保持在Inbox`;
}
%>
```

---

## 自动化创建脚本

### 创建项目笔记

```javascript
// QuickAdd 内嵌脚本
<%*
const projectTitle = await tp.system.prompt("项目名称");
const projectFolder = `1 Projects/${projectTitle}`;

// 创建项目文件夹（如果不存在）
await tp.file.create_new("", projectFolder);

// 创建项目主笔记
const projectContent = `---
title: ${projectTitle}
created: ${tp.date.now("YYYY-MM-DD")}
status: active
tags: [project]
para: projects
---

# ${projectTitle}

## 项目目标
- [[]]

## 截止日期
- [[]]

## 相关Area
- [[]]

## 子任务
- [ ] 任务1
- [ ] 任务2
`;

await tp.file.create_new(projectContent, `${projectFolder}/${projectTitle}.md`);
tR += `\n已创建项目: ${projectTitle}`;
%>
```

---

## 文件名格式化脚本

### 自动添加日期前缀

```javascript
// QuickAdd 内嵌脚本
<%*
const datePrefix = tp.date.now("YYYY-MM-DD");
const originalName = tp.file.title;
const newName = `${datePrefix}-${originalName}`;
await tp.file.rename(`${newName}.md`);
tR += `\n文件名已更新为: ${newName}`;
%>
```

---

## 使用方法

### 在QuickAdd中配置

1. 打开 QuickAdd 设置
2. 创建新的 Choice，类型选择 "User Script"
3. 将上述脚本粘贴到 "Template" 区域
4. 设置触发快捷键
5. 使用时选择对应的 Choice 运行脚本

### 快捷键示例

| 操作 | 建议快捷键 |
|------|-------------|
| 快速PARA分类 | `Ctrl+Shift+P` |
| 创建项目 | `Ctrl+Shift+N` |
| 日期前缀 | `Ctrl+Shift+D` |
| 移动文件 | `Ctrl+Shift+M` |

---

## 注意事项

1. **脚本执行顺序** - 内嵌脚本按从上到下顺序执行
2. **变量传递** - 使用 `tp.*` 对象获取上下文
3. **错误处理** - 添加 `try-catch` 块处理异常
4. **文件存在检查** - 移动前检查目标文件夹是否存在

---

## 相关资源

- [[0 Inbox/在 obsidian 中 实施自动化PARA框架.md]] - PARA自动化完整指南
- [[快速捕获工作流设置指南]] - QuickAdd 配置指南
- [[Templater 使用指南]] - Templater 官方文档
