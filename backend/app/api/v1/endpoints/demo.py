"""
Demo 工作流支援的 API 端點
"""

from datetime import datetime
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
import uuid

from app.core.logging import get_logger

logger = get_logger(__name__)
router = APIRouter()


class OrderItem(BaseModel):
    """訂單項目模型"""
    product_id: str = Field(..., description="商品ID")
    product_name: str = Field(..., description="商品名稱")
    quantity: int = Field(..., gt=0, description="數量")
    unit_price: int = Field(..., gt=0, description="單價（以分為單位）")
    subtotal: int = Field(..., gt=0, description="小計（以分為單位）")


class OrderRequest(BaseModel):
    """訂單請求模型"""
    customer_name: str = Field(..., description="客戶姓名")
    customer_email: str = Field(..., description="客戶電子郵件")
    customer_phone: str = Field(..., description="客戶電話")
    items: List[OrderItem] = Field(..., description="訂單項目")
    total_amount: int = Field(..., gt=0, description="總金額（以分為單位）")
    payment_method: Optional[str] = Field("linePay", description="付款方式")
    notes: Optional[str] = Field(None, description="備註")


class OrderResponse(BaseModel):
    """訂單回應模型"""
    success: bool = Field(..., description="處理是否成功")
    order_id: str = Field(..., description="訂單ID")
    status: str = Field(..., description="訂單狀態")
    payment_method: str = Field(..., description="選擇的付款方式")
    estimated_processing_time: str = Field(..., description="預估處理時間")
    message: str = Field(..., description="處理訊息")
    created_at: datetime = Field(..., description="建立時間")


class NotificationRequest(BaseModel):
    """通知請求模型"""
    message: str = Field(..., description="通知訊息")
    recipient: str = Field(..., description="接收者")
    notification_type: str = Field(default="info", description="通知類型")


class NotificationResponse(BaseModel):
    """通知回應模型"""
    success: bool = Field(..., description="發送是否成功")
    notification_id: str = Field(..., description="通知ID")
    message: str = Field(..., description="回應訊息")
    sent_at: datetime = Field(..., description="發送時間")


@router.post("/orders", response_model=OrderResponse)
async def process_order(order: OrderRequest) -> OrderResponse:
    """
    處理訂單的 Demo API
    模擬台灣電商訂單處理流程
    """
    try:
        logger.info(f"收到新訂單: 客戶={order.customer_name}, 金額={order.total_amount}")
        
        # 生成訂單ID
        order_id = f"TW{datetime.now().strftime('%Y%m%d')}{str(uuid.uuid4())[:8].upper()}"
        
        # 根據金額選擇付款方式
        if order.total_amount >= 100000:  # 1000元以上
            recommended_payment = "ecPay"
            processing_time = "1-2個工作天"
        elif order.total_amount >= 50000:  # 500元以上
            recommended_payment = "linePay"
            processing_time = "即時處理"
        else:
            recommended_payment = "newebPay"
            processing_time = "即時處理"
        
        # 使用客戶指定的付款方式，或推薦的方式
        final_payment_method = order.payment_method or recommended_payment
        
        # 模擬訂單處理
        response = OrderResponse(
            success=True,
            order_id=order_id,
            status="confirmed",
            payment_method=final_payment_method,
            estimated_processing_time=processing_time,
            message=f"訂單已成功建立，將使用 {final_payment_method} 進行付款",
            created_at=datetime.now()
        )
        
        logger.info(f"訂單處理完成: {order_id}")
        return response
        
    except Exception as e:
        logger.error(f"訂單處理失敗: {str(e)}")
        raise HTTPException(status_code=500, detail=f"訂單處理失敗: {str(e)}")


@router.get("/orders/{order_id}")
async def get_order_status(order_id: str) -> Dict[str, Any]:
    """
    查詢訂單狀態
    """
    try:
        # 模擬訂單狀態查詢
        return {
            "success": True,
            "order_id": order_id,
            "status": "processing",
            "payment_status": "pending",
            "estimated_completion": "2024-01-01T12:00:00Z",
            "last_updated": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"查詢訂單狀態失敗: {str(e)}")
        raise HTTPException(status_code=500, detail=f"查詢失敗: {str(e)}")


@router.post("/notifications", response_model=NotificationResponse)
async def send_notification(notification: NotificationRequest) -> NotificationResponse:
    """
    發送通知的 Demo API
    模擬 Line Notify 或其他通知服務
    """
    try:
        logger.info(f"發送通知: {notification.message} -> {notification.recipient}")
        
        # 生成通知ID
        notification_id = f"NOTIFY_{str(uuid.uuid4())[:8].upper()}"
        
        # 模擬通知發送
        response = NotificationResponse(
            success=True,
            notification_id=notification_id,
            message=f"通知已成功發送給 {notification.recipient}",
            sent_at=datetime.now()
        )
        
        logger.info(f"通知發送完成: {notification_id}")
        return response
        
    except Exception as e:
        logger.error(f"通知發送失敗: {str(e)}")
        raise HTTPException(status_code=500, detail=f"通知發送失敗: {str(e)}")


@router.get("/payment-methods")
async def get_payment_methods() -> Dict[str, Any]:
    """
    取得可用的付款方式
    """
    return {
        "success": True,
        "payment_methods": [
            {
                "id": "linePay",
                "name": "Line Pay",
                "description": "Line Pay 行動支付",
                "min_amount": 100,
                "max_amount": 4999900,
                "processing_time": "即時",
                "is_available": True
            },
            {
                "id": "ecPay",
                "name": "綠界科技",
                "description": "綠界科技金流服務",
                "min_amount": 100,
                "max_amount": 9999900,
                "processing_time": "1-2個工作天",
                "is_available": True
            },
            {
                "id": "newebPay",
                "name": "藍新金流",
                "description": "藍新金流服務",
                "min_amount": 100,
                "max_amount": 4999900,
                "processing_time": "即時",
                "is_available": True
            }
        ]
    }


@router.get("/taiwan-services")
async def get_taiwan_services() -> Dict[str, Any]:
    """
    取得台灣在地服務列表
    """
    return {
        "success": True,
        "services": [
            {
                "id": "taoyuan_airport",
                "name": "桃園機場航班資訊",
                "category": "transport",
                "is_available": True
            },
            {
                "id": "taiwan_railway",
                "name": "台鐵資訊",
                "category": "transport", 
                "is_available": True
            },
            {
                "id": "gov_opendata",
                "name": "政府開放資料",
                "category": "data",
                "is_available": True
            },
            {
                "id": "line_notify",
                "name": "Line 通知",
                "category": "notification",
                "is_available": True
            }
        ]
    }
