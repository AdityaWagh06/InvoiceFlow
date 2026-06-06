export const api = {
  health: "/api/v1/health",
  invoices: "/api/v1/invoices",
  invoiceUpload: "/api/v1/invoices/upload",
  invoiceExtract: "/api/v1/invoices/extract",
  invoiceById: (invoiceId: string) => `/api/v1/invoices/${invoiceId}`,
  analytics: "/api/v1/analytics",
  exports: "/api/v1/exports",
  tally: "/api/v1/tally",
  payments: "/api/v1/payments"
} as const;
