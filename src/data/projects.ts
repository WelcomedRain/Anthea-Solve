import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'moneynode',
    title: 'MoneyNode',
    headline: 'Privacy-first personal finance intelligence engine',
    category: 'Local-First Systems',
    statusBadge: 'Autonomous / Local Storage',
    description:
      'Privacy-first personal finance app engineered for users who refuse third-party financial telemetry. Bypasses external banking APIs entirely, ensuring complete cryptographic and operational data autonomy on the user’s device.',
    architecture: [
      'Local-first architecture leveraging IndexedDB & Dexie.js for persistent client-side storage',
      'Engineered with React 18, TypeScript, and modern component composition',
      'Ultra-responsive styling via Tailwind CSS & lightning-fast builds powered by Vite',
      'Zero external banking API intermediaries — all ledger computation occurs on-device',
    ],
    techStack: ['IndexedDB', 'Dexie.js', 'React 18', 'TypeScript', 'Tailwind CSS', 'Vite'],
    accentColor: 'blue',
    iconName: 'ShieldCheck',
    metrics: [
      { label: 'Cloud Egress', value: '0 bytes' },
      { label: 'Storage', value: 'IndexedDB' },
      { label: 'Latency', value: '< 2ms' },
    ],
    deepArchitecture: {
      summary:
        'MoneyNode operates strictly within the host browser sandboxed storage layer. Account ledgers, transaction histories, and statistical aggregation models run on client threads with zero external API calls.',
      executionFlow: [
        'User transaction input ingested into memory cache',
        'Dexie.js transaction pipeline executes ACID commit into IndexedDB',
        'In-memory ledger indexes compute budget deltas and trend vectors',
        'State reflected instantly with zero network round-trip overhead',
      ],
      privacyGuarantees: [
        'No telemetry, analytics, or third-party SDK trackers',
        'Encrypted database export/import via AES-GCM user-controlled keys',
        'Bypasses Plaid, Yodlee, and all third-party banking aggregators',
      ],
      benchmarkOrSpec: 'IndexedDB read/write cycle: ~1.4ms on 10,000 transaction entries',
    },
  },
  {
    id: 'arcanum-resero',
    title: 'Arcanum Resero',
    headline: 'Air-gapped local LLM desktop interface with 3D avatar embodiment',
    category: 'Local AI & Real-Time 3D',
    statusBadge: 'Air-Gapped Native',
    description:
      'Local LLM AI desktop interface built to deliver uncompromised artificial intelligence without network tethering. Features real-time 3D spatial avatar embodiment rendered in Godot 4.5, paired directly with local llama.cpp weights. Zero cloud dependency.',
    architecture: [
      'Native desktop interface designed with Python and high-performance PyQt5 window overlay',
      'High-throughput quantized model execution via direct llama.cpp local inference engine',
      'Godot 4.5 real-time 3D rendering engine driving a dynamically rigged Blender avatar',
      'Fully air-gapped system with zero telemetry or cloud model API reliance',
    ],
    techStack: ['Python', 'PyQt5', 'llama.cpp', 'Godot 4.5', 'Blender', 'GGUF'],
    accentColor: 'pink',
    iconName: 'Cpu',
    metrics: [
      { label: 'Inference', value: 'llama.cpp' },
      { label: 'Render Engine', value: 'Godot 4.5' },
      { label: 'Cloud Reliance', value: '0%' },
    ],
    deepArchitecture: {
      summary:
        'Arcanum Resero connects an optimized llama.cpp C++ inference daemon with a transparent PyQt5 HUD and a Godot 4.5 viewport running a skeletal-mesh Blender avatar. Audio phonemes and emotion tokens drive real-time morph targets.',
      executionFlow: [
        'PyQt5 desktop overlay captures user prompts and hotkey triggers',
        'Inference request streamed to local llama.cpp GGUF instance over unix domain sockets',
        'Syntactic stream parsed for sentiment/action tokens in sub-millisecond intervals',
        'Godot 4.5 IPC bridge updates bone transforms and facial blendshapes at 60 FPS',
      ],
      privacyGuarantees: [
        'Inference runs 100% on local GPU/VRAM (Metal / CUDA / Vulkan)',
        'Prompt history stored in local encrypted memory ring-buffer',
        'Zero outbound socket connections; verified by packet sniffers',
      ],
      benchmarkOrSpec: 'Token throughput: 42 t/s on 8B quantized weights (M-series/RTX)',
    },
  },
  {
    id: 'smart-photo-resizer',
    title: 'Smart Photo Resizer',
    headline: 'High-density browser PWA for pixel-exact image manipulation',
    category: 'Client-Side PWA',
    statusBadge: 'Zero-Upload PWA',
    description:
      'Browser-based Progressive Web App engineered for pixel-exact cropping, aspect ratio locking, and high-volume batch processing. Transforms images strictly in client memory without uploading a single pixel to remote servers.',
    architecture: [
      'Built with React 19 and strict TypeScript type safety for modern concurrent rendering',
      'Hardware-accelerated image manipulation powered by the local HTML Canvas API',
      'Client-side batch file packaging and multi-image stream compilation using JSZip',
      'Zero backend or server uploads — operations execute purely in client hardware',
    ],
    techStack: ['React 19', 'TypeScript', 'HTML Canvas API', 'JSZip', 'Service Worker', 'PWA'],
    accentColor: 'amber',
    iconName: 'Crop',
    metrics: [
      { label: 'Upload Overhead', value: '0 kb' },
      { label: 'Processing', value: 'HTML Canvas' },
      { label: 'Execution', value: '100% Offline' },
    ],
    deepArchitecture: {
      summary:
        'Smart Photo Resizer leverages web workers and OffscreenCanvas to manipulate raw bitmap buffers directly in browser threads, eliminating server hosting costs and preserving media privacy.',
      executionFlow: [
        'File handles streamed via Drag-and-Drop or FileSystem Access API',
        'ImageBitmap instantiated asynchronously to prevent main-thread UI jank',
        'Pixel interpolation algorithms (Lanczos3 / Bicubic) executed via OffscreenCanvas',
        'Buffers piped into JSZip archive stream and written to disk through direct Blob downloads',
      ],
      privacyGuarantees: [
        'Zero network requests sent after initial PWA service worker caching',
        'User media never touches external cloud storage or proxy endpoints',
        'Fully operational during complete offline or airplane mode scenarios',
      ],
      benchmarkOrSpec: 'Batch throughput: 50 high-res RAW/JPEG assets in ~3.8s',
    },
  },
  {
    id: 'bench',
    title: 'BENCH',
    headline: 'Local-first diffusion model evaluation and workflow extraction harness',
    category: 'Generative Evaluation',
    statusBadge: 'Native Binary Parser',
    description:
      'Local-first desktop web app purpose-built for profiling and evaluating self-hosted video diffusion models (Wan, LTX). Parses workflow graphs directly from binary containers and benchmarks tensor pipelines without cloud services.',
    architecture: [
      'Lightweight Python 3 standard library backend with zero bloat dependencies',
      'High-concurrency SQLite WAL (Write-Ahead Logging) storage mode for continuous telemetry',
      'Ultra-minimal, ultra-fast vanilla JavaScript client interface with zero runtime bundle debt',
      'Direct binary container parsing to extract node graphs and diffusion pipeline topologies',
    ],
    techStack: ['Python 3 StdLib', 'SQLite WAL', 'Vanilla JS', 'Diffusion Graphs', 'Wan / LTX'],
    accentColor: 'blue',
    iconName: 'Workflow',
    metrics: [
      { label: 'Models', value: 'Wan & LTX' },
      { label: 'Persistence', value: 'SQLite WAL' },
      { label: 'Client Debt', value: '0 kB Framework' },
    ],
    deepArchitecture: {
      summary:
        'BENCH inspects self-hosted video generation pipelines, slicing Safetensors metadata and custom binary checkpoints to rebuild graphical node linkages while logging inference vRAM consumption to a local SQLite WAL database.',
      executionFlow: [
        'Local file watcher detects new diffusion container checkpoints',
        'Binary header parsed via Python struct/mmap without loading whole model into RAM',
        'Extracted node connections and hyperparameters serialized to SQLite WAL store',
        'Vanilla JS canvas client renders interactive pipeline DAG with sub-frame responsiveness',
      ],
      privacyGuarantees: [
        'Proprietary diffusion workflows and generation prompts remain on internal hardware',
        'Runs offline on local workstation localhost interface with zero external heartbeat',
        'Self-contained single-file backend architecture',
      ],
      benchmarkOrSpec: 'Binary graph extraction: < 120ms on 14GB diffusion checkpoints',
    },
  },
];
