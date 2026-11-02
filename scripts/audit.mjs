#!/usr/bin/env node

/**
 * Onward Workspaces - Google Lighthouse Auditor
 * 
 * Usage:
 *   node scripts/audit.mjs                  # Mobile audit (default)
 *   node scripts/audit.mjs --desktop        # Desktop audit
 *   node scripts/audit.mjs --open           # Open full HTML report in browser
 *   node scripts/audit.mjs --url <any-url>  # Custom URL
 */

import { execSync, spawnSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

const args = process.argv.slice(2);
const isDesktop = args.includes("--desktop");
const shouldOpen = args.includes("--open");
const urlIndex = args.indexOf("--url");
const targetUrl = urlIndex !== -1 && args[urlIndex + 1] ? args[urlIndex + 1] : "https://onwardworkspaces.com";

// Detect Chrome / Chromium / Brave binary
function getBrowserPath() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const macPaths = [
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    `${os.homedir()}/Applications/Brave Browser.app/Contents/MacOS/Brave Browser`,
    `${os.homedir()}/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`,
  ];
  for (const p of macPaths) {
    if (fs.existsSync(p)) return p;
  }
  try {
    const which = execSync("which google-chrome || which chromium || which brave-browser", { encoding: "utf8" }).trim();
    if (which) return which;
  } catch {}
  return null;
}

const browserPath = getBrowserPath();
if (!browserPath) {
  console.error("❌ Error: No compatible Chromium browser (Brave, Chrome, or Edge) found.");
  process.exit(1);
}

const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const strategy = isDesktop ? "desktop" : "mobile";
const reportHtmlPath = path.join(os.tmpdir(), `lighthouse-${strategy}-${timestamp}.report.html`);
const reportJsonPath = path.join(os.tmpdir(), `lighthouse-${strategy}-${timestamp}.report.json`);

const browserName = browserPath.split("/").find((p) => p.endsWith(".app"))?.replace(/\.app$/, "") || "Chromium";
console.log("\n========================================================");
console.log(`🚀 RUNNING LIGHTHOUSE AUDIT: ${targetUrl}`);
console.log(`📱 Mode: ${strategy.toUpperCase()}`);
console.log(`🌐 Browser: ${browserName}`);
console.log("========================================================\n");
console.log("⏳ Running audits (this takes about 15-25 seconds)...");

const cmdArgs = [
  "--yes",
  "lighthouse",
  targetUrl,
  "--chrome-flags=--headless=new --no-sandbox",
  `--output=json,html`,
  `--output-path=${reportJsonPath.replace(/\.json$/, "")}`,
  "--view=false",
  "--no-enable-error-reporting",
];

if (isDesktop) {
  cmdArgs.push("--preset=desktop");
}

const env = { ...process.env, CHROME_PATH: browserPath };
const res = spawnSync("npx", cmdArgs, { env, stdio: "pipe", encoding: "utf8" });

if (res.status !== 0) {
  console.error("❌ Lighthouse failed:", res.stderr || res.stdout);
  process.exit(1);
}

// Find generated files
const actualJsonPath = fs.existsSync(reportJsonPath) ? reportJsonPath : `${reportJsonPath.replace(/\.json$/, "")}.report.json`;
const actualHtmlPath = fs.existsSync(reportHtmlPath) ? reportHtmlPath : `${reportJsonPath.replace(/\.json$/, "")}.report.html`;

if (!fs.existsSync(actualJsonPath)) {
  console.error("❌ Could not locate generated report JSON at", actualJsonPath);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(actualJsonPath, "utf8"));
const { categories, audits } = report;

function getBadge(score) {
  const s = Math.round(score * 100);
  if (s >= 90) return `\x1b[32m${s}\x1b[0m (🟢 Green)`;
  if (s >= 50) return `\x1b[33m${s}\x1b[0m (🟡 Orange)`;
  return `\x1b[31m${s}\x1b[0m (🔴 Red)`;
}

console.log("\n========================================================");
console.log(`📊 LIGHTHOUSE SCORECARD [${strategy.toUpperCase()}]`);
console.log("========================================================");

for (const [key, cat] of Object.entries(categories)) {
  const pad = cat.title.padEnd(20, " ");
  console.log(`  • ${pad} : ${getBadge(cat.score)}`);
}

console.log("\n---------------- CORE WEB VITALS -----------------------");
const metrics = [
  { key: "first-contentful-paint", name: "First Contentful Paint (FCP)" },
  { key: "largest-contentful-paint", name: "Largest Contentful Paint (LCP)" },
  { key: "total-blocking-time", name: "Total Blocking Time (TBT)" },
  { key: "cumulative-layout-shift", name: "Cumulative Layout Shift (CLS)" },
  { key: "speed-index", name: "Speed Index" },
  { key: "interactive", name: "Time to Interactive (TTI)" },
];

for (const m of metrics) {
  const a = audits[m.key];
  if (a) {
    const val = (a.displayValue || "").padEnd(10, " ");
    const badge = a.score !== null ? getBadge(a.score) : "";
    const pad = m.name.padEnd(34, " ");
    console.log(`  ${pad} : ${val} ${badge}`);
  }
}

console.log("========================================================");
console.log(`📄 HTML Report saved to:`);
console.log(`   ${actualHtmlPath}`);
console.log("========================================================\n");

if (shouldOpen && fs.existsSync(actualHtmlPath)) {
  spawnSync("open", [actualHtmlPath]);
}
