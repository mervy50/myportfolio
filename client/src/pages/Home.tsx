/* Accueil aqua/noir : identité et contenus publics pilotés par la base. */
import React from "react";
import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { projects as fallbackProjects } from "@/lib/portfolio-data";
import { trpc } from "@/lib/trpc";
import { defaultSiteContent } from "@/lib/site-content";

export default function Home() {
  const projectsQuery = trpc.portfolio.projects.list.useQuery();
  const profileQuery = trpc.portfolio.profile.get.useQuery();
  const skillsQuery = trpc.portfolio.skills.list.useQuery();
  const contentQuery = trpc.portfolio.content.get.useQuery();
  const content = contentQuery.data ?? defaultSiteContent;
  const displayProjects = projectsQuery.data ?? fallbackProjects;
  const profile = profileQuery.data;
  const skillsCount = skillsQuery.data?.length ?? 0;
  const profileReady = !profileQuery.isLoading && Boolean(profile);
  const profileRole = profile?.role ?? "";
  const profileName = profile?.name ?? "";

  return <main className="home-page"><section className="home-hero"><div className="hero-left"><p className="kicker">01 / {content.homeAvailability}</p><h1>{profileReady ? <>{content.homeTitleLine1}<br /><span>{content.homeTitleLine2}</span></> : "Profil en préparation."}</h1><p className="home-intro">{profileReady ? profile?.bio : profileQuery.isLoading ? "Chargement du profil…" : "Le profil public sera bientôt disponible."}</p><div className="home-actions"><Link className="aqua-button" href="/portfolio">{content.homeProjectsCta} <ArrowUpRight size={16} /></Link><a className="outline-button" href="#about">{content.homeAboutCtaLabel} <ArrowDownRight size={15} /></a></div><div className="hero-tech-line"><Sparkles size={14} />{skillsQuery.data?.slice(0, 4).map(skill => <span key={skill.id}>{skill.name}</span>)}</div></div><div className="hero-right"><div className="portrait-card">{profile?.photoUrl ? <img className="portrait-image" src={profile.photoUrl} alt={`Portrait de ${profile.name}`} /> : <div className="portrait-empty">{profileQuery.isLoading ? "Chargement…" : "Portrait non configuré"}</div>}<div className="portrait-grid" />{profile && <div className="portrait-caption"><span>{profileName.split(" ").slice(-2).join(" ")}</span><span>{profileName.split(" ").slice(0, 2).join(" ")}</span></div>}</div><div className="orbit-decoration" aria-hidden="true"><span /></div></div></section><section className="stat-row"><div className="stat-card"><span className="stat-icon">&lt;/&gt;</span><strong>{displayProjects.length}</strong><small>{content.homeProjectsLabel}</small><ArrowUpRight size={14} /></div><div className="stat-card"><span className="stat-icon">✦</span><strong>{skillsCount}</strong><small>{content.homeTechnologiesLabel}</small><ArrowUpRight size={14} /></div><div className="stat-card"><span className="stat-icon">◎</span><strong>∞</strong><small>{content.homeCuriosityLabel}</small><ArrowUpRight size={14} /></div></section><section id="about" className="home-about"><div><p className="kicker">02 / À propos</p><h2>{content.homeAboutTitle}<br /><span>{content.homeAboutAccent}</span></h2></div><div className="about-side"><p>{profile?.bio || (profileQuery.isLoading ? "Chargement du profil…" : "Aucune présentation publiée pour le moment.")}</p><Link className="text-arrow" href="/about">{content.homeAboutCta} <ArrowUpRight size={15} /></Link></div></section><section className="home-featured"><div className="feature-heading"><div><p className="kicker">03 / Projets récents</p><h2>{content.homeFeaturedTitle}<br /><span>{content.homeFeaturedAccent}</span></h2></div><Link className="text-arrow" href="/portfolio">{content.navPortfolioLabel} <ArrowUpRight size={15} /></Link></div><div className="featured-grid">{displayProjects.slice(0, 3).map((project, index) => <Link href={`/portfolio/${project.slug}`} className={`featured-card featured-${index + 1}`} key={project.slug}><div className="mini-preview"><div className="preview-grid" /><span className="aqua-text">0{index + 1}</span><strong>{project.title}</strong><small>{project.type}</small></div><div className="featured-meta"><span>{project.year}</span><span>{project.stack.join(" · ")}</span><ArrowUpRight size={14} /></div></Link>)}</div></section><section className="home-cta"><p className="kicker">04 / Contact</p><h2>{content.homeContactTitle}<br /><span>{content.homeContactAccent}</span></h2><Link className="aqua-button" href="/contact">{content.navContactLabel} <ArrowUpRight size={16} /></Link></section></main>;
}
