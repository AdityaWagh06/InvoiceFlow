type SpinnerProps = {
  label: string;
};

/**
 * Loading spinner with accessible label.
 */
export const Spinner = ({ label }: SpinnerProps) => {
  return (
    <div className="flex items-center gap-3 text-sm text-ink-600">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-mist-200 border-t-accent-500" />
      <span>{label}</span>
    </div>
  );
};
