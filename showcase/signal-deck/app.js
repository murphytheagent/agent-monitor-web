const EMBED_MODE = new URLSearchParams(window.location.search).get("embed") === "showcase";

const CATEGORY_STYLES = {
  maintenance: { label: "Maintenance", color: "#72ffe0" },
  review: { label: "Review", color: "#ffe66a" },
  website: { label: "Website", color: "#38f0ff" },
  research: { label: "Research", color: "#ff2fb3" },
  ops: { label: "Ops", color: "#9ab7ff" },
  debug: { label: "Debug", color: "#ff6689" },
  docs: { label: "Docs", color: "#f7aef8" },
  experiments: { label: "Experiments", color: "#4dffb4" },
  other: { label: "Other", color: "#9fb1d8" },
};

const numberFmt = new Intl.NumberFormat("en-US");
const compactFmt = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function formatValue(value, unit) {
  if (unit === "tokens") {
    return compactFmt.format(value);
  }
  if (unit === "minutes") {
    if (value >= 60) {
      return `${(value / 60).toFixed(1)}h`;
    }
    return `${Math.round(value)}m`;
  }
  return numberFmt.format(Math.round(value));
}

function deltaClass(deltaPct) {
  return deltaPct < 0 ? "metric-delta down" : "metric-delta";
}

function deltaText(deltaPct) {
  const sign = deltaPct > 0 ? "+" : "";
  return `${sign}${deltaPct.toFixed(1)}%`;
}

function movingAverage(values, size) {
  return values.map((_, index) => {
    const start = Math.max(0, index - size + 1);
    const slice = values.slice(start, index + 1);
    return slice.reduce((sum, value) => sum + value, 0) / slice.length;
  });
}

