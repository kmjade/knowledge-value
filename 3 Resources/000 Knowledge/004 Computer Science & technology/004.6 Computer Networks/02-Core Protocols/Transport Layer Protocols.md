---
title: Transport Layer Protocols
tags: [networking, transport, tcp, udp]
created: 2026-05-29
---

# Transport Layer — TCP vs UDP 傳輸層協議對比

| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Guaranteed (ACK + retransmit) | Best-effort |
| Ordering | In-order delivery | No ordering guarantee |
| Speed | Slower (overhead) | Faster (minimal overhead) |
| Header Size | 20-60 bytes | 8 bytes |
| Use Cases | Web, email, file transfer, SSH | VoIP, video streaming, DNS, gaming, IoT |

## When to use UDP?

- Real-time applications (latency > reliability)
- Multicast/broadcast
- Simple request-response (DNS)
- QUIC (HTTP/3's transport)

> 💡 TCP是可靠的信使，UDP是快速的信鴿——選擇取決於你的應用需求。
