"use client";

import { useToastContext } from "@/components/ui/Toast";

/**
 * Returns the toast dispatcher used by UI components.
 */
export const useToast = () => {
  return useToastContext();
};
