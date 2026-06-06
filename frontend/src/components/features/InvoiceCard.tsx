import { Badge } from "@/components/ui/Badge";
import { copy } from "@/constants/copy";
import type { InvoiceSummary } from "@/types/app";

const statusVariantMap: Record<InvoiceSummary["status"], "success" | "warning" | "danger" | "neutral"> = {
  pending: "warning",
  validated: "success",
  synced: "success",
  failed: "danger"
};

/**
 * Displays summary details for a single invoice.
 */
export const InvoiceCard = ({ invoice }: { invoice: InvoiceSummary }) => {
  return (
    <div className="rounded-2xl border border-mist-200 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-ink-700">{invoice.vendorName}</h3>
          <p className="mt-1 text-xs text-ink-500">{invoice.invoiceNumber}</p>
        </div>
        <Badge label={copy.invoices.statusLabels[invoice.status]} variant={statusVariantMap[invoice.status]} />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-ink-600">
        <span>{invoice.invoiceDate}</span>
        <span className="font-semibold text-ink-700">
          {copy.common.currencyLabel} {invoice.totalAmount.toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
};
