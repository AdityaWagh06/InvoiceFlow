import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, CloudUpload } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const stats = [
  {
    label: "Total Invoices Processed",
    value: "12,840",
    trend: "+12.4%",
    trendUp: true
  },
  {
    label: "Pending Verification",
    value: "18",
    trend: "-3 this week",
    trendUp: false
  },
  {
    label: "This Month Amount",
    value: "₹8,92,450",
    trend: "+9.1%",
    trendUp: true
  },
  {
    label: "ERP Synced",
    value: "142",
    trend: "+24",
    trendUp: true
  }
];

const recentInvoices = [
  {
    id: "INV-2024-1042",
    vendor: "Sharma Traders",
    date: "28 May 2026",
    amount: "₹12,450",
    gst: "27AAPFU0939F1ZV",
    status: "Pending"
  },
  {
    id: "INV-2024-1043",
    vendor: "Mehta Enterprises",
    date: "27 May 2026",
    amount: "₹67,800",
    gst: "29ABCDE1234F1Z5",
    status: "Processing"
  },
  {
    id: "GST/2024-25/0891",
    vendor: "Delhi Auto Parts",
    date: "26 May 2026",
    amount: "₹8,925",
    gst: "07AAHCS9990A1Z8",
    status: "Verified"
  },
  {
    id: "INV-2024-1044",
    vendor: "Mumbai Paper House",
    date: "25 May 2026",
    amount: "₹3,200",
    gst: "27AAPFU0939F1ZV",
    status: "Synced"
  }
];

const badgeVariantMap: Record<string, "warning" | "info" | "success" | "indigo" | "danger"> = {
  Pending: "warning",
  Processing: "info",
  Verified: "success",
  Synced: "indigo",
  Failed: "danger"
};

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-700">Dashboard</h1>
        <p className="text-sm text-ink-600">Your invoice flow, live and in sync.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="text-xs text-ink-500">{stat.label}</div>
            <div className="mt-2 text-lg font-semibold text-ink-700">{stat.value}</div>
            <div className="mt-2 inline-flex items-center gap-1 text-xs text-ink-500">
              {stat.trendUp ? (
                <ArrowUpRight className="h-3 w-3 text-emerald-500" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-rose-500" />
              )}
              {stat.trend}
            </div>
          </Card>
        ))}
      </div>

      <div className="rounded-2xl border border-mist-200 bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-mist-200 px-5 py-4">
          <div>
            <div className="text-sm font-semibold text-ink-700">Recent invoices</div>
            <div className="text-xs text-ink-500">Latest 10 uploads</div>
          </div>
          <Button asChild variant="secondary">
            <Link href="/dashboard/invoices">View all</Link>
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-mist-100 text-xs text-ink-500">
              <tr>
                <th className="px-5 py-3 text-left">Invoice No.</th>
                <th className="px-5 py-3 text-left">Vendor</th>
                <th className="px-5 py-3 text-left">Date</th>
                <th className="px-5 py-3 text-left">Amount</th>
                <th className="px-5 py-3 text-left">GST</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-t border-mist-200 hover:bg-mist-100">
                  <td className="px-5 py-3 font-semibold text-ink-700">{invoice.id}</td>
                  <td className="px-5 py-3 text-ink-600">{invoice.vendor}</td>
                  <td className="px-5 py-3 text-ink-600">{invoice.date}</td>
                  <td className="px-5 py-3 text-ink-600">{invoice.amount}</td>
                  <td className="px-5 py-3 text-ink-600">{invoice.gst}</td>
                  <td className="px-5 py-3">
                    <Badge label={invoice.status} variant={badgeVariantMap[invoice.status]} />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost">View</Button>
                      <Button variant="secondary">Export</Button>
                      <Button variant="primary">Sync to Tally</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-mist-200 bg-white p-6 shadow-card">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-500">
            <CloudUpload className="h-5 w-5" />
          </div>
          <div className="text-sm font-semibold text-ink-700">Drop invoice here or click to upload</div>
          <div className="text-xs text-ink-500">Accepted: JPG, PNG, PDF — Max 10MB</div>
          <Button>Upload invoice</Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
