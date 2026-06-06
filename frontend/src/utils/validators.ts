import { config } from "@/constants/config";
import { copy } from "@/constants/copy";
import type { AppError } from "@/types/app";

/**
 * Validates a file against size and allowed MIME types.
 */
export const validateInvoiceFile = (file: File): AppError | null => {
  if (file.size > config.maxUploadBytes) {
    return {
      code: "FILE_TOO_LARGE",
      message: copy.forms.fileTooLarge,
      statusCode: 413
    };
  }

  if (!config.allowedMimeTypes.includes(file.type)) {
    return {
      code: "FILE_TYPE_INVALID",
      message: copy.forms.invalidFileType,
      statusCode: 415
    };
  }

  return null;
};
