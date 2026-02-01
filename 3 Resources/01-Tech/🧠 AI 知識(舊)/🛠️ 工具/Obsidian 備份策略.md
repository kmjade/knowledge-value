---
title: Obsidian 備份策略
status: active
tags: [Obsidian, backup, data-protection]
aliases: [Obsidian Backup Strategy]
created: 2026-02-01
modified: 2026-02-01
---

# Obsidian 備份策略

## 定義

# 方法

## 備份方式

### 1. Git 備份
**特點**:
# 版本
- 可選擇性備份和恢復
- 支持分支和合併
- 免費且開源

**實現方式**:
- 使用 Obsidian Git 外掛自動備份
# 管理
- 與 GitHub/GitLab/Gitee 等平台整合

# 配置
```json
{
  "autoCommitInterval": 5,
  "autoPushInterval": 10,
  "commitMessage": "Auto backup at {{date}}",
  "commitDateFormat": "YYYY-MM-DD HH:mm:ss"
}
```

### 2. 雲端同步
**特點**:
- 多設備實時同步
- 自動備份到雲端
- 便於跨平台使用

**實現方式**:
- Obsidian Sync（官方服務，收費）
- 第三方雲服務（Dropbox、Google Drive、OneDrive）
- Syncthing（開源 P2P 同步）

### 3. 定期備份
**特點**:
- 完整備份整個知識庫
- 可離線儲存和恢復
- 便於長期存檔

**實現方式**:
- 每週全庫備份到外部存儲
- 每月完整備份到雲端
- 重要節點前手動備份

## 備份計劃

### 日常備份
- **頻率**: 自動，每 5-10 分鐘
- **方式**: Git 自動提交
# 修改
- **存儲**: 本地 Git 倉庫

### 週常備份
- **頻率**: 每週一次
- **方式**: Git 推送到遠程
- **範圍**: 完整知識庫
- **存儲**: GitHub/GitLab

### 月常備份
- **頻率**: 每月一次
- **方式**: 完整備份到雲端
# 配置
- **存儲**: Google Drive/Dropbox

### 節點備份
- **時機**: 重要項目完成、系統升級前
- **方式**: 手動完整備份
# 配置
- **存儲**: 外部硬盤 + 雲端

## 備份內容

### 核心內容
- ✅ 所有 Markdown 筆記檔案
- ✅ 附件檔案（圖片、PDF 等）
# 配置

### 選項內容
- ⭕ 外掛緩存和臨時檔案
- ⭕ 大型媒體檔案（可單獨處理）
- ⭕ 備份腳本和工具

### 排除內容
- ❌ `.git/` 檔案夾（Git 備份時）
- ❌ `.obsidian/workspace` 檔案（工作區狀態）
- ❌ 其他臨時檔案和緩存

## 恢復策略

### Git 恢復
```bash
# 查看
git log --oneline

# 版本
git checkout <commit-hash>

# 恢復特定檔案
git checkout <commit-hash> -- path/to/file.md

# 版本
git reset HEAD~1
```

### 雲端同步恢復
1. 停止所有同步操作
2. 下載完整備份
3. 解壓替換本地檔案
4. 重新啟動 Obsidian

### 外部存儲恢復
1. 連接外部存儲設備
2. 複製備份檔案
3. 替換本地知識庫
4. 驗證數據完整性

## 最佳實踐

### 3-2-1 備份原則
- **3** 份副本：原始數據 + 2 個備份
- **2** 種不同介質：本地 + 雲端
- **1** 個離線副本：外部存儲

### 備份驗證
- 定期測試備份恢復
- 驗證備份完整性
- 檢查備份大小和內容
- 確認恢復流程可行

### 自動化
# 工作流

### 加密和安全
- 敏感資訊加密存儲
- 使用強密碼保護雲端備份
# 更新
- 注意數據隱私保護

## 故障排除

### 常見問題

| 問題 | 可能原因 | 解決方案 |
|------|----------|----------|
| 備份失敗 | 網絡問題 | 檢查網絡連接，重試備份 |
| 同步衝突 | 多端編輯 | 確保只在一端編輯，解決衝突 |
| 恢復失敗 | 備份損壞 | 使用其他備份副本 |
| 效能問題 | 檔案過多 | 優化檔案結構，定期清理 |

### 應急恢復
1. 立即停止所有操作
2. 評估數據損失情況
3. 選擇最近的可用備份
4. 按照恢復流程執行
5. 驗證恢復結果
6. 總結經驗教訓

## 相關筆記

- [[Obsidian Git 整合]]
- [[Obsidian 效能優化]]
# 工作流

## 參考資源

- [Obsidian 官方文檔 - 同步](https://help.obsidian.md/Sync)
- [Obsidian Git 外掛](https://github.com/Vinzent03/obsidian-git)
- [Git 官方文檔](https://git-scm.com/doc)
