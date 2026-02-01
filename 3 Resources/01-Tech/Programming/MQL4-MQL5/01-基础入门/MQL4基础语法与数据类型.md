---
title: MQL4基础语法与数据类型
status: active
priority: high
tags: [resource/tech/programming/mql, mql4/syntax, mql4/data-types]
aliases: [MQL4语法基础, MQL4数据类型]
created: 2026-02-01
---

# MQL4基础语法与数据类型

> 🎯 **学习目标**：掌握MQL4的基本语法规则和数据类型，能够编写简单的MQL4程序。

## 📚 语法基础

### 程序结构

#### MQL4程序的基本结构
```mql4
//+------------------------------------------------------------------+
//|                                            MyProgram.mq4        |
//|                        Copyright 2026, Your Name                |
//|                                             https://www.mql5.com |
//+------------------------------------------------------------------+
#property copyright "2026, Your Name"
#property link      "https://www.mql5.com"
#property version   "1.00"
#property strict

// 全局变量区域
int globalCounter = 0;

// 输入参数
input double RiskPercent = 1.0;     // 风险百分比
input int    MagicNumber = 123456;  // 魔术数字

//+------------------------------------------------------------------+
//| Expert initialization function                                     |
//+------------------------------------------------------------------+
int OnInit()
  {
   // 程序启动时执行一次
   Print("程序已启动");
   return(INIT_SUCCEEDED);
  }

//+------------------------------------------------------------------+
//| Expert tick function                                               |
//+------------------------------------------------------------------+
void OnTick()
  {
   // 每次价格变动时执行
   // 主要程序逻辑
  }

//+------------------------------------------------------------------+
//| Expert deinitialization function                                   |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
  {
   // 程序停止时执行
   Print("程序已停止");
  }
```

### 注释

#### 注释类型
```mql4
// 单行注释：用于简短说明

/*
 * 多行注释：用于详细说明
 * 可以跨越多行
 */

// 函数注释
//+------------------------------------------------------------------+
//| 函数功能说明                                                      |
//+------------------------------------------------------------------+
```

### 语句和表达式

#### 基本语句
```mql4
// 表达式
int x = 10 + 5;           // 算术表达式
bool isTrue = (x > 8);    // 比较表达式

// 复合语句（代码块）
{
   int y = 20;
   y = y + x;
   Print(y);
}

// 空语句
;
```

## 🔢 数据类型

### 基本数据类型

#### 数值类型
```mql4
// 整数类型
int    age = 25;            // 4字节，范围：-2,147,483,648 到 2,147,483,647
long   bigNumber = 100000;  // 8字节，更大范围的整数
short  smallNum = 10;       // 2字节，范围：-32,768 到 32,767

// 浮点数类型
double price = 1.2345;     // 8字节，双精度浮点数
float  simple = 1.23f;     // 4字节，单精度浮点数

// 示例：价格计算
double bidPrice = 1.1234;
double askPrice = 1.1235;
double spread = askPrice - bidPrice;
Print("点差: ", spread);

// 整数运算
int lotSize = 100000;
int pipValue = 10;
double profit = lotSize * pipValue * 0.0001;
```

#### 字符类型
```mql4
// 字符类型
char currency = '$';         // 1字节，单个字符

// 字符串类型
string symbol = "EURUSD";   // 字符串
string message = "Hello, MQL4!";

// 字符串操作
string pair = "EUR/USD";
Print("交易品种: ", pair);

// 字符串连接
string greeting = "Hello, ";
string name = "Trader";
string message = greeting + name;  // "Hello, Trader"

// 字符串长度
int len = StringLen(message);  // 12

// 字符串比较
bool isEqual = (pair == "EUR/USD");  // true
```

#### 布尔类型
```mql4
// 布尔类型
bool isBullish = true;   // 真值
bool isBearish = false;  // 假值

// 布尔运算
bool condition1 = true;
bool condition2 = false;

bool andResult = condition1 && condition2;  // false (逻辑与)
bool orResult  = condition1 || condition2;  // true  (逻辑或)
bool notResult = !condition1;              // false (逻辑非)

// 比较运算符
int x = 10;
int y = 20;

bool greater = (x > y);    // false
bool less = (x < y);      // true
bool equal = (x == y);    // false
bool notEqual = (x != y); // true

// 实际应用示例
bool isMarketOpen = MarketInfo(Symbol(), MODE_TRADEALLOWED);
if(isMarketOpen)
  {
   Print("市场开放");
  }
```

### 数组类型

