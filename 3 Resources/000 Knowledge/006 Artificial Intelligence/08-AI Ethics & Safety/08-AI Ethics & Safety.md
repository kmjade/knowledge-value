---
title: AI Ethics & Safety
tags: [ai, ethics, safety]
created: 2026-06-01
aliases: [AI倫理, AI安全, AI治理, AI對齊, Responsible AI]
---

# 08 — AI Ethics & Safety 人工智慧倫理與安全

> As AI systems grow more powerful and pervasive, ensuring they are fair, safe, transparent, and aligned with human values is no longer optional — it is an existential imperative.
> 隨著 AI 系統日益強大和普及，確保它們公平、安全、透明並與人類價值觀對齊，已不再是選項——而是生存級的必須。

---

## 偏見與公平 Bias & Fairness

| 概念 Concept | 說明 Description |
|-------------|-----------------|
| **資料偏見 Data Bias** | 訓練資料不均衡或反映歷史歧視（性別/種族/地域） |
| **演算法偏見 Algorithmic Bias** | 模型設計或最佳化目標導致的不公平 |
| **公平性指標 Fairness Metrics** | Demographic Parity、Equalized Odds、Equal Opportunity |
| **緩解策略 Mitigation** | 資料重採樣、對抗去偏、正則化約束、紅隊測試 |

---

## 可解釋性 Explainability (XAI)

| 方法 Method | 類型 Type | 說明 Description |
|-----------|---------|-----------------|
| **SHAP** | 事後解釋 Post-hoc | Shapley 值，量化每個特徵對預測的貢獻 |
| **LIME** | 事後解釋 Post-hoc | 局部線性近似，解釋單個預測 |
| **Attention Visualization** | 內在解釋 Intrinsic | 視覺化 Transformer 注意力權重 |
| **Grad-CAM** | 內在解釋 Intrinsic | CNN 的類別激活熱力圖 |
| **Concept-based XAI** | 概念級解釋 | TCAV，測試高層概念對決策的影響 |

> 關鍵權衡：**準確性 vs 可解釋性**——最準確的模型（深度神經網路）通常是最不透明的黑箱。

---

## 對齊問題 The Alignment Problem

| 問題 Problem | 說明 Description |
|-------------|-----------------|
| **目標錯位 Reward Misspecification** | AI 最佳化的指標與人類真實意圖不一致（如：最大化點擊而非使用者滿意度） |
| **Instrumental Convergence 工具收斂** | 智慧系統會追求權力/資源等次目標，無論最終目標是什麼 |
| **Scalable Oversight 可擴展監督** | 當 AI 超越人類能力時，人類無法有效監督 |
| **RLHF / DPO** | 從人類回饋中學習偏好，是目前主流的對齊方法 |
| **Constitutional AI** | AI 根據憲法原則自我批評和修正（Anthropic 的 RLAIF 路線） |

---

## 安全與魯棒性 Safety & Robustness

| 威脅 Threat | 防禦 Defense |
|------------|-------------|
| **Adversarial Attacks 對抗攻擊** — 微小擾動使模型誤判 | 對抗訓練、輸入淨化、梯度遮罩 |
| **Jailbreaking 越獄** — 繞過 LLM 安全限制 | 持續紅隊測試、分層安全過濾、對抗訓練 |
| **Prompt Injection 提示注入** — 惡意指令覆蓋系統提示 | 輸入隔離、權限分級、結構化輸入解析 |
| **Data Poisoning 資料投毒** — 污染訓練資料 | 資料來源驗證、異常檢測、差分隱私 |

---

## 隱私保護 Privacy

| 技術 Technique | 說明 Description |
|---------------|-----------------|
| **Differential Privacy 差分隱私** | 數學保證個體資料無法從模型輸出推斷，ε 控制隱私預算 |
| **Federated Learning 聯邦學習** | 資料不離開本地，僅傳輸模型更新梯度 |
| **Data Minimization 資料最小化** | 僅收集和使用必要的最少資料 |
| **Model Unlearning 模型遺忘** | 從已訓練模型中移除特定資料的影響 |

---

## 監管與組織 Regulation & Organizations

| 監管/組織 Regulation/Org | 說明 Description |
|------------------------|-----------------|
| **EU AI Act 歐盟 AI 法案** | 全球首部全面 AI 法規，按風險分級（禁止/高風險/有限/最低） |
| **China AI Regulations** | 生成式 AI 管理辦法、演算法推薦管理規定 |
| **US Executive Order on AI** | 拜登政府 AI 行政命令，安全 + 創新並重 |
| **Anthropic** | 專注於 Constitutional AI 和可解釋性 |
| **DeepMind Safety** | 對齊研究、紅隊、AGI 安全框架 |
| **OpenAI Safety / Superalignment** | RLHF 先驅，超級對齊研究 |
| **ARC / MIRI** | 理論 AI 安全研究組織 |

---

## 相關模組 Related Modules

| 模組 Module | 關聯 |
|------------|------|
| [[01-AI Overview]] — AI 的定義與類型 | 倫理討論的基礎語境 |
| [[06-Reinforcement Learning]] — RLHF 技術細節 | 對齊的技術實現 |
| [[07-Generative AI & LLMs]] — LLM 安全 | 生成式 AI 的倫理挑戰 |
| [[09-AI Applications & Tools]] — 負責任部署 | 倫理落地的工程實踐 |

---

> 💡 **Key Insight**: AI safety is not a feature to bolt on at the end — it must be integrated from the start. AI 安全不是最後才加上去的功能——它必須從一開始就被整合進系統設計。The most powerful AI is the one we can trust.
