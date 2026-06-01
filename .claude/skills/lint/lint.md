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

## 报告输出

### `--quick` 快速报告 (默认)

仅输出关键指标 + 健康评分，< 30s。

```
🏥 Quick Lint — YYYY-MM-DD
评分: 85/100 🟡

🔗 链接: 25/30 | 📋 FM: 20/25 | 🏗️ 目录: 15/15

⚠️ 5 断链 → 运行 /lint --report 查看详情
```

### `--report` 详细报告 (LN-06)

输出完整 Markdown 报告，包含所有检查维度和可操作建议。

**输出到**: 屏幕 + `AI-Log/lint-report-YYYY-MM-DD.md` (可选)

```markdown
🏥 Lint Report — YYYY-MM-DD
评分: 85/100 🟡

---

## 1. 目录结构 (15/15)

| 目录 | 预期 | 实际 | 状态 |
|------|:----:|:----:|:----:|
| 0 Inbox/ | ✅ | ✅ | 正常 |
| 1 Projects/ | ✅ | ✅ | 正常 |
| 2 Areas/ | ✅ | ✅ | 正常 |
| 3 Resources/ | ✅ | ✅ | 正常 |
| 4 Archives/ | ✅ | ✅ | 正常 |
| 10 子库 wiki/ | ✅ | ✅ | 11/11 |

## 2. 链接健康 (25/30)

| 指标 | 数值 |
|------|:----:|
| 总 wikilinks | 1,234 |
| 有效链接 | 1,229 |
| 断链 | 5 ⚠️ |

### 断链清单
- `[[missing-note]]` → 来源: note.md:15
- `[[old-project]]` → 来源: area.md:3

## 3. Frontmatter 合规 (20/25)

| 类型 | 合规率 |
|------|:------:|
| wiki/ | 98% |
| raw/ | 87% |

### 不合规文件 (12)
- `wiki/concepts/X.md`: MISSING_SOURCES
- `raw/articles/Y.md`: RAW_NO_TAGS

## 4. 编译覆盖率 (12/15)

| 子库 | raw/ 源 | 已编译 | 覆盖率 |
|------|:------:|:------:|:------:|
| 000 Knowledge | 15 | 15 | 100% |
| 100 Philosophy | 0 | 0 | — |
| ai-ml | 8 | 5 | 63% |

## 5. 日志完整性 (10/10)

✅ triage-log | ✅ compile-log | ✅ sessions/

## 6. 配置 (3/5)

✅ Skills: 4/4 | ⚠️ Hooks: 缺 SessionStart

---

## 建议操作

1. 🔴 修复 5 断链 → `--fix` 自动修复
2. 🟡 补充 12 FM 问题 → 手动修复
3. 🟡 编译 ai-ml 剩余 3 源 → `/wiki-compile ai-ml`
```

## 自动修复 (--fix, LN-05)

### 修复分级

| 级别 | 描述 | 示例 |
|:----:|------|------|
| 🟢 安全自动 | 无副作用，直接执行 | 日期格式修正、空目录创建 |
| 🟡 确认后执行 | 有副作用，需确认 | 批量 Frontmatter 更新 |
| 🔴 人工修复 | 需人工判断 | 断链修复、孤立文件处理 |

### 可自动修复项目

| 问题 | 操作 | 级别 |
|------|------|:----:|
| 缺失 `wiki/` 目录 | `mkdir -p` 创建 | 🟢 |
| 缺失 `wiki/log.md` | 创建日志文件 | 🟢 |
| 缺失 `wiki/index.md` | 创建索引占位 | 🟢 |
| `created:` 格式 `YYYY/MM/DD` | 转为 `YYYY-MM-DD` | 🟢 |
| `category:` → `topic:` | sed 批量替换 | 🟡 |
| 缺失 Frontmatter `type` | 根据路径推断 (concepts/→concept, entities/→entity) | 🟡 |
| 缺失 `sources` (已知来源) | 追加 `sources: [raw/path]` | 🟡 |

### 不可自动修复

| 问题 | 原因 | 建议 |
|------|------|------|
| 断链 | 无法确定正确目标 | 手动检查 → 更新链接 |
| 孤立文件 | 无法判断是否应归档 | 手动评估 → 移动到 4 Archives/ |
| 缺失 `sources` (未知) | 无法推断来源 | 手动添加 `## Sources` |
| Frontmatter 语义错误 | 无法判断正确值 | 手动修正 |

### 执行流程

```
/lint --fix
  ├── 扫描 → 生成问题清单
  ├── 🟢 安全项: 自动执行 (无需确认)
  ├── 🟡 确认项: 列出变更 → 等待用户确认
  ├── 🔴 人工项: 输出修复建议
  └── 输出: 修复摘要 + 无法修复清单
```

### 修复报告模板

```markdown
🔧 Lint --fix Report — YYYY-MM-DD

## 自动修复 (🟢)
- ✅ 修正 5 created 格式 → YYYY-MM-DD
- ✅ 创建 3 wiki/ 目录

## 确认修复 (🟡)
以下变更需要确认:

1. 120 文件 `category:` → `topic:` 批量替换
2. 推断 8 文件 `type` 字段

确认执行? (回复 «确认修复»)

## 需人工修复 (🔴)
- 5 断链 — 手动检查目标
- 3 孤立文件 — 评估是否归档
```

## 健康评分 (FR-043)

### 评分算法

**总分 = Σ(维度得分 × 权重)，满分 100**

| 维度 | 权重 | 计算方式 |
|------|:----:|----------|
| 🏗️ 目录完整性 | 15% | `(完整目录数 / 预期目录数) × 100` |
| 🔗 链接健康度 | 30% | `(有效链接数 / 总链接数) × 100` |
| 📋 Frontmatter 合规 | 25% | `(合规文件数 / 总文件数) × 100` |
| 📚 编译覆盖率 | 15% | `(已编译源文件 / 总源文件) × 100` |
| 📝 日志完整性 | 10% | 必要日志文件存在比例 |
| 🔧 配置完整性 | 5% | Skills 注册 + Hooks 配置 |

### 评分等级

```
🟢 90-100  健康 — 系统运行良好
🟡 70-89   需关注 — 有改进空间
🟠 50-69   警告 — 存在明显问题
🔴 <50     需修复 — 存在严重问题
```

### 报告模板 (LN-06)

```markdown
🏥 Lint Report — YYYY-MM-DD

## 健康评分: 85/100 🟡

| 维度 | 得分 | 满分 | 状态 |
|------|:----:|:----:|:----:|
| 目录完整性 | 15 | 15 | ✅ |
| 链接健康度 | 25 | 30 | 🟡 5 断链 |
| Frontmatter 合规 | 20 | 25 | 🟡 98% |
| 编译覆盖率 | 12 | 15 | 🟡 12/15 源 |
| 日志完整性 | 10 | 10 | ✅ |
| 配置完整性 | 3 | 5 | 🟡 缺 hook |
| **总计** | **85** | **100** | 🟡 |

## 改进建议 (按影响排序)
1. 🔗 修复 5 个断链 (+5 分)
2. 📋 修复 12 个 Frontmatter 问题 (+3 分)
3. 📚 编译 3 个待处理源文件 (+3 分)
```

### 快速评分 (--quick)

仅计算核心三维度（链接 + Frontmatter + 目录），权重重新分配，< 30s 返回。

```
🏥 Quick Score: 78/100 🟡
🔗 链: 25/30 | 📋 FM: 20/25 | 🏗️ 目: 15/15
💡 优先修复: 5 断链 → +5 分
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

