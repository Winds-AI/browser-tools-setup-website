import React from "react";

type Variant = "info" | "success" | "warning" | "danger";

type Props = {
  title?: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
};

const styles: Record<Variant, string> = {
  info: "border-sky-500/40 bg-sky-900/20",
  success: "border-emerald-500/40 bg-emerald-900/20",
  warning: "border-amber-500/40 bg-amber-900/20",
  danger: "border-rose-500/40 bg-rose-900/20",
};

const icons: Record<Variant, string> = {
  info: "💡",
  success: "✅",
  warning: "⚠️",
  danger: "⛔",
};

export default function Callout({
  title,
  variant = "info",
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`my-3 flex items-start gap-3 rounded-md border px-3 py-2 text-sm ${styles[variant]} ${className}`}
      role={variant === "warning" || variant === "danger" ? "alert" : "note"}
      aria-label={title || variant}
      aria-live="polite"
    >
      <div className="mt-0.5 select-none text-base" aria-hidden>
        {icons[variant]}
      </div>
      <div className="min-w-0">
        {title ? (
          <div className="mb-0.5 font-semibold text-neutral-100">{title}</div>
        ) : null}
        <div className="text-neutral-200">{children}</div>
      </div>
    </div>
  );
}
