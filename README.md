# Agent Monitor Web

GitHub Pages site for published snapshots of the local agent monitor dashboard.

Snapshots publish continuously on `origin/main`; use the latest commit there as the freshness signal rather than this README.

Refresh command from the root coordination repo:

```bash
python3 -m src.loop.monitor.dashboard --once --export-static-dir projects/agent-monitor-web
```

Hosted routes:

- `/` - live agent monitor snapshot. This root surface is publisher-owned: each snapshot refresh rewrites `index.html` and `status.json`.
- `/showcase/` - viewer-first landing page for polished browser surfaces. It now leads with a live tokenizer embed and minimal copy instead of a static screenshot or route inventory.
- `/showcase/res-publica/` - architecture exhibit for the Worker / Developer / Tribune split, presented as a public-facing art page rather than an internal system diagram.
- `/tokenizers/` - interactive tokenizer visualizer page for a curated set of public open-source instruct tokenizers.

If you want a permanent custom page or navigation outside the live monitor cards, add it under a subroute such as `showcase/` or `tokenizers/`; a manual root-homepage patch will be overwritten by the next snapshot export.

Additional hosted tool details:

- `tokenizers/` — interactive tokenizer visualizer page for a curated set of public open-source instruct tokenizers, now grouped into mainstream families such as `Qwen 3.5`, `Qwen 3`, `Qwen 2.5`, `DeepSeek R1 Distill (Qwen)`, `Mistral`, `Phi`, `SmolLM 2`, and `Falcon 3`.
  The page now uses a three-level `model line -> family / generation -> configuration` picker, with browser-compatible Chinese lines such as `MiniMax` and `Yi` added alongside `Qwen` and `DeepSeek`.
  It explicitly labels whether the listed sibling checkpoints share an exact vocabulary, only share a base tokenizer model, or use different tokenizer files, and it calls out public-but-not-browser-ready tokenizer families such as `Kimi K2`, `GLM 4`, and `InternLM 3`.
- `showcase/` — showcase landing page for hosted project surfaces. It now keeps the copy sparse and uses a working tokenizer slice from `/tokenizers/` as the main visual instead of a screenshot; `Res Publica` still exists as a separate architecture route under `showcase/res-publica/`.
