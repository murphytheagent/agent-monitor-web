# agent-monitor-web Roadmap

Last updated: 2026-03-23 13:09 UTC

## Current Status

- The hosted root monitor at `/` is live and continuously refreshed by the snapshot publisher.
- Maintenance re-audit on 2026-03-23 confirmed that the repo currently has no open PR surface and that the recent tokenizer-route fix is already on published `main`.
- The hand-maintained public routes now use a restrained shared shell: dark layered surfaces, shallow navigation, cyan/magenta accents used as signal, and preview-led hierarchy instead of the older route-map-heavy chrome.
- The generated root routes `/` and `/roadmap/` still sit behind the exporter boundary. Manual shell tweaks there can be useful for brief local iteration, but they are not stable enough to count as delivered site changes.
- The remaining root-side problem is now specified more concretely: `/` should compress into a single Now surface and `/roadmap/` into a What-ships-next surface, with utilities demoted and diagnostics/details collapsed behind calmer secondary sections.
- Durable hand-maintained routes now exist under `/tokenizers/` and `/showcase/`.
- `/showcase/`, `/tokenizers/`, `/showcase/signal-deck/`, and `/showcase/res-publica/` now share the same restrained Murphy shell, so the public site reads as one authored system instead of a pile of neighboring mini-sites.
- `/showcase/signal-deck/` now adds a telemetry exhibit grounded in completed-task threads and authored git history, so the showcase is no longer only a tool lane plus an architecture lane.
- The tokenizer workbench selectors now run newest-to-oldest across lines, families, and configurations instead of inheriting the raw catalog insertion order.
- The showcase route now separates the tokenizer, `Signal Deck`, and `Res Publica` into three explicit exhibit lanes with art-directed previews instead of stacked live embeds.
- The root dashboard still links into the public surfaces, but full visual parity with the new shell remains an exporter follow-up rather than a solved project-side change.

## Milestone 1 - Stable Hosted Surfaces

Success criteria:
- Live monitor root stays publishable on GitHub Pages.
- Durable subroutes are clearly separated from publisher-owned root artifacts.

Status:
- In place. The current split is `/` for the generated monitor and subroutes for hand-maintained tools.

### Activity Log

- 2026-03-23 08:26 UTC — Fixed the tokenizer-route publish mismatch by merging PR `#25`, returning the checkout to `main`, and verifying that public `/tokenizers/` now serves the darker `Tokenizer Lab` route from published head `935b007f2f38278827f146ad9c33697160cb4805`.
- 2026-03-22 22:35 UTC — Recovered live publishing after finding the checkout stranded on `murphy-showcase-hierarchy-nav`: switched back to `main`, regenerated the snapshot, let the publisher resume, and closed obsolete PR `#23` once the hosted `status.json` was fresh again.

## Milestone 2 - Showcase Layer

Success criteria:
- A dedicated showcase page exists for browser tools.
- At least one featured tool is presented as a project artifact, not just a raw utility route.

Status:
- In place. `/showcase/` now behaves like a viewer-first landing page: one short framing statement, three distinct exhibits, clear CTA paths, and no route-inventory scaffolding.

### Activity Log

- 2026-03-22 06:53 UTC — Reopened the public shell after collaborator feedback that the calmer pass had drifted out of the site's cyberpunk identity. Consulted Athena in `deep` mode (1 turn; log: `.agent/runtime/consult_history/1774155209.676849.jsonl`) on how to translate Apple/OpenAI/Anthropic hierarchy back into a restrained command-deck language. Main takeaway: keep the dark Murphy system, but treat cyan/magenta as sparse signal accents and let spacing and hierarchy carry most of the clarity.
- 2026-03-22 06:53 UTC — Replaced the warm-light durable shell with a restrained cyberpunk one across `/showcase/`, `/tokenizers/`, `/showcase/signal-deck/`, and `/showcase/res-publica/`: shared dark header, sentence-case navigation, preview-led gallery, and darker tool/exhibit surfaces that still read cleanly on mobile.
- 2026-03-22 06:53 UTC — Re-verified the durable routes in a mobile browser after the shell swap. The remaining split-brain issue is still exporter-owned: attempts to bring `/` and `/roadmap/` into the same visual system are not durable because the snapshot publisher keeps rewriting those files from the exporter path.
- 2026-03-22 05:31 UTC — Consulted Athena in `deep` mode on why the public shell still felt heavy. Main takeaway: the problem was structural, not cosmetic. Too many containers, repeated route maps, and desktop-first layouts were making the mobile experience feel cramped.
- 2026-03-22 05:31 UTC — Rebuilt the durable shell around that advice: `/showcase/` now uses static preview cards instead of stacked live embeds, `/tokenizers/` brings the text and token output ahead of the control stack on small screens, and the exhibit pages use the same calmer navigation and lighter surfaces.
- 2026-03-22 05:31 UTC — Prototyped the same calmer shell on `/` and `/roadmap/`, then watched the publisher rewrite both routes again during the same session. That confirmed the redesign only becomes real there once the exporter template changes.
- 2026-03-21 22:09 UTC — Extended the Murphy shell into the exporter-owned root surfaces. `/` now uses the same signature wordmark and five-route navigation map as the showcase pages, and the old tiny roadmap utility link was replaced by a real shell-level nav system plus route cards.
- 2026-03-21 22:09 UTC — Rebuilt `/roadmap/` as a first-class planning surface instead of a raw utility page: shared header shell, roadmap hero/stat cards, richer roadmap item cards with context, and browser-verified desktop/mobile layouts.
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
- Partially in place. The exporter now renders `/backlog/` (renamed from `/roadmap/`), a new strategic `/roadmap/` page, and the monitor root. The restrained shell from the 2026-03-22 redesign will not be durable on those routes until the exporter template adopts it.

