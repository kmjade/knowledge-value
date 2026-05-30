---
aliases: [Java Knowledge Base, Java 知識庫導航, Java MOC]
tags: [DDC/004.432, java, programming, MOC, navigation]
created: 2026-05-30
updated: 2026-05-30
type: moc
topic: java
version: "1.0"
---

# Java 知識庫導航 — Java Knowledge Base MOC

> Java: Write Once, Run Anywhere — 從企業後端到 Android 到巨量資料，Java 生態 30 年不倒。
> **DDC 004.432** · **最新 LTS: Java 21** (2023-09) · **下一 LTS: Java 25** (2025-09)

---

## Java 版本時間線 Version Timeline

| 版本 | 代號 | 發布日 | LTS | 關鍵特性 |
|:---:|------|:-----:|:---:|---------|
| **Java 8** | (無) | 2014-03 | ✅ | Lambda, Stream API, Optional, 新日期 API, Default Method |
| **Java 9** | (無) | 2017-09 | ❌ | Module System (Jigsaw), JShell, 集合工廠方法 |
| **Java 10** | (無) | 2018-03 | ❌ | var 局部變量類型推斷 |
| **Java 11** | (無) | 2018-09 | ✅ | HttpClient 標準化, 字串新方法, ZGC (實驗) |
| **Java 14** | (無) | 2020-03 | ❌ | Record (預覽), Pattern Matching instanceof, Text Blocks |
| **Java 17** | (無) | 2021-09 | ✅ | Record 正式, Sealed Class, Pattern Matching (預覽), 增強 PRNG |
| **Java 21** | (無) | 2023-09 | ✅ | Virtual Threads, Record Patterns, Pattern Matching for switch, Sequenced Collections |
| **Java 25** | (無) | 2025-09 | ✅ | (預計) Value Types, 更多 Pattern Matching 擴展 |

---

## JVM / JDK / JRE 關係圖

```
┌─────────────────────────────────────────────────┐
│                    JDK (Java Development Kit)    │
│  ┌───────────────────────────────────────────┐   │
│  │          JRE (Java Runtime Environment)    │   │
│  │  ┌─────────────────────────────────────┐  │   │
│  │  │            JVM (Java Virtual Machine)│  │   │
│  │  │  ┌───────────┐  ┌───────────────┐   │  │   │
│  │  │  │ Class     │  │  Execution    │   │  │   │
│  │  │  │ Loader    │  │  Engine       │   │  │   │
│  │  │  │           │  │  (Interpreter │   │  │   │
│  │  │  │           │  │   + JIT)      │   │  │   │
│  │  │  └───────────┘  └───────────────┘   │  │   │
│  │  │  ┌───────────┐  ┌───────────────┐   │  │   │
│  │  │  │ GC        │  │  Runtime      │   │  │   │
│  │  │  │ (Garbage  │  │  Data Areas   │   │  │   │
│  │  │  │ Collector)│  │  (Heap/Stack) │   │  │   │
│  │  │  └───────────┘  └───────────────┘   │  │   │
│  │  └─────────────────────────────────────┘  │   │
│  │  ┌─────────────────────────────────────┐  │   │
│  │  │  Core Libraries (rt.jar / modules)  │  │   │
│  │  │  java.lang, java.util, java.io ...  │  │   │
│  │  └─────────────────────────────────────┘  │   │
│  └───────────────────────────────────────────┘   │
│  ┌───────────────────────────────────────────┐   │
│  │  Dev Tools: javac, java, jar, javadoc,   │   │
│  │  jshell, jlink, jpackage, javap ...      │   │
│  └───────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

| 元件 | 全稱 | 功能 |
|------|------|------|
| **JVM** | Java Virtual Machine | 執行 bytecode，提供 GC、JIT、記憶體管理 |
| **JRE** | Java Runtime Environment | JVM + 核心類庫，用於執行 Java 應用 |
| **JDK** | Java Development Kit | JRE + 開發工具 (javac, jar 等)，用於開發 |

---

## 章節導航 Chapter Navigation

| # | 章節 | 文件 | 難度 | 關鍵字 |
|:-:|------|------|:--:|-------|
| 1 | 基礎入門 | [[01-Java-基础入门]] | 🟢 | JVM, 語法, 資料型別, IDE |
| 2 | 物件導向程式設計 | [[02-面向对象编程]] | 🟢🟡 | OOP, 繼承, 多型, Record |
| 3 | 高級特性 | [[03-高级特性]] | 🟡 | 泛型, 註解, 反射, Lambda, Stream |
| 4 | 集合框架 | [[04-集合框架]] | 🟡 | List, Set, Map, HashMap 原理, 並行集合 |
| 5 | 並發程式設計 | [[05-并发编程]] | 🔴 | Thread, Lock, 執行緒池, Virtual Thread |
| 6 | JVM 與效能 | [[06-JVM与性能]] | 🔴 | 記憶體模型, GC, JIT, 調優 |
| 7 | IO 與網路 | [[07-IO与网络]] | 🟡 | BIO/NIO/AIO, Netty, 序列化 |
| 8 | 工程化實踐 | [[08-工程化实践]] | 🟡 | Maven/Gradle, Spring Boot, 測試 |
| 9 | 設計模式實戰 | [[09-设计模式实战]] | 🟡🔴 | Singleton, Factory, Strategy, Spring patterns |
| 10 | 資源收集 | [[99-資源收集/FAQ]] [[99-資源收集/資源總覽]] | 🟢 | FAQ, 工具, 書籍, 社群 |

---

## 學習路徑建議 Learning Path

```
🟢 初學者 (0-3 月):
   Ch1 基礎入門 → Ch2 物件導向 → Ch8 工程化 (Maven) → Ch4 集合框架

🟡 中級開發者 (3-12 月):
   Ch3 高級特性 → Ch7 IO與網路 → Ch8 工程化 (Spring Boot) → Ch9 設計模式

🔴 高級工程師 (12+ 月):
   Ch5 並發程式設計 → Ch6 JVM與效能 → 深入原始碼
```

---

## 常用 JDK 發行版 Distributions

| 發行版 | 維護方 | 特點 | 授權 |
|--------|--------|------|------|
| **Oracle JDK** | Oracle | 官方版本，商業需授權 | OTN (Java 17+ 免費) |
| **OpenJDK** | Oracle/社群 | 開源參考實現 | GPLv2+CE |
| **Adoptium (Eclipse Temurin)** | Eclipse 基金會 | 社群維護，最受歡迎的開源建置 | Open |
| **Amazon Corretto** | AWS | 免費，長期支援，效能優化 | GPLv2+CE |
| **Azul Zulu** | Azul | 嵌入式支援好，多平台 | Open |
| **GraalVM** | Oracle | 高效能多語言 VM，支援 Native Image | Community/Enterprise |
| **Microsoft Build of OpenJDK** | Microsoft | Azure 優化 | Open |

---

## 關鍵標準與規範 JSR / JEP

| 編號 | 名稱 | 說明 |
|------|------|------|
| **JSR 335** | Lambda Expressions | Java 8 Lambda/Stream |
| **JSR 376** | Java Platform Module System | Java 9 模組化 |
| **JEP 395** | Records | Java 14/16 Record 類別 |
| **JEP 409** | Sealed Classes | Java 17 密封類 |
| **JEP 444** | Virtual Threads | Java 21 虛擬執行緒 |
| **JEP 441** | Pattern Matching for switch | Java 21 模式匹配 |
