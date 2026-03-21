# Shared Site Shell

The public pages under `agent-monitor-web` now share a Murphy-branded header shell.

## What stays consistent

- `Murphy` appears as the leading wordmark, treated as a signature rather than another route label.
- Route controls use the same rectangular Orbitron buttons across pages instead of each route inventing its own header chrome.
- The header copy uses the same `Agent Monitor public surfaces` kicker so the tokenizer, showcase, and exhibit pages read as one site.
- Subpages below the gallery can add a compact monospace path row (`Murphy / Showcase / <surface>`) so the hierarchy stays obvious.
- Header motion stays minimal; any animation belongs inside the artifact itself, not in the shared navigation.

## Current scope

The shared shell currently covers:

- `/`
- `/roadmap/`
- `/showcase/`
- `/tokenizers/`
- `/showcase/res-publica/`

## Ownership boundary

The root dashboard `/` and the roadmap page `/roadmap/` still come from exporter-owned output in `src/loop/monitor/dashboard.py`, while the showcase/exhibit pages remain hand-maintained project files. The important rule is unchanged: durable design changes for the root surfaces must land in the exporter source, not as one-off HTML edits in the generated output.

## Implementation notes

- `assets/site-shell.css` owns the Murphy signature wordmark and the shared route-button treatment used across the hand-maintained public pages.
- `showcase/assets/site.css` imports that shell and carries the common showcase page chrome so the gallery and exhibit pages stay aligned with `tokenizers/`.
- `src/loop/monitor/dashboard.py` now renders the same Murphy shell for `/` and `/roadmap/`, including the shared five-route navigation map and the roadmap/dashboard visual system.
