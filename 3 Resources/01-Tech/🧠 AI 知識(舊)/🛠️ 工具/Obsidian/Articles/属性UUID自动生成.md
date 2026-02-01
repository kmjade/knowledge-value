---
title: 属性UUID自動生成
aliases:
  - UUID Auto Generation
  - 檔案ID自動生成
  - Obsidian属性
created: 2026-01-29
tags:
  - obsidian
  - properties
  - 自動化
  - 元數據
type: technical
interest-level: 3
study-status: completed
# 整理
para: resources
language: zh-cn
---

# 属性UUID自動生成

> [!info] 說明
# 指南

---

## 實現方式

### 方式一：使用Templater腳本

1. **安裝依赖**
   - 需要 Node.js 環境
   - 安裝 `uuid` 包

   ```bash
   npm install uuid
   ```

2. **創建Templater腳本**
   在 `_templates/general/_template-自動生成UUID.md` 中：

   ```markdown
   <%*
   // 自動生成UUID
   const { v4: randomUUID } = require('uuid');

   // 檢查是否已有UUID
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

# 更新
       await tp.file.write(metadata);
       tR += `\n已生成UUID: ${newUuid}`;
   } else {
       tR += `\nUUID已存在: ${existingUuid}`;
   }
   %>
   ```

### 方式二：使用Obsidian外掛

#### 使用Properties外掛

1. **安裝Properties外掛**
   - Settings → Community Plugins → Browse → Search "Properties"

# 配置

   在外掛設置中：
   - 启用 "Auto-generate IDs" 选项
   - 選擇 "UUID v4" 格式
   - 設置命名规则：`{{UUID}}`

#### 使用Meta-bind外掛

1. **安裝Meta-bind外掛**
   - Settings → Community Plugins → Browse → Search "Meta bind"

2. **绑定UUID属性**

   在模板中新增：
   ```yaml
   ---
   uuid: "{{uuid}}"
   ```

   外掛会自動为属性生成唯一ID。

---

## UUID格式說明

| 格式 | 示例 | 特點 |
|------|------|------|
| UUID v4 | `f47ac10b-58cc-4b5c-9a9b-6c1e` | 標準格式，128位 |
| UUID v7 | `01951968-423a-8d3a-904b-7f4-8746` | 簡化格式，128位 |

---

## 使用場景

### 場景一：批量檔案重命名

```bash
# 为所有檔案新增UUID（保留原檔案名在属性中）
for file in *.md; do
  uuid=$(uuidgen)
  # 将UUID寫入frontmatter
done
```

### 場景二：檔案去重

通過UUID可以轻松识别重复檔案：
```javascript
// 在Dataview查詢中尋找重复UUID
TABLE file.link, uuid
FROM ""
WHERE uuid
GROUP BY uuid
HAVING length(file.link) > 1
```

### 場景三：跨库引用

使用UUID創建稳定的跨檔案引用，不受檔案重命名影响：

```markdown
// 使用UUID而非檔案名引用
[[連結到其他檔案|uuid:${uuid}|顯示文本]]
```

---

## 最佳實踐

### 1. 選擇UUID格式

- **UUID v4** - 標準格式，广泛相容
- **考虑长度** - v4 vs v7 的選擇取决于應用程式場景

### 2. 命名约定

- **一致性** - 在整个库中使用同一格式
- **可读性** - 選擇容易阅读和複製的格式
- **無特殊字符** - 避免在檔案名中使用特殊字符

### 3. 与其他系統整合

- **Git** - UUID稳定檔案标识，不受Git重命名影响
- **Dataview** - 基于UUID的可靠查詢
# 管理

---

## 相關資源

# 指南
- [[Obsidian Meta-bind外掛]] - 元數據绑定外掛
- [[Dataview外掛]] - Dataview 官方文檔
