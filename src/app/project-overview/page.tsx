import fs from "node:fs";
import path from "node:path";

export default function ProjectOverviewPage() {
  const filePath = path.join(process.cwd(), "content", "PROJECT_OVERVIEW.md");
  const markdown = fs.readFileSync(filePath, "utf8");
  return (
    <div className="max-w-none">
      <header className="page-header">
        <h1 className="page-title">Project Overview</h1>
        <p className="page-lead">System architecture, components, and capabilities.</p>
      </header>
      <pre className="whitespace-pre-wrap break-words text-sm leading-6 text-neutral-200">{markdown}</pre>
    </div>
  );
}
