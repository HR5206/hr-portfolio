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
};

export const hrProjects = [
  {
    id: "helpdesk", title: "Multi-Agent IT Helpdesk", category: "Agent systems",
    stack: ["Python", "OpenEnv", "Reinforcement learning"],
    summary: "An environment where agents route IT tickets through three support tiers.",
    decision: "I scored each routing decision against the SLA target, resolution time, success, and escalation cost. A third-tier fix goes into a shared knowledge base so the first two tiers can reuse it when the same incident returns.",
    context: "Meta × Scaler AI Hackathon",
    repository: "https://github.com/HR5206/HelpdeskEnv",
  },
  {
    id: "fault-lab", title: "Fault Lab", category: "HTTP tooling",
    stack: ["TypeScript", "Node.js", "Express"],
    summary: "An HTTP simulator for replaying failure scenarios from JSON.",
    decision: "I assign each request its response step as soon as it arrives. A later request can finish while an earlier one is delayed. The live view records timings and disconnects, and 11 tests cover replay, concurrency, and resets during pending requests.",
    context: "11 automated tests",
    repository: null,
  },
  {
    id: "checkpoint", title: "Checkpoint", category: "Developer tools",
    stack: ["TypeScript", "Node.js", "SHA-256"],
    summary: "A CLI for saving folder snapshots, comparing changes, and restoring files.",
    decision: "I store file contents by SHA-256 hash, so a rename can reuse the same bytes. Restore verifies the hash and byte count before writing to a new directory. I tested recovery, corrupted objects, and unsafe paths in 12 end-to-end tests.",
    context: "12 end-to-end tests",
    repository: null,
  },
];

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
