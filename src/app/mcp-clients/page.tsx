import CodeBlock from "@/components/CodeBlock";

export default function McpClientsPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">MCP Clients</h1>
      <p className="text-neutral-300">Example configuration for Cursor (similar for other clients):</p>
      <CodeBlock language="json" code={`{
  "mcpServers": {
    "autonomous-frontend-browser-tools": {
      "command": "npx",
      "args": ["-y", "@winds-ai/autonomous-frontend-browser-tools", "afbt-mcp"],
      "env": { "ACTIVE_PROJECT": "my-frontend" }
    }
  }
}`} />
    </div>
  );
}
