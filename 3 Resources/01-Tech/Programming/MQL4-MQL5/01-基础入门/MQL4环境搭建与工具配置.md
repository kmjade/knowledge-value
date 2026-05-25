---
# 配置
status: active
priority: high
tags: [resource/tech/programming/mql, mql4/environment, mql4/tools]
# 配置
created: 2026-02-01
---

# 配置

> 🎯 **學習目標**：完成MQL4開發環境的搭建，掌握MetaEditor的基本使用，能夠創建和運行第一个MQL4程式。

## 📚 環境搭建概述

### MQL4開發環境结构
```mermaid
graph TB
    A[MQL4開發環境] --> B[MetaTrader 4]
    A --> C[MetaEditor]
    A --> D[開發工具]
    
    B --> B1[交易平台]
    B --> B2[模拟帳戶]
    B --> B3[歷史數據]
    
    C --> C1[代碼編輯器]
    C --> C2[除錯器]
    C --> C3[编译器]
    
    D --> D1[VS Code擴展]
# 版本
    D --> D3[測試工具]
```

## 🔧 MetaTrader 4安裝

### MT4下載与安裝

#### 官方下載步骤
```bash
# 1. 访问MetaQuotes官网
https://www.metatrader4.com/en/download

# 版本
# 版本
# 版本

# 3. 下載并安裝
# 運行安裝程式，按照提示完成安裝

# 4. 創建模拟帳戶
# 打開MT4 -> 檔案 -> 开设模拟帳戶
```

### MT4界面介紹

#### 主要界面組件
```
┌─────────────────────────────────────────────────────┐
│  MT4 主界面                                        │
├─────────────────────────────────────────────────────┤
│  選單栏: 檔案 视图 插入 圖表 帮助                   │
├─────────────────────────────────────────────────────┤
│  工具栏: 新建圖表 周期 放大 缩小 指标 EA            │
├─────────────────────────────────────────────────────┤
# 顯示
│  ┌─────────────┐ │     ┌─────────────────┐         │
│  │ EURUSD      │ │     │                 │         │
│  │ GBPUSD      │ │     │   价格走势图     │         │
│  │ USDJPY      │ │     │                 │         │
│  └─────────────┘ │     └─────────────────┘         │
├─────────────────────────────────────────────────────┤
│  终端視窗                                          │
│  ┌──────────────────────────────────────────────┐  │
│  │ 交易 | 帳戶歷史 | 電子郵件 | 日志 | 代理         │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

#### 快捷键操作
```mql4
// 常用快捷键
F4           // 打開MetaEditor
F9           // 打開新訂單視窗
Ctrl+N       // 新建圖表
Ctrl+O       // 打開圖表
Ctrl+S       // 儲存圖表
Ctrl+F       // 尋找
Ctrl+H       // 替换
F5           // 刷新圖表
Delete       // 刪除对象
```

# 配置

### MetaEditor啟動

#### 打開MetaEditor
```mql4
# 方法
// 在MT4中按F4键
// 或点击工具栏的MetaEditor圖示

# 方法
// 找到MetaEditor.exe檔案直接打開
// 默认位置: C:\Program Files\MetaTrader 4\MetaEditor.exe
```

### MetaEditor界面

#### 主要界面布局
```
┌─────────────────────────────────────────────────────┐
│  MetaEditor 主界面                                  │
├─────────────────────────────────────────────────────┤
│  選單栏: 檔案 編輯 视图 除錯 工具 視窗 帮助        │
├─────────────────────────────────────────────────────┤
│  工具栏: 新建 打開 儲存 编译 運行 除錯              │
├─────────────────────────────────────────────────────┤
│  导航器視窗    │     代碼編輯区域                   │
│  ┌─────────────┐ │     ┌─────────────────┐         │
│  │ Expert Advisors│     │                 │         │
│  │ Indicators     │     │   MQL4代碼      │         │
│  │ Scripts       │     │                 │         │
│  │ Include       │     │                 │         │
│  └─────────────┘ │     └─────────────────┘         │
├─────────────────────────────────────────────────────┤
│  工具箱視窗                                          │
│  ┌──────────────────────────────────────────────┐  │
│  │ 常用函数、代碼片段                            │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

