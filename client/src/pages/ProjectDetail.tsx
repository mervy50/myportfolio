/* Charte aqua/noir : étude de cas structurée en modules graphite et données persistées. */
import React from "react";
import { ArrowLeft, ArrowUpRight, Check, Github } from "lucide-react";
import { Link, useRoute } from "wouter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbList } from "@/components/ui/breadcrumb";
import { trpc } from "@/lib/trpc";

type ProjectRecord = { id: number; slug: string; title: string; type: string; year: string; description: string; stack: string[]; status: string };

export default function ProjectDetail() {
  const [, params] = useRoute("/portfolio/:slug");
  const projectQuery = trpc.portfolio.projects.bySlug.useQuery({ slug: params?.slug ?? "" }, { enabled: Boolean(params?.slug) });
  if (projectQuery.isLoading) return <main className="inner-page data-state-page"><p className="data-state" role="status">Chargement de l’étude de cas…</p></main>;
  if (projectQuery.isError) return <main className="inner-page data-state-page"><div className="data-state is-error" role="alert">Impossible de charger cette étude de cas.</div><Link className="back-link" href="/portfolio"><ArrowLeft size={15} /> Retour aux projets</Link></main>;
  const project = projectQuery.data as ProjectRecord | null | undefined;
  if (!project) return <main className="inner-page data-state-page"><div className="data-state" role="status"><strong>Projet introuvable.</strong><span>Cette étude de cas n’existe pas ou n’est plus publiée.</span></div><Link className="back-link" href="/portfolio"><ArrowLeft size={15} /> Retour aux projets</Link></main>;

  return <main className="inner-page project-detail-page"><Breadcrumb className="project-breadcrumb"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link href="/">Accueil</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink asChild><Link href="/portfolio">Portfolio</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>{project.title}</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb><Link href="/portfolio" className="back-link"><ArrowLeft size={15} /> Retour aux projets</Link><div className="detail-header"><div><p className="kicker">Étude de cas / {project.year}</p><h1>{project.title}<br /><span>{project.type}</span></h1></div><div className="detail-status"><span className="status-dot" /> {project.status}<small>Conception · Développement</small></div></div><div className="detail-layout"><div className="detail-main"><div className="detail-hero"><div className="preview-grid" /><span className="aqua-text">PROJECT / {project.year}</span><strong>{project.title}</strong><small>Une expérience pensée pour être claire.</small></div><div className="detail-copy"><p className="kicker">01 / Le projet</p><h2>Passer d’un besoin réel à une solution simple à utiliser.</h2><p>{project.description} Ce projet met l’accent sur une interface accessible, une organisation solide des données et une expérience qui accompagne l’utilisateur au lieu de le ralentir.</p></div></div><aside className="detail-side"><div className="side-card"><span className="kicker">02 / Stack technique</span>{project.stack.map(item => <div className="stack-row" key={item}><Check size={13} />{item}</div>)}</div><div className="side-card"><span className="kicker">03 / Fonctionnalités</span><div className="feature-line">Interface responsive</div><div className="feature-line">Parcours orienté utilisateur</div><div className="feature-line">Architecture maintenable</div></div><a className="aqua-button full" href="https://github.com/mervy50"><Github size={16} /> Voir le code <ArrowUpRight size={15} /></a></aside></div></main>;
}
