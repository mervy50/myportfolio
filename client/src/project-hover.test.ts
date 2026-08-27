import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const stylesheet = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");

describe("project hover treatment", () => {
  it("provides an aqua sweep and preview highlight for hover and keyboard focus", () => {
    expect(stylesheet).toContain(".showcase-card:hover::before");
    expect(stylesheet).toContain(".showcase-card:focus-within::before");
    expect(stylesheet).toContain(".showcase-card:hover .showcase-preview::after");
    expect(stylesheet).toContain(".showcase-card:focus-within .showcase-preview::after");
  });

  it("disables decorative motion when reduced motion is requested", () => {
    expect(stylesheet).toContain(".showcase-card::before, .showcase-preview::after { transition: none; }");
  });
});
