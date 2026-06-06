import React from "react";

import { classNames } from "@/utils/classNames";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  asChild?: boolean;
  isLoading?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-600",
  secondary: "border border-mist-200 bg-white text-ink-700 hover:bg-mist-100 active:bg-mist-100",
  ghost: "text-ink-600 hover:bg-mist-100 active:bg-mist-200",
  danger: "bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-600"
};

/**
 * Action button with variants and optional child rendering.
 */
export const Button = ({
  variant = "primary",
  asChild,
  isLoading,
  className,
  children,
  ...props
}: ButtonProps) => {
  const baseClassName = classNames(
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
    variantStyles[variant],
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: classNames(baseClassName, children.props.className)
    });
  }

  return (
    <button className={baseClassName} aria-busy={isLoading} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          Loading
        </span>
      ) : (
        children
      )}
    </button>
  );
};
