---
title: TCP Protocol Deep Dive
tags: [networking, tcp, protocols]
created: 2026-05-29
aliases: [TCP協議深入, Transmission Control Protocol]
---

# TCP Protocol Deep Dive TCP 協議深入

> TCP (Transmission Control Protocol) is the workhorse of the Internet — providing reliable, ordered, and error-checked delivery of data between applications.
> TCP 是網際網路的主力協議——提供可靠、有序、錯誤檢查的端到端資料傳輸。

---

## TCP 核心特性 Core Features

| 特性 Feature | 說明 Description |
|-------------|-----------------|
| **Connection-Oriented** | 通訊前需建立連線（三次握手） |
| **Reliable Delivery** | ACK 確認 + 超時重傳 |
| **Ordered** | Sequence number 保證順序 |
| **Flow Control** | Sliding window，防止發送方淹沒接收方 |
| **Congestion Control** | 防止網路擁塞崩潰 |
| **Full-Duplex** | 雙向同時通訊 |
| **Byte Stream** | 無訊息邊界，應用層需自行界定 |

---

## Three-Way Handshake 三次握手

```
Client                              Server
  │                                   │
  │──── SYN (seq=x) ───────────────→│  (1) 我要建立連線
  │                                   │
  │←── SYN-ACK (seq=y, ack=x+1) ───│  (2) 收到，我準備好了
  │                                   │
  │──── ACK (ack=y+1) ─────────────→│  (3) 確認，連線建立
  │                                   │
  │◄═══════ Data Transfer ═══════►│
```

| 步驟 | 發送方 | 內容 | 意義 |
|------|--------|------|------|
| 1 | Client → Server | SYN, seq=x | 請求同步 |
| 2 | Server → Client | SYN-ACK, seq=y, ack=x+1 | 確認 + 自己同步 |
| 3 | Client → Server | ACK, ack=y+1 | 最終確認 |

**為什麼是三次？Why three?**
- 防止舊的重複連線請求到達服務端（歷史 SYN 問題）
- 雙向確認雙方發送/接收能力正常

---

## Four-Way Teardown 四次揮手

```
Client                              Server
  │                                   │
  │──── FIN (seq=u) ───────────────→│  "我沒資料要發了"
  │                                   │
  │←── ACK (ack=u+1) ──────────────│  "收到"
  │                                   │
  │←── FIN (seq=v) ────────────────│  "我也沒資料了"
  │                                   │
  │──── ACK (ack=v+1) ─────────────→│  "收到"
  │                                   │
  │  TIME_WAIT (2MSL)                │
```

---

## Flow Control: Sliding Window 流量控制

```
Sender                          Receiver
  │                               │
  │── Data (seq 1-1000) ────────→│  Window = 4000
  │── Data (seq 1001-2000) ─────→│
  │── Data (seq 2001-3000) ─────→│  Buffer filling...
  │── Data (seq 3001-4000) ─────→│
  │                               │
  │←── ACK 2001, Window=2000 ───│  Buffer 滿了，縮小窗口
  │                               │
  │── Data (seq 2001-3000) ─────→│  (retransmit)
```

- **Window Size**: 接收方告知發送方自己還能接收多少資料
- **Zero Window**: 接收方緩衝滿，發送方暫停，定期發送 window probe

---

## Congestion Control 擁塞控制

| 演算法 | 階段 | 說明 |
|--------|------|------|
| **Slow Start** | 開始 | cwnd 從 1 MSS 開始，每個 RTT 翻倍（指數增長） |
| **Congestion Avoidance** | 穩定 | 達到 ssthresh 後，每 RTT 線性增長 |
| **Fast Retransmit** | 丟包 | 收到 3 個 dup ACK → 立即重傳（不等 timeout） |
| **Fast Recovery** | 恢復 | 不回到 Slow Start，而是減半 cwnd 進入 Congestion Avoidance |

```
cwnd ↑
    │    ╱│
    │   ╱ │  Congestion Avoidance (linear)
    │  ╱  │
    │ ╱   │
    │╱    │  Slow Start (exponential)
    └──────────────→ time
         │
      ssthresh
```

---

## TCP Header Format

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
├─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┤
│     Source Port (16)         │      Dest Port (16)            │
├───────────────────────────────┼───────────────────────────────┤
│                    Sequence Number (32)                       │
├───────────────────────────────────────────────────────────────┤
│                 Acknowledgment Number (32)                    │
├─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┤
│ Data │     │U A P R S F│                                     │
│Offset │ Res │R C S S Y I│        Window Size (16)            │
│ (4)   │ (6) │G K H T N N│                                     │
└───────┴─────┴───────────┴─────────────────────────────────────┘
```

| Flag | 名稱 | 用途 |
|------|------|------|
| **SYN** | Synchronize | 建立連線 |
| **ACK** | Acknowledgment | 確認收到 |
| **FIN** | Finish | 終止連線 |
| **RST** | Reset | 重置連線 |
| **PSH** | Push | 立即推送資料 |
| **URG** | Urgent | 緊急資料 |

---

> 💡 TCP 的設計權衡在於**可靠性 vs 延遲**——每個 ACK、重傳、握手都是為了可靠性而犧牲速度。這就是為什麼遊戲和 VoIP 偏好 UDP。
