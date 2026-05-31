# Lint Skill - 系统健康检查

检查 PARA+LLM-Wiki 系统的健康状态，发现并报告问题。

## 使用方式

```
/lint                 # 执行完整检查
/lint --quick         # 快速检查（仅关键项）
/lint --fix           # 自动修复可修复的问题
/lint --report        # 生成详细报告
```

## 检查项目

### 1. 目录结构检查

#### PARA 目录完整性
- [ ] `0 Inbox/` 存在
- [ ] `1 Projects/` 存在
- [ ] `2 Areas/` 存在
- [ ] `3 Resources/` 存在
- [ ] `4 Archives/` 存在

#### Wiki 子库结构
- [ ] `ai-ml/` 结构完整 (raw/, wiki/, outputs/)
- [ ] `people/` 结构完整
- [ ] `finance/` 结构完整
- [ ] `productivity/` 结构完整

### 2. 文件完整性检查

#### 断链检测
扫描所有 wikilinks，检查目标是否存在：
```markdown
❌ 断链: [[non-existent-note]]
   来源: notes/my-note.md:15
```

#### 孤立文件
检查没有入链的文件（可能需要整理）：
```markdown
⚠️ 孤立文件: notes/lonely-note.md
   建议: 移动到 4 Archives/ 或添加链接
```

### 3. Frontmatter 规范检查 (FR-042)

#### A. Wiki 页面强制字段 (`wiki/**/*.md`)

| 字段 | 类型 | 规则 | 自动修复 |
|------|------|------|----------|
| `type` | Enum | **必填**。值: `concept`, `entity`, `source`, `wiki-index`, `compile-log` | ❌ 需人工 |
| `topic` | String | **必填**。匹配子库 topic 值 | ❌ 需人工 |
| `created` | Date | **必填**。格式 `YYYY-MM-DD` | ✅ 格式修正 |
| `sources` | Array | **必填** (除 `compile-log` 外)。指向 raw/ 的 wikilink | ❌ 需人工 |

**特殊页面规则**:
- `wiki/log.md`: 仅需 `type: log`, `topic`, `created`（无需 `sources`）
- `wiki/index.md`: 需 `type: wiki-index`, `topic`, `created`
- `wiki/concepts/*.md`: 全部四字段强制
- `wiki/entities/*.md`: 全部四字段 + `entity_type` 推荐

#### B. 原始资料页面 (`raw/**/*.md`)

| 字段 | 类型 | 规则 | 自动修复 |
|------|------|------|----------|
| `source` | String | **推荐**。来源 URL 或描述 | ❌ 需人工 |
| `tags` | Array | **推荐**。至少 1 个标签 | ❌ 需人工 |
| `created` | Date | **推荐**。格式 `YYYY-MM-DD` | ✅ 格式修正 |

#### C. 格式校验规则

```markdown
错误类型:
❌ MISSING_TYPE      — wiki/ 文件缺少 type 字段
❌ MISSING_TOPIC     — wiki/ 文件缺少 topic 字段
❌ MISSING_CREATED   — wiki/ 文件缺少 created 字段
❌ MISSING_SOURCES   — wiki/ 文件缺少 sources 字段
⚠️  INVALID_TYPE     — type 值不在枚举中
⚠️  INVALID_DATE     — created 格式不是 YYYY-MM-DD
⚠️  RAW_NO_SOURCE    — raw/ 文件缺少 source 字段
⚠️  RAW_NO_TAGS      — raw/ 文件缺少 tags 字段
ℹ️  UNKNOWN_TOPIC    — topic 值未匹配已知子库
```

#### D. 已知子库 topic 值

| topic | 子库 |
|-------|------|
| `knowledge-systems` | DDC 000 |
| `philosophy-psychology` | DDC 100 |
| `epistemology` | DDC 120 |
| `religion-theology` | DDC 200 |
| `social-sciences` | DDC 300 |
| `language` | DDC 400 |
| `natural-sciences` | DDC 500 |
| `applied-sciences` | DDC 600 |
| `arts` | DDC 700 |
| `literature` | DDC 800 |
| `history-geography` | DDC 900 |
| `ai-ml` | AI/ML |
| `people` | People |
| `generative-art` | Generative Art |

### 4. 系统状态检查

#### Inbox 健康
```markdown
📊 Inbox 健康: 🟡
- 待处理文件: 15
- 最老文件: 7 天
- 建议: 运行 /triage 清理积压
```

#### Wiki 同步
```markdown
📊 Wiki 同步状态:
- ai-ml: ✅ 同步 (最后编译: 2小时前)
- people: ⚠️ 有 8 个未编译文件
- finance: ⚠️ 有 5 个未编译文件
- productivity: ✅ 同步
```

#### 日志状态
- [ ] `AI-Log/triage-log.md` 存在
- [ ] `AI-Log/compile-log.md` 存在
- [ ] `AI-Log/sessions/` 目录存在

