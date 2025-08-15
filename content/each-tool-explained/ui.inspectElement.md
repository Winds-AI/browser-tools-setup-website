﻿# ui.inspectElement Tool

## Overview

Retrieves comprehensive debugging information for the element currently selected in Chrome DevTools (Elements panel). Designed to provide enough context for autonomous UI debugging with minimal tool calls.

## Tool Signature

```typescript
ui.inspectElement();
```

No parameters.

## Returns

- Computed CSS context and layout hints
- Parent/child layout context (flex/grid)
- Automatic issue detection and suggestions
- Accessibility notes (if provided by the extension)
- Raw payload from the extension

## Example Output (abridged)

```
ðŸ” Enhanced Element Debugging Context
Element: BUTTON#save.primary

ðŸš¨ Critical Issues Detected:
â€¢ Flex item shrinking; consider min-width or flex-shrink: 0

ðŸ’¡ Suggested Fixes:
â€¢ Set align-items on parent or justify-content as needed

ðŸ“ Layout Context:
â€¢ Parent: DIV (flex) [Flex Container]
â€¢ This is a flex item

ðŸ“„ Full Debug Data Below:
{ ...full JSON payload }
```

## Workflow

1) Take a screenshot with `browser.screenshot({ randomString: "any" })` (optional)
2) Select the problematic element in DevTools
3) Run `ui.inspectElement()` and apply fixes based on suggestions
4) Re-screenshot to verify

## Prerequisites

- Chrome extension installed and connected
- DevTools open, element selected in Elements panel
