---
title: "標籤驗證清單"
created: 2026-02-15
tags:
  - #system/template
  - #system/navigation
  - #topic/networking
aliases:
  - 標籤驗證清單
  - tag-validation-checklist
---

# 標籤驗證清單

> [!info] 概述
> 本清單用於驗證網絡技術知識庫文件的標籤是否符合規範，確保標籤的一致性和完整性。

---

## 一、必須包含的標籤檢查

### 1.1 PARA 標籤檢查

| 標籤 | 是否必須 | 說明 | 檢查 |
|------|----------|------|------|
| `#para/resource/tech` | ✅ 是 | 技術資源標籤 | [ ] |

**驗證方法**：檢查文件 frontmatter 的 `tags` 字段是否包含 `#para/resource/tech`。

**示例**：
```yaml
---
tags:
  - #para/resource/tech
---
```

---

### 1.2 Topic 標籤檢查

| 標籤 | 是否必須 | 說明 | 檢查 |
|------|----------|------|------|
| `#topic/networking` | ✅ 是 | 網絡技術主題標籤 | [ ] |
| `#topic/[子主題]` | ✅ 是 | 具體主題標籤（根據內容選擇） | [ ] |

**可選的子主題標籤**：
- `#topic/basics` - 基礎理論
- `#topic/protocols` - 協議
- `#topic/layers` - 網絡分層
- `#topic/architecture` - 網絡架構
- `#topic/security` - 安全
- `#topic/management` - 管理
- `#topic/tools` - 工具
- `#topic/troubleshooting` - 故障排查

**驗證方法**：
1. 檢查是否包含 `#topic/networking`
2. 檢查是否包含相應的子主題標籤

**示例**：
```yaml
---
tags:
  - #topic/networking
  - #topic/basics
  - #topic/layers
---
```

---

### 1.3 Type 標籤檢查

| 標籤 | 是否必須 | 說明 | 檢查 |
|------|----------|------|------|
| `#type/[類型]` | ✅ 是 | 內容類型標籤（必須選一） | [ ] |

**可選的 Type 標籤**：
- `#type/concept` - 概念性筆記
- `#type/guide` - 指導性內容
- `#type/reference` - 參考資料
- `#type/tutorial` - 教程
- `#type/template` - 模板
- `#type/documentation` - 文檔
- `#type/summary` - 總結
- `#type/example` - 示例
- `#type/case-study` - 案例研究
- `#type/moc` - 內容地圖（MOC）

**驗證方法**：檢查是否包含且僅包含一個 `#type/` 標籤。

**示例**：
```yaml
---
tags:
  - #type/concept
---
```

---

### 1.4 Learning 標籤檢查

| 標籤 | 是否必須 | 說明 | 檢查 |
|------|----------|------|------|
| `#learning/[狀態]` | ✅ 是 | 學習狀態標籤（必須選一） | [ ] |

**可選的 Learning 標籤**：
- `#learning/new` - 新學習
- `#learning/progress` - 學習中
- `#learning/review` - 複習中
- `#learning/mastered` - 已掌握
- `#learning/archived` - 已歸檔

**驗證方法**：檢查是否包含且僅包含一個 `#learning/` 標籤。

**示例**：
```yaml
---
tags:
  - #learning/mastered
---
```

---

### 1.5 Difficulty 標籤檢查

| 標籤 | 是否必須 | 說明 | 檢查 |
|------|----------|------|------|
| `#difficulty/[等級]` | ✅ 是 | 難度等級標籤（必須選一） | [ ] |

**可選的 Difficulty 標籤**：
- `#difficulty/beginner` - 入門級
- `#difficulty/intermediate` - 中級
- `#difficulty/advanced` - 高級

**驗證方法**：檢查是否包含且僅包含一個 `#difficulty/` 標籤。

**示例**：
```yaml
---
tags:
  - #difficulty/beginner
---
```

---

### 1.6 Zettelkasten 標籤檢查

| 標籤 | 是否必須 | 說明 | 檢查 |
|------|----------|------|------|
| `#zettel/type/[類型]` | ✅ 是 | 卡片類型標籤（必須選一） | [ ] |

**可選的 Zettelkasten 標籤**：
- `#zettel/type/fleeting` - 閃念筆記
- `#zettel/type/literature` - 文獻筆記
- `#zettel/type/permanent` - 永久筆記
- `#zettel/type/structure` - 結構筆記

