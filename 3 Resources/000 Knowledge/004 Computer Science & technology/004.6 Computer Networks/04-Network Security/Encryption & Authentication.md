---
title: Encryption & Authentication
tags: [networking, security, encryption]
created: 2026-05-29
---

# Encryption & Authentication 加密與認證

## Symmetric vs Asymmetric

| Feature | Symmetric | Asymmetric |
|---------|-----------|------------|
| Keys | One shared key | Public + Private key pair |
| Speed | Fast | Slow (100-1000x) |
| Use | Data encryption | Key exchange, signatures |

## TLS 1.3 Handshake (Simplified)
```
Client → ClientHello (key share) → Server
Client ← ServerHello + Certificate + Finished ← Server
Client → Finished → Server
```
1-RTT (vs TLS 1.2's 2-RTT)

## Authentication Methods

| Method | Description |
|--------|-------------|
| **Password** | Something you know |
| **Certificate** | Something you have (X.509) |
| **MFA** | Two or more factors |
| **SSO** | Single Sign-On (OAuth, SAML) |
| **RADIUS/TACACS+** | Centralized AAA for network devices |

> 💡 Authentication proves identity; encryption protects data. Both are essential.
