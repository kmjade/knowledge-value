---
title: Version Control & Collaboration
tags: [software, git, ci-cd, collaboration]
created: 2026-05-29
aliases: [版本控制與協作, 06-VCS, Git, CI/CD]
---

# 06 — Version Control & Collaboration 版本控制與協作

> How do teams collaborate on code? Version control is the foundation of modern software collaboration — and Git is the universal language.
> 版本控制是現代軟體協作的基石——而 Git 是通用語言。

---

## Git Fundamentals Git 基礎

### Git 的資料模型

```
Working      Staging       Local         Remote
Directory →  Area      →  Repository →  Repository
   │            │             │             │
  git add     git commit    git push    (GitHub/GitLab)
```

### 核心概念 Core Concepts

| 概念 | 說明 |
|------|------|
| **Commit** | 一個快照 (snapshot)，包含所有檔案的狀態 |
| **Branch** | 獨立的開發線，指向特定 commit 的 movable pointer |
| **HEAD** | 指向當前所在分支的最新 commit |
| **Remote** | 遠端倉庫引用（origin, upstream 等） |
| **Merge** | 合併兩條分支的歷史 |
| **Rebase** | 將 commits 重新應用到另一個基礎上 |

### 常用指令 Essential Commands

```bash
# 基本工作流
git clone <url>              # 複製遠端倉庫
git add <file>               # 暫存變更
git commit -m "message"      # 提交變更
git push origin main         # 推送到遠端
git pull origin main         # 拉取遠端變更

# 分支操作
git branch <name>            # 建立分支
git checkout -b <name>       # 建立並切換分支
git merge <branch>           # 合併分支
git rebase main              # 重訂基底到 main

# 歷史查看
git log --oneline --graph    # 視覺化提交歷史
git diff                     # 查看未暫存的變更
git status                   # 查看當前狀態
```

---

## 分支策略 Branching Strategies

### 1. GitFlow

```
main ───●──────────●────────────●──
         \        /            /
develop ──●──●──●──●──●──●──●──
            \    /    \    /
feature/A ───●──●  feature/B ─●──●
```

| 分支類型 | 用途 |
|---------|------|
| `main` | Production-ready code |
| `develop` | Integration branch |
| `feature/*` | New features |
| `release/*` | Release preparation |
| `hotfix/*` | Emergency fixes |

**適合**: 定期發布的傳統軟體產品。

### 2. Trunk-Based Development 主幹開發

```
main ──●─●─●─●─●─●─●─●─●──
       │/  │/  │/  │/
       ●   ●   ●   ●  (short-lived branches)
```

| 原則 | 說明 |
|------|------|
| 分支生命週期 | < 24 小時 |
| 合併頻率 | 每天多次 |
| Feature flags | 用於隱藏未完成功能 |
| CI/CD | 必須有完善的測試與部署 pipeline |

**適合**: 高績效 DevOps 團隊（Google、Facebook）。

### 3. GitHub Flow

```
main ──●──────●────────●──
        \    /        /
feature ──●──●   fix ─●
```

簡單規則：
1. `main` 永遠可部署
2. 從 `main` 建立描述性分支
3. 推送分支並開啟 Pull Request
4. 討論、審查、合併
5. 合併後立即部署

---

## Pull Request / Merge Request

### PR 生命週期

```
Create Branch → Push → Open PR → Review → CI Pass → Merge → Delete Branch
```

### 好的 PR 特質 Good PR Characteristics

| 特質 | 說明 |
|------|------|
| **Small** | < 400 lines changed, single concern |
| **Descriptive title** | Summarize what and why |
| **Clear description** | Context, approach, screenshots, testing notes |
| **Linked issue** | References related issue |
| **Self-reviewed** | Author reviews their own diff before requesting review |

---

## Code Review 程式碼審查

### 審查重點 Review Checklist

| 維度 | 檢查 |
|------|------|
| **Correctness** | Does it work as intended? |
| **Design** | Is it well-architected? |
| **Readability** | Can others understand it? |
| **Testing** | Are there adequate tests? |
| **Security** | Are there vulnerabilities? |
| **Performance** | Are there obvious bottlenecks? |

### Code Review 文化

- **Be respectful** — 評論程式碼，不是評論人
- **Be constructive** — 提供建議而非只指出問題
- **Be timely** — 24 小時內回應
- **Use "we"** — "We could simplify this by..."

---

## CI/CD Pipeline

### 典型 Pipeline

```
Push → ┌──────────┐ → ┌─────────┐ → ┌──────────┐ → ┌──────────┐
       │  Build    │   │  Test    │   │  Lint/SAST│   │  Deploy   │
       └──────────┘   └─────────┘   └──────────┘   └──────────┘
```

| Stage | Tools |
|-------|-------|
| **Build** | Docker, Maven/Gradle, npm/pnpm |
| **Test** | pytest, Jest, JUnit, Cypress |
| **Lint/SAST** | ESLint, pylint, SonarQube |
| **Deploy** | Kubernetes, Terraform, Vercel |

### GitHub Actions 範例

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: pip install -r requirements.txt
      - run: pytest --cov
```

---

## 協作工具 Collaboration Tools

| 類別 | 工具 |
|------|------|
| **Code Hosting** | GitHub, GitLab, Bitbucket |
| **CI/CD** | GitHub Actions, GitLab CI, Jenkins, CircleCI |
| **Code Review** | GitHub PR, GitLab MR, Gerrit |
| **Communication** | Slack, Discord, Microsoft Teams |
| **Documentation** | Notion, Confluence, Obsidian |
| **Project Management** | Linear, Jira, GitHub Projects |

---

## Conventional Commits 約定式提交

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

| Type | Usage |
|------|-------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `refactor` | Code change (no fix, no feature) |
| `test` | Adding/updating tests |
| `chore` | Maintenance tasks |

範例：`feat(auth): add OAuth2 login support`

---

> 💡 **Key Insight**: Good version control isn't just about code — it's about team communication. Every commit message is a memo to your future self and your teammates.
