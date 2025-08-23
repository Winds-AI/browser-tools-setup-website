"use client";
import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type Heading = { id: string; text: string };

export default function RightToc() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Scan headings after navigation/hydration
    const scan = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(
          "main h2[id], main .page-header .page-title[id]"
        )
      );
      const list = nodes.map((n) => ({
        id: n.id,
        text: n.textContent || n.id,
      }));
      setHeadings(list);
      return nodes;
    };

    const nodes = scan();
    // Observe for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id;
            setActiveId((prev) => {
              if (prev !== id) {
                try {
                  history.replaceState(null, "", "#" + id);
                } catch {}
              }
              return id;
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 1] }
    );
    nodes.forEach((n) => observer.observe(n));

    // Re-scan once after a tick to catch late content
    const id = window.setTimeout(() => {
      const again = scan();
      again.forEach((n) => observer.observe(n));
    }, 0);

    return () => {
      window.clearTimeout(id);
      observer.disconnect();
    };
  }, [pathname]);

  const onClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!headings.length) {
    return <div className="text-neutral-600">No sections</div>;
  }

  return (
    <nav aria-label="On this page" className="space-y-1">
      {headings.map((h) => {
        const active = h.id === activeId;
        return (
          <a
            key={h.id}
            href={"#" + h.id}
            onClick={onClick(h.id)}
            className={`block truncate rounded px-2 py-1 outline-none hover:bg-neutral-900 hover:text-white ${
              active ? "bg-neutral-900 text-white" : "text-neutral-400"
            }`}
          >
            {h.text}
          </a>
        );
      })}
    </nav>
  );
}
