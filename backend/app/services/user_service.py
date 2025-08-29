"""
使用者服務層
"""

from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_
import logging

from app.core.security import verify_password, get_password_hash
from app.core.exceptions import ValidationError, ResourceNotFoundError
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate

logger = logging.getLogger("app.services.user")


class UserService:
    """
    使用者服務類別
    """
    
    def __init__(self, db: Session):
        self.db = db
    
    async def get_user_by_id(self, user_id: int) -> Optional[User]:
        """
        根據 ID 取得使用者
        """
        try:
            return self.db.query(User).filter(User.id == user_id).first()
        except Exception as e:
            logger.error(f"取得使用者失敗 (ID: {user_id}): {str(e)}")
            return None
    
    async def get_user_by_email(self, email: str) -> Optional[User]:
        """
        根據電子郵件取得使用者
        """
        try:
            return self.db.query(User).filter(User.email == email).first()
        except Exception as e:
            logger.error(f"取得使用者失敗 (Email: {email}): {str(e)}")
            return None
    
    async def get_users(
        self, 
        skip: int = 0, 
        limit: int = 100,
        is_active: Optional[bool] = None
    ) -> List[User]:
        """
        取得使用者列表
        """
        try:
            query = self.db.query(User)
            
            if is_active is not None:
                query = query.filter(User.is_active == is_active)
            
            return query.offset(skip).limit(limit).all()
        except Exception as e:
            logger.error(f"取得使用者列表失敗: {str(e)}")
            return []
    
    async def create_user(self, user_create: UserCreate) -> User:
        """
        建立新使用者
        """
        try:
            # 檢查電子郵件是否已存在
            existing_user = await self.get_user_by_email(user_create.email)
            if existing_user:
                raise ValidationError("此電子郵件已被註冊", field="email")
            
            # 建立新使用者
            hashed_password = get_password_hash(user_create.password)
            db_user = User(
                email=user_create.email,
                name=user_create.name,
                password_hash=hashed_password,
                is_active=getattr(user_create, 'is_active', True),
                is_superuser=getattr(user_create, 'is_superuser', False)
            )
            
            self.db.add(db_user)
            self.db.commit()
            self.db.refresh(db_user)
            
            logger.info(f"使用者建立成功: {user_create.email}")
            return db_user
            
        except ValidationError:
            raise
        except Exception as e:
            self.db.rollback()
            logger.error(f"建立使用者失敗: {str(e)}")
            raise
    
    async def update_user(self, user_id: int, user_update: UserUpdate) -> User:
        """
        更新使用者資訊
        """
        try:
            db_user = await self.get_user_by_id(user_id)
            if not db_user:
                raise ResourceNotFoundError("使用者", str(user_id))
            
            # 檢查電子郵件是否已被其他使用者使用
            if user_update.email and user_update.email != db_user.email:
                existing_user = await self.get_user_by_email(user_update.email)
                if existing_user and existing_user.id != user_id:
                    raise ValidationError("此電子郵件已被其他使用者使用", field="email")
            
            # 更新使用者資訊
            update_data = user_update.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(db_user, field, value)
            
            self.db.commit()
            self.db.refresh(db_user)
            
            logger.info(f"使用者更新成功: user_id={user_id}")
            return db_user
            
        except (ValidationError, ResourceNotFoundError):
            raise
        except Exception as e:
            self.db.rollback()
            logger.error(f"更新使用者失敗: {str(e)}")
            raise
    
    async def delete_user(self, user_id: int) -> bool:
        """
        刪除使用者
        """
        try:
            db_user = await self.get_user_by_id(user_id)
            if not db_user:
                raise ResourceNotFoundError("使用者", str(user_id))
            
            self.db.delete(db_user)
            self.db.commit()
            
            logger.info(f"使用者刪除成功: user_id={user_id}")
            return True
            
        except ResourceNotFoundError:
            raise
        except Exception as e:
            self.db.rollback()
            logger.error(f"刪除使用者失敗: {str(e)}")
            raise
    
    async def activate_user(self, user_id: int) -> bool:
        """
        啟用使用者
        """
        try:
            db_user = await self.get_user_by_id(user_id)
            if not db_user:
                raise ResourceNotFoundError("使用者", str(user_id))
            
            db_user.is_active = True
            self.db.commit()
            
            logger.info(f"使用者啟用成功: user_id={user_id}")
            return True
            
        except ResourceNotFoundError:
            raise
        except Exception as e:
            self.db.rollback()
            logger.error(f"啟用使用者失敗: {str(e)}")
            raise
    
    async def deactivate_user(self, user_id: int) -> bool:
        """
        停用使用者
        """
        try:
            db_user = await self.get_user_by_id(user_id)
            if not db_user:
                raise ResourceNotFoundError("使用者", str(user_id))
            
            db_user.is_active = False
            self.db.commit()
            
            logger.info(f"使用者停用成功: user_id={user_id}")
            return True
            
        except ResourceNotFoundError:
            raise
        except Exception as e:
            self.db.rollback()
            logger.error(f"停用使用者失敗: {str(e)}")
            raise
    
    async def authenticate_user(self, email_or_username: str, password: str) -> Optional[User]:
        """
        驗證使用者憑證 - 支援 email 或 username 登入
        """
        try:
            # 先嘗試用 email 查找
            user = await self.get_user_by_email(email_or_username)

            # 如果找不到，嘗試用 username 查找（假設 username 對應 email 的前綴）
            if not user and not '@' in email_or_username:
                # 將 username 轉換為對應的 email 格式
                test_email = f"{email_or_username}@taiwan-zapier.com"
                user = await self.get_user_by_email(test_email)

            if not user:
                return None

            if not verify_password(password, user.password_hash):
                return None

            return user

        except Exception as e:
            logger.error(f"使用者認證失敗: {str(e)}")
            return None
    
    async def change_password(self, user_id: int, current_password: str, new_password: str) -> bool:
        """
        變更使用者密碼
        """
        try:
            db_user = await self.get_user_by_id(user_id)
            if not db_user:
                raise ResourceNotFoundError("使用者", str(user_id))
            
            # 驗證目前密碼
            if not verify_password(current_password, db_user.password_hash):
                raise ValidationError("目前密碼錯誤")

            # 更新密碼
            db_user.password_hash = get_password_hash(new_password)
            self.db.commit()
            
            logger.info(f"使用者密碼變更成功: user_id={user_id}")
            return True
            
        except (ValidationError, ResourceNotFoundError):
            raise
        except Exception as e:
            self.db.rollback()
            logger.error(f"變更密碼失敗: {str(e)}")
            raise
    
    async def get_user_count(self, is_active: Optional[bool] = None) -> int:
        """
        取得使用者總數
        """
        try:
            query = self.db.query(User)
            
            if is_active is not None:
                query = query.filter(User.is_active == is_active)
            
            return query.count()
            
        except Exception as e:
            logger.error(f"取得使用者總數失敗: {str(e)}")
            return 0
