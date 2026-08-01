/**
 * Single source of truth for every piece of portfolio content.
 * Sections read from here — nothing is hardcoded in JSX.
 */

export const driver = {
  name: 'ARPAN MUKHERJEE',
  first: 'ARPAN',
  last: 'MUKHERJEE',
  number: '71',
  code: 'MUK',
  subtitle: 'Full Stack · Cloud · DevOps · AI',
  nationality: 'India',
  flagCode: 'IN',
  team: 'Team CHRIST MCA',
  secondTeam: 'The Flying Panda',
  careerStart: '2022-01-01T00:00:00',
  currentLap: '2026',
  gapToLeader: 'Always learning…',
  photo: 'profile.jpg',
};

export const stats = [
  { label: 'Languages', value: 7 },
  { label: 'Projects', value: 15 },
  { label: 'Hackathons Won', value: 1 },
  { label: 'Papers Published', value: 1 },
];

/** Race engineer's notes — how the driver actually works. */
export const engineerNotes = [
  'I start at the data layer. Schemas, indexes and access patterns first, because every performance problem I have chased eventually led back to a model that was wrong on day one.',
  'I ship to containers by default. If it does not run the same on my machine and in CI, it is not finished — Docker, a pipeline and a health check are part of the feature, not a follow-up ticket.',
  'Security is a lap-time cost I am willing to pay. OWASP checks, dependency and image scanning, and static analysis run in the pipeline rather than in a review meeting.',
  'I use AI where it earns its place — NLP and LLM calls behind a real interface with real fallbacks, not a chatbot bolted onto a homepage.',
];

/**
 * The garage: everything in the toolbox, grouped by bay.
 * Compound = how hot it is running right now (see compoundLegend).
 */
