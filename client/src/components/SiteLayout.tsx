/* Charte aqua/noir : interface tech sombre, navigation compacte, cartes graphite et aqua signal réservé aux actions. */
import React, { useState } from "react";
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
  const [location, navigate] = useLocation();
  const handleNavigation = (href: string) => {
    setMenuOpen(false);
    if (location !== href) navigate(href);
  };
  const toggleMenu = () => setMenuOpen(open => !open);
  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === " ") {
      event.preventDefault();
      toggleMenu();
    }
  };
  return (
    <div className="app-shell">
      <div className="grid-noise" aria-hidden="true" />
      <header className="site-header">
        <Link href="/" className="site-logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-orbit"><span /></span>
          <span className="logo-name">LOKO<span>-DADE</span><b>.</b></span>
        </Link>
        <nav id="main-navigation" className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Navigation principale">
          {links.map(link => <a key={link.href} href={link.href} className={location === link.href ? "active" : ""} aria-current={location === link.href ? "page" : undefined} onClick={event => { event.preventDefault(); handleNavigation(link.href); }}><span>{link.label}</span></a>)}
        </nav>
        <a className="header-mail" href="mailto:mervylokodade50@gmail.com">mervylokodade50@gmail.com</a>
        <button type="button" className="mobile-toggle" onClick={toggleMenu} onKeyDown={handleMenuKeyDown} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
      </header>
      <div className="page-frame" key={location}><div className="page-transition">{children}</div></div>
      <footer className="site-footer">
        <Link href="/" className="footer-brand">MERVYLKD<span>.</span></Link>
        <span className="footer-copy">Conçu & développé avec soin · 2024</span><Link href="/admin" className="footer-admin">Admin</Link>
        <div className="footer-links"><a href="https://github.com/mervy50" aria-label="GitHub"><Github size={16} /></a><a href="https://www.linkedin.com/in/merveille-loko-dade-8728b1352/" aria-label="LinkedIn"><Linkedin size={16} /></a><a href="mailto:mervylokodade50@gmail.com" aria-label="Email"><Mail size={16} /></a></div>
      </footer>
    </div>
  );
}
