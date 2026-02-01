---
# 指南
created: 2026-01-28
tags:
  - template
  - para
  - templater
---

# 指南
> 使用 Templater 插件的 PARA 模板完整使用说明

---

# 目錄

1. [前置要求](#前置要求)
# 配置
3. [模板使用流程](#模板使用流程)
4. [各模板详细说明](#各模板详细说明)
5. [常见问题](#常见问题)
6. [最佳实践](#最佳实践)

---

## 前置要求

### 必需插件

# 安裝

1. **Templater** - 模板引擎，负责动态内容生成
# 下載
# 搜尋

# 管理
# 下載
# 搜尋

# 查詢
# 下載
# 搜尋

# 安裝

# 設置
2. 进入 **社区插件** (Community Plugins)
3. 关闭安全模式 (Safe Mode)
# 搜尋
# 安裝

---

# 配置

# 配置

# 設置

# 設置

```
Template folder location: _templates/
Date format: YYYY-MM-DD
Time format: HH:mm:ss
```

# 設置

```
Trigger Templater on new file creation: ✅ (推荐启用)
Enable System Command Functions: ✅ (可选，用于高级功能)
```

# 檔案

# 檔案
# 設置
# 檔案

# 配置

# 設置

```
Global filter: ✅ 启用
Global task filter: (可选)
```

Tasks 插件会自动识别以下格式：
- `- [ ]` - 未完成任务
- `- [x]` - 已完成任务
- `📅 日期` - 截止日期
# 標籤

# 配置

# 配置

```
Enable JavaScript queries: ✅ 启用
Enable inline queries: ✅ 启用
```

---

## 模板使用流程

# 方法

# 檔案
2. **打开命令面板** - 按 `Ctrl/Cmd + P`
# 輸入
4. **选择模板** - 从列表中选择需要的模板
# 專案
   - `_template-area` - 领域模板
# 資源
   - `_template-archive` - 归档模板
   - `_template-zettel` - Zettelkasten 模板

# 方法

# 檔案
2. **选择命令** - 选择 "Templates" → "Insert template"
3. **选择模板** - 从弹出的菜单中选择模板

# 方法

如果已启用 "Trigger Templater on new file creation"：

# 檔案
# 創建
3. **确认选择** - 选择需要的模板，Templater 会自动应用

### 填写模板内容

模板应用后，需要填写以下内容：

#### 必填字段

# 檔案
- 任务列表 - 填写具体的任务项
# 專案

#### 自动生成字段

# 創建
- `zettel_id` - 唯一 ID（仅 Zettel 模板，自动生成）
- `updated` / `last_accessed` / `archived` - 各种日期（自动生成）

---

## 各模板详细说明

# 專案

# 專案

**特点**：
# 創建
# 管理
# 檔案
- ✅ SMART 原则指导目标设定
# 管理
# 專案

**使用步骤**：
1. 应用模板
# 專案
3. 填写 `due`（截止日期）
# 專案
# 連結

**任务格式示例**：
```markdown
# 設計
# 開發
# 測試
```

---

### 2. 领域模板 (_template-area.md)

# 管理

**特点**：
# 創建
# 專案
- ✅ 维护目标追踪表格
- ✅ 关键指标监控
- ✅ 定期回顾结构（月度/季度/年度）
# 記錄

**使用步骤**：
1. 应用模板
2. 将 `{{title}}` 替换为领域名称
3. 填写领域描述和范围
# 設置
# 專案
6. 按需填写月度/季度/年度回顾

# 查詢
# 查詢
# 專案
# 記錄
# 查詢

---

# 資源

# 整理

**特点**：
# 創建
# 資源
# 筆記
# 系統
# 場景
# 系統

**使用步骤**：
1. 应用模板
# 資源
# 資源
# 資訊
# 資訊
# 記錄
# 新增

# 資源
```yaml
type:
  - article    # 文章/博客/论文
  - book       # 书籍/电子书
# 教程
  - podcast    # 播客/音频
# 教程
  - tool       # 工具/软件
```

---

### 4. 归档模板 (_template-archive.md)

**用途**：归档已完成或不再活跃的内容

**特点**：
- ✅ 自动生成归档日期
# 系統
- ✅ 归档后行动计划
- ✅ 未来参考价值评估
- ✅ 定期审查机制

**使用步骤**：
1. 应用模板
2. 将 `{{title}}` 替换为归档内容标题
# 分類
4. 选择归档原因（completed/cancelled/obsolete/merged/moved）
# 記錄
6. 填写归档原因详细说明
7. 完成归档后的行动清单
# 設置

**归档原因说明**：
```yaml
archive_reason:
# 專案
  - cancelled   # 取消或放弃
  - obsolete    # 内容已过时
# 檔案
  - moved       # 移动到其他位置
```

---

### 5. Zettelkasten 模板 (_template-zettel.md)

# 知識

**特点**：
- ✅ 自动生成唯一 Zettel ID（时间戳格式：YYYYMMDDHHmmss）
- ✅ 支持 4 种卡片类型（临时/文献/永久/结构）
# 連結
- ✅ 完整的关联和反思机制
- ✅ 来源和出处追踪
# 記錄

**使用步骤**：
1. 应用模板
2. 选择 Zettel 类型（fleeting/literature/permanent/structure）
3. 将 `{{title}}` 替换为卡片标题（核心思想）
4. 填写核心思想和详细阐述
# 記錄
# 連結
# 新增
# 記錄

**Zettel 类型选择**：
```yaml
type:
# 筆記
# 學習
# 筆記
# 筆記
```

**Zettelkasten 原则**：
# 記錄
- **自主性** - 卡片可以独立理解
# 知識
- **唯一性** - 使用唯一标识符

---

## 常见问题

### Q1: Templater 命令找不到？

# 檔案

**解决方案**：
1. 检查 Templater 插件是否已启用
# 檔案
3. 重启 Obsidian

### Q2: 日期没有自动生成？

# 配置

**解决方案**：
# 設置
2. 确保 Date format 为 `YYYY-MM-DD`
3. 确保 Time format 为 `HH:mm:ss`

# 查詢

# 查詢

**解决方案**：
1. 确保 Dataview 插件已启用
# 設置
3. 等待 Dataview 索引完成（首次使用可能需要几分钟）

# 顯示

**原因**：Tasks 插件未启用或任务格式错误

**解决方案**：
1. 确保 Tasks 插件已启用
2. 确认任务格式正确：`- [ ] 任务描述 📅 日期 🏷️ #tag`
# 設置

### Q5: 模板中的 {{title}} 没有替换？

**原因**：{{title}} 是占位符，需要手动替换

**解决方案**：
- 应用模板后，手动将 `{{title}}` 替换为实际的标题
# 設置

### Q6: 如何快速切换模板？

**解决方案**：
# 設置
# 搜尋
# 新增

---

## 最佳实践

### 1. 模板选择策略

```
遇到问题？
├─ 是 → 使用问题卡 (general/问题卡.md)
│
└─ 否
   有明确目标和截止日期？
   ├─ 是 → 使用 _template-project
   │
   └─ 否
# 知識
      ├─ 是 → 使用 _template-zettel
      │
      └─ 否
         是持续的责任？
         ├─ 是 → 使用 _template-area
         │
         └─ 否 → 使用 _template-resource
```

# 檔案

# 專案
```
1 Projects/
├── 01-Work/
# 專案
├── 02-Learning/
# 學習項目
└── 03-Personal/
    └── 个人健康计划.md
```

# 檔案
```
2 Areas/
# 管理
# 管理
└── 职业发展.md
```

# 檔案
```
3 Resources/
# 文檔
# 學習
└── 参考资料/
```

# 檔案
```
4 Archives/
├── 2026/
└── 按年份归档/
```

# 管理

# 專案
# 設置
# 更新
# 標籤

### 4. Zettelkasten 使用建议

- ✅ 保持卡片短小精悍，每张卡片一个思想
# 連結
# 整理
- ✅ 使用唯一 ID 便于引用
# 系統

### 5. 定期回顾周期

- **Projects** - 每周回顾
- **Areas** - 每月回顾
- **Resources** - 按需回顾
- **Archives** - 每季度清理
# 連結

# 標籤

# 專案
# 專案
# 專案
- `#high` / `#medium` / `#low` - 优先级

# 資源
# 資源
# 資源
- `#to-read` / `#reading` / `#done` - 阅读状态

# 標籤
- `#area` - 领域相关
# 分類

# 標籤
- `#zettel` - 卡片相关
- `#fleeting` / `#literature` / `#permanent` / `#structure` - 卡片类型
- `#draft` / `#refined` / `#verified` - 卡片状态

---

# 資源

# 檔案

# 系統
# 專案
- [[_templates/para/📁 full/_template-area]] - 领域模板
# 資源
- [[_templates/para/📁 full/_template-archive]] - 归档模板
- [[_templates/para/📁 full/_template-zettel]] - Zettelkasten 模板

# 指南

# 指南
# 工作流
# 工作流
# 指南

### 外部参考

# 方法
- [Building a Second Brain](https://www.buildingasecondbrain.com/) - 第二大脑
# 文檔
# 文檔
# 文檔

---

# 更新

# 更新
|------|------|----------|
# 系統

---

# 創建
# 更新
**状态**：[x] 完成
