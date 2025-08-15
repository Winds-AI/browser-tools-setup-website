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

export default function Callout({ title, variant = "info", children, className = "" }: Props) {
  return (
    <div
      className={`my-3 rounded-md border px-3 py-2 text-sm ${styles[variant]} ${className}`}
      role="note"
      aria-label={title || variant}
    >
      <div className="mb-1 flex items-center gap-2">
        <span aria-hidden>{icons[variant]}</span>
        {title ? <strong className="text-neutral-100">{title}</strong> : null}
      </div>
      <div className="text-neutral-200">{children}</div>
    </div>
  );
}
