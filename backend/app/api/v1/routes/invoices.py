import uuid

from fastapi import APIRouter, Depends, File, UploadFile

from app.exceptions import AppError, ErrorCode
from app.models.invoice import InvoiceSummary
from app.services.auth_service import get_current_user
from app.services.rate_limit_service import enforce_upload_rate_limit
from app.services.r2_service import upload_invoice
from app.services.gpt_service import extract_invoice
from app.services.validation_service import (
    sanitize_invoice_payload,
    validate_file_upload,
    validate_gstin,
    validate_required_fields
)
from app.tasks.invoice_tasks import process_invoice_upload

router = APIRouter()


@router.get("/")
async def list_invoices(_: dict = Depends(get_current_user)) -> list[InvoiceSummary]:
    """Return invoice summaries for the current user."""
    return []


@router.post("/upload")
async def upload_invoice_file(
    file: UploadFile = File(...),
    user: dict = Depends(get_current_user)
) -> dict[str, str]:
    """Upload invoice file, store in R2, and enqueue extraction."""
    content_type = file.content_type or ""
    contents = await file.read()
    validate_file_upload(len(contents), content_type)
    enforce_upload_rate_limit(user["user_id"])

    key = f"invoices/{user['user_id']}/{uuid.uuid4()}-{file.filename}"
    file_url = upload_invoice(contents, key, content_type)

    try:
        process_invoice_upload.delay(contents, content_type)
    except Exception as exc:
        raise AppError(
            code=ErrorCode.INVOICE_UPLOAD_FAILED,
            message="Failed to enqueue extraction",
            status_code=502,
            details={"error": str(exc)}
        ) from exc

    return {"status": "queued", "file_url": file_url}


@router.post("/extract")
async def extract_invoice_payload(
    file: UploadFile = File(...),
    user: dict = Depends(get_current_user)
) -> dict[str, str | float | list[dict[str, float | str]] | None]:
    """Extract invoice fields using GPT-4o Vision."""
    content_type = file.content_type or ""
    contents = await file.read()
    validate_file_upload(len(contents), content_type)
    enforce_upload_rate_limit(user["user_id"])

    payload = await extract_invoice(contents, content_type)
    cleaned = sanitize_invoice_payload(payload)
    validate_required_fields(
        cleaned,
        ["vendor_name", "invoice_number", "invoice_date", "total_amount"]
    )
    validate_gstin(cleaned.get("gst_number"))

    return cleaned
