---
aliases: [STL, Standard Template Library, C++ Containers, Algorithms, Iterators]
tags: [DDC/004.432, c++, stl, containers, algorithms, iterators]
created: 2026-05-30
updated: 2026-05-30
---

# 04 — STL 深度 (Standard Template Library Deep Dive)

> 🎯 **學習目標**：掌握 STL 容器特性與選擇、迭代器類別、`<algorithm>` 核心演算法、allocator、`string_view` / `span` (C++20)。

---

## 4.1 容器全覽 (Container Overview)

### 容器選擇指南

| 容器 | 底層結構 | 隨機存取 | 頭插入 | 尾插入 | 中間插入 | 查找 | 記憶體連續 | 迭代器失效 |
|------|------|:---:|:---:|:---:|:---:|:---:|:---:|------|
| `std::vector` | 動態陣列 | O(1) | O(n) | O(1)* | O(n) | O(n) | ✅ | 重分配時全部 |
| `std::deque` | 分段陣列 | O(1) | O(1) | O(1) | O(n) | O(n) | ❌ | 可能部分 |
| `std::list` | 雙向鏈結 | — | O(1) | O(1) | O(1)** | O(n) | ❌ | 僅刪除的節點 |
| `std::forward_list` | 單向鏈結 | — | O(1) | — | O(1)** | O(n) | ❌ | 僅刪除的節點 |
| `std::set/map` | 紅黑樹 | — | O(log n) | O(log n) | O(log n) | O(log n) | ❌ | 僅刪除的節點 |
| `std::unordered_set/map` | 雜湊表 | — | O(1)* | O(1)* | O(1)* | O(1)* | ❌ | Rehash 時全部 |
| `std::array` | 固定陣列 | O(1) | — | — | — | O(n) | ✅ | 永不 |
| `std::string` | 動態 char 陣列 | O(1) | O(n) | O(1)* | O(n) | O(n) | ✅ | 重分配時全部 |

\* amortized (均攤)  \*\* 已有 iterator 定位時

### 容器決策樹

```
需要連續記憶體？
├─ YES → 大小已知？ → YES → std::array
│                   → NO  → 需要頭端插入？ → YES → std::deque
│                                         → NO  → std::vector (default)
└─ NO → 需要排序 + 範圍查詢？
        ├─ YES → std::set / std::map
        └─ NO  → 需要 O(1) 平均查找？
                 ├─ YES → std::unordered_set / std::unordered_map
                 └─ NO  → 頻繁中間插入刪除？
                          ├─ YES → std::list
                          └─ NO  → std::vector (仍是好選擇)
```

---

## 4.2 容器詳解

### std::vector — 最重要容器

```cpp
#include <vector>

void vector_demo() {
    std::vector<int> v;
    
    // Reserve vs Resize
    v.reserve(100);          // 預分配容量，size()仍為0
    v.resize(100);           // 建構100個元素，size()=100
    
    // 容量管理
    v.shrink_to_fit();       // 釋放多餘容量（不保證）
    v.capacity();            // 目前分配的容量
    
    // 插入技巧
    v.emplace_back(42);      // ✅ in-place construct (避免複製)
    v.push_back(42);         // 需先建構再複製/移動
    
    // 刪除-移除慣用法 (Erase-Remove Idiom)
    auto it = std::remove_if(v.begin(), v.end(), 
        [](int x) { return x % 2 == 0; });
    v.erase(it, v.end());    // 實際移除
    
    // C++20: std::erase_if
    std::erase_if(v, [](int x) { return x % 2 == 0; });
}

// vector<bool> 陷阱 — 它是位元打包的特化！
// std::vector<bool> vb{true, false};
// auto b = vb[0];          // b 不是 bool&！是 proxy reference
// 替代方案：std::vector<char> 或 std::deque<bool>
```

### std::map vs std::unordered_map

```cpp
#include <map>
#include <unordered_map>

void map_comparison() {
    // std::map (紅黑樹) — 有序、O(log n)
    std::map<std::string, int> m;
    m["alice"] = 30;
    m["bob"]   = 25;
    
    // 走訪保證按 key 遞增排序
    for (auto& [key, val] : m) {
        std::cout << key << ": " << val << "\n";
    }
    // alice: 30, bob: 25 ← "alice" < "bob"
    
    // std::unordered_map (雜湊表) — 無序、O(1) 平均
    std::unordered_map<std::string, int> um;
    um["alice"] = 30;
    um.reserve(100);         // 預留 bucket 避免 rehash
    
    // 自訂雜湊
    struct MyHash {
        size_t operator()(const std::string& s) const {
            return std::hash<std::string>{}(s);  // 或自訂演算法
        }
    };
    std::unordered_map<std::string, int, MyHash> custom_map;
}

// 選擇指南
// ├─ 需要有序走訪？         → std::map
// ├─ 需要 lower_bound？     → std::map
// ├─ 記憶體敏感？           → std::map (較少 overhead)
// ├─ 查找效能優先？         → std::unordered_map
// └─ 需自訂 Compare/Hash？  → 兩者皆支援
```

