/* Charte aqua/noir : routing multi-pages avec une enveloppe commune pour conserver la navigation flottante et la hiérarchie technique. */
import React from "react";
import { ADMIN_PATH } from "./admin-path";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import SiteLayout from "./components/SiteLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/portfolio" component={Portfolio} />
    <Route path="/portfolio/:slug" component={ProjectDetail} />
    <Route path="/contact" component={Contact} />
    <Route path={ADMIN_PATH} component={Admin} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  const [location] = useLocation();
  const isAdminRoute = location === ADMIN_PATH;
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster />{isAdminRoute ? <Router /> : <SiteLayout><Router /></SiteLayout>}</TooltipProvider></ThemeProvider></ErrorBoundary>;
}
