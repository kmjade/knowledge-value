---
aliases: [JVM & Performance, JVM 與效能調優, Java Virtual Machine Tuning]
tags: [DDC/004.432, java, jvm, performance, gc]
created: 2026-05-30
updated: 2026-05-30
---

# 06 — JVM 與效能調優 JVM & Performance Tuning

> 深入 JVM 記憶體模型、垃圾回收演算法、調優工具與實戰技巧，攻克 Java 效能瓶頸。

---

## 6.1 JVM 記憶體模型 Memory Model

### 執行時資料區 Runtime Data Areas

| 區域 | 執行緒共享 | 內容 | 常見異常 |
|------|:----------:|------|---------|
| **Heap 堆** | ✅ 共享 | 物件實例、陣列 | `OutOfMemoryError: Java heap space` |
| **Method Area / Metaspace** | ✅ 共享 | Class 元數據、靜態變數、常數池 (Java 8+ Metaspace 替代 PermGen) | `OutOfMemoryError: Metaspace` |
| **Stack 棧** | ❌ 私有 | 區域變數表、運算元棧、幀數據 | `StackOverflowError` |
| **Program Counter** | ❌ 私有 | 當前執行 bytecode 行號 | — |
| **Native Stack** | ❌ 私有 | Native 方法棧 | — |

### Heap 結構

```
Young Generation (新生代)          Old Generation (老年代)
┌──────────┬──────┬──────┐         ┌───────────────────┐
│ Eden     │ S0   │ S1   │  →→→    │   Tenured         │
│ (8/10)   │(1/10)│(1/10)│ 晉升    │   (Old Gen)       │
└──────────┴──────┴──────┘         └───────────────────┘
```

```java
// 查看默認記憶體參數
// java -XX:+PrintFlagsFinal -version | grep -i heapsize
// java -XX:+PrintGCDetails -Xlog:gc* MyApp
```

### 物件生命週期

```java
// 1. 新物件分配在 Eden
Object obj = new Object();  // Eden

// 2. Minor GC → 存活物件移到 Survivor (S0/S1 交替)
// 3. 每次 Minor GC 存活 → age+1
// 4. age 達到閾值 (預設 15) → 晉升到 Old Gen
// 5. Major GC / Full GC → 清理 Old Gen

// 大物件直接進入 Old Gen
// -XX:PretenureSizeThreshold=1M
byte[] big = new byte[2 * 1024 * 1024];  // > 1M → 直接 Old Gen
```

---

## 6.2 GC 演算法與收集器 GC Algorithms & Collectors

### GC 演算法總覽

| 演算法 | 原理 | 優點 | 缺點 |
|--------|------|------|------|
| **Mark-Sweep** | 標記→清除 | 基礎簡單 | 記憶體碎片 |
| **Mark-Compact** | 標記→整理→緊湊 | 無碎片 | 移動成本高 |
| **Copying** | Eden→Survivor 複製 | 速度快 (新生代) | 浪費空間 |
| **G1** | Region-based，優先回收垃圾最多的 Region | 可控停頓 | 吞吐量略低 |
| **ZGC** | 染色指標 + 讀屏障，亞毫秒停頓 | 超低延遲 | Java 15+ 正式 |

### 經典 GC 收集器

```bash
# Serial (單線程) — 適合小型應用
-XX:+UseSerialGC

# Parallel (吞吐量優先，Java 8 預設)
-XX:+UseParallelGC

# CMS (低延遲，已廢棄 Java 14+)
-XX:+UseConcMarkSweepGC

# G1 (平衡吞吐與延遲，Java 9+ 預設)
-XX:+UseG1GC

# ZGC (亞毫秒停頓，Java 21 LTS 推薦)
-XX:+UseZGC
```

### G1 GC 核心概念

```java
// G1 將 Heap 劃分為多個 Region (預設 2048 個)
// -XX:G1HeapRegionSize=2M
// 每個 Region 可動態充當 Eden / Survivor / Old / Humongous

// Mixed GC: 同時回收 Young + 部分 Old Region
// G1 透過 Remembered Set (RSet) 追蹤跨 Region 引用
```

