---
title: Windows-WSL 问题
aliases:
  - Hermes on Windows/WSL
para: resource
domain:
  - "[[Hermes-Agent]]"
tags:
  - para/resource/tech
  - topic/hermes
  - type/troubleshooting
created: 2026-05-24
modified: 2026-05-25
---

# Windows / WSL 问题

## WSL2 要求

Hermes Agent 在 Windows 上推荐通过 WSL2 运行。原生 Windows 也支持，但体验不如 WSL2。

### 安装 WSL2

```powershell
# 管理员 PowerShell
wsl --install
```

### WSL2 systemd 启用

WSL2 需要 `systemd=true` 才能使 gateway 后台服务正常工作：

```ini
# /etc/wsl.conf
[boot]
systemd=true
```

重启 WSL：
```powershell
wsl --shutdown
```

---

## 常见问题

### Alt+Enter 换行

Windows Terminal 截获 `Alt+Enter` 为全屏切换。使用 **Ctrl+Enter** 代替。

### 配置文件 UTF-8 BOM

不要用记事本编辑 `~/.hermes/config.yaml`。使用：
```bash
hermes config edit
```

### 路径

在 WSL 中访问 Windows 文件：
```bash
/mnt/c/Users/<username>/   # C 盘
/mnt/d/                     # D 盘
```

---

## 相关链接

- [[../2 安装配置|安装配置]]
- [[../常用命令|常用命令]]
