﻿# api.request Tool

## Overview

Executes a live HTTP request to your API using `API_BASE_URL`. Optionally attaches `Authorization: Bearer <token>` when `includeAuthToken` is true. Token source: dynamic via Chrome extension from browser storage using `AUTH_STORAGE_TYPE` + `AUTH_TOKEN_KEY` (and optional `AUTH_ORIGIN` for cookies).

## Tool Signature

```typescript
api.request({
  endpoint: string, // e.g. "/v1/users"
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  requestBody: any, // JSON-serializable body for non-GET
  queryParams: Record<string, string>,
  includeAuthToken: boolean, // uses dynamic retrieval when configured
});
```

## Required Environment

- `API_BASE_URL`: base URL for your API (e.g., `https://api.example.com`)
- Set `AUTH_STORAGE_TYPE` (`localStorage|sessionStorage|cookies`) and `AUTH_TOKEN_KEY` (and `AUTH_ORIGIN` for cookies) to enable token retrieval
- Use `requiresAuth` from `searchApiDocumentation` results to decide whether to set `includeAuthToken`

## Response

Returns a JSON text payload including:

- `success`: boolean (HTTP ok)
- `method`, `url`
- `responseDetails`: `{ status, statusText, headers, timing, url, method }`
- `data`: parsed JSON or raw text

## Examples

```typescript
// GET with auth and query params
await api.request({
  endpoint: "/v1/users",
  method: "GET",
  queryParams: { page: "1" },
  includeAuthToken: true,
});

// POST without auth
await api.request({
  endpoint: "/v1/users",
  method: "POST",
  requestBody: { name: "Jane" },
});
```

### Cookies-based auth example

When your token is stored as a cookie:

1. In `projects.json` for the active project, configure:

```json
{
  "projects": {
    "my-frontend": {
      "config": {
        "API_BASE_URL": "https://api.example.com",
        "AUTH_STORAGE_TYPE": "cookies",
        "AUTH_TOKEN_KEY": "auth_token",
        "AUTH_ORIGIN": "http://localhost:5173"
      }
    }
  }
}
```

2. Call with `includeAuthToken: true`:

```typescript
await api.request({
  endpoint: "/auth/profile",
  method: "GET",
  includeAuthToken: true,
});
```

If the token cannot be retrieved, the tool returns a helpful error. Ensure the target app is open in Chrome, the extension is connected, and DevTools is open on the inspected tab.

## Tips

- Use `api.searchEndpoints` first to find the right path and request shape
- If docs lack response schemas, validate with `api.request`