### 5. 配置检查

#### Skills 配置
- [ ] `triage` skill 已注册
- [ ] `wiki-compile` skill 已注册
- [ ] `context` skill 已注册
- [ ] `lint` skill 已注册

#### Hooks 配置
- [ ] hooks.json 格式正确
- [ ] SessionStart hook 配置正确

### 6. Git 状态检查 (FR-060)

#### 操作前检查 (`git status --porcelain`)
```markdown
📊 操作前 Git 状态:
- 分支: main
- 未暂存: 3 | 未跟踪: 2 | 待提交: 0
- 状态: 🟢 可以安全操作 / 🟡 建议先提交 / 🔴 有冲突
```

**阻断规则**:
- 🔴 有未解决的合并冲突 → **阻断操作**，要求先解决
- 🟡 有 >10 个变更文件 → **警告**，建议先提交
- 🟡 有未跟踪的 .md 文件 → 提示可能需要先 /triage
- 🟢 干净工作区 → 允许操作

#### 操作后检查
```markdown
📊 操作后变更:
- 新增: 5 文件
- 修改: 3 文件
- 删除: 2 文件
- 建议: 分步提交 (triage 变更 / compile 变更 分开)
```

#### 批量操作保护 (FR-062)
| 阈值 | 行为 |
|------|------|
| ≤10 文件 | ✅ 自动执行 |
| 11-20 文件 | ⚠️ 显示变更列表 + 请求确认 |
| >20 文件 | 🔴 强制分步执行，每批 ≤10 |

#### Conventional Commits 执行 (FR-061)
```bash
# 分拣操作
git add -A && git commit -m "triage: route N files to [target]"

# 编译操作
git add -A && git commit -m "compile: [topic] — N concepts, M entities"

# 维护操作
git add -A && git commit -m "chore: update [component]"
```

**提交类型映射**:
| 操作 | type | 示例 |
|------|------|------|
| /triage | `triage` | `triage: route 8 files to resources` |
| /wiki-compile | `compile` | `compile: ai-ml — 3 concepts, 2 entities` |
| /lint | `chore` | `chore: fix N broken links` |
| 基础设施 | `chore` | `chore: create wiki/log.md for DDC 400` |
| 文档 | `docs` | `docs: update SRS checklist` |

## 报告格式

### 快速报告
```
🏥 Lint Report - YYYY-MM-DD HH:MM

总体状态: 🟢 健康

检查项: 25
✅ 通过: 23
⚠️ 警告: 2
❌ 错误: 0

需要关注:
1. ⚠️ people Wiki 有 8 个未编译文件
2. ⚠️ Git 有 5 个未提交更改
```

### 详细报告
```
🏥 Lint Report (详细) - YYYY-MM-DD HH:MM

## 1. 目录结构
✅ PARA 目录完整
✅ Wiki 子库结构完整

## 2. 文件完整性
✅ 断链检查: 0 个断链
⚠️ 孤立文件: 3 个
   - notes/old-note-1.md
   - notes/old-note-2.md
   - notes/old-note-3.md

## 3. Frontmatter 规范
✅ Wiki 页面格式正确
❌ 2 个格式错误:
   - notes/note-1.md: 缺少 created 字段
   - notes/note-2.md: created 格式错误

## 4. 系统状态
🟡 Inbox: 15 个待处理 (积压 7 天)
⚠️ Wiki 同步: people/finance 有未编译文件
✅ 日志: 正常

## 5. 配置
✅ Skills: 4/4 已注册
✅ Hooks: 配置正确

## 6. Git
⚠️ 未提交更改: 5
⚠️ 未跟踪文件: 3

---
总计: ✅ 23 | ⚠️ 2 | ❌ 0
```

## 自动修复

使用 `--fix` 标志可自动修复：

| 问题 | 自动修复 |
|------|---------|
| 缺少目录 | ✅ 创建目录 |
| 缺少日志文件 | ✅ 创建文件 |
| created 格式错误 | ✅ 修正格式 |
| 缺少 type 字段 | ❌ 需人工确认 |
| 断链 | ❌ 需人工确认 |
| 孤立文件 | ❌ 需人工确认 |

## 健康评分

```
健康评分 = (通过项 / 总检查项) × 100

🟢 90-100: 健康
🟡 70-89:  需要关注
🔴 <70:    需要修复
```

## 定期检查建议

| 频率 | 检查类型 |
|------|---------|
| 每日 | `--quick` 快速检查 |
| 每周 | 完整检查 |
| 每月 | `--report` 生成详细报告 |

## 与其他 Skills 的配合

- 在 `/triage` 前运行检查 Inbox 健康
- 在 `/wiki-compile` 前检查 raw/ 文件状态
- 在会话结束时检查 Git 状态

