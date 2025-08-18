"""
Redis 連線和快取設定
"""

import redis.asyncio as redis
import json
import logging
from typing import Any, Optional, Union
from datetime import timedelta

from app.core.config import settings

logger = logging.getLogger(__name__)

# Redis 連線池
redis_pool = None


async def init_redis():
    """
    初始化 Redis 連線池
    """
    global redis_pool
    try:
        redis_pool = redis.ConnectionPool.from_url(
            settings.REDIS_URL,
            encoding="utf-8",
            decode_responses=True,
            max_connections=20,
            retry_on_timeout=True,
        )
        
        # 測試連線
        redis_client = redis.Redis(connection_pool=redis_pool)
        await redis_client.ping()
        logger.info("Redis 連線初始化成功")
        
    except Exception as e:
        logger.error(f"Redis 連線初始化失敗: {e}")
        raise


async def close_redis():
    """
    關閉 Redis 連線池
    """
    global redis_pool
    if redis_pool:
        try:
            await redis_pool.disconnect()
            logger.info("Redis 連線已關閉")
        except Exception as e:
            logger.error(f"關閉 Redis 連線時發生錯誤: {e}")


def get_redis() -> redis.Redis:
    """
    取得 Redis 客戶端實例
    """
    if not redis_pool:
        raise RuntimeError("Redis 連線池尚未初始化")
    return redis.Redis(connection_pool=redis_pool)


class RedisCache:
    """
    Redis 快取管理類別
    """
    
    def __init__(self):
        self.redis_client = None
    
    async def get_client(self) -> redis.Redis:
        """取得 Redis 客戶端"""
        if not self.redis_client:
            self.redis_client = get_redis()
        return self.redis_client
    
    async def get(self, key: str) -> Optional[Any]:
        """
        從快取中取得值
        """
        try:
            client = await self.get_client()
            value = await client.get(key)
            if value:
                return json.loads(value)
            return None
        except Exception as e:
            logger.error(f"Redis GET 操作失敗 - key: {key}, error: {e}")
            return None
    
    async def set(
        self, 
        key: str, 
        value: Any, 
        expire: Optional[Union[int, timedelta]] = None
    ) -> bool:
        """
        設定快取值
        """
        try:
            client = await self.get_client()
            json_value = json.dumps(value, ensure_ascii=False)
            
            if expire:
                if isinstance(expire, timedelta):
                    expire = int(expire.total_seconds())
                await client.setex(key, expire, json_value)
            else:
                await client.set(key, json_value)
            
            return True
        except Exception as e:
            logger.error(f"Redis SET 操作失敗 - key: {key}, error: {e}")
            return False
    
    async def delete(self, key: str) -> bool:
        """
        刪除快取值
        """
        try:
            client = await self.get_client()
            result = await client.delete(key)
            return result > 0
        except Exception as e:
            logger.error(f"Redis DELETE 操作失敗 - key: {key}, error: {e}")
            return False
    
    async def exists(self, key: str) -> bool:
        """
        檢查快取鍵是否存在
        """
        try:
            client = await self.get_client()
            result = await client.exists(key)
            return result > 0
        except Exception as e:
            logger.error(f"Redis EXISTS 操作失敗 - key: {key}, error: {e}")
            return False
    
    async def expire(self, key: str, seconds: int) -> bool:
        """
        設定快取過期時間
        """
        try:
            client = await self.get_client()
            result = await client.expire(key, seconds)
            return result
        except Exception as e:
            logger.error(f"Redis EXPIRE 操作失敗 - key: {key}, error: {e}")
            return False
    
    async def increment(self, key: str, amount: int = 1) -> Optional[int]:
        """
        遞增計數器
        """
        try:
            client = await self.get_client()
            result = await client.incrby(key, amount)
            return result
        except Exception as e:
            logger.error(f"Redis INCRBY 操作失敗 - key: {key}, error: {e}")
            return None
    
    async def get_keys(self, pattern: str) -> list:
        """
        根據模式取得所有匹配的鍵
        """
        try:
            client = await self.get_client()
            keys = await client.keys(pattern)
            return keys
        except Exception as e:
            logger.error(f"Redis KEYS 操作失敗 - pattern: {pattern}, error: {e}")
            return []


# 全域快取實例
cache = RedisCache()


async def check_redis_connection() -> bool:
    """
    檢查 Redis 連線狀態
    """
    try:
        client = get_redis()
        await client.ping()
        return True
    except Exception as e:
        logger.error(f"Redis 連線檢查失敗: {e}")
        return False
