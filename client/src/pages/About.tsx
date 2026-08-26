/* À propos aqua/noir : profil et compétences publiés depuis la base. */
import React from "react";
import { ArrowUpRight, Code2, Database, Download, Layers3, Wrench } from "lucide-react";
import { Link } from "wouter";
import { education as fallbackEducation } from "@/lib/portfolio-data";
import { defaultSiteContent } from "@/lib/site-content";
import { trpc } from "@/lib/trpc";
import { getAnalyticsSessionId } from "@/lib/analytics";

const icons = { Frontend: Code2, Backend: Layers3, "Bases de données": Database, "Outils & environnement": Wrench };

export default function About() {
  const profileQuery = trpc.portfolio.profile.get.useQuery();
  const skillsQuery = trpc.portfolio.skills.list.useQuery();
  const contentQuery = trpc.portfolio.content.get.useQuery();
  const educationQuery = trpc.portfolio.education.list.useQuery();
  const content = contentQuery.data ?? defaultSiteContent;
  const educationItems = educationQuery.data ?? fallbackEducation;
  const cvDownloadTracker = trpc.portfolio.analytics.trackCvDownload.useMutation();
  const profile = profileQuery.data;
  const skillGroups = Object.entries((skillsQuery.data ?? []).reduce<Record<string, string[]>>((groups, skill) => { (groups[skill.groupName] ||= []).push(skill.name); return groups; }, {})).map(([groupName, items]) => ({ groupName, items }));
  return <main className="inner-page about-page"><div className="page-intro"><div><p className="kicker">01 / À propos</p><h1>{content.aboutTitleLine1}<br /><span>{content.aboutTitleLine2}</span></h1></div><div className="intro-meta"><span className="status-dot" /> {content.aboutAvailability}<br /><small>{content.aboutLocation}</small></div></div><div className="about-layout"><section className="profile-panel"><div className="portrait-placeholder">{profile?.aboutPhotoUrl ? <img className="about-portrait-image" src={profile.aboutPhotoUrl} alt={`Portrait de ${profile.name}`} /> : <div className="portrait-empty">{profileQuery.isLoading ? "Chargement…" : "Portrait non configuré"}</div>}<div className="portrait-note">{profile?.name || "Profil non configuré"}<br />{profile?.role || ""}</div></div>{profile && <div className="profile-caption"><span>{profile.name}</span><span className="aqua-text">{profile.role}</span></div>}</section><section className="about-copy"><p className="lead">{profile?.bio || (profileQuery.isLoading ? "Chargement du profil…" : "Aucune présentation publiée pour le moment.")}</p><div className="quote-line"><span>“</span><p>{content.aboutQuote}</p></div><div className="about-actions"><Link className="outline-button" href="/contact">Parler d’un projet <ArrowUpRight size={15} /></Link>{profile?.cvUrl && <a className="text-arrow cv-link" href={profile.cvUrl} download onClick={() => cvDownloadTracker.mutate({ sessionId: getAnalyticsSessionId(), path: "/about" })}>Télécharger mon CV <Download size={14} /></a>}</div></section></div><section className="content-block"><div className="block-heading"><p className="kicker">02 / Compétences</p><p className="block-note">{content.aboutSkillsNote}</p></div>{skillsQuery.isLoading ? <div className="data-state" role="status">Chargement des compétences…</div> : skillsQuery.isError ? <div className="data-state is-error" role="alert">Impossible de charger les compétences.</div> : skillGroups.length === 0 ? <div className="data-state" role="status">Aucune compétence publiée pour le moment.</div> : <div className="skill-grid">{skillGroups.map(({ groupName, items }, index) => { const Icon = icons[groupName as keyof typeof icons] || Wrench; return <div className="skill-card" key={groupName}><div className="skill-card-top"><Icon size={18} /><span>0{index + 1}</span></div><h2>{groupName}</h2><div className="chip-list">{items.map(item => <span key={item}>{item}</span>)}</div></div>; })}</div>}</section><section className="content-block education-block"><div className="block-heading"><p className="kicker">03 / Formations</p><p className="block-note">{content.aboutEducationNote}</p></div><div className="education-list">{educationItems.map((item, index) => <div className="education-row" key={item.title}><span className="row-number">0{index + 1}</span><strong>{item.title}</strong><span>{item.place}</span><span className="aqua-text">{item.year || "—"}</span></div>)}</div></section></main>;
}
