from dataclasses import dataclass
from enum import Enum
from typing import Any, Optional


class ErrorCode(str, Enum):
    AUTH_REQUIRED = "AUTH_REQUIRED"
    AUTH_FORBIDDEN = "AUTH_FORBIDDEN"
    INVOICE_NOT_FOUND = "INVOICE_NOT_FOUND"
    INVOICE_DUPLICATE = "INVOICE_DUPLICATE"
    INVOICE_UPLOAD_FAILED = "INVOICE_UPLOAD_FAILED"
    GPT_EXTRACTION_FAILED = "GPT_EXTRACTION_FAILED"
    GPT_TIMEOUT = "GPT_TIMEOUT"
    VALIDATION_FAILED = "VALIDATION_FAILED"
    ERP_SYNC_FAILED = "ERP_SYNC_FAILED"
    PAYMENT_FAILED = "PAYMENT_FAILED"
    RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED"
    FILE_TOO_LARGE = "FILE_TOO_LARGE"
    FILE_TYPE_INVALID = "FILE_TYPE_INVALID"
    DB_ERROR = "DB_ERROR"
    UNKNOWN = "UNKNOWN"


@dataclass
class AppError(Exception):
    """Standard application error type returned by APIs and tasks."""

    code: ErrorCode
    message: str
    status_code: int
    details: Optional[dict[str, Any]] = None
