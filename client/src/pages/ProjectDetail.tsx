/* Charte aqua/noir : étude de cas structurée en modules graphite et données persistées. */
import React from "react";
import { ArrowLeft, ArrowUpRight, Check, Github } from "lucide-react";
import { Link, useRoute } from "wouter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbList } from "@/components/ui/breadcrumb";
import { trpc } from "@/lib/trpc";
import { getAnalyticsSessionId } from "@/lib/analytics";

type ProjectRecord = { id: number; slug: string; title: string; type: string; year: string; description: string; stack: string[]; status: string; githubUrl?: string | null; detailTagline?: string | null; detailHeadline?: string | null; detailBody?: string | null; detailFeatures?: string | null };

export default function ProjectDetail() {
  const [, params] = useRoute("/portfolio/:slug");
  const projectQuery = trpc.portfolio.projects.bySlug.useQuery({ slug: params?.slug ?? "" }, { enabled: Boolean(params?.slug) });
  const profileQuery = trpc.portfolio.profile.get.useQuery();
  const socialClickTracker = trpc.portfolio.analytics.trackSocialClick.useMutation();
  if (projectQuery.isLoading) return <main className="inner-page data-state-page"><p className="data-state" role="status">Chargement de l’étude de cas…</p></main>;
  if (projectQuery.isError) return <main className="inner-page data-state-page"><div className="data-state is-error" role="alert">Impossible de charger cette étude de cas.</div><Link className="back-link" href="/portfolio"><ArrowLeft size={15} /> Retour aux projets</Link></main>;
  const project = projectQuery.data as ProjectRecord | null | undefined;
  const githubUrl = projectQuery.data?.githubUrl || profileQuery.data?.github || "https://github.com/mervy50";
  if (!project) return <main className="inner-page data-state-page"><div className="data-state" role="status"><strong>Projet introuvable.</strong><span>Cette étude de cas n’existe pas ou n’est plus publiée.</span></div><Link className="back-link" href="/portfolio"><ArrowLeft size={15} /> Retour aux projets</Link></main>;
  const trackGithubClick = () => socialClickTracker.mutate({ sessionId: getAnalyticsSessionId(), path: `/portfolio/${project.slug}`, platform: "github" });

  return <main className="inner-page project-detail-page"><Breadcrumb className="project-breadcrumb"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link href="/">Accueil</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink asChild><Link href="/portfolio">Portfolio</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>{project.title}</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb><Link href="/portfolio" className="back-link"><ArrowLeft size={15} /> Retour aux projets</Link><div className="detail-header"><div><p className="kicker">Étude de cas / {project.year}</p><h1>{project.title}<br /><span>{project.type}</span></h1></div><div className="detail-status"><span className="status-dot" /> {project.status}<small>Conception · Développement</small></div></div><div className="detail-layout"><div className="detail-main"><div className="detail-hero"><div className="preview-grid" /><span className="aqua-text">PROJECT / {project.year}</span><strong>{project.title}</strong><small>{project.detailTagline || "Une expérience pensée pour être claire."}</small></div><div className="detail-copy"><p className="kicker">01 / Le projet</p><h2>{project.detailHeadline || "Passer d’un besoin réel à une solution simple à utiliser."}</h2><p>{project.detailBody || project.description}</p></div></div><aside className="detail-side"><div className="side-card"><span className="kicker">02 / Stack technique</span>{project.stack.map(item => <div className="stack-row" key={item}><Check size={13} />{item}</div>)}</div><div className="side-card"><span className="kicker">03 / Fonctionnalités</span>{(project.detailFeatures ? project.detailFeatures.split("\\n").filter(Boolean) : ["Interface responsive", "Parcours orienté utilisateur", "Architecture maintenable"]).map(feature => <div className="feature-line" key={feature}>{feature}</div>) }</div><a className="aqua-button full" href={githubUrl} target="_blank" rel="noreferrer" onClick={trackGithubClick}><Github size={16} /> Voir le code <ArrowUpRight size={15} /></a></aside></div></main>;
}
