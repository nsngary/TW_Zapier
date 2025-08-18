"""
安全性相關工具和中介軟體
"""

import hashlib
import secrets
from datetime import datetime, timedelta
from typing import Any, Optional, Union

from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.core.config import settings

# 密碼加密上下文
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT Bearer 認證
security = HTTPBearer()


def create_access_token(
    subject: Union[str, Any], 
    expires_delta: Optional[timedelta] = None
) -> str:
    """
    建立 JWT 存取權杖
    """
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES
        )
    
    to_encode = {
        "exp": expire,
        "sub": str(subject),
        "type": "access"
    }
    
    encoded_jwt = jwt.encode(
        to_encode, 
        settings.JWT_SECRET_KEY, 
        algorithm=settings.JWT_ALGORITHM
    )
    return encoded_jwt


def create_refresh_token(subject: Union[str, Any]) -> str:
    """
    建立 JWT 重新整理權杖
    """
    expire = datetime.utcnow() + timedelta(
        days=settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS
    )
    
    to_encode = {
        "exp": expire,
        "sub": str(subject),
        "type": "refresh"
    }
    
    encoded_jwt = jwt.encode(
        to_encode, 
        settings.JWT_SECRET_KEY, 
        algorithm=settings.JWT_ALGORITHM
    )
    return encoded_jwt


def verify_token(token: str) -> Optional[str]:
    """
    驗證 JWT 權杖並返回主體
    """
    try:
        payload = jwt.decode(
            token, 
            settings.JWT_SECRET_KEY, 
            algorithms=[settings.JWT_ALGORITHM]
        )
        
        # 檢查權杖類型
        token_type = payload.get("type")
        if token_type != "access":
            return None
        
        # 取得主體
        subject = payload.get("sub")
        if subject is None:
            return None
        
        return subject
    
    except JWTError:
        return None


def verify_refresh_token(token: str) -> Optional[str]:
    """
    驗證重新整理權杖並返回主體
    """
    try:
        payload = jwt.decode(
            token, 
            settings.JWT_SECRET_KEY, 
            algorithms=[settings.JWT_ALGORITHM]
        )
        
        # 檢查權杖類型
        token_type = payload.get("type")
        if token_type != "refresh":
            return None
        
        # 取得主體
        subject = payload.get("sub")
        if subject is None:
            return None
        
        return subject
    
    except JWTError:
        return None


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    驗證密碼
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """
    取得密碼雜湊值
    """
    return pwd_context.hash(password)


def generate_password_reset_token(email: str) -> str:
    """
    產生密碼重設權杖
    """
    delta = timedelta(hours=settings.EMAIL_RESET_TOKEN_EXPIRE_HOURS)
    now = datetime.utcnow()
    expires = now + delta
    exp = expires.timestamp()
    encoded_jwt = jwt.encode(
        {"exp": exp, "nbf": now, "sub": email}, 
        settings.JWT_SECRET_KEY, 
        algorithm=settings.JWT_ALGORITHM,
    )
    return encoded_jwt


def verify_password_reset_token(token: str) -> Optional[str]:
    """
    驗證密碼重設權杖
    """
    try:
        decoded_token = jwt.decode(
            token, 
            settings.JWT_SECRET_KEY, 
            algorithms=[settings.JWT_ALGORITHM]
        )
        return decoded_token["sub"]
    except JWTError:
        return None


def generate_api_key() -> str:
    """
    產生 API 金鑰
    """
    return secrets.token_urlsafe(32)


def hash_api_key(api_key: str) -> str:
    """
    雜湊 API 金鑰
    """
    return hashlib.sha256(api_key.encode()).hexdigest()


def verify_api_key(api_key: str, hashed_key: str) -> bool:
    """
    驗證 API 金鑰
    """
    return hash_api_key(api_key) == hashed_key


def generate_webhook_signature(payload: str, secret: str) -> str:
    """
    產生 Webhook 簽名
    """
    return hashlib.sha256(
        (payload + secret).encode()
    ).hexdigest()


def verify_webhook_signature(
    payload: str, 
    signature: str, 
    secret: str
) -> bool:
    """
    驗證 Webhook 簽名
    """
    expected_signature = generate_webhook_signature(payload, secret)
    return secrets.compare_digest(signature, expected_signature)


class RateLimiter:
    """
    簡單的記憶體內速率限制器
    """
    
    def __init__(self):
        self.requests = {}
    
    def is_allowed(
        self, 
        key: str, 
        limit: int, 
        window: int = 60
    ) -> bool:
        """
        檢查是否允許請求
        
        Args:
            key: 識別鍵 (通常是 IP 位址或使用者 ID)
            limit: 限制次數
            window: 時間窗口 (秒)
        """
        now = datetime.utcnow().timestamp()
        
        # 清理過期的記錄
        self.requests = {
            k: v for k, v in self.requests.items() 
            if now - v[-1] < window
        }
        
        # 檢查當前鍵的請求記錄
        if key not in self.requests:
            self.requests[key] = []
        
        # 移除超出時間窗口的請求
        self.requests[key] = [
            timestamp for timestamp in self.requests[key]
            if now - timestamp < window
        ]
        
        # 檢查是否超過限制
        if len(self.requests[key]) >= limit:
            return False
        
        # 記錄當前請求
        self.requests[key].append(now)
        return True


# 全域速率限制器實例
rate_limiter = RateLimiter()


def check_rate_limit(key: str, limit: int = None) -> bool:
    """
    檢查速率限制
    """
    if limit is None:
        limit = settings.RATE_LIMIT_PER_MINUTE

    return rate_limiter.is_allowed(key, limit, 60)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(lambda: None)
):
    """
    取得當前使用者的依賴注入函數
    """
    from app.core.database import get_db
    from app.models.user import User
    from app.core.exceptions import AuthenticationError
    import uuid

    # 獲取資料庫連接
    if db is None:
        db_gen = get_db()
        db = next(db_gen)

    try:
        # 驗證權杖
        user_id = verify_token(credentials.credentials)
        if not user_id:
            raise AuthenticationError("無效的權杖")

        # 查詢使用者
        user_uuid = uuid.UUID(user_id)
        user = db.query(User).filter(User.id == user_uuid).first()

        if not user:
            raise AuthenticationError("使用者不存在")

        if not user.is_active:
            raise AuthenticationError("帳號已被停用")

        return user

    except AuthenticationError:
        raise
    except Exception as e:
        raise AuthenticationError(f"認證失敗: {str(e)}")
