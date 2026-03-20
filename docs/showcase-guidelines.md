# Showcase Guidelines

Last updated: 2026-03-20 18:41 UTC

Use these rules for `/showcase/` and any future hosted exhibit pages.

## Audience

Write for a technically curious outside visitor who has never seen the repo. The page should answer three questions quickly:

- What is this?
- Why is it interesting?
- What do I click next?

## Copy hierarchy

For a one-item gallery page, keep the structure tight:

1. Small exhibit label
2. Payoff-first headline
3. One-sentence subhead
4. One dominant CTA
5. Large real preview image or figure
6. Short metadata strip
7. Two or three small visual cue cards

If a block repeats the hero in different words, cut it.

## Visual hierarchy

The gallery should be image-led, not paragraph-led.

- Put the tool screenshot or figure above the fold.
- Use callouts, chips, or tiny comparison cards to explain where to look.
- Prefer one real screenshot over multiple abstract panels.
- Keep supporting copy short enough that the visual still dominates on mobile.

## What to avoid

- Internal routes or site architecture
- Scaffolding, expansion slots, or roadmap language on the public page
- Dense noun stacks that read like release notes
- Stats that explain plumbing instead of experience
- Multiple labels that all restate the page name before the viewer sees the artifact

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
- If you need a paragraph to explain what the screenshot shows, replace the paragraph with a better figure or callout.
