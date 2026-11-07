import type { ProjectId } from "./hr-portfolio";

type ProjectNotes = {
  purpose: string;
  decisions: { title: string; explanation: string }[];
  verification: string;
  limitations: string[];
  example: { title: string; code: string; caption: string };
  sources: { label: string; url: string }[];
};

// Longer notes stay in the server-rendered project routes, outside the desktop bundle.
// Evidence links use the revisions inspected for these notes, not a moving main branch.
export const projectNotes: Record<ProjectId, ProjectNotes> = {
  "fault-lab": {
    purpose: "A healthy endpoint doesn’t tell me much about a retry loop. I want to repeat the same failure sequence, change the client, and see whether it handles the slow response differently.",
    decisions: [
      { title: "Assign a response before waiting", explanation: "A method/path pair has its own request counter. The Express handler reserves the next step immediately, then starts any delay. Request four can finish while request three is still waiting; a slow request does not serialize the queue." },
      { title: "Keep reset behavior explicit", explanation: "Reset clears counters and begins a new run. Requests already in flight keep their selected response and original run number. The journal can therefore show a pending request from the previous experiment alongside the new one." },
      { title: "Separate a planned response from a delivered one", explanation: "When a client disconnects, its timer is cleared and the journal marks the request as disconnected. The consumed step is not put back. A server finishing a write is also not proof that a remote client processed it." },
    ],
    verification: "The 11 automated tests passed on Node.js 24.22.1 during the November 2026 review. They exercise real HTTP requests, overlapping responses, reset during a pending request, disconnections, validation, and the 200-entry journal limit. The local monitor demo also reproduced one incident, one recovery, and a successful retry after a timeout.",
    limitations: [
      "One process runs one active scenario. Counters and the request journal are in memory and disappear on restart.",
      "This simulates configured HTTP responses and delays. It does not reproduce every network failure or model production traffic.",
      "A timed-out write may already have happened. Retrying writes needs an idempotent design; the supplied retry demo uses a read-only GET.",
    ],
    example: {
      title: "Run the local experiment",
      code: "git clone https://github.com/HR5206/fault-lab.git\ncd fault-lab\nnpm ci\nnpm run check\nnpm test\nnpm run demo",
      caption: "Use Node.js 24.12 or newer. The demo starts and stops its own local server; it needs no AWS account or API key. Its bounded retry sequence is 503 → 503 → TIMEOUT → 200.",
    },
    sources: [
      { label: "Request assignment and reset", url: "https://github.com/HR5206/fault-lab/blob/f399ca191e20c808eb62c4fa15aa475a064e48cb/src/server.mts" },
      { label: "HTTP integration tests", url: "https://github.com/HR5206/fault-lab/blob/f399ca191e20c808eb62c4fa15aa475a064e48cb/test/fault-lab.test.mts" },
      { label: "Monitor and retry demo", url: "https://github.com/HR5206/fault-lab/blob/f399ca191e20c808eb62c4fa15aa475a064e48cb/scripts/pulseforge.mts" },
    ],
  },
  checkpoint: {
    purpose: "The example starts with something familiar: changing a portfolio’s colours and wanting the original files back. I’m using this small CLI to explore how snapshots, content hashes, and careful restore behavior fit together.",
    decisions: [
      { title: "Store contents separately from filenames", explanation: "A snapshot manifest maps relative paths to full SHA-256 hashes and byte counts. Equal contents share an object, even across different filenames. A rename is reported as one deletion and one addition while reusing the stored bytes." },
      { title: "Verify before claiming the destination", explanation: "Restore reads and checks each object in a staging directory before claiming a fresh output directory. Existing destinations and paths inside the tracked project are refused, so recovering a version does not overwrite the current work." },
      { title: "Keep incomplete saves out of history", explanation: "Objects are written before the manifest. History only includes snapshots with a completed manifest. A failed save can leave unused objects, but an unfinished snapshot is not presented as a recoverable version." },
    ],
    verification: "All 12 end-to-end tests passed on Node.js 24.22.1 during the November 2026 review. They run the CLI against temporary folders, including corrupted objects, unsafe manifest paths, existing destinations, empty files, and symbolic links. The demo recovered the original HTML and CSS while preserving the edits in the working folder.",
    limitations: [
      "Local snapshots share a disk with the project. They are not an off-device backup or a replacement for Git collaboration.",
      "This version assumes one writer and a small project. Each regular file is read into memory, and the folder is not frozen while it is scanned.",
      "It stores contents and paths, not permissions, timestamps, or empty directories. A hard interruption during the final restore move can leave an incomplete new output folder.",
    ],
    example: {
      title: "Try a recovery without touching your files",
      code: "git clone https://github.com/HR5206/checkpoint-cli.git\ncd checkpoint-cli\nnode scripts/demo.mts\nnode --test test/checkpoint.test.mts",
      caption: "Use Node.js 24 or newer. No dependencies are required. The demo creates a temporary portfolio, saves four snapshots, verifies a restore, and removes the temporary files.",
    },
    sources: [
      { label: "Snapshot objects and manifests", url: "https://github.com/HR5206/checkpoint-cli/blob/15d8583e79839bc0d2fb777cd698374052c1aab9/src/snapshot.mts" },
      { label: "Restore implementation", url: "https://github.com/HR5206/checkpoint-cli/blob/15d8583e79839bc0d2fb777cd698374052c1aab9/src/restore.mts" },
      { label: "End-to-end tests", url: "https://github.com/HR5206/checkpoint-cli/blob/15d8583e79839bc0d2fb777cd698374052c1aab9/test/checkpoint.test.mts" },
    ],
  },
  helpdesk: {
    purpose: "A support ticket involves more than choosing an answer: it has to reach the right tier, stay within a budget, and leave behind useful knowledge. This hackathon project explores those decisions in a simulated helpdesk.",
    decisions: [
      { title: "Make escalation part of the environment", explanation: "Triage assigns a category, priority, and support tier. L1, L2, and L3 agents have role-specific actions for searching knowledge, applying fixes, escalating, and responding to the customer." },
      { title: "Inspect several parts of a solution", explanation: "The composite grader considers triage, resolution, response quality, efficiency, and knowledge-base contributions. SLA efficiency uses action steps and escalation count, rather than measured real-world resolution time." },
      { title: "Reuse accepted knowledge across episodes", explanation: "L3 can submit knowledge-base articles. Accepted articles remain available to later episodes in the same environment, so lower tiers can search for a previously documented fix." },
    ],
    verification: "The integration script passed all 43 checks in a local heuristic run during the November 2026 review, with API credentials unset. It checks ticket routing, escalation, knowledge-base reuse, graders, and an inference smoke test. This verifies the fixture workflow; trained-model performance still needs a separate reproducible evaluation.",
    limitations: [
      "Tickets and expected resolutions are synthetic fixtures. A high score on them is not evidence of production helpdesk performance.",
      "Heuristic text graders are proxies for useful answers. Model evaluation needs a separate held-out dataset and reproducible run settings.",
      "The knowledge base uses keyword matching. Retrieval quality depends on how the article and ticket are worded.",
    ],
    example: {
      title: "Follow one ticket through the code",
      code: "triage → route to L1 / L2 / L3\nsearch knowledge → attempt a fix → respond\naccepted L3 article → knowledge for a later episode",
      caption: "This is the environment’s workflow, not a transcript from a live customer system. Start with the lifecycle and grader source below.",
    },
    sources: [
      { label: "Environment lifecycle", url: "https://github.com/HR5206/HelpdeskEnv/blob/2767950c01e1304f6400f47bd12cb10b59a461eb/helpdeskenv_class.py" },
      { label: "Scoring functions", url: "https://github.com/HR5206/HelpdeskEnv/blob/2767950c01e1304f6400f47bd12cb10b59a461eb/graders.py" },
      { label: "Integration checks", url: "https://github.com/HR5206/HelpdeskEnv/blob/2767950c01e1304f6400f47bd12cb10b59a461eb/test_integration.py" },
    ],
  },
};
