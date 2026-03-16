import { AutoTokenizer, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';

env.allowLocalModels = false;
env.useBrowserCache = true;

const MODELS = {
  'qwen3.5-4b': {
    id: 'qwen3.5-4b',
    label: 'Qwen3.5-4B',
    repo: 'Qwen/Qwen3.5-4B',
    releaseDate: '2026-01-01',
  },
};

const EXAMPLES = {
  english: 'Tokenizers decide how models see text.\nWatch how punctuation, apostrophes, and repeated stems get segmented.',
  mixed: 'Qwen3.5 handles English, 中文, 日本語, and emoji 😄 in one prompt. How uneven is the token split?',
  code: 'def tokenize_report(text):\n    pieces = text.split()\n    return {"chars": len(text), "words": len(pieces)}\n',
  emoji: '### Prompt draft\n- Ship the tokenizer lab tonight 🚀\n- Keep whitespace visible\n- Compare plain text vs chat mode ✨',
};

const state = {
  tokenizer: null,
  tokenizerKey: null,
  specialTokenIds: new Set(),
  mode: 'plain',
  generationPrompt: true,
  busy: false,
  queued: false,
};

const refs = {};

document.addEventListener('DOMContentLoaded', () => {
  captureRefs();
  bindEvents();
  retokenize();
});

function captureRefs() {
  refs.modelSelect = document.getElementById('model-select');
  refs.modePlain = document.getElementById('mode-plain');
  refs.modeChat = document.getElementById('mode-chat');
  refs.modelStatus = document.getElementById('model-status');
  refs.statusNote = document.getElementById('status-note');
  refs.inputText = document.getElementById('input-text');
  refs.systemField = document.getElementById('system-field');
  refs.systemText = document.getElementById('system-text');
  refs.generationToggle = document.getElementById('generation-toggle');
  refs.assistantPrefix = document.getElementById('assistant-prefix');
  refs.inputSummary = document.getElementById('input-summary');
  refs.retokenizeButton = document.getElementById('retokenize-button');
  refs.copyIdsButton = document.getElementById('copy-ids-button');
  refs.statTotal = document.getElementById('stat-total');
  refs.statSpecial = document.getElementById('stat-special');
  refs.statUnique = document.getElementById('stat-unique');
  refs.statDensity = document.getElementById('stat-density');
  refs.statDensityNote = document.getElementById('stat-density-note');
  refs.statPrompt = document.getElementById('stat-prompt');
  refs.statMode = document.getElementById('stat-mode');
  refs.tokenStream = document.getElementById('token-stream');
  refs.serializedPrompt = document.getElementById('serialized-prompt');
  refs.tokenIds = document.getElementById('token-ids');
  refs.tokenTable = document.getElementById('token-table');
}

function bindEvents() {
  refs.modelSelect.addEventListener('change', () => retokenize(true));
  refs.inputText.addEventListener('input', scheduleRetokenize);
  refs.systemText.addEventListener('input', scheduleRetokenize);
  refs.assistantPrefix.addEventListener('change', () => {
    state.generationPrompt = refs.assistantPrefix.checked;
    scheduleRetokenize();
  });
  refs.retokenizeButton.addEventListener('click', () => retokenize(true));
  refs.copyIdsButton.addEventListener('click', copyTokenIds);

  for (const button of [refs.modePlain, refs.modeChat]) {
    button.addEventListener('click', () => {
      setMode(button.dataset.mode);
      scheduleRetokenize();
    });
  }

  for (const button of document.querySelectorAll('[data-example]')) {
    button.addEventListener('click', () => {
      refs.inputText.value = EXAMPLES[button.dataset.example] || refs.inputText.value;
      scheduleRetokenize();
    });
  }
}

let debounceTimer = null;
function scheduleRetokenize() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => retokenize(false), 160);
}

