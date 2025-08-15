import CodeBlock from "@/components/CodeBlock";
import StepCard from "@/components/StepCard";
import Callout from "@/components/Callout";

export default function SetupPage() {
  return (
    <div className="max-w-none">
      <header className="page-header">
        <h1 className="page-title">Setup</h1>
        <p className="page-lead">
          Follow these steps to install and configure Autonomous Frontend
          Browser Tools (AFBT) using the built-in Setup UI.
        </p>
      </header>

      <StepCard
        number={1}
        title="Create a new folder and open a terminal there"
      >
        <p>
          First of all, create a new folder wherever you want and then open the
          terminal in that folder. It is important to always run the server or
          npx command from the same folder because it will automatically give
          you the updated chrome extension into the same folder so that you can
          load it easily in chrome
        </p>
      </StepCard>

      <StepCard number={2} title="Run the Quickstart (npx) from that folder">
        <p>
          This installs the package if needed, starts the connector server,
          starts streaming logs in your terminal, and opens the Setup UI at{" "}
          <code>http://127.0.0.1:5055</code> in a new tab of your default
          browser.
        </p>
        <CodeBlock
          language="bash"
          code={`npx @winds-ai/autonomous-frontend-browser-tools`}
        />
      </StepCard>

      <StepCard number={3} title="Follow the setup UI instructions">
        <p>
          Follow the instructions to configure both your projects.json varaibles
          and .env variables. If you need to know exactly which config value is
          needed for which tool to work then you can find that in the setup UI.
        </p>
        <p>
          For exact information on what those config values do and how they are
          used, you can refer to the each tool explained docs here.
        </p>
      </StepCard>

      <Callout variant="warning">
        Please make sure that you are closing the setup UI using the close
        button given ( because it will save resources ) and not by closing the
        tab or browser directly.
      </Callout>

      <StepCard number={4} title="Close the Setup UI — server keeps running">
        <p>
          Once your configs are saved, you can close the Setup UI. The connector
          server will keep running in your terminal. Don&apos;t worry, this
          setup UI will be shown again when you run the npx command again.
        </p>
      </StepCard>

      <StepCard number={5} title="Load the extension in chrome">
        <p>
          Now load the extension in chrome. Go to chrome://extensions and load
          the unpacked extension from the folder that you created. there should
          be chrome-extension folder in there.
        </p>
      </StepCard>

      <Callout variant="info">
        New chrome extension will be replaced by old one in the folder if there
        is a new version available when you run npx command.
      </Callout>

      <StepCard number={6} title="Configure your MCP client (in your AI IDE)">
        <p>
          Now add the server to your AI editor of your choice. I&apos;ve used
          Cursor for this example. If the format of your IDE is different, you
          can refer to their docs for the exact format.
        </p>
        <CodeBlock
          language="json"
          code={`{
  "mcpServers": {
    "autonomous-frontend-browser-tools": {
      "command": "npx",
      "args": ["-y", "@winds-ai/autonomous-frontend-browser-tools"],
      "env": { "ACTIVE_PROJECT": "my-frontend" }
    }
  }
}`}
        />
      </StepCard>

      <StepCard
        number={7}
        title="Load up any of your frontend project in our AI IDE and then spin it up."
      >
        <p>When you have spun up your project then open it in chrome.</p>
      </StepCard>

      <StepCard
        number={8}
        title="Open DevTools → Browser Tools panel → Test Connection"
      >
        <p>
          Press <code>F12</code> on the tab to open DevTools, switch to the{" "}
          <strong>Browser Tools</strong> panel, check the connection status, and
          click <em>Test Connection</em>.
        </p>
        <Callout variant="warning">
          If you don&apos;t see the panel, load the extension once: go to{" "}
          <code>chrome://extensions</code> → enable Developer Mode → Load
          unpacked → select <code>chrome-extension/</code>.
        </Callout>
      </StepCard>
    </div>
  );
}
