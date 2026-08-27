import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");

describe("page transition timing", () => {
  it("keeps route changes cinematic instead of abrupt", () => {
    expect(css).toMatch(/\.route-sweep\.is-visible\s*\{[^}]*animation-duration:\s*2\.2s/);
    expect(css).toMatch(/\.page-transition\s*\{[^}]*animation:\s*pageEnterForward\s+1\.2s/);
    expect(css).toMatch(/\.page-transition > main > \*\s*\{[^}]*animation:\s*sectionReveal\s+1\.18s/);
    expect(css).toContain(".route-sweep--backward.is-visible");
    expect(css).toContain(".route-sweep--focus.is-visible");
    expect(css).toContain(".route-sweep--return.is-visible");
    expect(css).toContain("@keyframes pageEnterBackward");
    expect(css).toContain("@keyframes pageEnterFocus");
    expect(css).toContain("@keyframes pageEnterReturn");
  });

  it("keeps reduced motion explicitly disabled", () => {
    expect(css).toMatch(/\.route-sweep, \.page-transition, \.page-transition > main > \*[^}]*animation:\s*none !important/);
  });
});
