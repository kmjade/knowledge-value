---
aliases: [Cloud, SDN, NFV]
tags: [DDC/004.6, cloud]
---
# 09 雲計算與 SDN

## SDN (Software-Defined Networking)
控制平面 (Controller) 與數據平面 (Switch) **分離** → 集中管理、可程式化網絡。

## 關鍵技術
| 技術 | 說明 |
|------|------|
| **OpenFlow** | Controller↔Switch 標準協議 |
| **NFV** | 防火牆/負載均衡→虛擬化軟體 |
| **VXLAN** | Overlay 網絡 (覆蓋層) |

## 雲網絡模式
- **VPC** — 虛擬私有雲 (AWS/GCP 隔離網絡)
- **Load Balancer** — L4 (TCP) / L7 (HTTP) 流量分發
- **CDN** — 邊緣快取 (Cloudflare/Akamai)
- **Service Mesh** — Istio/Linkerd (微服務網絡層)