**驗證方法**：檢查是否包含且僅包含一個 `#zettel/type/` 標籤。

**示例**：
```yaml
---
tags:
  - #zettel/type/permanent
---
```

---

## 二、可選的標籤檢查

### 2.1 Protocol 標籤檢查

| 標籤 | 是否必須 | 說明 | 檢查 |
|------|----------|------|------|
| `#protocol/[協議]` | ❌ 否 | 具體協議標籤（涉及協議時使用） | [ ] |

**可選的 Protocol 標籤**：
- `#protocol/os`, `#protocol/tcp-ip`
- `#protocol/http`, `#protocol/https`
- `#protocol/tcp`, `#protocol/udp`
- `#protocol/ip`, `#protocol/ipv4`, `#protocol/ipv6`
- `#protocol/icmp`, `#protocol/arp`
- `#protocol/dns`, `#protocol/dhcp`
- `#protocol/smtp`, `#protocol/pop3`, `#protocol/imap`
- `#protocol/ssh`, `#protocol/telnet`, `#protocol/ftp`
- `#protocol/ssl-tls`
- `#protocol/vlan`, `#protocol/stp`
- `#protocol/snmp`
- `#protocol/bgp`, `#protocol/ospf`, `#protocol/rip`
- `#protocol/lan`, `#protocol/wan`
- `#protocol/vpn`, `#protocol/ipsec`
- `#protocol/firewall`
- `#protocol/ethernet`, `#protocol/wifi`
- `#protocol/802-11`
- `#protocol/switch`, `#protocol/openflow`, `#protocol/nfv`

**驗證方法**：檢查涉及的協議是否有對應的標籤。

**示例**：
```yaml
---
tags:
  - #protocol/http
  - #protocol/https
  - #protocol/tcp
  - #protocol/ssl-tls
---
```

---

### 2.2 Layer 標籤檢查

| 標籤 | 是否必須 | 說明 | 檢查 |
|------|----------|------|------|
| `#layer/[分層]` | ❌ 否 | 網絡分層標籤（涉及分層時使用） | [ ] |

**可選的 Layer 標籤**：
- `#layer/application` - 應用程式層（Layer 7）
- `#layer/presentation` - 表示層（Layer 6）
- `#layer/session` - 會話層（Layer 5）
- `#layer/transport` - 傳輸層（Layer 4）
- `#layer/network` - 網路層（Layer 3）
- `#layer/data-link` - 數據鏈路層（Layer 2）
- `#layer/physical` - 物理層（Layer 1）

**驗證方法**：檢查涉及的網絡分層是否有對應的標籤。

**示例**：
```yaml
---
tags:
  - #layer/application
  - #layer/transport
  - #layer/network
---
```

---

### 2.3 System 標籤檢查

| 標籤 | 是否必須 | 說明 | 檢查 |
|------|----------|------|------|
| `#system/[功能]` | ❌ 否 | 系統功能標籤（MOC、模板等使用） | [ ] |

**可選的 System 標籤**：
- `#system/template` - 模板
- `#system/index` - 索引頁
- `#system/cache` - 緩存頁
- `#system/moc` - 內容地圖（MOC）
- `#system/dashboard` - 儀表板
- `#system/navigation` - 導航頁
- `#system/note` - 筆記

**驗證方法**：檢查是否具有特定系統功能的文件包含對應標籤。

**示例**：
```yaml
---
tags:
  - #system/moc
  - #system/template
  - #system/note
---
```

---

## 三、標籤格式檢查

### 3.1 基本格式檢查

| 檢查項 | 說明 | 通過/失敗 |
|--------|------|----------|
| 小寫字母 | 所有標籤使用小寫字母 | [ ] |
| 連字符分隔 | 使用 `-` 分隔單詞 | [ ] |
| 斜槓分層 | 使用 `/` 分層 | [ ] |
| 層級深度 | 標籤層級深度在 2-4 層之間 | [ ] |
| 英文為主 | 英文標籤為主標籤 | [ ] |
| 語義明確 | 標籤名有明確含義 | [ ] |
| 無重複 | 無語義重複標籤 | [ ] |

**驗證方法**：逐一檢查每個標籤的格式。

**示例**：
```yaml
---
tags:
  - #para/resource/tech           # ✓ 正確
  - #topic/networking/layers       # ✓ 正確（3層）
  - #protocol/http                # ✓ 正確
  - #layer/application           # ✓ 正確
  - #type/concept                # ✓ 正確
  - #zettel/type/permanent       # ✓ 正確
  - #learning/mastered           # ✓ 正確
  - #difficulty/beginner          # ✓ 正確
---
```

