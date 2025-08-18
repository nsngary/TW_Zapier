"""
模型模組初始化 - 導入所有 SQLAlchemy 模型
"""

# 用戶相關模型
from .user import (
    User,
    RefreshToken,
    UserProfile,
    UserPreferences,
    ApiKey,
    AuditLog
)

# 工作流相關模型
from .workflow import (
    Workflow,
    WorkflowVersion,
    WorkflowExecution,
    WorkflowTemplate,
    WebhookEndpoint
)

# 節點相關模型
from .node import (
    NodeType,
    Node,
    TaiwanService,
    PaymentRecord,
    SystemSetting
)

# 台灣特色模型
from .taiwan import (
    TaiwanPaymentConfig,
    TaiwanPaymentTransaction,
    TaiwanGovernmentData,
    TaiwanTransportData
)

__all__ = [
    # 用戶相關
    "User",
    "RefreshToken",
    "UserProfile",
    "UserPreferences",
    "ApiKey",
    "AuditLog",

    # 工作流相關
    "Workflow",
    "WorkflowVersion",
    "WorkflowExecution",
    "WorkflowTemplate",
    "WebhookEndpoint",

    # 節點相關
    "NodeType",
    "Node",
    "TaiwanService",
    "PaymentRecord",
    "SystemSetting",

    # 台灣特色
    "TaiwanPaymentConfig",
    "TaiwanPaymentTransaction",
    "TaiwanGovernmentData",
    "TaiwanTransportData"
]
