import base64
import json
from typing import Any

from openai import AsyncOpenAI

from app.core.config import settings
from app.exceptions import AppError, ErrorCode


async def extract_invoice(file_bytes: bytes, content_type: str) -> dict[str, Any]:
    """Send invoice image or PDF to GPT-4o Vision and parse JSON response."""
    if not settings.openai_api_key:
        raise AppError(
            code=ErrorCode.GPT_EXTRACTION_FAILED,
            message="OpenAI API key not configured",
            status_code=500
        )

    client = AsyncOpenAI(api_key=settings.openai_api_key)
    encoded = base64.b64encode(file_bytes).decode("utf-8")

    prompt = (
        "Extract invoice data for Indian GST compliance. Return JSON with keys: "
        "vendor_name, gst_number, invoice_number, invoice_date, line_items (array of "
        "description, quantity, unit_price, tax_rate, total), total_amount."
    )

    try:
        response = await client.chat.completions.create(
            model=settings.openai_model,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{content_type};base64,{encoded}"
                            }
                        }
                    ]
                }
            ],
            response_format={"type": "json_object"},
            temperature=0.1
        )
    except Exception as exc:
        raise AppError(
            code=ErrorCode.GPT_EXTRACTION_FAILED,
            message="Failed to extract invoice data",
            status_code=502,
            details={"error": str(exc)}
        ) from exc

    content = response.choices[0].message.content
    if not content:
        raise AppError(
            code=ErrorCode.GPT_EXTRACTION_FAILED,
            message="Empty extraction response",
            status_code=502
        )

    try:
        return json.loads(content)
    except Exception as exc:
        raise AppError(
            code=ErrorCode.GPT_EXTRACTION_FAILED,
            message="Invalid extraction payload",
            status_code=502,
            details={"error": str(exc)}
        ) from exc
