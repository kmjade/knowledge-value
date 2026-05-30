---
title: Computer Networks Overview
tags: [cs, networking, moc]
created: 2026-05-29
aliases: [網路總覽, Network Overview]
---

# Computer Networks — Knowledge Base Overview 知識庫總覽

> DDC 004.6 全景地圖 — 電腦網路的完整知識圖譜。
> Complete knowledge map for computer networking.

---

## 知識領域圖譜 Domain Map

```
                 ┌────────────────────────────┐
                 │   Computer Networks         │
                 │       (DDC 004.6)           │
                 └────────────┬───────────────┘
                              │
     ┌────────────────────────┼────────────────────────┐
     │                        │                        │
┌────┴────┐            ┌──────┴──────┐          ┌──────┴──────┐
│ Theory   │            │  Protocols   │          │  Practice    │
│ 理論基礎    │            │  核心協議       │          │  工程實踐       │
└────┬────┘            └──────┬──────┘          └──────┬──────┘
     │                        │                        │
  OSI/TCP-IP              TCP/UDP                  Security
  IP/Subnet               HTTP/DNS                 Management
  Topologies              Routing                  Tools
```

---

## 子領域總覽

| 模組 | 核心問題 | 關鍵概念 |
|------|---------|---------|
| [[OSI Seven-Layer Model\|01-Fundamentals]] | How do network models work? | OSI, TCP/IP, IP addressing |
| [[TCP Protocol Deep Dive\|02-Core Protocols]] | How do protocols enable communication? | TCP/UDP/HTTP/DNS deep dive |
| [[LAN\|03-Network Architecture]] | How are networks structured? | LAN/WAN/VLAN/SDN/Wireless |
| [[Network Security Basics\|04-Network Security]] | How to secure networks? | Firewall, encryption, VPN |
| [[Network Monitoring\|05-Network Management]] | How to operate networks? | Monitoring, optimization, troubleshooting |
| [[Network Diagnostic Tools\|06-Practical Tools]] | What tools to use? | Wireshark, tcpdump, nmap |
| [[Protocol Learning Template\|07-Templates]] | How to learn systematically? | Protocol templates |
| [[Practical Cases\|08-Notes]] | Real-world experience | Cases, lessons learned |

---

## 網路協議棧全景 Protocol Stack Panorama

```
┌─────────────────────────────────────────────────┐
│  Application  │ HTTP  FTP  SMTP  DNS  SSH  ... │
├─────────────────────────────────────────────────┤
│  Transport    │        TCP         UDP          │
├─────────────────────────────────────────────────┤
│  Internet     │     IPv4/IPv6  ICMP  ARP       │
├─────────────────────────────────────────────────┤
│  Link         │  Ethernet  Wi-Fi  PPP  ...     │
└─────────────────────────────────────────────────┘
```

---

## 學習建議

詳見 [[MOC-Learning Path]]。

---

> 💡 網路是網際網路的基石——理解分層模型就理解了整個網際網路的運作原理。