---

### 3.2 已廢棄標籤檢查

| 檢查項 | 說明 | 通過/失敗 |
|--------|------|----------|
| `#topic/protocol-stack` | 已廢棄，應替換為 `#topic/layers` | [ ] |
| `#topic/network-topology` | 已廢棄，應替換為 `#topic/architecture` | [ ] |
| `#topic/network-security` | 已廢棄，應替換為 `#topic/security` | [ ] |
| `#topic/security-basics` | 已廢棄，應替換為 `#topic/security/basics` | [ ] |
| `#topic/network-monitoring` | 已廢棄，應替換為 `#topic/management/monitoring` | [ ] |
| `#topic/practical-tools` | 已廢棄，應替換為 `#topic/tools` | [ ] |
| `#topic/diagnostic-tools` | 已廢棄，應替換為 `#topic/tools/diagnostic` | [ ] |
| `#topic/automation` | 已廢棄，應替換為 `#topic/management/automation` | [ ] |
| `#topic/cryptography` | 已廢棄，應替換為 `#topic/security/cryptography` | [ ] |
| `#topic/attacks` | 已廢棄，應替換為 `#topic/security/attacks` | [ ] |
| `#topic/cloud` | 已廢棄，應替換為 `#topic/architecture/cloud` | [ ] |
| `#topic/sdn` | 已廢棄，應替換為 `#topic/architecture/sdn` | [ ] |
| `#type/protocol-learning` | 已廢棄，應替換為 `#type/tutorial` | [ ] |
| `#type/troubleshooting` | 已廢棄，應替換為 `#type/guide` | [ ] |

**驗證方法**：檢查是否包含任何已廢棄的標籤。

---

## 四、學習狀態和難度評估指南

### 4.1 學習狀態評估

| 狀態 | 說明 | 更新時機 | 典型文件 |
|------|------|----------|----------|
| `#learning/new` | 剛開始學習 | 剛創建的筆記 | 新增的協議文件 |
| `#learning/progress` | 學習中 | 已理解基本概念，正在深入研究 | 學習中的協議文件 |
| `#learning/review` | 複習中 | 需要定期複習以保持記憶 | 已掌握但需要複習的文件 |
| `#learning/mastered` | 已掌握 | 完全理解並能應用 | 已掌握的基礎知識文件 |
| `#learning/archived` | 已歸檔 | 已掌握但暫時不需要使用 | 已掌握但暫時不需要的進階內容 |

**評估指南**：
1. **#learning/new**：剛創建，還在理解基本概念，需要進一步研究
2. **#learning/progress**：已理解基本概念，正在深入研究細節，需要實踐驗證
3. **#learning/review**：已理解大部分內容，需要定期複習以保持記憶，計劃進一步深入
4. **#learning/mastered**：完全理解並能應用，可以向他人解釋，能夠解決相關問題
5. **#learning/archived**：已掌握但暫時不需要使用，保留作為參考，可隨時重新激活

**檢查項目**：
- [ ] 學習狀態是否準確反映當前掌握程度？
- [ ] 是否需要更新學習狀態？

---

### 4.2 難度等級評估

| 等級 | 說明 | 前置知識 | 學習時間 | 典型文件 |
|------|------|----------|----------|----------|
| `#difficulty/beginner` | 入門級 | 無需前置知識 | 1-2小時 | OSI模型、網路拓撲結構 |
| `#difficulty/intermediate` | 中級 | 了解基礎概念 | 3-5小時 | HTTP協議、TCP協議深入 |
| `#difficulty/advanced` | 高級 | 掌握核心協議 | 5+小時 | SDN軟體定義網絡、加密與認證 |

**評估指南**：
1. **#difficulty/beginner**：內容為基礎概念和入門知識，無需前置知識即可學習
2. **#difficulty/intermediate**：內容為核心協議和技術細節，需要了解基礎概念
3. **#difficulty/advanced**：內容為進階架構和複雜技術，需要掌握核心協議

**檢查項目**：
- [ ] 難度等級是否準確反映內容複雜度？
- [ ] 是否需要更新難度等級？

---

## 五、標籤完整性檢查清單

### 5.1 基礎知識文件

