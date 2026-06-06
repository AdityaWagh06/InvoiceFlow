from fastapi import APIRouter

from app.api.v1.routes.health import router as health_router
from app.api.v1.routes.invoices import router as invoices_router
from app.api.v1.routes.analytics import router as analytics_router
from app.api.v1.routes.exports import router as exports_router
from app.api.v1.routes.tally import router as tally_router
from app.api.v1.routes.payments import router as payments_router

router = APIRouter()

router.include_router(health_router, tags=["health"])
router.include_router(invoices_router, prefix="/invoices", tags=["invoices"])
router.include_router(analytics_router, prefix="/analytics", tags=["analytics"])
router.include_router(exports_router, prefix="/exports", tags=["exports"])
router.include_router(tally_router, prefix="/tally", tags=["tally"])
router.include_router(payments_router, prefix="/payments", tags=["payments"])
