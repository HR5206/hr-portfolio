import Link from "next/link";
import { ContactContent, PortfolioHeader, ProjectsContent, ResumeContent, Signature, SkillsContent } from "@/components/PortfolioContent";
import { hrProfile } from "@/data/hr-portfolio";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Portfolio overview", "Harish Raghav’s projects, source code, education, experience, technical skills, résumé, and contact details in one reading view.", "/overview/");

export default function OverviewPage() {
  return (
    <div className="hr-reading-page">
      <PortfolioHeader />
      <main id="main-content" className="hr-reading-main" tabIndex={-1}>
        <Link href="/" className="text-link">← Desktop</Link>
        <header className="reading-intro">
          <p className="file-kicker">Personal computer / Reading view</p>
          <h1>{hrProfile.name}</h1>
          <p>{hrProfile.introduction} {hrProfile.interests}</p>
          <div className="action-row">
            <a className="action" href={hrProfile.resume} download>Download résumé <span aria-hidden="true">↓</span></a>
            <a className="text-link" href={"mailto:" + hrProfile.email}>Email me <span aria-hidden="true">↗</span></a>
            <a className="text-link" href={hrProfile.github}>GitHub <span aria-hidden="true">↗</span></a>
          </div>
          <Signature />
        </header>
        <nav className="reading-nav" aria-label="Page sections">
          <a href="#projects">Projects</a><a href="#resume">Résumé</a>
          <a href="#skills">Skills</a><a href="#contact">Contact</a>
        </nav>
        <section id="projects" className="reading-panel" aria-label="Projects"><ProjectsContent /></section>
        <section id="resume" className="reading-panel" aria-label="Résumé"><ResumeContent /></section>
        <section id="skills" className="reading-panel" aria-label="Skills"><SkillsContent /></section>
        <section id="contact" className="reading-panel" aria-label="Contact"><ContactContent /></section>
        <footer className="reading-footer"><span>HR / Personal edition</span><Link href="/" className="text-link">Return to desktop ↑</Link></footer>
      </main>
    </div>
  );
}
