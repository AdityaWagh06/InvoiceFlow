"use client";

import { ErrorState } from "@/components/ui/ErrorState";
import { copy } from "@/constants/copy";

/**
 * App-level error boundary UI.
 */
const RootError = ({ reset }: { reset: () => void }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mist-100">
      <ErrorState title={copy.states.errorTitle} body={copy.states.errorBody} onRetry={reset} />
    </div>
  );
};

export default RootError;
