# Shared Site Shell

The public pages under `agent-monitor-web` now share a Murphy-branded header shell.

## What stays consistent

- `Murphy` appears as the leading wordmark, treated as a signature rather than another route label.
- The primary nav stays shallow: `Monitor`, `Roadmap`, `Showcase`.
- Subpages below the gallery can carry one contextual CTA such as `Tokenizer lab`, but they should not expand the shell into a route directory.
- The shell is light, quiet, and slightly editorial: soft surfaces, pill controls, restrained labels, and near-zero motion.
- If a page needs a path hint, keep it compact and secondary. The header should not turn into a sitemap.

## Current scope

The shared shell currently covers:

- `/`
- `/roadmap/`
- `/showcase/`
- `/tokenizers/`
- `/showcase/res-publica/`

## Ownership boundary

The root dashboard `/` and the roadmap page `/roadmap/` still come from exporter-owned output in `src/loop/monitor/dashboard.py`, while the showcase and exhibit pages remain hand-maintained project files. The important rule is unchanged: durable design changes for the root surfaces must land in the exporter source, not as one-off HTML edits in the generated output.

## Implementation notes

- `assets/site-shell.css` owns the Murphy wordmark, shared typography, pill navigation, and the calm light-shell tokens used across the durable public pages.
- `showcase/assets/site.css` imports that shell and carries the common gallery and exhibit-page framing so `/showcase/`, `/showcase/signal-deck/`, and `/showcase/res-publica/` read as one system.
- `tokenizers/index.html` reuses the same shell but keeps the main work surface ahead of the option stack on small screens.
- The root pages can be visually softened in generated output for quick iteration, but the durable implementation for `/` and `/roadmap/` still belongs in `src/loop/monitor/dashboard.py`.
