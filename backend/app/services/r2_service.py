from typing import Any

import boto3

from app.core.config import settings
from app.exceptions import AppError, ErrorCode


def upload_invoice(file_bytes: bytes, key: str, content_type: str) -> str:
    """Upload invoice file to Cloudflare R2 and return object URL."""
    if not all([
        settings.r2_endpoint,
        settings.r2_access_key_id,
        settings.r2_secret_access_key,
        settings.r2_bucket_name
    ]):
        raise AppError(
            code=ErrorCode.INVOICE_UPLOAD_FAILED,
            message="R2 is not configured",
            status_code=502
        )
    try:
        client = boto3.client(
            "s3",
            endpoint_url=settings.r2_endpoint,
            aws_access_key_id=settings.r2_access_key_id,
            aws_secret_access_key=settings.r2_secret_access_key,
            region_name="auto"
        )
        client.put_object(
            Bucket=settings.r2_bucket_name,
            Key=key,
            Body=file_bytes,
            ContentType=content_type
        )
    except Exception as exc:
        raise AppError(
            code=ErrorCode.INVOICE_UPLOAD_FAILED,
            message="Failed to upload invoice",
            status_code=502,
            details={"error": str(exc)}
        ) from exc

    return f"{settings.r2_endpoint}/{settings.r2_bucket_name}/{key}"
