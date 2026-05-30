---
aliases: [Java Basics, Java 基礎入門, Java Fundamentals]
tags: [DDC/004.432, java, programming, basics]
created: 2026-05-30
updated: 2026-05-30
---

# 01 — Java 基礎入門 Java Fundamentals

> 從零開始掌握 Java 核心語法、JVM 架構、開發環境搭建，為後續章節打下堅實基礎。

---

## 1.1 JVM / JDK / JRE 詳解

### 三者關係

```
Developer writes → .java 原始碼
    ↓ javac (JDK tool)
Compiler produces → .class bytecode
    ↓ java (JRE launcher)
JVM executes → Machine code (via Interpreter + JIT)
```

### JVM 內部架構

| 子系統 | 功能 | 關鍵元件 |
|--------|------|---------|
| **Class Loader** | 載入 .class 到記憶體 | Bootstrap, Extension, Application ClassLoader |
| **Runtime Data Areas** | 執行時資料區 | Heap, Stack, Method Area (Metaspace), PC Register, Native Stack |
| **Execution Engine** | 執行 bytecode | Interpreter, JIT Compiler (C1/C2), GC |

### 編譯與執行流程

```java
// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

```bash
# 編譯
javac HelloWorld.java        # → HelloWorld.class

# 執行
java HelloWorld              # JVM 啟動，載入 class，執行 main()

# 反編譯查看 bytecode
javap -c HelloWorld
```

---

## 1.2 Java 版本特性速覽 (8 → 21 LTS)

### Java 8 (LTS) — 里程碑版本

```java
// Lambda 表達式
List<String> list = Arrays.asList("a", "b", "c");
list.forEach(s -> System.out.println(s));

// Stream API
list.stream()
    .filter(s -> s.startsWith("a"))
    .map(String::toUpperCase)
    .collect(Collectors.toList());

// Optional
Optional<String> opt = Optional.ofNullable(null);
String result = opt.orElse("default");

// 新日期時間 API (java.time)
LocalDate today = LocalDate.now();
LocalDateTime now = LocalDateTime.now();
```

### Java 9 — 模組系統

```java
// module-info.java
module com.example.myapp {
    requires java.sql;
    exports com.example.myapp.api;
}
```

### Java 10 — var 局部變量類型推斷

```java
var list = new ArrayList<String>();  // 推斷為 ArrayList<String>
var map = Map.of("key", "value");    // 推斷為 Map<String, String>
// 僅限局部變量，不能用於欄位/方法參數/返回值
```

### Java 11 (LTS) — 新字串方法 + HttpClient

```java
// 字串新方法
" ".isBlank();              // true
"  hello  ".strip();        // "hello"
"line1\nline2".lines();     // Stream<String>

// HttpClient (標準化)
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com"))
    .build();
HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
```

### Java 14 — Record + Text Blocks + Pattern Matching

```java
// Record (預覽, Java 16 正式)
record Point(int x, int y) {}
Point p = new Point(3, 4);
System.out.println(p.x());  // accessor, 不可變

// Text Blocks
String json = """
    {
        "name": "Java",
        "version": 21
    }
    """;

// Pattern Matching instanceof
if (obj instanceof String s && s.length() > 5) {
    System.out.println(s.toUpperCase());
}
```

### Java 17 (LTS) — Sealed Class + 正式 Record

```java
// Sealed Class
sealed interface Shape permits Circle, Rectangle, Triangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}
final class Triangle implements Shape {}  // final 也是允許的
```

### Java 21 (LTS) — Virtual Threads + Record Patterns

```java
// Virtual Threads (Project Loom)
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> System.out.println("Virtual thread!"));
}

// Record Patterns
if (obj instanceof Point(int x, int y)) {
    System.out.println(x + ", " + y);
}

// Pattern Matching for switch
String desc = switch (obj) {
    case Point(int x, int y) when x == y -> "diagonal";
    case Point(var x, var y) -> "x=" + x + ", y=" + y;
    default -> "unknown";
};

