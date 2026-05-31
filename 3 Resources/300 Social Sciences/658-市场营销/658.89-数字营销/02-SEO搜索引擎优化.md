---
aliases: [SEO Search Engine Optimization, SEO搜索引擎优化]
created: 2026-06-01
type: concept
tags: [DDC/658.89, marketing, digital, seo]
status: evergreen
---

# 02 SEO 搜索引擎優化

> SEO 三階段：爬蟲 (Crawl) → 索引 (Index) → 排名 (Rank)。技術 SEO + 內容 SEO + 外部 SEO。Google 算法演進與百度差異。

## 搜索引擎工作原理

| 階段 | 過程 | 關鍵因素 | 工具 |
|------|------|----------|------|
| Crawl 爬取 | Spider 發現與抓取頁面 | robots.txt, XML Sitemap, 內部鏈接結構 | Screaming Frog, 百度站長 |
| Index 索引 | 解析內容並存入數據庫 | Canonical URL, Schema 標記, 無重複內容 | Google Search Console, 百度資源平台 |
| Rank 排名 | 根據算法排序結果 | 相關性, 權威度, 用戶體驗信號 | Ahrefs, SEMrush, 愛站 |

## 關鍵詞研究

| 類型 | 定義 | 示例 | 研究工具 |
|------|------|------|----------|
| 導航詞 | 搜索特定品牌/網站 | "Nike 官網" | Google Search Console |
| 信息詞 | 尋找資訊/答案 | "如何做 SEO" | Ahrefs Keywords Explorer |
| 商業詞 | 比較/評估產品 | "最佳 CRM 軟件" | SEMrush |
| 交易詞 | 購買意圖明確 | "購買 iPhone 15" | Google Keyword Planner |
| 長尾詞 | 3+ 詞組合, 低搜索量高轉化 | "2024 香港 SEO 公司推薦" | AnswerThePublic |

## 技術 SEO 檢查清單

| 項目 | 說明 | 權重 |
|------|------|:----:|
| Core Web Vitals | LCP < 2.5s, FID < 100ms, CLS < 0.1 | 高 |
| Mobile-Friendly | 移動端響應式設計, 可讀性 | 高 |
| HTTPS | 全站 SSL 證書 | 高 |
| Schema Markup | 結構化數據 (Article, Product, FAQ) | 中 |
| XML Sitemap | 提交至 GSC, 動態更新 | 中 |
| Canonical Tags | 避免重複內容懲罰 | 中 |
| URL Structure | 簡短、包含關鍵詞、層級清晰 | 低 |
| 404/301 管理 | 死鏈檢測與重定向 | 中 |

## On-Page vs Off-Page SEO

| 維度 | On-Page SEO | Off-Page SEO |
|------|-------------|--------------|
| 定義 | 頁面內優化 | 頁面外信號 |
| 元素 | Title, Meta Description, H1-H6, 內容質量, 內部鏈接, 圖片 Alt | 外鏈 (Backlinks), 社交信號, Brand Mentions |
| 可控性 | 高 (直接修改) | 低 (需外部獲取) |
| 關鍵指標 | 關鍵詞密度, 內容長度, 可讀性 | Domain Authority (DA), 引用域數量 |
| 工具 | Yoast SEO, Surfer SEO | Ahrefs, Moz, Majestic |

## Google 重大算法更新

| 更新名稱 | 年份 | 核心影響 | 應對策略 |
|----------|------|----------|----------|
| Panda | 2011 | 打擊低質量/薄內容 | 原創深度內容 |
| Penguin | 2012 | 打擊垃圾外鏈 | 自然外鏈建設 |
| Hummingbird | 2013 | 語義搜索, 理解意圖 | 主題聚類而非單詞 |
| RankBrain | 2015 | AI 排序因子 | 用戶體驗信號優化 |
| BERT | 2019 | 自然語言理解 | 對話式內容 |
| Helpful Content | 2022+ | 以人為本的內容 | 第一手經驗, 專家作者 |

## 中國搜索引擎 (百度 vs 360 vs 搜狗)

| 維度 | 百度 | 360 搜索 | 搜狗 |
|------|------|----------|------|
| 市佔率 | ~65% | ~20% | ~10% |
| 站長平台 | 百度資源平台 | 360 站長平台 | 搜狗站長平台 |
| 特色 | 熊掌號, 百家號, 智能小程序 | 安全檢測嚴格 | 微信/知乎內容接入 |
| SEO 難度 | 高, 廣告位多 | 中 | 中 |
