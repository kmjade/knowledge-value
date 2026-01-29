---
title: 属性UUID自动生成
aliases:
  - UUID Auto Generation
  - 文件ID自动生成
  - Obsidian属性
created: 2026-01-29
tags:
  - obsidian
  - properties
  - 自动化
  - 元数据
type: technical
interest-level: 3
study-status: completed
source: 收集整理
para: resources
language: zh-cn
---

# 属性UUID自动生成

> [!info] 说明
> 本指南介绍如何在 Obsidian 中自动为笔记生成 UUID（唯一标识符），用于文件去重和追踪。

---

## 实现方式

### 方式一：使用Templater脚本

1. **安装依赖**
   - 需要 Node.js 环境
   - 安装 `uuid` 包

   ```bash
   npm install uuid
   ```

2. **创建Templater脚本**
   在 `_templates/general/_template-自动生成UUID.md` 中：

   ```markdown
   <%*
   // 自动生成UUID
   const { v4: randomUUID } = require('uuid');

   // 检查是否已有UUID
   let existingUuid = tp.frontmatter.uuid;

   if (!existingUuid) {
       // 生成新UUID
       const newUuid = v4();
       const metadata = `---
   uuid: ${newUuid}
   created: ${tp.date.now("YYYY-MM-DD")}
   updated: ${tp.date.now("YYYY-MM-DD")}
   ---
   ` + tp.file.content;

       // 更新文件内容
       await tp.file.write(metadata);
       tR += `\n已生成UUID: ${newUuid}`;
   } else {
       tR += `\nUUID已存在: ${existingUuid}`;
   }
   %>
   ```

### 方式二：使用Obsidian插件

#### 使用Properties插件

1. **安装Properties插件**
   - Settings → Community Plugins → Browse → Search "Properties"

2. **配置自动UUID**

   在插件设置中：
   - 启用 "Auto-generate IDs" 选项
   - 选择 "UUID v4" 格式
   - 设置命名规则：`{{UUID}}`

#### 使用Meta-bind插件

1. **安装Meta-bind插件**
   - Settings → Community Plugins → Browse → Search "Meta bind"

2. **绑定UUID属性**

   在模板中添加：
   ```yaml
   ---
   uuid: "{{uuid}}"
   ```

   插件会自动为属性生成唯一ID。

---

## UUID格式说明

| 格式 | 示例 | 特点 |
|------|------|------|
| UUID v4 | `f47ac10b-58cc-4b5c-9a9b-6c1e` | 标准格式，128位 |
| UUID v7 | `01951968-423a-8d3a-904b-7f4-8746` | 简化格式，128位 |

---

## 使用场景

### 场景一：批量文件重命名

```bash
# 为所有文件添加UUID（保留原文件名在属性中）
for file in *.md; do
  uuid=$(uuidgen)
  # 将UUID写入frontmatter
done
```

### 场景二：文件去重

通过UUID可以轻松识别重复文件：
```javascript
// 在Dataview查询中查找重复UUID
TABLE file.link, uuid
FROM ""
WHERE uuid
GROUP BY uuid
HAVING length(file.link) > 1
```

### 场景三：跨库引用

使用UUID创建稳定的跨文件引用，不受文件重命名影响：

```markdown
// 使用UUID而非文件名引用
[[链接到其他文件|uuid:${uuid}|显示文本]]
```

---

## 最佳实践

### 1. 选择UUID格式

- **UUID v4** - 标准格式，广泛兼容
- **考虑长度** - v4 vs v7 的选择取决于应用场景

### 2. 命名约定

- **一致性** - 在整个库中使用同一格式
- **可读性** - 选择容易阅读和复制的格式
- **无特殊字符** - 避免在文件名中使用特殊字符

### 3. 与其他系统集成

- **Git** - UUID稳定文件标识，不受Git重命名影响
- **Dataview** - 基于UUID的可靠查询
- **Tasks** - 基于UUID的任务管理

---

## 相关资源

- [[Obsidian属性使用指南]] - Obsidian 官方属性文档
- [[Obsidian Meta-bind插件]] - 元数据绑定插件
- [[Dataview插件]] - Dataview 官方文档
