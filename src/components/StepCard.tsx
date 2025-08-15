import React from "react";

type Props = {
  number: number;
  title: string;
  children: React.ReactNode;
};

export default function StepCard({ number, title, children }: Props) {
  return (
    <section className="mt-4 first:mt-0 rounded-lg border border-neutral-800 bg-neutral-900/40 p-4 shadow-sm hover:border-neutral-700">
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          {number}
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="text-sm leading-relaxed text-neutral-300">{children}</div>
    </section>
  );
}
