/**
 * Joins class names while filtering out empty values.
 */
export const classNames = (...values: Array<string | false | null | undefined>) => {
  return values.filter(Boolean).join(" ");
};