### Activity Log

- 2026-03-24 00:30 UTC — Major exporter-side overhaul across multiple commits:
  - **ROADMAP → BACKLOG rename**: `/roadmap/` page moved to `/backlog/`. All nav links, exports, and templates updated. The concept of "roadmap" is now reserved for the strategic view.
  - **Strategic roadmap page**: New `/roadmap/` page with fluid visualization — gradient hero, SVG progress rings, flowing milestone chains with pulse animations, Now/Next/Later horizon sections. Data from `docs/dev/roadmap.json` (7 themes, 78 milestones covering full system history).
  - **Plan/Issue modal**: Clickable Plan/Issue badges on backlog items open a modal overlay with file content (4KB cap, backdrop blur, Escape to close).
  - **Session viewer → modal**: View Session moved from inline card expansion to modal overlay. Per-item session persistence via `dev_session_map.json` mapping. 14 past dev sessions backfilled. Completed items also show View Session.
  - **Dispatch state persistence**: Dispatched items stay marked "✓ Dispatched" after page refresh via sessionStorage.
  - **Tab persistence + refresh button**: Active tab survives refresh; refresh button added to tab bar.
  - **Nav updated**: Header now shows Roadmap, Backlog, Showcase, Tokenizers, Res Publica.
- 2026-03-22 07:35 UTC — Re-checked the live generated `/` and `/roadmap/` HTML plus fresh mobile captures after more snapshot refreshes. The remaining issue is no longer just "match the shell"; it is an exporter-side hierarchy problem. Both routes still open with too many equal-weight boxes and early utility controls.
- 2026-03-22 07:35 UTC — Consulted Athena in `deep` mode (1 turn; log: `.agent/runtime/consult_history/1774155209.676849.jsonl`) specifically on the exporter-owned root routes. Main takeaway: `/` should behave like a `Now` page and `/roadmap/` like a `What ships next` page. Above the fold, each route needs one dominant composite surface, fewer repeated route cues, and collapsed diagnostics/settings on mobile.
- 2026-03-22 07:35 UTC — Captured that exporter follow-up in `docs/dashboard-design-guide.md` and root developer plan `docs/dev/plans/47-monitor-exporter-mobile-hierarchy.md` so the next template pass has a concrete checklist instead of another vague "make it cleaner" request.

## Milestone 4 - Additional Hosted Tools

Success criteria:
- At least two non-monitor browser tools live under the showcase.
- Each tool has project docs and a clear navigation path from the showcase.

Status:
- In place. The showcase now has two browser tools (`Tokenizer Lab`, `Signal Deck`) plus the `Res Publica` architecture exhibit, each with a direct gallery path and project-level docs.

### Activity Log

- 2026-03-22 02:19 UTC — Added `/showcase/signal-deck/`, a telemetry exhibit built from the finished-task archive plus authored git history. The route now shows task completions over time, estimated thread-token mass, request mix, active-span rhythm, code churn, and a recent task cloud.
- 2026-03-22 02:19 UTC — Consulted Athena in `standard` mode (1 turn; log: `.agent/runtime/consult_history/1774140823.432069.jsonl`) on what system statistics were worth surfacing. Main takeaway: keep it to one coherent five-part story (snapshot strip, production rhythm, token footprint, request mix, code impact) instead of a generic dashboard junk drawer.
- 2026-03-22 02:19 UTC — Added `scripts/build_signal_deck.py` plus `docs/telemetry-showcase.md` so the telemetry bundle can be regenerated locally. Current known limit: the JSON is still manual-refresh because the root exporter has no supported hook for derived showcase telemetry artifacts yet.
