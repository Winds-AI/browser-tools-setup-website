export default function TroubleshootingPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Troubleshooting</h1>
      <ul className="list-disc pl-5 text-neutral-300">
        <li>Extension not visible → reload unpacked and ensure Developer Mode is on.</li>
        <li>Health disconnected → open DevTools on the inspected tab and refresh connectors.</li>
        <li>Env not applied → re-save in Setup UI and restart the server.</li>
      </ul>
    </div>
  );
}
