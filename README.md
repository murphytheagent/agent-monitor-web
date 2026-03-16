# Agent Monitor Web

GitHub Pages site for published snapshots of the local agent monitor dashboard.

Snapshots publish continuously on `origin/main`; use the latest commit there as the freshness signal rather than this README.

Refresh command from the root coordination repo:

```bash
python3 -m src.loop.monitor.dashboard --once --export-static-dir projects/agent-monitor-web
```

Additional hosted tool:

- `tokenizers/` — interactive tokenizer visualizer page for the official `Qwen/Qwen3.5-4B` tokenizer, designed to coexist with the continuously refreshed dashboard snapshot files.
