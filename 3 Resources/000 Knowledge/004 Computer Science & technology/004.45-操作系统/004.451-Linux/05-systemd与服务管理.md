---
aliases: [systemd, Service Management, Linux 服务管理, systemctl]
tags: [DDC/004.451, linux, systemd, services, boot]
created: 2026-05-30
---

# 05 systemd 與服務管理 systemd & Service Management

> systemd 是現代 Linux 的初始化系統與服務管理器 (PID 1)，取代 SysV init。提供平行啟動、socket 啟動、cgroup 管理和統一的日誌系統。

## systemd 架構 Architecture

```
systemd (PID 1)
├── systemd-journald  —— 日誌收集
├── systemd-logind    —— 使用者登入管理
├── systemd-resolved  —— DNS 解析
├── systemd-networkd  —— 網路管理
├── systemd-timedated —— 時間同步
└── systemd-udevd     —— 裝置管理
```

## systemctl 常用指令 systemctl Cheatsheet

| 指令 Command | 作用 |
|------|------|
| `systemctl status nginx` | 查看服務狀態 |
| `systemctl start/stop/restart nginx` | 啟動/停止/重啟 |
| `systemctl enable/disable nginx` | 開機啟動/停用 |
| `systemctl is-active nginx` | 檢查是否運行中 |
| `systemctl list-units --type=service` | 列出所有服務 |
| `systemctl list-units --state=failed` | 列出失敗單元 |
| `systemctl daemon-reload` | 重載 unit 檔案 |
| `systemctl mask/unmask nginx` | 遮蔽/解除 (禁止啟動) |

## .service 檔案結構 Unit File

```ini
# /etc/systemd/system/myapp.service
[Unit]
Description=My Application
After=network.target

[Service]
Type=simple
User=app
WorkingDirectory=/opt/myapp
ExecStart=/opt/myapp/app
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

### Service Type 對比

| Type | 行為 Behavior |
|------|------|
| **simple** | 預設。ExecStart 啟動後立即視為 running |
| **forking** | 傳統 daemon，父行程 fork 後退出 |
| **oneshot** | 一次性任務 (搭配 RemainAfterExit) |
| **notify** | 服務自行發送 sd_notify 通知就緒 |
| **idle** | 延遲到所有作業完成後才啟動 |

## journalctl — 日誌查詢 Log Query

```bash
journalctl -u nginx                      # 查看指定服務日誌
journalctl -u nginx -f                   # 即時追蹤 (tail -f)
journalctl --since "2026-05-30"          # 日期範圍
journalctl --since "1 hour ago"          # 相對時間
journalctl -p err                        # 僅錯誤等級
journalctl -b                            # 本次開機的日誌
journalctl --disk-usage                  # 日誌大小
journalctl --vacuum-size=500M            # 清理到 500M
```

## 開機流程 Boot Flow

```
韌體 (UEFI/BIOS)
  → GRUB (bootloader)
    → initramfs (初始 RAM 檔案系統)
      → systemd (PID 1)
        → basic.target → multi-user.target (文字模式)
        → graphical.target (圖形桌面)
```

```bash
systemd-analyze               # 開機耗時總覽
systemd-analyze blame         # 各服務啟動耗時排名
systemd-analyze critical-chain# 關鍵路徑分析
```

## 定時任務：Cron vs systemd Timer

| 功能 | Cron | systemd Timer |
|------|------|------|
| 排程精度 | 分鐘級 | 秒級 |
| 依賴管理 | ❌ | ✅ (Requires/After) |
| 日誌整合 | ❌ (獨立) | ✅ (journald) |
| 隨機延遲 | ❌ | ✅ RandomizedDelaySec |

```bash
# systemd timer 範例
# /etc/systemd/system/backup.timer
[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target

systemctl enable --now backup.timer
systemctl list-timers
```
