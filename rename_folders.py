#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量重命名文件夾和文件的腳本
"""

import os
import shutil

# 簡繁對照表（文件夾名稱）
FOLDER_MAPPINGS = {
    '技术': '技術',
    '基础概念': '基礎概念',
    '工作流': '工作流',
    '专业知识': '專業知識',
    '知识': '知識',
    'AI 知识': 'AI 知識',
}

def rename_folders(base_path):
    """
    遞歸重命名文件夾
    """
    for root, dirs, files in os.walk(base_path, topdown=False):
        for dir_name in dirs:
            old_path = os.path.join(root, dir_name)
            new_name = dir_name

            # 檢查是否需要重命名
            for simplified, traditional in FOLDER_MAPPINGS.items():
                if simplified in dir_name:
                    new_name = dir_name.replace(simplified, traditional)
                    break

            if new_name != dir_name:
                new_path = os.path.join(root, new_name)
                try:
                    shutil.move(old_path, new_path)
                    print(f"Renamed: {dir_name} -> {new_name}")
                except Exception as e:
                    print(f"Error renaming {dir_name}: {e}")

def main():
    base_path = "3 Resources/01-Tech/🧠 AI 知識(舊)"
    if os.path.exists(base_path):
        rename_folders(base_path)
        print("Folder renaming completed")
    else:
        print(f"Path not found: {base_path}")

if __name__ == '__main__':
    main()
