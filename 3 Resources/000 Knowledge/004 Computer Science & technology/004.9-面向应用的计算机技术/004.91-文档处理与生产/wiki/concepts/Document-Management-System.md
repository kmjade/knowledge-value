---
aliases: [DMS, Document Management System]
created: 2026-05-30
type: concept
topic: doc-processing
status: reviewed
---
# 文檔管理系統 Document Management System (DMS)

## 定義
DMS 是管理文檔**存儲、版本控制、權限、檢索與生命週期**的軟體系統。擴展至企業範圍則為 ECM (Enterprise Content Management)，納入網頁、郵件、影像等全內容管理。

## 核心內容
| 功能 | 說明 |
|------|------|
| 版本控制 (Versioning) | 主版本 1.0, 2.0; 次版本 1.1 |
| 簽入/簽出 (Check-in/out) | 鎖定機制防止並行衝突 |
| 元數據 (Metadata) | 自訂屬性、分類標籤 |
| 全文檢索 (FTS) | OCR + 反向索引 |
| 權限管控 (ACL) | 基於角色的讀/寫/刪/管 |
| 審計追蹤 (Audit Trail) | 合規記錄 (誰/何時/何事) |
| 保留策略 (Retention) | GDPR/SOX/HIPAA 法規合規 |

## DMS vs 版本控制 (Git)
| 維度 | DMS (SharePoint/Alfresco) | Git (GitHub/GitLab) |
|------|------|------|
| 目標用戶 | 非技術人員 | 開發者/技術寫作者 |
| 文檔類型 | DOCX/PDF/掃描件 | 純文本 (.md/.tex/.rst) |
| 版本模型 | 簽出/簽入 | 提交/分支/合併 |
| 審閱 | 審批流 (Workflow) | Pull Request Review |
| 優點 | 元數據/保留/合規 | 精確 diff/分支/CI/CD |

## 協作技術: OT (Operational Transformation — Google Docs) vs CRDT (Conflict-free Replicated Data Types — Notion/Obsidian) → 即時多人編輯的兩種數學模型

## 相關: [[PDF]] · [[Markdown]] · Sources: [[../sources/source-DocProc-KB]]
