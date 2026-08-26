import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const manifest = readFileSync(new URL("../public/site.webmanifest", import.meta.url), "utf8");

describe("SEO metadata", () => {
  it("expose les métadonnées principales et le lien canonical", () => {
    expect(html).toContain('<html lang="fr">');
    expect(html).toContain('name="description"');
    expect(html).toContain('name="robots" content="index, follow');
    expect(html).not.toContain('rel="canonical"');
    expect(html).toContain('type="application/ld+json"');
  });

  it("expose les cartes Open Graph/Twitter et les assets de marque", () => {
    expect(html).toContain('property="og:title"');
    expect(html).toContain('property="og:image" content="/manus-storage/merveille-og-landscape_5f27ac1c.png"');
    expect(html).toContain('property="og:image:width" content="1200"');
    expect(html).toContain('property="og:image:height" content="675"');
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
    expect(html).toContain('rel="icon" type="image/svg+xml" href="/favicon.svg"');
    expect(html).toContain('rel="manifest" href="/site.webmanifest"');
    expect(manifest).toContain('"theme_color": "#080A0C"');
  });
});
