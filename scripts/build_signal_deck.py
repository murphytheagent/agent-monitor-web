#!/usr/bin/env python3
"""Build the Signal Deck telemetry bundle for the hosted showcase route."""

from __future__ import annotations

import argparse
import json
import math
import os
import re
import statistics
import subprocess
from collections import Counter
from dataclasses import dataclass
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from typing import Any

DEFAULT_WINDOW_DAYS = 30
COMPARISON_DAYS = 7
RECENT_TASK_LIMIT = 18
TOKEN_CHAR_DIVISOR = 4
AUTHOR_EMAIL = "murphytheagent@gmail.com"
TASK_MENTION_RE = re.compile(r"<@[^>]+>")
SPACE_RE = re.compile(r"\s+")

CATEGORY_RULES = [
    ("maintenance", ("maintenance checklist", r"\bmaintenance\b", r"\bphase 0\b", r"\bphase 1\b")),
    ("review", (r"\breview pr\b", r"\breview\b", r"\bmerge\b", r"\bcomment", r"\bpr\b")),
    ("website", (r"\bwebsite\b", r"\bshowcase\b", r"\bdashboard\b", r"\btokenizer", r"\bui\b", r"\bpage\b", r"\bsite\b", r"\bvisual\b")),
    ("research", (r"\bresearch\b", r"\bpaper\b", r"\bbrief\b", r"\bsummar", r"\barxiv\b", r"\btheorem\b", r"\bproof\b", r"\bkarpathy\b")),
    ("ops", (r"\bdrive\b", r"\bgoogle\b", r"\blogin\b", r"\boauth\b", r"\bpermission\b", r"\baccess\b", r"\bshare\b", r"\baccount\b", r"\binstall\b", r"\bsync\b")),
    ("debug", (r"\bfix\b", r"\bbug\b", r"\berror\b", r"\bfailing\b", r"\btest\b", r"\bbroken\b", r"\bdebug\b")),
    ("docs", (r"\bdocs?\b", r"\breadme\b", r"\broadmap\b", r"\bwrite-?up\b")),
    ("experiments", (r"\bgpu\b", r"\btrain\b", r"\beval\b", r"\bbenchmark\b", r"\bexperiment\b")),
]

CATEGORY_LABELS = {
    "maintenance": "Maintenance",
    "review": "Review",
    "website": "Website",
    "research": "Research",
    "ops": "Ops",
    "debug": "Debug",
    "docs": "Docs",
    "experiments": "Experiments",
    "other": "Other",
}


@dataclass
class TaskRecord:
    task_id: str
    completed_at_ts: float
    completed_at_utc: str
    completion_date: str
    category: str
    preview: str
    message_count: int
    human_message_count: int
    agent_message_count: int
    thread_tokens_est: int
    human_tokens_est: int
    agent_tokens_est: int
    span_minutes: float


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--window-days", type=int, default=DEFAULT_WINDOW_DAYS)
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("showcase/signal-deck/telemetry.json"),
        help="Output path relative to the project repo or absolute.",
    )
    parser.add_argument(
        "--project-root",
        type=Path,
        default=Path(__file__).resolve().parents[1],
        help="Project repo root. Defaults to the repo containing this script.",
    )
    return parser.parse_args()


def find_research_root(project_root: Path) -> Path:
    for candidate in (project_root, *project_root.parents):
        if (candidate / ".agent").exists() and (candidate / "projects").exists():
            return candidate
    raise RuntimeError(f"Could not locate Research root from {project_root}")


def clean_text(text: str) -> str:
    cleaned = TASK_MENTION_RE.sub("", text or "")
    return SPACE_RE.sub(" ", cleaned).strip()


def estimate_tokens(text: str) -> int:
    stripped = (text or "").strip()
    if not stripped:
        return 0
    return max(1, math.ceil(len(stripped) / TOKEN_CHAR_DIVISOR))


