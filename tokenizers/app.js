import { AutoTokenizer, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';

env.allowLocalModels = false;
env.useBrowserCache = true;

const LINE_CATALOG = [
  {
    id: 'qwen',
    label: 'Qwen',
    lineSummary: 'Qwen 2.5, Qwen 3, and Qwen 3.5 are grouped here as successive generations of one Chinese model line. The vocabulary badge below is family-specific: Qwen 2.5 sizes share one tokenizer, Qwen 3 sizes share another, and Qwen 3.5 currently stands alone in this browser build.',
    lineCaption: 'This line groups successive Qwen generations under one umbrella before you pick a concrete size.',
    families: [
      {
        id: 'qwen35',
        label: 'Qwen 3.5',
        vocabStatus: 'single',
        vocabBadge: 'Single public configuration',
        vocabSummary: 'Qwen 3.5 currently contributes one browser-fetchable public checkpoint here, so there is no sibling tokenizer comparison inside the family yet.',
        vocabCaption: 'Qwen 3.5 is represented by a single public configuration in this static build.',
        models: [
          {
            id: 'qwen3.5-4b',
            label: 'Qwen3.5-4B',
            repo: 'Qwen/Qwen3.5-4B',
            configuration: '4B',
            template: 'Qwen 3.5 instruct',
            summary: 'The original anchor for this page: a public Qwen 3.5 checkpoint with the newer Qwen instruct serialization.',
            caption: 'Public Qwen 3.5 tokenizer files and chat template.',
          },
        ],
      },
      {
        id: 'qwen3',
        label: 'Qwen 3',
        vocabStatus: 'exact',
        vocabBadge: 'Exact shared vocabulary',
        vocabSummary: 'The listed Qwen 3 checkpoints resolve to the same public tokenizer.json, so changing model size here does not change the vocabulary or token IDs.',
        vocabCaption: 'All listed Qwen 3 configurations point to the same tokenizer.json.',
        models: [
          {
            id: 'qwen3-0.6b',
            label: 'Qwen3-0.6B',
            repo: 'Qwen/Qwen3-0.6B',
            configuration: '0.6B',
            template: 'Qwen 3 instruct',
            summary: 'Smallest public Qwen 3 checkpoint in the catalog, useful for seeing the shared Qwen 3 vocabulary at the lightest scale.',
            caption: 'Public Qwen 3 tokenizer files for the 0.6B checkpoint.',
          },
          {
            id: 'qwen3-4b',
            label: 'Qwen3-4B',
            repo: 'Qwen/Qwen3-4B',
            configuration: '4B',
            template: 'Qwen 3 instruct',
            summary: 'Mid-sized Qwen 3 checkpoint that keeps the same tokenizer surface as the other listed Qwen 3 sizes.',
            caption: 'Public Qwen 3 tokenizer files for the 4B checkpoint.',
          },
          {
            id: 'qwen3-8b',
            label: 'Qwen3-8B',
            repo: 'Qwen/Qwen3-8B',
            configuration: '8B',
            template: 'Qwen 3 instruct',
            summary: 'Larger Qwen 3 checkpoint that shares token IDs with the smaller Qwen 3 sizes in this catalog.',
            caption: 'Public Qwen 3 tokenizer files for the 8B checkpoint.',
          },
        ],
      },
      {
        id: 'qwen25',
        label: 'Qwen 2.5',
        vocabStatus: 'exact',
        vocabBadge: 'Exact shared vocabulary',
        vocabSummary: 'The listed Qwen 2.5 instruct checkpoints resolve to the same public tokenizer.json, so token IDs stay aligned across the 1.5B, 7B, and 14B releases.',
        vocabCaption: 'All listed Qwen 2.5 configurations point to the same tokenizer.json.',
        models: [
          {
            id: 'qwen2.5-1.5b-instruct',
            label: 'Qwen2.5-1.5B-Instruct',
            repo: 'Qwen/Qwen2.5-1.5B-Instruct',
            configuration: '1.5B Instruct',
            template: 'Qwen 2.5 instruct',
            summary: 'Compact Qwen 2.5 instruct checkpoint with the same vocabulary as the larger listed Qwen 2.5 models.',
            caption: 'Public Qwen 2.5 instruct tokenizer files for the 1.5B model.',
          },
          {
            id: 'qwen2.5-7b-instruct',
            label: 'Qwen2.5-7B-Instruct',
            repo: 'Qwen/Qwen2.5-7B-Instruct',
            configuration: '7B Instruct',
            template: 'Qwen 2.5 instruct',
            summary: 'A widely used Qwen 2.5 instruct checkpoint that keeps token IDs aligned with the smaller and larger Qwen 2.5 sizes.',
            caption: 'Public Qwen 2.5 instruct tokenizer files for the 7B model.',
          },
          {
            id: 'qwen2.5-14b-instruct',
            label: 'Qwen2.5-14B-Instruct',
            repo: 'Qwen/Qwen2.5-14B-Instruct',
            configuration: '14B Instruct',
            template: 'Qwen 2.5 instruct',
            summary: 'Larger Qwen 2.5 instruct checkpoint that still uses the same tokenizer surface as the smaller listed Qwen 2.5 variants.',
            caption: 'Public Qwen 2.5 instruct tokenizer files for the 14B model.',
          },
        ],
      },
    ],
  },
  {
    id: 'deepseek',
    label: 'DeepSeek',
    lineSummary: 'This browser-friendly slice focuses on public DeepSeek R1 distill checkpoints that keep the Qwen-tokenizer lineage while changing distilled model size.',
    lineCaption: 'DeepSeek currently contributes one public browser-loadable family here.',
    families: [
      {
        id: 'deepseek-r1-qwen',
        label: 'R1 Distill (Qwen)',
        vocabStatus: 'exact',
        vocabBadge: 'Exact shared vocabulary',
        vocabSummary: 'The listed DeepSeek R1 Distill Qwen checkpoints share the same public tokenizer.json, so their vocabulary stays aligned while the distilled model size changes.',
        vocabCaption: 'All listed DeepSeek R1 Distill Qwen configurations point to the same tokenizer.json.',
        models: [
          {
            id: 'deepseek-r1-distill-qwen-1.5b',
            label: 'DeepSeek-R1-Distill-Qwen-1.5B',
            repo: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B',
            configuration: '1.5B',
            template: 'DeepSeek reasoning',
            summary: 'The smallest public Qwen-sized R1 distill checkpoint, useful for comparing DeepSeek prompt serialization without changing the shared vocabulary.',
            caption: 'Public DeepSeek R1 Distill Qwen tokenizer files for the 1.5B release.',
          },
          {
            id: 'deepseek-r1-distill-qwen-7b',
            label: 'DeepSeek-R1-Distill-Qwen-7B',
            repo: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
            configuration: '7B',
            template: 'DeepSeek reasoning',
            summary: 'The 7B R1 distill checkpoint keeps the same tokenizer surface as the smaller and larger Qwen-based DeepSeek distills.',
            caption: 'Public DeepSeek R1 Distill Qwen tokenizer files for the 7B release.',
          },
          {
            id: 'deepseek-r1-distill-qwen-14b',
            label: 'DeepSeek-R1-Distill-Qwen-14B',
            repo: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-14B',
            configuration: '14B',
            template: 'DeepSeek reasoning',
            summary: 'Largest listed Qwen-based R1 distill checkpoint, still aligned to the same tokenizer.json as the other listed DeepSeek distills.',
            caption: 'Public DeepSeek R1 Distill Qwen tokenizer files for the 14B release.',
          },
        ],
      },
    ],
  },
  {
    id: 'minimax',
    label: 'MiniMax',
    lineSummary: 'MiniMax is split into separate public tokenizer families here: the M1 line shares one exact tokenizer across the 40k and 80k configs, while Text-01 is a separate tokenizer surface with its own chat template.',
    lineCaption: 'MiniMax separates its M1 and Text-01 tokenizer families before you pick a configuration.',
    families: [
      {
        id: 'minimax-m1',
        label: 'MiniMax M1',
        vocabStatus: 'exact',
        vocabBadge: 'Exact shared vocabulary',
        vocabSummary: 'MiniMax M1 40k and 80k resolve to the same public tokenizer.json, so changing the context-window configuration does not change token IDs.',
        vocabCaption: 'All listed MiniMax M1 configurations point to the same tokenizer.json.',
        models: [
          {
            id: 'minimax-m1-40k',
            label: 'MiniMax-M1-40k',
            repo: 'MiniMaxAI/MiniMax-M1-40k',
            configuration: 'M1 40k',
            template: 'MiniMax M1 chat',
            chatContentFormat: 'array-text',
            summary: 'The shorter-context MiniMax M1 release, useful for inspecting the shared MiniMax M1 vocabulary without changing tokenizer IDs.',
            caption: 'Public MiniMax M1 tokenizer files for the 40k release.',
          },
          {
            id: 'minimax-m1-80k',
            label: 'MiniMax-M1-80k',
            repo: 'MiniMaxAI/MiniMax-M1-80k',
            configuration: 'M1 80k',
            template: 'MiniMax M1 chat',
            chatContentFormat: 'array-text',
            summary: 'Longer-context MiniMax M1 release that keeps the same tokenizer surface as the 40k checkpoint.',
            caption: 'Public MiniMax M1 tokenizer files for the 80k release.',
          },
        ],
      },
      {
        id: 'minimax-text-01',
        label: 'MiniMax Text 01',
        vocabStatus: 'single',
        vocabBadge: 'Single public configuration',
        vocabSummary: 'MiniMax Text 01 is represented by one browser-fetchable public configuration here, so there is no sibling tokenizer comparison inside this family yet.',
        vocabCaption: 'MiniMax Text 01 is represented by a single public configuration in this static build.',
        models: [
          {
            id: 'minimax-text-01',
            label: 'MiniMax-Text-01',
            repo: 'MiniMaxAI/MiniMax-Text-01',
            configuration: 'Text 01',
            template: 'MiniMax Text 01 chat',
            chatContentFormat: 'array-text',
            summary: 'MiniMax Text 01 uses its own prompt serialization and tokenizer surface alongside the M1 family.',
            caption: 'Public MiniMax Text 01 tokenizer files and chat template.',
          },
        ],
      },
    ],
  },
  {
    id: 'yi',
    label: 'Yi',
    lineSummary: 'Yi 1.5 is another Chinese open-source line that keeps the same base SentencePiece vocabulary across the listed chat checkpoints, even though the browser-facing tokenizer.json wrappers are not all identical.',
    lineCaption: 'Yi currently contributes one shared-base family here.',
    families: [
      {
        id: 'yi-1.5',
        label: 'Yi 1.5',
        vocabStatus: 'base',
        vocabBadge: 'Shared base vocabulary',
        vocabSummary: 'All listed Yi 1.5 checkpoints share the same tokenizer.model. The 6B and 34B tokenizer.json files match exactly, while the 9B wrapper differs, so the base SentencePiece vocabulary is shared even though the browser-facing tokenizer bundles are not all identical.',
        vocabCaption: 'The base SentencePiece vocabulary is shared across Yi 1.5, while tokenizer.json wrappers are not all identical.',
        models: [
          {
            id: 'yi-1.5-6b-chat',
            label: 'Yi-1.5-6B-Chat',
            repo: '01-ai/Yi-1.5-6B-Chat',
            configuration: '6B Chat',
            template: 'Yi chat',
            summary: 'Smaller Yi 1.5 chat checkpoint with the shared Yi SentencePiece base vocabulary.',
            caption: 'Public Yi 1.5 tokenizer files for the 6B chat release.',
          },
          {
            id: 'yi-1.5-9b-chat',
            label: 'Yi-1.5-9B-Chat',
            repo: '01-ai/Yi-1.5-9B-Chat',
            configuration: '9B Chat',
            template: 'Yi chat',
            summary: 'Mid-sized Yi 1.5 chat checkpoint that keeps the same base tokenizer model even though the tokenizer.json wrapper differs from the 6B and 34B releases.',
            caption: 'Public Yi 1.5 tokenizer files for the 9B chat release.',
          },
          {
            id: 'yi-1.5-34b-chat',
            label: 'Yi-1.5-34B-Chat',
            repo: '01-ai/Yi-1.5-34B-Chat',
            configuration: '34B Chat',
            template: 'Yi chat',
            summary: 'Largest listed Yi 1.5 chat checkpoint, still anchored to the same base SentencePiece vocabulary as the smaller Yi releases.',
            caption: 'Public Yi 1.5 tokenizer files for the 34B chat release.',
          },
        ],
      },
    ],
  },
  {
    id: 'mistral',
    label: 'Mistral',
    lineSummary: 'The public Mistral ecosystem is kept in one family bucket here because the interesting tokenizer comparison is across Mistral, Mixtral, and Ministral checkpoints that ship different tokenizer files.',
    lineCaption: 'One Mistral ecosystem family is exposed here, with tokenizer differences shown across its configurations.',
    families: [
      {
        id: 'mistral',
        label: 'Mistral ecosystem',
        vocabStatus: 'mixed',
        vocabBadge: 'Different tokenizer files',
        vocabSummary: 'The listed Mistral-family checkpoints stay in one ecosystem, but their public tokenizer files are not identical, so token boundaries can diverge meaningfully across configurations.',
        vocabCaption: 'These Mistral-family configurations ship different public tokenizer files.',
        models: [
          {
            id: 'mistral-7b-instruct-v0.3',
            label: 'Mistral-7B-Instruct-v0.3',
            repo: 'mistralai/Mistral-7B-Instruct-v0.3',
            configuration: '7B Instruct v0.3',
            template: 'Mistral instruct',
            summary: 'Canonical Mistral instruct checkpoint in the public browser-friendly lineup.',
            caption: 'Public Mistral tokenizer files for the v0.3 instruct release.',
          },
          {
            id: 'mixtral-8x7b-instruct-v0.1',
            label: 'Mixtral-8x7B-Instruct-v0.1',
            repo: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
            configuration: '8x7B Instruct v0.1',
            template: 'Mixtral instruct',
            summary: 'Sparse Mixture-of-Experts checkpoint in the Mistral family, useful for comparing a separate tokenizer surface within the same ecosystem.',
            caption: 'Public Mixtral tokenizer files for the instruct release.',
          },
          {
            id: 'ministral-8b-instruct-2410',
            label: 'Ministral-8B-Instruct-2410',
            repo: 'mistralai/Ministral-8B-Instruct-2410',
            configuration: '8B Instruct 2410',
            template: 'Ministral instruct',
            summary: 'Later compact Mistral-family release with its own tokenizer surface in the public repos.',
            caption: 'Public Ministral tokenizer files for the 8B instruct release.',
          },
        ],
      },
    ],
  },
  {
    id: 'phi',
    label: 'Phi',
    lineSummary: 'Phi 3 and Phi 3.5 stay in one family here because the base SentencePiece vocabulary persists across the listed checkpoints even when tokenizer.json wrappers differ.',
    lineCaption: 'Phi stays as one shared-base family in this browser build.',
    families: [
      {
        id: 'phi',
        label: 'Phi 3 / 3.5',
        vocabStatus: 'base',
        vocabBadge: 'Shared base vocabulary',
        vocabSummary: 'These Phi configs reuse the same public tokenizer.model but ship different tokenizer.json wrappers. The base SentencePiece vocabulary matches even though per-config metadata can differ.',
        vocabCaption: 'The base SentencePiece vocabulary is shared, while tokenizer.json wrappers differ by configuration.',
        models: [
          {
            id: 'phi-3-mini-4k-instruct',
            label: 'Phi-3-mini-4k-instruct',
            repo: 'microsoft/Phi-3-mini-4k-instruct',
            configuration: '3 Mini 4k',
            template: 'Phi instruct',
            summary: 'Compact Phi 3 instruct checkpoint with the shared Phi SentencePiece base vocabulary.',
            caption: 'Public Phi tokenizer files for the 3 Mini 4k instruct release.',
          },
          {
            id: 'phi-3-medium-4k-instruct',
            label: 'Phi-3-medium-4k-instruct',
            repo: 'microsoft/Phi-3-medium-4k-instruct',
            configuration: '3 Medium 4k',
            template: 'Phi instruct',
            summary: 'Mid-sized Phi 3 instruct checkpoint that keeps the same base SentencePiece vocabulary as the other listed Phi releases.',
            caption: 'Public Phi tokenizer files for the 3 Medium 4k instruct release.',
          },
          {
            id: 'phi-3.5-mini-instruct',
            label: 'Phi-3.5-mini-instruct',
            repo: 'microsoft/Phi-3.5-mini-instruct',
            configuration: '3.5 Mini',
            template: 'Phi instruct',
            summary: 'Newer Phi 3.5 instruct checkpoint that still reuses the same base tokenizer model as the listed Phi 3 variants.',
            caption: 'Public Phi tokenizer files for the 3.5 Mini instruct release.',
          },
        ],
      },
    ],
  },
  {
    id: 'smollm',
    label: 'SmolLM',
    lineSummary: 'SmolLM 2 contributes one compact instruct family with an exact shared vocabulary across the listed sizes.',
    lineCaption: 'SmolLM currently contributes one public family here.',
    families: [
      {
        id: 'smollm2',
        label: 'SmolLM 2',
        vocabStatus: 'exact',
        vocabBadge: 'Exact shared vocabulary',
        vocabSummary: 'The listed SmolLM 2 instruct checkpoints resolve to the same public tokenizer.json, so token IDs stay aligned from the 135M model up through the 1.7B release.',
        vocabCaption: 'All listed SmolLM 2 configurations point to the same tokenizer.json.',
        models: [
          {
            id: 'smollm2-135m-instruct',
            label: 'SmolLM2-135M-Instruct',
            repo: 'HuggingFaceTB/SmolLM2-135M-Instruct',
            configuration: '135M',
            template: 'SmolLM 2 instruct',
            summary: 'The smallest public SmolLM 2 instruct checkpoint, useful for seeing the exact shared SmolLM 2 vocabulary at tiny scale.',
            caption: 'Public SmolLM 2 tokenizer files for the 135M instruct release.',
          },
          {
            id: 'smollm2-360m-instruct',
            label: 'SmolLM2-360M-Instruct',
            repo: 'HuggingFaceTB/SmolLM2-360M-Instruct',
            configuration: '360M',
            template: 'SmolLM 2 instruct',
            summary: 'Mid-sized SmolLM 2 instruct checkpoint that keeps the same tokenizer surface as the smaller and larger listed SmolLM 2 models.',
            caption: 'Public SmolLM 2 tokenizer files for the 360M instruct release.',
          },
          {
            id: 'smollm2-1.7b-instruct',
            label: 'SmolLM2-1.7B-Instruct',
            repo: 'HuggingFaceTB/SmolLM2-1.7B-Instruct',
            configuration: '1.7B',
            template: 'SmolLM 2 instruct',
            summary: 'Largest listed SmolLM 2 checkpoint, still aligned to the same tokenizer.json as the smaller SmolLM 2 variants.',
            caption: 'Public SmolLM 2 tokenizer files for the 1.7B instruct release.',
          },
        ],
      },
    ],
  },
  {
    id: 'falcon',
    label: 'Falcon',
    lineSummary: 'Falcon 3 contributes one instruct family with an exact shared tokenizer across the listed sizes.',
    lineCaption: 'Falcon currently contributes one public family here.',
    families: [
      {
        id: 'falcon3',
        label: 'Falcon 3',
        vocabStatus: 'exact',
        vocabBadge: 'Exact shared vocabulary',
        vocabSummary: 'The listed Falcon 3 instruct checkpoints share the same public tokenizer.json, so vocabulary and token IDs stay consistent as you move across the 1B, 3B, and 7B sizes.',
        vocabCaption: 'All listed Falcon 3 configurations point to the same tokenizer.json.',
        models: [
          {
            id: 'falcon3-1b-instruct',
            label: 'Falcon3-1B-Instruct',
            repo: 'tiiuae/Falcon3-1B-Instruct',
            configuration: '1B',
            template: 'Falcon 3 instruct',
            summary: 'Smallest listed Falcon 3 instruct checkpoint with the exact shared Falcon 3 tokenizer surface.',
            caption: 'Public Falcon 3 tokenizer files for the 1B instruct release.',
          },
          {
            id: 'falcon3-3b-instruct',
            label: 'Falcon3-3B-Instruct',
            repo: 'tiiuae/Falcon3-3B-Instruct',
            configuration: '3B',
            template: 'Falcon 3 instruct',
            summary: 'Mid-sized Falcon 3 instruct checkpoint that keeps the same tokenizer surface as the other listed Falcon 3 sizes.',
            caption: 'Public Falcon 3 tokenizer files for the 3B instruct release.',
          },
          {
            id: 'falcon3-7b-instruct',
            label: 'Falcon3-7B-Instruct',
            repo: 'tiiuae/Falcon3-7B-Instruct',
            configuration: '7B',
            template: 'Falcon 3 instruct',
            summary: 'Largest listed Falcon 3 instruct checkpoint, still aligned to the same tokenizer.json as the smaller Falcon 3 variants.',
            caption: 'Public Falcon 3 tokenizer files for the 7B instruct release.',
          },
        ],
      },
    ],
  },
];

const UNSUPPORTED_BROWSER_LINES = [
  {
    label: 'Kimi K2',
    reason: 'Public repos expose a custom TikToken runtime (`tiktoken.model`) instead of a browser-ready tokenizer.json.',
  },
  {
    label: 'GLM 4',
    reason: 'Public repos rely on a custom ChatGLM tokenizer class.',
  },
  {
    label: 'InternLM 3',
    reason: 'Public repos rely on a custom InternLM tokenizer class.',
  },
  {
    label: 'Baichuan 2',
    reason: 'Public repos rely on a custom Baichuan tokenizer class.',
  },
];

const LINES = LINE_CATALOG.map((line) => ({
  ...line,
  families: line.families.map((family) => ({
    ...family,
    lineId: line.id,
    line: line.label,
    models: family.models.map((model) => ({
      ...model,
      lineId: line.id,
      line: line.label,
      familyId: family.id,
      family: family.label,
    })),
  })),
}));
const LINE_MAP = Object.fromEntries(LINES.map((line) => [line.id, line]));
const FAMILIES = LINES.flatMap((line) => line.families);
const FAMILY_MAP = Object.fromEntries(FAMILIES.map((family) => [family.id, family]));
const MODELS = FAMILIES.flatMap((family) => family.models);
const MODEL_MAP = Object.fromEntries(MODELS.map((model) => [model.id, model]));

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
  populateLineOptions();
  populateFamilyOptions();
  populateModelOptions();
  renderModelMeta();
  renderUnsupportedLineup();
  renderModelLineup();
  bindEvents();
  retokenize();
});