// Sequenced Collections
SequencedCollection<String> seq = new ArrayList<>();
seq.addFirst("first");
seq.addLast("last");
seq.getFirst();
seq.reversed();
```

---

## 1.3 基礎語法 Basic Syntax

### 基本結構

```java
// 一個 .java 文件只能有一個 public class，且檔名必須與 class 名一致
package com.example.basics;  // 套件聲明（可選）

import java.util.List;       // 導入

public class BasicSyntax {
    // 欄位（成員變量）
    private String name;

    // 建構子
    public BasicSyntax(String name) {
        this.name = name;
    }

    // 方法
    public String greet(String prefix) {
        return prefix + " " + name;
    }

    // 程式入口
    public static void main(String[] args) {
        BasicSyntax bs = new BasicSyntax("World");
        System.out.println(bs.greet("Hello"));
    }
}
```

### 命名規範 Naming Conventions

| 類型 | 規範 | 範例 |
|------|------|------|
| 類別 Class | PascalCase (大駝峰) | `HelloWorld`, `StudentController` |
| 方法/變量 Method/Variable | camelCase (小駝峰) | `getName`, `studentList` |
| 常數 Constant | UPPER_SNAKE_CASE | `MAX_SIZE`, `DEFAULT_PORT` |
| 套件 Package | 小寫，反域名 | `com.example.myapp` |
| 枚舉 Enum | PascalCase | `DayOfWeek`, `Color` |

### 關鍵字 Keywords (部分)

| 類別 | 關鍵字 |
|------|-------|
| 存取控制 | `public`, `protected`, `private` (default 為 package-private) |
| 類別修飾 | `static`, `final`, `abstract`, `sealed` (Java 17+) |
| 流程控制 | `if`, `else`, `switch`, `for`, `while`, `do`, `break`, `continue`, `return` |
| 例外處理 | `try`, `catch`, `finally`, `throw`, `throws` |
| 其他 | `new`, `this`, `super`, `instanceof`, `record` |

---

## 1.4 資料型別 Data Types

### 基本型別 (Primitive Types) — 8 種

| 型別 | 大小 | 範圍 | 預設值 | 包裝類 |
|------|:---:|------|:------:|-------|
| `byte` | 8 bits | -128 ~ 127 | 0 | `Byte` |
| `short` | 16 bits | -32768 ~ 32767 | 0 | `Short` |
| `int` | 32 bits | -2³¹ ~ 2³¹-1 | 0 | `Integer` |
| `long` | 64 bits | -2⁶³ ~ 2⁶³-1 | 0L | `Long` |
| `float` | 32 bits | IEEE 754 單精度 | 0.0f | `Float` |
| `double` | 64 bits | IEEE 754 雙精度 | 0.0d | `Double` |
| `char` | 16 bits | '\u0000' ~ '\uffff' (Unicode) | '\u0000' | `Character` |
| `boolean` | JVM-dependent | `true` / `false` | `false` | `Boolean` |

### 自動裝箱/拆箱 (Autoboxing / Unboxing)

```java
Integer i = 42;        // 自動裝箱: int → Integer
int j = i;             // 自動拆箱: Integer → int

// 注意：快取池 (-128 ~ 127)
Integer a = 127;
Integer b = 127;
System.out.println(a == b);  // true (同一個物件)

