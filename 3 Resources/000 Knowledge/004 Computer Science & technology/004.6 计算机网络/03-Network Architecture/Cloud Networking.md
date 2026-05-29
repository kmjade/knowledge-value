---
title: Cloud Networking
tags: [networking, cloud, sdn]
created: 2026-05-29
---

# Cloud Networking 雲端網路

## Cloud Network Concepts

| Concept | Description |
|---------|-------------|
| **VPC** | Virtual Private Cloud — isolated network |
| **Subnet** | CIDR block within VPC |
| **Security Group** | Stateful firewall at instance level |
| **NACL** | Stateless firewall at subnet level |
| **Load Balancer** | ALB (L7), NLB (L4), GWLB |
| **CDN** | Content Delivery Network (CloudFront, Cloud CDN) |
| **Direct Connect** | Dedicated physical connection to cloud |

## Overlay Networks

```
Physical Underlay → VXLAN/Geneve Overlay → Virtual Network
```

> 💡 Cloud networking abstracts physical infrastructure — VPCs, subnets, and security groups replace physical switches and firewalls.
