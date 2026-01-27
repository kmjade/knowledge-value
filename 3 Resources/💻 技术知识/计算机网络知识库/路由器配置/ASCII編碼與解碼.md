---
title: ASCII 編碼與解碼
date: 2026-01-24
tags: [ASCII, 編碼, 解碼, 字符集, 轉換, 字符編碼, 數據處理]
para: resources
domain: [計算機基礎, 編碼原理]
subtopic: ASCII編碼
status: active
language: zh-tw
---

# ASCII 編碼與解碼

> [!info] 概述
> ASCII（American Standard Code for Information Interchange）是計算機中最基本的字符編碼標準，本文檔介紹 ASCII 編碼原理、解碼方法和實際應用。

---

## 一、ASCII 基礎

### 1.1 什麼是 ASCII

ASCII 是一種將字母、數字、符號轉換為數字的編碼標準。

| 類型 | 範圍 | 數量 |
|------|------|------|
| **控制字符** | 0-31 | 32 個 |
| **可打印字符** | 32-126 | 95 個 |
| **擴展 ASCII** | 128-255 | 128 個 |

### 1.2 常用 ASCII 對照表

| 十進制 | 十六進制 | 字符 | 說明 |
|--------|----------|------|------|
| 32 | 0x20 | 空格 | 空白字符 |
| 48 | 0x30 | 0 | 數字 0 |
| 49 | 0x31 | 1 | 數字 1 |
| ... | ... | ... | ... |
| 65 | 0x41 | A | 大寫字母 A |
| 97 | 0x61 | a | 小寫字母 a |
| 120 | 0x78 | x | 小寫字母 x |
| 121 | 0x79 | y | 小寫字母 y |

### 1.3 完整對照表（32-126）

```
32:空格  33:!  34:"  35:#  36:$  37:%  38:&  39:'  40:(  41:)
42:*  43:+  44:,  45:-  46:.  47:/  48:0  49:1  50:2  51:3
52:4  53:5  54:6  55:7  56:8  57:9  58::  59:;  60:<  61:=
62:>  63:?  64:@  65:A  66:B  67:C  68:D  69:E  70:F  71:G
72:H  73:I  74:J  75:K  76:L  77:M  78:N  79:O  80:P  81:Q
82:R  83:S  84:T  85:U  86:V  87:W  88:X  89:Y  90:Z  91:[
92:\  93:]  94:^  95:_  96:`  97:a  98:b  99:c  100:d  101:e
102:f  103:g  104:h  105:i  106:j  107:k  108:l  109:m  110:n  111:o
112:p  113:q  114:r  115:s  116:t  117:u  118:v  119:w  120:x  121:y
122:z  123:{  124:|  125:}  126:~
```

---

## 二、編碼與解碼

### 2.1 編碼（字符 → ASCII）

```python
# Python - 字符轉 ASCII
char = 'A'
ascii_code = ord(char)
print(f"'{char}' 的 ASCII 碼: {ascii_code}")  # 輸出: 65

# 多個字符
text = "Hello"
ascii_codes = [ord(c) for c in text]
print(f"'{text}' 的 ASCII 碼: {ascii_codes}")
# 輸出: [72, 101, 108, 108, 111]
```

```javascript
// JavaScript - 字符轉 ASCII
const char = 'A';
const asciiCode = char.charCodeAt(0);
console.log(`'${char}' 的 ASCII 碼: ${asciiCode}`);  // 輸出: 65
```

### 2.2 解碼（ASCII → 字符）

```python
# Python - ASCII 轉字符
ascii_codes = [72, 101, 108, 108, 111]
text = ''.join(chr(code) for code in ascii_codes)
print(f"ASCII 轉字符: {text}")  # 輸出: Hello
```

```javascript
// JavaScript - ASCII 轉字符
const asciiCodes = [72, 101, 108, 108, 111];
const text = String.fromCharCode(...asciiCodes);
console.log(`ASCII 轉字符: ${text}`);  // 輸出: Hello
```

### 2.3 URL 編碼轉換

```python
# Python - URL 編碼轉換
from urllib.parse import unquote

