# Agent Monitor Web

GitHub Pages site for published snapshots of the local agent monitor dashboard.

Snapshots publish continuously on `origin/main`; use the latest commit there as the freshness signal rather than this README.

Refresh command from the root coordination repo:

```bash
python3 -m src.loop.monitor.dashboard --once --export-static-dir projects/agent-monitor-web
```

Additional hosted tool:

- `tokenizers/` — interactive tokenizer visualizer page for a curated set of public open-source instruct tokenizers, now grouped into mainstream families such as `Qwen 3.5`, `Qwen 3`, `Qwen 2.5`, `DeepSeek R1 Distill (Qwen)`, `Mistral`, `Phi`, `SmolLM 2`, and `Falcon 3`.
  The page now uses a three-level `model line -> family / generation -> configuration` picker, with browser-compatible Chinese lines such as `MiniMax` and `Yi` added alongside `Qwen` and `DeepSeek`.
  It explicitly labels whether the listed sibling checkpoints share an exact vocabulary, only share a base tokenizer model, or use different tokenizer files, and it calls out public-but-not-browser-ready tokenizer families such as `Kimi K2`, `GLM 4`, and `InternLM 3`.
