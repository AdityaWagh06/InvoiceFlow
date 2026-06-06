import { classNames } from "@/utils/classNames";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
};

/**
 * Text input with label, helper, and error state.
 */
export const Input = ({ label, error, helperText, id, className, ...props }: InputProps) => {
  const inputId = id ?? props.name ?? undefined;
  const helperId = inputId ? `${inputId}-helper` : undefined;

  return (
    <label className="flex w-full flex-col gap-2 text-sm text-ink-600">
      {label ? <span className="font-semibold text-ink-700">{label}</span> : null}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={helperId}
        className={classNames(
          "w-full rounded-lg border border-mist-200 bg-white px-3 py-2 text-ink-700 shadow-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20",
          error ? "border-rose-500" : "",
          className
        )}
        {...props}
      />
      {helperText || error ? (
        <span id={helperId} className={classNames("text-xs", error ? "text-rose-500" : "text-ink-500")}>
          {error ?? helperText}
        </span>
      ) : null}
    </label>
  );
};
