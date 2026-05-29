---
title: Common Network Attacks & Defense
tags: [networking, security, attacks]
created: 2026-05-29
---

# Common Network Attacks & Defense 常見攻擊與防禦

| Attack | Layer | Description | Defense |
|--------|-------|-------------|---------|
| **DDoS** | L3-L7 | Overwhelm with traffic | Rate limiting, CDN, scrubbing |
| **SYN Flood** | L4 | Exhaust connection table | SYN cookies, rate limiting |
| **MITM** | L2-L7 | Intercept communication | TLS, certificate pinning |
| **ARP Spoofing** | L2 | Fake ARP replies | Static ARP, DAI |
| **DNS Poisoning** | L7 | Corrupt DNS cache | DNSSEC |
| **SQL Injection** | L7 | Malicious SQL input | Parameterized queries, WAF |
| **XSS** | L7 | Inject client-side scripts | CSP, input sanitization |
| **CSRF** | L7 | Forged cross-site requests | CSRF tokens, SameSite cookies |

## Defense-in-Depth
```
Perimeter → Network → Host → Application → Data
(Firewall)  (IDS/IPS)  (HIDS)    (WAF)    (Encryption)
```

> 💡 No single defense is enough — layer your security. Assume breach.
