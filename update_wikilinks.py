#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
更新 wikilinks 中簡體中文為繁體中文
"""

import os
import re
import sys
import io

# Wikilink 映射表
WIKILINK_MAPPINGS = {
    'obsidian知识库': 'obsidian知識庫',
    'Python学习项目': 'Python學習項目',
    '阅读分析拆解工作流': '閱讀分析拆解工作流',
    '阅读分析拆解工作流项目': '閱讀分析拆解工作流專案',
    'Ollama本地开发闭环-分析报告': 'Ollama本地開發閉環-分析報告',
    'Python知识库导航': 'Python知識庫導航',
    '学习项目': '學習項目',
    'AI 知识': 'AI 知識',
    '专业知识': '專業知識',
    '知识管理系统': '知識管理系統',
    '知识管理': '知識管理',
    '知识库': '知識庫',
    '知识卡片': '知識卡片',
    '知识': '知識',
    '学习': '學習',
    '项目': '專案',
    '开发': '開發',
    '工作流': '工作流',
    '方法': '方法',
    '系统': '系統',
    '效率': '效率',
    '优化': '優化',
    '分析': '分析',
    '设计': '設計',
    '管理': '管理',
    '指南': '指南',
    '教程': '教程',
    '文档': '文檔',
    '笔记': '筆記',
    '记录': '記錄',
    '文件': '檔案',
    '文件夹': '資料夾',
    '目录': '目錄',
    '链接': '連結',
    '搜索': '搜尋',
    '查找': '尋找',
    '查询': '查詢',
    '创建': '創建',
    '更新': '更新',
    '删除': '刪除',
    '添加': '新增',
    '编辑': '編輯',
    '修改': '修改',
    '保存': '儲存',
    '读取': '讀取',
    '写入': '寫入',
    '查看': '查看',
    '显示': '顯示',
    '设置': '設置',
    '配置': '配置',
    '测试': '測試',
    '调试': '除錯',
    '部署': '部署',
    '安装': '安裝',
    '卸载': '移除',
    '更新': '更新',
    '版本': '版本',
    '备份': '備份',
    '恢复': '恢復',
    '修复': '修復',
    '性能': '效能',
    '资源': '資源',
    '场景': '場景',
    '数据': '數據',
    '信息': '資訊',
    '隐私': '隱私',
    '保护': '保護',
    '传输': '傳輸',
    '网络': '網路',
    '连接': '連接',
    '通信': '通訊',
    '下载': '下載',
    '上传': '上傳',
    '分享': '分享',
    '发布': '發佈',
    '订阅': '訂閱',
    '关注': '關注',
    '收藏': '收藏',
    '点赞': '按讚',
    '评论': '評論',
    '回复': '回覆',
    '转发': '轉發',
    '标记': '標記',
    '标签': '標籤',
    '分类': '分類',
    '归类': '歸類',
    '整理': '整理',
    '排序': '排序',
    '筛选': '篩選',
    '浏览': '瀏覽',
    '预览': '預覽',
    '打印': '列印',
    '输出': '輸出',
    '输入': '輸入',
}

def update_wikilinks_in_file(filepath):
    """
    更新文件中的 wikilinks
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # 更新 wikilinks [[...]]
        # 匹配 [[something]] 或 [[something|text]]
        wikilink_pattern = r'\[\[([^\]]+)\]\]'

        def replace_wikilink(match):
            link_text = match.group(1)
            # 分離 | 前的鏈接和別名
            if '|' in link_text:
                link, alias = link_text.split('|', 1)
            else:
                link = link_text
                alias = None

            # 替換鏈接中的簡體中文
            new_link = link
            for simplified, traditional in sorted(WIKILINK_MAPPINGS.items(),
                                                   key=lambda x: len(x[0]),
                                                   reverse=True):
                if simplified in link:
                    new_link = link.replace(simplified, traditional)
                    break

            # 如果別名中也有簡體，也替換
            new_alias = alias
            if alias:
                for simplified, traditional in sorted(WIKILINK_MAPPINGS.items(),
                                                       key=lambda x: len(x[0]),
                                                       reverse=True):
                    if simplified in alias:
                        new_alias = alias.replace(simplified, traditional)
                        break

            # 重組
            if alias:
                return f'[[{new_link}|{new_alias}]]'
            else:
                return f'[[{new_link}]]'

        content = re.sub(wikilink_pattern, replace_wikilink, content)

        # 更新標籤 #tag
        for simplified, traditional in WIKILINK_MAPPINGS.items():
            # 匹配 #簡體中文
            content = re.sub(rf'(?<!\S)#{simplified}(?!\S)', f'#{traditional}', content)

        # 更新 frontmatter
        for simplified, traditional in WIKILINK_MAPPINGS.items():
            # 匹配 key: value 格式
            content = re.sub(rf'(^.*{simplified}.*$)', rf'# {traditional}', content, flags=re.MULTILINE)
            content = re.sub(rf'(\"|\'){simplified}(\"|\')', rf'\1{traditional}\2', content)

        # 如果有變化，寫回文件
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False

    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    # 設置標準輸出為 UTF-8
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    base_path = "."

    # 查找所有 markdown 文件
    md_files = []
    for root, dirs, files in os.walk(base_path):
        # 跳過 .git 文件夾
        if '.git' in root:
            continue
        for file in files:
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))

    print(f"Found {len(md_files)} markdown files")

    updated_count = 0
    for filepath in md_files:
        if update_wikilinks_in_file(filepath):
            updated_count += 1
            print(f"Updated: {filepath}")

    print(f"\nTotal updated: {updated_count} files")

if __name__ == '__main__':
    main()
