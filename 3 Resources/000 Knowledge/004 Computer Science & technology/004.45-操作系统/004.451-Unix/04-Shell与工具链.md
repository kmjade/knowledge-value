---
title: Shell 與工具鏈 — Shell & Toolchain
aliases: [Unix Shell, Bourne Shell, Unix 工具链, awk sed grep]
tags: [DDC/004.451, unix, os, shell, tools]
created: 2026-05-30
updated: 2026-05-30
---

# Shell 與工具鏈 — Shell & Toolchain

> Unix 的強大來自於它的小工具哲學和 pipe 組合模式。The power of Unix comes from its small-tool philosophy and the pipe composition pattern.

## Bourne Shell (sh) — 命令直譯器

Stephen Bourne 於 1977 年為 Version 7 Unix 開發的 Shell，定義了 Unix Shell 的標準語法：
- **變數賦值**：`VAR=value` (等號兩側不能有空格)
- **環境變數**：`export VAR`
- **流程控制**：`if/then/else/fi`, `for/do/done`, `while/do/done`, `case/esac`
- **Here Document**：`<<EOF ... EOF`
- **後台執行**：`command &`
- **Pipe**：`cmd1 | cmd2`

### Shell 家族

| Shell | 作者 | 特性 |
|-------|------|------|
| **sh** (Bourne) | Stephen Bourne, 1977 | 標準 Shell，所有 Shell 的基礎 |
| **csh** (C Shell) | Bill Joy, 1978 | C 風格語法，歷史記錄，作業控制 |
| **tcsh** | Ken Greer, 1981 | csh 增強版，命令補全，拼寫校正 |
| **ksh** (Korn) | David Korn, 1983 | sh 增強，命令列編輯，浮點運算 |
| **bash** (Bourne Again) | Brian Fox, 1989 | GNU 專案，sh + csh + ksh 融合 |

## Pipe Pattern — Unix 的程式設計範式

```
stdin → [程式A] → stdout | stdin → [程式B] → stdout | ...
```

Pipe (`|`) 將前一個程式的 stdout 連接到下一個程式的 stdin，形成處理管道（pipeline）。這是 Unix 最強大的設計模式：

```bash
# 找出最佔空間的 5 個目錄
du -sh /* 2>/dev/null | sort -rh | head -5

# 統計 Apache 日誌中最常見的 IP
cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -10
```

## 核心工具鏈 Core Toolchain

### awk — 模式掃描與處理語言
Aho, Weinberger, Kernighan 於 1977 年創造。以行為單位處理文字，支援欄位分割、模式匹配和計算：
```bash
awk '{print $1, $3}' data.txt           # 輸出第 1、3 欄
awk '/pattern/ {sum += $2} END {print sum}'  # 匹配並累加
```

### sed — 串流編輯器 Stream Editor
非互動式的文字轉換工具，核心指令：`s` (替換), `d` (刪除), `p` (列印), `a/i` (新增/插入)：
```bash
sed 's/old/new/g' file.txt              # 全域替換
sed '/pattern/d' file.txt               # 刪除匹配行
sed -n '5,10p' file.txt                 # 列印第 5-10 行
```

### grep — 全域正則表達式列印
源自 ed 編輯器的 `g/re/p` 命令。支援基本 (BRE) 和擴展 (ERE) 正則表達式：
```bash
grep 'pattern' file.txt                 # 基本搜尋
grep -r 'TODO' src/                     # 遞迴搜尋
grep -v 'exclude' file.txt              # 反向匹配
grep -c 'error' log.txt                 # 計數
```

### 其他關鍵工具

| 工具 | 用途 | 備註 |
|------|------|------|
| **make** | 自動化建置 | Stuart Feldman, 1977，依賴追蹤 |
| **lex** | 詞法分析器生成 | Mike Lesk, 1975，產生 C 原始碼 |
| **yacc** | 語法分析器生成 | Stephen Johnson, 1975 (Yet Another Compiler Compiler) |
| **troff/nroff** | 文件排版 | Joe Ossanna，Unix 文件系統 |
| **sort/uniq** | 排序與去重 | 資料處理基石 |
| **cut/paste** | 欄位操作 | 表格式資料處理 |
| **find/xargs** | 檔案搜尋與批次處理 | 強大的組合操作 |
| **diff/patch** | 差異比較與修補 | Larry Wall 的 patch 程式 |

## 正則表達式 Regex in Unix

Unix 工具廣泛使用正則表達式。基本語法元素：
- `.` — 任意單字元
- `*` — 零個或多個前導字元
- `^` / `$` — 行首/行尾
- `[abc]` — 字元類別
- `\(` `\)` — 捕獲群組 (BRE)
- `+` / `?` / `|` — ERE 擴展 (egrep/awk)

---

> "This is the Unix philosophy: Write programs that do one thing and do it well. Write programs to work together." — Doug McIlroy
