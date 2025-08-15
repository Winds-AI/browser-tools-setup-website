import fs from "node:fs";
import path from "node:path";

export default function FuturePlansPage() {
  const filePath = path.join(process.cwd(), "content", "FUTURE_PLANS.md");
  const markdown = fs.readFileSync(filePath, "utf8");
  return (
    <div className="max-w-none">
      <header className="page-header">
        <h1 className="page-title">Future Plans</h1>
        <p className="page-lead">Roadmap and feature ideas for the ecosystem.</p>
      </header>
      <pre className="whitespace-pre-wrap break-words text-sm leading-6 text-neutral-200">{markdown}</pre>
    </div>
  );
}
