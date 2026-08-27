import React, { type CSSProperties } from "react";
import {
  siBootstrap,
  siComposer,
  siCss,
  siDjango,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLaravel,
  siMysql,
  siNpm,
  siPhp,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  siXampp,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

const iconRegistry: Record<string, SimpleIcon> = {
  bootstrap: siBootstrap,
  composer: siComposer,
  css: siCss,
  django: siDjango,
  git: siGit,
  github: siGithub,
  html5: siHtml5,
  javascript: siJavascript,
  laravel: siLaravel,
  mysql: siMysql,
  npm: siNpm,
  php: siPhp,
  postgresql: siPostgresql,
  postman: siPostman,
  python: siPython,
  react: siReact,
  tailwindcss: siTailwindcss,
  typescript: siTypescript,
  xampp: siXampp,
};

const aliases: Record<string, string> = {
  html: "html5",
  html5: "html5",
  css3: "css",
  css: "css",
  js: "javascript",
  javascript: "javascript",
  reactjs: "react",
  react: "react",
  typescript: "typescript",
  ts: "typescript",
  tailwind: "tailwindcss",
  tailwindcss: "tailwindcss",
  php: "php",
  laravel: "laravel",
  python: "python",
  django: "django",
  mysql: "mysql",
  postgres: "postgresql",
  postgresql: "postgresql",
  git: "git",
  github: "github",
  composer: "composer",
  npm: "npm",
  postman: "postman",
  xampp: "xampp",
};

export const normalizeTechIconKey = (value: string | null | undefined) => {
  const normalized = (value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
  return aliases[normalized] || normalized;
};

export const getTechIconKey = (name: string, iconKey?: string | null) => {
  const explicitKey = normalizeTechIconKey(iconKey);
  if (explicitKey && iconRegistry[explicitKey]) return explicitKey;
  const inferredKey = normalizeTechIconKey(name);
  return iconRegistry[inferredKey] ? inferredKey : "";
};

type TechLogoProps = {
  name: string;
  iconKey?: string | null;
  iconColor?: string | null;
  iconUrl?: string | null;
  size?: number;
};

export default function TechLogo({ name, iconKey, iconColor, iconUrl, size = 34 }: TechLogoProps) {
  const resolvedKey = getTechIconKey(name, iconKey);
  const icon = iconRegistry[resolvedKey];
  const color = iconColor || (icon ? `#${icon.hex}` : "#63e6e8");
  const style = { "--tech-icon-color": color } as CSSProperties;

  if (iconUrl) {
    return <img className="tech-logo tech-logo-image" src={iconUrl} alt="" aria-hidden="true" width={size} height={size} style={style} />;
  }

  if (!icon) {
    return <span className="tech-logo tech-logo-fallback" aria-hidden="true" style={style}>{name.slice(0, 2).toUpperCase()}</span>;
  }

  return <svg className="tech-logo" width={size} height={size} viewBox="0 0 24 24" role="img" aria-label={`Logo ${icon.title}`} style={style}><path d={icon.path} /></svg>;
}
