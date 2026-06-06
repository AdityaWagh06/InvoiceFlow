"use client";

import { Button } from "@/components/ui/Button";

const ExportsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-700">Exports</h1>
        <p className="text-sm text-ink-600">Download invoice data in your preferred format.</p>
      </div>
      <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-ink-700">Export as CSV</div>
            <p className="text-xs text-ink-500">Includes line items, GST, and totals.</p>
          </div>
          <Button>Download CSV</Button>
        </div>
      </div>
      <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-ink-700">Export as Excel</div>
            <p className="text-xs text-ink-500">Formatted for finance and audit teams.</p>
          </div>
          <Button variant="secondary">Download Excel</Button>
        </div>
      </div>
    </div>
  );
};

export default ExportsPage;
