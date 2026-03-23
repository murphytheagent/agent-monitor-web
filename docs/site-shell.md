# Shared Site Shell

The durable public pages under `agent-monitor-web` now share a Murphy-branded shell.

## What stays consistent

- `Murphy` appears as the leading wordmark, treated as a signature rather than another route label.
- The primary nav stays shallow: `Monitor`, `Roadmap`, and `Showcase`.
- The sticky shell does not carry page titles or child-route CTAs. Child routes belong in the page body, not in the header.
- The shell is dark, restrained, and signal-led: near-black surfaces, soft cyan/magenta accents, pill controls, and near-zero motion.
- If a page needs a path hint, keep it compact and secondary. The header should not turn into a sitemap.

## Current scope

The shared shell is authoritative for:

- `/showcase/`
- `/tokenizers/`
- `/showcase/signal-deck/`
- `/showcase/res-publica/`

`/` and `/roadmap/` should visually echo the same system, but their durable source is still elsewhere.

## Ownership boundary

The root dashboard `/` and the roadmap page `/roadmap/` still come from exporter-owned output in `src/loop/monitor/dashboard.py`, while the showcase and exhibit pages remain hand-maintained project files. Durable design changes for the root surfaces must land in the exporter source, not as one-off HTML edits in the generated output.

## Implementation notes

- `assets/site-shell.css` owns the Murphy wordmark, shared typography, pill navigation, and the restrained cyberpunk tokens used across the durable public pages.
- `showcase/assets/site.css` imports that shell and carries the common gallery and exhibit-page framing so `/showcase/`, `/showcase/signal-deck/`, and `/showcase/res-publica/` read as one system.
- `tokenizers/index.html` reuses the same shell but keeps the main work surface ahead of the option stack on small screens.
- The root pages can be locally prototyped against the same shell for quick iteration, but the durable implementation for `/` and `/roadmap/` still belongs in `src/loop/monitor/dashboard.py`.
