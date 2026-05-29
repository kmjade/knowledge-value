---
title: Software Testing
tags: [software, testing, quality]
created: 2026-05-29
aliases: [軟體測試, 05-Testing, TDD, BDD]
---

# 05 — Software Testing 軟體測試

> How do we ensure quality? Testing is not just finding bugs — it's a systematic discipline for building confidence in software.
> 測試不僅是找 bug —— 它是建立軟體信心的一門系統化學科。

---

## 測試金字塔 Testing Pyramid

```
         ╱  E2E  ╲         慢、貴、脆弱，少量
        ╱──────────╲
       ╱ Integration ╲      中速、中成本，中等量
      ╱────────────────╲
     ╱    Unit Tests     ╲   快、便宜、穩定，大量
    ╱──────────────────────╲
```

| 層級 | 範圍 | 速度 | 維護成本 | 數量 |
|------|------|------|---------|------|
| **Unit** | Single function/class | ms | Low | 70% |
| **Integration** | Module interactions | ms–s | Medium | 20% |
| **End-to-End** | Full user journey | s–min | High | 10% |

---

## 測試類型 Test Types

### Functional Testing 功能測試

| 類型 | 說明 | 範例 |
|------|------|------|
| **Unit Test** | 測試最小的獨立程式碼單元 | `test_calculate_tax()` |
| **Integration Test** | 測試模組之間的互動 | API endpoint + database |
| **System Test** | 測試完整系統 | 整個應用的端到端測試 |
| **Acceptance Test** | 驗證符合業務需求 | 使用者驗收測試 (UAT) |
| **Regression Test** | 確保新程式碼不會破壞既有功能 | CI pipeline 中的全部測試 |

### Non-Functional Testing 非功能測試

| 類型 | 說明 |
|------|------|
| **Performance Test** | 測試系統在特定負載下的響應 |
| **Load Test** | 測試系統在預期負載下的行為 |
| **Stress Test** | 測試系統的極限承載能力 |
| **Security Test** | 發現安全漏洞（OWASP Top 10） |
| **Usability Test** | 測試使用者體驗與易用性 |

---

## TDD: Test-Driven Development 測試驅動開發

### Red-Green-Refactor Cycle

```
     ┌──────────────────────────┐
     │  RED: Write a failing    │
     │       test               │
     └──────────┬───────────────┘
                │
                ▼
     ┌──────────────────────────┐
     │  GREEN: Write minimal    │
     │         code to pass     │
     └──────────┬───────────────┘
                │
                ▼
     ┌──────────────────────────┐
     │  REFACTOR: Improve code  │
     │            quality       │
     └──────────┬───────────────┘
                │
                └──────────→ (repeat)
```

### TDD 三條法則 (Uncle Bob)

1. 除非是為了讓失敗的測試通過，否則不寫任何 production code
2. 只寫剛好足以失敗的測試（包括編譯失敗）
3. 只寫剛好足以讓測試通過的 production code

### 範例 Example

```python
# RED: 先寫測試
def test_add_item_to_cart():
    cart = ShoppingCart()
    cart.add("book", 2)
    assert cart.total_items() == 2

# GREEN: 最小實作
class ShoppingCart:
    def add(self, item, qty):
        self._items = [item] * qty
    def total_items(self):
        return len(self._items)
```

---

## BDD: Behavior-Driven Development 行為驅動開發

**用自然語言描述系統行為**，縮小技術與業務之間的鴻溝。

### Gherkin 語法

```gherkin
Feature: 購物車結帳
  Scenario: 成功結帳
    Given 使用者已登入
    And 購物車中有一本書（$29.99）
    When 使用者點擊「結帳」
    Then 系統顯示訂單確認頁面
    And 訂單總額為 $29.99
```

| 關鍵字 | 用途 |
|--------|------|
| **Given** | 前置條件（setup） |
| **When** | 觸發動作 |
| **Then** | 期望結果 |

---

## 測試策略 Test Strategies

### Testing Trophy (Kent C. Dodds)

```
       ╱ E2E ╲
      ╱────────╲
     ╱ Integration ╲    ← 重點在這裡！
    ╱────────────────╲
   ╱    Unit Tests     ╲
  ╱──────────────────────╲
 ╱    Static Analysis      ╲
╱────────────────────────────╲
```

強調 **Integration Tests 的投資回報率最高**，應佔最大比例。

### 測試覆蓋率 Coverage

| 指標 | 說明 |
|------|------|
| **Line Coverage** | 多少行程式碼被執行過 |
| **Branch Coverage** | 多少分支路徑被測試過 |
| **Function Coverage** | 多少函數被呼叫過 |

> ⚠️ 100% coverage ≠ bug-free。Coverage 是必要但非充分條件。

---

## Property-Based Testing 屬性測試

不寫具體輸入/輸出，而是定義「屬性」應該永遠成立：

```python
# 屬性：對任意整數列表，反轉兩次等於原列表
@given(lists(integers()))
def test_reverse_twice(xs):
    assert reverse(reverse(xs)) == xs
```

---

## 測試反模式 Test Anti-Patterns

| 反模式 | 問題 | 解法 |
|--------|------|------|
| **Flaky tests** | 時過時不過的非確定性測試 | 消除時間依賴、外部狀態 |
| **Ice cream cone** | 大量手動測試 + 少量單元測試 | 反轉為金字塔形狀 |
| **Test duplication** | 重複的測試案例 | 使用 fixtures / parameterized tests |
| **Testing implementation** | 測試內部實作而非行為 | 測試 public API / behavior |

---

> 💡 **Key Insight**: The goal of testing is confidence, not coverage. 測試的目標是信心，不是覆蓋率數字。Write tests that give you the confidence to refactor fearlessly.