def safe_float(value: Any) -> float | None:
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def classify_request(text: str) -> str:
    lowered = text.lower()
    for category, patterns in CATEGORY_RULES:
        if any(re.search(pattern, lowered) for pattern in patterns):
            return category
    return "other"


def parse_finished_tasks(tasks_dir: Path) -> list[TaskRecord]:
    records: list[TaskRecord] = []
    for path in sorted(tasks_dir.glob("*.json")):
        try:
            payload = json.loads(path.read_text())
        except Exception:
            continue
        messages = payload.get("messages")
        if not isinstance(messages, list):
            continue

        timestamps = [safe_float(message.get("ts")) for message in messages]
        timestamps = [timestamp for timestamp in timestamps if timestamp is not None]
        if not timestamps:
            continue

        first_human = ""
        human_tokens = 0
        agent_tokens = 0
        human_message_count = 0
        agent_message_count = 0
        message_count = 0

        for message in messages:
            text = clean_text(str(message.get("text", "")))
            role = str(message.get("role", "")).strip().lower()
            if not text:
                continue
            message_count += 1
            if role == "human":
                if not first_human:
                    first_human = text
                human_message_count += 1
                human_tokens += estimate_tokens(text)
            else:
                agent_message_count += 1
                agent_tokens += estimate_tokens(text)

        preview = first_human or clean_text(str((messages[0] or {}).get("text", ""))) or "(no archived prompt text)"
        completed_ts = max(timestamps)
        completed_dt = datetime.fromtimestamp(completed_ts, timezone.utc)
        span_minutes = max(0.0, (completed_ts - min(timestamps)) / 60.0)

        records.append(
            TaskRecord(
                task_id=path.stem,
                completed_at_ts=completed_ts,
                completed_at_utc=completed_dt.strftime("%Y-%m-%d %H:%M UTC"),
                completion_date=completed_dt.date().isoformat(),
                category=classify_request(preview),
                preview=preview,
                message_count=message_count,
                human_message_count=human_message_count,
                agent_message_count=agent_message_count,
                thread_tokens_est=human_tokens + agent_tokens,
                human_tokens_est=human_tokens,
                agent_tokens_est=agent_tokens,
                span_minutes=round(span_minutes, 2),
            )
        )
    return records


def run_git(repo_dir: Path, *args: str) -> str:
    proc = subprocess.run(
        ["git", "-C", str(repo_dir), *args],
        capture_output=True,
        text=True,
        check=False,
    )
    if proc.returncode != 0:
        detail = (proc.stderr or proc.stdout or "").strip()
        raise RuntimeError(f"git {' '.join(args)} failed in {repo_dir}: {detail}")
    return proc.stdout


def list_git_repos(research_root: Path) -> list[Path]:
    repos = [research_root]
    for parent_name in ("projects", "mcp"):
        parent = research_root / parent_name
        if not parent.exists():
            continue
        for child in sorted(parent.iterdir()):
            if (child / ".git").exists():
                repos.append(child)
    return repos


