import time
from typing import Any

import httpx
from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt

from app.core.config import settings
from app.exceptions import AppError, ErrorCode

security = HTTPBearer()

_jwks_cache: dict[str, Any] = {"keys": None, "expires_at": 0}


async def _get_jwks() -> list[dict[str, Any]]:
    """Fetch Clerk JWKS keys with in-memory caching."""
    if not settings.clerk_jwks_url:
        raise AppError(
            code=ErrorCode.AUTH_REQUIRED,
            message="Authentication is not configured",
            status_code=401
        )
    if _jwks_cache["keys"] and _jwks_cache["expires_at"] > time.time():
        return _jwks_cache["keys"]

    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(settings.clerk_jwks_url)
        response.raise_for_status()
        payload = response.json()

    keys = payload.get("keys")
    if not isinstance(keys, list):
        raise AppError(
            code=ErrorCode.AUTH_FORBIDDEN,
            message="Invalid JWKS payload",
            status_code=401
        )

    _jwks_cache["keys"] = keys
    _jwks_cache["expires_at"] = time.time() + 3600
    return keys


async def verify_clerk_token(token: str) -> dict[str, Any]:
    """Verify Clerk JWT and return its payload."""
    if not settings.clerk_issuer or not settings.clerk_audience:
        raise AppError(
            code=ErrorCode.AUTH_REQUIRED,
            message="Authentication is not configured",
            status_code=401
        )
    try:
        header = jwt.get_unverified_header(token)
        kid = header.get("kid")
        keys = await _get_jwks()
        key = next((item for item in keys if item.get("kid") == kid), None)
        if not key:
            raise AppError(
                code=ErrorCode.AUTH_FORBIDDEN,
                message="Invalid authentication token",
                status_code=401
            )

        payload = jwt.decode(
            token,
            key,
            algorithms=["RS256"],
            issuer=settings.clerk_issuer,
            audience=settings.clerk_audience
        )
    except AppError:
        raise
    except Exception as exc:
        raise AppError(
            code=ErrorCode.AUTH_FORBIDDEN,
            message="Authentication failed",
            status_code=401,
            details={"error": str(exc)}
        ) from exc

    return payload


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict[str, Any]:
    """FastAPI dependency to resolve the current Clerk user."""
    if not credentials or not credentials.credentials:
        raise AppError(
            code=ErrorCode.AUTH_REQUIRED,
            message="Authentication required",
            status_code=401
        )

    payload = await verify_clerk_token(credentials.credentials)
    user_id = payload.get("sub")
    if not user_id:
        raise AppError(
            code=ErrorCode.AUTH_FORBIDDEN,
            message="Invalid user session",
            status_code=403
        )

    return {"user_id": user_id}
