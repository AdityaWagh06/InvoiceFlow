import { Input } from "@/components/ui/Input";
import { copy } from "@/constants/copy";

type ExtractionReviewProps = {
  vendorName: string;
  gstNumber: string;
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: string;
  onChange: (field: string, value: string) => void;
};

/**
 * Editable extraction review form.
 */
export const ExtractionReview = ({
  vendorName,
  gstNumber,
  invoiceNumber,
  invoiceDate,
  totalAmount,
  onChange
}: ExtractionReviewProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Input
        label={copy.review.vendorNameLabel}
        value={vendorName}
        onChange={(event) => onChange("vendorName", event.target.value)}
      />
      <Input
        label={copy.review.gstNumberLabel}
        value={gstNumber}
        onChange={(event) => onChange("gstNumber", event.target.value)}
      />
      <Input
        label={copy.review.invoiceNumberLabel}
        value={invoiceNumber}
        onChange={(event) => onChange("invoiceNumber", event.target.value)}
      />
      <Input
        label={copy.review.invoiceDateLabel}
        value={invoiceDate}
        onChange={(event) => onChange("invoiceDate", event.target.value)}
      />
      <Input
        label={copy.review.totalAmountLabel}
        value={totalAmount}
        onChange={(event) => onChange("totalAmount", event.target.value)}
      />
    </div>
  );
};