### C++23 flat_map / flat_set

```cpp
// C++23: 基於排序 vector 的關聯容器 — cache-friendly
// #include <flat_map>
// std::flat_map<int, std::string> fm;
// 插入 O(n)，查找 O(log n)，但更高的常數因子 => 適合小資料集或大量查找
```

---

## 4.3 迭代器類別 (Iterator Categories)

### 五種迭代器層級

| 類別 | Tag | 支援操作 | 範例 |
|------|:---:|------|------|
| **Input** | `input_iterator_tag` | `++`, `*` (read), `==`, `!=` | `std::istream_iterator` |
| **Output** | `output_iterator_tag` | `++`, `*` (write) | `std::ostream_iterator` |
| **Forward** | `forward_iterator_tag` | Input + multi-pass guarantee | `std::forward_list::iterator` |
| **Bidirectional** | `bidirectional_iterator_tag` | Forward + `--` | `std::list::iterator`, `std::map::iterator` |
| **Random Access** | `random_access_iterator_tag` | Bidirectional + `+`, `-`, `+=`, `-=`, `[]`, `<` | `std::vector::iterator`, `T*` |
| **Contiguous** (C++20) | `contiguous_iterator_tag` | Random Access + 記憶體連續 | `std::vector::iterator`, `T*` |

### 自訂迭代器

```cpp
// 簡易 range 迭代器 (C++20 前)
template<typename T>
class RangeIterator {
    T current_;
public:
    using iterator_category = std::input_iterator_tag;
    using value_type = T;
    using difference_type = std::ptrdiff_t;
    using pointer = T*;
    using reference = T&;
    
    explicit RangeIterator(T start) : current_(start) {}
    
    T operator*() const { return current_; }
    RangeIterator& operator++() { ++current_; return *this; }
    RangeIterator operator++(int) { auto tmp = *this; ++current_; return tmp; }
    
    bool operator==(const RangeIterator& other) const { return current_ == other.current_; }
    bool operator!=(const RangeIterator& other) const { return !(*this == other); }
};
```

---

## 4.4 `<algorithm>` 核心演算法

### 常用演算法速查

| 演算法 | 功能 | 複雜度 | C++ |
|------|------|:---:|:---:|
| `std::sort` | 排序 (intro sort) | O(n log n) | 98 |
| `std::stable_sort` | 穩定排序 | O(n log² n) | 98 |
| `std::partial_sort` | 局部排序 | O(n log k) | 98 |
| `std::nth_element` | 第 n 小元素 | O(n) | 98 |
| `std::binary_search` | 二元搜尋 (需有序) | O(log n) | 98 |
| `std::lower_bound` | 第一個 ≥ value | O(log n) | 98 |
| `std::upper_bound` | 第一個 > value | O(log n) | 98 |
| `std::find` | 線性搜尋 | O(n) | 98 |
| `std::find_if` | 條件搜尋 | O(n) | 98 |
| `std::count` / `count_if` | 計數 | O(n) | 98 |
| `std::for_each` | 走訪每個元素 | O(n) | 98 |
| `std::transform` | 轉換序列 | O(n) | 98 |
| `std::accumulate` | 累加 (numeric) | O(n) | 98 |
| `std::copy` / `std::move` | 複製/移動 | O(n) | 98 |
| `std::remove_if` + erase | 條件刪除 | O(n) | 98/20 |
| `std::unique` | 去重 (需有序) | O(n) | 98 |
| `std::sample` | 隨機抽樣 | O(n) | 17 |
| `std::clamp` | 區間箝位 | O(1) | 17 |

### 實戰模式

```cpp
#include <algorithm>
#include <numeric>
#include <execution>  // C++17 parallel algorithms

void algorithm_demos() {
    std::vector<int> v = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    
    // 排序
    std::sort(v.begin(), v.end());                    // 1,2,3,4,5,6,7,8,9
    std::sort(v.begin(), v.end(), std::greater<>{});  // 9,8,7,6,5,4,3,2,1
    
    // 搜尋
    auto it = std::lower_bound(v.begin(), v.end(), 5);
    bool found = std::binary_search(v.begin(), v.end(), 7);
    
    // 轉換
    std::vector<int> squares(v.size());
    std::transform(v.begin(), v.end(), squares.begin(),
                   [](int x) { return x * x; });
    
    // 累加
    int sum = std::accumulate(v.begin(), v.end(), 0);
    int prod = std::accumulate(v.begin(), v.end(), 1,
                               std::multiplies<int>{});
    
    // 過濾與複製
    std::vector<int> evens;
    std::copy_if(v.begin(), v.end(), std::back_inserter(evens),
                 [](int x) { return x % 2 == 0; });
    
    // C++17: 平行演算法
    // std::sort(std::execution::par, v.begin(), v.end());
    // std::transform(std::execution::par_unseq, ...);
}
```

### std::optional 與演算法結合

