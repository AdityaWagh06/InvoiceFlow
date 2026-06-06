import { AlertTriangle, RotateCcw, ZoomIn } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const lineItems = [
  { id: 1, description: "A4 Paper Pack", qty: 10, rate: "₹220", tax: "18%", amount: "₹2,200" },
  { id: 2, description: "Printer Ink", qty: 2, rate: "₹1,500", tax: "18%", amount: "₹3,000" }
];

const ReviewPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-ink-700">Extraction review</h1>
          <p className="text-sm text-ink-600">INV-2024-1042 • Sharma Traders</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">
            <RotateCcw className="h-4 w-4" /> Re-extract
          </Button>
          <Button>Confirm &amp; Save</Button>
        </div>
      </div>

      <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-600">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" /> This looks like a duplicate of Invoice #1042. Confirm anyway?
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-ink-700">Original invoice</div>
            <Button variant="secondary">
              <ZoomIn className="h-4 w-4" /> Zoom
            </Button>
          </div>
          <div className="mt-4 h-[420px] rounded-xl border border-mist-200 bg-mist-100" />
        </div>
        <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
          <div className="text-sm font-semibold text-ink-700">Extracted fields</div>
          <div className="mt-4 grid gap-4">
            <Input label="Vendor Name" defaultValue="Sharma Traders" />
            <Input label="GST Number" defaultValue="27AAPFU0939F1ZV" helperText="Valid GSTIN format" />
            <Input label="Invoice Number" defaultValue="INV-2024-1042" />
            <Input label="Invoice Date" defaultValue="2026-05-28" type="date" />
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-ink-700">Line items</div>
              <Button variant="secondary">Add row</Button>
            </div>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-mist-100 text-xs text-ink-500">
                  <tr>
                    <th className="px-3 py-2 text-left">Description</th>
                    <th className="px-3 py-2 text-left">Qty</th>
                    <th className="px-3 py-2 text-left">Rate</th>
                    <th className="px-3 py-2 text-left">Tax%</th>
                    <th className="px-3 py-2 text-left">Amount</th>
                    <th className="px-3 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item) => (
                    <tr key={item.id} className="border-t border-mist-200">
                      <td className="px-3 py-2 text-ink-700">{item.description}</td>
                      <td className="px-3 py-2 text-ink-600">{item.qty}</td>
                      <td className="px-3 py-2 text-ink-600">{item.rate}</td>
                      <td className="px-3 py-2 text-ink-600">{item.tax}</td>
                      <td className="px-3 py-2 text-ink-600">{item.amount}</td>
                      <td className="px-3 py-2">
                        <Button variant="ghost">Remove</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-6 grid gap-3 rounded-xl border border-mist-200 bg-mist-100 p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-ink-500">Sub total</span>
              <span className="font-semibold text-ink-700">₹5,200</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-500">Tax amount</span>
              <span className="font-semibold text-ink-700">₹936</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-500">Total amount</span>
              <span className="text-base font-semibold text-ink-700">₹6,136</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