**檢查項目**：
- [ ] `#para/resource/tech`
- [ ] `#topic/networking`
- [ ] `#topic/basics` 或 `#topic/layers`
- [ ] `#protocol/[相關協議]`（如果適用）
- [ ] `#layer/[相關分層]`（如果適用）
- [ ] `#type/concept`
- [ ] `#zettel/type/permanent`
- [ ] `#learning/[狀態]`
- [ ] `#difficulty/[等級]`

**典型文件**：
- OSI七層模型.md
- TCP IP協議棧.md
- IP地址與子網劃分.md
- 網路拓撲結構.md

---

### 5.2 核心協議文件

**檢查項目**：
- [ ] `#para/resource/tech`
- [ ] `#topic/networking`
- [ ] `#topic/protocols`
- [ ] `#protocol/[具體協議]`
- [ ] `#layer/[相關分層]`（如果適用）
- [ ] `#type/concept` 或 `#type/guide`
- [ ] `#zettel/type/permanent`
- [ ] `#learning/[狀態]`
- [ ] `#difficulty/[等級]`

**典型文件**：
- HTTP協議.md
- TCP協議深入.md
- 傳輸層協議.md
- 應用程式層協議.md

---

### 5.3 網絡架構文件

**檢查項目**：
- [ ] `#para/resource/tech`
- [ ] `#topic/networking`
- [ ] `#topic/architecture`
- [ ] `#protocol/[相關協議]`（如果適用）
- [ ] `#layer/[相關分層]`（如果適用）
- [ ] `#type/concept`
- [ ] `#zettel/type/permanent`
- [ ] `#learning/[狀態]`
- [ ] `#difficulty/[等級]`

**典型文件**：
- SDN軟體定義網絡.md
- VLAN虛擬局域網.md
- 局域網(LAN).md
- 廣域網(WAN).md

---

### 5.4 網絡安全文件

**檢查項目**：
- [ ] `#para/resource/tech`
- [ ] `#topic/networking`
- [ ] `#topic/security`
- [ ] `#protocol/[相關協議]`（如果適用）
- [ ] `#type/concept` 或 `#type/guide`
- [ ] `#zettel/type/permanent`
- [ ] `#learning/[狀態]`
- [ ] `#difficulty/[等級]`

**典型文件**：
- 網絡安全基礎.md
- 加密與認證.md
- 防火牆技術.md
- VPN虛擬專用網絡.md

---

### 5.5 網絡管理文件

**檢查項目**：
- [ ] `#para/resource/tech`
- [ ] `#topic/networking`
- [ ] `#topic/management`
- [ ] `#protocol/[相關協議]`（如果適用）
- [ ] `#type/guide`
- [ ] `#zettel/type/permanent`
- [ ] `#learning/[狀態]`
- [ ] `#difficulty/[等級]`

**典型文件**：
- 網絡監控.md
- 故障排查.md
- 網絡效能優化.md
- 自動化運維.md

---

### 5.6 實踐工具文件

**檢查項目**：
- [ ] `#para/resource/tech`
- [ ] `#topic/networking`
- [ ] `#topic/tools`
- [ ] `#type/guide`
- [ ] `#zettel/type/permanent`
- [ ] `#learning/[狀態]`
- [ ] `#difficulty/[等級]`

**典型文件**：
- 網絡診斷工具.md
- 封包分析工具.md

---

### 5.7 模板文件

**檢查項目**：
- [ ] `#system/template`
- [ ] `#type/tutorial` 或 `#type/template`
- [ ] `#zettel/type/structure`
- [ ] `#learning/[狀態]`
- [ ] `#difficulty/[等級]`

**典型文件**：
- 協議學習模板.md
- 問題排查模板.md

---

### 5.8 筆記文件

**檢查項目**：
- [ ] `#system/note`
- [ ] `#topic/networking`（如果適用）
- [ ] `#type/summary` 或 `#type/case-study`
- [ ] `#zettel/type/structure`
- [ ] `#learning/[狀態]`
- [ ] `#difficulty/[等級]`

**典型文件**：
- 學習心得.md
- 實踐案例.md
- 問題記錄.md

---

### 5.9 MOC 文件

**檢查項目**：
- [ ] `#system/moc`
- [ ] `#topic/networking`
- [ ] `#type/moc`
- [ ] `#zettel/type/structure`
- [ ] `#learning/[狀態]`
- [ ] `#difficulty/[等級]`