Integer c = 128;
Integer d = 128;
System.out.println(c == d);  // false (超出快取範圍)
```

### 參考型別 (Reference Types)

| 型別 | 說明 | 範例 |
|------|------|------|
| `String` | 不可變字串 | `"hello"` |
| 陣列 Array | 固定長度容器 | `int[] arr = new int[5];` |
| 類別 Class | 自定義型別 | `new Person()` |
| 介面 Interface | 抽象契約 | `Runnable`, `Comparable` |
| 枚舉 Enum | 有限值集合 | `Season { SPRING, SUMMER, AUTUMN, WINTER }` |

---

## 1.5 運算子 Operators

| 類別 | 運算子 | 說明 |
|------|--------|------|
| 算術 | `+ - * / %` | 加減乘除餘 |
| 比較 | `== != > < >= <=` | 比較運算 |
| 邏輯 | `&& || !` | 邏輯 AND, OR, NOT |
| 位元 | `& | ^ ~ << >> >>>` | 位元運算 |
| 賦值 | `= += -= *= /=` | 賦值 |
| 三元 | `? :` | `x > 0 ? "正" : "非正"` |
| instanceof | `instanceof` | 型別檢查 (Java 16+ 支援 pattern) |

---

## 1.6 流程控制 Control Flow

### if-else / switch

```java
// if-else
if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else {
    grade = "C";
}

// Switch (傳統)
switch (day) {
    case MONDAY:    System.out.println("週一"); break;
    case FRIDAY:    System.out.println("週五"); break;
    default:        System.out.println("其他");
}

// Switch 表達式 (Java 14+)
String result = switch (day) {
    case MONDAY, FRIDAY -> "工作日首尾";
    case SATURDAY, SUNDAY -> "週末";
    default -> "普通工作日";
};

// Java 21: Pattern Matching for switch
String desc = switch (obj) {
    case Integer i when i > 0 -> "正整數: " + i;
    case String s -> "字串長度: " + s.length();
    case null -> "null";
    default -> "未知型別";
};
```

### 迴圈 Loops

```java
// for 迴圈
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}

// for-each (enhanced for)
int[] numbers = {1, 2, 3, 4, 5};
for (int n : numbers) {
    System.out.println(n);
}

// while
while (condition) {
    // ...
}

// do-while
do {
    // ... 至少執行一次
} while (condition);
```

---

## 1.7 陣列 Arrays

```java
// 宣告與初始化
int[] arr1 = new int[5];                    // 長度 5，預設值 0
int[] arr2 = {1, 2, 3, 4, 5};              // 直接初始化
int[] arr3 = new int[]{1, 2, 3};           // 匿名陣列

// 多維陣列
int[][] matrix = new int[3][4];
int[][] jagged = {{1, 2}, {3, 4, 5}};      // 不規則陣列

// 操作
System.out.println(arr2.length);            // 5
System.out.println(arr2[0]);                // 1
Arrays.sort(arr2);                          // 排序
int idx = Arrays.binarySearch(arr2, 3);     // 二分搜
int[] copy = Arrays.copyOf(arr2, 10);      // 複製/擴容

// 與 Stream 結合
int sum = Arrays.stream(arr2).sum();
int max = Arrays.stream(arr2).max().orElse(0);
```

### 陣列 vs List

| 特性 | Array | ArrayList |
|------|-------|-----------|
| 大小 | 固定 | 動態擴容 |
| 型別 | 可存基本型別/參考型別 | 只能存參考型別 |
| 效能 | 較快（無裝箱） | 裝箱開銷 |
| API | Arrays 工具類 | 豐富的 List 介面方法 |
| 泛型 | 不支援 | 支援 |

---

## 1.8 方法 Methods

### 定義與調用

```java
// 基本方法
public static int add(int a, int b) {
    return a + b;
}

// 可變參數 (varargs)
public static int sum(int... numbers) {
    return Arrays.stream(numbers).sum();
}
sum(1, 2, 3, 4, 5);  // 15

// 方法重載 (Overload) — 同方法名，不同參數
public static double add(double a, double b) {
    return a + b;
}
```

### 參數傳遞 — Pass by Value

```java
// Java 只有 Pass by Value
public static void modify(int x) {
    x = 100;  // 不影響外部
}

