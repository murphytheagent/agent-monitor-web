# Dashboard Design Guide

Last updated: 2026-03-22 06:53 UTC

## Core direction

The current direction is restrained cyberpunk: a calm command-deck shell rather than either a neon arcade or a beige productivity site. Apple, Anthropic, and OpenAI are still useful references, but only for structure: shallow navigation, generous spacing, restrained surfaces, and pages that explain themselves with hierarchy instead of chrome.

This site is still data-heavy, but it should feel authored and readable on a phone before it feels dense or "power-user". The cyberpunk identity should survive even when most of the accent color is removed.

## Style requirements

- **Theme:** Near-black backgrounds, layered dark surfaces, cyan as the primary signal color, magenta as a secondary response color. The goal is signal, not neon wallpaper.
- **Typography:** `Rajdhani` for UI and body copy. `Playfair Display` is reserved for the Murphy wordmark. `Orbitron` is for small system labels or standout numerals, not whole paragraphs. Use monospace only for actual data, labels, and code-like strings.
- **Case:** Sentence case by default. Do not force uppercase labels across the shell.
- **Shape:** Rounded corners are allowed and expected. Favor pill navigation and 20-28px card radii over hard rectangles.
- **Motion:** Minimal and purposeful. Prefer gentle fades, slight translate transitions, or static composition. No shimmer, glitch, or always-on animation in the shell.
- **Density:** Fewer containers, fewer badges, fewer competing callouts. If two boxes can become one quieter section, combine them.

Any new page should inherit this direction unless it is intentionally framed as a standalone exhibit.

## Structural rules

- Use one slim shared header with only the top-level routes: `Monitor`, `Roadmap`, and `Showcase`.
- Child routes such as `Tokenizer Lab` or `Res Publica` can appear as a single contextual CTA, not as a permanent route inventory.
- Do not repeat route maps, "current surface" boxes, or taxonomy panels inside the page body.
- Put the primary interaction first on small screens. Controls and settings come after the main surface unless they are essential to understanding the page.
- Showcase and gallery pages should be preview-led. A good static preview is better than a cramped live embed on mobile.
- Keep hero copy short. The layout should do most of the explaining.

## What changed in the 2026-03-22 redesign

Athena's diagnosis stayed the same after the collaborator asked to keep the cyberpunk theme: the main problem was structural, not cosmetic. Too many bordered containers, too many route labels, and too much desktop-first scaffolding made the mobile experience feel compressed.

The redesign therefore focused on:

- keeping one dark shell across the durable routes instead of splitting the site into dark root pages and light subpages
- reducing header chrome to a single shallow navigation band plus one contextual CTA
- removing route-map and "you are here" blocks from page bodies
- turning `/showcase/` into a viewer-first gallery with static previews instead of stacked live embeds
- moving the tokenizer work surface ahead of the control stack on mobile
- translating premium reference-site hierarchy back into a Murphy-specific command-deck language

## Visual heuristics

- Start from whitespace and hierarchy, not ornament.
- Use one accent color at a time for structure; reserve status colors for actual status.
- Let the biggest heading or preview earn attention naturally instead of forcing it with effects.
- Prefer one strong preview card over a dense grid of equal-weight cards.
- On mobile, make the first screen enough to understand what the page is and where to go next.
- If a component needs both a glow and a border to feel important, the hierarchy is probably wrong.

## What to avoid

- cyan/magenta used at full intensity on text, borders, fills, and backgrounds at the same time
- light subpages bolted onto dark dashboard pages
- zero-radius brutalism as the default shell
- multiple stacked metadata strips above the real content
- live embeds on the gallery page when a static preview communicates better
- navigation that lists every route on every page
- headers that compete with the artifact they are supposed to support

## Durable boundary

The root monitor and roadmap pages are still exporter-owned. If those routes need this shell durably, the exporter template must adopt it. Patching the generated HTML can be useful for immediate iteration, but it is not the long-term source of truth.
