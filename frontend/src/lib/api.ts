import { api } from "@/constants/api";
import { copy } from "@/constants/copy";
import type { AppError } from "@/types/app";

/**
 * Normalizes unknown errors into AppError shape.
 */
export const toAppError = (error: unknown): AppError => {
  if (typeof error === "object" && error !== null && "code" in error && "message" in error) {
    const typedError = error as AppError;
    return {
      code: typedError.code ?? "UNKNOWN",
      message: typedError.message ?? copy.errors.unknown,
      statusCode: typedError.statusCode ?? 500,
      details: typedError.details
    };
  }

  return {
    code: "UNKNOWN",
    message: copy.errors.unknown,
    statusCode: 500
  };
};

const getApiBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
  }

  return baseUrl;
};

/**
 * Fetch wrapper for API calls with AppError handling.
 */
export const apiFetch = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {})
    }
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as Partial<AppError> | null;
    throw {
      code: payload?.code ?? "UNKNOWN",
      message: payload?.message ?? copy.errors.unknown,
      statusCode: response.status,
      details: payload?.details
    } satisfies AppError;
  }

  return (await response.json()) as T;
};

/**
 * Uploads an invoice file to the backend.
 */
export const uploadInvoiceFile = async (file: File, token: string | null) => {
  if (!token) {
    throw {
      code: "AUTH_REQUIRED",
      message: copy.errors.authRequired,
      statusCode: 401
    } satisfies AppError;
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${getApiBaseUrl()}${api.invoiceUpload}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as Partial<AppError> | null;
    throw {
      code: payload?.code ?? "UNKNOWN",
      message: payload?.message ?? copy.errors.unknown,
      statusCode: response.status,
      details: payload?.details
    } satisfies AppError;
  }

  return (await response.json()) as { status: string; file_url: string };
};

/**
 * Extracts invoice data using GPT-4o Vision.
 */
export const extractInvoiceData = async (file: File, token: string | null) => {
  if (!token) {
    throw {
      code: "AUTH_REQUIRED",
      message: copy.errors.authRequired,
      statusCode: 401
    } satisfies AppError;
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${getApiBaseUrl()}${api.invoiceExtract}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as Partial<AppError> | null;
    throw {
      code: payload?.code ?? "UNKNOWN",
      message: payload?.message ?? copy.errors.unknown,
      statusCode: response.status,
      details: payload?.details
    } satisfies AppError;
  }

  return (await response.json()) as {
    vendor_name: string;
    gst_number?: string | null;
    invoice_number: string;
    invoice_date?: string | null;
    total_amount: number;
    line_items: Array<{
      description: string;
      quantity: number;
      unit_price: number;
      tax_rate: number;
      total: number;
    }>;
  };
};
