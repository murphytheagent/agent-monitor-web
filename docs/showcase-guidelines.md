# Showcase Guidelines

Last updated: 2026-03-21 21:33 UTC

Use these rules for `/showcase/` and any future hosted exhibit pages.

## Audience

Write for a technically curious outside visitor who has never seen the repo. The page should answer three questions quickly:

- What is this?
- Why is it interesting?
- What do I click next?

## Surface split

Treat the gallery and the exhibit pages differently.

- `/showcase/` is the gallery overview. It should orient fast and let the cards carry the detail.
- `showcase/<exhibit>/` pages can be more atmospheric, but they still need a clear payoff above the fold.
- Never stage one exhibit as a supporting prop inside another exhibit's hero. If two pieces are featured, each one needs its own visible frame or lane.

## Shared Murphy shell

All durable pages under `showcase/` should use the shared Murphy site shell.

- `Murphy` is the leading signature wordmark, not a footer-only label.
- Reuse the `Agent Monitor public surfaces` kicker and the same rectangular route-button treatment already used by the tokenizer page.
- Keep the primary nav explicit about the relationship between the live monitor, the roadmap, the showcase gallery, and the current durable page.
- When a page sits below the gallery, add a compact path row (`Murphy / Showcase / <surface>`) so the viewer can place it immediately.
- Keep shell motion near-zero. If a page needs animation, keep it inside the artifact or embed rather than in the header chrome.

## Copy hierarchy

For the gallery overview:

1. Small section label
2. One short headline
3. One-sentence gallery description
4. One or two exhibit CTAs
5. A live mini embed for browser tools, or one compact card with a real preview when inline interaction is not feasible
6. Optional short cue cards only if they help someone try the page faster

For an individual exhibit page, keep the structure tight:

1. Small exhibit label
2. Payoff-first headline
3. One-sentence subhead
4. One or two focused CTAs
5. Large real preview image or figure
6. Short metadata strip
7. Two or three small cue cards or principle cards

If a block repeats the hero in different words, cut it.

## Visual hierarchy

The gallery should be preview-led, not paragraph-led.

- If the browser tool can run inline, prefer a working slice over a screenshot.
- Put the live slice, screenshot, or figure above the fold.
- Use callouts, chips, or tiny comparison cards to explain where to look.
- Prefer one real screenshot over multiple abstract panels.
- If the gallery already has a real architecture exhibit, keep that figure visible on the gallery page instead of trimming it away during copy cleanup.
- If the page is architecture-led rather than tool-led, the figure still needs to feel like a real artifact, not a placeholder diagram.
- Keep supporting copy short enough that the visual still dominates on mobile.

## What to avoid

- Internal routes or site architecture
- Scaffolding, expansion slots, or roadmap language on the public page
- Dense noun stacks that read like release notes
- Stats that explain plumbing instead of experience
- Multiple labels that all restate the page name before the viewer sees the artifact
- Public pages that read like an internal design memo
- Any visible label that exposes the internal editing rubric itself (`showcase rule`, `public line`, and similar notes belong in docs, not on the page)

## Jargon rule

Use technical terms when they matter, but bridge them once in plain English. Example:

- `tokenization` -> how a model splits text
- `chat formatting` -> how it wraps the same conversation

After that bridge, stop re-explaining.

## Stats rule

Stats are only useful when they help a visitor decide whether to click.

Good:

- number of public checkpoints
- whether the tool compares token splits, chat wrappers, or both
- whether visitors can paste their own input

Bad:

- route counts
- family/model-line bookkeeping that only matters to the builder
- implementation details dressed up as metrics

## Copy limits

- One sentence should be enough for the hero description.
- Keep metadata items to a few words each.
- If you need a paragraph to explain what the screenshot or embed shows, replace the paragraph with a better figure, embed, or callout.
- Gallery cards should feel skimmable in under five seconds.
