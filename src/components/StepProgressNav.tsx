"use client";
import React, { useEffect, useMemo, useState } from "react";

type Step = { id: string; title: string };

export default function StepProgressNav() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('section[id^="step-"]')
    );
    const collected: Step[] = sections.map((sec) => {
      const h2 = sec.querySelector("h2");
      return { id: sec.id, title: h2?.textContent || sec.id };
    });
    setSteps(collected);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.findIndex((s) => s === entry.target);
            if (idx >= 0) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const next = useMemo(() => {
    if (!steps.length) return undefined;
    const idx = Math.min(activeIndex + 1, steps.length - 1);
    return steps[idx];
  }, [steps, activeIndex]);

  const onNext = (e: React.MouseEvent) => {
    if (!next) return;
    e.preventDefault();
    const el = document.getElementById(next.id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isLast = activeIndex >= steps.length - 1;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 left-10 z-20 mx-auto hidden max-w-[1280px] px-5 pb-5 lg:block">
      <div className="pointer-events-auto ml-[260px] mr-[260px] rounded-md border border-neutral-800 bg-neutral-900/80 backdrop-blur px-3 py-2 text-sm shadow-lg">
        <div className="flex items-center justify-between">
          <a
            href="#top"
            className="text-neutral-300 hover:text-white hover:underline"
          >
            Back to top
          </a>
          {isLast ? (
            <a
              href="#top"
              className="rounded-md bg-neutral-800 px-3 py-1.5 text-neutral-100 hover:bg-neutral-700"
            >
              Back to top
            </a>
          ) : (
            <a
              href={`#${next?.id || ""}`}
              onClick={onNext}
              className="rounded-md bg-neutral-800 px-3 py-1.5 text-neutral-100 hover:bg-neutral-700"
            >
              Next: {next?.title || ""}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
