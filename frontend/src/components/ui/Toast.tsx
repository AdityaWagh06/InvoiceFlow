"use client";

import React, { createContext, useCallback, useMemo, useState } from "react";

import type { ToastMessage, ToastType } from "@/types/app";
import { classNames } from "@/utils/classNames";

const toastStyles: Record<ToastType, string> = {
  success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-500",
  error: "border-rose-500/40 bg-rose-500/10 text-rose-500",
  warning: "border-amber-500/40 bg-amber-500/10 text-amber-500",
  info: "border-accent-500/40 bg-accent-500/10 text-accent-500"
};

interface ToastContextValue {
  toasts: ToastMessage[];
  pushToast: (toast: Omit<ToastMessage, "id">) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Toast provider that manages transient messages.
 */
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback(
    (toast: Omit<ToastMessage, "id">) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { ...toast, id }]);
      window.setTimeout(() => {
        dismissToast(id);
      }, 4500);
    },
    [dismissToast]
  );

  const value = useMemo(() => ({ toasts, pushToast, dismissToast }), [toasts, pushToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={classNames(
              "rounded-xl border px-4 py-3 text-sm shadow-soft",
              toastStyles[toast.type]
            )}
          >
            <div className="font-semibold">{toast.title}</div>
            {toast.description ? <div className="mt-1 text-xs">{toast.description}</div> : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

/**
 * Returns toast context value for child components.
 */
export const useToastContext = () => {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("ToastProvider is missing in the component tree.");
  }

  return context;
};
