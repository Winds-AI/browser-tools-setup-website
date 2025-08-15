import CodeBlock from "@/components/CodeBlock";

export default function ConfigurationPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Environment & Keys</h1>
      <p className="text-neutral-300">Set provider keys and options in the Setup UI&apos;s Environment tab (.env):</p>
      <CodeBlock language="bash" code={`OPENAI_API_KEY=sk-...
OPENAI_EMBED_MODEL=text-embedding-3-small
# or
# GEMINI_API_KEY=...
# GEMINI_EMBED_MODEL=text-embedding-004
ACTIVE_PROJECT=my-frontend
LOG_LEVEL=info`} />
    </div>
  );
}
