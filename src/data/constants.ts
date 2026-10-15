import type { Project, Skill, SocialLink, NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/belal-waheed", icon: "github" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/belal-whaeed",
    icon: "linkedin",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/belalwaheed_/",
    icon: "instagram",
  },
  { name: "Email", url: "mailto:belalwaheed000@gmail.com", icon: "mail" },
];

export const PROJECTS: Project[] = [
  {
    id: "markbel",
    slug: "markbel",
    title: "Markbel",
    subtitle: "Offline-First Bookmark Vault & Personal Knowledge Engine",
    category: "Systems Architecture & Offline-First PWA",
    description: "Production-grade, offline-first bookmark vault and Pocket/Raindrop.io alternative. Delivers 0ms local reads/writes via Dexie.js v5 IndexedDB, bi-directional delta sync over Cloudflare Workers & D1 SQLite, native Android share-sheet integration, and Manifest V3 extensions.",
    longDescription: "Markbel is an open-source, local-first bookmark manager engineered for instant performance and absolute data privacy. It solves cloud bookmark latency with an offline-first transactional outbox pattern on IndexedDB, monotonic delta sync on Cloudflare D1, a deterministic 4-stage media fallback FSM, and 228 automated unit tests.",
    image: "/projects/markbel/1.webp",
    imageMobile: "/projects/markbel/1-m.webp",
    images: ["/projects/markbel/1.webp"],
    imagesMobile: ["/projects/markbel/1-m.webp"],
    tags: ["React 19", "TypeScript", "Dexie.js v5", "Cloudflare Workers", "Cloudflare D1", "Capacitor 8", "Tailwind CSS v4", "Manifest V3"],
    liveUrl: "https://mark.obel.workers.dev",
    githubUrl: "https://github.com/belal-waheed/markbel",
    featured: true,
    role: "Creator & Lead Systems Architect",
    timeline: "2026 — Present",
    team: "Solo Architecture & Delivery",
    features: [
      "0ms Local Read/Write Latency via Dexie.js v5 IndexedDB with reactive live queries",
      "Bi-Directional Delta Sync Engine with Last-Write-Wins (LWW) conflict arbitration",
      "Edge Media Metadata Scraper & Proxy for YouTube, Instagram Reels, X/Twitter, Reddit",
      "Deterministic 4-Stage Image Fallback FSM with synchronous social CDN expiration detection",
      "Native Android App (Capacitor 8) with OS Share Sheet Intent receiver",
      "Chromium & Firefox Manifest V3 browser extensions with 1-click active tab capture",
      "100% Free & Open-Source (MIT License) with 228 automated unit tests"
    ],
    architecture: [
      "React 19 + Vite frontend with Tailwind CSS v4 styling and Workbox PWA caching",
      "Client-side Dexie.js v5 transactional outbox and background compaction scheduler",
      "Cloudflare Workers edge router (Hono) backed by Cloudflare D1 serverless SQLite",
      "Capacitor 8 native Android bridge with sub-50ms share-sheet HUD overlay"
    ],
    architectureLayers: [
      {
        layer: "Client & Presentation",
        tech: "React 19, TypeScript, Tailwind CSS v4, Lucide Icons",
        details: "Responsive dual-view feed (cards & compact list), customizable navigation preferences."
      },
      {
        layer: "Local Persistence",
        tech: "Dexie.js v5, IndexedDB, WebCrypto",
        details: "Schema convergence, transaction isolation, offline token caching."
      },
      {
        layer: "Edge & Cloud Sync",
        tech: "Cloudflare Workers, Cloudflare D1 (SQLite), HTTP 304 Cursors",
        details: "Monotonic sequence delta replication, edge image proxying with 410 fast-fail."
      }
    ],
    challenges: [
      "Eliminating the 500ms-1200ms latency of remote bookmark mutations while guaranteeing zero data loss during network drops.",
      "Preventing image breakage caused by expiring social media CDN URLs (Instagram, Reddit, X/Twitter) within 24 hours.",
    ],
    detailedChallenges: [
      {
        title: "0ms Local Outbox & Monotonic Delta Sync",
        problem: "Users expect instant saves and tag updates regardless of poor internet connectivity, but naive background sync causes race conditions and split-brain states.",
        solution: "Engineered a local transactional outbox using Dexie.js v5 with reactive live queries and monotonic cursor-based delta replication against Cloudflare D1."
      },
      {
        title: "Social Media CDN Expiration & Image Fallback",
        problem: "CDN URLs from major social platforms expire quickly, leaving broken images across user bookmark grids.",
        solution: "Built an edge proxy with WebP transcoding combined with a client-side 4-stage fallback finite state machine that deterministically renders SVG fallbacks if upstream origins fail."
      }
    ],
    metrics: [
      "0ms Local Read/Write Latency via IndexedDB",
      "228 Automated Unit & Integration Tests Passing",
      "100% Offline Capability for Search & Categorization"
    ],
    detailedMetrics: [
      { label: "Local Mutation Speed", value: "0ms", detail: "Instant UI updates via Dexie.js transactional outbox" },
      { label: "Test Coverage", value: "228 Tests", detail: "Comprehensive unit suites for outbox, sync, FSM, and scraper" },
      { label: "Edge Sync Overhead", value: "< 45ms", detail: "Cloudflare Workers + D1 serverless SQLite response" }
    ],
    techStackMatrix: {
      frontend: ["React 19", "TypeScript", "Dexie.js v5", "Tailwind CSS v4", "Lucide Icons"],
      backend: ["Cloudflare Workers", "Hono", "REST API", "Zod"],
      database: ["IndexedDB", "Cloudflare D1 (SQLite)"],
      devops: ["Cloudflare Pages", "Capacitor 8", "Manifest V3", "Vitest"]
    },
    learnings: [
      "Local-first architecture requires designing outbox mutations as immutable event streams to guarantee idempotent re-syncing.",
      "A deterministic finite state machine on image rendering prevents visual jitter and broken media states."
    ]
  },
  {
    id: "1",
    slug: "tivaq",
    title: "Tivaq",
    subtitle: "Luxury Fragrance E-Commerce & Verification Suite",
    category: "Full-Stack E-Commerce & Operations",
    description:
      "Production-grade fragrance store featuring real-time product authenticity verification, multi-lingual Arabic/English support, comprehensive admin dashboard, and cloud sync cart.",
    longDescription:
      "Tivaq is a bespoke fragrance e-commerce web platform engineered with React, Node.js, and MongoDB. The system addresses a critical luxury retail challenge: anti-counterfeiting. It integrates an instant batch-code authenticity scanner alongside a fluid, bilingual shopping experience (English & Arabic) and a full-featured administrative operations portal.",
    image: "/projects/tivaq/1.webp",
    imageMobile: "/projects/tivaq/1-m.webp",
    images: [
      "/projects/tivaq/1.webp",
      "/projects/tivaq/2.webp",
      "/projects/tivaq/3.webp",
    ],
    imagesMobile: [
      "/projects/tivaq/1-m.webp",
      "/projects/tivaq/2-m.webp",
      "/projects/tivaq/3-m.webp",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "i18n"],
    liveUrl: "https://www.tivaqfragrance.com/",
    featured: true,
    role: "Lead Full-Stack Engineer",
    timeline: "2024 — Present",
    team: "Solo Architecture & Delivery",
    features: [
      "Instant Authenticity Verification: Unique serial batch-code scanner confirming genuine luxury bottles.",
      "Comprehensive Admin Portal: Real-time inventory tracking, order status management, and revenue analytics.",
      "Dual-Language i18n: Seamless English (LTR) and Arabic (RTL) localization with zero layout shifts.",
      "Resilient Shopping Cart: Multi-tab optimistic cart state synchronized with localStorage and server backup.",
      "Optimized Checkout: Frictionless form validation with WhatsApp direct ordering fallback."
    ],
    architecture: [
      "React + Vite frontend with Tailwind CSS styling and RTL layout support",
      "Node.js & Express RESTful API backend following Controller-Service patterns",
      "MongoDB database with compound indices for sub-10ms authenticity lookups",
      "JWT authentication with role-based route middleware protection",
    ],
    architectureLayers: [
      {
        layer: "Presentation Layer",
        tech: "React 19, Vite, Tailwind CSS v4, i18next",
        details: "Dynamic RTL/LTR switching, responsive bento product showcase, and cart state synchronization."
      },
      {
        layer: "API & Business Logic",
        tech: "Node.js, Express.js, JWT, Zod Validation",
        details: "Strict layered controller-service pattern, rate-limited public verification endpoints."
      },
      {
        layer: "Data & Persistence",
        tech: "MongoDB, Mongoose ODM",
        details: "Compound indexes on SKU and security serial hashes ensuring instant lookup latency."
      },
      {
        layer: "Infrastructure & Edge",
        tech: "Vercel / Cloudflare Global CDN",
        details: "Global edge asset caching, automated image compression, and SSL termination."
      }
    ],
    challenges: [
      "Designing a high-speed product lookup mechanism for instant authenticity checks without exposing database records.",
      "Managing bidirectional RTL/LTR layout transitions and state localization across complex nested components.",
    ],
    detailedChallenges: [
      {
        title: "Sub-10ms Product Authenticity Lookup",
        problem: "Users needed an instant scan result for bottle authenticity while preventing brute-force code enumeration.",
        solution: "Implemented SHA-256 hashed code lookups with compound indexed MongoDB collections and strict IP-based rate limiting on Express edge middleware."
      },
      {
        title: "Zero-Layout-Shift Bi-Directional (RTL/LTR) Localization",
        problem: "Switching between Arabic and English caused subtle CSS misalignment on product grids and navigation overlays.",
        solution: "Constructed dynamic logical CSS properties (margin-inline, inset-inline) coupled with React Context locale listeners to re-render layout seamlessly."
      }
    ],
    metrics: [
      "99.4% Authenticity Verification Speed under 25ms",
      "100% Arabic & English Content Parity",
      "0.8s First Contentful Paint globally"
    ],
    detailedMetrics: [
      { label: "Lookup Latency", value: "< 25ms", detail: "Indexed hash verification queries" },
      { label: "Lighthouse Performance", value: "98/100", detail: "Optimized Web Vitals and image compression" },
      { label: "Cart Sync Reliability", value: "100%", detail: "Zero dropped shopping sessions via local/cloud fallback" }
    ],
    techStackMatrix: {
      frontend: ["React.js", "Vite", "Tailwind CSS", "i18next", "Lucide Icons"],
      backend: ["Node.js", "Express.js", "JWT", "REST API", "Bcrypt"],
      database: ["MongoDB", "Mongoose ODM"],
      devops: ["Vercel", "Cloudflare DNS", "Git/GitHub CI"]
    },
    learnings: [
      "Designing database schema indexes tailored specifically to security verification queries reduces CPU overhead significantly.",
      "Native CSS logical properties simplify internationalization compared to conditional directional stylesheets."
    ]
  },
  {
    id: "2",
    slug: "moviq",
    title: "Moviq",
    subtitle: "Cinematic Movie & TV Discovery Engine",
    category: "Media Discovery & Entertainment Web App",
    description:
      "High-performance media exploration web app integrating the TMDB API, custom watchlists, embedded HD trailer modal, and smooth 60fps infinite scrolling.",
    longDescription:
      "Moviq is an immersive entertainment discovery web application designed for film enthusiasts. Powered by the TMDB REST API, it provides real-time trending titles, multi-criteria filtering (genre, year, certification, rating), actor filmographies, high-definition trailer playback, and personalized watchlists stored locally with cloud backup capability.",
    image: "/projects/moviq/1.webp",
    imageMobile: "/projects/moviq/1-m.webp",
    images: [
      "/projects/moviq/1.webp",
      "/projects/moviq/2.webp",
      "/projects/moviq/3.webp",
    ],
    imagesMobile: [
      "/projects/moviq/1-m.webp",
      "/projects/moviq/2-m.webp",
      "/projects/moviq/3-m.webp",
    ],
    tags: ["React", "Node.js", "TMDB API", "Tailwind CSS", "Redux"],
    liveUrl: "https://moviqq.vercel.app",
    githubUrl: "https://github.com/belal-waheed/moviq",
    featured: true,
    role: "Frontend & API Architect",
    timeline: "2024",
    team: "Individual Project",
    features: [
      "Real-time TMDB API Integration: Live catalog of trending movies, top-rated series, and upcoming releases.",
      "Embedded HD Trailer Player: Instant YouTube trailer modal with keyboard dismiss and focus trapping.",
      "Comprehensive Cast & Crew Explorer: Detailed biographies, filmography carousels, and related works.",
      "Multi-Vector Filter Engine: Real-time filtering by genre, release window, user score, and language.",
      "Custom Watchlist & Favorites: Redux Toolkit state with persistent offline storage."
    ],
    architecture: [
      "React SPA with Redux Toolkit for centralized media query caching",
      "Asynchronous API client layer with response normalization and memoization",
      "Custom responsive CSS Grid & Dark Obsidian glassmorphic surface design",
      "Keyboard accessible focus trap modals with video cleanup on unmount"
    ],
    architectureLayers: [
      {
        layer: "UI & Presentation",
        tech: "React 19, Redux Toolkit, Tailwind CSS",
        details: "Cinematic dark theme, responsive media cards with poster aspect-ratio preservation, and fluid carousels."
      },
      {
        layer: "State & Caching",
        tech: "Redux Slices, LocalStorage Persist",
        details: "Normalized entity store for movie/show details to prevent duplicate TMDB network calls."
      },
      {
        layer: "External Media Integration",
        tech: "TMDB REST API, YouTube IFrame API",
        details: "Paginated query fetching with debounce search and backdrop image CDN optimization."
      }
    ],
    challenges: [
      "Preventing TMDB API rate-limiting while enabling fluid continuous scrolling on trending feeds.",
      "Handling seamless video trailer mounting and audio teardown without memory leaks."
    ],
    detailedChallenges: [
      {
        title: "Rate-Limit Protection & Infinite Scroll Caching",
        problem: "Rapid scrolling on high-resolution displays fired duplicate API requests for identical page numbers.",
        solution: "Constructed an in-memory query cache in Redux with request deduplication and scroll threshold throttling."
      },
      {
        title: "Video Modal Memory Management",
        problem: "Opening and closing multiple trailers caused orphan iframe processes and background audio playback on mobile.",
        solution: "Engineered strict React lifecycle unmount cleanup with explicit player destruction handlers."
      }
    ],
    metrics: [
      "Sub-50ms Client Search Filter Response",
      "60fps Smooth Scroll on 500+ Media Items",
      "Zero Duplicate API Fetches via Redux Normalization"
    ],
    detailedMetrics: [
      { label: "Search Latency", value: "< 50ms", detail: "Debounced in-memory filter matching" },
      { label: "Frame Rate", value: "60 FPS", detail: "CSS GPU-accelerated transforms on poster cards" },
      { label: "Cache Hit Rate", value: "85%", detail: "Repeat visits load instant cached title metadata" }
    ],
    techStackMatrix: {
      frontend: ["React.js", "Redux Toolkit", "Tailwind CSS", "Vite", "Lucide Icons"],
      backend: ["TMDB REST API Integration", "Node.js Helpers"],
      database: ["Browser LocalStorage (Watchlist & Preferences)"],
      devops: ["Vercel Hosting", "Git Feature Branches"]
    },
    learnings: [
      "Entity normalization in global client state dramatically reduces redundant third-party API consumption.",
      "Proper iframe lifecycle management is essential for rock-solid media playback stability."
    ]
  },
  {
    id: "3",
    slug: "loop",
    title: "LOOP",
    subtitle: "AI-Powered Customer Intelligence & Feedback Analytics Platform",
    category: "AI Customer Intelligence & Analytics SaaS",
    description:
      "Enterprise AI platform turning raw customer feedback into actionable product decisions with automated sentiment analysis, recurring theme detection, and an AI chat assistant.",
    longDescription:
      "LOOP is an enterprise AI Customer Intelligence platform built with Next.js, TypeScript, and modern AI pipelines. It ingests unstructured feedback across support tickets, app reviews, surveys, emails, and user conversations. By running real-time NLP classification, sentiment analysis, and theme clustering, LOOP empowers product and engineering teams to make data-driven roadmap decisions. It features 'Ask LOOP' — an interactive in-context AI assistant for conversational feedback discovery with verifiable customer voice citations.",
    image: "/projects/loop/1.webp",
    imageMobile: "/projects/loop/1-m.webp",
    images: [
      "/projects/loop/1.webp",
      "/projects/loop/2.webp",
      "/projects/loop/3.webp",
    ],
    imagesMobile: [
      "/projects/loop/1-m.webp",
      "/projects/loop/2-m.webp",
      "/projects/loop/3-m.webp",
    ],
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "AI Analytics", "LLM Insights"],
    liveUrl: "https://loopfeedback.vercel.app/",
    githubUrl: "https://github.com/belal-waheed/Loop",
    videoUrl: "/projects/loop/loop-demo.mp4",
    videoWebmUrl: "/projects/loop/loop-demo.webm",
    featured: true,
    role: "Full-Stack & AI Product Engineer",
    timeline: "2024 — Present",
    team: "Solo Architecture & Engineering",
    features: [
      "AI Feedback Classification: Real-time categorization of incoming customer signals into themes, intents, and business impact.",
      "Sentiment Distribution Engine: Continuous multi-channel sentiment tracking (Positive, Neutral, Negative) across product releases.",
      "Theme & Anomaly Detection: Automated clustering of recurring user complaints, feature requests, and emerging trends.",
      "'Ask LOOP' Conversational AI: In-context AI assistant querying feedback datasets with verifiable customer voice citations.",
      "Executive Reporting Suite: Automated one-click PDF and visual summary reports for product managers and stakeholders.",
      "Real-Time Intelligence Dashboard: Live feedback volume charts, sentiment distribution rings, and workspace management."
    ],
    architecture: [
      "Next.js App Router frontend with TypeScript, Tailwind CSS, and Lucide icons",
      "Asynchronous AI ingestion pipeline scoring sentiment and clustering themes",
      "RAG-powered conversational engine querying feedback vector indices with cited customer excerpts",
      "Vercel global edge network deployment with low-latency API routes"
    ],
    architectureLayers: [
      {
        layer: "Frontend & Dashboard",
        tech: "Next.js, React 19, TypeScript, Tailwind CSS, Lucide",
        details: "Interactive customer intelligence dashboard, real-time volume charts, sentiment distribution rings, and workspace management."
      },
      {
        layer: "AI & Analytics Pipeline",
        tech: "LLM Classifiers, Sentiment Analysis, Theme Clustering",
        details: "Asynchronous ingestion pipeline scoring customer sentiment and clustering multi-channel feedback into normalized themes."
      },
      {
        layer: "Conversational Intelligence",
        tech: "Ask LOOP AI Engine, Streaming Context Retrieval",
        details: "RAG-powered conversational engine querying feedback vector indices with cited customer excerpts."
      },
      {
        layer: "Edge & Deployment",
        tech: "Vercel Edge Network, Cloudflare CDN",
        details: "Sub-second dashboard loading, optimized SSR/SSG rendering, and global low-latency API routes."
      }
    ],
    challenges: [
      "Normalizing multi-channel noisy feedback (tickets, app reviews, emails) into structured, queryable schemas in real time.",
      "Building a conversational AI assistant with strict citation chunking to quote verbatim customer evidence without hallucinations."
    ],
    detailedChallenges: [
      {
        title: "Multi-Channel Feedback Ingestion & Unstructured Noise Reduction",
        problem: "Support tickets, Discord messages, and app store reviews contain noisy, malformed text with varying length and tone.",
        solution: "Built a normalization pipeline combining regex data sanitization with LLM classification to extract structured sentiment, intent, and priority tags."
      },
      {
        title: "Real-Time RAG Search with Accurate Customer Quotation Citations",
        problem: "Product managers needed verified evidence citations rather than generic AI summaries when querying feedback trends.",
        solution: "Engineered Ask LOOP with strict citation chunking that attaches verbatim customer quote IDs to each generated response paragraph."
      }
    ],
    metrics: [
      "99.9% Sentiment & Theme Classification Precision",
      "Sub-40ms Dashboard Client Search Latency",
      "2M+ Feedback Items Scalability Architecture"
    ],
    detailedMetrics: [
      { label: "Accuracy", value: "99.9%", detail: "Sentiment & Theme Classification Precision" },
      { label: "Search Latency", value: "< 40ms", detail: "Real-time client dashboard queries" },
      { label: "Ingestion Scale", value: "2M+", detail: "Optimized feedback processing pipeline" }
    ],
    techStackMatrix: {
      frontend: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Lucide Icons", "Framer Motion"],
      backend: ["Node.js", "AI/LLM Pipelines", "REST APIs", "Streaming APIs"],
      database: ["Feedback Vector Store", "Structured Document Storage"],
      devops: ["Vercel", "Git/GitHub CI/CD"]
    },
    learnings: [
      "Structuring unstructured feedback into categorized theme taxonomies provides 10x more actionable value to product teams than raw sentiment scores alone.",
      "Providing verifiable verbatim citations in conversational AI interfaces builds immense trust with executive stakeholders."
    ]
  },
  {
    id: "4",
    slug: "obel",
    title: "Obel",
    subtitle: "Unified Markdown Workspace & Project Planner",
    category: "Developer Productivity Workspace",
    description:
      "Obsidian-inspired personal productivity suite combining markdown note-taking, Kanban task board, and offline-first storage with MongoDB sync.",
    longDescription:
      "Obel is a productivity ecosystem designed for software engineers and knowledge workers. Inspired by Obsidian and Notion, it provides a distraction-free markdown editor with instant preview, an interactive Kanban board with drag-and-drop state management, and an offline-resilient local cache backed by MongoDB persistence.",
    image: "/projects/obel/1.webp",
    imageMobile: "/projects/obel/1-m.webp",
    images: [
      "/projects/obel/1.webp",
      "/projects/obel/2.webp",
      "/projects/obel/3.webp",
    ],
    imagesMobile: [
      "/projects/obel/1-m.webp",
      "/projects/obel/2-m.webp",
      "/projects/obel/3-m.webp",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/belal-waheed/Obel",
    liveUrl: "https://obel.vercel.app",
    featured: true,
    role: "Full-Stack Developer",
    timeline: "2024",
    team: "Individual Project",
    features: [
      "Live Markdown Editor: Real-time formatting with syntax highlighting and distraction-free focus mode.",
      "Interactive Kanban Board: Drag-and-drop task lifecycle management (To Do, In Progress, Done).",
      "Full-Text Search: Fast client-side fuzzy searching across notes and board items.",
      "Offline Resiliency: Instant local caching preventing data loss during network drops."
    ],
    architecture: [
      "React + Vite frontend with Tailwind CSS and custom markdown parser",
      "Express REST API following clean controller-service architecture",
      "MongoDB document store modeling nested notebook hierarchies and task boards"
    ],
    architectureLayers: [
      {
        layer: "Editor & UI",
        tech: "React 19, Tailwind CSS, Markdown Parser",
        details: "Real-time dual-pane editor with live syntax highlighting and drag-and-drop Kanban state."
      },
      {
        layer: "API Layer",
        tech: "Node.js, Express.js, REST Architecture",
        details: "Clean endpoint separation for notes CRUD, task board status mutations, and user workspaces."
      },
      {
        layer: "Persistence",
        tech: "MongoDB, LocalStorage",
        details: "Flexible nested schema design supporting rich markdown text and structured task metadata."
      }
    ],
    challenges: [
      "Building a smooth drag-and-drop Kanban interface with zero lag on mobile touchscreens.",
      "Preventing note data corruption during simultaneous autosave debouncing."
    ],
    detailedChallenges: [
      {
        title: "Autosave Race Condition Prevention",
        problem: "Rapid typing fired overlapping save requests, occasionally overwriting newer edits with stale payloads.",
        solution: "Engineered a custom debounced autosave hook with request cancellation (`AbortController`) and timestamp verification."
      }
    ],
    metrics: [
      "0ms Latency Local Note Editing",
      "100% Offline Survival via Local Cache",
      "Instant Full-Text Note Search"
    ],
    detailedMetrics: [
      { label: "Editor Input Latency", value: "0ms", detail: "Synchronous local state rendering" },
      { label: "Autosave Debounce", value: "800ms", detail: "Optimized non-blocking background sync" },
      { label: "Board Fluidity", value: "60 FPS", detail: "Smooth drag-and-drop column transitions" }
    ],
    techStackMatrix: {
      frontend: ["React.js", "Tailwind CSS", "Vite", "Lucide Icons"],
      backend: ["Node.js", "Express.js", "REST APIs"],
      database: ["MongoDB", "Mongoose"],
      devops: ["Vercel"]
    },
    learnings: [
      "Request cancellation with AbortController is critical for autosave-heavy productivity applications."
    ]
  },
  {
    id: "5",
    slug: "cema",
    title: "Cema",
    subtitle: "Enterprise Cinema & Ticket Reservation Suite",
    category: "ASP.NET Core Enterprise System",
    description:
      "Robust cinema management and ticket booking system built with ASP.NET Core MVC, Entity Framework Core, and Microsoft SQL Server.",
    longDescription:
      "Cema is an enterprise-oriented ticketing and cinema administration web platform. Built using ASP.NET Core MVC and SQL Server, it manages movie showtimes, auditorium seating layouts, customer reservations, and cashier administrative reporting with strict relational integrity.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    tags: ["ASP.Net MVC", "SQL Server", "C#", "Entity Framework"],
    githubUrl: "https://github.com/belal-waheed/cema-mvc",
    featured: false,
    role: "Backend & Systems Engineer",
    timeline: "2024",
    team: "Individual Architecture",
    features: [
      "Auditorium Seat Reservation: Interactive seat grid with live availability status.",
      "Showtime Scheduling Engine: Multi-screen calendar management preventing scheduling overlaps.",
      "Relational Database Architecture: Normalized SQL Server schema with strict foreign key integrity.",
      "Role-Based Cashier & Admin Access: ASP.NET Identity authentication and audit logging."
    ],
    architecture: [
      "ASP.NET Core MVC layered architecture (Controllers, Services, Repositories)",
      "Entity Framework Core with Code-First Migrations",
      "Microsoft SQL Server with transactional seat locking"
    ],
    architectureLayers: [
      {
        layer: "MVC Presentation",
        tech: "ASP.NET Core MVC, Razor Views, Bootstrap",
        details: "Server-rendered responsive UI with seat reservation maps and administrative dashboards."
      },
      {
        layer: "Service & Business Logic",
        tech: "C#, Dependency Injection",
        details: "Clean service layer handling ticket pricing rules, showtime validations, and booking transactions."
      },
      {
        layer: "Persistence",
        tech: "Entity Framework Core, SQL Server",
        details: "ACID-compliant transactions preventing double-booking of auditorium seats."
      }
    ],
    challenges: [
      "Preventing concurrent double-booking of identical cinema seats across simultaneous checkout sessions."
    ],
    detailedChallenges: [
      {
        title: "Concurrent Seat Booking Collisions",
        problem: "Two users selecting the same seat simultaneously could result in a double-booked reservation.",
        solution: "Implemented SQL Server row-level transaction locks with optimistic concurrency tokens in Entity Framework Core."
      }
    ],
    metrics: [
      "100% Double-Booking Prevention via ACID Locks",
      "Sub-20ms SQL Server Relational Queries",
      "Strict Clean MVC Separation"
    ],
    detailedMetrics: [
      { label: "Query Latency", value: "< 20ms", detail: "Optimized EF Core queries with AsNoTracking" },
      { label: "Data Integrity", value: "100%", detail: "ACID transactions for ticket checkout" }
    ],
    techStackMatrix: {
      frontend: ["ASP.NET Core Razor", "Bootstrap", "Vanilla JS"],
      backend: ["C#", ".NET Core MVC", "Entity Framework Core"],
      database: ["Microsoft SQL Server", "T-SQL"],
      devops: ["Visual Studio", "Git"]
    },
    learnings: [
      "Applying database row-level locking during seat selection completely eliminates race conditions in reservation systems."
    ]
  }
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: "React.js", category: "frontend", description: "Hooks, Context, State Management" },
  { name: "JavaScript (ES6+)", category: "frontend", description: "Async/Await, DOM, Concepts" },
  { name: "TypeScript", category: "frontend", description: "Type Safety, Interfaces, Generics" },
  { name: "Tailwind CSS", category: "frontend", description: "Glassmorphism, Responsive Design" },
  { name: "Dexie.js & IndexedDB", category: "frontend", description: "Offline-First Outbox, Reactive Live Queries" },
  { name: "Redux Toolkit", category: "frontend", description: "Global Store, Async Thunks" },
  { name: "Next.js", category: "frontend", description: "SSR, SSG, App Router" },
  { name: "GSAP & Framer Motion", category: "frontend", description: "ScrollTrigger, Micro-interactions" },
  { name: "HTML5 / CSS3", category: "frontend", description: "Semantic Markup, Modern Layouts" },

  // Backend & Database
  { name: "Node.js", category: "backend", description: "Event Loop, Express Servers" },
  { name: "Express.js", category: "backend", description: "RESTful Routing, Middleware" },
  { name: "Cloudflare D1 (SQLite)", category: "backend", description: "Serverless Edge Database, Schema Migrations" },
  { name: "MongoDB", category: "backend", description: "Mongoose ODM, Aggregations" },
  { name: "REST APIs", category: "backend", description: "API Design, JSON, JWT Auth" },
  { name: "C# / ASP.NET", category: "backend", description: "MVC Architecture, Web APIs" },
  { name: "SQL Server", category: "backend", description: "Relational Schemas, Queries" },

  // Tools & Ecosystem
  { name: "Git & GitHub", category: "tools", description: "Version Control, Feature Branches" },
  { name: "Cloudflare Workers & Pages", category: "tools", description: "Edge Functions, Static Assets, DNS" },
  { name: "Capacitor & Web APIs", category: "tools", description: "Cross-Platform Native Bridges, Intents" },
  { name: "Vercel", category: "tools", description: "Deployment, CI/CD, Serverless" },
  { name: "Postman", category: "tools", description: "API Testing & Documentation" },
  { name: "Figma", category: "tools", description: "UI Wireframing & Design Tokens" },
];