def parse_git_activity(research_root: Path, since_date: date) -> tuple[list[dict[str, Any]], list[dict[str, Any]], int]:
    daily: dict[str, dict[str, Any]] = {}
    repo_totals: list[dict[str, Any]] = []
    repos = list_git_repos(research_root)
    repos_with_activity = 0
    since_arg = since_date.isoformat()

    for repo in repos:
        relative = repo.relative_to(research_root).as_posix() or "."
        try:
            raw = run_git(
                repo,
                "log",
                f"--author={AUTHOR_EMAIL}",
                f"--since={since_arg}",
                "--date=short",
                "--pretty=format:__COMMIT__|%ad|%H|%s",
                "--numstat",
                "--no-merges",
                "--no-renames",
            )
        except RuntimeError:
            continue

        repo_commit_count = 0
        repo_added = 0
        repo_deleted = 0
        current_entry: dict[str, Any] | None = None
        skip_current = False

        for line in raw.splitlines():
            if line.startswith("__COMMIT__|"):
                _, day, sha, subject = line.split("|", 3)
                skip_current = subject.startswith("chore: refresh monitor snapshot")
                if skip_current:
                    current_entry = None
                    continue
                current_entry = daily.setdefault(
                    day,
                    {
                        "date": day,
                        "commits": 0,
                        "lines_added": 0,
                        "lines_deleted": 0,
                        "repos": Counter(),
                    },
                )
                current_entry["commits"] += 1
                current_entry["repos"][relative] += 1
                repo_commit_count += 1
                continue

            if skip_current or not current_entry or "\t" not in line:
                continue

            added_str, deleted_str, _filename = line.split("\t", 2)
            if not (added_str.isdigit() and deleted_str.isdigit()):
                continue

            added = int(added_str)
            deleted = int(deleted_str)
            current_entry["lines_added"] += added
            current_entry["lines_deleted"] += deleted
            repo_added += added
            repo_deleted += deleted

        if repo_commit_count:
            repos_with_activity += 1
            repo_totals.append(
                {
                    "repo": relative,
                    "commits": repo_commit_count,
                    "lines_added": repo_added,
                    "lines_deleted": repo_deleted,
                    "net_lines": repo_added - repo_deleted,
                }
            )

    daily_rows = []
    for key in sorted(daily):
        row = daily[key]
        top_repo = ""
        if row["repos"]:
            top_repo = row["repos"].most_common(1)[0][0]
        daily_rows.append(
            {
                "date": row["date"],
                "commits": row["commits"],
                "lines_added": row["lines_added"],
                "lines_deleted": row["lines_deleted"],
                "net_lines": row["lines_added"] - row["lines_deleted"],
                "top_repo": top_repo,
            }
        )

    repo_totals.sort(key=lambda row: (row["commits"], row["lines_added"] + row["lines_deleted"]), reverse=True)
    return daily_rows, repo_totals, repos_with_activity


def build_daily_rows(today: date, window_days: int) -> list[dict[str, Any]]:
    start = today - timedelta(days=window_days - 1)
    rows = []
    for offset in range(window_days):
        current = start + timedelta(days=offset)
        rows.append(
            {
                "date": current.isoformat(),
                "tasks_completed": 0,
                "thread_tokens_est": 0,
                "human_tokens_est": 0,
                "agent_tokens_est": 0,
                "human_messages": 0,
                "agent_messages": 0,
                "median_span_minutes": None,
                "mean_span_minutes": None,
                "p25_span_minutes": None,
                "p75_span_minutes": None,
                "commits": 0,
                "lines_added": 0,
                "lines_deleted": 0,
                "net_lines": 0,
                "top_repo": "",
                "request_counts": {},
            }
        )
    return rows


def percentile(values: list[float], fraction: float) -> float | None:
    if not values:
        return None
    ordered = sorted(values)
    if len(ordered) == 1:
        return ordered[0]
    index = (len(ordered) - 1) * fraction
    lower = math.floor(index)
    upper = math.ceil(index)
    if lower == upper:
        return ordered[lower]
    blend = index - lower
    return ordered[lower] + (ordered[upper] - ordered[lower]) * blend


def finalize_span_stats(samples: list[float]) -> tuple[float | None, float | None, float | None, float | None]:
    if not samples:
        return None, None, None, None
    rounded = sorted(samples)
    median = statistics.median(rounded)
    mean = statistics.fmean(rounded)
    return (
        round(median, 2),
        round(mean, 2),
        round(percentile(rounded, 0.25) or 0, 2),
        round(percentile(rounded, 0.75) or 0, 2),
    )


def sum_for_window(rows: list[dict[str, Any]], key: str, length: int, offset: int = 0) -> float:
    end = len(rows) - offset
    start = max(0, end - length)
    return sum(float(row.get(key) or 0) for row in rows[start:end])


def task_metric_for_window(tasks: list[TaskRecord], end_date: date, length: int, field: str) -> list[float]:
    start_date = end_date - timedelta(days=length - 1)
    values = []
    for task in tasks:
        completed = date.fromisoformat(task.completion_date)
        if start_date <= completed <= end_date:
            values.append(float(getattr(task, field)))
    return values


