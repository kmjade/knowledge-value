---
aliases: [Android FAQ, Android 常见问题, Android Troubleshooting]
tags: [DDC/004.451, android, faq, troubleshooting]
created: 2026-05-30
---

# Android 常見問題 FAQ

> 收錄 Android 開發與使用中最常見的問題與快速解答。
> Frequently asked questions and quick answers for Android development and usage.

## 開發環境 Dev Environment

**Q: Android Studio 啟動慢或卡頓？**
```bash
# 增加 IDE VM heap
# Help → Edit Custom VM Options
-Xms2048m
-Xmx8192m
# 關閉不需要的 plugin，使用 SSD
```

**Q: Gradle sync 失敗？**
```bash
# 清理 Gradle 快取
rm -rf ~/.gradle/caches/
# Invalidate Caches (Android Studio → File → Invalidate Caches)
# 檢查 proxy 設定
```

**Q: Emulator 無法啟動？**
```bash
# 檢查 KVM/HAXM 是否安裝 (Linux/Win)
# Windows: 啟用 Hyper-V / Windows Hypervisor Platform
# 確認 BIOS 中虛擬化已開啟
emulator -avd Pixel_6_API_35 -verbose  # 查看詳細錯誤
```

## 構建與編譯 Build

**Q: `INSTALL_FAILED_UPDATE_INCOMPATIBLE`？**
```bash
adb uninstall com.example.package       # 先移除舊版
# 或
adb install -r app.apk                  # -r = replace
```

**Q: 超過 64K 方法數 (Multidex)？**
```kotlin
// build.gradle.kts
android {
    defaultConfig {
        multiDexEnabled = true
    }
}
dependencies { implementation("androidx.multidex:multidex:2.0.1") }
```

**Q: AAB 轉 APK 本地測試？**
```bash
# 使用 bundletool
bundletool build-apks --bundle=app.aab --output=app.apks
bundletool install-apks --apks=app.apks
```

## 權限與安全 Permissions

**Q: 權限請求被自動拒絕？**
- Android 11+ 若用戶拒絕兩次，系統標記為 "不再詢問"
- 引導用戶到 Settings → Apps → 你的 App → Permissions

**Q: `CLEARTEXT` 錯誤 (HTTP blocked)？**
```xml
<!-- Android 9+ 預設禁止明文 HTTP -->
<application android:usesCleartextTraffic="true">
<!-- 或使用 network_security_config.xml 僅允許特定域名 -->
```

## 效能 Performance

**Q: App 啟動慢 (Cold Start)？**
```bash
# 測量啟動時間
adb shell am start -W com.example.app/.MainActivity
# TotalTime < 500ms 為良好
# 檢查 Application.onCreate() 是否有過多初始化
# 使用 App Startup library 延遲初始化
```

**Q: RecyclerView 捲動卡頓？**
- 確保 `onBindViewHolder` 中無耗時操作
- 使用 `DiffUtil` 而非 `notifyDataSetChanged()`
- 設定 `setHasFixedSize(true)` 當 item 大小固定
- 圖片使用 Coil/Glide 非同步載入

## ADB 常用指令 ADB Quick Commands

```bash
adb devices                          # 列出裝置
adb shell                            # 進入 shell
adb install app.apk                  # 安裝 APK
adb uninstall com.example.package    # 移除 App
adb logcat -s TAG:D                  # 過濾 log
adb shell dumpsys battery            # 電池資訊
adb shell dumpsys meminfo <pkg>      # 記憶體使用
adb shell screencap /sdcard/sc.png   # 截圖
adb pull /sdcard/sc.png             # 拉檔案
adb reboot bootloader                # 重啟至 fastboot
```
