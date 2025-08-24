import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import StepProgressNav from "@/components/StepProgressNav";
import RightToc from "@/components/RightToc";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AFBT Setup & Docs",
  description: "Autonomous Frontend Browser Tools — Setup and Documentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased bg-neutral-950 text-neutral-200`}
        data-theme="dark"
      >
        <div className="mx-auto flex min-h-[100dvh] max-w-[1280px] gap-6 p-5">
          <Sidebar />
          <main className="flex-1 overflow-x-hidden">
            <div className="mx-auto w-full max-w-[820px] px-1 sm:px-2">
              {children}
            </div>
          </main>
          <aside className="sticky top-0 hidden h-[100dvh] w-60 shrink-0 border-l border-neutral-800 p-4 text-sm text-neutral-400 lg:block">
            <div className="mb-2 text-xs uppercase tracking-wide">
              On this page
            </div>
            <RightToc />
          </aside>
        </div>
        <StepProgressNav />
        <ThemeToggle />
        <SpeedInsights />
      </body>
    </html>
  );
}
