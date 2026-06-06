from fastapi import APIRouter, Depends

from app.services.auth_service import get_current_user

router = APIRouter()


@router.get("/")
async def analytics_overview(_: dict = Depends(get_current_user)) -> dict[str, int]:
    """Return summary analytics for dashboard widgets."""
    return {"total": 0, "pending": 0, "synced": 0}
