---
title: Python FAQ
tags: [DDC/004.432, python, faq]
created: 2026-05-30
aliases: [Python常见问题]
---

# Python 常見問題 FAQ

## 安裝與環境

**Q: pyenv vs venv vs poetry 該用哪個？**  
A: 三者職責不同——pyenv 管理 Python 版本，venv 管理虛擬環境隔離，poetry 管理依賴鎖定。推薦組合：pyenv + poetry。

**Q: pip install 報 SSL 錯誤？**  
A: `pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org <pkg>` 或更新 certifi。

**Q: ModuleNotFoundError: No module named 'xxx'？**  
A: 確認已激活虛擬環境 (`source .venv/bin/activate`) 且 `pip list` 中有該模塊。

## 語法與類型

**Q: `is` vs `==` 的區別？**  
A: `is` 比較對象身份（同一內存地址），`==` 比較值相等。永遠用 `is None` 而非 `== None`。

**Q: `*args` 和 `**kwargs` 什麼時候用？**  
A: `*args` 接收任意數量位置參數，`**kwargs` 接收任意關鍵字參數。裝飾器、代理函數常用。

**Q: GIL 是什麼？為什麼多線程沒有加速？**  
A: Global Interpreter Lock——CPython 同一時刻只有一個線程執行 Python 字節碼。CPU 密集任務用 `multiprocessing`，I/O 密集用 `threading` 或 `asyncio`。

## 性能

**Q: 為什麼我的 Python 比 C 慢 100 倍？**  
A: 動態類型/解釋執行/對象開銷。優化路徑：算法 → 數據結構 → Cython/Numba → 重寫為 C 擴展。

**Q: 列表推導 vs 生成器表達式？**  
A: 列表推導 `[x for x in data]` 一次生成全部，耗內存。生成器 `(x for x in data)` 惰性求值，省內存。

**Q: DataFrame 遍歷為什麼這麼慢？**  
A: 不要用 `iterrows()`。用 `df.apply()` 或向量化操作 `df['col'] * 2`。

## 部署

**Q: requirements.txt vs pyproject.toml？**  
A: `pyproject.toml` 是現代標準（PEP 621），支持依賴分組。`requirements.txt` 是遺留格式。

**Q: Docker 中 Python 鏡像該選哪個？**  
A: `python:3.12-slim`（生產）或 `python:3.12-alpine`（極小）。避免用 `latest`。
