from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import sentry_sdk

from app.api.v1.router import router as api_router
from app.core.config import settings
from app.core.logging import configure_logging
from app.exceptions import AppError, ErrorCode

configure_logging()

if settings.sentry_dsn:
    sentry_sdk.init(dsn=settings.sentry_dsn)

app = FastAPI(title="Ledgerly API", version="1.0.0")

app.include_router(api_router, prefix="/api/v1")


@app.exception_handler(AppError)
async def handle_app_error(_: Request, error: AppError) -> JSONResponse:
    """Return structured JSON error payloads for AppError exceptions."""
    return JSONResponse(
        status_code=error.status_code,
        content={
            "code": error.code.value,
            "message": error.message,
            "details": error.details
        }
    )


@app.exception_handler(Exception)
async def handle_unexpected_error(_: Request, error: Exception) -> JSONResponse:
    """Handle unexpected errors with a generic response."""
    return JSONResponse(
        status_code=500,
        content={
            "code": ErrorCode.UNKNOWN.value,
            "message": "Unexpected error",
            "details": {"error": str(error)}
        }
    )
