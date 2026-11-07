export const hrProfile = {
  name: "Harish Raghav",
  fullName: "Harish Raghav S",
  initials: "HR",
  signature: "hrv",
  edition: "2026",
  location: "Hosur, Tamil Nadu",
  email: "harishraghav256@gmail.com",
  github: "https://github.com/HR5206/",
  linkedin: "https://www.linkedin.com/in/harishraghav5/",
  resume: "/resume/Harish-Raghav-S-Resume.pdf",
  // The apex domain currently redirects to www on the live Vercel site.
  siteUrl: "https://www.harishraghav.dev",
  introduction: "I study computer science at SASTRA and graduate in August 2028.",
  interests: "I’m interested in backend systems and developer tools, and I’m looking for a software engineering internship.",
};

export const hrProjects = [
  {
    id: "fault-lab", title: "Fault Lab", category: "HTTP tooling",
    stack: ["TypeScript", "Node.js", "Express"],
    summary: "Repeatable HTTP failures for testing timeouts, retries, and recovery.",
    decision: "Each request gets its response step on arrival, before a delay starts. A later request can finish while an earlier one is waiting. Reset begins a new run without changing responses that are already pending.",
    context: "11 automated tests · local monitor and retry demo",
    repository: "https://github.com/HR5206/fault-lab",
  },
  {
    id: "checkpoint", title: "Checkpoint", category: "Developer tools",
    stack: ["TypeScript", "Node.js", "SHA-256"],
    summary: "Local folder snapshots, file comparisons, and verified restores into a fresh directory.",
    decision: "File contents are stored by SHA-256 hash, so equal bytes can be reused across snapshots and filenames. Restore checks each object’s hash and size before claiming a new destination. It refuses to overwrite an existing folder.",
    context: "12 end-to-end tests · repeatable recovery demo",
    repository: "https://github.com/HR5206/checkpoint-cli",
  },
  {
    id: "helpdesk", title: "Multi-Agent IT Helpdesk", category: "Agent systems",
    stack: ["Python", "OpenEnv", "Reinforcement learning"],
    summary: "A simulated support queue for exploring triage, escalation, and reusable fixes.",
    decision: "A triage agent routes tickets through three support tiers. Graders score triage, resolution, response quality, step-based SLA efficiency, and knowledge-base contributions. Accepted L3 articles remain available to later episodes.",
    context: "Meta × Scaler AI Hackathon · simulated ticket environment",
    repository: "https://github.com/HR5206/HelpdeskEnv",
  },
] as const;

export type ProjectId = (typeof hrProjects)[number]["id"];

export const hrFiles = [
  { id: "about", label: "about.txt", symbol: ".txt", kind: "file", path: "/home/harish/about.txt", status: "Plain text / UTF-8", hint: "Introduction" },
  { id: "projects", label: "projects", symbol: "/", kind: "folder", path: "/home/harish/projects/", status: hrProjects.length + " project files", hint: "Selected work" },
  { id: "resume", label: "resume.pdf", symbol: ".pdf", kind: "file", path: "/home/harish/resume.pdf", status: "Résumé / PDF", hint: "Education & experience" },
  { id: "skills", label: "skills.txt", symbol: ".txt", kind: "file", path: "/home/harish/skills.txt", status: "Plain text / UTF-8", hint: "Languages & tools" },
  { id: "contact", label: "contact.txt", symbol: "@", kind: "file", path: "/home/harish/contact.txt", status: "Plain text / UTF-8", hint: "Email & profiles" },
] as const;

export type HRFile = (typeof hrFiles)[number];
export type HRAppId = HRFile["id"];

export const education = {
  school: "Shanmugha Arts, Science, Technology and Research Academy (SASTRA)",
  degree: "B.Tech. in Computer Science Engineering",
  place: "Thanjavur, Tamil Nadu",
  graduation: "Expected August 2028",
  cgpa: "8.41",
  coursework: "Data Structures, Algorithms, Object-Oriented Programming",
};

export const experience = [
  { role: "Web Developer", team: "Team 1nf1n1ty", location: "Thanjavur", dates: "Oct 2024 – Present",
    notes: "Built and deployed the club’s orientation website in HTML, CSS, and JavaScript. I gathered requirements from the organizers and revised the responsive components after peer review." },
  { role: "Google Student Ambassador", team: "Google", location: "Remote", dates: "Aug 2025 – Jan 2026",
    notes: "One of three ambassadors selected to represent SASTRA. I organized hands-on Gemini AI events for students and coordinated outreach with ambassadors at other universities." },
];

export const skills = [
  ["Languages", "TypeScript, JavaScript, Java, Python, C++, SQL"],
  ["Web & databases", "Node.js, Express.js, Next.js, Django, HTML, CSS, MySQL"],
  ["Systems", "HTTP, concurrency, file I/O, SHA-256 hashing, content deduplication"],
  ["Tools & testing", "Git, node:test, HTTP integration testing, end-to-end testing"],
  ["Cloud", "AWS Lambda, DynamoDB, EventBridge Scheduler"],
] as const;

export const certificates = [
  "Data Management and Storage in the Cloud",
  "Introduction to Data Analytics in Google Cloud",
];