function setMode(mode) {
  state.mode = mode;
  const plain = mode === 'plain';
  refs.modePlain.classList.toggle('active', plain);
  refs.modePlain.setAttribute('aria-selected', String(plain));
  refs.modeChat.classList.toggle('active', !plain);
  refs.modeChat.setAttribute('aria-selected', String(!plain));
  refs.systemField.classList.toggle('hidden', plain);
  refs.generationToggle.classList.toggle('hidden', plain);
}

async function retokenize(forceReload = false) {
  if (state.busy) {
    state.queued = true;
    return;
  }

  state.busy = true;
  setBusyUi(true);

  try {
    const tokenizer = await ensureTokenizer(forceReload);
    const payload = await buildPayload(tokenizer);
    renderPayload(payload);
    setStatus(`Ready · ${currentModel().label}`, 'Tokenizer cached in the browser for faster follow-up edits.', 'ok');
  } catch (error) {
    console.error(error);
    renderError(error);
    setStatus('Tokenizer load failed', error.message || 'Unknown error', 'error');
  } finally {
    state.busy = false;
    setBusyUi(false);
    if (state.queued) {
      state.queued = false;
      queueMicrotask(() => retokenize(false));
    }
  }
}

async function ensureTokenizer(forceReload = false) {
  const model = currentModel();
  if (!forceReload && state.tokenizer && state.tokenizerKey === model.id) {
    return state.tokenizer;
  }

  setStatus(`Loading · ${model.label}`, `Downloading tokenizer assets for ${model.repo}.`, 'warn');
  const tokenizer = await AutoTokenizer.from_pretrained(model.repo);
  state.tokenizer = tokenizer;
  state.tokenizerKey = model.id;
  state.specialTokenIds = collectSpecialTokenIds(tokenizer);
  return tokenizer;
}

async function buildPayload(tokenizer) {
  const rawInput = refs.inputText.value;
  const systemInput = refs.systemText.value;
  const isChat = state.mode === 'chat';

  let serializedPrompt = rawInput;
  let tokenIds = [];

  if (isChat) {
    const messages = [];
    if (systemInput.trim()) {
      messages.push({ role: 'system', content: systemInput.trim() });
    }
    messages.push({ role: 'user', content: rawInput });

    serializedPrompt = tokenizer.apply_chat_template(messages, {
      tokenize: false,
      add_generation_prompt: state.generationPrompt,
    });

    tokenIds = normalizeIds(tokenizer.apply_chat_template(messages, {
      tokenize: true,
      return_tensor: false,
      add_generation_prompt: state.generationPrompt,
    }));
  } else {
    const encoded = await tokenizer(rawInput, {
      add_special_tokens: false,
    });
    tokenIds = normalizeIds(encoded.input_ids);
  }

  const rawTokens = tokenizer.model.convert_ids_to_tokens(tokenIds);
  const decodedPieces = await Promise.all(
    tokenIds.map((id) => tokenizer.decode([id], { skip_special_tokens: false })),
  );

  const rows = tokenIds.map((id, index) => {
    const special = state.specialTokenIds.has(Number(id));
    const rawToken = rawTokens[index] ?? '';
    const decoded = decodedPieces[index] ?? '';
    const display = chooseDisplayPiece(decoded, rawToken, special);
    return {
      index,
      id: Number(id),
      rawToken,
      decoded,
      display,
      special,
    };
  });

  const specialCount = rows.filter((row) => row.special).length;
  const uniqueCount = new Set(rows.map((row) => row.id)).size;
  const promptLength = serializedPrompt.length;
  const density = rows.length ? promptLength / rows.length : 0;

  return {
    rawInput,
    serializedPrompt,
    rows,
    summary: {
      total: rows.length,
      specialCount,
      uniqueCount,
      density,
      promptLength,
      modeLabel: isChat ? 'Chat template mode' : 'Plain text mode',
    },
  };
}

