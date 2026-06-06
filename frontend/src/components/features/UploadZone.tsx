"use client";

import React, { useCallback, useState } from "react";

import { Button } from "@/components/ui/Button";
import { copy } from "@/constants/copy";
import { useToast } from "@/hooks/useToast";
import { captureError } from "@/lib/sentry";
import type { AppError } from "@/types/app";
import { validateInvoiceFile } from "@/utils/validators";
import { toAppError } from "@/lib/api";

interface UploadZoneProps {
  onUpload: (file: File) => Promise<void>;
}

/**
 * Drag-and-drop upload zone with file validation.
 */
export const UploadZone = ({ onUpload }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { pushToast } = useToast();

  const handleError = useCallback(
    (error: AppError) => {
      console.error("Upload invoice failed", error);
      captureError(error);
      pushToast({ type: "error", title: error.message });
    },
    [pushToast]
  );

  const handleUpload = useCallback(
    async (file: File) => {
      const validationError = validateInvoiceFile(file);
      if (validationError) {
        handleError(validationError);
        return;
      }

      try {
        await onUpload(file);
        pushToast({ type: "success", title: copy.upload.uploadStarted });
      } catch (error) {
        handleError(toAppError(error));
      }
    },
    [handleError, onUpload, pushToast]
  );

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files?.[0];
      if (file) {
        void handleUpload(file);
      }
    },
    [handleUpload]
  );

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      className={`flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed p-8 text-center transition ${
        isDragging ? "border-accent-500 bg-accent-500/5" : "border-mist-300 bg-white"
      }`}
    >
      <div>
        <h3 className="text-lg font-semibold text-ink-700">{copy.dashboard.uploadCta}</h3>
        <p className="mt-2 text-sm text-ink-600">{copy.upload.dropHint}</p>
      </div>
      <div>
        <Button asChild variant="secondary">
          <label className="cursor-pointer">
            <input
              type="file"
              className="sr-only"
              accept="application/pdf,image/jpeg,image/png"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  void handleUpload(file);
                }
              }}
            />
            {copy.dashboard.uploadCta}
          </label>
        </Button>
      </div>
    </div>
  );
};
