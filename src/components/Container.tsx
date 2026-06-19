import type { ReactNode } from "react";

export function Container({
  children,
  size = "default",
  className = "",
}: {
  children: ReactNode;
  size?: "default" | "narrow" | "wide";
  className?: string;
}) {
  const max =
    size === "narrow"
      ? "max-w-2xl"
      : size === "wide"
      ? "max-w-6xl"
      : "max-w-5xl";
  return (
    <div className={`mx-auto ${max} px-5 sm:px-8 ${className}`}>{children}</div>
  );
}
