export const PROJECT_CATEGORIES = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
  "Tools",
];

export const PROJECTS = [
  {
    id: "commerce-os",
    title: "CommerceOS",
    description:
      "A headless e-commerce platform with a real-time inventory engine, admin dashboard, and Stripe-based checkout.",
    category: "Full Stack",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redis"],
    features: [
      "Real-time inventory sync across warehouses",
      "Role-based admin dashboard",
      "Server-driven cart and checkout flow",
    ],
    github: "https://github.com",
    demo: "https://stylytn.netlify.app",
    status: "Live",
    date: "2025",
    featured: true,
  },
  {
    id: "pulse-analytics",
    title: "Pulse Analytics",
    description:
      "A self-hosted product analytics dashboard with event pipelines, funnels, and cohort retention charts.",
    category: "Full Stack",
    technologies: ["React", "Express", "PostgreSQL", "D3.js"],
    features: [
      "Custom event pipeline with batching",
      "Funnel and retention visualizations",
      "Team workspaces with shareable reports",
    ],
    github: "https://github.com",
    demo: "https://example.com",
    status: "Live",
    date: "2024",
    featured: true,
  },
  {
    id: "syncboard",
    title: "SyncBoard",
    description:
      "A real-time collaborative kanban board with optimistic UI updates and offline support.",
    category: "Frontend",
    technologies: ["React", "WebSockets", "Zustand", "IndexedDB"],
    features: [
      "Live multiplayer cursors",
      "Offline-first with background sync",
      "Drag-and-drop with keyboard support",
    ],
    github: "https://github.com",
    demo: "https://example.com",
    status: "Live",
    date: "2024",
    featured: true,
  },
  {
    id: "authforge",
    title: "AuthForge",
    description:
      "A drop-in authentication microservice with JWT rotation, rate limiting, and audit logging.",
    category: "Backend",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Redis"],
    features: [
      "Refresh token rotation",
      "Configurable rate limiting per route",
      "Full audit trail for auth events",
    ],
    github: "https://github.com",
    demo: "",
    status: "Live",
    date: "2023",
    featured: false,
  },
  {
    id: "devcli",
    title: "devcli",
    description:
      "A CLI that scaffolds full stack projects with opinionated linting, testing, and CI configs.",
    category: "Tools",
    technologies: ["Node.js", "Commander.js", "npm"],
    features: [
      "Interactive project scaffolding",
      "Built-in lint/test/CI presets",
      "Plugin system for custom templates",
    ],
    github: "https://github.com",
    demo: "",
    status: "In Progress",
    date: "2025",
    featured: false,
  },
  {
    id: "loopfolio",
    title: "This Portfolio",
    description:
      "This site — a Next.js portfolio with a custom admin dashboard for managing every piece of content.",
    category: "Full Stack",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Express", "MongoDB"],
    features: [
      "Framer Motion micro-interactions throughout",
      "JWT-protected admin dashboard",
      "Full CRUD content management",
    ],
    github: "https://github.com",
    demo: "https://example.com",
    status: "Live",
    date: "2026",
    featured: false,
  },
];
