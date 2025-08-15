﻿# browser.screenshot Tool

## Overview

The `browser.screenshot` tool captures the current browser tab and saves it as a PNG file with intelligent organization. It always returns the base64 image data and the saved file path.

**Primary Use Cases:**

- UI inspection and visual verification
- Recursive UI improvement loops
- Documentation and bug reporting
- Visual regression testing

## Tool Signature

```typescript
browser.screenshot({
  randomString: string // any string; required by MCP schema
});
```

Parameters:
- randomString: string (required) â€” arbitrary string to satisfy the MCP schema; not used by the server.

## File Organization System

The tool uses a sophisticated directory structure for organizing screenshots:

### Base Directory

1. **Project config** `DEFAULT_SCREENSHOT_STORAGE_PATH` in `chrome-extension/projects.json`
2. **Environment variable** `SCREENSHOT_STORAGE_PATH`
3. **Default**: `~/Downloads/MCP_Screenshots`

### Project Directory

1. **Environment variable** `ACTIVE_PROJECT`
2. **`projects.json`** `defaultProject`
3. **Fallback**: `"default-project"`

### URL Category (Subfolder)

- **Localhost URLs**: Uses first path segment
  - `http://localhost:3000/dashboard` â†’ `dashboard/`
  - `http://localhost:8080/api/users` â†’ `api/`
- **Staging/Dev**: `staging/{path-segment}/`
- **Production**: `production/{path-segment}/`
- **General**: `general/` (for about:blank or unparseable URLs)

### Filename Generation

- **URL-based**: `{timestamp}_{url-segment}.png`
- **Fallback**: `{timestamp}_screenshot.png`

## Response Format

### Success Response

The tool returns a text block with project/category info and an image payload with `mimeType: "image/png"`.

### Error Response

```json
{
  "content": [
    {
      "type": "text",
      "text": "Error taking screenshot: Chrome extension not connected"
    }
  ],
  "isError": true
}
```

## Usage Examples

### Basic Screenshot

```typescript
await browser.screenshot({ randomString: "ok" });
```

Custom filenames are not currently supported via the MCP tool. Filenames are generated from the URL.

Project name is determined by `ACTIVE_PROJECT` or `projects.json` â†’ `defaultProject`.

The tool always returns image data for analysis.

## File Path Examples

### Localhost Development

**URL**: `http://localhost:3000/dashboard`
**Git Repo**: `my-project`
**Result**: `~/Downloads/MCP_Screenshots/my-project/dashboard/2024-01-15T10-30-45-123Z_dashboard.png`

### Staging Environment

**URL**: `https://staging.example.com/admin/users`
**Result**: `~/Downloads/MCP_Screenshots/default-project/staging/admin/2024-01-15T10-30-45-123Z_admin-users.png`

### Active Project Folder

The project folder is determined by `ACTIVE_PROJECT` or `projects.json.defaultProject`.

**URL**: `http://localhost:8080/api/auth/login`
**ACTIVE_PROJECT**: `auth-service`
**Result**: `~/Downloads/MCP_Screenshots/auth-service/api/2024-01-15T10-30-45-123Z_login-page.png`

## Technical Architecture

### Component Flow

1. **MCP Server** â†’ Receives tool call and parameters
2. **Browser Connector Server** â†’ Processes request via WebSocket
3. **Chrome Extension** â†’ Captures visible tab using `chrome.tabs.captureVisibleTab()`
4. **Screenshot Service** â†’ Organizes and saves file with intelligent naming

### WebSocket Communication

```typescript
// Browser Connector â†’ Chrome Extension
{
  "type": "take-screenshot",
  "requestId": "1705311045123"
}

// Chrome Extension â†’ Browser Connector
{
  "type": "screenshot-data",
  "data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "requestId": "1705311045123"
}
```

## Environment Variables

### `SCREENSHOT_STORAGE_PATH`

- **Purpose**: Override base directory for screenshots
- **Example**: `export SCREENSHOT_STORAGE_PATH="/custom/screenshots"`

### `ACTIVE_PROJECT`

- **Purpose**: Select active project name used for screenshot organization
- **Example**: `export ACTIVE_PROJECT="my-app"`