function buildLinePath(points) {
  if (!points.length) {
    return "";
  }
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point[0].toFixed(2)} ${point[1].toFixed(2)}`).join(" ");
}

function buildAreaPath(upper, lower) {
  if (!upper.length || !lower.length) {
    return "";
  }
  const forward = upper.map((point, index) => `${index === 0 ? "M" : "L"} ${point[0].toFixed(2)} ${point[1].toFixed(2)}`).join(" ");
  const backward = lower
    .slice()
    .reverse()
    .map((point) => `L ${point[0].toFixed(2)} ${point[1].toFixed(2)}`)
    .join(" ");
  return `${forward} ${backward} Z`;
}

function scaleSeries(values, innerHeight, top, maxValue) {
  return values.map((value) => top + innerHeight - (maxValue === 0 ? 0 : (value / maxValue) * innerHeight));
}

function chartFrame({ width = 960, height = 280, padding = { top: 16, right: 18, bottom: 34, left: 18 } } = {}) {
  return {
    width,
    height,
    innerWidth: width - padding.left - padding.right,
    innerHeight: height - padding.top - padding.bottom,
    padding,
  };
}

function renderSparkline(values, color) {
  const frame = chartFrame({ width: 160, height: 48, padding: { top: 6, right: 4, bottom: 6, left: 4 } });
  const maxValue = Math.max(...values, 1);
  const minValue = Math.min(...values, 0);
  const range = Math.max(1, maxValue - minValue);
  const step = values.length > 1 ? frame.innerWidth / (values.length - 1) : 0;
  const points = values.map((value, index) => {
    const x = frame.padding.left + index * step;
    const y = frame.padding.top + frame.innerHeight - ((value - minValue) / range) * frame.innerHeight;
    return [x, y];
  });
  const path = buildLinePath(points);
  return `
    <svg viewBox="0 0 ${frame.width} ${frame.height}" aria-hidden="true">
      <defs>
        <linearGradient id="spark-fill-${color.replace(/[^a-z0-9]/gi, "")}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.4"></stop>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"></stop>
        </linearGradient>
      </defs>
      <path d="${buildAreaPath(points, points.map(([x]) => [x, frame.height - 6]))}" fill="url(#spark-fill-${color.replace(/[^a-z0-9]/gi, "")})"></path>
      <path d="${path}" fill="none" stroke="${color}" stroke-width="2.4"></path>
    </svg>
  `;
}

function renderMetricCards(data) {
  const colors = ["#38f0ff", "#ff2fb3", "#4dffb4", "#ffe66a"];
  return data.kpis
    .map((kpi, index) => {
      const value = formatValue(kpi.value, kpi.unit);
      return `
        <article class="metric-card">
          <div class="metric-head">
            <span class="metric-label">${kpi.label}</span>
            <span class="${deltaClass(kpi.delta_pct)}">${deltaText(kpi.delta_pct)}</span>
          </div>
          <div class="metric-value">${value}</div>
          <p class="metric-note">${kpi.note}</p>
          <div class="metric-sparkline">${renderSparkline(kpi.trend, colors[index % colors.length])}</div>
        </article>
      `;
    })
    .join("");
}

function xTickLabels(dates, count) {
  if (!dates.length) {
    return [];
  }
  const step = Math.max(1, Math.floor(dates.length / count));
  const labels = [];
  for (let index = 0; index < dates.length; index += step) {
    labels.push(index);
  }
  if (labels[labels.length - 1] !== dates.length - 1) {
    labels.push(dates.length - 1);
  }
  return labels;
}

function dateLabel(dateText) {
  const parts = dateText.split("-");
  return `${parts[1]}/${parts[2]}`;
}

function renderTaskChart(rows) {
  const frame = chartFrame({ height: 300, padding: { top: 20, right: 18, bottom: 36, left: 18 } });
  const values = rows.map((row) => row.tasks_completed);
  const averages = movingAverage(values, 7);
  const maxValue = Math.max(...values, ...averages, 1);
  const step = frame.innerWidth / rows.length;
  const barWidth = Math.max(6, step * 0.64);
  const lineYs = scaleSeries(averages, frame.innerHeight, frame.padding.top, maxValue);
  const linePoints = rows.map((row, index) => [frame.padding.left + index * step + step / 2, lineYs[index]]);
  const ticks = xTickLabels(rows.map((row) => row.date), 5);

  const bars = rows
    .map((row, index) => {
      const height = (row.tasks_completed / maxValue) * frame.innerHeight;
      const x = frame.padding.left + index * step + (step - barWidth) / 2;
      const y = frame.padding.top + frame.innerHeight - height;
      return `
        <g>
          <rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${barWidth.toFixed(2)}" height="${Math.max(height, 1).toFixed(2)}" fill="rgba(56, 240, 255, 0.7)"></rect>
          <title>${row.date}: ${row.tasks_completed} tasks</title>
        </g>
      `;
    })
    .join("");

  const grid = [0.25, 0.5, 0.75, 1]
    .map((fraction) => {
      const y = frame.padding.top + frame.innerHeight - fraction * frame.innerHeight;
      return `<line x1="${frame.padding.left}" y1="${y.toFixed(2)}" x2="${frame.width - frame.padding.right}" y2="${y.toFixed(2)}" stroke="rgba(56,240,255,0.12)" stroke-width="1"></line>`;
    })
    .join("");

  const tickLabels = ticks
    .map((index) => {
      const x = frame.padding.left + index * step + step / 2;
      return `<text x="${x.toFixed(2)}" y="${frame.height - 12}" fill="rgba(159,177,216,0.92)" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">${dateLabel(rows[index].date)}</text>`;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${frame.width} ${frame.height}" role="img" aria-label="Daily completed tasks">
      ${grid}
      <line x1="${frame.padding.left}" y1="${frame.padding.top + frame.innerHeight}" x2="${frame.width - frame.padding.right}" y2="${frame.padding.top + frame.innerHeight}" stroke="rgba(56,240,255,0.26)" stroke-width="1"></line>
      ${bars}
      <path d="${buildLinePath(linePoints)}" fill="none" stroke="#ff2fb3" stroke-width="2.6"></path>
      ${tickLabels}
    </svg>
  `;
}

function renderSpanChart(rows) {
  const frame = chartFrame({ height: 300, padding: { top: 20, right: 18, bottom: 36, left: 18 } });
  const medians = rows.map((row) => row.median_span_minutes || 0);
  const lows = rows.map((row) => row.p25_span_minutes || 0);
  const highs = rows.map((row) => row.p75_span_minutes || 0);
  const maxValue = Math.max(...highs, ...medians, 1);
  const step = rows.length > 1 ? frame.innerWidth / (rows.length - 1) : frame.innerWidth;
  const medianYs = scaleSeries(medians, frame.innerHeight, frame.padding.top, maxValue);
  const lowYs = scaleSeries(lows, frame.innerHeight, frame.padding.top, maxValue);
  const highYs = scaleSeries(highs, frame.innerHeight, frame.padding.top, maxValue);
  const medianPoints = rows.map((row, index) => [frame.padding.left + index * step, medianYs[index]]);
  const lowPoints = rows.map((row, index) => [frame.padding.left + index * step, lowYs[index]]);
  const highPoints = rows.map((row, index) => [frame.padding.left + index * step, highYs[index]]);
  const ticks = xTickLabels(rows.map((row) => row.date), 5);

  const circles = rows
    .filter((row) => row.median_span_minutes)
    .map((row, index) => {
      const x = frame.padding.left + index * step;
      const y = medianYs[index];
      return `
        <circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="3" fill="#4dffb4">
          <title>${row.date}: median ${formatValue(row.median_span_minutes, "minutes")}</title>
        </circle>
      `;
    })
    .join("");

  const tickLabels = ticks
    .map((index) => {
      const x = frame.padding.left + index * step;
      return `<text x="${x.toFixed(2)}" y="${frame.height - 12}" fill="rgba(159,177,216,0.92)" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">${dateLabel(rows[index].date)}</text>`;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${frame.width} ${frame.height}" role="img" aria-label="Median task span">
      <path d="${buildAreaPath(highPoints, lowPoints)}" fill="rgba(77,255,180,0.14)"></path>
      <path d="${buildLinePath(medianPoints)}" fill="none" stroke="#4dffb4" stroke-width="2.8"></path>
      ${circles}
      ${tickLabels}
    </svg>
  `;
}

function renderTokenChart(rows) {
  const frame = chartFrame({ height: 300, padding: { top: 20, right: 18, bottom: 36, left: 18 } });
  const totals = rows.map((row) => row.human_tokens_est + row.agent_tokens_est);
  const maxValue = Math.max(...totals, 1);
  const step = frame.innerWidth / rows.length;
  const barWidth = Math.max(6, step * 0.64);
  const ticks = xTickLabels(rows.map((row) => row.date), 5);

  const bars = rows
    .map((row, index) => {
      const x = frame.padding.left + index * step + (step - barWidth) / 2;
      const humanHeight = (row.human_tokens_est / maxValue) * frame.innerHeight;
      const agentHeight = (row.agent_tokens_est / maxValue) * frame.innerHeight;
      const agentY = frame.padding.top + frame.innerHeight - agentHeight;
      const humanY = agentY - humanHeight;
      return `
        <g>
          <rect x="${x.toFixed(2)}" y="${agentY.toFixed(2)}" width="${barWidth.toFixed(2)}" height="${Math.max(agentHeight, 1).toFixed(2)}" fill="rgba(255, 47, 179, 0.72)"></rect>
          <rect x="${x.toFixed(2)}" y="${humanY.toFixed(2)}" width="${barWidth.toFixed(2)}" height="${Math.max(humanHeight, 1).toFixed(2)}" fill="rgba(56, 240, 255, 0.76)"></rect>
          <title>${row.date}: ${compactFmt.format(row.human_tokens_est + row.agent_tokens_est)} estimated tokens</title>
        </g>
      `;
    })
    .join("");

  const tickLabels = ticks
    .map((index) => {
      const x = frame.padding.left + index * step + step / 2;
      return `<text x="${x.toFixed(2)}" y="${frame.height - 12}" fill="rgba(159,177,216,0.92)" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">${dateLabel(rows[index].date)}</text>`;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${frame.width} ${frame.height}" role="img" aria-label="Estimated thread tokens">
      <line x1="${frame.padding.left}" y1="${frame.padding.top + frame.innerHeight}" x2="${frame.width - frame.padding.right}" y2="${frame.padding.top + frame.innerHeight}" stroke="rgba(56,240,255,0.26)" stroke-width="1"></line>
      ${bars}
      ${tickLabels}
    </svg>
  `;
}

function renderRequestMix(rows) {
  const maxCount = Math.max(...rows.map((row) => row.count), 1);
  return rows
    .map((row) => {
      const style = CATEGORY_STYLES[row.category] || CATEGORY_STYLES.other;
      const width = (row.count / maxCount) * 100;
      return `
        <div class="mix-row">
          <strong style="color:${style.color}">${row.label}</strong>
          <div class="mix-track">
            <div class="mix-fill" style="width:${width.toFixed(1)}%; background:linear-gradient(90deg, ${style.color} 0%, rgba(255,255,255,0.16) 100%)"></div>
          </div>
          <span class="mix-meta">${row.count} · ${row.share_pct}%</span>
        </div>
      `;
    })
    .join("");
}

function renderCodeChart(rows) {
  const frame = chartFrame({ height: 340, padding: { top: 30, right: 18, bottom: 36, left: 18 } });
  const extremes = rows.map((row) => Math.max(row.lines_added, row.lines_deleted));
  const maxValue = Math.max(...extremes, 1);
  const step = frame.innerWidth / rows.length;
  const barWidth = Math.max(5, step * 0.56);
  const centerY = frame.padding.top + frame.innerHeight / 2;
  const ticks = xTickLabels(rows.map((row) => row.date), 5);

  const bars = rows
    .map((row, index) => {
      const x = frame.padding.left + index * step + (step - barWidth) / 2;
      const addHeight = (row.lines_added / maxValue) * (frame.innerHeight / 2 - 8);
      const deleteHeight = (row.lines_deleted / maxValue) * (frame.innerHeight / 2 - 8);
      const commitY = frame.padding.top - 10 + Math.min(8, row.commits * 1.5);
      return `
        <g>
          <rect x="${x.toFixed(2)}" y="${(centerY - addHeight).toFixed(2)}" width="${barWidth.toFixed(2)}" height="${Math.max(addHeight, row.lines_added ? 1 : 0).toFixed(2)}" fill="rgba(77, 255, 180, 0.76)"></rect>
          <rect x="${x.toFixed(2)}" y="${centerY.toFixed(2)}" width="${barWidth.toFixed(2)}" height="${Math.max(deleteHeight, row.lines_deleted ? 1 : 0).toFixed(2)}" fill="rgba(255, 102, 137, 0.78)"></rect>
          ${row.commits ? `<circle cx="${(x + barWidth / 2).toFixed(2)}" cy="${commitY.toFixed(2)}" r="${Math.min(5, 2 + row.commits * 0.6).toFixed(2)}" fill="rgba(255, 230, 106, 0.92)"></circle>` : ""}
          <title>${row.date}: ${row.commits} commits, +${row.lines_added} / -${row.lines_deleted}</title>
        </g>
      `;
    })
    .join("");

  const tickLabels = ticks
    .map((index) => {
      const x = frame.padding.left + index * step + step / 2;
      return `<text x="${x.toFixed(2)}" y="${frame.height - 12}" fill="rgba(159,177,216,0.92)" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">${dateLabel(rows[index].date)}</text>`;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${frame.width} ${frame.height}" role="img" aria-label="Daily code churn">
      <line x1="${frame.padding.left}" y1="${centerY.toFixed(2)}" x2="${frame.width - frame.padding.right}" y2="${centerY.toFixed(2)}" stroke="rgba(56,240,255,0.28)" stroke-width="1.2"></line>
      ${bars}
      ${tickLabels}
    </svg>
  `;
}

function renderTaskCloud(tasks) {
  const frame = chartFrame({ height: 340, padding: { top: 20, right: 20, bottom: 38, left: 22 } });
  const maxTokens = Math.max(...tasks.map((task) => task.thread_tokens_est), 1);
  const maxSpan = Math.max(...tasks.map((task) => task.span_minutes), 1);
  const points = tasks.map((task) => {
    const x = frame.padding.left + (task.thread_tokens_est / maxTokens) * frame.innerWidth;
    const y = frame.padding.top + frame.innerHeight - (task.span_minutes / maxSpan) * frame.innerHeight;
    const color = (CATEGORY_STYLES[task.category] || CATEGORY_STYLES.other).color;
    const radius = Math.max(4, Math.min(12, 3 + task.message_count * 0.4));
    return { x, y, color, radius, task };
  });

  const circles = points
    .map(
      ({ x, y, color, radius, task }) => `
        <circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${radius.toFixed(2)}" fill="${color}" fill-opacity="0.74" stroke="rgba(5,9,19,0.96)" stroke-width="1.2">
          <title>${task.completed_at_utc} · ${task.category_label}