#### 一维数组
```mql4
// 数组声明
int numbers[5];                    // 声明包含5个元素的数组
double prices[];                  // 动态数组，大小不确定
string symbols[3] = {"EURUSD", "GBPUSD", "USDJPY"}; // 初始化数组

// 数组访问
numbers[0] = 10;
numbers[1] = 20;
numbers[2] = 30;

// 数组遍历
for(int i = 0; i < 5; i++)
  {
   Print("numbers[", i, "] = ", numbers[i]);
  }

// 数组大小
int size = ArraySize(numbers);  // 5
```

#### 二维数组
```mql4
// 二维数组
double matrix[3][4];  // 3行4列的矩阵

// 初始化二维数组
matrix[0][0] = 1.0; matrix[0][1] = 2.0; matrix[0][2] = 3.0; matrix[0][3] = 4.0;
matrix[1][0] = 5.0; matrix[1][1] = 6.0; matrix[1][2] = 7.0; matrix[1][3] = 8.0;
matrix[2][0] = 9.0; matrix[2][1] = 10.0; matrix[2][2] = 11.0; matrix[2][3] = 12.0;

// 遍历二维数组
for(int row = 0; row < 3; row++)
  {
   for(int col = 0; col < 4; col++)
     {
      Print("matrix[", row, "][", col, "] = ", matrix[row][col]);
     }
  }
```

#### 动态数组
```mql4
// 动态数组
double dynamicArray[];
ArrayResize(dynamicArray, 10);  // 设置数组大小为10

// 动态调整数组大小
ArrayResize(dynamicArray, 20);   // 扩展到20
ArrayResize(dynamicArray, 5);    // 缩小到5

// 获取数组大小
int size = ArraySize(dynamicArray);

// 复制数组
double sourceArray[] = {1.0, 2.0, 3.0, 4.0, 5.0};
double destArray[];
ArrayCopy(destArray, sourceArray);

// 实际应用：存储价格数据
double priceHistory[];
ArrayResize(priceHistory, 100);
for(int i = 0; i < 100; i++)
  {
   priceHistory[i] = Close[i];
  }
```

## 🔄 运算符

### 算术运算符

#### 基本算术运算
```mql4
int a = 10;
int b = 3;

int sum = a + b;        // 13 (加法)
int diff = a - b;       // 7  (减法)
int product = a * b;    // 30 (乘法)
int quotient = a / b;    // 3  (整数除法)
int remainder = a % b;   // 1  (取模运算)

// 浮点数运算
double price1 = 1.1234;
double price2 = 1.2345;
double sum = price1 + price2;        // 2.3579
double diff = price2 - price1;       // 0.1111

// 实际应用：计算利润
double entryPrice = 1.1000;
double exitPrice = 1.1100;
double lots = 0.1;
double profit = (exitPrice - entryPrice) * lots * 100000;  // 100
```

#### 自增自减运算
```mql4
int x = 10;

x++;     // x = x + 1 = 11
++x;     // x = x + 1 = 12

x--;     // x = x - 1 = 11
--x;     // x = x - 1 = 10

// 前缀和后缀的区别
int y = 5;
int z = y++;  // z = 5, y = 6 (后缀：先使用，后递增)
y = 5;
z = ++y;      // z = 6, y = 6 (前缀：先递增，后使用)

// 实际应用：计数器
int counter = 0;
counter++;  // 计数器递增
```

### 比较运算符

#### 比较运算
```mql4
double price = 1.1000;
double target = 1.1100;

bool result1 = (price == target);  // false (相等)
bool result2 = (price != target);  // true  (不相等)
bool result3 = (price > target);   // false (大于)
bool result4 = (price < target);   // true  (小于)
bool result5 = (price >= target);  // false (大于等于)
bool result6 = (price <= target);  // true  (小于等于)

// 实际应用：价格比较
double currentPrice = Ask;
double stopLossPrice = Ask - 50 * Point;

if(currentPrice <= stopLossPrice)
  {
   Print("触发止损");
  }
```

### 逻辑运算符

#### 逻辑运算
```mql4
bool a = true;
bool b = false;

// 逻辑与 (&&)
bool andResult = a && b;  // false (两个都为true时结果为true)

// 逻辑或 (||)
bool orResult = a || b;   // true  (至少一个为true时结果为true)

// 逻辑非 (!)
bool notResult = !a;      // false (取反)

// 实际应用：复杂条件判断
double price = 1.1000;
double maFast = 1.1050;
double maSlow = 1.0950;

// 金叉：快速MA从下方穿过慢速MA
bool goldenCross = (maFast > maSlow) && (maFast[1] <= maSlow[1]);

// 买入条件：价格低于某个值且市场开放
bool buyCondition = (price < 1.1000) && MarketInfo(Symbol(), MODE_TRADEALLOWED);
```

