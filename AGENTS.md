# Project: agent-monitor-web

Public GitHub Pages site for Murphy's live dashboard plus durable showcase routes. Current focus: keep the auto-published monitor root stable while growing hand-maintained browser tools under subroutes such as `showcase/` and `tokenizers/`.

## Key Docs
- `docs/dashboard-design-guide.md` - **read this first** — style requirements and design rationale for keeping pages visually consistent with the dashboard
- `docs/site-shell.md` - shared Murphy-branded header rules for the durable public routes
- `roadmap.md` - milestones, current status, and blocked work
- `docs/README.md` - durable notes about routes and publishing constraints
- `README.md` - quick route map and refresh command

## Sub-Session Instructions
- Root `index.html` and `status.json` are publisher-owned outputs; do not rely on manual edits there surviving snapshot refreshes.
- Root `roadmap/index.html` and `roadmap/session.json` are publisher-owned for the same reason; durable shell or layout changes for `/` and `/roadmap/` belong in the exporter source.
- Durable custom surfaces belong under subroutes like `showcase/` and `tokenizers/`.
- Verify JavaScript changes with `node --check <file>` when applicable.
- For local browser checks, serve this repo with `python3 -m http.server` and open the relevant route.
- Follow the style requirements in `docs/dashboard-design-guide.md` — calm premium shell, warm light surfaces, restrained accent color, shallow navigation, and mobile-first hierarchy.
- Do NOT communicate on Slack; the parent worker handles all Slack I/O.
- **Always merge your branch to `main` before finishing.** The dashboard publisher only pushes when the repo is on `main`. If you leave it on a feature branch, the live site goes stale. After your final commit: `git checkout main && git merge <your-branch> && git push origin main`. Do not leave open PRs without merging — the publisher cannot publish from a feature branch.
