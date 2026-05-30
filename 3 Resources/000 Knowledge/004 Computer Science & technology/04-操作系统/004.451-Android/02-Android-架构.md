---
aliases: [Android Architecture, Android 架構, Binder, Zygote]
tags: [DDC/004.451, android, architecture, kernel, runtime]
created: 2026-05-30
---

# 02 Android 架構 Architecture

> 從 Linux Kernel 到 System Server，Android 的分層架構設計使硬體抽象、應用安全隔離與高效 IPC 成為可能。
> From Linux Kernel to System Server, Android's layered architecture enables hardware abstraction, application sandboxing, and efficient IPC.

## 六層架構 Six-Layer Stack

| 層 | 組件 | 語言 | 職責 |
|:---|------|:---:|------|
| **Linux Kernel** | Binder, ashmem, wakelocks, lowmemorykiller | C | 驅動、行程管理、記憶體、網路 |
| **HAL** | Audio, Camera, Sensors, GPS HAL | C/C++ | 標準化硬體介面 (Treble HIDL/AIDL) |
| **Native Libraries** | libc (bionic), SQLite, WebKit, OpenGL ES | C/C++ | 底層效能關鍵函式庫 |
| **Android Runtime** | ART, dex2oat, GC | C++ | AOT/JIT 編譯 dex bytecode |
| **Java API Framework** | Activity Manager, Window Manager, Package Manager | Java/Kotlin | 開發者 API |
| **System Apps** | Launcher, Dialer, Settings, 第三方 App | Java/Kotlin | 最終使用者介面 |

## 關鍵啟動流程 Boot Sequence

```text
Bootloader → Linux Kernel → init (pid 1) → Zygote → System Server → Launcher
                                                          ├── Activity Manager
                                                          ├── Window Manager
                                                          ├── Package Manager
                                                          ├── Power Manager
                                                          └── ... 80+ services
```

## Binder IPC 機制

| 特性 Feature | 說明 |
|------|------|
| **核心驅動** | `/dev/binder` — Linux kernel 內的自訂驅動 |
| **傳輸方式** | 零複製 (zero-copy) 共享記憶體，比 socket/pipe 高效 |
| **安全模型** | 每個 Binder 交易攜帶 UID/PID，無法偽造 |
| **AIDL** | Android Interface Definition Language — 定義 Binder 介面 |
| **Context Manager** | `servicemanager` — Binder 服務的 DNS 式註冊表 |

```java
// AIDL 範例 — IMyService.aidl
interface IMyService {
    int add(int a, int b);
    String getDeviceId();
}
```

## Zygote 與 App 啟動

| 步驟 | 說明 |
|------|------|
| 1 | Zygote 行程在開機時由 init fork，預載所有 framework classes 與資源 |
| 2 | 當啟動新 App，Zygote fork 自身（copy-on-write），省去重複載入 |
| 3 | fork 出的新行程透過 Binder 與 System Server 通訊 |
| 4 | ActivityManagerService 管理 App 生命週期 |

## SELinux 安全強化

| 概念 | 說明 |
|------|------|
| **Enforcing Mode** | Android 預設強制模式，拒絕所有未明確允許的操作 |
| **Domain** | 每個行程分配 SELinux domain (e.g., `untrusted_app`, `system_server`) |
| **sepolicy** | 定義允許的規則，位於 `/system/etc/selinux/` |
| **Neverallow** | AOSP 禁止 OEM 放寬特定規則 |
