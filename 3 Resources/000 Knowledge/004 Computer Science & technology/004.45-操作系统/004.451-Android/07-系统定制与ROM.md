---
aliases: [Android ROM, Android 系統定制, AOSP Build, Magisk]
tags: [DDC/004.451, android, rom, customization, aosp, magisk]
created: 2026-05-30
---

# 07 系統定制與 ROM System Customization & ROM

> 從 AOSP 源碼編譯到 Magisk/KernelSU 的 Root 方案，再到 Treble/Mainline 架構演進，掌握 Android 底層定制能力。
> From AOSP source compilation to Magisk/KernelSU root solutions, to Treble/Mainline architecture evolution, master Android low-level customization.

## AOSP 編譯流程 Build Process

| 步驟 | 指令 | 說明 |
|:---:|------|------|
| 1 | `repo init -u <manifest>` | 初始化 repo manifest |
| 2 | `repo sync -j$(nproc)` | 同步源碼 (50-100+ GB) |
| 3 | `source build/envsetup.sh` | 載入構建環境 |
| 4 | `lunch <target>` | 選擇構建目標 (e.g., `aosp_arm64-userdebug`) |
| 5 | `m -j$(nproc)` | 開始編譯 (1-4+ 小時) |
| 6 | `fastboot flashall` | 刷入裝置 |

```bash
# 環境需求 (Ubuntu / Debian)
sudo apt install git-core gnupg flex bison build-essential zip curl \
  zlib1g-dev libc6-dev-i386 libncurses5 lib32z1 x11proto-core-dev \
  libx11-dev lib32z-dev libgl1-mesa-dev libxml2-utils xsltproc
```

## 構建類型 Build Variants

| Variant | 說明 | ROOT | 調試 |
|------|------|:---:|:---:|
| **user** | 正式發布版，無 root，無 debug | ❌ | ❌ |
| **userdebug** | 類似 user 但可 adb root | ✅ | ✅ |
| **eng** | 工程版，全 debug | ✅ | ✅ |

## Root 方案對比 Root Solutions

| 方案 | 原理 | 優點 | 缺點 |
|------|------|------|------|
| **Magisk** | Systemless root，不修改 `/system` | SafetyNet 繞過、模組化 | Android 14+ 難度增加 |
| **KernelSU** | Kernel-based root (GKI) | 更難被偵測、不需修改 boot | 需要 GKI 核心支援 |
| **APatch** | Kernel patching | 類似 KernelSU + Magisk 模組相容 | 社群較小 |
| **SuperSU** | 傳統 `/system` root | 歷史方案 | 已淘汰 |
| **Xposed / LSPosed** | Hook framework | 模組生態豐富 | 僅 ART runtime，與 Magisk 配合 |

## Treble 與 Mainline

| 項目 | Android 版本 | 影響 |
|------|:---:|------|
| **Project Treble** | 8.0+ | Vendor 實現與 Framework 分離，GSI 通用系統映像 |
| **HIDL → AIDL HAL** | 11+ | HAL 從 HIDL 遷移到 Stable AIDL |
| **GKI (Generic Kernel Image)** | 12+ | 統一核心映像，OEM 模組化為 kernel modules |
| **Project Mainline** | 10+ | 透過 Play Store 更新系統模組 (e.g., Wi-Fi, Media) |

## GSI 刷入

```bash
# 下載 GSI (Generic System Image)
# https://developer.android.com/topic/generic-system-image/releases

# 檢查 Treble 相容性
adb shell getprop ro.treble.enabled    # 應返回 true

# 刷入 GSI
fastboot reboot fastboot               # 進入 fastbootd
fastboot flash system system.img
fastboot -w                             # 清除 userdata
fastboot reboot
```

## 自訂 ROM 生態 Custom ROM Ecosystem

| ROM | 基礎 | 特色 |
|------|------|------|
| **LineageOS** | AOSP | 最知名、支援最廣 |
| **Pixel Experience** | AOSP | Pixel 風格體驗 |
| **crDroid** | LineageOS | 高度可定制 |
| **GrapheneOS** | AOSP | 隱私安全強化 |
| **e/OS** | LineageOS | 去 Google 化 |
