"use client";

import { ErrorState } from "@/components/ui/ErrorState";
import { copy } from "@/constants/copy";

/**
 * Error boundary for dashboard pages.
 */
const DashboardError = ({ reset }: { reset: () => void }) => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <ErrorState title={copy.states.errorTitle} body={copy.states.errorBody} onRetry={reset} />
    </div>
  );
};

export default DashboardError;
