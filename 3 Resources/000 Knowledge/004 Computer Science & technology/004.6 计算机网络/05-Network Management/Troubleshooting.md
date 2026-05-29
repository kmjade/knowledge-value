---
title: Network Troubleshooting
tags: [networking, troubleshooting]
created: 2026-05-29
---

# Network Troubleshooting 網路故障排查

## Systematic Approach

1. **Define** — What exactly is broken?
2. **Isolate** — Which layer? Which hop?
3. **Hypothesize** — What could cause this?
4. **Test** — Prove or disprove
5. **Fix** — Apply solution
6. **Document** — Record for future

## OSI Bottom-Up Debugging

| Layer | Check |
|-------|-------|
| **Physical** | Cable plugged? Link light? |
| **Data Link** | ARP table correct? MAC filtering? |
| **Network** | IP config? Can ping gateway? |
| **Transport** | Port open? Firewall blocking? |
| **Application** | Service running? Config correct? |

## Essential Commands
```bash
ping 8.8.8.8           # Connectivity
traceroute example.com # Path trace
nslookup example.com   # DNS check
netstat -tlnp          # Open ports
tcpdump -i eth0 port 80 # Packet capture
```

> 💡 Most network problems are at Layer 1 (cable unplugged) or Layer 8 (user error). Check the obvious first.
