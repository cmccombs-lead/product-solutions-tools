# Skill Authoring Guide

Skills are markdown files that tell Claude what to do when a slash command is invoked.

## File naming

The filename becomes the slash command: `diagnose-file.md` → `/diagnose-file`

## Structure

A skill file should include:

- **Description** — what it does and when it's useful
- **Trigger** — what user intent or keywords should invoke it
- **Instructions** — the step-by-step prompt Claude will follow

## Tips

- Be specific. The more concrete the instructions, the more consistent the output.
- Reference available MCP tools by name if the skill depends on them (e.g. `mcp__lead-mcp__search_runbooks`).
- Use markdown headers and lists to structure multi-step workflows.
- Test your skill by installing it locally and invoking it in Claude Code.