function captureRefs() {
  refs.lineSelect = document.getElementById('line-select');
  refs.lineCaption = document.getElementById('line-caption');
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
  refs.lineLabel = document.getElementById('line-label');
  refs.familyLabel = document.getElementById('family-label');
  refs.configurationLabel = document.getElementById('configuration-label');
  refs.vocabChip = document.getElementById('vocab-chip');
  refs.vocabLabel = document.getElementById('vocab-label');
  refs.templateLabel = document.getElementById('template-label');
  refs.lineSummary = document.getElementById('line-summary');
  refs.modelSummary = document.getElementById('model-summary');
  refs.familyVocabPanel = document.getElementById('family-vocab-panel');
  refs.familyVocabTitle = document.getElementById('family-vocab-title');
  refs.familyVocabSummary = document.getElementById('family-vocab-summary');
  refs.modelCaption = document.getElementById('model-caption');
  refs.modelMetaRepo = document.getElementById('model-meta-repo');
  refs.modelMetaLine = document.getElementById('model-meta-line');
  refs.modelMetaFamily = document.getElementById('model-meta-family');
  refs.modelMetaConfig = document.getElementById('model-meta-config');
  refs.modelMetaVocab = document.getElementById('model-meta-vocab');
  refs.modelMetaTemplate = document.getElementById('model-meta-template');
  refs.modelMetaSummary = document.getElementById('model-meta-summary');
  refs.unsupportedLineup = document.getElementById('unsupported-lineup');
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
  refs.lineSelect.addEventListener('change', () => {
    populateFamilyOptions(false);
    populateModelOptions(false);
    renderModelMeta();
    renderModelLineup();
    retokenize(false);
  });
  refs.familySelect.addEventListener('change', () => {
    syncLineSelectionToFamily();
    populateModelOptions(false);
    renderModelMeta();
    renderModelLineup();
    retokenize(false);
  });
  refs.modelSelect.addEventListener('change', () => {
    syncSelectionToModel();
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

function populateLineOptions() {
  refs.lineSelect.innerHTML = '';
  LINES.forEach((line) => {
    const option = document.createElement('option');
    option.value = line.id;
    option.textContent = `${line.label} (${line.families.length} ${line.families.length === 1 ? 'family' : 'families'})`;
    refs.lineSelect.append(option);
  });
  refs.lineSelect.value = LINES[0]?.id || '';
}

function populateFamilyOptions(preserveCurrent = true) {
  const previousValue = refs.familySelect.value;
  refs.familySelect.innerHTML = '';
  const lineFamilies = familiesForLine(refs.lineSelect.value);
  lineFamilies.forEach((family) => {
    const option = document.createElement('option');
    option.value = family.id;
    option.textContent = `${family.label} (${family.models.length} · ${familySelectorBadge(family)})`;
    refs.familySelect.append(option);
  });

  if (preserveCurrent && lineFamilies.some((family) => family.id === previousValue)) {
    refs.familySelect.value = previousValue;
  } else {
    refs.familySelect.value = lineFamilies[0]?.id || '';
  }
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
  const line = currentLine();
  const model = currentModel();
  const family = currentFamily();
  const familyCount = line.families.length;
  const familyLabel = familyCount === 1 ? 'family' : 'families';
  const configurationCount = family.models.length;
  const configurationLabel = configurationCount === 1 ? 'configuration' : 'configurations';

  document.title = `Tokenizer Observatory | ${model.label}`;
  refs.heroModelName.textContent = `${model.label}'s chat template`;
  refs.repoChip.href = `https://huggingface.co/${model.repo}`;
  refs.repoLabel.textContent = model.repo;
  refs.lineLabel.textContent = model.line;
  refs.familyLabel.textContent = model.family;
  refs.configurationLabel.textContent = model.configuration;
  refs.vocabLabel.textContent = family.vocabBadge;
  refs.templateLabel.textContent = model.template;
  refs.lineSummary.textContent = line.lineSummary;
  refs.modelSummary.textContent = model.summary;
  refs.familyVocabTitle.textContent = family.vocabBadge;
  refs.familyVocabSummary.textContent = family.vocabSummary;
  refs.lineCaption.textContent = `${line.label} currently exposes ${familyCount} public ${familyLabel} in this browser-only build. ${line.lineCaption}`;
  refs.familyCaption.textContent = `${family.label} currently exposes ${configurationCount} public ${configurationLabel} in this browser-only build. ${family.vocabCaption}`;
  refs.modelCaption.textContent = `${model.caption} ${family.vocabCaption} Browser-only gaps such as Kimi K2, GLM 4, and InternLM 3 still need custom tokenizer support.`;
  refs.modelMetaRepo.href = `https://huggingface.co/${model.repo}`;
  refs.modelMetaRepo.textContent = model.repo;
  refs.modelMetaLine.textContent = model.line;
  refs.modelMetaFamily.textContent = model.family;
  refs.modelMetaConfig.textContent = model.configuration;
  refs.modelMetaVocab.textContent = family.vocabBadge;
  refs.modelMetaTemplate.textContent = model.template;
  refs.modelMetaSummary.textContent = model.summary;
  applyVocabularyTone(refs.vocabChip, family.vocabStatus);
  applyVocabularyTone(refs.familyVocabPanel, family.vocabStatus);
}

function renderUnsupportedLineup() {
  refs.unsupportedLineup.innerHTML = '';
  const fragment = document.createDocumentFragment();
  UNSUPPORTED_BROWSER_LINES.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = `${entry.label} — ${entry.reason}`;
    fragment.append(li);
  });
  refs.unsupportedLineup.append(fragment);
}

function renderModelLineup() {
  refs.modelLineup.innerHTML = '';
  const selectedFamily = currentFamily().id;
  const fragment = document.createDocumentFragment();
  LINES.forEach((line) => {
    const li = document.createElement('li');
    const familySnapshots = line.families.map((family) => {
      const configLabel = family.models.length === 1 ? 'config' : 'configs';
      const activeLabel = family.id === selectedFamily ? ' (selected)' : '';
      return `${family.label}${activeLabel} · ${family.models.length} ${configLabel} · ${familySelectorBadge(family)}`;
    });
    li.textContent = `${line.label} · ${line.families.length} ${line.families.length === 1 ? 'family' : 'families'} — ${familySnapshots.join(' | ')}`;
    fragment.append(li);
  });
  refs.modelLineup.append(fragment);
}

function familySelectorBadge(family) {
  switch (family.vocabStatus) {
    case 'exact':
      return 'same vocab';
    case 'base':
      return 'same base vocab';
    case 'mixed':
      return 'mixed vocab';
    default:
      return 'single config';
  }
}

function applyVocabularyTone(element, tone) {
  if (!element) {
    return;
  }
  element.classList.remove('vocab-exact', 'vocab-base', 'vocab-mixed', 'vocab-single');
  element.classList.add(`vocab-${tone}`);
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
  const model = currentModel();

  let serializedPrompt = rawInput;
  let tokenIds = [];

  if (isChat) {
    if (typeof tokenizer.apply_chat_template !== 'function') {
      throw new Error(`${currentModel().label} does not expose a chat template in this browser runtime.`);
    }

    const messages = [];
    if (systemInput.trim()) {
      messages.push({ role: 'system', content: formatChatContent(systemInput.trim(), model) });
    }
    messages.push({ role: 'user', content: formatChatContent(rawInput, model) });

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

function formatChatContent(text, model) {
  if (model.chatContentFormat === 'array-text') {
    return [{ type: 'text', text }];
  }
  return text;
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
  refs.lineSelect.disabled = isBusy;
  refs.familySelect.disabled = isBusy;
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

function currentLine() {
  return LINE_MAP[refs.lineSelect.value] || LINES[0];
}

function currentFamily() {
  return FAMILY_MAP[refs.familySelect.value] || familiesForLine(refs.lineSelect.value)[0] || FAMILIES[0];
}

function familiesForLine(lineId) {
  return LINE_MAP[lineId]?.families || FAMILIES;
}

function modelsForFamily(familyId) {
  return currentFamilyList(familyId);
}

function currentFamilyList(familyId) {
  return FAMILY_MAP[familyId]?.models || MODELS;
}

function syncLineSelectionToFamily() {
  const family = FAMILY_MAP[refs.familySelect.value];
  if (family && refs.lineSelect.value !== family.lineId) {
    refs.lineSelect.value = family.lineId;
  }
}

function syncSelectionToModel() {
  const model = MODEL_MAP[refs.modelSelect.value];
  if (!model) {
    return;
  }
  if (refs.lineSelect.value !== model.lineId) {
    refs.lineSelect.value = model.lineId;
  }
  if (refs.familySelect.value !== model.familyId) {
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
