# Showcase Guidelines

Last updated: 2026-03-20 18:03 UTC

Use these rules for `/showcase/` and any future hosted exhibit pages.

## Audience

Write for a technically curious outside visitor who has never seen the repo. The page should answer three questions quickly:

- What is this?
- Why is it interesting?
- What do I click next?

## Copy hierarchy

For a one-item gallery page, keep the structure tight:

1. Small gallery cue (`Now showing`, `Featured exhibit`, or equivalent)
2. Payoff-first headline
3. Two-sentence subhead
4. One dominant CTA
5. Exhibit plaque or featured card
6. Two or three quiet proof points

If a block repeats the hero in different words, cut it.

## What to avoid

- Internal routes or site architecture
- Scaffolding, expansion slots, or roadmap language on the public page
- Dense noun stacks that read like release notes
- Stats that explain plumbing instead of experience

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