## Error Handling

### Common Errors

- **"Chrome extension not connected"**: Extension not installed or not connected
- **"Screenshot timeout"**: Extension didn't respond within 15 seconds
- **"Failed to save screenshot"**: File system permission issues

### Troubleshooting

1. Ensure Chrome extension is installed and connected
2. Check browser connector server is running
3. Verify file system permissions for screenshot directory
4. Check WebSocket connection between extension and server

## Integration with Other Tools

### Visual Analysis Workflow

```typescript
// 1. Capture screenshot
await browser.screenshot({ randomString: "before" });

// 2. Make UI changes
// ... code changes ...

// 3. Capture after screenshot
await browser.screenshot({ randomString: "after" });

// 4. Compare visually or programmatically
```

### Documentation Workflow

```typescript
// Capture screenshots for documentation (filenames are auto-generated)
await browser.screenshot({ randomString: "step-1-login" });
await browser.screenshot({ randomString: "step-2-dashboard" });
```

## Best Practices

1. **Use Descriptive Filenames**: Instead of generic names, use specific descriptions
2. **Leverage Project Organization**: Let the tool auto-organize by project and URL
3. **Consider Performance**: Set `returnImageData: false` for batch operations
4. **Version Control**: Screenshots are timestamped for chronological ordering
5. **Environment Awareness**: The tool automatically detects staging vs production URLs

## Enhanced UI Debugging Workflow

### **Autonomous AI Debugging Pattern**

The most effective pattern for AI-driven UI debugging combines `browser.screenshot` with the enhanced `ui.inspectElement` tool:

```typescript
// 1. Capture initial state
await browser.screenshot({ randomString: "initial" });

// 2. AI analyzes screenshot and identifies issues
// (Human or AI selects problematic element in DevTools)

// 3. Get comprehensive debugging context
const elementContext = await ui.inspectElement();

// 4. AI receives:
// - Computed CSS styles
// - Parent/child layout context
// - Automatic issue detection
// - Actionable fix suggestions
// - Accessibility audit
// - Material-UI context (if applicable)

// 5. Apply fixes and verify
await browser.screenshot({ randomString: "after" }); // Compare before/after
```

### **What the Enhanced Element Inspection Provides**

When you select an element and call `ui.inspectElement`, you get:

**ðŸ” Immediate Issue Detection**:

- Zero dimensions warnings
- Overflow clipping issues
- Positioning problems
- Flex/Grid layout conflicts
- Material-UI best practices violations

**ðŸ“ Layout Context**:

- Parent container type (flex/grid/block)
- Child element relationships
- Computed style inheritance
- Positioning context

**â™¿ Accessibility Audit**:

- ARIA attributes and roles
- Focus management
- Semantic structure
- Keyboard navigation compatibility

**âš¡ Performance Insights**:

- Large image detection
- Deep nesting warnings
- Optimization opportunities

### **Example AI Debugging Session**

```typescript
// AI sees layout issue in screenshot
await browser.screenshot({ randomString: "issue" });

// AI instructs: "Select the misaligned button element"
// Human selects element in DevTools Elements panel

// AI gets comprehensive context
const debug = await ui.inspectElement();

// AI receives formatted output like:
/*
ðŸš¨ Critical Issues Detected:
â€¢ Flex item might be shrinking too much

ðŸ’¡ Suggested Fixes:  
â€¢ Consider setting flex-shrink: 0 or min-width

ðŸ“ Layout Context:
â€¢ Parent: DIV (flex) [Flex Container]
â€¢ This is a flex item
*/

// AI can now provide specific fixes without additional tool calls
```

### **Reducing Tool Call Overhead**

This enhanced workflow reduces debugging from **4-5 tool calls** down to **2 tool calls**:

**Old Pattern** (5 calls):

1. `browser.screenshot`
2. `ui.inspectElement` (basic info)
3. Additional CSS property queries
4. Parent/child context queries
5. Manual accessibility checks

**New Pattern** (2 calls):

1. `browser.screenshot`
2. `ui.inspectElement` (comprehensive context)

This enables **autonomous AI debugging sessions** lasting 2+ hours without manual intervention, aligning with the core mission of the browser tools ecosystem.
