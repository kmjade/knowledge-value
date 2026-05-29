---
title: Open Source & Licensing
tags: [software, open-source, licensing, foss]
created: 2026-05-29
aliases: [開源與許可證, 09-FOSS, Open Source]
---

# 09 — Open Source & Licensing 開源與許可證

> Software freedom and the economics of collaboration. Open source isn't just a development model — it's a philosophy, a community, and a business strategy.
> 開源不只是開發模式——它是一種哲學、社群，也是一種商業策略。

---

## 開源運動簡史 A Brief History

| 年份 | 事件 | 意義 |
|------|------|------|
| 1983 | GNU Project (Richard Stallman) | 自由軟體運動的開始 |
| 1985 | Free Software Foundation (FSF) | 制度化推廣自由軟體 |
| 1991 | Linux Kernel (Linus Torvalds) | 開源作業系統的核心 |
| 1998 | "Open Source" 術語誕生 | 與「自由軟體」的策略性區分 |
| 1998 | OSI (Open Source Initiative) | 開源定義與許可證審批 |
| 2008 | GitHub 成立 | 社交化程式設計革命 |
| 2014 | Docker, Kubernetes | 開源基礎設施的黃金時代 |
| 2018 | Microsoft 收購 GitHub | 大企業全面擁抱開源 |
| 2023+ | AI 開源爭論 | 模型權重是否算原始碼？ |

---

## Free Software vs Open Source

| 維度 | Free Software (FSF) | Open Source (OSI) |
|------|-------------------|-------------------|
| **核心理念** | 使用者的自由是道德問題 | 開放原始碼是更好的開發方法 |
| **關注點** | 倫理 (ethics) | 實用 (pragmatics) |
| **四大自由** | Use, Study, Share, Improve | 不明確強調 |
| **代表人物** | Richard Stallman | Eric Raymond, Bruce Perens |

### The Four Freedoms (FSF)

0. **Freedom 0** — 為任何目的運行軟體的自由
1. **Freedom 1** — 研究與修改軟體的自由
2. **Freedom 2** — 重新散佈副本的自由
3. **Freedom 3** — 散佈修改版本的的自由

---

## 許可證類型 License Types

### 許可證光譜 License Spectrum

```
Copyleft ←──────────────────────────→ Permissive
  強保護                                 寬鬆

  GPLv3    GPLv2    LGPL    MPL    Apache 2.0   MIT    Unlicense
  ────────┬────────┬───────┬──────┬──────────┬───────┬───────────
          │        │       │      │          │       │
     病毒式傳播  較弱Copyleft  檔案級    含專利授權   最簡    放棄所有權利
```

### 主要許可證對比

| License | 類型 | 專利授權 | 衍生作品要求 | 使用場景 |
|---------|------|---------|-------------|---------|
| **MIT** | Permissive | No explicit | None | 最大化採用率 |
| **Apache 2.0** | Permissive | Yes (explicit) | Notice required | 企業友好 |
| **GPLv3** | Strong Copyleft | Yes | Must be GPLv3 | 確保軟體自由 |
| **GPLv2** | Strong Copyleft | No (implicit) | Must be GPLv2 | Linux kernel |
| **LGPL** | Weak Copyleft | Yes | Library only | 函式庫 |
| **MPL 2.0** | File-level Copyleft | Yes | File-level | Mozilla 專案 |
| **BSD (3-Clause)** | Permissive | No | Attribution | 學術用途 |
| **AGPLv3** | Network Copyleft | Yes | SaaS 也需開源 | 防止雲端規避 |
| **Unlicense** | Public Domain | N/A | None | 完全放棄權利 |

### 選擇指南 Choosing a License

| 目標 | 推薦許可證 |
|------|-----------|
| 最大化採用率 | MIT, Apache 2.0 |
| 確保改進回饋社群 | GPLv3, AGPLv3 |
| 商業友好 + 專利保護 | Apache 2.0 |
| 函式庫（允許商業使用） | LGPL, MPL 2.0 |
| SaaS 業務的開源核心 | AGPLv3 + 商業授權（dual licensing） |

---

## 開源協作工作流 Open Source Collaboration

### Contributor Workflow

```
1. Fork → 2. Clone → 3. Branch → 4. Code → 5. Test → 6. Push → 7. PR → 8. Review → 9. Merge
```

### 好的貢獻指南 Good CONTRIBUTING.md

- 如何設定開發環境
- 程式碼風格與規範
- 測試要求
- PR 範本
- Issue 範本
- 行為準則 (Code of Conduct)

### 開源禮儀 Open Source Etiquette

| Do ✅ | Don't ❌ |
|------|---------|
| Read CONTRIBUTING.md first | Demand features |
| Search existing issues | Open vague "doesn't work" issues |
| Provide minimal reproduction | Submit massive PRs without discussion |
| Be patient and respectful | Act entitled to free labor |

---

## 開源商業模式 Open Source Business Models

| Model | 說明 | 範例 |
|-------|------|------|
| **Open Core** | 核心開源 + 企業版收費 | GitLab, Elastic |
| **SaaS/Hosting** | 提供託管服務 | WordPress.com, Ghost(Pro) |
| **Support & Consulting** | 提供技術支援與顧問服務 | Red Hat, Canonical |
| **Dual Licensing** | GPL + 商業授權 | MySQL, Qt |
| **Donations & Sponsors** | 社群贊助 | Vue.js, curl |
| **Foundation Model** | 由非營利基金會管理 | Linux Foundation, Apache |

---

## Inner Source 內部開源

**在組織內部應用開源實踐**：

| 開源實踐 | Inner Source 等價 |
|---------|------------------|
| Public repository | Internal repository (visible to all) |
| Pull Request | Internal merge request |
| CONTRIBUTING.md | Internal guidelines |
| Community | Cross-team collaboration |
| Maintainer | Trusted committer |

---

## 常見問題 FAQ

### Q: MIT vs Apache 2.0，該選哪個？
**A**: 如果在意專利保護，選 Apache 2.0。如果追求極簡，選 MIT。

### Q: 我可以用 GPL 程式碼開發商業軟體嗎？
**A**: 可以，但你的軟體可能必須也以 GPL 發布（取決於使用方式）。內部使用不觸發 copyleft，散佈才會。

### Q: AI 模型的權重受開源許可證規範嗎？
**A**: 這仍是灰色地帶。OSI 正在制定 Open Source AI 定義，但 LLM 權重是否等同於「原始碼」仍有爭議。

---

> 💡 **Key Insight**: 開源不僅僅是公開程式碼——它是協作、透明度與社群的哲學。Choose your license carefully — it shapes who can use, modify, and profit from your work.
