import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-server",
  version: "1.0.0",
});

// Define a tool
server.tool(
  "my_tool",
  "Description of what this tool does",
  {
    param: z.string().describe("Description of the parameter"),
  },
  async ({ param }) => {
    // Tool implementation
    return {
      content: [{ type: "text", text: `Result: ${param}` }],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
