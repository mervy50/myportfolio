/* Charte aqua/noir : showcase de projets en cartes compactes, onglets segmentés et grille technique très discrète. */
import { useState } from "react";
import { ArrowUpRight, Award, Code2, ExternalLink, FolderKanban } from "lucide-react";
import { Link } from "wouter";
import { projects, skills } from "@/lib/portfolio-data";

const certifications = ["Licence en Systèmes Informatiques et Logiciels", "Licence en Anglais", "KAS DIGIT", "LABIS — Data Analysis", "LABIS — Cybersecurity", "DNSathon / Hackathon"];

type Tab = "Projets" | "Certifications" | "Tech Stack";

export default function Portfolio() {
  const [tab, setTab] = useState<Tab>("Projets");
  return <main className="inner-page portfolio-page">
    <div className="page-title-centered"><p className="kicker">02 / Portfolio</p><h1>Portfolio<br /><span>Showcase</span></h1><p>Découvrez mes projets, mes formations et les technologies que j’utilise pour construire des solutions numériques.</p></div>
    <div className="showcase-tabs" role="tablist">{(["Projets", "Certifications", "Tech Stack"] as Tab[]).map(item => <button className={tab === item ? "tab active" : "tab"} key={item} onClick={() => setTab(item)} role="tab" aria-selected={tab === item}>{item}</button>)}</div>
    {tab === "Projets" && <div className="showcase-grid">{projects.map((project) => <article className="showcase-card" key={project.slug}><div className="showcase-card-head"><span className="card-icon"><FolderKanban size={19} /></span><span className="aqua-text">{project.year}</span></div><div className="showcase-preview"><div className="preview-grid" /><span>{project.type}</span><b>{project.title}</b></div><div className="showcase-card-body"><div><h2>{project.title}</h2><p>{project.description}</p></div><Link className="round-link" href={`/portfolio/${project.slug}`} aria-label={`Voir ${project.title}`}><ArrowUpRight size={17} /></Link></div><div className="chip-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div>}
    {tab === "Certifications" && <div className="cert-grid">{certifications.map((cert, index) => <article className="cert-card" key={cert}><div className="cert-top"><Award size={19} /><span className="aqua-text">0{index + 1}</span></div><h2>{cert}</h2><p>Formation · certification</p></article>)}</div>}
    {tab === "Tech Stack" && <div className="stack-grid">{Object.entries(skills).map(([group, items]) => <section className="stack-card" key={group}><div className="stack-card-title"><Code2 size={18} /><h2>{group}</h2></div>{items.map(item => <div className="stack-row" key={item}><span className="stack-bullet" />{item}<ExternalLink size={13} /></div>)}</section>)}</div>}
  </main>;
}
