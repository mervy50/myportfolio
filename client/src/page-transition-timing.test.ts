import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");

describe("page transition timing", () => {
  it("keeps route changes cinematic instead of abrupt", () => {
    expect(css).toMatch(/\.route-sweep\.is-visible\s*\{[^}]*animation:\s*routeSweep\s+1\.15s/);
    expect(css).toMatch(/\.page-transition\s*\{[^}]*animation:\s*pageEnter\s+1\.1s/);
    expect(css).toMatch(/\.page-transition > main > \*\s*\{[^}]*animation:\s*sectionReveal\s+1\.18s/);
  });

  it("keeps reduced motion explicitly disabled", () => {
    expect(css).toMatch(/\.route-sweep, \.page-transition, \.page-transition > main > \*[^}]*animation:\s*none !important/);
  });
});
