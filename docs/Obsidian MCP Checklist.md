# Obsidian MCP Checklist

Use this before trying to connect an Obsidian MCP server to AssetFlow.

## Required

- [ ] Obsidian installed on Windows
- [ ] A vault path chosen
- [ ] `AssetFlow` folder confirmed as a good vault candidate
- [ ] A Codex or client environment that supports custom MCP servers
- [ ] Permission to edit the client MCP configuration

## Vault Decision

- [ ] Decide whether the vault should be the whole repo:
  `C:\codex-sandbox\AssetFlow`
- [ ] Or only the docs folder:
  `C:\codex-sandbox\AssetFlow\docs`

## Runtime Requirements

- [ ] Node.js installed, if the MCP server is Node-based
- [ ] Python installed, if the MCP server is Python-based
- [ ] Terminal command for launching the MCP server confirmed

## MCP Server Details To Prepare

- [ ] MCP server name
- [ ] launch command
- [ ] command arguments
- [ ] vault path argument
- [ ] required environment variables
- [ ] whether it supports read only or read/write mode

## Codex Client Setup

- [ ] Find MCP config file location
- [ ] Add the Obsidian MCP server entry
- [ ] Reload or restart the client
- [ ] Verify the MCP server appears in the next session

## Functional Checks

- [ ] Can list notes
- [ ] Can create a new note
- [ ] Can update an existing note
- [ ] Can search text across notes
- [ ] Can handle markdown links correctly

## Nice To Have

- [ ] tag support
- [ ] folder creation
- [ ] wiki-link support
- [ ] frontmatter support
- [ ] template support

## Recommended Starting Point

Start simple:

1. Use [AssetFlow](C:\codex-sandbox\AssetFlow) as the vault
2. Keep docs in `docs/`
3. Confirm basic note read/write works
4. Add search and link workflows later
