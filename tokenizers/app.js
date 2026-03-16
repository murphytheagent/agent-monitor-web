import { AutoTokenizer, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';

env.allowLocalModels = false;
env.useBrowserCache = true;

const MODELS = [
  {
    id: 'qwen3.5-4b',
    label: 'Qwen3.5-4B',
    repo: 'Qwen/Qwen3.5-4B',
    familyId: 'qwen',
    family: 'Qwen',
    configuration: 'Qwen 3.5 · 4B',
    template: 'Qwen instruct',
    summary: 'Official Qwen3.5 tokenizer with a long-context chat template and Qwen special tokens visible in prompt mode.',
    caption: 'Public Qwen tokenizer files with the current Qwen3.5 instruct template.',
  },
  {
    id: 'qwen2.5-7b-instruct',
    label: 'Qwen2.5-7B-Instruct',
    repo: 'Qwen/Qwen2.5-7B-Instruct',
    familyId: 'qwen',
    family: 'Qwen',
    configuration: 'Qwen 2.5 · 7B Instruct',
    template: 'Qwen 2.5 instruct',
    summary: 'The previous Qwen instruct generation, useful for checking how Qwen prompt scaffolding shifted before the 3.5 release.',
    caption: 'Public Qwen2.5 instruct tokenizer and chat template from Hugging Face.',
  },
  {
    id: 'deepseek-r1-distill-qwen-7b',
    label: 'DeepSeek-R1-Distill-Qwen-7B',
    repo: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
    familyId: 'deepseek',
    family: 'DeepSeek',
    configuration: 'R1 Distill · Qwen 7B',
    template: 'DeepSeek reasoning',
    summary: 'DeepSeek\'s R1 distilled Qwen variant layers its own reasoning-oriented chat template on top of a Qwen-style tokenizer.',
    caption: 'Public DeepSeek instruct tokenizer files; useful for comparing against the base Qwen family.',
  },
  {
    id: 'mistral-7b-instruct-v0.3',
    label: 'Mistral-7B-Instruct-v0.3',
    repo: 'mistralai/Mistral-7B-Instruct-v0.3',
    familyId: 'mistral',
    family: 'Mistral',
    configuration: '7B Instruct · v0.3',
    template: 'Mistral instruct',
    summary: 'Official Mistral instruct tokenizer with the Llama-style vocabulary and Mistral\'s own serialized dialogue wrapper.',
    caption: 'Public Mistral tokenizer files with the v0.3 instruct template.',
  },
  {
    id: 'phi-3-mini-4k-instruct',
    label: 'Phi-3-mini-4k-instruct',
    repo: 'microsoft/Phi-3-mini-4k-instruct',
    familyId: 'phi',
    family: 'Phi',
    configuration: 'Phi-3 Mini · 4k Instruct',
    template: 'Phi instruct',
    summary: 'Microsoft\'s compact Phi instruct model uses its own chat markers, which makes prompt serialization visibly different from Qwen and Mistral.',
    caption: 'Public Phi-3 tokenizer files with the 4k instruct prompt format.',
  },
  {
    id: 'tinyllama-1.1b-chat-v1.0',
    label: 'TinyLlama-1.1B-Chat-v1.0',
    repo: 'TinyLlama/TinyLlama-1.1B-Chat-v1.0',
    familyId: 'tinyllama',
    family: 'TinyLlama',
    configuration: '1.1B Chat · v1.0',
    template: 'TinyLlama chat',
    summary: 'A lightweight Llama-style chat tokenizer that is easy to compare against larger instruct families while keeping the page fully public.',
    caption: 'Public TinyLlama chat tokenizer files; a compact Llama-style reference point.',
  },
];

const MODEL_MAP = Object.fromEntries(MODELS.map((model) => [model.id, model]));
const FAMILY_MAP = buildFamilyMap(MODELS);
const FAMILIES = Object.values(FAMILY_MAP);

const EXAMPLES = {
  english: 'Tokenizers decide how models see text.\nWatch how punctuation, apostrophes, and repeated stems get segmented.',
  mixed: 'This prompt mixes English, 中文, 日本語, and emoji 😄 in one request. How uneven is the token split across model families?',
  code: 'def tokenize_report(text):\n    pieces = text.split()\n    return {"chars": len(text), "words": len(pieces)}\n',
  emoji: '### Prompt draft\n- Ship the tokenizer lab tonight 🚀\n- Keep whitespace visible\n- Compare plain text vs chat mode ✨',
};

const state = {
  tokenizer: null,
  tokenizerKey: null,
  tokenizerCache: new Map(),
  specialTokenIdCache: new Map(),
  specialTokenIds: new Set(),
  mode: 'plain',
  generationPrompt: true,
  busy: false,
  queued: false,
};

const refs = {};

document.addEventListener('DOMContentLoaded', () => {
  captureRefs();
  populateFamilyOptions();
  populateModelOptions();
  renderModelMeta();
  renderModelLineup();
  bindEvents();
  retokenize();
});

function captureRefs() {
  refs.familySelect = document.getElementById('family-select');
  refs.familyCaption = document.getElementById('family-caption');
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
  refs.heroModelName = document.getElementById('hero-model-name');
  refs.repoChip = document.getElementById('repo-chip');
  refs.repoLabel = document.getElementById('repo-label');
  refs.familyLabel = document.getElementById('family-label');
  refs.configurationLabel = document.getElementById('configuration-label');
  refs.templateLabel = document.getElementById('template-label');
  refs.modelSummary = document.getElementById('model-summary');
  refs.modelCaption = document.getElementById('model-caption');
  refs.modelMetaRepo = document.getElementById('model-meta-repo');
  refs.modelMetaFamily = document.getElementById('model-meta-family');
  refs.modelMetaConfig = document.getElementById('model-meta-config');
  refs.modelMetaTemplate = document.getElementById('model-meta-template');
  refs.modelMetaSummary = document.getElementById('model-meta-summary');
  refs.modelLineup = document.getElementById('model-lineup');
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
  refs.familySelect.addEventListener('change', () => {
    populateModelOptions(false);
    renderModelMeta();
    renderModelLineup();
    retokenize(false);
  });
  refs.modelSelect.addEventListener('change', () => {
    syncFamilySelectionToModel();
    renderModelMeta();
    renderModelLineup();
    retokenize(false);
  });
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

function populateFamilyOptions() {
  refs.familySelect.innerHTML = '';
  FAMILIES.forEach((family) => {
    const option = document.createElement('option');
    option.value = family.id;
    option.textContent = `${family.label} (${family.models.length})`;
    refs.familySelect.append(option);
  });
  refs.familySelect.value = FAMILIES[0]?.id || '';
}

function populateModelOptions(preserveCurrent = true) {
  const previousValue = refs.modelSelect.value;
  const familyModels = modelsForFamily(refs.familySelect.value);
  refs.modelSelect.innerHTML = '';
  familyModels.forEach((model) => {
    const option = document.createElement('option');
    option.value = model.id;
    option.textContent = model.label;
    refs.modelSelect.append(option);
  });

  if (preserveCurrent && familyModels.some((model) => model.id === previousValue)) {
    refs.modelSelect.value = previousValue;
  } else {
    refs.modelSelect.value = familyModels[0]?.id || '';
  }
}

function renderModelMeta() {
  const model = currentModel();
  const family = currentFamily();
  const configurationCount = family.models.length;
  const configurationLabel = configurationCount === 1 ? 'configuration' : 'configurations';

  document.title = `Tokenizer Observatory | ${model.label}`;
  refs.heroModelName.textContent = `${model.label}'s chat template`;
  refs.repoChip.href = `https://huggingface.co/${model.repo}`;
  refs.repoLabel.textContent = model.repo;
  refs.familyLabel.textContent = model.family;
  refs.configurationLabel.textContent = model.configuration;
  refs.templateLabel.textContent = model.template;
  refs.modelSummary.textContent = model.summary;
  refs.familyCaption.textContent = `${family.label} currently exposes ${configurationCount} public ${configurationLabel} in this browser-only build.`;
  refs.modelCaption.textContent = `${model.caption} Gated repos such as Llama and Gemma are excluded from this static build.`;
  refs.modelMetaRepo.href = `https://huggingface.co/${model.repo}`;
  refs.modelMetaRepo.textContent = model.repo;
  refs.modelMetaFamily.textContent = model.family;
  refs.modelMetaConfig.textContent = model.configuration;
  refs.modelMetaTemplate.textContent = model.template;
  refs.modelMetaSummary.textContent = model.summary;
}

function renderModelLineup() {
  refs.modelLineup.innerHTML = '';
  const selected = currentModel().id;
  const fragment = document.createDocumentFragment();
  FAMILIES.forEach((family) => {
    const li = document.createElement('li');
    const familyModels = family.models.map((model) => (
      model.id === selected ? `${model.configuration} (selected)` : model.configuration
    ));
    const label = family.models.length === 1 ? 'config' : 'configs';
    li.textContent = `${family.label} · ${family.models.length} ${label} — ${familyModels.join(', ')}`;
    fragment.append(li);
  });
  refs.modelLineup.append(fragment);
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
  if (!forceReload && state.tokenizerCache.has(model.id)) {
    state.tokenizer = state.tokenizerCache.get(model.id);
    state.tokenizerKey = model.id;
    state.specialTokenIds = state.specialTokenIdCache.get(model.id) || new Set();
    return state.tokenizer;
  }

  setStatus(`Loading · ${model.label}`, `Downloading tokenizer assets for ${model.repo}.`, 'warn');
  const tokenizer = await AutoTokenizer.from_pretrained(model.repo);
  state.tokenizerCache.set(model.id, tokenizer);
  const specialIds = collectSpecialTokenIds(tokenizer);
  state.specialTokenIdCache.set(model.id, specialIds);
  state.tokenizer = tokenizer;
  state.tokenizerKey = model.id;
  state.specialTokenIds = specialIds;
  return tokenizer;
}

async function buildPayload(tokenizer) {
  const rawInput = refs.inputText.value;
  const systemInput = refs.systemText.value;
  const isChat = state.mode === 'chat';

  let serializedPrompt = rawInput;
  let tokenIds = [];

  if (isChat) {
    if (typeof tokenizer.apply_chat_template !== 'function') {
      throw new Error(`${currentModel().label} does not expose a chat template in this browser runtime.`);
    }

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

  const rawTokens = convertIdsToTokens(tokenizer, tokenIds);
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
  refs.modelSelect.disabled = isBusy;
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
  const familyModels = modelsForFamily(refs.familySelect.value);
  return MODEL_MAP[refs.modelSelect.value] || familyModels[0] || MODELS[0];
}

function currentFamily() {
  return FAMILY_MAP[refs.familySelect.value] || FAMILIES[0];
}

function modelsForFamily(familyId) {
  return currentFamilyList(familyId);
}

function currentFamilyList(familyId) {
  return FAMILY_MAP[familyId]?.models || MODELS;
}

function syncFamilySelectionToModel() {
  const model = MODEL_MAP[refs.modelSelect.value];
  if (model && refs.familySelect.value !== model.familyId) {
    refs.familySelect.value = model.familyId;
  }
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

function convertIdsToTokens(tokenizer, tokenIds) {
  if (typeof tokenizer.model?.convert_ids_to_tokens === 'function') {
    return tokenizer.model.convert_ids_to_tokens(tokenIds);
  }
  if (typeof tokenizer.convert_ids_to_tokens === 'function') {
    return tokenIds.map((id) => tokenizer.convert_ids_to_tokens(id));
  }
  return tokenIds.map(() => '');
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

function buildFamilyMap(models) {
  return models.reduce((families, model) => {
    if (!families[model.familyId]) {
      families[model.familyId] = {
        id: model.familyId,
        label: model.family,
        models: [],
      };
    }
    families[model.familyId].models.push(model);
    return families;
  }, {});
}
