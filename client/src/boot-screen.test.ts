import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const html = readFileSync(resolve(process.cwd(), "client/index.html"), "utf8");

describe("initial boot screen", () => {
  it("lets the React introduction be the first visible experience", () => {
    expect(html).not.toContain("id=\"boot-screen\"");
    expect(html).not.toContain("boot-mark");
    expect(html).not.toContain("Welcome to my");
    expect(html).not.toContain("Portfolio Website");
    expect(html).toContain('<div id="root"></div>');
  });
});