```bash
# G1 調優參數
-XX:MaxGCPauseMillis=200    # 目標停頓時間 (ms)
-XX:G1NewSizePercent=5      # 新生代最小佔比
-XX:G1MaxNewSizePercent=60  # 新生代最大佔比
-XX:InitiatingHeapOccupancyPercent=45  # 觸發 Mixed GC 門檻
```

### ZGC 核心概念

```java
// ZGC 使用染色指標 (Colored Pointers) + 讀屏障 (Load Barrier)
// 停頓時間 < 1ms，與堆大小無關 (支援 TB 級)
// Java 21: 支援分代 ZGC (Generational ZGC)
```

```bash
# ZGC 啟用分代模式 (Java 21+ 預設)
-XX:+UseZGC -XX:+ZGenerational
```

---

## 6.3 GC 日誌與分析工具

### GC 日誌配置 (Java 9+)

```bash
# 統一日誌框架
-Xlog:gc*=info:file=gc.log:time,level,tags

# 實例
java -Xlog:gc*=info:file=gc.log:time,level,tags -jar app.jar

# GC 日誌關鍵資訊
# [gc,start] GC(0) Pause Young (Normal) (G1 Evacuation Pause)
# [gc,heap] GC(0) Eden regions: 52->0(52)
# [gc,heap] GC(0) Survivor regions: 0->7(7)
# [gc,heap] GC(0) Old regions: 0->3
# [gc] GC(0) Pause Young (Normal) (G1 Evacuation Pause) 24M->12M(128M) 3.452ms
```

### jstat — 實時 GC 監控

```bash
jstat -gcutil <pid> 1000   # 每秒輸出一次

# 輸出欄位:
# S0 S1 E O M CCS YGC YGCT FGC FGCT GCT
# Survivor/Eden/Old/Metaspace 使用率 + GC 次數與耗時
```

### 記憶體分析實戰

```bash
# 擷取 Heap Dump
jmap -dump:live,format=b,file=heap.hprof <pid>

# 或用 JVM 參數自動生成
-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/heap.hprof

# 分析工具
# - Eclipse MAT: 支配樹、洩漏嫌疑報告
# - JProfiler / YourKit: 即時分析
# - jcmd <pid> GC.heap_dump heap.hprof
```

### Arthas — 阿里巴巴開源診斷工具

```bash
curl -O https://arthas.aliyun.com/arthas-boot.jar
java -jar arthas-boot.jar

# 常用命令
dashboard          # 即時儀表板
thread -b          # 檢測死鎖
thread -n 3        # 最忙的 3 個執行緒
jad com.example.MyClass  # 線上反編譯
watch com.example.Service doService '{params,returnObj,throwExp}' -x 3
trace com.example.Service doService  # 方法調用追蹤
```

---

## 6.4 JIT 編譯與最佳化

### JIT 編譯模式

| 模式 | 說明 | 場景 |
|------|------|------|
| **C1 (Client)** | 快速啟動，輕量優化 | 桌面應用、短週期任務 |
| **C2 (Server)** | 深度優化，啟動較慢 | 長期運行的服務端應用 |
| **分層編譯 (Tiered)** | 先用 C1 快速編譯，熱點再用 C2 深度優化 (Java 8+ 預設) | 通用推薦 |

```bash
# 編譯器參數
-XX:+TieredCompilation       # 啟用分層編譯 (預設)
-XX:-TieredCompilation       # 禁用
-XX:TieredStopAtLevel=1      # 只用 C1 (啟動快)
-XX:+PrintCompilation        # 輸出編譯日誌
```

### 常見 JIT 優化

