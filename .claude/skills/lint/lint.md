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

### 3. Frontmatter 规范检查

#### 必需字段
- [ ] 所有 Wiki 页面有 `type` 字段
- [ ] 所有 Wiki 页面有 `created` 字段
- [ ] 所有 Wiki 页面有 `topic` 字段

#### 格式规范
```markdown
❌ 格式错误: file.md
   问题: created 字段格式不正确
   期望: YYYY-MM-DD
   实际: 2026/05/26
```

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

### 6. Git 状态检查

```markdown
📊 Git 状态:
- 分支: main
- 未提交更改: 5
- 未跟踪文件: 3
- 建议: 提交当前更改
```

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

