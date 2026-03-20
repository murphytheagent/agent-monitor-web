# agent-monitor-web Roadmap

Last updated: 2026-03-20 18:03 UTC

## Current Status

- The hosted root monitor at `/` is live and continuously refreshed by the snapshot publisher.
- Durable hand-maintained routes now exist under `/tokenizers/` and `/showcase/`.
- The showcase route is now intentionally sparse and viewer-first: one hook, one featured exhibit, and one obvious launch path into the tokenizer workbench.
- A persistent tokenizer link on the root dashboard is still blocked because the exporter has no showcase-extension hook yet.

## Milestone 1 - Stable Hosted Surfaces

Success criteria:
- Live monitor root stays publishable on GitHub Pages.
- Durable subroutes are clearly separated from publisher-owned root artifacts.

Status:
- In place. The current split is `/` for the generated monitor and subroutes for hand-maintained tools.

## Milestone 2 - Showcase Layer

Success criteria:
- A dedicated showcase page exists for browser tools.
- At least one featured tool is presented as a project artifact, not just a raw utility route.

Status:
- In place. `/showcase/` now presents the tokenizer workbench as a gallery-style featured exhibit and keeps the page focused on browseable project surfaces instead of internal site structure.

### Activity Log

- 2026-03-20 18:03 UTC — Consulted Athena in `deep` mode (1 turn; log: `.agent/consult_history/1774027390.110939.jsonl`) on how a one-item gallery page should read to first-time outside viewers. Main takeaway: the page has to answer "what is this, why is it interesting, what do I click" immediately, and supporting stats should confirm scope rather than compete with the exhibit.
- 2026-03-20 18:03 UTC — Rewrote `/showcase/` around that hierarchy: replaced insider-ish counts and repeated rationale with one concise hero, one featured tokenizer plaque, one "try this first" panel, and a single dominant launch CTA.

## Milestone 3 - Root Dashboard Extensibility

Success criteria:
- The root dashboard can render durable project/showcase links without manual edits to generated HTML.
- Showcase entries come from a documented data source or template hook.

Status:
- Blocked on a root exporter change in `src/loop/monitor/dashboard.py`.

## Milestone 4 - Additional Hosted Tools

Success criteria:
- At least two non-monitor browser tools live under the showcase.
- Each tool has project docs and a clear navigation path from the showcase.

Status:
- Not started beyond the tokenizer workbench.
