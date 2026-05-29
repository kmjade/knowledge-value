---
title: Network Issue Log
tags: [networking, issues, log]
created: 2026-05-29
---

# Issue Log 問題記錄

> Track recurring issues and their solutions.

| Date | Issue | Root Cause | Solution | Status |
|------|-------|------------|----------|--------|
| — | — | — | — | — |

## Common Issues Quick Reference

| Symptom | Likely Cause | Check |
|---------|-------------|-------|
| Can't ping gateway | L1/L2 issue | Cable, switch port, VLAN |
| Can ping IP but not hostname | DNS | `/etc/resolv.conf`, nslookup |
| Intermittent packet loss | Duplex mismatch, faulty cable | Interface stats, replace cable |
| Slow SSH | DNS reverse lookup timeout | `UseDNS no` in sshd_config |
| HTTPS not working, HTTP works | Firewall blocking 443 | Check firewall rules |

> 💡 Keep this log updated — it becomes your personal knowledge base for faster troubleshooting.
