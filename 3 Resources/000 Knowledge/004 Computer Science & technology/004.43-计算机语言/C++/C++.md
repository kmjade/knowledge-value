---
aliases: [C++ Knowledge Base Navigation, C++ 知識庫導航]
tags: [DDC/004.432, c++, programming, navigation]
created: 2026-05-30
updated: 2026-05-30
---

# C++ 知識庫導航 (C++ Knowledge Base Navigation)

> 🎯 涵蓋 C++11 → C++23 演進全貌，從基礎語法到高效能系統程式設計的完整知識體系。

---

## 📅 C++ 標準演進時間線 (C++ Evolution Timeline)

| 標準 | 年份 | 關鍵特性 | 編譯器支援 |
|:---:|:---:|------|:---:|
| **C++98** | 1998 | 第一個 ISO 標準，STL, 模板, 異常 | GCC 2.95+, MSVC 6+ |
| **C++03** | 2003 | Bug 修復，極小更新 | GCC 3.3+, MSVC 7.1+ |
| **C++11** | 2011 | auto, lambda, move semantics, smart pointers, constexpr, threading | GCC 4.8+, Clang 3.3+, MSVC 2015+ |
| **C++14** | 2014 | generic lambda, `decltype(auto)`, relaxed constexpr | GCC 5+, Clang 3.4+, MSVC 2017+ |
| **C++17** | 2017 | `if constexpr`, structured bindings, `std::optional/variant`, CTAD, fold expressions | GCC 7+, Clang 5+, MSVC 2017+ |
| **C++20** | 2020 | Concepts, Ranges, Coroutines, Modules, `std::span`, `<format>`, `<=>` | GCC 10+, Clang 10+, MSVC 2019+ |
| **C++23** | 2023 | `std::expected`, `std::mdspan`, deducing `this`, `if consteval`, `import std` | GCC 13+, Clang 16+, MSVC 2022+ |

---

## 🗺️ 章節導航 (Chapter Navigation)

| 章節 | 標題 | 主題 | 難度 |
|:---:|------|------|:---:|
| 01 | [[01-C++-基础入门]] | 語言演進、編譯過程、基本型別、const/constexpr、auto/decltype、namespace、引用 vs 指標 | 🟢 入門 |
| 02 | [[02-面向对象编程]] | class、繼承/多型、虛擬函數/vtable、Rule of Five、RAII、運算子重載 | 🟡 進階 |
| 03 | [[03-模板与泛型]] | 函數/類別模板、特化/偏特化、SFINAE、Concept (C++20)、variadic templates、fold expression、CTAD | 🔴 高階 |
| 04 | [[04-STL深度]] | containers、iterator categories、`<algorithm>`、allocator、`string_view`、`span` (C++20) | 🟡 進階 |
| 05 | [[05-内存管理]] | stack vs heap、new/delete、smart pointers、memory pools、Valgrind/ASan | 🟡 進階 |
| 06 | [[06-并发编程]] | `std::thread`/mutex/condition_variable、`std::atomic`、future/promise、thread pool、lock-free、coroutine (C++20) | 🔴 高階 |
| 07 | [[07-现代C++特性]] | move semantics/perfect forwarding、Lambda、constexpr/consteval、Ranges (C++20)、Modules (C++20)、`std::optional/variant/expected` | 🟡 進階 |
| 08 | [[08-工程化实践]] | CMake、vcpkg/Conan、GoogleTest/Catch2、clang-tidy/cppcheck、ASan/TSan/UBSan | 🟡 進階 |
| 09 | [[09-性能优化]] | compiler flags (-O2/-O3/LTO/PGO)、cache-friendly、inlining、Benchmark | 🔴 高階 |
| 99 | [[3 Resources/000 Knowledge/004 Computer Science & technology/004.43-计算机语言/C++/99-資源收集/FAQ]] | 常見問題與解決方案 | 🟢 |
| 99 | [[3 Resources/000 Knowledge/004 Computer Science & technology/004.43-计算机语言/C++/99-資源收集/資源總覽]] | 書籍、網站、工具、社群資源總覽 | 🟢 |

---

## 🔄 C++ 編譯過程 (Compilation Pipeline)

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Preprocessor │───▶│  Compiler  │───▶│ Assembler  │───▶│  Linker    │
│  (.cpp → .i)  │    │ (.i → .s)  │    │ (.s → .o)  │    │ (.o → exe) │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
   g++ -E          g++ -S          g++ -c           g++ *.o
   巨集展開         語法分析         組譯             連結/重定位
   標頭檔包含        語意分析         機器碼           符號解析
   條件編譯          中間碼           目標檔           函式庫合併
```

### 常用編譯選項一覽

| 選項 | 用途 | 範例 |
|------|------|------|
| `-E` | 僅預處理 | `g++ -E foo.cpp -o foo.i` |
| `-S` | 生成組合語言 | `g++ -S foo.cpp -o foo.s` |
| `-c` | 編譯不連結 | `g++ -c foo.cpp -o foo.o` |
| `-o` | 指定輸出檔 | `g++ foo.cpp -o foo` |
| `-std=c++20` | 指定標準 | `g++ -std=c++20 foo.cpp` |
| `-g` | 除錯資訊 | `g++ -g foo.cpp` |
| `-O2/-O3` | 優化等級 | `g++ -O3 foo.cpp` |
| `-Wall -Wextra` | 啟用警告 | `g++ -Wall -Wextra foo.cpp` |
| `-I<path>` | include 路徑 | `g++ -I./include foo.cpp` |
| `-L<path>` | library 路徑 | `g++ -L./lib -lfoo foo.cpp` |

---

## 🎯 學習路徑建議

### 🟢 初學者 (0–6 個月)
1. [[01-C++-基础入门]] — 語法基礎、編譯流程
2. [[02-面向对象编程]] — OOP 核心概念
3. [[04-STL深度]] — 常用容器與演算法
4. [[05-内存管理]] — 智慧指標基礎

### 🟡 中階開發者 (6–18 個月)
1. [[03-模板与泛型]] — 泛型程式設計
2. [[07-现代C++特性]] — Move semantics、Lambda、Ranges
3. [[08-工程化实践]] — CMake、測試、靜態分析
4. [[09-性能优化]] — 效能分析與優化

### 🔴 高階工程師 (18+ 個月)
1. [[06-并发编程]] — 多執行緒、Lock-free、Coroutine
2. 模板元程式設計 (TMP) 深度
3. C++ Standard Library 實作原理
4. 大型專案架構設計

---

## 📊 知識庫統計

| 指標 | 數值 |
|------|:---:|
| 章節數 | 9 + 2 資源 |
| 涵蓋標準 | C++98 → C++23 |
| 代碼範例 | 150+ |
| 語言 | 繁體中文 + English |
