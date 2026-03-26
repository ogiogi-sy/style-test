You have access to the Figma MCP server (mcp__figma__*). Use it to read from and write to Figma.

Available Figma MCP tools:
- mcp__figma__whoami — check auth
- mcp__figma__get_screenshot — capture a screenshot of a Figma node
- mcp__figma__get_design_context — read design context from a Figma URL/node
- mcp__figma__get_metadata — get file metadata
- mcp__figma__search_design_system — search for tokens, components, variables
- mcp__figma__get_variable_defs — get resolved variable definitions
- mcp__figma__use_figma — execute Figma Plugin API code to write/modify designs on canvas
- mcp__figma__create_new_file — create a new Figma file
- mcp__figma__generate_figma_design — generate a design in Figma

When designing screens or components in Figma, ALWAYS use the `metro-bank-figma-ds` skill for design system tokens, variable keys, text styles, and component keys. Bind variables using `setBoundVariable()` — never hardcode hex colors or pixel values.

When writing any UI copy, ALWAYS follow the `metro-bank-tov` skill for Metro Bank tone of voice rules.

To write to Figma canvas, use the `mcp__figma__use_figma` tool with Figma Plugin API code. Always load the tools using ToolSearch first (e.g. query: "select:mcp__figma__use_figma").
