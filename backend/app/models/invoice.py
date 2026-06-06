from datetime import date
from typing import Optional

from pydantic import BaseModel
from sqlalchemy import Date, Float, String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class Invoice(Base):
    """SQLAlchemy model for invoices."""

    __tablename__ = "invoices"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    vendor_name: Mapped[str] = mapped_column(String, nullable=False)
    gst_number: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    invoice_number: Mapped[str] = mapped_column(String, nullable=False)
    invoice_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    total_amount: Mapped[float] = mapped_column(Float, nullable=False)
    status: Mapped[str] = mapped_column(String, nullable=False, default="pending")


class InvoiceLineItem(BaseModel):
    """Line item extracted from an invoice."""

    description: str
    quantity: float
    unit_price: float
    tax_rate: float
    total: float


class InvoiceCreate(BaseModel):
    """Payload for creating an invoice record."""

    vendor_name: str
    gst_number: Optional[str]
    invoice_number: str
    invoice_date: Optional[date]
    total_amount: float
    line_items: list[InvoiceLineItem]


class InvoiceSummary(BaseModel):
    """Minimal invoice details returned by list endpoints."""

    id: str
    vendor_name: str
    invoice_number: str
    invoice_date: Optional[date]
    total_amount: float
    status: str