### 赋值运算符

#### 赋值运算
```mql4
int x = 10;

x += 5;   // x = x + 5 = 15
x -= 3;   // x = x - 3 = 12
x *= 2;   // x = x * 2 = 24
x /= 4;   // x = x / 4 = 6
x %= 4;   // x = x % 4 = 2

// 实际应用：更新变量
double accountBalance = AccountBalance();
double profit = 100;
accountBalance += profit;  // 账户余额增加利润
```

## 🎯 变量和常量

### 变量声明和使用

#### 变量命名规则
```mql4
// 有效的变量名
int counter;
double currentPrice;
string symbolName;
bool isMarketOpen;
int magicNumber_123;

// 无效的变量名
// int 123counter;      // 不能以数字开头
// int class;           // 不能使用关键字
// int my-variable;      // 不能使用连字符

// 推荐的命名风格
int stopLoss;           // 驼峰命名法
int magicNumber;        // 描述性命名
bool hasOpenPosition;  // 布尔变量以is/has开头
```

#### 变量作用域
```mql4
// 全局变量：在所有函数中都可访问
int globalVariable = 10;

void OnTick()
  {
   // 局部变量：只在当前函数中有效
   int localVariable = 20;
   
   Print("全局变量: ", globalVariable);    // 可以访问
   Print("局部变量: ", localVariable);     // 可以访问
  }

void AnotherFunction()
  {
   Print("全局变量: ", globalVariable);    // 可以访问
   // Print("局部变量: ", localVariable);   // 错误：无法访问
  }

// 静态变量：保持值不变
void CountTicks()
  {
   static int tickCount = 0;  // 静态变量
   tickCount++;
   Print("Tick数量: ", tickCount);
  }
```

### 常量定义

#### 常量定义和使用
```mql4
// 使用 #define 定义常量
#define MAX_POSITIONS 5
#define STOP_LOSS_POINTS 50
#define TAKE_PROFIT_POINTS 100

// 使用 const 定义常量
const double RISK_PERCENT = 1.0;
const int MAGIC_NUMBER = 123456;

// 实际应用：限制持仓数量
int positions = OrdersTotal();
if(positions < MAX_POSITIONS)
  {
   Print("可以开仓，当前持仓: ", positions);
  }

// 使用常量设置止损止盈
double stopLoss = Ask - STOP_LOSS_POINTS * Point;
double takeProfit = Ask + TAKE_PROFIT_POINTS * Point;
```

## 📋 输入参数

### 输入参数定义

#### 基本输入参数
```mql4
// 输入参数：可以在EA运行时修改
input double RiskPercent = 1.0;        // 风险百分比
input int    StopLoss = 50;             // 止损点数
input int    TakeProfit = 100;          // 止盈点数
input int    MagicNumber = 123456;     // 魔术数字
input string TradeComment = "MyEA";     // 交易注释
input bool   EnableLogging = true;     // 启用日志

// 参数分组
//+--- 交易参数 ---+
input double LotSize = 0.1;           // 交易手数
input double MaxRisk = 1.0;            // 最大风险
//+--- 技术指标参数 ---+
input int    FastMAPeriod = 10;       // 快速MA周期
input int    SlowMAPeriod = 20;       // 慢速MA周期
```

### 输入参数使用

#### 参数使用示例
```mql4
input double LotSize = 0.1;
input int    StopLoss = 50;
input int    TakeProfit = 100;

int OnInit()
  {
   Print("EA参数:");
   Print("手数: ", LotSize);
   Print("止损: ", StopLoss, " 点");
   Print("止盈: ", TakeProfit, " 点");
   return(INIT_SUCCEEDED);
  }

void OnTick()
  {
   // 使用输入参数计算止损止盈
   double sl = Ask - StopLoss * Point;
   double tp = Ask + TakeProfit * Point;
   
   // 在实际交易中使用这些参数
   // OrderSend(Symbol(), OP_BUY, LotSize, Ask, 3, sl, tp, "MyEA", MagicNumber, 0, clrNONE);
  }
```

## 📊 字符串操作

### 字符串函数

