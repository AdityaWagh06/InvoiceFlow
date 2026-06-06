import { Button } from "@/components/ui/Button";
import { copy } from "@/constants/copy";

type ErrorStateProps = {
  title: string;
  body: string;
  onRetry?: () => void;
};

/**
 * Error state panel with optional retry action.
 */
export const ErrorState = ({ title, body, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-rose-500/20 bg-white p-6 shadow-card">
      <div>
        <h3 className="text-lg font-semibold text-ink-700">{title}</h3>
        <p className="mt-2 text-sm text-ink-600">{body}</p>
      </div>
      {onRetry ? (
        <Button variant="secondary" onClick={onRetry}>
          {copy.common.retry}
        </Button>
      ) : null}
    </div>
  );
};
