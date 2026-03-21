# agent-monitor-web Roadmap

Last updated: 2026-03-21 21:33 UTC

## Current Status

- The hosted root monitor at `/` is live and continuously refreshed by the snapshot publisher.
- Durable hand-maintained routes now exist under `/tokenizers/` and `/showcase/`.
- `/showcase/`, `/tokenizers/`, and `/showcase/res-publica/` now share a Murphy-branded header shell instead of drifting into separate mini-sites.
- The tokenizer workbench selectors now run newest-to-oldest across lines, families, and configurations instead of inheriting the raw catalog insertion order.
- The showcase route now separates the tokenizer and `Res Publica` into two explicit exhibit lanes: a single-model live tokenizer study first, then the architecture piece as its own card and CTA.
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
- In place. `/showcase/` now behaves like a viewer-first landing page: one featured live tool, one clear CTA path, and no curator notes or route-inventory scaffolding.

### Activity Log

- 2026-03-21 21:33 UTC — Aligned `/showcase/` and `/showcase/res-publica/` to the same Murphy signature, kicker, and rectangular route-button shell already used by `/tokenizers/`, so the durable public pages no longer read as neighboring mini-sites.
- 2026-03-21 21:33 UTC — Extended the shell docs with showcase-specific rules: reuse the Murphy wordmark and `Agent Monitor public surfaces` kicker, keep a compact path row on exhibit pages, and keep animation inside the artifact instead of the shared header.
- 2026-03-21 21:31 UTC — Added a shared Murphy-branded site shell for the durable public routes: `/showcase/`, `/tokenizers/`, and `/showcase/res-publica/` now use the same wordmark, route-button system, and `Agent Monitor public surfaces` kicker so the pages read as one site instead of three unrelated headers.
- 2026-03-21 21:31 UTC — Captured the new header contract in `docs/site-shell.md`, including the important boundary that `/` and `/roadmap/` are still exporter-owned and therefore cannot adopt the same shell without a root-template change.
- 2026-03-21 18:01 UTC — Hardened the `/tokenizers/` inline surface after overflow feedback: the token preview now has stricter shrink/wrap rules for long token strings, and the showcase embed republishes its iframe height on resize, font-settle, and other late layout changes so the lower token card does not get clipped.
- 2026-03-21 08:07 UTC — Reordered the `/tokenizers/` selector stack so the browser UI now walks from newer releases toward older ones at every level instead of surfacing the smallest or earliest-added checkpoint first.
- 2026-03-21 08:07 UTC — Pinned the default tokenizer route to `Kimi K2.5`, while keeping the showcase embed on its explicit `Qwen 3.5 4B` query so the gallery preview remains stable.
- 2026-03-21 07:33 UTC — Expanded `/tokenizers/` from a representative sampler into much broader family coverage: the page now carries the full public text ladders for `Qwen 2.5`, `Qwen 3`, `Qwen 3.5`, `DeepSeek R1 Distill (Qwen)`, and `Falcon 3`, plus a larger `Mistral` / `Phi` catalog.
- 2026-03-21 07:33 UTC — Added working `Kimi` support to `/tokenizers/` by converting MoonshotAI public `tiktoken.model` files into browser-hosted assets, patching the converted regex into a Chrome-compatible form, and restoring per-model chat templates for `Kimi K2`, `Kimi Linear`, and `Kimi K2.5`.
- 2026-03-21 02:25 UTC — Rebuilt `/showcase/` again after feedback that the two examples felt tangled together. The gallery now presents the tokenizer and `Res Publica` as separate exhibit lanes instead of mixing the architecture preview into the tokenizer hero.
- 2026-03-21 02:25 UTC — Tightened the tokenizer showcase slice so it behaves like a minimal single-model study. In embed mode the gallery now drops the model-selection/control panel and keeps only the pinned checkpoint, text input, inline token view, and stream stats.
- 2026-03-21 01:47 UTC — Restored the `Res Publica` preview to `/showcase/` after follow-up feedback. The landing page now keeps the architecture illustration visible as a secondary exhibit card instead of hiding it behind the route link, while the live tokenizer embed remains the main interaction.
- 2026-03-21 01:28 UTC — Reworked `/showcase/` again after more feedback from an outside-viewer perspective: removed the internal `Showcase rule` / selective-copy language, dropped the screenshot-led layout, and rebuilt the page around a live tokenizer embed plus short cue cards.
- 2026-03-21 01:28 UTC — Added a showcase embed mode to `/tokenizers/` so the gallery can host a compact working slice of the tool instead of a blurry preview image, while the full route keeps the broader controls and metadata drawers.
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
- That same exporter boundary covers both `/` and `/roadmap/`, so matching those routes to the new Murphy shell still requires the root template path.

## Milestone 4 - Additional Hosted Tools

Success criteria:
- At least two non-monitor browser tools live under the showcase.
- Each tool has project docs and a clear navigation path from the showcase.

Status:
- Started. The showcase now has a second public exhibit (`Res Publica`), but only one interactive browser tool still exists, so this milestone is not complete yet.