# 配置

#### 編輯器設置
```mql4
// 打開設置
// 工具 -> 选项 -> 編輯器

# 配置
// - 字体: Consolas 或 JetBrains Mono
// - 字号: 12-14
# 顯示
// - 自動缩进: 启用
// - 语法高亮: 启用
// - 括号匹配: 启用
```

#### 编译器設置
```mql4
// 工具 -> 选项 -> 编译器
# 配置
// - 優化级别: 標準
// - 警告级别: 高
// - 檢查代碼完整性: 启用
// - 生成除錯資訊: 除錯时启用
```

## 🎯 創建第一个MQL4程式

### 創建Expert Advisor (EA)

#### 新建EA步骤
```mql4
// 1. 在MetaEditor中創建新檔案
// 檔案 -> 新建 -> Expert Advisor (template)

// 2. 填寫EA資訊
名称: MyFirstEA
作者: Your Name
連結: https://www.example.com
参数: (可选)

// 3. 選擇事件處理函数
OnTick()        // 必选：价格变动时执行
OnTimer()       // 可选：定时器事件
OnTrade()       // 可选：交易事件
OnChartEvent()  // 可选：圖表事件

// 4. 完成創建
// MetaEditor会生成基礎代碼框架
```

#### 基礎EA代碼模板
```mql4
//+------------------------------------------------------------------+
//|                                              MyFirstEA.mq4       |
//|                        Copyright 2026, Your Name                 |
//|                                             https://www.mql5.com |
//+------------------------------------------------------------------+
#property copyright "2026, Your Name"
#property link      "https://www.mql5.com"
#property version   "1.00"
#property strict

// 輸入参数
input double LotSize = 0.1;        // 交易手数
input int    StopLoss = 50;        // 止损点数
input int    TakeProfit = 100;     // 止盈点数

//+------------------------------------------------------------------+
//| Expert initialization function                                     |
//+------------------------------------------------------------------+
int OnInit()
  {
   // EA啟動时执行一次
   Print("EA 已啟動: ", _Symbol);
   
   // 返回初始化狀態
   return(INIT_SUCCEEDED);
  }

//+------------------------------------------------------------------+
//| Expert deinitialization function                                   |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
  {
   // EA停止时执行
   Print("EA 已停止，原因: ", reason);
   
   // 清理資源
   ObjectsDeleteAll(0, "MyFirstEA_");
  }

//+------------------------------------------------------------------+
//| Expert tick function                                               |
//+------------------------------------------------------------------+
void OnTick()
  {
   // 每次价格变动时执行
   // 这是EA的主要逻辑部分
   
   // 获取当前价格
   double bid = MarketInfo(_Symbol, MODE_BID);
   double ask = MarketInfo(_Symbol, MODE_ASK);
   
   // 輸出除錯資訊
   if(TimeCurrent() - Time[0] > PeriodSeconds() - 10)
     {
      Print("当前价格: Bid=", bid, " Ask=", ask);
     }
  }

//+------------------------------------------------------------------+
//| Chart event function                                              |
//+------------------------------------------------------------------+
void OnChartEvent(const int id,
                  const long &lparam,
                  const double &dparam,
                  const string &sparam)
  {
   // 處理圖表事件
   if(id == CHARTEVENT_KEYDOWN)
     {
      Print("按键事件: ", lparam);
     }
  }
```

### 創建自定义指标

#### 新建指标步骤
```mql4
// 1. 檔案 -> 新建 -> Custom Indicator
// 2. 填寫指标資訊
名称: MyCustomIndicator
类型: 主图或副图
// 3. 設置指标参数和绘图属性
// 4. 完成創建
```

