# Agent Monitor Web

GitHub Pages site for published snapshots of the local agent monitor dashboard.

Snapshots publish continuously on `origin/main`; use the latest commit there as the freshness signal rather than this README.

Refresh command from the root coordination repo:

```bash
python3 -m src.loop.monitor.dashboard --once --export-static-dir projects/agent-monitor-web
```

Additional hosted tool:

- `tokenizers/` — interactive tokenizer visualizer page for a curated set of public open-source instruct tokenizers (`Qwen3.5`, `Qwen2.5`, `DeepSeek-R1-Distill-Qwen`, `Mistral 7B Instruct`, `Phi-3 mini instruct`, and `TinyLlama Chat`), designed to coexist with the continuously refreshed dashboard snapshot files.
  The page now uses a hierarchical `family -> configuration` picker so related checkpoints stay grouped as the lineup grows.
