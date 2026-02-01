# MQL4 知識庫

MQL4 (MetaQuotes Language 4) 是一種用於開發交易策略、技術指標、腳本和函式庫的程式語言，主要運行在 MetaTrader 4 交易平台上。

## 核心概念

### 程式類型
- **EA (Expert Advisors - 智能交易系統)**：自動執行交易操作的程式。
- **Custom Indicators - 自定義指標**：根據設定的演算法繪製技術指標。
- **Scripts - 腳本**：執行一次性操作的程式。

### 基本語法
- **變數與常數**：`int`, `double`, `string`, `color`, `datetime`, `bool`。
- **運算子**：算術、賦值、關係、邏輯運算子。
- **流程控制**：`if-else`, `switch`, `for`, `while`。
- **函數**：內建函數和自定義函數。

### 預定義變數
- `Ask`: 當前賣出價。
- `Bid`: 當前買入價。
- `Close[]`: 收盤價時間序列。
- `Open[]`: 開盤價時間序列。
- `High[]`: 最高價時間序列。
- `Low[]`: 最低價時間序列。
- `Time[]`: K棒時間序列。
- `Volume[]`: 交易量時間序列。

## 交易函數
- `OrderSend()`: 發送交易訂單。
- `OrderClose()`: 關閉現有訂單。
- `OrderModify()`: 修改訂單參數。
- `OrderSelect()`: 選擇要處理的訂單。
- `OrderLots()`: 獲取訂單的手數。
- `OrderProfit()`: 獲取訂單的利潤。

## 技術指標函數
MQL4 提供了一系列內建的技術指標計算函數。
- `iMA()`: 移動平均線。
- `iRSI()`: 相對強弱指標。
- `iMACD()`: MACD 指標。
- `iBands()`: 布林帶指標。
- `iStochastic()`: 隨機指標。

## 圖表物件
用於在圖表上繪製圖形物件。
- `ObjectCreate()`: 建立物件。
- `ObjectSet()`: 設定物件屬性。
- `ObjectDelete()`: 刪除物件。
- `ObjectDescription()`: 獲取物件描述。
