# agent-monitor-web Roadmap

## Current Status

- The hosted root monitor at `/` is live and continuously refreshed by the snapshot publisher.
- Durable hand-maintained routes now exist under `/tokenizers/` and `/showcase/`.
- The showcase route now behaves like a curated gallery page rather than a route explainer, with the tokenizer workbench carrying the page as the first featured exhibit.
- A persistent tokenizer link on the root dashboard is still blocked because the exporter has no showcase-extension hook yet.

## Milestone 1 - Stable Hosted Surfaces

Success criteria:
- Live monitor root stays publishable on GitHub Pages.
- Durable subroutes are clearly separated from publisher-owned root artifacts.

Status:
- In place. The current split is `/` for the generated monitor and subroutes for hand-maintained tools.

## Milestone 2 - Showcase Layer

Success criteria:
- A dedicated showcase page exists for browser tools.
- At least one featured tool is presented as a project artifact, not just a raw utility route.

Status:
- In place. `/showcase/` now presents the tokenizer workbench as a gallery-style featured exhibit and keeps the page focused on browseable project surfaces instead of internal site structure.

## Milestone 3 - Root Dashboard Extensibility

Success criteria:
- The root dashboard can render durable project/showcase links without manual edits to generated HTML.
- Showcase entries come from a documented data source or template hook.

Status:
- Blocked on a root exporter change in `src/loop/monitor/dashboard.py`.

## Milestone 4 - Additional Hosted Tools

Success criteria:
- At least two non-monitor browser tools live under the showcase.
- Each tool has project docs and a clear navigation path from the showcase.

Status:
- Not started beyond the tokenizer workbench.
