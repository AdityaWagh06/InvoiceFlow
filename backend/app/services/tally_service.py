from typing import Iterable

from app.models.invoice import InvoiceSummary


def build_tally_xml(invoices: Iterable[InvoiceSummary]) -> str:
    """Generate minimal Tally XML payload for invoices."""
    entries = []
    for invoice in invoices:
        entries.append(
            f"<VOUCHER><VOUCHERNUMBER>{invoice.invoice_number}</VOUCHERNUMBER>"
            f"<PARTYNAME>{invoice.vendor_name}</PARTYNAME>"
            f"<AMOUNT>{invoice.total_amount}</AMOUNT></VOUCHER>"
        )
    return f"<ENVELOPE>{''.join(entries)}</ENVELOPE>"
