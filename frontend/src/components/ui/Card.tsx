type CardProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

/**
 * Surface card with optional title and description.
 */
export const Card = ({ title, description, children }: CardProps) => {
  return (
    <div className="rounded-xl border border-mist-200 bg-white p-5 shadow-card">
      {title ? <h3 className="text-base font-semibold text-ink-700">{title}</h3> : null}
      {description ? <p className="mt-2 text-sm text-ink-600">{description}</p> : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
};
