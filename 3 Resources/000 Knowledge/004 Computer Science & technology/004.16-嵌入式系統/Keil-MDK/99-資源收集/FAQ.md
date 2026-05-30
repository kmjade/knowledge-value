---
aliases: [Keil FAQ, MDK FAQ]
tags: [DDC/004.16, keil, faq]
---

# Keil MDK 常見問題 FAQ

## Q1: MDK-Community 免費版有什麼限制？
**A:** 僅限非商業用途（non-commercial）。支援 Cortex-M0/M0+/M3/M4/M7/M23/M33，無代碼大小限制，但不可用於商業產品。完整功能表請見 [[Keil-MDK/01-MDK-概述与安装|01 概述與安裝]]。

## Q2: armcc v5 和 armclang v6 該選哪個？
**A:** **新專案選 armclang v6**。armcc v5 已凍結 (legacy)，armclang v6 基於 LLVM 擁有更好的診斷訊息、LTO 連結時優化、C11/C17 支援。見 [[Keil-MDK/03-ARM-Compiler-编译器|03 ARM Compiler]]。

## Q3: "No ULINK/ME device found" 如何解決？
**A:** 檢查：(1) ULINK USB 驅動是否安裝 (Keil_v5/ARM/ULINK/Driver/)；(2) 目標板供電正常；(3) SWD 連線正確 (SWDIO + SWCLK + GND)；(4) Debug Settings → SWD 模式而非 JTAG。

## Q4: 如何在 MDK 中使用 ST-Link？
**A:** MDK 內建 ST-Link 調試驅動。Settings → Debug → 選擇 "ST-Link Debugger" → Settings → SWD 模式。見 [[Keil-MDK/05-调试与ULINK|05 調試與 ULINK]]。

## Q5: "Undefined symbol __main" 錯誤？
**A:** 缺少 startup 文件。確保 RTE 中勾選 `Device/Startup`，或手動添加 `startup_stm32f4xx.s`。

## Q6: Watch window 中的變數顯示 "not in scope"?
**A:** 優化等級太高導致變數被移除。調試階段將 Optimization 設為 `-O0` (`Options → C/C++ → Optimization → Level 0`)。

## Q7: HardFault_Handler 如何調試？
**A:** (1) `Call Stack + Locals` 視窗查看堆疊回溯；(2) 在 HardFault_Handler 設斷點 → 分析 stacked R0-R3/R12/LR/PC/xPSR；(3) 勾選 `Options → Debug → Trace → Exception Trace`。

## Q8: CMSIS-RTOS2 vs 原生 RTX5 API 選哪個？
**A:** **選 CMSIS-RTOS2 API** (`cmsis_os2.h`)。它提供跨 RTOS 可移植性——同一組 API 可在 RTX5 / FreeRTOS / Zephyr 上執行。見 [[Keil-MDK/04-CMSIS-标准接口|04 CMSIS]]。

## Q9: 如何生成 hex / bin 檔案？
**A:** `Options → Output → 勾選 "Create HEX File"`。bin 檔案透過 fromelf 命令生成：`fromelf --bin --output out.bin project.axf`。

## Q10: Scatter-loading 中 +RW +ZI 是什麼？
**A:** `+RW` = Read-Write 已初始化資料（.data），`+ZI` = Zero-Initialized（.bss 未初始化）。這些 section 需要放在 RAM 中。見 [[Keil-MDK/03-ARM-Compiler-编译器|03 ARM Compiler]]。

## Q11: 如何在 MDK 中導入 CubeMX 生成的專案？
**A:** CubeMX → Project Manager → Toolchain/IDE → MDK-ARM v5 → Generate Code。然後在 μVision 中直接打開 `.uvprojx`。

## Q12: "Error: L6050U: The code size of this image exceeds..."?
**A:** Flash 溢出。檢查：(1) Optimization 設為 `-Os`；(2) 移除未使用函數：`Options → C/C++ → Misc → -ffunction-sections -fdata-sections` + Linker → `--gc-sections`。