**典型文件**：
- MOC-總覽.md
- MOC-學習路徑.md
- Networking.md

---

## 六、驗證步驟

### 6.1 單文件驗證步驟

1. **步驟1**：檢查必須包含的標籤
   - [ ] `#para/resource/tech`
   - [ ] `#topic/networking`
   - [ ] `#type/[類型]`
   - [ ] `#learning/[狀態]`
   - [ ] `#difficulty/[等級]`
   - [ ] `#zettel/type/[類型]`

2. **步驟2**：檢查可選標籤
   - [ ] `#protocol/[協議]`（如果適用）
   - [ ] `#layer/[分層]`（如果適用）
   - [ ] `#system/[功能]`（如果適用）

3. **步驟3**：檢查標籤格式
   - [ ] 小寫字母
   - [ ] 連字符分隔
   - [ ] 斜槓分層
   - [ ] 層級深度（2-4層）

4. **步驟4**：檢查已廢棄標籤
   - [ ] 無已廢棄標籤

---

### 6.2 批量驗證步驟

**使用命令檢查**：

```bash
# 檢查所有文件是否包含 #para/resource/tech
grep -r "#para/resource/tech" "3 Resources/01-Tech/Networking/" -l

# 檢查是否有已廢棄的標籤
grep -r "#topic/protocol-stack" "3 Resources/01-Tech/Networking/"
grep -r "#topic/network-topology" "3 Resources/01-Tech/Networking/"
grep -r "#topic/network-security" "3 Resources/01-Tech/Networking/"
grep -r "#topic/practical-tools" "3 Resources/01-Tech/Networking/"
```

**驗證報告**：
- [ ] 所有文件都包含 `#para/resource/tech`
- [ ] 所有文件都包含 `#topic/networking`
- [ ] 所有文件都包含 `#learning/[狀態]`
- [ ] 所有文件都包含 `#difficulty/[等級]`
- [ ] 無文件包含已廢棄標籤

---

## 七、常見問題

### 7.1 標籤相關問題

**Q1：一個文件可以有多個 `#type/` 標籤嗎？**
**A**：不可以，每個文件只能包含一個 `#type/` 標籤。

**Q2：如何選擇合適的 `#learning/` 狀態？**
**A**：根據學習進度選擇，新學習選 `#learning/new`，學習中選 `#learning/progress`，已掌握選 `#learning/mastered`。

**Q3：如何評估 `#difficulty/` 等級？**
**A**：根據內容複雜度、前置知識要求和學習時間評估。參考本清單第四章的評估指南。

**Q4：已廢棄的標籤需要立即替換嗎？**
**A**：建議替換，但可以根據實際情況安排時間。新創建的筆記應使用新標籤。

---

## 八、驗證報告模板

### 8.1 單文件驗證報告

```
文件名：[文件名稱.md]
驗證日期：[YYYY-MM-DD]

## 必須包含的標籤
✓ #para/resource/tech
✓ #topic/networking
✓ #topic/[子主題]
✓ #type/[類型]
✓ #learning/[狀態]
✓ #difficulty/[等級]
✓ #zettel/type/[類型]

## 可選的標籤
- #protocol/[協議]
- #layer/[分層]
- #system/[功能]

## 標籤格式檢查
✓ 小寫字母
✓ 連字符分隔
✓ 斜槓分層
✓ 層級深度（2-4層）

## 已廢棄標籤檢查
✓ 無已廢棄標籤

## 學習狀態和難度評估
學習狀態：[status]
難度等級：[level]

## 結論
[通過/失敗]
[備註]
```

### 8.2 批量驗證報告

```
批量驗證報告
驗證日期：[YYYY-MM-DD]
驗證範圍：[目錄路徑]

## 統計信息
- 總文件數：[數量]
- 通過文件數：[數量]
- 失敗文件數：[數量]
- 通過率：[百分比]

## 失敗文件列表
1. [文件名稱.md] - [失敗原因]
2. [文件名稱.md] - [失敗原因]

## 常見問題
1. [問題描述]
2. [問題描述]

## 建議
[改進建議]
```

---

## 九、相關文檔

- [[networking-tag-system]] - 網絡技術知識庫標籤系統規範
- [[tag-system-guide]] - 主標籤系統指南

---

**文檔資訊**
- 創建時間：2026-02-15
- 最後更新：2026-02-15
- 文檔類型：標籤驗證清單
- 適用範圍：網絡技術知識庫
