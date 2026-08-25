/* Charte aqua/noir : showcase de projets en cartes compactes, onglets segmentés et données persistées. */
import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Award, Code2, ExternalLink, FolderKanban, X } from "lucide-react";
import { Link } from "wouter";
import { skills } from "@/lib/portfolio-data";
import { trpc } from "@/lib/trpc";

type ProjectRecord = { id: number; slug: string; title: string; type: string; year: string; description: string; stack: string[]; status: string };
type CertificationRecord = { id: number; title: string; provider: string; year: string | null; description: string | null };
type Tab = "Projets" | "Certifications" | "Tech Stack";

export default function Portfolio() {
  const [tab, setTab] = useState<Tab>("Projets");
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const projectsQuery = trpc.portfolio.projects.list.useQuery();
  const certificationsQuery = trpc.portfolio.certifications.list.useQuery();
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
  const projectContent = projectsQuery.isLoading ? <div className="data-state" role="status">Chargement des projets…</div> : projectsQuery.isError ? <div className="data-state is-error" role="alert">Impossible de charger les projets pour le moment.</div> : projects.length === 0 ? <div className="data-state" role="status">Aucun projet publié pour le moment.</div> : <div className="showcase-grid">{projects.map(project => <article className="showcase-card" key={project.id}><div className="showcase-card-head"><span className="card-icon"><FolderKanban size={19} /></span><span className="aqua-text">{project.year}</span></div><div className="showcase-preview"><div className="preview-grid" /><span>{project.type}</span><b>{project.title}</b></div><div className="showcase-card-body"><div><h2>{project.title}</h2><p>{project.description}</p></div><button className="round-link" onClick={() => setSelectedProject(project)} aria-label={`Prévisualiser ${project.title}`}><ArrowUpRight size={17} /></button></div><div className="chip-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div>;
  const certificationContent = certificationsQuery.isLoading ? <div className="data-state" role="status">Chargement des certifications…</div> : certificationsQuery.isError ? <div className="data-state is-error" role="alert">Impossible de charger les certifications pour le moment.</div> : certifications.length === 0 ? <div className="data-state" role="status">Aucune certification publiée pour le moment.</div> : <div className="cert-grid">{certifications.map((cert, index) => <article className="cert-card" key={cert.id}><div className="cert-top"><Award size={19} /><span className="aqua-text">{String(index + 1).padStart(2, "0")}</span></div><h2>{cert.title}</h2><p>{cert.provider}{cert.year ? ` · ${cert.year}` : ""}</p></article>)}</div>;

  return <main className="inner-page portfolio-page">
    <div className="page-title-centered"><p className="kicker">02 / Portfolio</p><h1>Portfolio<br /><span>Showcase</span></h1><p>Découvrez mes projets, mes formations et les technologies que j’utilise pour construire des solutions numériques.</p></div>
    <div className="showcase-tabs" role="tablist">{(["Projets", "Certifications", "Tech Stack"] as Tab[]).map(item => <button className={tab === item ? "tab active" : "tab"} key={item} onClick={() => setTab(item)} role="tab" aria-selected={tab === item}>{item}</button>)}</div>
    {tab === "Projets" && projectContent}
    {tab === "Certifications" && certificationContent}
    {tab === "Tech Stack" && <div className="stack-grid">{Object.entries(skills).map(([group, items]) => <section className="stack-card" key={group}><div className="stack-card-title"><Code2 size={18} /><h2>{group}</h2></div>{items.map(item => <div className="stack-row" key={item}><span className="stack-bullet" />{item}<ExternalLink size={13} /></div>)}</section>)}</div>}
    {selectedProject && <div className="project-modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-preview-title" onClick={event => event.stopPropagation()}><button ref={closeButtonRef} className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Fermer l’aperçu"><X size={17} /></button><p className="kicker">Aperçu rapide / {selectedProject.year}</p><div className="modal-preview"><div className="preview-grid" /><span className="aqua-text">{selectedProject.type}</span><strong>{selectedProject.title}</strong></div><h2 id="project-preview-title">{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="chip-list">{selectedProject.stack.map(tag => <span key={tag}>{tag}</span>)}</div><Link className="aqua-button" href={`/portfolio/${selectedProject.slug}`} onClick={() => setSelectedProject(null)}>Ouvrir l’étude de cas <ArrowUpRight size={15} /></Link></div></div>}
  </main>;
}
