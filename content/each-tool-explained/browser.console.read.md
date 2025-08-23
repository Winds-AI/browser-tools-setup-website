# browser.console.read Tool

## Overview

Reads browser console logs captured by the Chrome extension. Filter by level, time window, and search term to quickly surface errors and warnings.

## Tool Signature

```typescript
inspectBrowserConsole({
  level: "log" | "error" | "warn" | "info" | "debug" | "all",
  limit: number,
  timeOffset: number, // seconds; last N seconds
  search: string,
});
```

## Response

Formatted text summary plus structured stats and logs, for example:

```
🔍 Browser Console Inspection Results
📊 Summary: 12 total logs (3 errors, 2 warnings, ...)
🔧 Applied Filters: Level: error, Time Offset: 300
📝 Console Messages:
❌ [2025-01-01T12:00:00.000Z] ERROR: Uncaught TypeError: ...
```

## Examples

```typescript
// Recent errors
await inspectBrowserConsole({ level: "error", timeOffset: 300 });

// Search for specific text
await inspectBrowserConsole({ search: "Unauthorized", limit: 20 });
```

## Notes

- DevTools must be open for the active tab to capture console messages.
