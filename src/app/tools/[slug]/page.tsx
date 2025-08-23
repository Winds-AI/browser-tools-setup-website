import fs from "node:fs";
import path from "node:path";

function simpleMarkdownToHtml(md: string): string {
  // Extended markdown → HTML with headings, links, code fences, tables, and Mermaid
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = md.split(/\r?\n/);
  const html: string[] = [];
  let inCode = false;
  let codeLang = "";
  let inTable = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const fence = /^```(.*)$/.exec(line);
    if (fence) {
      if (!inCode) {
        inCode = true;
        codeLang = fence[1].trim();
        if (codeLang === "mermaid") {
          html.push('<div class="mermaid">');
        } else {
          html.push("<pre><code>");
        }
      } else {
        if (codeLang === "mermaid") {
          html.push("</div>");
        } else {
          html.push("</code></pre>");
        }
        inCode = false;
        codeLang = "";
      }
      continue;
    }
    if (inCode) {
      html.push(escape(line));
      continue;
    }
    // table start: header row followed by separator row
    if (
      !inTable &&
      /^\|(.+)\|$/.test(line) &&
      i + 1 < lines.length &&
      /^\|\s*[-:]/.test(lines[i + 1])
    ) {
      inTable = true;
      const headers = line
        .slice(1, -1)
        .split("|")
        .map((h) => `<th>${escape(h.trim())}</th>`)
        .join("");
      html.push('<table class="doc-table">');
      html.push(`<thead><tr>${headers}</tr></thead>`);
      html.push("<tbody>");
      i++; // skip separator line
      continue;
    }
    if (inTable) {
      if (!/^\|(.+)\|$/.test(line)) {
        inTable = false;
        html.push("</tbody></table>");
        // fall through to process current line
      } else {
        const cells = line
          .slice(1, -1)
          .split("|")
          .map((c) => `<td>${escape(c.trim())}</td>`)
          .join("");
        html.push(`<tr>${cells}</tr>`);
        continue;
      }
    }
    const h = /^(#{1,3})\s+(.*)$/.exec(line);
    if (h) {
      const level = h[1].length;
      const text = h[2];
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      html.push(`<h${level} id="${id}">${escape(text)}</h${level}>`);
      continue;
    }
    if (line.trim().length === 0) {
      html.push("");
      continue;
    }
    const withLinks = line.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2">$1</a>'
    );
    html.push(`<p>${escape(withLinks)}</p>`);
  }
  if (inTable) {
    html.push("</tbody></table>");
  }
  return html.join("\n");
}

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

  const html = simpleMarkdownToHtml(markdown);

  return (
    <div className="max-w-none">
      <header className="page-header">
        <h1 className="page-title">{slug}</h1>
        <p className="page-lead">Tool documentation</p>
      </header>
      <div
        className="prose prose-invert prose-neutral max-w-none text-sm leading-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `if(window.mermaid){window.mermaid.initialize({startOnLoad:true});}`,
        }}
      />
    </div>
  );
}
