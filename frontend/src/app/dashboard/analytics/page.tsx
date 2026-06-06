"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const lineData = [
  { day: "01", value: 18 },
  { day: "05", value: 26 },
  { day: "10", value: 22 },
  { day: "15", value: 30 },
  { day: "20", value: 28 },
  { day: "25", value: 34 },
  { day: "30", value: 38 }
];

const vendorData = [
  { name: "Sharma Traders", count: 42 },
  { name: "Mehta Enterprises", count: 31 },
  { name: "Rajesh & Co.", count: 24 },
  { name: "Mumbai Paper House", count: 18 },
  { name: "Delhi Auto Parts", count: 14 }
];

const statusData = [
  { name: "Pending", value: 18, color: "#f59e0b" },
  { name: "Verified", value: 62, color: "#10b981" },
  { name: "Synced", value: 48, color: "#4f46e5" },
  { name: "Failed", value: 6, color: "#ef4444" }
];

const AnalyticsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-700">Analytics</h1>
        <p className="text-sm text-ink-600">Invoice trends and vendor concentration.</p>
      </div>

      <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
        <div className="text-sm font-semibold text-ink-700">Invoices processed per day</div>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
          <div className="text-sm font-semibold text-ink-700">Top vendors by invoice count</div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vendorData}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
          <div className="text-sm font-semibold text-ink-700">Invoice status breakdown</div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90}>
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-ink-500">
            {statusData.map((status) => (
              <div key={status.name} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: status.color }} />
                {status.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
        <div className="text-sm font-semibold text-ink-700">Month-over-month summary</div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-mist-100 text-xs text-ink-500">
              <tr>
                <th className="px-4 py-2 text-left">Month</th>
                <th className="px-4 py-2 text-left">Invoices</th>
                <th className="px-4 py-2 text-left">Processed Value</th>
                <th className="px-4 py-2 text-left">Sync Rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                { month: "April 2026", invoices: "980", value: "₹7,45,000", rate: "92%" },
                { month: "May 2026", invoices: "1,142", value: "₹8,92,450", rate: "95%" }
              ].map((row) => (
                <tr key={row.month} className="border-t border-mist-200">
                  <td className="px-4 py-2 text-ink-700">{row.month}</td>
                  <td className="px-4 py-2 text-ink-600">{row.invoices}</td>
                  <td className="px-4 py-2 text-ink-600">{row.value}</td>
                  <td className="px-4 py-2 text-ink-600">{row.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
