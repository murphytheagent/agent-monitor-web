# Dashboard Design Notes

## Style requirements

- **Theme:** Cyberpunk brutalist. Pure black (`#000`) backgrounds, zero border-radius, thick borders, hard offset drop-shadows (no blur), chromatic aberration text effects.
- **Accent colors:** Cyan `#38f0ff` (primary), magenta `#ff2fb3` (secondary). No other hues for structural elements.
- **Status colors:** Green `#4dffb4`, amber `#ffe66a`, red `#ff6689` — used only for semantic meaning (running/warning/error).
- **Typography:** Orbitron for headings, Rajdhani for body, JetBrains Mono for data. All uppercase for labels and headers.
- **Border-radius:** `0` on all dashboard elements. The only exception is the showcase pill link (`999px`).
- **Animations:** Reserved for the showcase link only. Dashboard cards and controls are static.

Any new pages or components added to the site should follow these requirements to stay visually coherent.

## Design process notes

Notes from the 2026-03-19 redesign session. Sharing what we tried and why we landed here, so future work doesn't have to reverse-engineer the reasoning.

## What we ended up with

The dashboard went through a full visual overhaul. We explored ~15 different directions (glassmorphic, clean minimal, neon terminal, blade runner, etc.) and landed on **cyberpunk brutalist**: pure black backgrounds, zero border-radius, thick borders with hard offset drop-shadows, and chromatic aberration on the title text.

The key insight was that the animations and effects should be **concentrated on the showcase link only** — it acts as a beacon drawing attention against a static, harsh dashboard. When we tried putting animated borders on every card, it diluted the effect and looked busy. The contrast between the static brutalist dashboard and the one glowing, shimmering showcase pill is what makes it work.

## Color choices

- Pure `#000` black for all backgrounds — we tried dark navy/purple gradients but they fought with the neon accents
- Cyan `#38f0ff` as primary accent (borders, header bar, text glow)
- Magenta `#ff2fb3` as secondary (drop-shadow offsets, chromatic aberration)
- Lavender `#c4a0ff` for the showcase link text — differentiates it from the cyan dashboard text
- The chromatic aberration effect (magenta+cyan text-shadow offsets of ~2-3px) is on the title and showcase link

## What worked for cards

- `2px solid rgba(56,240,255,0.5)` borders with `border-radius: 0` — the sharp corners are deliberate, and softening them to even 4px lost the brutalist feel
- Hard offset shadows `4px 4px 0 rgba(255,47,179,0.3), -2px -2px 0 rgba(56,240,255,0.2)` — these create a sense of depth without blur, which felt more cyberpunk than soft box-shadows
- Card headers have a subtle `rgba(56,240,255,0.06)` tint and `2px` bottom border — enough to distinguish header from body without a gradient

## The showcase pill

This went through many iterations. Key decisions:

- **Pill shape** (`border-radius: 999px`) — the one rounded element in a zero-radius dashboard. The contrast is intentional; it makes the link feel special.
- **Holographic shimmer border** — a `linear-gradient(90deg, cyan, magenta, green, cyan)` cycling via `background-position` animation. This was preferred over a rotating conic-gradient border which looked too busy.
- **Glitch jitter** — subtle `translate(-2px, 1px) skewX(-1deg)` that fires only 5% of the time. We removed it from the title (too distracting) but kept it on the showcase link where it adds character.
- **Fixed 280x56px dimensions** with auto-scaling text — the pill never changes size regardless of font.

## Random font approach

The showcase text randomly picks from 50 Google Fonts on each page load. The auto-scaling system measures the rendered text width and height, then applies `transform: scale(min(scaleW, scaleH))` with a `translateY` correction for vertical centering. This means adding new fonts requires zero manual tuning — just append a font entry to the JS array with family/weight/spacing/transform.

Fonts that worked particularly well with the chromatic aberration effect: Megrim, Space Grotesk, Monoton, Audiowide, Fascinate. Script fonts like Caveat and Permanent Marker create an interesting contrast against the brutalist dashboard.

## What didn't work

- **Rounded corners on dashboard cards** — we tried 10px radius with the animated borders and it looked generic, lost the brutalist edge
- **Animated borders on every card** — diluted the showcase link's impact, made the whole page feel like a Christmas tree
- **Full-width launchpad band** — a slim bar spanning the full width with a single centered link felt empty and purposeless
- **Header-integrated showcase link** — mixing navigation with status controls (RUNNING pill, Refresh) was semantically confusing
- **Matching the showcase font to the title** (Orbitron) — they looked too similar, the whole point is visual differentiation
- **Gradient card backgrounds** — fought with the pure black aesthetic; the depth from offset shadows was enough

## Typography hierarchy

- Orbitron for the title and card headers (mechanical, geometric)
- Rajdhani for body text (readable at small sizes)
- JetBrains Mono for data values where monospace helps
- The showcase link uses its own random font — always uppercase, lavender colored
