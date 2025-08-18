"""
日誌設定和管理
"""

import logging
import logging.config
import sys
import json
from datetime import datetime
from pathlib import Path
from typing import Any, Dict

from app.core.config import settings


class JSONFormatter(logging.Formatter):
    """
    JSON 格式的日誌格式化器
    """
    
    def format(self, record: logging.LogRecord) -> str:
        log_entry = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
        }
        
        # 添加額外的上下文資訊
        if hasattr(record, "request_id"):
            log_entry["request_id"] = record.request_id
        
        if hasattr(record, "user_id"):
            log_entry["user_id"] = record.user_id
        
        if hasattr(record, "workflow_id"):
            log_entry["workflow_id"] = record.workflow_id
        
        # 添加異常資訊
        if record.exc_info:
            log_entry["exception"] = self.formatException(record.exc_info)
        
        return json.dumps(log_entry, ensure_ascii=False)


class ColoredFormatter(logging.Formatter):
    """
    彩色控制台日誌格式化器
    """
    
    # 顏色代碼
    COLORS = {
        'DEBUG': '\033[36m',      # 青色
        'INFO': '\033[32m',       # 綠色
        'WARNING': '\033[33m',    # 黃色
        'ERROR': '\033[31m',      # 紅色
        'CRITICAL': '\033[35m',   # 紫色
        'RESET': '\033[0m'        # 重置
    }
    
    def format(self, record: logging.LogRecord) -> str:
        # 添加顏色
        color = self.COLORS.get(record.levelname, self.COLORS['RESET'])
        reset = self.COLORS['RESET']
        
        # 格式化時間戳
        timestamp = datetime.fromtimestamp(record.created).strftime('%Y-%m-%d %H:%M:%S')
        
        # 建立日誌訊息
        log_message = (
            f"{color}[{timestamp}] {record.levelname:8} "
            f"{record.name}:{record.lineno} - {record.getMessage()}{reset}"
        )
        
        # 添加異常資訊
        if record.exc_info:
            log_message += f"\n{self.formatException(record.exc_info)}"
        
        return log_message


def setup_logging():
    """
    設定應用程式日誌
    """
    # 確保日誌目錄存在
    log_dir = Path(settings.LOG_FILE_PATH).parent
    log_dir.mkdir(parents=True, exist_ok=True)
    
    # 根據設定選擇格式化器
    if settings.LOG_FORMAT.lower() == "json":
        formatter_class = JSONFormatter
        console_formatter_class = ColoredFormatter  # 控制台仍使用彩色格式
    else:
        formatter_class = ColoredFormatter
        console_formatter_class = ColoredFormatter
    
    # 日誌配置
    logging_config = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "default": {
                "()": formatter_class,
            },
            "console": {
                "()": console_formatter_class,
            },
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "level": settings.LOG_LEVEL,
                "formatter": "console",
                "stream": sys.stdout,
            },
            "file": {
                "class": "logging.handlers.RotatingFileHandler",
                "level": settings.LOG_LEVEL,
                "formatter": "default",
                "filename": settings.LOG_FILE_PATH,
                "maxBytes": 10485760,  # 10MB
                "backupCount": 5,
                "encoding": "utf-8",
            },
        },
        "loggers": {
            "app": {
                "level": settings.LOG_LEVEL,
                "handlers": ["console", "file"],
                "propagate": False,
            },
            "uvicorn": {
                "level": "INFO",
                "handlers": ["console", "file"],
                "propagate": False,
            },
            "uvicorn.access": {
                "level": "INFO",
                "handlers": ["file"],
                "propagate": False,
            },
            "sqlalchemy.engine": {
                "level": "WARNING",
                "handlers": ["file"],
                "propagate": False,
            },
        },
        "root": {
            "level": settings.LOG_LEVEL,
            "handlers": ["console", "file"],
        },
    }
    
    # 應用日誌配置
    logging.config.dictConfig(logging_config)
    
    # 設定第三方套件的日誌等級
    logging.getLogger("httpx").setLevel(logging.WARNING)
    logging.getLogger("httpcore").setLevel(logging.WARNING)
    logging.getLogger("asyncio").setLevel(logging.WARNING)
    
    logger = logging.getLogger("app.core.logging")
    logger.info(f"日誌系統初始化完成 - 等級: {settings.LOG_LEVEL}, 格式: {settings.LOG_FORMAT}")


def get_logger(name: str) -> logging.Logger:
    """
    取得指定名稱的日誌記錄器
    """
    return logging.getLogger(f"app.{name}")


class LoggerAdapter(logging.LoggerAdapter):
    """
    日誌適配器，用於添加上下文資訊
    """
    
    def process(self, msg: Any, kwargs: Dict[str, Any]) -> tuple:
        # 添加額外的上下文資訊到日誌記錄
        if self.extra:
            for key, value in self.extra.items():
                if hasattr(self.logger, key):
                    continue
                setattr(self.logger, key, value)
        
        return msg, kwargs


def get_context_logger(name: str, **context) -> LoggerAdapter:
    """
    取得帶有上下文資訊的日誌記錄器
    """
    logger = get_logger(name)
    return LoggerAdapter(logger, context)
