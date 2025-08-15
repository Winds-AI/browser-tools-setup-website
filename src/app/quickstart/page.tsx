import CodeBlock from "@/components/CodeBlock";

export default function QuickstartPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Quickstart</h1>
      <p className="text-neutral-300">The quickest way to start the connector and Setup UI:</p>
      <CodeBlock language="bash" code={`npx @winds-ai/autonomous-frontend-browser-tools`} />
    </div>
  );
}
