# Agent Monitor Web

GitHub Pages site for published snapshots of the local agent monitor dashboard.

Snapshots publish continuously on `origin/main`; use the latest commit there as the freshness signal rather than this README.

Refresh command from the root coordination repo:

```bash
python3 -m src.loop.monitor.dashboard --once --export-static-dir projects/agent-monitor-web
```

Hosted routes:

- `/` - live agent monitor snapshot. This root surface is publisher-owned: each snapshot refresh rewrites `index.html` and `status.json`, and the exporter now renders the same Murphy shell used by the showcase-side routes.
- `/roadmap/` - exporter-backed planning surface with the shared Murphy shell, roadmap-specific hero/stat layout, and the same route navigation used across the rest of the site.
- `/showcase/` - viewer-first landing page for polished browser surfaces. It now acts as the parent gallery: top-level nav stops at `Showcase`, while `Tokenizer Lab` and `Res Publica` sit inside a separate local exhibit row.
- `/showcase/res-publica/` - architecture exhibit for the Worker / Developer / Tribune split, presented as a public-facing art page rather than an internal system diagram, while reusing the same global `Monitor / Roadmap / Showcase` row plus the local showcase exhibit row.
- `/tokenizers/` - interactive tokenizer visualizer page for expanded public text-model families, including full Qwen ladders and local Kimi support, now explicitly framed as a sibling exhibit under `Showcase` rather than a top-level route.

If you want a permanent custom page or navigation outside the existing exporter-backed shell, add it under a subroute such as `showcase/` or `tokenizers/`; a manual root-homepage patch will still be overwritten by the next snapshot export unless the exporter template itself changes.

Additional hosted tool details:

- `tokenizers/` — interactive tokenizer visualizer page for expanded public text-model families, now grouped into lines such as `Qwen`, `DeepSeek`, `Kimi`, `MiniMax`, `Yi`, `Mistral`, `Phi`, `SmolLM`, and `Falcon`.
  The page uses a three-level `model line -> family / generation -> configuration` picker, and the main text ladders now expose full public family coverage where the tokenizer relationship is cleanly defined, including the full public `Qwen 2.5`, `Qwen 3`, `Qwen 3.5`, `DeepSeek R1 Distill`, and `Falcon 3` ladders.
  `Kimi` is now supported directly in the browser through locally hosted tokenizer bundles converted from MoonshotAI public `tiktoken.model` files, with per-model chat templates restored for `Kimi K2`, `Kimi Linear`, and `Kimi K2.5`.
  The page still labels whether sibling checkpoints share an exact vocabulary, only share a base tokenizer model, or use different tokenizer files, and the unsupported callout is now limited to genuinely non-browser-ready lines such as `GLM 4`, `InternLM 3`, and `Baichuan 2`.
- `showcase/` — showcase landing page for hosted project surfaces. It now keeps the two public pieces distinct while also making the site structure explicit: `Showcase` is the parent lane, and the tokenizer plus `Res Publica` are the two sibling exhibits inside it.
