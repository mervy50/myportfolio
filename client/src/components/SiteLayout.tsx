/* Charte aqua/noir : interface tech sombre, navigation compacte, cartes graphite et aqua signal réservé aux actions. */
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { getAnalyticsSessionId } from "@/lib/analytics";
import { defaultSiteContent } from "@/lib/site-content";
import { ADMIN_PATH } from "@/admin-path";

type TransitionVariant = "forward" | "backward" | "focus" | "return";

const routeRank = (path: string) => {
  if (path === "/") return 0;
  if (path === "/about") return 1;
  if (path === "/portfolio" || path.startsWith("/portfolio/")) return 2;
  if (path === "/contact") return 3;
  return 2;
};

const getTransitionVariant = (from: string, to: string): TransitionVariant => {
  if (to === "/") return "return";
  if (to.startsWith("/portfolio/")) return "focus";
  return routeRank(to) < routeRank(from) ? "backward" : "forward";
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  const previousLocation = useRef(location);
  const [routeIsChanging, setRouteIsChanging] = useState(false);
  const [transitionVariant, setTransitionVariant] = useState<TransitionVariant>("forward");
  const profileQuery = trpc.portfolio.profile.get.useQuery();
  const contentQuery = trpc.portfolio.content.get.useQuery();
  const profile = profileQuery.data;
  const content = contentQuery.data ?? defaultSiteContent;
  const links = [
    { href: "/", label: content.navHomeLabel },
    { href: "/about", label: content.navAboutLabel },
    { href: "/portfolio", label: content.navPortfolioLabel },
    { href: "/contact", label: content.navContactLabel },
  ];
  const visitTracker = trpc.portfolio.analytics.trackVisit.useMutation();
  const socialClickTracker = trpc.portfolio.analytics.trackSocialClick.useMutation();
  useEffect(() => {
    if (previousLocation.current === location) return;
    const nextVariant = getTransitionVariant(previousLocation.current, location);
    previousLocation.current = location;
    setTransitionVariant(nextVariant);
    setRouteIsChanging(true);
    const timeout = window.setTimeout(() => setRouteIsChanging(false), 2250);
    return () => window.clearTimeout(timeout);
  }, [location]);
  useEffect(() => {
    if (location === ADMIN_PATH || location.startsWith(`${ADMIN_PATH}/`)) return;
    try {
      if (sessionStorage.getItem("portfolio-analytics-visit-sent")) return;
      sessionStorage.setItem("portfolio-analytics-visit-sent", "1");
    } catch {
      // If storage is unavailable, the event is still sent for this render.
    }
    visitTracker.mutate({ sessionId: getAnalyticsSessionId(), path: location });
  }, [location]);
  const trackSocialClick = (platform: "github" | "linkedin") => { socialClickTracker.mutate({ sessionId: getAnalyticsSessionId(), path: location, platform }); };
  const handleNavigation = (href: string) => {
    setMenuOpen(false);
    if (location !== href) {
      setTransitionVariant(getTransitionVariant(location, href));
      navigate(href);
    }
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
      <div className={`route-sweep route-sweep--${transitionVariant}${routeIsChanging ? " is-visible" : ""}`} aria-hidden="true" />
      <div className="grid-noise" aria-hidden="true" />
      <header className="site-header">
        <Link href="/" className="site-logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-orbit"><span /></span>
          <span className="logo-name">{content.headerBrand}</span>
        </Link>
        <nav id="main-navigation" className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Navigation principale">
          {links.map(link => <a key={link.href} href={link.href} className={location === link.href ? "active" : ""} aria-current={location === link.href ? "page" : undefined} onClick={event => { event.preventDefault(); handleNavigation(link.href); }}><span>{link.label}</span></a>)}
        </nav>
        {profile?.email && <a className="header-mail" href={`mailto:${profile.email}`}>{profile.email}</a>}
        <button type="button" className="mobile-toggle" onClick={toggleMenu} onKeyDown={handleMenuKeyDown} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
      </header>
      <div className="page-frame" key={location}><div className={`page-transition page-transition--${transitionVariant}`}>{children}</div></div>
      <footer className="site-footer">
        <Link href="/" className="footer-brand">{content.footerBrand}</Link>
        <span className="footer-copy">{content.footerCopy}</span>
        <div className="footer-links">{profile?.github && <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" onClick={() => trackSocialClick("github")}><Github size={16} /></a>}{profile?.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" onClick={() => trackSocialClick("linkedin")}><Linkedin size={16} /></a>}{profile?.email && <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={16} /></a>}</div>
      </footer>
    </div>
  );
}
