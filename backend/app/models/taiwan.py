"""
台灣在地化服務相關的 SQLAlchemy 模型
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Float, Enum
from sqlalchemy.dialects.postgresql import UUID, JSONB, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum
from datetime import datetime

from app.core.database import Base


class PaymentProvider(enum.Enum):
    """台灣金流服務提供商"""
    LINE_PAY = "line_pay"
    ECPAY = "ecpay"
    NEWEBPAY = "newebpay"
    SPGATEWAY = "spgateway"
    TAPPAY = "tappay"
    ESUNBANK = "esunbank"


class PaymentMethod(enum.Enum):
    """付款方式"""
    CREDIT_CARD = "credit_card"
    ATM = "atm"
    CVS = "cvs"  # 超商代碼
    BARCODE = "barcode"  # 超商條碼
    APPLE_PAY = "apple_pay"
    GOOGLE_PAY = "google_pay"
    SAMSUNG_PAY = "samsung_pay"


class PaymentStatus(enum.Enum):
    """付款狀態"""
    PENDING = "pending"
    PROCESSING = "processing"
    SUCCESS = "success"
    FAILED = "failed"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"
    PARTIAL_REFUNDED = "partial_refunded"


class TaiwanPaymentConfig(Base):
    """
    台灣金流服務配置模型
    """
    __tablename__ = "taiwan_payment_configs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    
    # 服務提供商資訊
    provider = Column(Enum(PaymentProvider), nullable=False, index=True)
    config_name = Column(String(100), nullable=False)  # 使用者自定義名稱
    
    # API 配置
    merchant_id = Column(String(100), nullable=False)
    api_key_encrypted = Column(Text, nullable=False)  # 加密儲存
    api_secret_encrypted = Column(Text, nullable=True)  # 加密儲存
    
    # 環境設定
    is_sandbox = Column(Boolean, default=True, nullable=False)
    api_endpoint = Column(String(500), nullable=True)  # 自定義端點
    
    # 支援的付款方式
    supported_methods = Column(ARRAY(Enum(PaymentMethod)), nullable=False)
    
    # 設定參數
    configuration = Column(JSONB, nullable=True, default=dict)
    
    # 狀態
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)  # 是否已驗證
    
    # 統計資訊
    transaction_count = Column(Integer, default=0, nullable=False)
    total_amount = Column(Integer, default=0, nullable=False)  # 總金額（分）
    last_used_at = Column(DateTime(timezone=True), nullable=True)
    
    # 時間戳
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # 關聯
    user = relationship("User")
    transactions = relationship("TaiwanPaymentTransaction", back_populates="config", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<TaiwanPaymentConfig(id={self.id}, provider='{self.provider.value}', config_name='{self.config_name}')>"


class TaiwanPaymentTransaction(Base):
    """
    台灣金流交易記錄模型
    """
    __tablename__ = "taiwan_payment_transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    config_id = Column(UUID(as_uuid=True), ForeignKey("taiwan_payment_configs.id"), nullable=False, index=True)
    workflow_execution_id = Column(UUID(as_uuid=True), ForeignKey("workflow_executions.id"), nullable=True, index=True)
    
    # 交易基本資訊
    transaction_id = Column(String(100), nullable=False, unique=True, index=True)
    merchant_order_id = Column(String(100), nullable=False, index=True)
    
    # 金額資訊
    amount = Column(Integer, nullable=False)  # 以分為單位
    currency = Column(String(3), default="TWD", nullable=False)
    
    # 商品資訊
    product_name = Column(String(200), nullable=False)
    product_description = Column(Text, nullable=True)
    product_url = Column(String(500), nullable=True)
    
    # 付款資訊
    payment_method = Column(Enum(PaymentMethod), nullable=False, index=True)
    status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING, nullable=False, index=True)
    
    # 買家資訊
    buyer_name = Column(String(100), nullable=True)
    buyer_email = Column(String(255), nullable=True)
    buyer_phone = Column(String(20), nullable=True)
    
    # 第三方回應
    external_transaction_id = Column(String(100), nullable=True, index=True)
    external_status = Column(String(50), nullable=True)
    external_response = Column(JSONB, nullable=True)
    
    # 回調資訊
    return_url = Column(String(500), nullable=True)
    notify_url = Column(String(500), nullable=True)
    
    # 時間資訊
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    paid_at = Column(DateTime(timezone=True), nullable=True, index=True)
    expired_at = Column(DateTime(timezone=True), nullable=True)
    
    # 關聯
    config = relationship("TaiwanPaymentConfig", back_populates="transactions")
    execution = relationship("WorkflowExecution")

    def __repr__(self):
        return f"<TaiwanPaymentTransaction(id={self.id}, transaction_id='{self.transaction_id}', status='{self.status.value}')>"


class TaiwanGovernmentData(Base):
    """
    台灣政府開放資料模型
    """
    __tablename__ = "taiwan_government_data"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    # 資料集基本資訊
    dataset_id = Column(String(100), nullable=False, unique=True, index=True)
    dataset_name = Column(String(200), nullable=False)
    agency = Column(String(100), nullable=False, index=True)  # 提供機關
    category = Column(String(50), nullable=False, index=True)  # 資料分類
    
    # API 資訊
    api_endpoint = Column(String(500), nullable=False)
    api_key_required = Column(Boolean, default=False, nullable=False)
    api_format = Column(String(20), default="json", nullable=False)  # json, xml, csv
    
    # 資料描述
    description = Column(Text, nullable=True)
    update_frequency = Column(String(50), nullable=True)  # 更新頻率
    data_fields = Column(JSONB, nullable=True)  # 資料欄位描述
    
    # 使用統計
    usage_count = Column(Integer, default=0, nullable=False)
    last_accessed_at = Column(DateTime(timezone=True), nullable=True)
    
    # 資料狀態
    is_active = Column(Boolean, default=True, nullable=False)
    last_updated_at = Column(DateTime(timezone=True), nullable=True)  # 資料最後更新時間
    
    # 時間戳
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    def __repr__(self):
        return f"<TaiwanGovernmentData(id={self.id}, dataset_id='{self.dataset_id}', agency='{self.agency}')>"


class TaiwanTransportData(Base):
    """
    台灣交通資料模型（桃機、高鐵、台鐵等）
    """
    __tablename__ = "taiwan_transport_data"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    # 交通服務資訊
    service_type = Column(String(50), nullable=False, index=True)  # airport, hsr, tra, bus, mrt
    service_name = Column(String(100), nullable=False)
    
    # API 配置
    api_endpoint = Column(String(500), nullable=False)
    api_key_encrypted = Column(Text, nullable=True)  # 加密的 API 金鑰
    auth_type = Column(String(50), default="none", nullable=False)  # none, api_key, oauth2
    
    # 資料類型
    data_types = Column(ARRAY(String), nullable=False)  # schedule, delay, status, etc.
    
    # 服務配置
    configuration = Column(JSONB, nullable=True, default=dict)
    rate_limit = Column(Integer, nullable=True)  # 每分鐘請求限制
    
    # 狀態監控
    is_active = Column(Boolean, default=True, nullable=False)
    health_status = Column(String(20), default="unknown", nullable=False)  # healthy, unhealthy, unknown
    last_health_check = Column(DateTime(timezone=True), nullable=True)
    
    # 使用統計
    request_count = Column(Integer, default=0, nullable=False)
    error_count = Column(Integer, default=0, nullable=False)
    last_used_at = Column(DateTime(timezone=True), nullable=True)
    
    # 時間戳
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    def __repr__(self):
        return f"<TaiwanTransportData(id={self.id}, service_type='{self.service_type}', service_name='{self.service_name}')>"
