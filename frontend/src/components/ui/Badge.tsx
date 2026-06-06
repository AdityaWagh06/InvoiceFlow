import { classNames } from "@/utils/classNames";

type BadgeVariant = "success" | "warning" | "danger" | "neutral" | "info" | "indigo";

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
};

const badgeStyles: Record<BadgeVariant, string> = {
  success: "bg-emerald-500/10 text-emerald-500",
  warning: "bg-amber-500/10 text-amber-500",
  danger: "bg-rose-500/10 text-rose-500",
  info: "bg-sky-500/10 text-sky-500",
  indigo: "bg-indigo-500/10 text-indigo-500",
  neutral: "bg-mist-200 text-ink-600"
};

/**
 * Status badge used for invoice labels.
 */
export const Badge = ({ label, variant = "neutral" }: BadgeProps) => {
  return (
    <span className={classNames("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold", badgeStyles[variant])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
};
