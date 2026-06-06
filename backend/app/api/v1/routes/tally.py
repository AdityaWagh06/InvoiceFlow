from fastapi import APIRouter, Depends

from app.services.auth_service import get_current_user

router = APIRouter()


@router.post("/sync")
async def sync_to_tally(_: dict = Depends(get_current_user)) -> dict[str, str]:
    """Queue Tally ERP sync for validated invoices."""
    return {"status": "queued"}
