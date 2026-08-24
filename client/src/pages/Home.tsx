/* Direction visuelle : Editorial digital expérimental — encre profonde, corail orbital, compositions asymétriques et mouvement utile. */
import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, MoveUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  { id: "01", title: "Atelier / Commerce", type: "Interface", year: "2024", tags: ["React", "UX/UI"], image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85", description: "Une expérience de vente pensée comme un parcours éditorial, où chaque choix devient lisible." },
  { id: "02", title: "Field Notes", type: "Mobile", year: "2023", tags: ["React Native", "Product"], image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=85", description: "Un outil mobile pour capturer, organiser et retrouver les idées sans interrompre le geste." },
  { id: "03", title: "Signal / 24", type: "Data", year: "2023", tags: ["TypeScript", "Data"], image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85", description: "Transformer un flux de données complexe en une lecture simple, rapide et presque intuitive." },
];
const filters = ["Tous", "Interface", "Mobile", "Data"];

export default function Home() {
  const [filter, setFilter] = useState("Tous");
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleProjects = useMemo(() => filter === "Tous" ? projects : projects.filter((p) => p.type === filter), [filter]);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Mervy — retour en haut">
          <span className="brand-mark"><span /></span><span>MERVY<span className="brand-dot">.</span></span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <nav className={menuOpen ? "main-nav open" : "main-nav"}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Projets <span>01</span></a>
          <a href="#about" onClick={() => setMenuOpen(false)}>À propos <span>02</span></a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact <span>03</span></a>
        </nav>
        <a className="top-contact" href="mailto:hello@mervy.dev">Discutons <ArrowUpRight size={17} /></a>
      </header>

      <section id="top" className="hero section-pad">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> Développeur créatif · disponible pour de nouveaux projets</p>
          <h1>Je construis des interfaces qui <em>donnent envie</em> de continuer.</h1>
          <p className="hero-intro">Je transforme des idées complexes en expériences numériques fluides, utiles et un peu surprenantes.</p>
          <div className="hero-actions"><a className="button button-coral" href="#work">Explorer mes projets <ArrowDownRight size={18} /></a><a className="text-link" href="#about">En savoir plus <ArrowUpRight size={16} /></a></div>
        </div>
        <div className="hero-art" aria-hidden="true"><img src="/manus-storage/orbit-hero-reference_06700e5e.png" alt="" /><div className="hero-caption"><span>01</span><span>IDEAS IN MOTION</span></div></div>
        <div className="scroll-cue"><span>Faire défiler</span><ArrowDownRight size={16} /></div>
      </section>

      <section id="work" className="work section-pad"><div className="orbit-trail orbit-trail-work" aria-hidden="true"><span /></div>
        <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> 01 / Selected work</p><h2>Des projets conçus<br /><em>pour être vécus.</em></h2></div><p className="section-note">Une sélection de produits, d’interfaces et d'expériences où le fond et la forme avancent ensemble.</p></div>
        <div className="filter-row" role="tablist" aria-label="Filtrer les projets">{filters.map((item) => <button key={item} className={filter === item ? "filter active" : "filter"} onClick={() => setFilter(item)} role="tab" aria-selected={filter === item}>{item}</button>)}</div>
        <div className="projects-grid"><AnimatePresence mode="popLayout">{visibleProjects.map((project, index) => <motion.article layout initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: .28, delay: index * .04 }} className={`project-card project-${index + 1}`} key={project.id}>
          <div className="project-image"><img src={project.image} alt="" /><span className="project-index">{project.id}</span><span className="project-arrow"><MoveUpRight size={19} /></span></div>
          <div className="project-meta"><span className="mono">{project.id} / {project.year}</span><span className="project-type">{project.type}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}<span className="open-label">Ouvrir le projet <ArrowUpRight size={12} /></span></div>
        </motion.article>)}</AnimatePresence></div>
      </section>

      <section id="about" className="about section-pad"><div className="orbit-trail orbit-trail-about" aria-hidden="true"><span /></div><div className="about-index"><p className="eyebrow"><span className="eyebrow-line" /> 02 / Capabilities</p><span className="about-number">02</span></div><div className="about-content"><h2>La technique comme terrain de jeu.</h2><p className="about-lead">Je travaille à l’intersection du développement, du design d’interface et de la recherche produit. Mon rôle : rendre les choses complexes plus claires, et les expériences ordinaires plus mémorables.</p><div className="capability-list"><div><span className="mono">01</span><strong>Interfaces</strong><p>Design systems, prototypage et front-end sensible au détail.</p></div><div><span className="mono">02</span><strong>Expériences</strong><p>Interactions, transitions et parcours qui respectent l’attention.</p></div><div><span className="mono">03</span><strong>Technologie</strong><p>React, TypeScript, Node et les outils qui donnent forme aux idées.</p></div></div></div></section>

      <section className="manifesto section-pad"><p>« La meilleure interface est celle qui<br /><em>reste en tête</em> après avoir disparu. »</p><span className="mono">— NOTE PERSONNELLE / 2024</span></section>

      <section id="contact" className="contact section-pad"><div><p className="eyebrow"><span className="eyebrow-line" /> 03 / Contact</p><h2>Une idée en tête ?<br /><em>Faisons-la bouger.</em></h2></div><div className="contact-side"><p>Je suis toujours partant pour parler d’un produit ambitieux, d’une interface à repenser ou d’une idée encore au stade du croquis.</p><a className="contact-link" href="mailto:hello@mervy.dev">hello@mervy.dev <ArrowUpRight size={22} /></a></div></section>

      <footer><a className="brand" href="#top"><span className="brand-mark"><span /></span><span>MERVY<span className="brand-dot">.</span></span></a><span className="mono">© 2024 · TOUJOURS EN MOUVEMENT</span><div className="socials"><a href="https://github.com/mervy50" aria-label="GitHub"><Github size={18} /></a><a href="#contact" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="mailto:hello@mervy.dev" aria-label="Email"><Mail size={18} /></a></div></footer>
    </main>
  );
}