#### 基礎指标代碼模板
```mql4
//+------------------------------------------------------------------+
//|                                   MyCustomIndicator.mq4           |
//|                        Copyright 2026, Your Name                 |
//|                                             https://www.mql5.com |
//+------------------------------------------------------------------+
#property copyright "2026, Your Name"
#property link      "https://www.mql5.com"
#property version   "1.00"
#property strict
# 顯示
# 顯示

#property indicator_buffers 1      // 指标缓冲区数量
#property indicator_plots   1      // 绘制线数量

// 指标参数
input int MAPeriod = 20;           // 移动平均周期

// 指标缓冲区
double MA_Buffer[];

//+------------------------------------------------------------------+
//| Custom indicator initialization function                           |
//+------------------------------------------------------------------+
int OnInit()
  {
   // 設置指标缓冲区
   SetIndexBuffer(0, MA_Buffer);
   SetIndexStyle(0, DRAW_LINE, STYLE_SOLID, 2, clrBlue);
   
   // 設置指标標籤
   IndicatorShortName("My MA(" + IntegerToString(MAPeriod) + ")");
   SetIndexLabel(0, "MA(" + IntegerToString(MAPeriod) + ")");
   
   return(INIT_SUCCEEDED);
  }

//+------------------------------------------------------------------+
//| Custom indicator deinitialization function                         |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
  {
   // 清理
   Comment("");
  }

//+------------------------------------------------------------------+
//| Custom indicator iteration function                                |
//+------------------------------------------------------------------+
int OnCalculate(const int rates_total,
                const int prev_calculated,
                const datetime &time[],
                const double &open[],
                const double &high[],
                const double &low[],
                const double &close[],
                const long &tick_volume[],
                const long &volume[],
                const int &spread[])
  {
   // 檢查是否有足夠的數據
   if(rates_total < MAPeriod)
      return(0);
   
   // 計算移动平均
   int start = prev_calculated;
   if(start == 0)
      start = MAPeriod;
   
   for(int i = start; i < rates_total; i++)
     {
      double sum = 0.0;
      for(int j = 0; j < MAPeriod; j++)
        {
         sum += close[i - j];
        }
      MA_Buffer[i] = sum / MAPeriod;
     }
   
   return(rates_total);
  }
```

## 🧪 编译和除錯

### 编译程式

#### 编译步骤
```mql4
// 1. 编译当前檔案
// 按F7键 或 点击编译按鈕

# 查看
# 查看
// 0错误 0警告 = 编译成功

// 3. 處理编译错误
// 双击错误資訊跳转到错误位置
# 修改

// 4. 常见编译错误
// - syntax error: 语法错误
// - undeclared identifier: 未声明的变量
// - function declaration missing: 函数声明缺失
```

### 除錯程式

#### 除錯步骤
```mql4
// 1. 設置断点
// 在代碼行号左侧点击設置断点
// 或按F9键

// 2. 啟動除錯
// 按F5键啟動除錯

// 3. 除錯控制
// F5: 繼續運行
// F10: 单步跳过
// F11: 单步进入
// Shift+F11: 单步跳出

# 查看
# 查看
# 查看

// 5. 监视表达式
// 在监视視窗中新增表达式监视
```

## 🎨 代碼編輯技巧

### 代碼格式化

#### 自動格式化
```mql4
// 手動格式化
// 選擇代碼 -> Ctrl+A -> 編輯 -> 格式化

// 或使用快捷键
// Ctrl+Shift+F (自定义)

// 推荐缩进
// 使用2或4个空格缩进
// 保持一致的缩进风格
```

### 代碼补全

#### 智能提示
```mql4
# 顯示
# 顯示

// 按Tab键接受建議
// 按ESC键關閉提示

// 函数参数提示
# 顯示
```

### 代碼片段

#### 創建代碼片段
```mql4
# 管理
// 可以創建常用的代碼片段

// 示例：訂單發送代碼片段
OrderSend(
    Symbol(),           // 交易品种
    OP_BUY,            // 訂單类型
    LotSize,           // 手数
    Ask,               // 价格
    3,                 // 滑点
    Ask - StopLoss * Point,  // 止损
    Ask + TakeProfit * Point, // 止盈
    "My First EA",     // 注释
    0,                 // 魔术数字
    0,                 // 到期時間
    clrNONE            // 箭头颜色
);
```

## 📊 測試環境

### 策略測試器

#### 啟動測試器
```mql4
// 在MT4中按Ctrl+T打開策略測試器

# 配置
// - 選擇EA
// - 選擇交易品种
// - 選擇時間周期
// - 選擇測試模式
// - 設置測試時間范围
// - 設置初始资金

// 開始測試
// 点击開始按鈕
```

