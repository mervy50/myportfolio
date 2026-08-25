import assert from "node:assert/strict";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "https://3000-i3wlghhno3iiubb6oelgm-d251d799.us4.manus.computer";
const browser = await chromium.launch({ headless: true, executablePath: "/usr/bin/chromium", args: ["--no-sandbox"] });
const results = [];

async function transitionName(page) {
  const transition = page.locator(".page-transition");
  await transition.waitFor({ state: "visible" });
  const name = await transition.evaluate(element => getComputedStyle(element).animationName);
  assert.equal(name, "pageEnter");
  return name;
}

async function openMobileNavigation(page) {
  const toggle = page.getByRole("button", { name: "Ouvrir le menu" });
  await toggle.click();
  await assertMenuOpen(page);
}

async function assertMenuOpen(page) {
  await assert.doesNotReject(async () => {
    await page.locator("#main-navigation.is-open").waitFor({ state: "visible" });
  });
}

async function navigateTo(page, label, mobile) {
  if (mobile) await openMobileNavigation(page);
  await page.getByRole("link", { name: label, exact: true }).click();
  await page.waitForLoadState("domcontentloaded").catch(() => {});
  await page.waitForTimeout(40);
  return transitionName(page);
}

async function runJourney(viewport, label) {
  const page = await browser.newPage({ viewport });
  const mobile = viewport.width <= 760;
  await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  await transitionName(page);

  const aboutAnimation = await navigateTo(page, "À propos", mobile);
  const portfolioAnimation = await navigateTo(page, "Portfolio", mobile);
  await page.getByRole("button", { name: "Prévisualiser Pitchlab" }).click();
  await page.getByRole("link", { name: /Ouvrir l’étude de cas/ }).click();
  await page.waitForTimeout(40);
  const detailAnimation = await transitionName(page);
  assert.equal(new URL(page.url()).pathname, "/portfolio/pitchlab");
  assert.equal(await page.getByRole("navigation", { name: "breadcrumb" }).count(), 1);

  results.push({ label, aboutAnimation, portfolioAnimation, detailAnimation, path: new URL(page.url()).pathname });
  await page.close();
}

await runJourney({ width: 1280, height: 720 }, "desktop");
await runJourney({ width: 390, height: 844 }, "mobile");
await browser.close();
console.log(JSON.stringify({ success: true, results }, null, 2));
