---
title: Network Diagnostic Tools
tags: [networking, tools, diagnostics]
created: 2026-05-29
---

# Network Diagnostic Tools 網路診斷工具

## Essential Commands

| Command | Purpose | Example |
|---------|---------|---------|
| **ping** | Test connectivity | `ping 8.8.8.8` |
| **traceroute** | Trace packet path | `traceroute google.com` |
| **nslookup/dig** | DNS queries | `dig example.com A` |
| **nmap** | Port scanning | `nmap -sV 192.168.1.0/24` |
| **netstat/ss** | Connection info | `ss -tlnp` |
| **ip/ifconfig** | Interface config | `ip addr show` |
| **curl** | HTTP testing | `curl -I https://example.com` |
| **mtr** | ping + traceroute | `mtr google.com` |
| **iperf3** | Bandwidth testing | `iperf3 -c server` |
| **tcptraceroute** | TCP-specific trace | `tcptraceroute google.com 443` |

## Quick Diagnostic Flow
```
1. ping localhost        → TCP/IP stack working?
2. ping gateway          → Local network OK?
3. ping 8.8.8.8          → Internet access?
4. nslookup google.com   → DNS working?
5. curl https://example.com → Application layer OK?
```

> 💡 Master these 10 tools and you can diagnose 90% of network issues.
