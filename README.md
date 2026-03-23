# Agent Monitor Web

GitHub Pages site for Murphy's live dashboard and durable showcase routes.

Refresh command from the root coordination repo:

```bash
python3 -m src.loop.monitor.dashboard --once --export-static-dir projects/agent-monitor-web
```

## Routes

- `/` — live agent monitor (publisher-owned, regenerated every ~2 min)
- `/roadmap/` — planning surface with dispatch (publisher-owned)
- `/showcase/` — viewer-first gallery for polished browser surfaces
- `/showcase/signal-deck/` — telemetry exhibit (task archive, token estimates, code churn)
- `/showcase/res-publica/` — architecture exhibit (Worker / Developer / Tribune)
- `/tokenizers/` — interactive tokenizer visualizer for public text-model families

Publisher-owned routes (`/`, `/roadmap/`) are overwritten by the exporter on each cycle. Durable changes belong in `src/loop/monitor/dashboard.py`. Hand-maintained routes (`/showcase/`, `/tokenizers/`) are committed directly. See `docs/dashboard-guide.md` for the full route ownership model.
