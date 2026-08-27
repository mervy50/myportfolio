/* Charte aqua/noir : showcase de projets en cartes compactes, onglets segmentés et données persistées. */
import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Award, Code2, ExternalLink, FolderKanban, X } from "lucide-react";
import { Link } from "wouter";
import { skills } from "@/lib/portfolio-data";
import { trpc } from "@/lib/trpc";
import { defaultSiteContent } from "@/lib/site-content";
import TechLogo from "@/components/TechLogo";

type ProjectRecord = { id: number; slug: string; title: string; type: string; year: string; description: string; stack: string[]; status: string };
type CertificationRecord = { id: number; title: string; provider: string; year: string | null; description: string | null; attestationImageUrl: string | null };
type SkillRecord = { id: number; groupName: string; name: string; iconKey?: string | null; iconColor?: string | null; iconUrl?: string | null; displayOrder: number };
type Tab = "Projets" | "Certifications" | "Tech Stack";

export default function Portfolio() {
  const [tab, setTab] = useState<Tab>("Projets");
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const projectsQuery = trpc.portfolio.projects.list.useQuery();
  const certificationsQuery = trpc.portfolio.certifications.list.useQuery();
  const skillsQuery = trpc.portfolio.skills.list.useQuery();
  const contentQuery = trpc.portfolio.content.get.useQuery();
  const content = contentQuery.data ?? defaultSiteContent;
  const tabs: Array<{ id: Tab; label: string }> = [{ id: "Projets", label: content.portfolioProjectsLabel }, { id: "Certifications", label: content.portfolioCertificationsLabel }, { id: "Tech Stack", label: content.portfolioTechStackLabel }];
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedProject) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelectedProject(null); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProject]);

  const projects = (projectsQuery.data ?? []) as ProjectRecord[];
  const certifications = (certificationsQuery.data ?? []) as CertificationRecord[];
  const skillGroups = Object.entries((skillsQuery.data ?? []).reduce<Record<string, SkillRecord[]>>((groups, skill) => { (groups[skill.groupName] ||= []).push(skill as SkillRecord); return groups; }, {}));
  const projectContent = projectsQuery.isLoading ? <div className="data-state" role="status">Chargement des projets…</div> : projectsQuery.isError ? <div className="data-state is-error" role="alert">Impossible de charger les projets pour le moment.</div> : projects.length === 0 ? <div className="data-state" role="status">Aucun projet publié pour le moment.</div> : <div className="showcase-grid">{projects.map(project => <article className="showcase-card" key={project.id}><div className="showcase-card-head"><span className="card-icon"><FolderKanban size={19} /></span><span className="aqua-text">{project.year}</span></div><div className="showcase-preview"><div className="preview-grid" /><span>{project.type}</span><b>{project.title}</b></div><div className="showcase-card-body"><div><h2>{project.title}</h2><p>{project.description}</p></div><button className="round-link" onClick={() => setSelectedProject(project)} aria-label={`Prévisualiser ${project.title}`}><ArrowUpRight size={17} /></button></div><div className="chip-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div>;
  const certificationContent = certificationsQuery.isLoading ? <div className="data-state" role="status">Chargement des certifications…</div> : certificationsQuery.isError ? <div className="data-state is-error" role="alert">Impossible de charger les certifications pour le moment.</div> : certifications.length === 0 ? <div className="data-state" role="status">Aucune certification publiée pour le moment.</div> : <div className="cert-grid">{certifications.map((cert, index) => <article className="cert-card" key={cert.id}>{cert.attestationImageUrl ? <a className="cert-image-link" href={cert.attestationImageUrl} target="_blank" rel="noreferrer"><img className="cert-image" src={cert.attestationImageUrl} alt={`Attestation de ${cert.title}`} /><span>Voir l’attestation <ExternalLink size={12} /></span></a> : <div className="cert-image-empty" aria-hidden="true"><Award size={25} /></div>}<div className="cert-top"><Award size={19} /><span className="aqua-text">{String(index + 1).padStart(2, "0")}</span></div><h2>{cert.title}</h2><p>{cert.provider}{cert.year ? ` · ${cert.year}` : ""}</p>{cert.description && <small className="cert-description">{cert.description}</small>}</article>)}</div>;

  return <main className="inner-page portfolio-page">
    <div className="page-title-centered"><p className="kicker">Portfolio</p><h1>{content.portfolioTitleLine1}<br /><span>{content.portfolioTitleLine2}</span></h1><p>{content.portfolioDescription}</p></div>
    <div className="showcase-tabs" role="tablist">{tabs.map(item => <button className={tab === item.id ? "tab active" : "tab"} key={item.id} onClick={() => setTab(item.id)} role="tab" aria-selected={tab === item.id}>{item.label}</button>)}</div>
    {tab === "Projets" && projectContent}
    {tab === "Certifications" && certificationContent}
    {tab === "Tech Stack" && (skillsQuery.isLoading ? <div className="data-state" role="status">Chargement des compétences…</div> : skillsQuery.isError ? <div className="data-state is-error" role="alert">Impossible de charger les compétences pour le moment.</div> : skillGroups.length === 0 ? <div className="data-state" role="status">Aucune compétence publiée pour le moment.</div> : <div className="stack-grid">{skillGroups.map(([group, items]) => <section className="stack-card" key={group}><div className="stack-card-title"><div className="stack-card-heading"><Code2 size={18} /><h2>{group}</h2></div><span className="stack-count">{items.length} outil{items.length > 1 ? "s" : ""}</span></div><div className="tech-tool-grid">{items.map((item, index) => <article className="tech-tool-card" key={item.id}><div className="tech-tool-icon"><TechLogo name={item.name} iconKey={item.iconKey} iconColor={item.iconColor} iconUrl={item.iconUrl} /></div><div className="tech-tool-copy"><strong>{item.name}</strong><small>{group}</small></div><span className="tech-tool-index">{String(index + 1).padStart(2, "0")}</span></article>)}</div></section>)}</div>)}
    {selectedProject && <div className="project-modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-preview-title" onClick={event => event.stopPropagation()}><button ref={closeButtonRef} className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Fermer l’aperçu"><X size={17} /></button><p className="kicker">Aperçu rapide / {selectedProject.year}</p><div className="modal-preview"><div className="preview-grid" /><span className="aqua-text">{selectedProject.type}</span><strong>{selectedProject.title}</strong></div><h2 id="project-preview-title">{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="chip-list">{selectedProject.stack.map(tag => <span key={tag}>{tag}</span>)}</div><Link className="aqua-button" href={`/portfolio/${selectedProject.slug}`} onClick={() => setSelectedProject(null)}>Découvrir les détails <ArrowUpRight size={15} /></Link></div></div>}
  </main>;
}