```java
// 1. 方法內聯 (Method Inlining)
//    將頻繁調用的小方法內嵌到調用處，減少方法調用開銷
//    -XX:MaxInlineSize=35

// 2. 逃逸分析 (Escape Analysis) — Java 8+ 預設開啟
public String escapeExample() {
    StringBuilder sb = new StringBuilder();  // 未逃逸 → 棧上分配
    sb.append("hello");
    return sb.toString();
}
//    -XX:+DoEscapeAnalysis (預設)

// 3. 鎖消除 (Lock Elision)
public String lockElision() {
    StringBuffer sb = new StringBuffer();  // 局部變數 → 同步可消除
    sb.append("hello");
    return sb.toString();
}

// 4. 標量替換 (Scalar Replacement)
//    將物件的欄位拆解為基本型別變數，分配在棧上
//    -XX:+EliminateAllocations
```

---

## 6.5 JVM 記憶體調優實戰

### 堆大小配置

```bash
# 基本參數
-Xms2g            # 初始堆大小
-Xmx4g            # 最大堆大小 (建議 Xms = Xmx，避免動態擴容)
-Xmn1g            # 新生代大小 (僅 Parallel/Serial)
-XX:NewRatio=2    # Old/Young = 2:1 (G1 無效)
-XX:SurvivorRatio=8  # Eden/Survivor = 8:1

# Metaspace
-XX:MetaspaceSize=256m      # 初始 Metaspace
-XX:MaxMetaspaceSize=512m   # 最大 Metaspace

# Direct Memory
-XX:MaxDirectMemorySize=512m
```

### 常見調優場景

```bash
# 場景 1: 高吞吐量 (批次處理)
-XX:+UseParallelGC
-XX:ParallelGCThreads=4
-Xms4g -Xmx4g

# 場景 2: 低延遲 (Web API)
-XX:+UseG1GC
-XX:MaxGCPauseMillis=100

# 場景 3: 極低延遲 (交易系統)
-XX:+UseZGC
-XX:+ZGenerational

# 場景 4: 容器化部署 (Docker/K8s)
-XX:+UseContainerSupport        # Java 10+
-XX:MaxRAMPercentage=75.0       # 佔容器記憶體 75%
-XX:InitialRAMPercentage=50.0
```

### OOM 案例分析

```java
// 1. Heap OOM — 最常見
// java -Xmx64m → 大量物件造成
// 解法: 加大堆、排查記憶體洩漏

// 2. Metaspace OOM
// 動態生成大量 Class (CGLIB/反射)
// 解法: -XX:MaxMetaspaceSize=256m

// 3. Direct Memory OOM
 ByteBuffer.allocateDirect(1024 * 1024 * 1024);
// 解法: -XX:MaxDirectMemorySize=512m

// 4. 執行緒過多
// 每個執行緒預設佔用 ~1MB stack (Linux)
// 5000 threads × 1MB = 5GB 虛擬記憶體
// 解法: 控制執行緒數 / 使用 Virtual Threads
```

---

## 6.6 JMH 微基準測試

```java
import org.openjdk.jmh.annotations.*;

@BenchmarkMode(Mode.Throughput)
@OutputTimeUnit(TimeUnit.MILLISECONDS)
@State(Scope.Thread)
@Warmup(iterations = 3, time = 1)
@Measurement(iterations = 5, time = 1)
@Fork(1)
public class StringBuildBenchmark {

    @Benchmark
    public String stringAdd() {
        String s = "";
        for (int i = 0; i < 100; i++) {
            s += i;
        }
        return s;
    }

    @Benchmark
    public String stringBuilder() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 100; i++) {
            sb.append(i);
        }
        return sb.toString();
    }
}

// 執行: java -jar benchmarks.jar
// 注意: JMH 會處理 JIT 預熱、死碼消除等陷阱
```

---

## 總結 Summary

| 層面 | 關鍵點 |
|------|--------|
| 記憶體 | Heap 分代 (Young/Old)、Metaspace、棧私有 |
| GC | Parallel (吞吐) → G1 (平衡) → ZGC (亞毫秒) |
| JIT | C1/C2 + 分層編譯、逃逸分析、內聯 |
| 工具 | jstat/jmap/jstack/Arthas/MAT |
| 調優 | 先測量再調優，JMH 基準測試，GC 日誌是關鍵 |
