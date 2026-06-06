from fastapi import APIRouter, Depends

from app.core.config import settings
from app.exceptions import AppError, ErrorCode
from app.services.auth_service import get_current_user

router = APIRouter()


@router.post("/checkout")
async def create_checkout(_: dict = Depends(get_current_user)) -> dict[str, str]:
    """Create Razorpay checkout session for subscriptions."""
    if not settings.razorpay_key_id or not settings.razorpay_key_secret:
        raise AppError(
            code=ErrorCode.PAYMENT_FAILED,
            message="Razorpay is not configured",
            status_code=500
        )

    return {"status": "ready"}
