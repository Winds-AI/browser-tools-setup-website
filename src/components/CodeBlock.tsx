"use client";
import React, { useState } from "react";

type Props = {
  code: string;
  language?: string;
  className?: string;
  title?: string;
};

export default function CodeBlock({
  code,
  language = "bash",
  className = "",
  title,
}: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div
      className={`relative rounded-lg border border-neutral-800 bg-neutral-950 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-neutral-900 px-3 py-2">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wide text-neutral-400">
            {language}
          </span>
          {title ? (
            <span className="text-xs text-neutral-500">{title}</span>
          ) : null}
        </div>
        <button
          onClick={onCopy}
          className="cursor-pointer rounded-md bg-neutral-800 px-2 py-1 text-xs text-neutral-200 hover:bg-neutral-700"
          aria-label="Copy code"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}
