import Link from "next/link";
import { notFound } from "next/navigation";
import { PortfolioHeader } from "@/components/PortfolioContent";
import { hrProfile, hrProjects } from "@/data/hr-portfolio";
import { projectNotes } from "@/data/project-notes";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return hrProjects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = hrProjects.find((item) => item.id === slug);
  if (!project) notFound();
  return pageMetadata(project.title, project.summary, "/projects/" + project.id + "/");
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = hrProjects.find((item) => item.id === slug);
  if (!project) notFound();
  const notes = projectNotes[project.id];

  return (
    <div className="hr-reading-page">
      <PortfolioHeader />
      <main id="main-content" className="hr-reading-main project-reading-main" tabIndex={-1}>
        <nav className="reading-nav project-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Desktop</Link><span aria-hidden="true">/</span>
          <Link href="/overview/#projects">Projects</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>
        <article className="reading-panel project-article">
          <header className="project-intro">
            <p className="file-kicker">Project notes / {project.category}</p>
            <h1>{project.title}</h1>
            <p className="project-summary">{project.summary}</p>
            <ul className="tags" aria-label="Technologies">
              {project.stack.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="action-row">
              <a className="action" href={project.repository}>View source <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#try-it">{project.id === "helpdesk" ? "Explore the workflow" : "Run it locally"} <span aria-hidden="true">↓</span></a>
            </div>
          </header>
          <section className="project-section" aria-labelledby="problem-title">
            <h2 id="problem-title">The problem</h2><p>{notes.purpose}</p>
          </section>
          <section className="project-section" aria-labelledby="decisions-title">
            <h2 id="decisions-title">How it works</h2>
            {notes.decisions.map((decision) => <div className="project-decision" key={decision.title}>
              <h3>{decision.title}</h3><p>{decision.explanation}</p>
            </div>)}
          </section>
          <section className="project-section" aria-labelledby="verification-title">
            <h2 id="verification-title">Checks and evidence</h2><p>{notes.verification}</p>
            <ul className="project-sources">{notes.sources.map((source) => <li key={source.url}>
              <a href={source.url}>{source.label} <span aria-hidden="true">↗</span></a>
            </li>)}</ul>
          </section>
          <section id="try-it" className="project-section" aria-labelledby="example-title">
            <h2 id="example-title">{notes.example.title}</h2>
            <pre className="project-code" tabIndex={0} aria-label={notes.example.title}><code>{notes.example.code}</code></pre>
            <p>{notes.example.caption}</p>
          </section>
          <section className="project-section" aria-labelledby="limits-title">
            <h2 id="limits-title">Scope and tradeoffs</h2>
            <ul className="project-limitations">{notes.limitations.map((limit) => <li key={limit}>{limit}</li>)}</ul>
          </section>
          <footer className="project-section project-signoff">
            <p>Want to talk about this project?</p>
            <a className="text-link" href={"mailto:" + hrProfile.email + "?subject=" + encodeURIComponent("About " + project.title)}>Email me <span aria-hidden="true">↗</span></a>
          </footer>
        </article>
        <nav className="reading-footer" aria-label="More work">
          <Link href="/overview/#projects" className="text-link">← All projects</Link>
          <a className="text-link" href={hrProfile.resume} download>Résumé (PDF) <span aria-hidden="true">↓</span></a>
        </nav>
      </main>
    </div>
  );
}