```cpp
// 安全地找尋第一個符合條件的元素
template<typename Container, typename Pred>
auto find_optional(Container&& c, Pred p) -> std::optional<decltype(*c.begin())> {
    auto it = std::find_if(c.begin(), c.end(), p);
    if (it != c.end()) return *it;
    return std::nullopt;
}
```

---

## 4.5 Allocator (記憶體配置器)

```cpp
// STL 容器預設使用 std::allocator<T>
// 可自訂 allocator 實現特殊記憶體策略

template<typename T>
class PoolAllocator {
    // ... (memory pool implementation)
public:
    using value_type = T;
    
    T* allocate(size_t n) {
        // 從記憶體池分配
        return static_cast<T*>(pool_malloc(n * sizeof(T)));
    }
    
    void deallocate(T* p, size_t n) {
        // 歸還給記憶體池
        pool_free(p, n * sizeof(T));
    }
};

// 使用自訂 allocator
// std::vector<int, PoolAllocator<int>> v;
// std::pmr 多型記憶體資源 (C++17)
// #include <memory_resource>
// std::pmr::vector<int> v{&my_memory_resource};
```

---

## 4.6 string_view (C++17) 與 span (C++20)

### std::string_view — 非擁有型字串視圖

```cpp
#include <string_view>

// string_view 是不擁有記憶體的唯讀視圖
// size = 16 bytes (ptr + size)，不含 null terminator

void sv_demo() {
    std::string s = "Hello, World!";
    std::string_view sv = s;         // 不複製！只是 view
    
    std::string_view sub = sv.substr(0, 5);  // O(1)! (不複製)
    // sub == "Hello"
    
    // string_view 優點：
    // 1. const std::string& 參數改為 string_view — 接受更多型別
    // 2. substr 是 O(1) 操作
    // 3. string literal 不需轉換為 std::string
    
    // ⚠️ 陷阱：dangling reference
    auto bad = []() -> std::string_view {
        std::string temp = "hello";
        return temp;  // ❌ temp 在函數結束後被銷毀！
    };
    
    // ✅ 安全用法：僅作為函數參數
    auto process = [](std::string_view sv) {
        std::cout << sv.size() << ": " << sv << "\n";
    };
    process("literal");         // ✅
    process(std::string{"hi"}); // ✅
    process(sv);                // ✅
}
```

### std::span (C++20) — 非擁有型連續記憶體視圖

```cpp
#include <span>

// span<T> = 非擁有型連續範圍視圖 (像 string_view 但泛型)
// size = 16 bytes (ptr + size) on 64-bit

void span_demo() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    std::array<int, 3> arr = {10, 20, 30};
    int raw[] = {100, 200, 300};
    
    std::span<int> sv(v);           // vector → span
    std::span<int> sa(arr);         // array → span
    std::span<int> sr(raw);         // C array → span
    
    // Subspan
    std::span<int> sub = sv.subspan(1, 3);  // {2, 3, 4}
    
    // 動態 vs 靜態 extent
    std::span<int> dynamic_span(v);         // extent = dynamic_extent (執行期)
    std::span<int, 5> static_span(v);       // extent = 5 (編譯期保證)
    // std::span<int, 10> bad(v);           // ❌ compile error if size mismatch
    
    // 取代 (ptr, size) 參數對
    // BEFORE:
    void process_old(int* data, size_t size);
    // AFTER:
    void process(std::span<int> data);  // ✅ 更安全，支援所有連續容器
}

// ⚠️ span 與 string_view 的陷阱相同：不可返回 local 變數的 span
```

---

## 4.7 `<ranges>` 快速預覽 (C++20)

> 詳見 [[07-现代C++特性]] 章節

```cpp
#include <ranges>
namespace views = std::views;

auto pipeline = v 
    | views::filter([](int x) { return x % 2 == 0; })
    | views::transform([](int x) { return x * x; })
    | views::take(5);

// Lazily evaluated! Only computed when iterated.
for (int x : pipeline)
    std::cout << x << " ";
```

---

## 📊 容器選擇速查表

| 需求 | 首選 | 備選 |
|------|------|------|
| 動態陣列，尾端操作 | `std::vector` | `std::deque` (若需頭端) |
| 固定大小陣列 | `std::array` | C-style array |
| 頻繁頭尾插入 | `std::deque` | `std::list` |
| 頻繁中間插入刪除 | `std::list` | `std::forward_list` (單向) |
| 關聯查詢 (有序) | `std::map` / `std::set` | `std::flat_map` (C++23) |
| 關聯查詢 (無序,O(1)) | `std::unordered_map/set` | 自訂雜湊表 |
| 非擁有字串參數 | `std::string_view` | `const std::string&` |
| 非擁有連續範圍參數 | `std::span` | `(T*, size_t)` |
| LIFO 棧 | `std::stack` (adaptor) | `std::vector` |
| FIFO 佇列 | `std::queue` (adaptor) | `std::deque` |
| Priority queue | `std::priority_queue` | `std::make_heap` |
