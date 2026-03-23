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
- Keep page titles and child routes out of the sticky shell. If `Tokenizer Lab`, `Signal Deck`, or `Res Publica` need a route link, place it in the body near the artifact.
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

## Verification

Every visual change must follow the verification workflow in [`verification-workflow.md`](verification-workflow.md) before reporting completion. Key rules: full-page screenshots (not viewport-only), verify the live public URL (not just local), check both desktop and mobile widths.

## Durable boundary

The root monitor and roadmap pages are still exporter-owned. If those routes need this shell durably, the exporter template must adopt it. Patching the generated HTML can be useful for immediate iteration, but it is not the long-term source of truth. See [`publishing.md`](publishing.md) for the publisher lifecycle — how to start it, when to restart it after exporter changes, and what it overwrites.

## Exporter follow-up for root routes

The remaining redesign work on `/` and `/roadmap/` is not another palette pass. It is a hierarchy pass.

### `/` should behave like a Now page

- Keep one compact shell header on mobile: wordmark, current-surface label, and a single overflow/menu path for the wider route list.
- Remove route-inventory cards from the body. The page is already the monitor.
- Merge the hero, live status, current task, and queue summary into one dominant above-the-fold surface.
- Move refresh into a quiet meta row or overflow action instead of keeping it as a primary button in the sticky header.
- Merge `System Snapshot` and `GPU Snapshot` into one quieter resources section.
- Collapse `Supervisor`, `Visibility + Permissions`, and deep task-stack detail behind a details/accordion section unless something is unhealthy.

### `/roadmap/` should behave like a What-ships-next page

- Keep the same compact mobile shell pattern as `/`; dispatch settings should not live in the sticky header.
- Replace the hero plus four summary cards with one overview surface containing the title, one-line framing, inline counts, and a short top-priorities list.
- Keep the `Fixes` / `Features` / `Completed` segmentation, but place it below the overview card.
- Render roadmap items as calmer list rows or lightly separated blocks, not a wall of equal-weight dashboard cards.
- Move the full dispatch-settings panel into a collapsed utility section below the overview and tabs.
- Treat completed work as supporting context; on mobile it should start as a count, not the first story.

### Component rules for exporter templates

- One dominant story card per page above the fold.
- Healthy/default states should compress; problems should expand.
- Counts belong inline unless they materially change behavior.
- Utility controls are tertiary. If `Refresh` or `Dispatch settings` reads louder than the current story, the template is wrong.
- Prefer internal dividers to nested framed boxes.
- Omit empty sections entirely instead of rendering placeholder cards.

### Cyberpunk restraint

- Let the identity come from dark surfaces, sharp typography, and sparse cyan/magenta signals rather than lots of bordered containers.
- Use cyan for live/system emphasis and magenta for the selected/current path, but avoid using both at full strength on the same large component.
- Keep accents to dots, thin rules, active counts, and selected states. Do not rebuild the root pages out of glowing pills and thick borders.