function renderPayload(payload) {
  refs.inputSummary.textContent = `${payload.rawInput.length} input chars → ${payload.summary.total} tokens`;
  refs.statTotal.textContent = formatInteger(payload.summary.total);
  refs.statSpecial.textContent = `${formatInteger(payload.summary.specialCount)} special tokens`;
  refs.statUnique.textContent = formatInteger(payload.summary.uniqueCount);
  refs.statDensity.textContent = payload.summary.total ? payload.summary.density.toFixed(2) : '0.00';
  refs.statDensityNote.textContent = state.mode === 'chat'
    ? 'Serialized chat prompt length divided by resulting token count.'
    : 'Input length divided by resulting token count.';
  refs.statPrompt.textContent = formatInteger(payload.summary.promptLength);
  refs.statMode.textContent = payload.summary.modeLabel;

  refs.serializedPrompt.textContent = payload.serializedPrompt || '(empty prompt)';
  refs.tokenIds.textContent = payload.rows.length
    ? payload.rows.map((row) => row.id).join(', ')
    : '(no tokens)';

  renderTokenStream(payload.rows);
  renderTable(payload.rows);
}

function renderTokenStream(rows) {
  refs.tokenStream.innerHTML = '';

  if (!rows.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'No tokens to display yet. Start typing above.';
    refs.tokenStream.append(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  rows.forEach((row, index) => {
    const token = document.createElement('article');
    token.className = `token-pill${row.special ? ' special' : ''}`;
    token.style.setProperty('--token-rgb', tokenColor(index));

    const position = document.createElement('div');
    position.className = 'token-pos';
    position.textContent = `#${row.index}`;

    const piece = document.createElement('div');
    piece.className = 'token-piece';
    piece.textContent = visualTokenPiece(row.display);

    const id = document.createElement('div');
    id.className = 'token-id';
    id.textContent = `${row.id}${row.special ? ' · special' : ''}`;

    token.append(position, piece, id);
    fragment.append(token);
  });

  refs.tokenStream.append(fragment);
}

function renderTable(rows) {
  refs.tokenTable.innerHTML = '';

  if (!rows.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 5;
    td.className = 'empty-state';
    td.textContent = 'No token rows yet.';
    tr.append(td);
    refs.tokenTable.append(tr);
    return;
  }

  const fragment = document.createDocumentFragment();
  rows.forEach((row) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="mono">${row.index}</td>
      <td class="mono">${row.id}</td>
      <td><span class="code-chip">${escapeHtml(visualTokenPiece(row.display))}</span></td>
      <td><span class="code-chip">${escapeHtml(visualTokenPiece(row.rawToken || ''))}</span></td>
      <td>${row.special ? 'special' : 'regular'}</td>
    `;
    fragment.append(tr);
  });
  refs.tokenTable.append(fragment);
}

function renderError(error) {
  refs.inputSummary.textContent = 'Tokenizer failed to load.';
  refs.statTotal.textContent = '0';
  refs.statSpecial.textContent = '0 special tokens';
  refs.statUnique.textContent = '0';
  refs.statDensity.textContent = '0.00';
  refs.statDensityNote.textContent = state.mode === 'chat'
    ? 'Serialized chat prompt length divided by resulting token count.'
    : 'Input length divided by resulting token count.';
  refs.statPrompt.textContent = '0';
  refs.statMode.textContent = state.mode === 'chat' ? 'Chat template mode' : 'Plain text mode';
  refs.serializedPrompt.textContent = error.message || String(error);
  refs.tokenIds.textContent = '(unavailable)';
  refs.tokenStream.innerHTML = '<p class="empty-state">The tokenizer did not load. Open the browser console for the precise stack trace.</p>';
  refs.tokenTable.innerHTML = '';
}

function setBusyUi(isBusy) {
  refs.retokenizeButton.disabled = isBusy;
  refs.copyIdsButton.disabled = isBusy;
}

function setStatus(title, note, tone) {
  refs.modelStatus.textContent = title;
  refs.modelStatus.classList.remove('warn', 'error');
  if (tone === 'warn') {
    refs.modelStatus.classList.add('warn');
  } else if (tone === 'error') {
    refs.modelStatus.classList.add('error');
  }
  refs.statusNote.textContent = note;
}

function currentModel() {
  return MODELS[refs.modelSelect.value];
}

function normalizeIds(value) {
  if (value == null) {
    return [];
  }
  if (Array.isArray(value)) {
    if (value.length && Array.isArray(value[0])) {
      return value.flatMap(normalizeIds);
    }
    return value.map(normalizeNumber).filter(Number.isFinite);
  }
  if (typeof value === 'object') {
    if (typeof value.tolist === 'function') {
      return normalizeIds(value.tolist());
    }
    if ('data' in value) {
      return Array.from(value.data, normalizeNumber).filter(Number.isFinite);
    }
    if ('input_ids' in value) {
      return normalizeIds(value.input_ids);
    }
  }
  return [];
}

function normalizeNumber(value) {
  return Number(typeof value === 'bigint' ? value : value);
}

function collectSpecialTokenIds(tokenizer) {
  const ids = new Set();

  if (Array.isArray(tokenizer.all_special_ids)) {
    tokenizer.all_special_ids.forEach((id) => ids.add(Number(id)));
    return ids;
  }

  const candidates = flattenSpecialValues(tokenizer.special_tokens_map || {});
  candidates.forEach((token) => {
    const resolved = tokenizer.convert_tokens_to_ids(token);
    if (resolved != null && resolved !== tokenizer.unk_token_id) {
      ids.add(Number(resolved));
    }
  });
  return ids;
}

function flattenSpecialValues(value) {
  if (Array.isArray(value)) {
    return value.flatMap(flattenSpecialValues);
  }
  if (value && typeof value === 'object') {
    if (typeof value.content === 'string') {
      return [value.content];
    }
    return Object.values(value).flatMap(flattenSpecialValues);
  }
  return typeof value === 'string' ? [value] : [];
}

function tokenColor(index) {
  const hue = (index * 37) % 360;
  const saturation = 68;
  const lightness = index % 3 === 0 ? 62 : 56;
  const [r, g, b] = hslToRgb(hue, saturation, lightness);
  return `${r}, ${g}, ${b}`;
}

function hslToRgb(h, s, l) {
  const sat = s / 100;
  const light = l / 100;
  const c = (1 - Math.abs(2 * light - 1)) * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = light - c / 2;

  let rgb = [0, 0, 0];
  if (h < 60) rgb = [c, x, 0];
  else if (h < 120) rgb = [x, c, 0];
  else if (h < 180) rgb = [0, c, x];
  else if (h < 240) rgb = [0, x, c];
  else if (h < 300) rgb = [x, 0, c];
  else rgb = [c, 0, x];

  return rgb.map((channel) => Math.round((channel + m) * 255));
}

function chooseDisplayPiece(decoded, rawToken, special) {
  if (special) {
    return rawToken || decoded || '';
  }
  if (!decoded) {
    return rawToken || '';
  }
  if (decoded.includes('\ufffd')) {
    return rawToken || decoded;
  }
  return decoded;
}

function visualTokenPiece(text) {
  if (!text) {
    return '∅';
  }
  return text
    .replace(/ /g, '·')
    .replace(/\n/g, '↵\n')
    .replace(/\t/g, '⇥')
    .replace(/\r/g, '␍');
}

async function copyTokenIds() {
  const text = refs.tokenIds.textContent.trim();
  if (!text || text === '(no tokens)' || text === '(unavailable)') {
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    const original = refs.copyIdsButton.textContent;
    refs.copyIdsButton.textContent = 'Copied';
    setTimeout(() => {
      refs.copyIdsButton.textContent = original;
    }, 1200);
  } catch (error) {
    console.error('Failed to copy token IDs', error);
  }
}

function formatInteger(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
