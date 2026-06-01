---
title: Reinforcement Learning
tags: [ai, reinforcement-learning]
created: 2026-06-01
aliases: [RL, 強化學習, 增強學習]
---

# 06 — Reinforcement Learning 強化學習

> Reinforcement Learning is the third paradigm of ML: an agent learns by interacting with an environment, receiving rewards or penalties, and optimizing its behavior through trial and error.
> 強化學習是 ML 的第三種範式：智能體通過與環境互動、接收獎勵或懲罰，通過試錯來最佳化其行為策略。

---

## MDP 基礎 Markov Decision Process

| 概念 Concept | 說明 Description |
|-------------|-----------------|
| **State s ∈ S** | 環境的當前狀態 |
| **Action a ∈ A** | 智能體可執行的動作 |
| **Reward R(s,a)** | 執行動作後獲得的即時獎勵 |
| **Policy π(a|s)** | 在狀態 s 下選擇動作 a 的機率分佈 |
| **Value Function V(s)** | 從狀態 s 開始的期望累積獎勵 |
| **Q-Function Q(s,a)** | 在狀態 s 執行動作 a 後的期望累積獎勵 |
| **Discount Factor γ** | 未來獎勵的折現率 (0 < γ ≤ 1) |
| **Bellman Equation** | Q(s,a) = R(s,a) + γ·max Q(s',a')，RL 的理論基石 |

---

## 基礎方法 Foundation Methods

| 方法 Method | 類型 Type | 核心思想 Core Idea |
|-----------|---------|-------------------|
| **Q-Learning** | Value-based | 學習最優 Q 值表，離策略更新 |
| **SARSA** | Value-based | 在策略 Q 值更新，更保守 |
| **DQN** (Deep Q-Network) | Value-based | 深度網路 + 經驗回放 + 目標網路，玩 Atari 超人類 |
| **Policy Gradient** | Policy-based | 直接最佳化策略參數：∇J(θ) = E[∇log π(a|s) · R] |
| **REINFORCE** | Policy-based | Monte Carlo 策略梯度，高方差 |

---

## 進階方法 Advanced Methods

| 方法 Method | 類型 Type | 核心創新 Core Innovation |
|-----------|---------|------------------------|
| **A2C / A3C** | Actor-Critic | Actor (策略) + Critic (價值)，降低方差 |
| **PPO** | Policy Gradient | 信任區域裁剪，穩定訓練，RLHF 預設演算法 |
| **TRPO** | Policy Gradient | KL 散度約束，PPO 的前身 |
| **DDPG** | Actor-Critic | 連續動作空間，DDPG → TD3 → SAC 演進 |
| **SAC** (Soft Actor-Critic) | Actor-Critic | 熵正則化，探索性強，樣本效率高 |

---

## 里程碑系統 Milestone Systems

| 系統 System | 年份 Year | 意義 Significance |
|------------|----------|------------------|
| **DQN plays Atari** | 2013/2015 | 深度 RL 的開端，從像素學習 |
| **AlphaGo** | 2016 | 擊敗圍棋世界冠軍李世石，RL + MCTS + 人類知識 |
| **AlphaGo Zero** | 2017 | 無人類知識，純自我對弈訓練，超越 AlphaGo |
| **AlphaZero** | 2018 | 統一框架玩圍棋/象棋/將棋，通用棋類 AI |
| **OpenAI Five** | 2019 | Dota 2 擊敗世界冠軍，多智能體協作 |
| **AlphaStar** | 2019 | 星海爭霸 II 達宗師級，非完全資訊博弈 |

---

## RLHF 與 LLM 對齊 RLHF for LLM Alignment

> RLHF 是 ChatGPT 成功的關鍵技術，將 RL 應用於語言模型的行為對齊。

| 階段 Stage | 說明 Description |
|-----------|-----------------|
| **Step 1: SFT 監督微調** | 用高品質人類示範資料微調基座模型 |
| **Step 2: RM 獎勵模型** | 收集人類偏好對比資料，訓練獎勵模型 |
| **Step 3: PPO 強化學習** | 用獎勵模型引導 PPO 最佳化策略，使輸出符合人類偏好 |
| **DPO (替代方案)** | 直接從偏好資料最佳化，無需顯式獎勵模型，簡化 RLHF |

---

## 相關模組 Related Modules

| 模組 Module | 關聯 |
|------------|------|
| [[02-Machine Learning]] — 監督/非監督學習 | RL 是第三種 ML 範式 |
| [[03-Deep Learning]] — DQN/PPO 的網路架構 | 深度 RL 的基礎 |
| [[07-Generative AI & LLMs]] — RLHF 應用 | LLM 對齊的核心技術 |
| [[08-AI Ethics & Safety]] — AI 對齊 | RL 在 AI 安全中的角色 |

---

> 💡 **Key Insight**: RL is about learning from consequences, not examples. 強化學習是從後果中學習，而非從範例中學習。這使它成為最接近人類學習方式的 AI 範式——也是最難駕馭的。
