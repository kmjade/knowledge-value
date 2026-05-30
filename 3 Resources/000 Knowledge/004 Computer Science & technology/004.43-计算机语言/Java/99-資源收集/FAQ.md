---
aliases: [Java FAQ, Java 常見問題, Java Interview Questions]
tags: [DDC/004.432, java, faq, interview]
created: 2026-05-30
updated: 2026-05-30
---

# Java 常見問題 FAQ

> 整理 Java 面試高頻問題、坑點與速查，每題附簡答與關鍵代碼。

---

## 基礎語法

### Q1: `==` vs `equals()`？
- `==` 比較**參考地址**（基本型別比較值）
- `equals()` 比較**物件內容**（需正確覆蓋）
- Integer 緩存池 -128~127 內 `==` 可能為 true（陷阱）

### Q2: `String` / `StringBuilder` / `StringBuffer` 差異？
| 類型 | 可變性 | 執行緒安全 | 效能 | 場景 |
|------|:------:|:----------:|------|------|
| String | 不可變 | — | — | 常數、Key |
| StringBuilder | 可變 | ❌ | 最快 | 單線程拼接 |
| StringBuffer | 可變 | ✅ synchronized | 較慢 | 多線程拼接 |

### Q3: `final` / `finally` / `finalize` 區別？
- `final`: 修飾類（不可繼承）/ 方法（不可覆蓋）/ 變數（不可修改）
- `finally`: try-catch 後必定執行的區塊
- `finalize()`: GC 前回調（**Java 9 廢棄，不建議使用**）

### Q4: Overload vs Override？
- **Overload（重載）**: 同方法名，不同參數列表（編譯期多型）
- **Override（覆蓋）**: 子類重新定義父類方法（運行期多型，需 `@Override`）

```java
class Parent {
    void foo(int x) {}     // overloaded in child
    void bar() {}          // overridden in child
}
class Child extends Parent {
    void foo(String s) {}  // Overload (不同參數型別)
    @Override
    void bar() {}          // Override (重新實現)
}
```

### Q5: `ArrayList` vs `LinkedList`？
| 特性 | ArrayList | LinkedList |
|------|-----------|------------|
| 底層 | Object[] 陣列 | 雙向鏈表 |
| 隨機訪問 | O(1) ✅ | O(n) ❌ |
| 頭部插入 | O(n) ❌ | O(1) ✅ |
| 尾部插入 | O(1) amortized | O(1) |
| 記憶體 | 緊湊（連續） | 較多（節點物件開銷） |

---

## 物件導向

### Q6: 抽象類 vs 介面？
| 特性 | Abstract Class | Interface |
|------|:-------------:|:---------:|
| 多重繼承 | ❌ 單一 | ✅ 多實現 |
| 建構子 | ✅ 有 | ❌ 無 |
| 欄位 | 任意 | 僅 `public static final` |
| 方法體 | 可混合 | Java 8+ default/static 可有 |
| 設計意圖 | "is-a" 共享實作 | "can-do" 定義契約 |

```java
// 現代選擇：優先 interface + default method
interface Flyable {
    void fly();
    default void land() { System.out.println("Landing..."); }
}
```

### Q7: `HashMap` 工作原理？
- 基於**陣列+鏈表+紅黑樹**（Java 8+ 鏈表長度 ≥8 轉紅黑樹）
- `hash(key) = (h = key.hashCode()) ^ (h >>> 16)` — 擾動函數
- 索引計算: `(n - 1) & hash`（n 為陣列長度，2 的冪）
- 預設容量 16，負載因子 0.75（觸發擴容 threshold）
- **執行緒不安全** → 並發用 `ConcurrentHashMap`

### Q8: 深拷貝 vs 淺拷貝？
```java
// 淺拷貝: 只複製物件本身，內部參考指向相同物件
User clone = user.clone();  // clone() 預設為淺拷貝

// 深拷貝方案
// 1. 序列化/反序列化
// 2. 手動遞迴 clone
// 3. 拷貝構造器: new User(original)
// 4. MapStruct / BeanUtils.copyProperties (淺拷貝！)
```

---

## 併發與 JVM

### Q9: `synchronized` 實現原理？
- 基於**物件頭 Mark Word** 中的 Monitor 鎖
- JVM 層面: `monitorenter` / `monitorexit` 指令
- 鎖升級路徑: 無鎖 → 偏向鎖 → 輕量級鎖（CAS）→ 重量級鎖（OS mutex）
- Java 15+ 偏向鎖已廢棄（維護成本高，收益低）

### Q10: `ThreadLocal` 原理與記憶體洩漏？
```java
// ThreadLocal 變數存在 Thread.threadLocals (ThreadLocalMap) 中
// Key 為弱引用，Value 為強引用
ThreadLocal<String> tl = new ThreadLocal<>();
tl.set("data");
// ⚠️ ThreadLocal 不再被引用時 Key 被 GC，Value 仍在 Map 中
// 解法: 務必調用 tl.remove() (try-finally)
```

### Q11: GC 何時觸發 Full GC？
- `System.gc()` 調用（僅建議）
- 老年代空間不足
- Metaspace 空間不足
- 晉升失敗（Promotion Failed）
- CMS GC 出現 Concurrent Mode Failure

---

## 框架與工程化

### Q12: Spring `@Transactional` 失效場景？
```java
// ❌ 同一類內部調用 (AOP 代理失效)
@Service
public class UserService {
    public void outer() {
        this.inner();  // 直接調用，非代理 → @Transactional 失效
    }
    @Transactional
    public void inner() { /* ... */ }
}
// ✅ 解法: 注入自身 / 拆到不同類 / AspectJ 編織
```

### Q13: Spring Bean 生命週期？
```
實例化 → 屬性賦值 → Aware 回調 → BeanPostProcessor.beforeInit
→ @PostConstruct → InitializingBean.afterPropertiesSet
→ BeanPostProcessor.afterInit → Bean 就緒
→ @PreDestroy → DisposableBean.destroy → 銷毀
```

### Q14: Maven `<dependencyManagement>` 作用？
- 統一管理子模組依賴版本（父 POM 宣告，子模組引用時省略 version）
- 專案多模組標準化，避免版本衝突

---

## 坑點速查 Gotchas

| 坑點 | 說明 |
|------|------|
| `List<Integer>` 不能直接轉 `int[]` | 需要 stream mapToInt |
| `Arrays.asList()` 返回固定長度 List | `add/remove` 會拋 `UnsupportedOperationException` |
| `finally` 中 return 會吞掉異常 | 異常丟失，極難排查 |
| `SimpleDateFormat` 非線程安全 | 使用 `DateTimeFormatter` 替代 |
| `BigDecimal` 用 `new BigDecimal(0.1)` 精確度問題 | 必須用 `new BigDecimal("0.1")` |
| `Stream` 只能消費一次 | `stream has already been operated upon or closed` |
| `volatile` 不保證原子性 | `count++` 需用 `AtomicInteger` / `synchronized` |

---

## 推薦資源 Recommended Resources

| 資源 | 類型 | 連結 |
|------|------|------|
| Effective Java (Josh Bloch) | 書籍 | 必讀經典 |
| Java Language Specification | 官方 | https://docs.oracle.com/javase/specs/ |
| Baeldung | 教學 | https://www.baeldung.com |
| JVM Anatomy Quarks (Aleksey Shipilëv) | 進階 | https://shipilev.net/jvm/anatomy-quarks/ |
| Java 版本變更總覽 | 參考 | https://javaalmanac.io |
