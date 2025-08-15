# List of All Tools

1. [`api.searchEndpoints`](./each-tool-explained/api.searchEndpoints.md)
2. [`api.request`](./each-tool-explained/api.request.md)
3. [`browser.screenshot`](./each-tool-explained/browser.screenshot.md)
4. [`ui.inspectElement`](./each-tool-explained/ui.inspectElement.md)
5. [`browser.network.inspect`](./each-tool-explained/browser.network.inspect.md)
6. [`browser.navigate`](./each-tool-explained/browser.navigate.md)
7. [`api.listTags`](./each-tool-explained/api.listTags.md)
8. [`browser.console.read`](./each-tool-explained/browser.console.read.md)

# How to Use Browser Tools MCP

To use these tools at their 100% potential you need to understand how all of these fit in the flow and how to explain that to LLM until I perfect the description and names of all tools and make it self-explanatory for most LLMs.

## Updated Workflow with Unified API Testing

### **Workflow 1: API Integration**

Use `api.searchEndpoints` to identify endpoints and request/response shapes. Then use `api.request` to validate the real response.

1. **Live API Test**: Call `api.request` with an endpoint and method.

   ```
   Tool: api.request
   - endpoint: "/api/users"
   - method: "GET"
   - includeAuthToken: true // uses dynamic token retrieval when AUTH_STORAGE_TYPE + AUTH_TOKEN_KEY are configured
   ```

   The tool:

   - Builds the full URL using `API_BASE_URL`
 - If `includeAuthToken` is true, token is retrieved dynamically from browser storage via extension using `AUTH_STORAGE_TYPE` (`localStorage`|`sessionStorage`|`cookies`), `AUTH_TOKEN_KEY`, and optional `AUTH_ORIGIN`. Token is cached per project; expiration inferred from `API_AUTH_TOKEN_TTL_SECONDS` or JWT `exp`.
 - Tip: use `requiresAuth` from `api.searchEndpoints` results to decide whether to set `includeAuthToken`.
   - Returns structured response details (status, headers, timing) and parsed data

2. **Development & Integration**
   Based on real API responses, the agent can:

   - Define accurate TypeScript interfaces
   - Use your projectâ€™s helpers/hooks
   - Create components with proper data handling

### **Workflow 2: UI Development & Debugging**

- Use `browser.screenshot` for UI analysis (requires a dummy `randomString` param; always returns image)
- Use `ui.inspectElement` for CSS/layout context of the DevTools-selected element
- Use `browser.network.inspect` to inspect recent API calls
- Use `browser.console.read` to capture JS errors/warnings/logs with filters

### **Workflow 3: Recursive UI Improvements**

- Loop `browser.screenshot({ randomString: "anything" })` â†’ analyze â†’ apply edits â†’ repeat

### **Workflow 4: Automated Testing & Navigation**

- Use `browser.navigate` for multi-step workflows
- Combine with `browser.screenshot` for visual checks
- Example:
  ```
  1. browser.navigate({ url: "https://app.example.com/login" })
  2. browser.screenshot({ randomString: "any" })
  3. browser.navigate({ url: "https://app.example.com/dashboard" })
  4. browser.screenshot({ randomString: "any" })
  ```

- For environment/config setup, see `docs/SETUP_GUIDE.md`. For architecture and features, see `docs/PROJECT_OVERVIEW.md`.

### End-to-end Example (API + UI)

1. Search docs: [`api.searchEndpoints`](./each-tool-explained/api.searchEndpoints.md) for "users" endpoints
2. Validate live response: [`api.request`](./each-tool-explained/api.request.md) with includeAuthToken if needed
3. Open page: [`browser.navigate`](./each-tool-explained/browser.navigate.md) to your feature URL
4. Visual check: [`browser.screenshot`](./each-tool-explained/browser.screenshot.md) with `{ randomString: "any" }`
5. Inspect failures: [`browser.network.inspect`](./each-tool-explained/browser.network.inspect.md) and [`browser.console.read`](./each-tool-explained/browser.console.read.md)
6. Debug CSS: [`ui.inspectElement`](./each-tool-explained/ui.inspectElement.md)
