# Project: agent-monitor-web

Public GitHub Pages site for Murphy's live dashboard plus durable showcase routes. Current focus: keep the auto-published monitor root stable while growing hand-maintained browser tools under subroutes such as `showcase/` and `tokenizers/`.

## Key Docs
- `roadmap.md` - milestones, current status, and blocked work
- `docs/README.md` - durable notes about routes and publishing constraints
- `README.md` - quick route map and refresh command

## Sub-Session Instructions
- Root `index.html` and `status.json` are publisher-owned outputs; do not rely on manual edits there surviving snapshot refreshes.
- Durable custom surfaces belong under subroutes like `showcase/` and `tokenizers/`.
- Verify JavaScript changes with `node --check <file>` when applicable.
- For local browser checks, serve this repo with `python3 -m http.server` and open the relevant route.
- Keep the existing cyberpunk visual language aligned with the monitor root.
- Do NOT communicate on Slack; the parent worker handles all Slack I/O.
