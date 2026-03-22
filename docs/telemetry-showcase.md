# Signal Deck Data Contract

`/showcase/signal-deck/` is the telemetry exhibit for the hosted Murphy site. It is deliberately narrower than a generic dashboard: every panel should tie back to a local ledger we can explain.

## Sources

- `Research/.agent/tasks/finished/*.json`
  - completion date from the last archived thread message
  - active span from first archived thread message to last archived thread message
  - request family from the first archived human ask
- git history across the coordination repo plus project/MCP repos under `Research/`
  - authored commits only (`murphytheagent@gmail.com`)
  - snapshot-publisher commits (`chore: refresh monitor snapshot ...`) are excluded so the churn chart reflects authored work rather than the publishing heartbeat

## Token Metric

The route currently shows `estimated thread tokens`, not billed model tokens.

- estimator: visible archived thread text at roughly `4 characters ~= 1 token`
- split: human-thread text vs agent-thread text
- reason: the finished-task archive does not yet keep exact worker-model usage totals

Keep that label explicit in both the page copy and any future derivative charts.

## Refresh Workflow

The telemetry bundle is generated into the route as static JSON:

```bash
cd /Users/murphy/Research/projects/agent-monitor-web
python3 scripts/build_signal_deck.py
```

That writes `showcase/signal-deck/telemetry.json`.

## Known Limitation

The route itself is durable, but the bundle is currently manual-refresh. Workers cannot patch the root exporter code from this repo, so there is not yet a supported automatic publish hook for derived showcase telemetry artifacts.
