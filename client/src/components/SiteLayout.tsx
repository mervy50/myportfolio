/* Charte aqua/noir : interface tech sombre, navigation compacte, cartes graphite et aqua signal réservé aux actions. */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  return (
    <div className="app-shell">
      <div className="grid-noise" aria-hidden="true" />
      <header className="site-header">
        <Link href="/" className="site-logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-orbit"><span /></span>
          <span className="logo-name">LOKO<span>-DADE</span><b>.</b></span>
        </Link>
        <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Navigation principale">
          {links.map((link, index) => <Link key={link.href} href={link.href} className={location === link.href ? "active" : ""} onClick={() => setMenuOpen(false)}><span>{link.label}</span><small>0{index + 1}</small></Link>)}
        </nav>
        <a className="header-mail" href="mailto:mervylokodade50@gmail.com">mervylokodade50@gmail.com</a>
        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
      </header>
      <div className="page-frame">{children}</div>
      <footer className="site-footer">
        <Link href="/" className="footer-brand">MERVYLKD<span>.</span></Link>
        <span className="footer-copy">Conçu & développé avec soin · 2024</span>
        <div className="footer-links"><a href="https://github.com/mervy50" aria-label="GitHub"><Github size={16} /></a><a href="https://www.linkedin.com/in/merveille-loko-dade-8728b1352/" aria-label="LinkedIn"><Linkedin size={16} /></a><a href="mailto:mervylokodade50@gmail.com" aria-label="Email"><Mail size={16} /></a></div>
      </footer>
    </div>
  );
}
