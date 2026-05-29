---
title: Network Topologies
tags: [networking, topology, fundamentals]
created: 2026-05-29
---

# Network Topologies 網路拓撲

> Network topology describes the physical or logical arrangement of nodes in a network.

| Topology | Structure | Pros | Cons |
|----------|-----------|------|------|
| **Star** 星型 | All nodes → central hub/switch | Easy to manage, isolate faults | Single point of failure |
| **Bus** 匯流排型 | All nodes on shared cable | Simple, cheap | Collisions, single cable failure |
| **Ring** 環型 | Nodes in circular loop | Equal access, predictable | One break = whole network down |
| **Mesh** 網狀 | Every node connected to every other | Maximum redundancy | Expensive, complex |
| **Tree** 樹型 | Hierarchical star topology | Scalable | Root node failure |

> 💡 Modern LANs use **Star** topology with switches. Modern data centers use **Spine-Leaf** (a mesh variant).
