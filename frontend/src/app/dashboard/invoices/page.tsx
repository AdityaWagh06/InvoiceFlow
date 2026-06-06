"use client";

import { useMemo, useState } from "react";
import { Download, Filter, Search, X } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { classNames } from "@/utils/classNames";

const invoices = [
  {
    id: "INV-2024-1042",
    vendor: "Sharma Traders",
    gst: "27AAPFU0939F1ZV",
    date: "28 May 2026",
    amount: "₹12,450",
    tax: "₹1,890",
    status: "Pending"
  },
  {
    id: "INV-2024-1043",
    vendor: "Mehta Enterprises",
    gst: "29ABCDE1234F1Z5",
    date: "27 May 2026",
    amount: "₹67,800",
    tax: "₹12,204",
    status: "Verified"
  },
  {
    id: "GST/2024-25/0891",
    vendor: "Mumbai Paper House",
    gst: "27AAPFU0939F1ZV",
    date: "26 May 2026",
    amount: "₹8,925",
    tax: "₹1,606",
    status: "Synced"
  },
  {
    id: "INV-2024-1044",
    vendor: "Delhi Auto Parts",
    gst: "07AAHCS9990A1Z8",
    date: "25 May 2026",
    amount: "₹3,200",
    tax: "₹576",
    status: "Failed"
  }
];

const badgeVariantMap: Record<string, "warning" | "info" | "success" | "indigo" | "danger"> = {
  Pending: "warning",
  Processing: "info",
  Verified: "success",
  Synced: "indigo",
  Failed: "danger"
};

const drawerTabs = ["Details", "Original Image", "ERP Sync Log", "Export"] as const;

const InvoicesPage = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<(typeof drawerTabs)[number]>("Details");

  const selectedInvoice = useMemo(() => invoices.find((invoice) => invoice.id === drawerId), [drawerId]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-700">Invoices</h1>
        <p className="text-sm text-ink-600">Search, filter, and manage invoice workflows.</p>
      </div>

      <div className="rounded-2xl border border-mist-200 bg-white p-4 shadow-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-ink-400" />
              <Input className="pl-9" placeholder="Search vendor or invoice" />
            </div>
            <Button variant="secondary">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Input type="date" />
            <Input type="date" />
          </div>
        </div>

        {selected.length > 0 ? (
          <div className="mt-4 flex items-center justify-between rounded-xl border border-mist-200 bg-mist-100 px-4 py-3 text-sm">
            <span className="text-ink-600">{selected.length} selected</span>
            <div className="flex items-center gap-2">
              <Button variant="secondary">Export Selected</Button>
              <Button>Sync Selected</Button>
              <Button variant="danger">Delete Selected</Button>
            </div>
          </div>
        ) : null}

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-mist-100 text-xs text-ink-500">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selected.length === invoices.length}
                    onChange={(event) =>
                      setSelected(event.target.checked ? invoices.map((invoice) => invoice.id) : [])
                    }
                  />
                </th>
                <th className="px-4 py-3 text-left">Invoice No.</th>
                <th className="px-4 py-3 text-left">Vendor</th>
                <th className="px-4 py-3 text-left">GST No.</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Amount (₹)</th>
                <th className="px-4 py-3 text-left">Tax (₹)</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-t border-mist-200 hover:bg-mist-100"
                  onClick={() => setDrawerId(invoice.id)}
                >
                  <td className="px-4 py-3" onClick={(event) => event.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.includes(invoice.id)}
                      onChange={(event) =>
                        setSelected((prev) =>
                          event.target.checked
                            ? [...prev, invoice.id]
                            : prev.filter((item) => item !== invoice.id)
                        )
                      }
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold text-ink-700">{invoice.id}</td>
                  <td className="px-4 py-3 text-ink-600">{invoice.vendor}</td>
                  <td className="px-4 py-3 text-ink-600">{invoice.gst}</td>
                  <td className="px-4 py-3 text-ink-600">{invoice.date}</td>
                  <td className="px-4 py-3 text-ink-600">{invoice.amount}</td>
                  <td className="px-4 py-3 text-ink-600">{invoice.tax}</td>
                  <td className="px-4 py-3">
                    <Badge label={invoice.status} variant={badgeVariantMap[invoice.status]} />
                  </td>
                  <td className="px-4 py-3" onClick={(event) => event.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost">View</Button>
                      <Button variant="secondary">Export</Button>
                      <Button>Sync</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-ink-500">
          <span>Showing 1-25 of 143 invoices</span>
          <div className="flex items-center gap-2">
            <Button variant="secondary">Prev</Button>
            <Button variant="secondary">Next</Button>
          </div>
        </div>
      </div>

      {drawerId && selectedInvoice ? (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/20 p-6">
          <div className="flex h-full w-full max-w-xl flex-col rounded-2xl border border-mist-200 bg-white shadow-soft">
            <div className="flex items-center justify-between border-b border-mist-200 px-5 py-4">
              <div>
                <div className="text-sm font-semibold text-ink-700">{selectedInvoice.id}</div>
                <Badge label={selectedInvoice.status} variant={badgeVariantMap[selectedInvoice.status]} />
              </div>
              <button
                className="rounded-lg p-2 text-ink-500 hover:bg-mist-100"
                onClick={() => setDrawerId(null)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-2 border-b border-mist-200 px-5 py-3 text-xs font-semibold text-ink-500">
              {drawerTabs.map((tab) => (
                <button
                  key={tab}
                  className={classNames(
                    "rounded-full px-3 py-1",
                    activeTab === tab ? "bg-indigo-500/10 text-indigo-500" : "hover:bg-mist-100"
                  )}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto p-5 text-sm text-ink-600">
              {activeTab === "Details" ? (
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-500">Vendor</span>
                    <span className="font-semibold text-ink-700">{selectedInvoice.vendor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-500">GST No.</span>
                    <span className="font-semibold text-ink-700">{selectedInvoice.gst}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-500">Total</span>
                    <span className="font-semibold text-ink-700">{selectedInvoice.amount}</span>
                  </div>
                </div>
              ) : null}
              {activeTab === "Original Image" ? (
                <div className="h-64 rounded-xl border border-mist-200 bg-mist-100" />
              ) : null}
              {activeTab === "ERP Sync Log" ? (
                <table className="w-full text-xs">
                  <thead className="text-ink-500">
                    <tr>
                      <th className="py-2 text-left">Date</th>
                      <th className="py-2 text-left">Status</th>
                      <th className="py-2 text-left">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-mist-200">
                      <td className="py-2">28 May 2026</td>
                      <td className="py-2 text-emerald-500">Success</td>
                      <td className="py-2">Synced to Tally Prime</td>
                    </tr>
                    <tr className="border-t border-mist-200">
                      <td className="py-2">27 May 2026</td>
                      <td className="py-2 text-amber-500">Retry</td>
                      <td className="py-2">Awaiting approval</td>
                    </tr>
                  </tbody>
                </table>
              ) : null}
              {activeTab === "Export" ? (
                <div className="grid gap-3">
                  <Button variant="secondary">
                    <Download className="h-4 w-4" /> Export as Excel
                  </Button>
                  <Button variant="secondary">
                    <Download className="h-4 w-4" /> Export as CSV
                  </Button>
                  <Button variant="secondary">
                    <Download className="h-4 w-4" /> Export as JSON
                  </Button>
                </div>
              ) : null}
            </div>
            <div className="border-t border-mist-200 px-5 py-4">
              <Button className="w-full">Sync to Tally</Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InvoicesPage;