#### 測試模式
```mql4
// 1. 每次跳点模式
// 最快的測試速度，但不够精确

// 2. 控制点模式
// 较快的速度，较好的精度

// 3. 实时报价模式
// 最精确的測試，但速度最慢

// 推荐使用控制点模式進行初步測試
// 实时报价模式進行最终驗證
```

## 🚀 实战练习

### 练习1：創建简单EA

#### 任務要求
```mql4
// 創建一个简单的EA
# 顯示
# 顯示
```

#### 參考代碼
```mql4
//+------------------------------------------------------------------+
//|                                            SimplePriceEA.mq4    |
//+------------------------------------------------------------------+
#property copyright "2026, Practice"
#property version   "1.00"
#property strict

void OnTick()
  {
   // 获取当前价格
   double bid = MarketInfo(_Symbol, MODE_BID);
   double ask = MarketInfo(_Symbol, MODE_ASK);
   
   // 获取当前時間
   datetime currentTime = TimeCurrent();
   string timeStr = TimeToString(currentTime, TIME_DATE|TIME_SECONDS);
   
# 顯示
# 顯示
           "交易品种: ", _Symbol, "\n",
           "当前時間: ", timeStr, "\n",
           "买价(Bid): ", bid, "\n",
           "卖价(Ask): ", ask, "\n",
           "点差: ", DoubleToString((ask - bid) / _Point, 0));
  }
```

### 练习2：創建简单指标

#### 任務要求
```mql4
// 創建一个简单移动平均指标
# 顯示
```

#### 參考代碼
```mql4
//+------------------------------------------------------------------+
//|                                    SimpleMA.mq4                  |
//+------------------------------------------------------------------+
#property copyright "2026, Practice"
#property version   "1.00"
#property strict
#property indicator_chart_window
#property indicator_buffers 1
#property indicator_plots   1

input int Period = 14;

double MABuffer[];

int OnInit()
  {
   SetIndexBuffer(0, MABuffer);
   SetIndexStyle(0, DRAW_LINE, STYLE_SOLID, 2, clrRed);
   IndicatorShortName("SMA(" + IntegerToString(Period) + ")");
   return(INIT_SUCCEEDED);
  }

int OnCalculate(const int rates_total,
                const int prev_calculated,
                const datetime &time[],
                const double &open[],
                const double &high[],
                const double &low[],
                const double &close[],
                const long &tick_volume[],
                const long &volume[],
                const int &spread[])
  {
   if(rates_total < Period)
      return(0);
   
   int start = prev_calculated;
   if(start == 0)
      start = Period;
   
   for(int i = start; i < rates_total; i++)
     {
      double sum = 0.0;
      for(int j = 0; j < Period; j++)
        {
         sum += close[i - j];
        }
      MABuffer[i] = sum / Period;
     }
   
   return(rates_total);
  }
```

## 💡 最佳實踐

### 開發建議

#### 代碼组织
- ✅ **模块化編程**：将功能分解为多個函数
- ✅ **注释清晰**：新增有意义的代碼注释
- ✅ **变量命名**：使用有意义的变量名
- ❌ **避免全局变量**：减少全局变量的使用

#### 除錯技巧
- ✅ **使用Print()**：輸出除錯資訊
- ✅ **逐步除錯**：使用断点逐步除錯
- ✅ **错误處理**：新增适当的错误檢查
- ❌ **避免死循环**：确保循环有退出条件

### 測試建議

#### 測試流程
1. **语法檢查**：确保代碼编译無误
2. **单元測試**：測試各个功能模块
3. **策略測試**：在策略測試器中測試
4. **模拟交易**：在模拟帳戶中運行
5. **风险控制**：設置合理的止损和仓位

## 🔗 相關資源

- [[MQL4基礎语法与數據类型]] - MQL4语法基礎
- [[MQL4函数与控制流]] - 函数和控制流
- [[除錯与错误處理]] - 除錯技巧
- [[Expert Advisor基礎]] - EA開發

### 官方文檔

- **MQL4文檔**：https://www.mql5.com/en/docs/mql4
- **MetaTrader 4**：https://www.metatrader4.com/
- **MQL5社區**：https://www.mql5.com/en

---
*創建時間: 2026-02-01*  
*分類: 3 Resources*
