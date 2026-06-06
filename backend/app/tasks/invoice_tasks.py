import asyncio

from app.services.gpt_service import extract_invoice
from app.services.validation_service import validate_required_fields, validate_gstin
from app.exceptions import AppError, ErrorCode
from app.tasks.celery_app import celery_app


@celery_app.task(name="process_invoice_upload")
def process_invoice_upload(file_bytes: bytes, content_type: str) -> dict[str, str]:
    """Background task to extract and validate invoice data."""
    try:
        payload = asyncio.run(extract_invoice(file_bytes, content_type))
        validate_required_fields(
            payload,
            ["vendor_name", "invoice_number", "invoice_date", "total_amount"]
        )
        validate_gstin(payload.get("gst_number"))
    except AppError:
        raise
    except Exception as exc:
        raise AppError(
            code=ErrorCode.GPT_EXTRACTION_FAILED,
            message="Invoice extraction failed",
            status_code=500,
            details={"error": str(exc)}
        ) from exc

    return {"status": "extracted"}
