---
aliases: [PSU Power Supply] · created: 2026-05-30
type: concept · category: hardware · status: reviewed
---

# PSU Power 電源供應

## 定義
電源供應器 (PSU: Power Supply Unit) 將交流電 (AC) 轉換為直流電 (DC)，為計算機所有組件提供穩定、清潔的電力供應，是系統穩定性與壽命的基礎。

## 核心內容

### 電壓軌 (Voltage Rails)
| 軌道 | 電壓 | 用途 |
|:----:|:----:|------|
| **+12V** | 12V | CPU / GPU / 馬達 (最主要功耗來源) |
| **+5V** | 5V | SSD / USB / 部分主機板 |
| **+3.3V** | 3.3V | M.2 SSD / RAM / 晶片組 |
| **+5VSB** | 5V Standby | 待機供電 (關機仍供電) |
| **-12V** | -12V | RS-232 序列埠 (少用) |

### 80 PLUS 認證
- 測試負載點：20%、50%、100%
- 金牌 (Gold)：87%/90%/87% (主流推薦)
- 白金牌 (Platinum)：90%/92%/89%
- 鈦金牌 (Titanium)：92%/94%/90%
- **重要性**: 效率影響發熱與電費，金牌以上轉換效率與品質正相關

### 保護機制
| 保護 | 功能 |
|:----:|------|
| OCP | 過電流保護 (每軌獨立) |
| OVP/UVP | 過/欠電壓保護 |
| OPP | 總功率過載保護 |
| OTP | 過溫保護 |
| SCP | 短路保護 |

### 選購要點
- **瓦數**: CPU TDP + GPU TDP + 150W × 1.5 餘量
- **單路 vs 多路 +12V**: 單路簡單但故障無保護，多路安全但需注意分配
- **模組化**: 全模組 > 半模組 > 非模組 (理線便利性)
- **電容**: 全日系電容 = 品質指標

## 相關
[[wiki/concepts/Cooling-散熱|Cooling]] · [[wiki/concepts/Motherboard-Chipset-主機板芯片組|Motherboard Chipset]]

## Sources
[[wiki/sources/source-HW-KB|Source: HW-KB]]
