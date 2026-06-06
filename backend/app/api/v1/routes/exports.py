from fastapi import APIRouter, Depends
from fastapi.responses import Response

from app.models.invoice import InvoiceSummary
from app.services.auth_service import get_current_user
from app.services.export_service import export_invoices_csv

router = APIRouter()


@router.get("/csv")
async def export_csv(_: dict = Depends(get_current_user)) -> Response:
    """Export invoices as a CSV file."""
    payload = export_invoices_csv([])
    return Response(
        payload,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=invoices.csv"}
    )
