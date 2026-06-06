import * as Sentry from "@sentry/nextjs";

import type { AppError } from "@/types/app";

/**
 * Sends errors to Sentry when DSN is configured.
 */
export const captureError = (error: AppError) => {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return;
  }

  Sentry.captureException(error);
};
