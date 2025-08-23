"use client";
import React from "react";

export default function ThemeToggle() {
  const onToggle = () => {
    const el = document.body;
    const isDark = el.getAttribute("data-theme") !== "light";
    el.setAttribute("data-theme", isDark ? "light" : "dark");
    el.classList.toggle("light-theme", !isDark);
  };

  return (
    <button
      onClick={onToggle}
      className="fixed bottom-5 right-5 z-30 rounded-md border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 text-xs text-neutral-200 backdrop-blur hover:bg-neutral-800"
      aria-label="Toggle light/dark theme"
    >
      Toggle theme
    </button>
  );
}
