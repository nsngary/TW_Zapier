"""
節點和服務相關的 SQLAlchemy 模型
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Float
from sqlalchemy.dialects.postgresql import UUID, JSONB, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum

from app.core.database import Base


class NodeType(Base):
    """
    節點類型模型
    """
    __tablename__ = "node_types"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    # 基本資訊
    name = Column(String(100), nullable=False, unique=True, index=True)  # 內部名稱，如 'linePay'
    display_name = Column(String(100), nullable=False)  # 顯示名稱，如 'Line Pay'
    category = Column(String(50), nullable=False, index=True)  # trigger, payment, service, notification, etc.
    
    # 描述和文件
    description = Column(Text, nullable=True)
    documentation_url = Column(String(500), nullable=True)
    
    # 視覺化
    icon_url = Column(String(500), nullable=True)
    color = Column(String(7), nullable=True)  # HEX 顏色代碼
    
    # 版本和狀態
    version = Column(String(20), default="1.0.0", nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    is_beta = Column(Boolean, default=False, nullable=False)
    
    # 配置 Schema
    input_schema = Column(JSONB, nullable=True)  # 輸入參數 JSON Schema
    output_schema = Column(JSONB, nullable=True)  # 輸出參數 JSON Schema
    settings_schema = Column(JSONB, nullable=True)  # 設定參數 JSON Schema
    
    # 功能特性
    supports_webhook = Column(Boolean, default=False, nullable=False)
    supports_polling = Column(Boolean, default=False, nullable=False)
    supports_batch = Column(Boolean, default=False, nullable=False)
    
    # 台灣在地化
    is_taiwan_service = Column(Boolean, default=False, nullable=False)
    service_provider = Column(String(100), nullable=True)  # Line, 綠界科技, 桃園機場等
    
    # 時間戳
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # 關聯
    nodes = relationship("Node", back_populates="node_type")

    def __repr__(self):
        return f"<NodeType(id={self.id}, name='{self.name}', display_name='{self.display_name}')>"


class Node(Base):
    """
    節點實例模型
    """
    __tablename__ = "nodes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    workflow_id = Column(UUID(as_uuid=True), ForeignKey("workflows.id"), nullable=False, index=True)
    node_type_id = Column(UUID(as_uuid=True), ForeignKey("node_types.id"), nullable=False, index=True)
    
    # 節點識別
    node_key = Column(String(100), nullable=False, index=True)  # 在工作流中的唯一識別
    node_name = Column(String(100), nullable=True)  # 使用者自定義名稱
    
    # 位置資訊
    position_x = Column(Float, nullable=False, default=0)
    position_y = Column(Float, nullable=False, default=0)
    
    # 節點配置
    configuration = Column(JSONB, nullable=True, default=dict)
    input_data = Column(JSONB, nullable=True, default=dict)
    
    # 狀態
    is_disabled = Column(Boolean, default=False, nullable=False)
    
    # 執行統計
    execution_count = Column(Integer, default=0, nullable=False)
    success_count = Column(Integer, default=0, nullable=False)
    failure_count = Column(Integer, default=0, nullable=False)
    average_duration = Column(Float, nullable=True)
    
    # 時間戳
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # 關聯
    workflow = relationship("Workflow")
    node_type = relationship("NodeType", back_populates="nodes")

    def __repr__(self):
        return f"<Node(id={self.id}, workflow_id={self.workflow_id}, node_key='{self.node_key}')>"


class TaiwanService(Base):
    """
    台灣在地服務配置模型
    """
    __tablename__ = "taiwan_services"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    # 服務基本資訊
    service_name = Column(String(100), nullable=False, unique=True, index=True)  # linePay, ecPay, etc.
    service_type = Column(String(50), nullable=False, index=True)  # payment, transport, government, etc.
    display_name = Column(String(100), nullable=False)
    provider = Column(String(100), nullable=False)  # Line, 綠界科技, 桃園機場等
    
    # API 配置
    api_endpoint = Column(String(500), nullable=False)
    api_version = Column(String(20), nullable=True)
    api_key_encrypted = Column(Text, nullable=True)  # 加密的 API 金鑰
    
    # 認證配置
    auth_type = Column(String(50), nullable=False, default="api_key")  # api_key, oauth2, basic, etc.
    auth_config = Column(JSONB, nullable=True)
    
    # 服務狀態
    is_active = Column(Boolean, default=True, nullable=False)
    is_sandbox = Column(Boolean, default=False, nullable=False)
    
    # 服務配置
    configuration = Column(JSONB, nullable=True, default=dict)
    rate_limit = Column(Integer, nullable=True)  # 每分鐘請求限制
    
    # 監控資訊
    health_check_url = Column(String(500), nullable=True)
    last_health_check = Column(DateTime(timezone=True), nullable=True)
    is_healthy = Column(Boolean, default=True, nullable=False)
    
    # 統計資訊
    usage_count = Column(Integer, default=0, nullable=False)
    error_count = Column(Integer, default=0, nullable=False)
    last_used_at = Column(DateTime(timezone=True), nullable=True)
    
    # 時間戳
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    def __repr__(self):
        return f"<TaiwanService(id={self.id}, service_name='{self.service_name}', provider='{self.provider}')>"


class PaymentRecord(Base):
    """
    金流記錄模型
    """
    __tablename__ = "payment_records"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    workflow_execution_id = Column(UUID(as_uuid=True), ForeignKey("workflow_executions.id"), nullable=False, index=True)
    
    # 金流基本資訊
    service_type = Column(String(50), nullable=False, index=True)  # linePay, ecPay, etc.
    transaction_id = Column(String(100), nullable=False, unique=True, index=True)
    merchant_order_id = Column(String(100), nullable=True, index=True)
    
    # 金額資訊
    amount = Column(Integer, nullable=False)  # 以分為單位
    currency = Column(String(3), default="TWD", nullable=False)
    
    # 商品資訊
    product_name = Column(String(200), nullable=True)
    product_description = Column(Text, nullable=True)
    
    # 交易狀態
    status = Column(String(50), nullable=False, index=True)  # pending, success, failed, cancelled, refunded
    
    # 第三方資訊
    external_transaction_id = Column(String(100), nullable=True, index=True)
    external_status = Column(String(50), nullable=True)
    external_response = Column(JSONB, nullable=True)
    
    # 時間資訊
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    paid_at = Column(DateTime(timezone=True), nullable=True)
    
    # 關聯
    execution = relationship("WorkflowExecution", back_populates="payment_records")

    def __repr__(self):
        return f"<PaymentRecord(id={self.id}, transaction_id='{self.transaction_id}', status='{self.status}')>"


class SystemSetting(Base):
    """
    系統設定模型
    """
    __tablename__ = "system_settings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    # 設定資訊
    setting_key = Column(String(100), nullable=False, unique=True, index=True)
    setting_value = Column(Text, nullable=True)
    setting_type = Column(String(20), default="string", nullable=False)  # string, integer, boolean, json
    
    # 描述和分類
    description = Column(Text, nullable=True)
    category = Column(String(50), nullable=True, index=True)
    
    # 權限
    is_public = Column(Boolean, default=False, nullable=False)  # 是否可以公開讀取
    is_readonly = Column(Boolean, default=False, nullable=False)  # 是否只讀
    
    # 驗證
    validation_rule = Column(JSONB, nullable=True)  # 驗證規則
    
    # 時間戳
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    updated_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    
    # 關聯
    updater = relationship("User")

    def __repr__(self):
        return f"<SystemSetting(id={self.id}, key='{self.setting_key}', type='{self.setting_type}')>"