${task.preview}
${numberFmt.format(task.thread_tokens_est)} est tokens · ${formatValue(task.span_minutes, "minutes")}</title>
        </circle>
      `,
    )
    .join("");

  return `
    <svg viewBox="0 0 ${frame.width} ${frame.height}" role="img" aria-label="Recent task cloud">
      <line x1="${frame.padding.left}" y1="${frame.padding.top + frame.innerHeight}" x2="${frame.width - frame.padding.right}" y2="${frame.padding.top + frame.innerHeight}" stroke="rgba(56,240,255,0.28)" stroke-width="1"></line>
      <line x1="${frame.padding.left}" y1="${frame.padding.top}" x2="${frame.padding.left}" y2="${frame.padding.top + frame.innerHeight}" stroke="rgba(56,240,255,0.28)" stroke-width="1"></line>
      ${circles}
      <text x="${frame.width - frame.padding.right}" y="${frame.height - 12}" fill="rgba(159,177,216,0.92)" font-size="11" text-anchor="end" font-family="JetBrains Mono, monospace">more thread tokens</text>
      <text x="${frame.padding.left}" y="${frame.padding.top + 10}" fill="rgba(159,177,216,0.92)" font-size="11" text-anchor="start" font-family="JetBrains Mono, monospace">longer span</text>
    </svg>
  `;
}

function populateHeader(data) {
  const coverage = data.coverage;
  const summary = data.summary;
  document.getElementById("window-note").textContent = `${data.window_days}-day rolling window with ${data.comparison_days}-day delta cards`;
  document.getElementById("generated-note").textContent = data.generated_at_utc;
  document.getElementById("coverage-note").textContent = coverage.known_gap;
  document.getElementById("archive-count").textContent = `${numberFmt.format(summary.archive_task_count)} archived tasks`;
  document.getElementById("message-count").textContent = `${numberFmt.format(summary.human_messages_window + summary.agent_messages_window)} window messages`;
  document.getElementById("repo-count").textContent = `${summary.repos_with_activity}/${summary.repos_scanned} repos active`;
}

function populateLists(data) {
  document.getElementById("request-mix").innerHTML = renderRequestMix(data.request_mix);
  document.getElementById("method-list").innerHTML = data.notes.map((note) => `<li>${note}</li>`).join("");
  document.getElementById("repo-list").innerHTML = data.repo_totals
    .slice(0, 5)
    .map(
      (repo) => `
        <li>
          <strong>${repo.repo}</strong>
          <p>${repo.commits} commits · +${numberFmt.format(repo.lines_added)} / -${numberFmt.format(repo.lines_deleted)}</p>
        </li>
      `,
    )
    .join("");
}

function reportEmbedHeight() {
  if (!EMBED_MODE) {
    return;
  }
  const height = document.documentElement.scrollHeight;
  window.parent.postMessage({ type: "signal-deck-embed-height", height }, window.location.origin);
}

async function main() {
  const response = await fetch("./telemetry.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load telemetry.json (${response.status})`);
  }

  const data = await response.json();
  if (EMBED_MODE) {
    document.body.classList.add("embed-mode");
  }

  populateHeader(data);
  document.getElementById("kpi-grid").innerHTML = renderMetricCards(data);
  document.getElementById("tasks-chart").innerHTML = renderTaskChart(data.daily);
  document.getElementById("span-chart").innerHTML = renderSpanChart(data.daily);
  document.getElementById("token-chart").innerHTML = renderTokenChart(data.daily);
  document.getElementById("code-chart").innerHTML = renderCodeChart(data.daily);
  document.getElementById("task-cloud").innerHTML = renderTaskCloud(data.recent_tasks);
  populateLists(data);
  reportEmbedHeight();

  if (document.fonts?.ready) {
    document.fonts.ready.then(reportEmbedHeight).catch(() => {});
  }
}

main().catch((error) => {
  console.error("Signal Deck failed to render", error);
  document.getElementById("coverage-note").textContent = "Telemetry bundle failed to load.";
});

window.addEventListener("resize", reportEmbedHeight);