# URL 編碼格式 (%XX)
url_encoded = "xipigsqehqmr98168856"
# URL 編碼版本可能是 "xipigsqehqmr98168856"（無需轉換）

print(f"URL 解碼: {url_encoded}")
```

---

## 三、實際應用

### 3.1 光貓密碼解密案例

| 步驟 | 內容 |
|------|------|
| **原始數據** | `120&105&112&105&103&115&113&101&104&113&109&114&57&56&49&54&56&56&53&54&` |
| **提取數字** | `[120,105,112,105,103,115,113,101,104,113,109,114,57,56,49,54,56,56,53,54]` |
| **轉換為字符** | `xipigsqehqmr98168856` |

### 3.2 自動化腳本

```python
#!/usr/bin/env python3
"""
光貓超級密碼解密工具
"""

def decode_光貓密碼(encoded_string):
    """
    解碼光貓密碼
    輸入格式: "120&105&112&105&..."
    """
    # 移除結尾的 & 並分割
    codes = encoded_string.rstrip('&').split('&')

    # 轉換為字符
    password = ''.join(chr(int(code)) for code in codes)

    return password

# 使用示例
encoded = "120&105&112&105&103&115&113&101&104&113&109&114&57&56&49&54&56&56&53&54&"
decoded = decode_光貓密碼(encoded)
print(f"解碼前: {encoded}")
print(f"解碼後: {decoded}")
```

### 3.3 在線工具

| 網站 | 網址 | 功能 |
|------|------|------|
| ASCIITable | asciitable.com | ASCII 對照表 |
| RapidTables | rapidtables.com | ASCII 轉換器 |
| CyberChef | gchq.github.io | 綜合解碼 |

---

## 四、擴展知識

### 4.1 與其他編碼的關係

| 編碼 | 說明 | 字符範圍 |
|------|------|----------|
| **ASCII** | 基礎編碼 | 0-127 |
| **ANSI/Windows-1252** | 擴展 ASCII | 0-255 |
| **UTF-8** | Unicode 變長編碼 | 全球字符 |
| **GB2312/GBK** | 中文編碼 | 中文 |

### 4.2 Python 編碼處理

```python
# 處理不同編碼
text = "Hello World 中文"

# UTF-8 編碼
utf8_bytes = text.encode('utf-8')
print(f"UTF-8: {utf8_bytes}")

# GBK 編碼（中文 Windows）
gbk_bytes = text.encode('gbk')
print(f"GBK: {gbk_bytes}")

# 解碼
decoded_utf8 = utf8_bytes.decode('utf-8')
decoded_gbk = gbk_bytes.decode('gbk')
```

---

## 五、常見問題

| 問題 | 解答 |
|------|------|
| ASCII 和 Unicode 有什麼區別？ | ASCII 只有 128 個字符，Unicode 包含全球字符 |
| 為什麼有些字符顯示為問號？ | 可能是編碼不匹配或字符集不支持 |
| 如何處理中文？ | 需要使用 UTF-8 或 GBK 等多字節編碼 |

---

## 六、總結

| 要點 | 說明 |
|------|------|
| **核心概念** | ASCII 將字符映射為數字 |
| **常用函數** | `ord()` 轉 ASCII，`chr()` 轉字符 |
| **應用場景** | 密碼解密、數據傳輸、編程處理 |
| **注意事項** | 注意字符編碼兼容性 |

---

## 參考資源

| 來源 | 連結 |
|------|------|
| ASCII 維基百科 | https://zh.wikipedia.org/wiki/ASCII |
| ASCIITable | https://www.asciitable.com/ |
| W3Schools | https://www.w3schools.com/charsets/ref_html_ascii.asp |
