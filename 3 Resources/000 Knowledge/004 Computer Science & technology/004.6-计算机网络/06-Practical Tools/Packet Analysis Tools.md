---
title: Packet Analysis Tools
tags: [networking, tools, wireshark]
created: 2026-05-29
---

# Packet Analysis Tools 封包分析工具

## Wireshark

The gold standard for packet analysis. Features:
- Live capture and offline analysis
- Display filters: `http`, `tcp.port==443`, `ip.addr==192.168.1.1`
- Protocol dissection for 1000+ protocols
- Follow TCP stream

## tcpdump (CLI)
```bash
tcpdump -i eth0 port 80            # HTTP traffic
tcpdump -i any host 192.168.1.5    # Traffic to/from host
tcpdump -w capture.pcap             # Save to file
tcpdump -r capture.pcap             # Read from file
```

## Common Filters

| Filter | Meaning |
|--------|---------|
| `tcp.flags.syn==1` | TCP SYN packets |
| `tcp.analysis.retransmission` | Retransmissions |
| `http.request` | HTTP requests |
| `dns` | DNS queries |

> 💡 Wireshark tells you what's actually happening on the wire — not what you think is happening.