public static void modifyObject(StringBuilder sb) {
    sb.append(" modified");  // 修改物件內容，影響外部
}
// 注意：參考本身也是 pass by value，無法改變參考指向
```

### Recursion 遞迴

```java
public static int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// 尾遞迴（Java 無原生尾遞迴優化，但 Scala/Kotlin 有）
public static int factorialTail(int n, int acc) {
    if (n <= 1) return acc;
    return factorialTail(n - 1, n * acc);
}
```

---

## 1.9 開發環境 Development Environment

### IntelliJ IDEA 關鍵快捷鍵

| 快捷鍵 (Win/Linux) | 功能 |
|-------------------|------|
| `Alt + Enter` | Quick Fix / 意圖操作 |
| `Ctrl + Shift + F10` | 執行 |
| `Ctrl + Shift + F9` | 編譯 |
| `Ctrl + Alt + L` | 格式化代碼 |
| `Shift + F6` | 重構 → 重新命名 |
| `Ctrl + Alt + M` | 提取方法 |
| `Ctrl + Alt + V` | 提取變量 |
| `Ctrl + Shift + T` | 跳轉到測試 |
| `Ctrl + N` | 查找類別 |
| `Ctrl + Shift + N` | 查找文件 |
| `Double Shift` | Search Everywhere |
| `Ctrl + E` | 最近文件 |

### Eclipse 關鍵快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| `Ctrl + 1` | Quick Fix |
| `Ctrl + Shift + F` | 格式化 |
| `Ctrl + Shift + O` | 組織導入 |
| `Ctrl + Shift + R` | 打開資源 |
| `F3` | 跳轉定義 |
| `Ctrl + Alt + H` | 調用層次 |

### JDK 工具命令

| 命令 | 用途 |
|------|------|
| `javac` | 編譯 Java 原始碼 |
| `java` | 執行 Java 應用 |
| `jar` | 打包 JAR 檔案 |
| `javadoc` | 生成 API 文檔 |
| `javap` | 反編譯 class 文件 |
| `jps` | 列出 Java 進程 |
| `jstat` | JVM 統計監控 |
| `jmap` | 記憶體映射 |
| `jstack` | 執行緒堆疊 |
| `jcmd` | 診斷命令 |
| `jshell` | REPL (Java 9+) |

```bash
# jshell 使用範例
jshell> var list = List.of(1, 2, 3)
list ==> [1, 2, 3]

jshell> list.stream().map(x -> x * 2).toList()
$2 ==> [2, 4, 6]
```

---

## 1.10 第一個 Java 應用與 Maven 專案

```bash
# 使用 Maven Archetype 建立專案
mvn archetype:generate \
  -DgroupId=com.example \
  -DartifactId=my-first-app \
  -DarchetypeArtifactId=maven-archetype-quickstart \
  -DinteractiveMode=false

cd my-first-app

# 目錄結構
# my-first-app/
# ├── pom.xml
# └── src/
#     ├── main/java/com/example/App.java
#     └── test/java/com/example/AppTest.java

# 編譯與執行
mvn compile
mvn exec:java -Dexec.mainClass="com.example.App"
mvn test
mvn package          # 生成 target/my-first-app.jar
```

```xml
<!-- pom.xml 最小結構 -->
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>my-first-app</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
    </properties>
</project>
```

---

## 要點回顧 Key Takeaways

| # | 要點 |
|---|------|
| 1 | JDK = JRE + 開發工具；JRE = JVM + 核心類庫 |
| 2 | Java 8/11/17/21 為 LTS 版本，21 是目前最新 LTS |
| 3 | 8 種基本型別 + 參考型別；注意 Integer 快取池 (-128~127) |
| 4 | var (Java 10+) 僅限局部變量；Record (Java 16+) 是不可變資料載體 |
| 5 | Switch 表達式 (Java 14+) 和 Pattern Matching (Java 21+) 大幅簡化代碼 |
| 6 | Java 只有 Pass by Value，物件參考也是傳值 |
