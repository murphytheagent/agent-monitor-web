# Shared Site Shell

The durable public pages under `agent-monitor-web` now share a Murphy-branded header shell.

## What stays consistent

- `Murphy` appears as the leading wordmark, treated as a signature rather than another route label.
- Route controls use the same rectangular Orbitron buttons across pages instead of each route inventing its own header chrome.
- The header copy uses the same `Agent Monitor public surfaces` kicker so the tokenizer, showcase, and exhibit pages read as one site.
- Subpages below the gallery can add a compact monospace path row (`Murphy / Showcase / <surface>`) so the hierarchy stays obvious.
- Header motion stays minimal; any animation belongs inside the artifact itself, not in the shared navigation.

## Current scope

The shared shell currently covers:

- `/showcase/`
- `/tokenizers/`
- `/showcase/res-publica/`

## Important boundary

The monitor root `/` and the roadmap page `/roadmap/` are still exporter-owned outputs generated from `src/loop/monitor/dashboard.py`. Matching those routes to the shared shell requires a root-template change, not another project-side HTML patch.

## Implementation notes

- `assets/site-shell.css` owns the Murphy signature wordmark and the shared route-button treatment used across durable public pages.
- `showcase/assets/site.css` imports that shell and carries the common showcase page chrome so the gallery and exhibit pages stay aligned with `tokenizers/`.
