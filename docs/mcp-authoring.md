# MCP Server Authoring Guide

MCP servers expose tools, resources, and prompts to Claude via the Model Context Protocol.

## When to build an MCP server vs. a skill

| Use a **skill** when... | Use an **MCP server** when... |
|---|---|
| The task is purely prompt-driven | You need to call an API or query a database |
| No external data is needed | You need to expose structured data to Claude |
| It's a one-off workflow | The tool will be reused across many contexts |

## Stack

We use the [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) with Node.js. See `mcp-servers/_template/` for a starter.

## Key concepts

- **Tools** — callable functions Claude can invoke (most common)
- **Resources** — readable data sources Claude can access
- **Prompts** — reusable prompt templates

## Testing

Run your server locally with `node index.js` and add it to your local Claude config to test before opening a PR.
