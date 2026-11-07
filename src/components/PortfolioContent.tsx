import Image from "next/image";
import Link from "next/link";
import { certificates, education, experience, hrProfile, hrProjects, skills } from "@/data/hr-portfolio";
import type { HRFile } from "@/data/hr-portfolio";
import type { MouseEvent } from "react";

export function PortfolioHeader() {
  return (
    <header className="hr-header">
      <Link href="/" className="hr-brand" aria-label="Harish Raghav home">
        <span className="hr-monogram" aria-hidden="true">{hrProfile.initials}</span>
        <span>Personal computer</span>
      </Link>
      <span className="hr-edition">Portfolio / {hrProfile.edition}</span>
    </header>
  );
}

export function FileGlyph({ file }: { file: HRFile }) {
  return (
    <svg className="file-glyph" viewBox="0 0 80 82" aria-hidden="true" focusable="false">
      {file.kind === "folder" ? (
        <>
          <path className="glyph-folder" d="M3 16H36V26H77V77H4V26H3Z" />
          <path className="folder-slash" d="M46 40L36 67" />
        </>
      ) : (
        <>
          <path className="glyph-paper" d="M10 4H70V77H10Z" />
          <text x="40" y="57" textAnchor="middle">{file.symbol}</text>
        </>
      )}
    </svg>
  );
}

export function Signature() {
  return <Image className="hr-signature" src="/signature.svg" alt={hrProfile.signature}
    width={108} height={58} unoptimized />;
}

function TypedName() {
  return (
    <h1 className="hr-name" aria-label={hrProfile.name}>
      {hrProfile.name.split(" ").map((word) => (
        <span key={word} className="name-line" aria-hidden="true">
          <span className="name-letters">{word}</span>
          <span className="hr-caret">_</span>
        </span>
      ))}
    </h1>
  );
}

export function AboutContent({ onOpenProjects, onOpenContact }: {
  onOpenProjects?: () => void;
  onOpenContact?: () => void;
}) {
  // Keep real destinations for no-JS visits and modifier-clicks.
  function openFile(event: MouseEvent<HTMLAnchorElement>, open?: () => void) {
    if (!open || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    open();
  }

  return (
    <div className="hr-about">
      <p className="hr-eyebrow">Hello, internet.</p>
      <TypedName />
      <div className="hr-about-copy">
        <p>{hrProfile.introduction}</p>
        <p>{hrProfile.interests}</p>
      </div>
      <div className="about-quick-links" aria-label="Résumé and source profile">
        <a href={hrProfile.resume} download>Résumé <span aria-hidden="true">↓</span><span className="link-format">PDF</span></a>
        <a href={hrProfile.github}>GitHub <span aria-hidden="true">↗</span></a>
      </div>
      <div className="about-signoff">
        <Signature />
        <div className="about-actions">
          <a className="about-project-link" href="/overview/#projects"
            onClick={(event) => openFile(event, onOpenProjects)}>
            View projects <span aria-hidden="true">↗</span>
          </a>
          <a className="about-project-link about-contact-link" href="/overview/#contact"
            onClick={(event) => openFile(event, onOpenContact)}>
            Contact <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function ProjectsContent() {
  return (
    <div className="file-page">
      <p className="file-kicker">Folder / Selected work</p>
      <h2 className="content-title">Projects</h2>
      <p className="file-intro projects-intro">Small projects with specific problems to explore. Each has source code and notes on how it works.</p>
      <div className="project-list">
        {hrProjects.map((project, index) => (
          <article className="project-file" key={project.id}>
            <div className="record-meta"><span>{String(index + 1).padStart(2, "0")} / {project.category}</span></div>
            <h3><Link href={"/projects/" + project.id + "/"}>{project.title}</Link></h3>
            <p>{project.summary}</p>
            <ul className="tags" aria-label="Technologies">
              {project.stack.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <details className="build-notes">
              <summary><span className="when-closed">Read build notes</span><span className="when-open">Close build notes</span></summary>
              <div><p>{project.decision}</p></div>
            </details>
            <p className="project-evidence">{project.context}</p>
            <div className="project-links">
              <Link className="text-link" href={"/projects/" + project.id + "/"}
                aria-label={project.title + ": project notes"}>Project notes <span aria-hidden="true">↗</span></Link>
              <a className="text-link repo-link" href={project.repository}
                aria-label={project.title + ": source on GitHub"}>Source <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ResumeContent() {
  return (
    <div className="file-page">
      <p className="file-kicker">Personal record / Résumé</p>
      <h2 className="content-title">{hrProfile.fullName}</h2>
      <p className="file-intro">{education.degree} · {hrProfile.location}</p>
      <div className="action-row">
        <a className="action" href={hrProfile.resume} download>Download résumé <span aria-hidden="true">↓</span></a>
        <a className="text-link" href={hrProfile.resume}>Open PDF <span aria-hidden="true">↗</span></a>
      </div>
      <section className="record">
        <h3>Education</h3>
        <h4>{education.school}</h4>
        <p>{education.place} · {education.graduation}</p>
        <p>CGPA {education.cgpa} · {education.degree}</p>
        <p>Coursework includes {education.coursework}.</p>
      </section>
      <section className="record">
        <h3>Experience</h3>
        {experience.map((entry) => (
          <div className="record-entry" key={entry.role}>
            <span className="record-meta">{entry.dates}</span>
            <h4>{entry.role} · {entry.team}</h4>
            <p>{entry.location}</p><p>{entry.notes}</p>
          </div>
        ))}
      </section>
      <section className="record">
        <h3>Course certificates</h3>
        <p>Google Cloud course certificates offered by SASTRA Deemed University.</p>
        <ul className="certificate-list">{certificates.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
    </div>
  );
}

export function SkillsContent() {
  return (
    <div className="file-page">
      <p className="file-kicker">Reference / Toolbox</p>
      <h2 className="content-title">Technical skills</h2>
      <p className="file-intro">Tools I’ve used in projects and coursework. The project notes show where I’ve put them into practice.</p>
      <dl className="skills-list">{skills.map(([area, items]) => (
        <div key={area}><dt>{area}</dt><dd>{items}</dd></div>
      ))}</dl>
    </div>
  );
}

export function ContactContent() {
  return (
    <div className="file-page">
      <p className="file-kicker">Address book / Contact</p>
      <h2 className="content-title">Get in touch</h2>
      <p className="file-intro">I’m based in {hrProfile.location}. Email is the easiest way to reach me about a project or a software engineering internship.</p>
      <dl className="contact-list">
        <div><dt>Email</dt><dd><a href={"mailto:" + hrProfile.email}>{hrProfile.email}</a></dd></div>
        <div><dt>GitHub</dt><dd><a href={hrProfile.github}>github.com/HR5206 ↗</a></dd></div>
        <div><dt>LinkedIn</dt><dd><a href={hrProfile.linkedin}>linkedin.com/in/harishraghav5 ↗</a></dd></div>
      </dl>
    </div>
  );
}