def kpi_entry(
    item_id: str,
    label: str,
    value: float,
    previous: float,
    unit: str,
    trend: list[float],
    note: str,
) -> dict[str, Any]:
    if previous:
        delta = round(((value - previous) / previous) * 100.0, 1)
    elif value:
        delta = 100.0
    else:
        delta = 0.0
    return {
        "id": item_id,
        "label": label,
        "value": value,
        "previous": previous,
        "delta_pct": delta,
        "unit": unit,
        "trend": trend,
        "note": note,
    }


def build_bundle(project_root: Path, research_root: Path, window_days: int) -> dict[str, Any]:
    today = datetime.now(timezone.utc).date()
    history_start = today - timedelta(days=window_days + COMPARISON_DAYS + 14)
    tasks = parse_finished_tasks(research_root / ".agent" / "tasks" / "finished")
    git_daily, repo_totals, repos_with_activity = parse_git_activity(research_root, history_start)

    daily_rows = build_daily_rows(today, window_days)
    daily_map = {row["date"]: row for row in daily_rows}
    span_samples: dict[str, list[float]] = {row["date"]: [] for row in daily_rows}
    request_mix = Counter()

    for task in tasks:
        row = daily_map.get(task.completion_date)
        if not row:
            continue
        row["tasks_completed"] += 1
        row["thread_tokens_est"] += task.thread_tokens_est
        row["human_tokens_est"] += task.human_tokens_est
        row["agent_tokens_est"] += task.agent_tokens_est
        row["human_messages"] += task.human_message_count
        row["agent_messages"] += task.agent_message_count
        span_samples[task.completion_date].append(task.span_minutes)
        request_mix[task.category] += 1
        bucket = dict(row["request_counts"])
        bucket[task.category] = bucket.get(task.category, 0) + 1
        row["request_counts"] = bucket

    for row in daily_rows:
        median, mean, p25, p75 = finalize_span_stats(span_samples[row["date"]])
        row["median_span_minutes"] = median
        row["mean_span_minutes"] = mean
        row["p25_span_minutes"] = p25
        row["p75_span_minutes"] = p75

    for row in git_daily:
        target = daily_map.get(row["date"])
        if not target:
            continue
        target["commits"] = row["commits"]
        target["lines_added"] = row["lines_added"]
        target["lines_deleted"] = row["lines_deleted"]
        target["net_lines"] = row["net_lines"]
        target["top_repo"] = row["top_repo"]

    archive_start = min(task.completed_at_ts for task in tasks) if tasks else None
    archive_end = max(task.completed_at_ts for task in tasks) if tasks else None
    archive_start_iso = datetime.fromtimestamp(archive_start, timezone.utc).strftime("%Y-%m-%d") if archive_start else None
    archive_end_iso = datetime.fromtimestamp(archive_end, timezone.utc).strftime("%Y-%m-%d") if archive_end else None

    recent_tasks = [
        {
            "task_id": task.task_id,
            "completed_at_utc": task.completed_at_utc,
            "category": task.category,
            "category_label": CATEGORY_LABELS[task.category],
            "preview": task.preview,
            "message_count": task.message_count,
            "thread_tokens_est": task.thread_tokens_est,
            "span_minutes": task.span_minutes,
        }
        for task in sorted(tasks, key=lambda item: item.completed_at_ts, reverse=True)[:RECENT_TASK_LIMIT]
    ]

    last_date = today
    previous_end = today - timedelta(days=COMPARISON_DAYS)
    recent_span_values = task_metric_for_window(tasks, last_date, COMPARISON_DAYS, "span_minutes")
    previous_span_values = task_metric_for_window(tasks, previous_end, COMPARISON_DAYS, "span_minutes")

    kpis = [
        kpi_entry(
            "completed",
            f"Completed / {COMPARISON_DAYS}d",
            sum_for_window(daily_rows, "tasks_completed", COMPARISON_DAYS),
            sum_for_window(daily_rows, "tasks_completed", COMPARISON_DAYS, COMPARISON_DAYS),
            "tasks",
            [row["tasks_completed"] for row in daily_rows],
            "Closed tasks from the archived thread queue.",
        ),
        kpi_entry(
            "thread_tokens",
            f"Thread tokens / {COMPARISON_DAYS}d",
            sum_for_window(daily_rows, "thread_tokens_est", COMPARISON_DAYS),
            sum_for_window(daily_rows, "thread_tokens_est", COMPARISON_DAYS, COMPARISON_DAYS),
            "tokens",
            [row["thread_tokens_est"] for row in daily_rows],
            "Estimated from visible thread text at roughly four characters per token.",
        ),
        kpi_entry(
            "median_span",
            f"Median span / {COMPARISON_DAYS}d",
            round(statistics.median(recent_span_values), 2) if recent_span_values else 0.0,
            round(statistics.median(previous_span_values), 2) if previous_span_values else 0.0,
            "minutes",
            [row["median_span_minutes"] or 0 for row in daily_rows],
            "Measured from the first archived thread message to the last archived thread message.",
        ),
        kpi_entry(
            "commits",
            f"Commits / {COMPARISON_DAYS}d",
            sum_for_window(daily_rows, "commits", COMPARISON_DAYS),
            sum_for_window(daily_rows, "commits", COMPARISON_DAYS, COMPARISON_DAYS),
            "commits",
            [row["commits"] for row in daily_rows],
            "Authored by Murphy across the coordination repo plus project and MCP repos under Research.",
        ),
    ]

    total_human_messages = sum(row["human_messages"] for row in daily_rows)
    total_agent_messages = sum(row["agent_messages"] for row in daily_rows)

    request_mix_rows = []
    mix_total = sum(request_mix.values())
    for category, count in request_mix.most_common():
        request_mix_rows.append(
            {
                "category": category,
                "label": CATEGORY_LABELS[category],
                "count": count,
                "share_pct": round((count / mix_total) * 100.0, 1) if mix_total else 0.0,
            }
        )

    return {
        "title": "Signal Deck",
        "generated_at_utc": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
        "window_days": window_days,
        "comparison_days": COMPARISON_DAYS,
        "summary": {
            "archive_task_count": len(tasks),
            "archive_start_date": archive_start_iso,
            "archive_end_date": archive_end_iso,
            "repos_scanned": len(list_git_repos(research_root)),
            "repos_with_activity": repos_with_activity,
            "human_messages_window": total_human_messages,
            "agent_messages_window": total_agent_messages,
        },
        "coverage": {
            "task_source": ".agent/tasks/finished/*.json",
            "git_source": "Research root + project + MCP repos",
            "token_method": "Estimated from archived visible thread text using a ~4 chars/token heuristic.",
            "known_gap": "Exact billed worker-model token totals are not archived in the finished-task ledger yet.",
            "generator": str(Path("scripts/build_signal_deck.py")),
        },
        "kpis": kpis,
        "daily": daily_rows,
        "request_mix": request_mix_rows,
        "recent_tasks": recent_tasks,
        "repo_totals": repo_totals,
        "notes": [
            "The token series is a visible-thread estimate, not a billing ledger.",
            "Task span runs from the first archived thread message to the last archived thread message.",
            "Code activity counts commits authored by Murphy across git repos under Research.",
            "The route can be regenerated locally with `python3 scripts/build_signal_deck.py` from the project repo root.",
        ],
    }


def main() -> int:
    args = parse_args()
    project_root = args.project_root.resolve()
    research_root = find_research_root(project_root)
    output_path = args.output if args.output.is_absolute() else project_root / args.output
    output_path.parent.mkdir(parents=True, exist_ok=True)

    bundle = build_bundle(project_root=project_root, research_root=research_root, window_days=args.window_days)
    output_path.write_text(json.dumps(bundle, ensure_ascii=False, indent=2) + "\n")
    print(f"Wrote {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
