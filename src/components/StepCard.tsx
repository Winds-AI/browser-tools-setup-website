import React from "react";

type Props = {
  number: number;
  title: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
};

export default function StepCard({
  number,
  title,
  children,
  id,
  className,
}: Props) {
  return (
    <section
      id={id}
      className={`mt-4 first:mt-0 rounded-lg border border-neutral-800 bg-neutral-900/40 p-4 shadow-sm hover:border-neutral-700 scroll-mt-24 ${className}`}
    >
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          {number}
        </div>
        <h2
          id={id}
          className="flex-1 min-w-0 break-words text-lg font-semibold"
        >
          {title}
          {id ? (
            <a
              href={`#${id}`}
              className="ml-3 align-middle text-xs text-neutral-400 hover:text-neutral-200"
              aria-label="Link to this step"
            >
              #
            </a>
          ) : null}
        </h2>
      </div>
      <div className="text-sm leading-relaxed text-neutral-300">{children}</div>
    </section>
  );
}