#### 常用字符串函数
```mql4
string text = "Hello, World!";

// 字符串长度
int length = StringLen(text);  // 13

// 字符串连接
string part1 = "Hello";
string part2 = "World";
string result = part1 + ", " + part2 + "!";  // "Hello, World!"

// 字符串比较
string str1 = "EURUSD";
string str2 = "GBPUSD";
bool isEqual = (str1 == str2);  // false

// 子字符串
string subString = StringSubstr(text, 7, 5);  // "World"

// 字符串查找
int pos = StringFind(text, "World");  // 7 (起始位置)

// 字符串替换
string newText = StringReplace(text, "World", "MQL4");  // "Hello, MQL4!"

// 字符串转数字
string priceStr = "1.1234";
double price = StringToDouble(priceStr);  // 1.1234

// 数字转字符串
int number = 123;
string numStr = IntegerToString(number);  // "123"

// 格式化字符串
string message = StringFormat("价格: %.4f, 手数: %.2f", 1.1234, 0.1);
// "价格: 1.1234, 手数: 0.10"
```

### 实际应用

#### 价格信息显示
```mql4
void DisplayPriceInfo()
  {
   string symbol = Symbol();
   double bid = MarketInfo(symbol, MODE_BID);
   double ask = MarketInfo(symbol, MODE_ASK);
   double spread = (ask - bid) / Point;
   
   string message = StringFormat(
      "交易品种: %s\n" +
      "买价: %.5f\n" +
      "卖价: %.5f\n" +
      "点差: %d 点",
      symbol, bid, ask, (int)spread
   );
   
   Comment(message);
  }
```

## 🎯 实战练习

### 练习1：基本数据类型使用

#### 任务要求
```mql4
// 创建一个简单的EA
// 功能：
// 1. 定义各种数据类型的变量
// 2. 使用Print输出这些变量的值
// 3. 演示基本的算术运算
```

#### 参考代码
```mql4
//+------------------------------------------------------------------+
//|                                       DataTypePractice.mq4     |
//+------------------------------------------------------------------+
#property copyright "2026, Practice"
#property version   "1.00"
#property strict

void OnTick()
  {
   // 各种数据类型
   int    integer = 100;
   double floating = 1.2345;
   string text = "MQL4";
   bool   flag = true;
   
   // 输出变量值
   Print("整型: ", integer);
   Print("浮点型: ", floating);
   Print("字符串: ", text);
   Print("布尔型: ", flag);
   
   // 算术运算
   int a = 10, b = 20;
   Print("加法: ", a + b);
   Print("减法: ", a - b);
   Print("乘法: ", a * b);
   Print("除法: ", a / b);
  }
```

### 练习2：数组操作

#### 任务要求
```mql4
// 创建一个程序
// 功能：
// 1. 创建一个数组存储价格数据
// 2. 计算平均价格
// 3. 找出最高和最低价格
```

#### 参考代码
```mql4
//+------------------------------------------------------------------+
//|                                       ArrayPractice.mq4         |
//+------------------------------------------------------------------+
#property copyright "2026, Practice"
#property version   "1.00"
#property strict

void OnTick()
  {
   // 创建价格数组
   double prices[5];
   
   // 填充数组
   for(int i = 0; i < 5; i++)
     {
      prices[i] = Close[i];
     }
   
   // 计算平均价格
   double sum = 0.0;
   for(int i = 0; i < 5; i++)
     {
      sum += prices[i];
     }
   double average = sum / 5;
   
   // 找出最高和最低价格
   double highest = prices[0];
   double lowest = prices[0];
   
   for(int i = 1; i < 5; i++)
     {
      if(prices[i] > highest) highest = prices[i];
      if(prices[i] < lowest)  lowest = prices[i];
     }
   
   // 输出结果
   Print("平均价格: ", average);
   Print("最高价格: ", highest);
   Print("最低价格: ", lowest);
  }
```

## 💡 最佳实践

### 编码规范

#### 命名规范
- ✅ **有意义的变量名**：使用描述性名称
- ✅ **一致的命名风格**：统一使用驼峰命名法
- ✅ **常量大写**：常量使用全大写字母
- ❌ **避免缩写**：除非是广为人知的缩写

#### 代码组织
- ✅ **模块化**：将代码分解为函数
- ✅ **注释清晰**：添加有意义的注释
- ✅ **代码缩进**：保持一致的缩进
- ❌ **避免过长的函数**：单个函数不超过50行

## 🔗 相关资源

- [[MQL4环境搭建与工具配置]] - 开发环境设置
- [[MQL4函数与控制流]] - 函数和控制流
- [[MQL4交易操作基础]] - 交易操作
- [[调试与错误处理]] - 调试技巧

### 官方文档

- **MQL4数据类型**：https://www.mql5.com/en/docs/mql4/basis/types
- **MQL4运算符**：https://www.mql5.com/en/docs/mql4/basis/operators

---
*创建时间: 2026-02-01*  
*分类: 3 Resources*
