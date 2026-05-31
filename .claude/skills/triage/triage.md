# Skill: /triage — Inbox 智能分拣

## 使用方式

```
/triage              # 扫描所有未处理文件
/triage --dry-run    # 仅预览，不执行移动
/triage --file "filename.md"  # 处理单个文件
```

## 触发方式
- 手动：用户输入 `/triage`
- 自动：SessionStart hook 检测到 0 Inbox/ 有新文件时提示

## 输入
0 Inbox/ 目录下所有 `status != "_processed"` 的文件

## 执行流程

### Step 1: 扫描 Inbox
列出 0 Inbox/ 中所有文件（排除 `_processed/` 子目录）。
对每个文件执行以下分析：

### Step 2: 内容分析（对每个文件）
读取文件内容，判断以下维度：

**2a. 时效性分析**
- 含具体日期/时间 + 动作动词（买、约、提醒、发送、完成）→ 标记为 `ephemeral`
- 含项目名称 + 任务描述，但无明确截止 → 标记为 `operational`
- 技术文章/论文/书摘/教程，无时效性 → 标记为 `reference`
- 原则/方法论/核心观点，可长期使用 → 标记为 `evergreen`

**2b. 主题识别**
- 识别内容所属领域（从 CLAUDE.md 的 Wiki 子库目录中匹配）
- 如无匹配子库，记录建议（"可能需要新建 [topic] 子库"）

**2c. 人物识别**
- 检测内容中是否涉及具体人名、联系人
- 如有，标记为同时需要更新 `2 Areas/people/`

**2d. 双重属性检测**
- 检查内容是否同时包含「任务属性」和「知识属性」
- 例：「下周前读完这篇论文」→ 既是任务，又含参考资料
- 此类文件执行「双重处理」：任务部分 + 知识部分分开路由

### Step 3: 路由决策

| 判定结果 | 目标位置 | 额外操作 |
|---------|---------|---------|
| ephemeral 任务 | 1 Projects/[匹配项目]/tasks.md 追加条目 | 无对应项目则到 2 Areas/[领域]/tasks.md |
| operational 笔记 | 01-Projects/[匹配项目]/ | 如无项目则提示用户是否新建 |
| reference 资料 | 3 Resources/[topic]/raw/articles/ | 自动触发 wiki-compile（见 Skill 2） |
| evergreen 内容 | 3 Resources/[topic]/raw/books/ 或 papers/ | 优先级队列编译 |
| 人物信息 | 2 Areas/people/raw/ | 触发人物页更新 |
| 闪念/想法 | 1 Projects/Periodic/daily/[今日].md → ## 💡 Fleeting Ideas 区块 | 同时检查是否应升级为 Project |

### 特殊处理

#### Clippings (网页剪藏)
- 来源 URL → 提取到 frontmatter
- 创建时间 → 保留原始时间戳
- 标签 → 转换为 Obsidian tags

#### 人物信息
- 提取姓名、联系方式
- 创建/更新人物卡片
- 建立双向链接

### Step 4: 写入目标文件

**任务路由格式**（写入 tasks.md）：

- [任务描述] 📅 YYYY-MM-DD #来源:inbox #lifecycle:ephemeral

**资料路由操作**：
1. 将文件复制到目标 raw/ 目录（保持原始内容不变）
2. 在文件顶部添加标准 frontmatter（如缺失）
3. 将原文件移入 0 Inbox/_processed/

**闪念路由格式**（追加到日记）：

## 💡 Fleeting Ideas
- [想法内容] — 来自 Inbox，[原始文件名]

## Frontmatter 更新
处理后的文件添加：
```markdown
---
triaged: true
triaged_at: YYYY-MM-DDTHH:MM:SS
triaged_to: [目标路径]
original_path: [原始路径]
---
```

### Step 5: 生成分拣报告
在 AI-Log/triage-log.md 追加：

## [日期时间] Triage 操作
- 处理文件数：N
- 路由到 Projects：X 条任务
- 路由到 Wiki raw/：Y 个文件（待编译主题：[列表]）
- 路由到 Daily：Z 条闪念
- 人物更新：W 人
- 建议新建子库：[列表]（如有）

### Step 6: 提示用户
输出分拣摘要，并询问：
- 是否立即触发 `/wiki-compile` 编译新入库的 reference 材料
- 是否有需要人工确认的路由决策（模糊内容列出供用户选择）

## 错误处理
- 文件无法分类时：移入 0 Inbox/ 根目录并添加 `status: needs-review` frontmatter，不强制分类
- 内容过短（< 50 字）且无明确类型：默认路由到今日日记的 Fleeting Ideas，不进 Wiki

## 安全检查
在移动文件前执行：
1. 检查目标位置是否已存在同名文件
2. 检查文件是否有未保存的修改
3. 确认移动不会破坏现有的 wikilinks

