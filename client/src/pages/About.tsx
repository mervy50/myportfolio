/* Charte aqua/noir : page À propos construite comme un tableau de bord personnel, avec cartes graphite, chiffres de repère et accent aqua. */
import React from "react";
import { ArrowUpRight, Code2, Database, Layers3, Wrench } from "lucide-react";
import { Link } from "wouter";
import { education, profile, skills } from "@/lib/portfolio-data";

const icons = { Frontend: Code2, Backend: Layers3, "Bases de données": Database, "Outils & environnement": Wrench };

export default function About() {
  return <main className="inner-page about-page">
    <div className="page-intro"><div><p className="kicker">01 / À propos</p><h1>Une développeuse<br /><span>orientée impact.</span></h1></div><div className="intro-meta"><span className="status-dot" /> Disponible pour de nouveaux projets<br /><small>Basée au Bénin · Travail à distance</small></div></div>
    <div className="about-layout"><section className="profile-panel"><div className="portrait-placeholder"><img className="about-portrait-image" src="/manus-storage/merveille-about-profile_1003691c.png" alt="Portrait de Merveille Elise Loko-Dade" /><div className="portrait-note">Merveille Elise<br />Full-Stack Developer</div></div><div className="profile-caption"><span>LOKO-DADE M.</span><span className="aqua-text">MERVEILLE ELISE</span></div></section><section className="about-copy"><p className="lead">{profile.bio}</p><div className="quote-line"><span>“</span><p>La technologie a le plus de valeur quand elle répond à un besoin réel.</p></div><Link className="outline-button" href="/contact">Parler d’un projet <ArrowUpRight size={15} /></Link></section></div>
    <section className="content-block"><div className="block-heading"><p className="kicker">02 / Compétences</p><p className="block-note">Les outils que j’utilise pour passer de l’idée à une solution fiable.</p></div><div className="skill-grid">{Object.entries(skills).map(([group, items]) => { const Icon = icons[group as keyof typeof icons]; return <div className="skill-card" key={group}><div className="skill-card-top"><Icon size={18} /><span>0{Object.keys(skills).indexOf(group) + 1}</span></div><h2>{group}</h2><div className="chip-list">{items.map(item => <span key={item}>{item}</span>)}</div></div>; })}</div></section>
    <section className="content-block education-block"><div className="block-heading"><p className="kicker">03 / Formations</p><p className="block-note">Des bases pluridisciplinaires pour comprendre les enjeux au-delà du code.</p></div><div className="education-list">{education.map((item, index) => <div className="education-row" key={item.title}><span className="row-number">0{index + 1}</span><strong>{item.title}</strong><span>{item.place}</span><span className="aqua-text">{item.year || "—"}</span></div>)}</div></section>
  </main>;
}
