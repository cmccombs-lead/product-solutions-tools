# MCP Servers

Custom [Model Context Protocol](https://modelcontextprotocol.io) servers that expose Lead Bank internal tools and data to Claude.

## Adding an MCP server to Claude Code

Add the server to your `~/.claude/settings.json` under `mcpServers`:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["path/to/mcp-servers/my-server/index.js"]
    }
  }
}
```

Then restart Claude Code.

## Creating a new MCP server

Copy the `_template/` directory, rename it, and follow the instructions inside. See [`docs/mcp-authoring.md`](../docs/mcp-authoring.md) for full guidance.
