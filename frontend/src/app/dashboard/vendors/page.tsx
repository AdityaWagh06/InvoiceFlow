import Link from "next/link";

import { Button } from "@/components/ui/Button";

const vendors = [
  {
    name: "Sharma Traders",
    gst: "27AAPFU0939F1ZV",
    invoices: 42,
    amount: "₹6,45,200",
    lastInvoice: "28 May 2026"
  },
  {
    name: "Mehta Enterprises",
    gst: "29ABCDE1234F1Z5",
    invoices: 31,
    amount: "₹4,10,800",
    lastInvoice: "26 May 2026"
  },
  {
    name: "Rajesh & Co.",
    gst: "07AAHCS9990A1Z8",
    invoices: 18,
    amount: "₹2,32,900",
    lastInvoice: "24 May 2026"
  }
];

const VendorsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-700">Vendors</h1>
        <p className="text-sm text-ink-600">All vendors extracted from invoices.</p>
      </div>
      <div className="rounded-2xl border border-mist-200 bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-mist-200 px-5 py-4">
          <div className="text-sm font-semibold text-ink-700">Vendor list</div>
          <Button variant="secondary">Export</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-mist-100 text-xs text-ink-500">
              <tr>
                <th className="px-5 py-3 text-left">Vendor Name</th>
                <th className="px-5 py-3 text-left">GST Number</th>
                <th className="px-5 py-3 text-left">Total Invoices</th>
                <th className="px-5 py-3 text-left">Total Amount (₹)</th>
                <th className="px-5 py-3 text-left">Last Invoice Date</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.name} className="border-t border-mist-200 hover:bg-mist-100">
                  <td className="px-5 py-3 font-semibold text-ink-700">{vendor.name}</td>
                  <td className="px-5 py-3 text-ink-600">{vendor.gst}</td>
                  <td className="px-5 py-3 text-ink-600">{vendor.invoices}</td>
                  <td className="px-5 py-3 text-ink-600">{vendor.amount}</td>
                  <td className="px-5 py-3 text-ink-600">{vendor.lastInvoice}</td>
                  <td className="px-5 py-3">
                    <Button asChild variant="ghost">
                      <Link href="/dashboard/invoices">View invoices</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorsPage;
