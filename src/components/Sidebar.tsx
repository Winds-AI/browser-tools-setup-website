"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import SocialLinks from "./SocialLinks";

const primary = [
  { title: "Setup", href: "/setup" },
  { title: "Quickstart", href: "/quickstart" },
  { title: "How To Use", href: "/how-to-use" },
  { title: "Project Overview", href: "/project-overview" },
  { title: "Troubleshooting", href: "/troubleshooting" },
  { title: "Contributing", href: "/contributing" },
];

const toolPages = [
  { title: "api.searchEndpoints", href: "/tools/api.searchEndpoints" },
  { title: "api.request", href: "/tools/api.request" },
  { title: "browser.screenshot", href: "/tools/browser.screenshot" },
  { title: "ui.inspectElement", href: "/tools/ui.inspectElement" },
  { title: "browser.network.inspect", href: "/tools/browser.network.inspect" },
  { title: "browser.navigate", href: "/tools/browser.navigate" },
  { title: "api.listTags", href: "/tools/api.listTags" },
  { title: "browser.console.read", href: "/tools/browser.console.read" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [toolsOpen, setToolsOpen] = useState(true);
  const [query, setQuery] = useState("");
  const filteredPrimary = useMemo(() => {
    return primary.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);
  const filteredTools = useMemo(() => {
    return toolPages.filter((t) =>
      t.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);
  return (
    <aside className="sticky top-0 h-[100dvh] w-70 shrink-0 overflow-y-auto overflow-x-hidden border-r border-neutral-800 bg-neutral-950 p-4">
      <div className="w-[calc(100%-1rem)]">
        <div className="mb-3 text-[11px] uppercase tracking-wider text-neutral-400">
          Docs
        </div>
        <div className="mb-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search docs"
            className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:border-neutral-700"
            aria-label="Search documentation"
          />
        </div>
        <nav className="flex flex-col gap-1.5">
          {filteredPrimary.map((s) => {
            const active = pathname === s.href;
            return (
              <Link
                key={s.href}
                href={s.href}
                className={`rounded-md px-3 py-2 text-[15px] outline-none transition ${
                  active
                    ? "bg-neutral-800 text-white shadow-sm"
                    : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {s.title}
              </Link>
            );
          })}

          {/* Each Tool Explained */}
          <button
            onClick={() => setToolsOpen((v) => !v)}
            className="mt-2 flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-[15px] text-neutral-300 hover:bg-neutral-900 hover:text-white"
            aria-expanded={toolsOpen}
          >
            <span>Each Tool Explained</span>
            <span className="text-xs text-neutral-500">
              {toolsOpen ? "▾" : "▸"}
            </span>
          </button>
          {toolsOpen && (
            <div className="ml-2 flex flex-col gap-1.5 border-l border-neutral-800 pl-2">
              {filteredTools.map((t) => {
                const active = pathname === t.href;
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className={`rounded-md px-3 py-1.5 text-[14px] outline-none transition ${
                      active
                        ? "bg-neutral-800 text-white shadow-sm"
                        : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {t.title}
                  </Link>
                );
              })}
            </div>
          )}
        </nav>
        <SocialLinks />
      </div>
    </aside>
  );
}
