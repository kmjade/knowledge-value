---
title: TCP/IP Protocol Stack
tags: [networking, tcp-ip, fundamentals]
created: 2026-05-29
aliases: [TCP IP協議棧, Internet Protocol Suite]
---

# TCP/IP Protocol Stack TCP/IP 協議棧

> The TCP/IP protocol stack is the foundation of the Internet. It provides end-to-end data communication specifying how data should be packetized, addressed, transmitted, routed, and received.
> TCP/IP 協議棧是網際網路的基礎，定義了資料如何封裝、定址、傳輸、路由和接收。

---

## 四層模型 Four-Layer Model

```
┌──────────────────────────────────────────────┐
│ Application  │ HTTP  DNS  SMTP  FTP  SSH ... │
├──────────────────────────────────────────────┤
│ Transport    │        TCP        UDP         │
├──────────────────────────────────────────────┤
│ Internet     │   IPv4/IPv6  ICMP  ARP       │
├──────────────────────────────────────────────┤
│ Link         │  Ethernet  Wi-Fi  PPP  ...   │
└──────────────────────────────────────────────┘
```

---

## 各層詳解

### Link Layer 鏈路層

| 功能 | 說明 |
|------|------|
| **定址** | MAC address (48-bit, 如 `00:1A:2B:3C:4D:5E`) |
| **幀同步** | Frame delimiter, 區分幀的開始和結束 |
| **錯誤檢測** | CRC (Cyclic Redundancy Check) |
| **介質訪問控制** | CSMA/CD (Ethernet), CSMA/CA (Wi-Fi) |

### Internet Layer 網路層

| 功能 | 協議 |
|------|------|
| **邏輯定址** | IPv4 (32-bit), IPv6 (128-bit) |
| **路由** | OSPF, BGP, RIP |
| **封包轉發** | IP forwarding, routing table lookup |
| **錯誤報告** | ICMP (ping, traceroute) |
| **位址解析** | ARP (IP → MAC) |

### Transport Layer 傳輸層

| 功能 | TCP | UDP |
|------|-----|-----|
| **可靠性** | ✅ (ACK, retransmission) | ❌ |
| **順序保證** | ✅ (sequence numbers) | ❌ |
| **流量控制** | ✅ (sliding window) | ❌ |
| **擁塞控制** | ✅ (slow start, AIMD) | ❌ |
| **連線導向** | ✅ (3-way handshake) | ❌ (connectionless) |
| **速度** | Slower | Faster |
| **適合場景** | Web, email, file transfer | Video streaming, VoIP, DNS, gaming |

### Application Layer 應用層

| 協議 | Port | 用途 |
|------|------|------|
| HTTP/HTTPS | 80/443 | Web |
| DNS | 53 | Domain name resolution |
| SMTP | 25 | Email sending |
| FTP | 21 | File transfer |
| SSH | 22 | Secure shell |
| DHCP | 67/68 | Dynamic IP assignment |
| NTP | 123 | Time synchronization |

---

## 封裝過程 Encapsulation

```
Application Data
      ↓
  [TCP Header | Data]              ← Segment
      ↓
  [IP Header | TCP Header | Data]  ← Packet
      ↓
  [MAC Header | IP Header | TCP Header | Data | MAC Trailer] ← Frame
      ↓
  101100101011... (bits on wire)
```

---

> 💡 TCP/IP 的精髓在於**分層抽象**——每一層獨立工作，透過標準化介面協作。This is why you can browse the web over Wi-Fi, Ethernet, or 5G — the upper layers don't care about the physical medium.
