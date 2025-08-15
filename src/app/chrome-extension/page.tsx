export default function ChromeExtensionPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Chrome Extension</h1>
      <ol className="list-decimal pl-5 text-neutral-300">
        <li>Open <code>chrome://extensions</code></li>
        <li>Enable Developer Mode</li>
        <li>Click &quot;Load unpacked&quot; and select <code>chrome-extension/</code></li>
      </ol>
      <p className="mt-3 text-sm text-neutral-400">Keep DevTools open on the active tab when using tools.</p>
    </div>
  );
}
