export type ErrorCode =
  | "AUTH_REQUIRED"
  | "AUTH_FORBIDDEN"
  | "INVOICE_NOT_FOUND"
  | "INVOICE_DUPLICATE"
  | "INVOICE_UPLOAD_FAILED"
  | "GPT_EXTRACTION_FAILED"
  | "GPT_TIMEOUT"
  | "VALIDATION_FAILED"
  | "ERP_SYNC_FAILED"
  | "PAYMENT_FAILED"
  | "RATE_LIMIT_EXCEEDED"
  | "FILE_TOO_LARGE"
  | "FILE_TYPE_INVALID"
  | "DB_ERROR"
  | "UNKNOWN";

export interface AppError {
  code: ErrorCode;
  message: string;
  statusCode: number;
  details?: Record<string, string>;
}

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  total: number;
}

export interface InvoiceSummary {
  id: string;
  vendorName: string;
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: number;
  status: "pending" | "validated" | "synced" | "failed";
}
