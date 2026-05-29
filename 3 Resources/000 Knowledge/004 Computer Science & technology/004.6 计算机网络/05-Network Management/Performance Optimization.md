---
title: Network Performance Optimization
tags: [networking, performance, optimization]
created: 2026-05-29
---

# Network Performance Optimization 網路效能最佳化

## Optimization Areas

| Area | Techniques |
|------|-----------|
| **Bandwidth** | QoS, traffic shaping, compression |
| **Latency** | CDN, edge computing, TCP tuning |
| **TCP** | Window scaling, BBR congestion control |
| **HTTP** | HTTP/2 multiplexing, compression, caching |
| **DNS** | Reduce lookups, use CDN DNS |

## TCP Tuning
```bash
# Increase buffer sizes
net.core.rmem_max = 134217728
net.core.wmem_max = 134217728
# Enable BBR congestion control
net.core.default_qdisc = fq
net.ipv4.tcp_congestion_control = bbr
```

## QoS (Quality of Service)

| Priority | Traffic Type |
|----------|-------------|
| Highest | Voice (VoIP), Video conferencing |
| High | Critical business apps |
| Medium | Web browsing, email |
| Low | Bulk transfers, backups |

> 💡 You can't optimize what you don't measure. Baseline first, then improve.
