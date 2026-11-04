import type { Metadata } from "next";
import Link from "next/link";
import { ContactContent, PortfolioHeader, ProjectsContent, ResumeContent, Signature, SkillsContent } from "@/components/PortfolioContent";
import { hrProfile } from "@/data/hr-portfolio";

export const metadata: Metadata = { title: "Portfolio overview" };

export default function OverviewPage() {
  return (
    <div className="hr-reading-page">
      <PortfolioHeader />
      <main id="main-content" className="hr-reading-main" tabIndex={-1}>
        <Link href="/" className="text-link">← Desktop</Link>
        <header className="reading-intro">
          <p className="file-kicker">Personal computer / Reading view</p>
          <h1>{hrProfile.name}</h1>
          <p>I study computer science at SASTRA. I build tools for replaying HTTP failures, recovering files, and routing support tickets.</p>
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