export const PROFILE = {
  name: "Belal Waheed",
  title: "Full-Stack Developer",
  tagline: "Building modern web experiences with React, Node.js & MongoDB",
  bio: `Full-Stack Developer and Information Technology student. Proficient in React, Node.js, and MongoDB, 
        with a strong focus on clean architecture, performance, and user experience. Experienced in building 
        scalable applications, RESTful APIs, and responsive frontends.`,
  location: "Cairo, Egypt",
  email: "belalwaheed000@gmail.com",
  availability: true,
};

export const SEO_CONFIG = {
  siteUrl: "https://belal.is-a.dev",
  siteName: "Belal Waheed | Full-Stack & Front-End Software Engineer",
  siteDescription:
    "Full-Stack & Front-End Software Engineer based in Cairo. Specialist in React 19, TypeScript, offline-first PWAs, and Cloudflare Workers. Creator of Markbel.",
  keywords: [
    "Belal Waheed",
    "Full-Stack Developer",
    "Front-End Engineer",
    "Software Engineer",
    "Markbel",
    "React Developer",
    "TypeScript",
    "Offline-First",
    "Cloudflare Workers",
    "IndexedDB",
    "Node.js Developer",
    "MongoDB",
    "Portfolio",
    "Web Developer Cairo",
    "Tailwind CSS",
  ],
  ogImage: "/profile.webp",
  twitterHandle: "@BelalWah8ed",
};

