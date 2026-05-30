---
title: Network Monitoring
tags: [networking, management, monitoring]
created: 2026-05-29
aliases: [網絡監控, Network Management]
---

# Network Monitoring 網路監控

> Network monitoring is the practice of continuously observing a network to detect issues, track performance, and ensure availability.
> 網路監控是持續觀察網路以發現問題、追蹤效能、確保可用性的實踐。

---

## 監控層次 Monitoring Layers

| 層次 | 監控對象 | 工具 |
|------|---------|------|
| **Device** | CPU, memory, interface status | SNMP, NetFlow |
| **Link** | Bandwidth, latency, packet loss | ICMP (ping), iPerf |
| **Protocol** | TCP retransmit, DNS latency | Wireshark, tcpdump |
| **Application** | HTTP response time, error rate | APM tools |

---

## 關鍵指標 Key Metrics

| 指標 | 說明 |
|------|------|
| **Latency** | RTT (Round Trip Time)，越低越好 |
| **Throughput** | 實際傳輸速率 (bps) |
| **Packet Loss** | 丟包率，應 < 0.1% |
| **Jitter** | 延遲變異，VoIP 需 < 30ms |
| **Bandwidth Utilization** | 頻寬使用率 |
| **Error Rate** | CRC errors, collisions |

---

## 核心協議

| 協議 | 用途 |
|------|------|
| **SNMP** | 設備狀態查詢 (Simple Network Management Protocol) |
| **NetFlow/sFlow** | 流量統計採集 |
| **Syslog** | 系統日誌集中收集 |
| **ICMP** | ping, traceroute |

---

## 常用工具

| 工具 | 用途 |
|------|------|
| **ping** | 基本連通性測試 |
| **traceroute/tracert** | 路徑追蹤 |
| **nmap** | 埠掃描與服務發現 |
| **Wireshark** | 封包分析 |
| **tcpdump** | CLI 封包擷取 |
| **iPerf** | 頻寬效能測試 |
| **Prometheus + Grafana** | 現代監控堆疊 |

---

> 💡 好的監控不是等問題發生——而是在問題影響使用者之前發現它。Observability > Monitoring.
