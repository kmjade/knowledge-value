系统健康检查——扫描 Vault 结构、Wiki 链接、Frontmatter 完整性并生成报告。

## 使用方式

```
/lint                 # 执行完整检查
/lint --quick         # 快速检查（仅关键项）
/lint --fix           # 自动修复可修复问题
/lint --report        # 生成详细报告文件
```

## 检查维度

### Layer 1 — 生活管理层
- [ ] `0 Inbox/` 是否积压 > 7 天
- [ ] `1 Projects/` 有无过期未关闭
- [ ] `2 Areas/` 有无 > 90 天未更新
- [ ] `4 Archives/` 归档文件 Frontmatter 完整性

### Layer 3 — Wiki 编译层
- [ ] 死链检测 — `[[wikilink]]` 指向不存在的文件
- [ ] 孤立页 — 未被任何页面引用的 wiki 页面
- [ ] 未编译原料 — `raw/` 中 `compiled: false` 的文件数
- [ ] 矛盾汇总 — 所有 `[!contradiction]` callout
- [ ] 置信度分布 — high / medium / low 占比

### 全局检查
- [ ] Frontmatter 缺失 — 无 `type` 字段的文件
- [ ] 循环引用警告
- [ ] 大文件检测 — > 50KB 的 .md 文件

## 输出格式

生成报告文件 `AI-Log/lint-YYYY-MM-DD.md`，包含：
- 所有检查项结果
- 修复建议
- 优先级排序

## 范例

```
用户：/lint
→ 执行完整检查，终端输出摘要，生成 AI-Log/lint-2026-06-01.md

用户：/lint --quick
→ 仅输出关键指标：死链数 · 孤立页数 · 未编译原料数

用户：/lint --fix
→ 自动修复可修复项（死链→移除或更新），其余输出建议
```
