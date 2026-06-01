---
created: 2026-05-31
type: test-spec
topic: nfr-validation
parent: "[[开发工作清单]]"
---

# 性能与可靠性测试规格

---

## NF-01: 性能基准测试

### 测试场景

| ID | 测试 | 目标指标 | 操作 |
|:--:|------|:--------:|------|
| P-01 | /triage 响应 | < 2 分钟 (20 文件) | 准备 20 个未处理 Inbox 文件 → 计时 |
| P-02 | /wiki-compile 响应 | < 5 分钟 (10 源文件) | 准备 10 个未编译 raw/ 文件 → 计时 |
| P-03 | /context --quick | < 30 秒 | 直接调用 → 计时 |
| P-04 | /lint 检查 | < 3 分钟 (500 文件) | 全量扫描 → 计时 |
| P-05 | 单文件读写 | < 1 秒 | 读写 100KB Markdown → 计时 |

### 通过标准

```
P-01~05 全部达标: ✅
1 项未达标: 🟡 需优化
2+ 项未达标: 🔴 需修复
```

---

## NF-02: 数据完整性验证

### 测试场景

| ID | 测试 | 通过条件 |
|:--:|------|----------|
| D-01 | 分拣后文件完整性 | 原文件内容 = 目标文件内容 (MD5 校验) |
| D-02 | 编译后来源追溯 | 每个 wiki/ 页面指向正确的 raw/ 文件 |
| D-03 | 连续 5 次操作 | 无数据丢失、无文件损坏 |
| D-04 | Frontmatter 保留 | 操作前后 Frontmatter 关键字段不变 |
| D-05 | Wikilink 完好 | 操作后链接数量 = 操作前 (已更新目标) |

### 验证方法

```bash
# D-01: MD5 校验
md5sum "0 Inbox/source.md"
md5sum "3 Resources/[topic]/raw/articles/source.md"
# 两者应一致

# D-03: 连续操作脚本
for i in $(seq 1 5); do
  /triage --scope clippings
  /wiki-compile [topic] --incremental
  /lint --quick
done
# 每次操作后检查 git diff --stat
```

---

## NF-03: 故障隔离测试

### 测试场景

| ID | 测试 | 通过条件 |
|:--:|------|----------|
| F-01 | AI 不可用时 | 人类可直接编辑 .md 文件，Obsidian 正常打开 |
| F-02 | Git 冲突恢复 | `git merge --abort` 后系统可用 |
| F-03 | 操作中断恢复 | Ctrl+C 中止分拣 → Vault 状态一致 |
| F-04 | 磁盘满处理 | 写入失败时有明确错误提示 |
| F-05 | 权限错误 | AI 无法写入 raw/ 时有清晰反馈 |

### 验证方法

```
F-01: 关闭 Claude Code → 用 Obsidian 打开 Vault → 编辑 + 保存
F-02: 制造冲突 → git merge --abort → /context --quick 正常
F-03: /triage 执行中 Ctrl+C → /lint 检查一致性
```

---

## 执行记录

| 日期 | 测试人 | 结果 | 备注 |
|------|:------:|:----:|------|
| — | — | — | 待执行 |

---

> 📎 关联:
> - [[开发工作清单]] — NF-01~03
> - [[SRS 04-非功能需求]] — 指标定义
