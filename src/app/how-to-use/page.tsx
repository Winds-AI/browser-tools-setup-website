import fs from "node:fs";
import path from "node:path";

export default function HowToUsePage() {
  const filePath = path.join(process.cwd(), "content", "HOW_TO_USE.md");
  const markdown = fs.readFileSync(filePath, "utf8");
  return (
    <div className="max-w-none">
      <header className="page-header">
        <h1 className="page-title">How To Use</h1>
        <p className="page-lead">Reference workflows and guidance for using the tools effectively.</p>
      </header>
      <pre className="whitespace-pre-wrap break-words text-sm leading-6 text-neutral-200">{markdown}</pre>
    </div>
  );
}
