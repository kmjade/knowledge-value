---
aliases: [C++ FAQ, C++ 常見問題, Frequently Asked Questions]
tags: [DDC/004.432, c++, faq, troubleshooting]
created: 2026-05-30
updated: 2026-05-30
---

# C++ 常見問題 (Frequently Asked Questions)

> 📦 收錄 C++ 開發中常見問題與快速解法。最後更新：2026-05-30。

---

## 語言層面 Language

### Q1: `std::move` 真的會「移動」物件嗎？
**A:** 不會。`std::move` 只是一個無條件轉型為右值引用的 cast (`static_cast<T&&>`)。真正的移動發生在移動建構子或移動賦值運算子中。

### Q2: 什麼時候該用 `constexpr` vs `const`？
**A:** `const` 表示執行期不可修改；`constexpr` 表示編譯期可求值。`constexpr` 隱含 `const`，反之不成立。優先使用 `constexpr` 讓編譯器在編譯期計算。

### Q3: `nullptr` vs `NULL` vs `0` 的差異？
**A:** `nullptr` 是 `std::nullptr_t` 型別，型別安全，不會被誤解為整數。`NULL` 是巨集 (`0` 或 `(void*)0`)，`0` 可能被推導為 `int`。始終使用 `nullptr`。

### Q4: `struct` 和 `class` 的差別？
**A:** 僅預設存取權限不同：`struct` 預設 `public`，`class` 預設 `private`。其他完全相同。

### Q5: 為什麼我的 `std::vector<bool>` 行為怪怪的？
**A:** `std::vector<bool>` 是特化版本，使用位元壓縮儲存，不返回 `bool&` 而是代理物件。不適用一般 vector 語意。替代方案：`std::vector<char>` 或 `std::deque<bool>`。

---

## 記憶體 Memory

### Q6: `new`/`delete` vs `malloc`/`free`？
**A:** `new` 會呼叫建構子，`delete` 會呼叫解構子。`malloc`/`free` 僅分配/釋放原始記憶體，不呼叫建構/解構。**永遠不要混用**。

### Q7: 何時用 `std::unique_ptr` vs `std::shared_ptr`？
**A:** `unique_ptr` — 獨佔所有權，零額外開銷，預設首選。`shared_ptr` — 共享所有權，有引用計數開銷，僅在真正需要共享時使用。`weak_ptr` 用於打破 `shared_ptr` 循環引用。

### Q8: dangling pointer 的常見來源？
**A:** (1) 返回區域變數的指標/參考；(2) container 重新分配後保留的 iterator/參考；(3) `shared_ptr` 循環引用導致永不釋放；(4) 已 delete 的裸指標被再次使用 (use-after-free)。

---

## STL

### Q9: `reserve()` vs `resize()`？
**A:** `reserve(n)` 僅預分配容量，不改變 `size()`；`resize(n)` 改變元素數量，新增元素以預設值填充。

### Q10: `emplace_back()` vs `push_back()`？
**A:** `emplace_back` 直接在容器內原地構造物件 (完美轉發)，省去一次移動/複製。`push_back` 需要先構造臨時物件再移動/複製進去。**優先使用 `emplace_back`**。

### Q11: 為何遍歷 map 不是疊代器失效安全的？
**A:** 大多數 STL 容器的 insert/erase 操作會使 iterators 失效。`std::map`/`set` 的 erase 返回下一個有效 iterator：`it = map.erase(it);` (C++11+)。

---

## 並發 Concurrency

### Q12: mutex vs atomic — 何時用哪個？
**A:** 單一基本型別操作 → `std::atomic` (無鎖，極快)。多個變數或複合操作需要原子性 → `std::mutex`。mutex 有上下文切換開銷。

### Q13: `std::call_once` 的用途？
**A:** 確保某個函數在多執行緒環境中只被呼叫一次，常用於 lazy initialization 的 singleton 模式。比 double-checked locking 更簡潔正確。

---

## 工具與除錯 Tools & Debugging

### Q14: 常見的未定義行為 (UB)？
| UB 類型 | 範例 |
|------|------|
| 有號整數溢出 | `int x = INT_MAX + 1;` |
| nullptr 解引用 | `int* p = nullptr; *p;` |
| 超出陣列邊界 | `int a[5]; a[10] = 0;` |
| use-after-free | `delete p; *p;` |
| 違反 strict aliasing | 透過不相容型別指標存取 |
| Data race | 無同步的並發讀寫 |

### Q15: 編譯成功但執行時 Segmentation Fault？
**A:** 常見原因：nullptr 解引用、stack overflow (遞迴過深)、use-after-free、越界寫入破壞返回地址。使用 ASan (`-fsanitize=address`) 快速定位。

---

## 快速導航 Quick Navigation

| 上一層 | 相關資源 |
|:---:|:---:|
| [[C++]] | [[3 Resources/000 Knowledge/004 Computer Science & technology/004.43-计算机语言/C++/99-資源收集/資源總覽]] |