export const techInventory = [
  {
    bay: 'Languages',
    compound: 'soft',
    items: ['JavaScript', 'TypeScript', 'Python', 'Go', 'Java', 'Kotlin', 'SQL'],
  },
  {
    bay: 'Backend & APIs',
    compound: 'soft',
    items: ['Node.js', 'Express', 'Prisma', 'REST', 'WebSockets', 'Socket.io'],
  },
  {
    bay: 'Cloud & Infrastructure',
    compound: 'soft',
    items: ['GCP', 'AWS', 'Docker', 'Docker Compose', 'Kubernetes', 'Terraform', 'Vercel'],
  },
  {
    bay: 'Data & Storage',
    compound: 'medium',
    items: ['PostgreSQL', 'MongoDB', 'Supabase', 'Schema Design', 'Pandas', 'NumPy'],
  },
  {
    bay: 'AI & NLP',
    compound: 'soft',
    items: ['NLP', 'LLM Integration', 'Machine Learning'],
  },
  {
    bay: 'Security & DevSecOps',
    compound: 'medium',
    items: ['OWASP Top 10', 'Trivy', 'SonarCloud', 'CI/CD Pipelines', 'Dependency Scanning'],
  },
  {
    bay: 'Frontend',
    compound: 'medium',
    items: ['React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    bay: 'Ways of Working',
    compound: 'hard',
    items: ['Agile', 'MoSCoW Prioritisation', 'Git', 'Backlog Grooming', 'Android Studio'],
  },
];

/**
 * TODO(arpan): fill in `detail` for the paper and add any certifications —
 * these are the only entries on the site I could not source.
 */
export const trophies = [
  {
    icon: '🥇',
    title: 'Internal Smart India Hackathon — Winner',
    detail: 'Mining Chatbot 2.0, an NLP assistant for the mining industry. CHRIST University, 2025.',
    accent: 'red',
  },
  {
    icon: '📄',
    title: 'Published Research Paper',
    detail: 'Paper title and venue to be added.',
    accent: 'teal',
    placeholder: true,
  },
  {
    icon: '💰',
    title: 'JP Morgan Chase — Advanced Software Engineering',
    detail: 'Forage virtual experience on the Midas financial platform and its transaction pipeline.',
    accent: 'teal',
  },
  {
    icon: '🎓',
    title: 'BCA — CGPA 8.56',
    detail: 'Amity University, Raipur. 2022 — 2025.',
    accent: 'red',
  },
];

/**
 * Tyre compound legend:
 *   soft   — cutting-edge, running now
 *   medium — proficient, dependable race pace
 *   hard   — fundamentals, goes the distance
 */
export const tyreSkills = [
  { label: 'Cloud & Container Orchestration', compound: 'soft', level: 88 },
  { label: 'Backend & API Engineering', compound: 'soft', level: 94 },
  { label: 'AI / NLP Integration', compound: 'soft', level: 80 },
  { label: 'CI/CD & DevSecOps', compound: 'medium', level: 76 },
  { label: 'Frontend & Realtime UI', compound: 'medium', level: 72 },
  { label: 'Data Structures & Algorithms', compound: 'hard', level: 85 },
  { label: 'Databases & Schema Design', compound: 'hard', level: 82 },
];

export const compoundLegend = [
  { compound: 'soft', name: 'Soft', meaning: 'Cutting-edge' },
  { compound: 'medium', name: 'Medium', meaning: 'Proficient' },
  { compound: 'hard', name: 'Hard', meaning: 'Fundamentals' },
];

export const calendar = [
  {
    round: 'R01',
    city: 'Bengaluru',
    country: 'India',
    flagCode: 'IN',
    venue: 'CHRIST University',
    role: 'Master of Computer Applications',
    period: '2025 — 2027',
    status: 'IN PROGRESS',
    notes: [
      'Postgraduate coursework in advanced software engineering and distributed systems',
      'Internal Smart India Hackathon winner — Mining Chatbot 2.0, an NLP assistant for mining operations',
      'Research paper published alongside coursework',
      'Where the Procto proctoring platform grew from a course project into its third iteration',
    ],
  },
  {
    round: 'R02',
    city: 'London',
    country: 'United Kingdom',
    flagCode: 'GB',
    venue: 'The Flying Panda',
    role: 'Business Systems Analyst Intern',
    period: '2025 — Present',
    status: 'RUNNING',
    notes: [
      'Designed the CRM data schema underpinning customer records and pipeline stages',
      'Ran an Agile backlog with MoSCoW prioritisation across delivery cycles',
      'Diagnosed and fixed a production race condition in concurrent record updates',
      'First role where requirements analysis mattered as much as the code that followed',
    ],
  },
  {
    round: 'R03',
    city: 'Bilaspur',
    country: 'India',
    flagCode: 'IN',
    venue: 'South Eastern Coalfields Ltd. (SECL)',
    role: 'Industrial Intern',
    period: '2024',
    status: 'CLASSIFIED',
    notes: [
      'Industrial training inside a large-scale public sector mining operation',
      'Exposure to the operational data flows that later shaped Mining Chatbot 2.0',
    ],
  },
  {
    round: 'R04',
    city: 'Raipur',
    country: 'India',
    flagCode: 'IN',
    venue: 'Amity University',
    role: 'Bachelor of Computer Applications',
    period: '2022 — 2025',
    status: 'CGPA 8.56',
    notes: [
      'Graduated with a CGPA of 8.56',
      'Foundation in data structures, algorithms, networks and databases',
      'Built the first shipped projects — Android, P2P systems and web platforms',
    ],
  },
];

export const standings = [
  {
    position: 1,
    constructor: 'Backend',
    compound: 'soft',
    points: 94,
    tech: ['Node.js', 'Express', 'Go', 'Python'],
  },
  {
    position: 2,
    constructor: 'Cloud & DevOps',
    compound: 'soft',
    points: 88,
    tech: ['GCP', 'AWS', 'Docker', 'Kubernetes', 'Terraform'],
  },
  {
    position: 3,
    constructor: 'AI & NLP',
    compound: 'soft',
    points: 80,
    tech: ['NLP', 'Pandas', 'NumPy', 'LLM Integration'],
  },
  {
    position: 4,
    constructor: 'Security',
    compound: 'medium',
    points: 74,
    tech: ['OWASP', 'Trivy', 'SonarCloud', 'DevSecOps'],
  },
  {
    position: 5,
    constructor: 'Frontend',
    compound: 'medium',
    points: 70,
    tech: ['React', 'Next.js', 'TypeScript', 'Socket.io'],
  },
];

/**
 * NOTE: descriptions marked `needsCopy: true` were written from the repository's
 * visible structure (folders, language, deployment target) because the repo has
 * no README. Replace the blurb with your own words when you get a minute.
 */
export const projects = [
  {
    medal: '🥇',
    name: 'Mining Chatbot 2.0',
    subtitle: 'AI-Powered Industry Assistant',
    badge: 'SIH 2025 WINNER',
    fastestLap: true,
    blurb:
      'An AI assistant for the mining industry that answers domain-specific operational queries using natural language processing. Won the Internal Smart India Hackathon.',
    stack: ['Python', 'NLP', 'AI'],
    github: 'https://github.com/Arpan7125/chatbot2.0',
  },
  {
    name: 'PROCTO 3.0',
    subtitle: 'Secure Proctoring Platform',
    blurb:
      'Online examination monitoring platform with hardened authentication, session integrity checks and a containerised deployment path. Third iteration of the Procto line.',
    stack: ['TypeScript', 'Node.js', 'Prisma', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/Arpan7125/procto-3.0',
  },
  {
    name: 'CyberSentinel',
    subtitle: 'Security Tooling Platform',
    badge: 'LATEST',
    needsCopy: true,
    blurb:
      'Full-stack security project split into a separate backend and frontend and brought up together through Docker Compose. The most recently active build on the grid.',
    stack: ['JavaScript', 'Docker Compose', 'Node.js'],
    github: 'https://github.com/Arpan7125/CyberSentinel',
  },
  {
    name: 'CloudSentinel-Z3',
    subtitle: 'Cloud Monitoring Service',
    needsCopy: true,
    blurb:
      'Python web service built around a WSGI entrypoint and deployed to Vercel — a cloud-hosted counterpart to the Sentinel line.',
    stack: ['Python', 'WSGI', 'Vercel'],
    github: 'https://github.com/Arpan7125/CloudSentinel-Z3',
    live: 'https://cloud-sentinel-z3.vercel.app',
  },
  {
    name: 'Rayeva-AI',
    subtitle: 'AI Application',
    needsCopy: true,
    blurb:
      'JavaScript application built around an AI/LLM workflow.',
    stack: ['JavaScript', 'LLM Integration'],
    github: 'https://github.com/Arpan7125/Rayeva-AI',
  },
  {
    name: 'AIML',
    subtitle: 'Machine Learning Coursework',
    needsCopy: true,
    blurb:
      'Working repository for AI and machine learning experiments and notebooks.',
    stack: ['Python', 'ML', 'HTML'],
    github: 'https://github.com/Arpan7125/AIML',
  },
  {
    name: 'DevOps Pipeline',
    subtitle: 'CI/CD & Automation',
    needsCopy: true,
    blurb:
      'Sandbox for build, test and deployment automation — the practical side of the Cloud & DevOps constructor.',
    stack: ['JavaScript', 'CI/CD', 'Docker'],
    github: 'https://github.com/Arpan7125/devops',
  },
  {
    name: 'VC Sourcing App',
    subtitle: 'Deal Flow Tooling',
    needsCopy: true,
    blurb:
      'TypeScript application for sourcing and tracking venture deal flow.',
    stack: ['TypeScript', 'React'],
    github: 'https://github.com/Arpan7125/vc-sourcing-app',
  },
  {
    name: 'Car-App',
    subtitle: 'Native Android',
    needsCopy: true,
    blurb:
      'Kotlin Android application — the mobile entry on the grid.',
    stack: ['Kotlin', 'Android'],
    github: 'https://github.com/Arpan7125/Car-App',
  },
  {
    name: 'UberClone',
    subtitle: 'Realtime Ride Hailing',
    blurb:
      'Ride-hailing system with live driver tracking over websockets, GPS-based matching and a realtime trip state machine shared between rider and driver.',
    stack: ['Node.js', 'React', 'Socket.io', 'GPS'],
    github: null,
  },
  {
    name: 'P2P Academic Platform',
    subtitle: 'Decentralised Resource Sharing',
    blurb:
      'Peer-to-peer academic library written in Go. Students transfer resources directly between nodes with no central server holding the files.',
    stack: ['Go', 'P2P Networking', 'Distributed Systems'],
    github: 'https://github.com/Arpan7125/Pear-to-pear-academic',
  },
  {
    name: 'Vehicle Management System',
    subtitle: 'Fleet Records & Scheduling',
    blurb:
      'Fleet management backend covering vehicle registration, service scheduling and document expiry tracking with a document-oriented data model.',
    stack: ['Node.js', 'Express', 'MongoDB'],
    github: null,
  },
  {
    name: 'Upside Down Communicator',
    subtitle: 'Tactical Cipher System',
    fastestLap: true,
    blurb:
      'A Stranger Things–inspired communication rig with six cipher modes — Morse, Christmas Lights, Binary Grid, Audio Waveform, Ancient Glyphs and Portal Pulse — built on a military HUD aesthetic with CRT effects.',
    stack: ['JavaScript', 'Web Audio API', 'CSS3'],
    github: 'https://github.com/Arpan7125/-UPSIDE-DOWN-COMMUNICATOR-',
  },
  {
    name: 'Revelation',
    subtitle: 'Native Android Application',
    blurb:
      'Native Android app built in Android Studio, applying modern UI patterns and a structured app architecture on the mobile stack.',
    stack: ['Android', 'Java / Kotlin'],
    github: 'https://github.com/Arpan7125/Revelation-android-studio',
  },
  {
    name: 'JPMC Forage — Midas',
    subtitle: 'Advanced Software Engineering',
    blurb:
      'JP Morgan Chase Advanced Software Engineering virtual experience, working the Midas financial platform and its transaction processing pipeline.',
    stack: ['Software Engineering', 'Finance'],
    github: 'https://github.com/Arpan7125/forage-midas',
  },
];

export const channels = [
  {
    icon: '📡',
    label: 'LinkedIn',
    handle: 'arpan-mukherjee',
    href: 'https://www.linkedin.com/in/arpan-mukherjee-3501b924b',
  },
  {
    icon: '💻',
    label: 'GitHub',
    handle: 'Arpan7125',
    href: 'https://github.com/Arpan7125',
  },
  {
    icon: '📧',
    label: 'Email',
    handle: 'arpanmmukherjeee7125@gmail.com',
    href: 'mailto:arpanmmukherjeee7125@gmail.com',
  },
];

export const contactEmail = 'arpanmmukherjeee7125@gmail.com';

/**
 * Photo / video backdrops. Every value is null until a file exists in
 * public/media/ — MediaBackdrop renders nothing for a null pair, so the site
 * looks exactly as it does now and makes zero failed requests.
 *
 * To switch one on, drop the file in public/media/ and set the path, e.g.
 *   hero: { video: 'media/hero-track.mp4', poster: 'media/hero-track.jpg', opacity: 0.28 }
 *
 * Licensing: use only footage you own or that carries a free commercial
 * licence (Pexels / Pixabay / Unsplash). Official F1 broadcast footage, press
 * photography and sponsor-bearing team liveries are copyrighted — see
 * public/media/README.md.
 */
export const media = {
  hero: { video: null, poster: null, opacity: 0.26, scrim: 'radial' },
  // No calendar entry: that section is pinned by ScrollTrigger and an extra
  // absolutely-positioned layer inside the pin container skews its measurements.
  results: { video: null, poster: null, opacity: 0.14, scrim: 'flat' },
  trophies: { video: null, poster: null, opacity: 0.16, scrim: 'flat' },
  radio: { video: null, poster: null, opacity: 0.14, scrim: 'flat' },
};

export const sections = [
  { id: 'hero', label: 'Grid' },
  { id: 'driver', label: 'Driver' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'standings', label: 'Standings' },
  { id: 'garage', label: 'Garage' },
  { id: 'results', label: 'Results' },
  { id: 'trophies', label: 'Trophies' },
  { id: 'radio', label: 'Radio' },
];
