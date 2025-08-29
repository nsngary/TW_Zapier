"""
應用程式配置設定
"""

from typing import List, Optional
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """應用程式設定類別"""
    
    # 基本應用設定
    APP_NAME: str = Field(default="TW Zapier", description="應用程式名稱")
    APP_VERSION: str = Field(default="1.0.0", description="應用程式版本")
    ENVIRONMENT: str = Field(default="development", description="執行環境")
    DEBUG: bool = Field(default=True, description="除錯模式")
    
    # 伺服器設定
    BACKEND_HOST: str = Field(default="0.0.0.0", description="後端主機位址")
    BACKEND_PORT: int = Field(default=8000, description="後端埠號")
    BACKEND_RELOAD: bool = Field(default=True, description="自動重載")
    
    # CORS 設定
    CORS_ORIGINS: List[str] = Field(
        default=[
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:3002",
            "http://127.0.0.1:3002"
        ],
        description="允許的跨域來源"
    )
    
    # 資料庫設定
    DATABASE_URL: str = Field(
        default="postgresql://tw_zapier:password@localhost:5432/tw_zapier_db",
        description="資料庫連線字串"
    )
    DATABASE_HOST: str = Field(default="localhost", description="資料庫主機")
    DATABASE_PORT: int = Field(default=5432, description="資料庫埠號")
    DATABASE_NAME: str = Field(default="tw_zapier_db", description="資料庫名稱")
    DATABASE_USER: str = Field(default="tw_zapier", description="資料庫使用者")
    DATABASE_PASSWORD: str = Field(default="password", description="資料庫密碼")
    
    # Redis 設定
    REDIS_URL: str = Field(default="redis://localhost:6379/0", description="Redis 連線字串")
    REDIS_HOST: str = Field(default="localhost", description="Redis 主機")
    REDIS_PORT: int = Field(default=6379, description="Redis 埠號")
    REDIS_DB: int = Field(default=0, description="Redis 資料庫編號")
    REDIS_PASSWORD: Optional[str] = Field(default=None, description="Redis 密碼")
    
    # JWT 認證設定
    JWT_SECRET_KEY: str = Field(
        default="your-super-secret-jwt-key-change-this-in-production",
        description="JWT 密鑰"
    )
    JWT_ALGORITHM: str = Field(default="HS256", description="JWT 演算法")
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=30, description="存取權杖過期時間(分鐘)")
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = Field(default=7, description="重新整理權杖過期時間(天)")
    
    # n8n 設定
    N8N_HOST: str = Field(default="localhost", description="n8n 主機")
    N8N_PORT: int = Field(default=5678, description="n8n 埠號")
    N8N_PROTOCOL: str = Field(default="http", description="n8n 協定")
    N8N_BASIC_AUTH_ACTIVE: bool = Field(default=True, description="n8n 基本認證")
    N8N_BASIC_AUTH_USER: str = Field(default="admin", description="n8n 認證使用者")
    N8N_BASIC_AUTH_PASSWORD: str = Field(default="admin123", description="n8n 認證密碼")
    N8N_WEBHOOK_URL: str = Field(default="http://localhost:5678", description="n8n Webhook URL")
    
    # 台灣在地服務 API 設定
    LINE_PAY_CHANNEL_ID: Optional[str] = Field(default=None, description="Line Pay 頻道 ID")
    LINE_PAY_CHANNEL_SECRET: Optional[str] = Field(default=None, description="Line Pay 頻道密鑰")
    LINE_PAY_SANDBOX: bool = Field(default=True, description="Line Pay 沙盒模式")
    LINE_PAY_API_URL: str = Field(
        default="https://sandbox-api-pay.line.me",
        description="Line Pay API URL"
    )
    
    ECPAY_MERCHANT_ID: Optional[str] = Field(default=None, description="綠界商店代號")
    ECPAY_HASH_KEY: Optional[str] = Field(default=None, description="綠界 Hash Key")
    ECPAY_HASH_IV: Optional[str] = Field(default=None, description="綠界 Hash IV")
    ECPAY_SANDBOX: bool = Field(default=True, description="綠界測試模式")
    ECPAY_API_URL: str = Field(
        default="https://payment-stage.ecpay.com.tw",
        description="綠界 API URL"
    )
    
    # 日誌設定
    LOG_LEVEL: str = Field(default="INFO", description="日誌等級")
    LOG_FORMAT: str = Field(default="json", description="日誌格式")
    LOG_FILE_PATH: str = Field(default="logs/app.log", description="日誌檔案路徑")
    
    # 安全性設定
    ENABLE_RATE_LIMITING: bool = Field(default=True, description="啟用速率限制")
    RATE_LIMIT_PER_MINUTE: int = Field(default=60, description="每分鐘請求限制")
    MAX_UPLOAD_SIZE: str = Field(default="10MB", description="最大上傳檔案大小")

    # 開發工具設定
    ENABLE_SWAGGER_UI: bool = Field(default=True, description="啟用 Swagger UI")
    ENABLE_REDOC: bool = Field(default=True, description="啟用 ReDoc")
    ENABLE_DEBUG_TOOLBAR: bool = Field(default=True, description="啟用除錯工具列")
    
    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": True
    }


# 建立全域設定實例
settings = Settings()
