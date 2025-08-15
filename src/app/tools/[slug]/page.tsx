import fs from "node:fs";
import path from "node:path";

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content", "each-tool-explained");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files.map((file) => ({ slug: file.replace(/\.md$/, "") }));
}

export const dynamic = "error";

export default async function ToolDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const filePath = path.join(
    process.cwd(),
    "content",
    "each-tool-explained",
    `${slug}.md`
  );

  const exists = fs.existsSync(filePath);
  const markdown = exists
    ? fs.readFileSync(filePath, "utf8")
    : `# Not Found\n\nNo documentation found for tool: ${slug}`;

  return (
    <div className="max-w-none">
      <header className="page-header">
        <h1 className="page-title">{slug}</h1>
        <p className="page-lead">Tool documentation</p>
      </header>
      <pre className="whitespace-pre-wrap break-words text-sm leading-6 text-neutral-200">
        {markdown}
      </pre>
    </div>
  );
}
