import re
from typing import Any

from app.core.config import settings
from app.exceptions import AppError, ErrorCode

GSTIN_REGEX = re.compile(r"^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$")


def sanitize_text(value: str) -> str:
    """Strip unsafe characters before storing or sending to GPT."""
    return re.sub(r"[^\w\s\-.,/&()]", "", value).strip()


def validate_file_upload(file_size: int, content_type: str) -> None:
    """Validate file upload size and MIME type."""
    if file_size > settings.max_upload_bytes:
        raise AppError(
            code=ErrorCode.FILE_TOO_LARGE,
            message="File exceeds allowed size",
            status_code=413
        )

    allowed = [item.strip() for item in settings.allowed_mime_types.split(",")]
    if content_type not in allowed:
        raise AppError(
            code=ErrorCode.FILE_TYPE_INVALID,
            message="Unsupported file type",
            status_code=415
        )


def validate_gstin(value: str | None) -> None:
    """Validate GSTIN format if provided."""
    if value and not GSTIN_REGEX.match(value):
        raise AppError(
            code=ErrorCode.VALIDATION_FAILED,
            message="GSTIN format is invalid",
            status_code=422,
            details={"gst_number": "Invalid GSTIN"}
        )


def validate_required_fields(payload: dict[str, Any], required: list[str]) -> None:
    """Ensure required fields are present in the payload."""
    missing = [field for field in required if not payload.get(field)]
    if missing:
        raise AppError(
            code=ErrorCode.VALIDATION_FAILED,
            message="Missing required fields",
            status_code=422,
            details={field: "Required" for field in missing}
        )


def sanitize_invoice_payload(payload: dict[str, Any]) -> dict[str, Any]:
    """Sanitize extracted invoice payload values."""
    cleaned = {
        "vendor_name": sanitize_text(str(payload.get("vendor_name", ""))),
        "gst_number": sanitize_text(str(payload.get("gst_number", "")))
        if payload.get("gst_number")
        else None,
        "invoice_number": sanitize_text(str(payload.get("invoice_number", ""))),
        "invoice_date": sanitize_text(str(payload.get("invoice_date", "")))
        if payload.get("invoice_date")
        else None,
        "total_amount": payload.get("total_amount"),
        "line_items": []
    }

    line_items = payload.get("line_items")
    if isinstance(line_items, list):
        for item in line_items:
            cleaned["line_items"].append(
                {
                    "description": sanitize_text(str(item.get("description", ""))),
                    "quantity": item.get("quantity"),
                    "unit_price": item.get("unit_price"),
                    "tax_rate": item.get("tax_rate"),
                    "total": item.get("total")
                }
            )

    return cleaned
