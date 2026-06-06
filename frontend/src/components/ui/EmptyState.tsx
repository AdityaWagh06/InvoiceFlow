import { copy } from "@/constants/copy";
import { Button } from "@/components/ui/Button";

type EmptyStateProps = {
  title?: string;
  body?: string;
  actionLabel?: string;
  onAction?: () => void;
};

/**
 * Empty state panel for lists and dashboards.
 */
export const EmptyState = ({ title, body, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
      <div>
        <h3 className="text-lg font-semibold text-ink-700">{title ?? copy.states.emptyTitle}</h3>
        <p className="mt-2 text-sm text-ink-600">{body ?? copy.states.emptyBody}</p>
      </div>
      {actionLabel && onAction ? (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
};
