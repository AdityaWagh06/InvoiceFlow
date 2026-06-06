import csv
import io
from typing import Iterable

from app.models.invoice import InvoiceSummary


def export_invoices_csv(invoices: Iterable[InvoiceSummary]) -> bytes:
    """Export invoices as CSV bytes."""
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["id", "vendor_name", "invoice_number", "invoice_date", "total_amount", "status"])
    for invoice in invoices:
        writer.writerow(
            [
                invoice.id,
                invoice.vendor_name,
                invoice.invoice_number,
                invoice.invoice_date,
                invoice.total_amount,
                invoice.status
            ]
        )
    return output.getvalue().encode("utf-8")
