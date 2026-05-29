---
aliases: [Pi FAQ] · tags: [DDC/004.165, faq]
---

# 樹莓派 FAQ

### Pi 5 還是 Pi 4B？

**選 Pi 5**：需要更高的 CPU 性能 (2-3× faster)、NVMe SSD、雙 4Kp60 顯示、AI Kit 加速。**選 Pi 4B**：預算有限、已有 Pi 4B 生態、不需 PCIe。對大多數新使用者 → 直接上 Pi 5 (4GB)。

### 電源供應器要買什麼規格？

Pi 5 需要 **5V / 5A (25W)** USB-PD 電源才能發揮完整性能。使用低於 3A 的電源會自動限流 (USB 電流降至 600mA 且 CPU 降頻)。官方電源適配器 (約 $12) 是最安全選擇。Pi 4B 需要 5V/3A。

### 需要散熱片或風扇嗎？

**Pi 5：強烈建議**。滿載時 SoC 溫度可達 85°C+，會觸發降頻。官方 Active Cooler ($5) 或 Argon ONE 外殼內建風扇即可。Pi 4B：一般使用散熱片即可，長時間滿載也建議加風扇。

### microSD 還是 NVMe SSD？

SD 卡足夠一般使用，但長期運行的伺服器/NAS/桌面 → 強烈建議 NVMe SSD：
- 壽命遠超 SD 卡（無寫入磨損焦慮）
- 讀寫快 5×+（500 vs 100 MB/s）
- Pi 5 支援 M.2 HAT + NVMe 開機

### 如何遠端存取 (無公網 IP)？

| 方案 | 難度 | 費用 | 速度 |
|------|:---:|:---:|:---:|
| **Tailscale** | ⭐ 極簡 | 免費 | 快 (P2P) |
| Cloudflare Tunnel | ⭐⭐ | 免費 | 中等 |
| frp/nps 內網穿透 | ⭐⭐⭐ | 需 VPS | 取決於 VPS |
| ZeroTier | ⭐⭐ | 免費 | 快 (P2P) |

> 推薦 **Tailscale**：安裝簡單、P2P 直連、跨平台、免費方案足夠個人使用。

### 可以跑 Docker 嗎？

可以。Pi 5/4B 的 ARM64 架構完整支援 Docker。大部分熱門映像都有 `linux/arm64` 版本。安裝：

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

### Pi 適合當日常桌面電腦嗎？

**取決於用途**。Pi 5 (8GB) + NVMe SSD 可以流暢處理：瀏覽器 (5-10 tabs)、文書處理 (LibreOffice)、程式開發 (VS Code/terminal)、媒體播放 (4K 影片)。不適合：重度多工、影片剪輯、大型 IDE (PyCharm 等)、AAA 遊戲。作為第二台輕量桌面 → 可行。
