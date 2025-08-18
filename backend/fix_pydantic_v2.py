#!/usr/bin/env python3

"""
修復 Pydantic v2 相容性問題的腳本
"""

import os
import re
from pathlib import Path


def fix_pydantic_config(file_path):
    """修復單個檔案的 Pydantic 配置"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # 修復 Config 類別為 model_config
    config_pattern = r'(\s+)class Config:\s*\n((?:\1\s+.*\n)*)'
    
    def replace_config(match):
        indent = match.group(1)
        config_body = match.group(2)
        
        # 轉換配置項目
        config_body = re.sub(r'(\s+)orm_mode\s*=\s*True', r'\1"from_attributes": True,', config_body)
        config_body = re.sub(r'(\s+)schema_extra\s*=', r'\1"json_schema_extra":', config_body)
        config_body = re.sub(r'(\s+)env_file\s*=', r'\1"env_file":', config_body)
        config_body = re.sub(r'(\s+)env_file_encoding\s*=', r'\1"env_file_encoding":', config_body)
        config_body = re.sub(r'(\s+)case_sensitive\s*=', r'\1"case_sensitive":', config_body)
        
        # 移除多餘的縮排
        config_lines = config_body.split('\n')
        new_config_lines = []
        for line in config_lines:
            if line.strip():
                # 移除一層縮排
                if line.startswith(indent + '    '):
                    new_config_lines.append(indent + line[len(indent) + 4:])
                else:
                    new_config_lines.append(line)
            else:
                new_config_lines.append(line)
        
        new_config_body = '\n'.join(new_config_lines)
        
        return f'{indent}model_config = {{\n{new_config_body}{indent}}}'
    
    content = re.sub(config_pattern, replace_config, content)
    
    # 如果內容有變更，寫回檔案
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ 修復: {file_path}")
        return True
    else:
        print(f"⏭️  跳過: {file_path}")
        return False


def main():
    """主函數"""
    print("🔧 開始修復 Pydantic v2 相容性問題...")
    
    # 要修復的目錄
    directories = [
        Path("app/schemas"),
        Path("app/models"),
        Path("app/core")
    ]
    
    fixed_count = 0
    total_count = 0
    
    for directory in directories:
        if directory.exists():
            for py_file in directory.rglob("*.py"):
                if py_file.name != "__init__.py":
                    total_count += 1
                    if fix_pydantic_config(py_file):
                        fixed_count += 1
    
    print(f"\n📊 修復完成:")
    print(f"   總檔案數: {total_count}")
    print(f"   修復檔案數: {fixed_count}")
    print(f"   跳過檔案數: {total_count - fixed_count}")


if __name__ == "__main__":
    main()
