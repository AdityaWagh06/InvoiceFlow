import time

import redis

from app.core.config import settings
from app.exceptions import AppError, ErrorCode


def enforce_upload_rate_limit(user_id: str) -> None:
    """Limit invoice uploads per user per hour using Redis."""
    if not settings.upstash_redis_url:
        return
    client = redis.from_url(settings.upstash_redis_url)
    key = f"rate:invoice_upload:{user_id}:{int(time.time() // 3600)}"
    count = client.incr(key)
    if count == 1:
        client.expire(key, 3600)

    if count > settings.rate_limit_invoice_uploads_per_hour:
        raise AppError(
            code=ErrorCode.RATE_LIMIT_EXCEEDED,
            message="Upload rate limit exceeded",
            status_code=429
        )
