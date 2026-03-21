# agent-monitor-web Roadmap

Last updated: 2026-03-21 00:53 UTC

## Current Status

- The hosted root monitor at `/` is live and continuously refreshed by the snapshot publisher.
- Durable hand-maintained routes now exist under `/tokenizers/` and `/showcase/`.
- The showcase route is now a two-exhibit gallery: `Res Publica` gives the system a public architecture piece, and the tokenizer workbench remains the live interactive tool.
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
- In place. `/showcase/` now behaves like a real gallery: one architecture exhibit, one interactive tool, real preview images, and no route-inventory scaffolding.

### Activity Log

- 2026-03-21 00:53 UTC — Added a second showcase exhibit, `Res Publica`, under `/showcase/res-publica/`: a public-facing architecture page for the Worker / Developer / Tribune split with an animated triangle stage, minimal copy, and a real browser-captured preview image.
- 2026-03-21 00:53 UTC — Rebuilt `/showcase/` into a two-card gallery so the architecture piece and tokenizer workbench sit side by side instead of forcing the entire route to explain one exhibit.
- 2026-03-20 18:41 UTC — Browsed gallery references from Framer Marketplace, Webflow Made in Webflow, and Vercel Templates before the redesign pass. Common pattern: one short value statement up top, then let previews/cards do the explanation work.
- 2026-03-20 18:41 UTC — Reworked `/showcase/` again around that pattern: added a real tokenizer screenshot, moved the visual above the fold on mobile, replaced the old proof-point prose with callouts plus three compact comparison cards, and shortened the remaining copy.
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
- Started. The showcase now has a second public exhibit (`Res Publica`), but only one interactive browser tool still exists, so this milestone is not complete yet.
