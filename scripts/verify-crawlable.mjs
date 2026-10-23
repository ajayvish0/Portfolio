#!/usr/bin/env node
// Verifies every route in the sitemap is crawlable without JS: spawns `next start`,
// polls until it responds, fetches each route's raw HTML, and asserts a distinctive
// string (from content frontmatter, or a defined expectation for non-content pages)
// appears in the response body. It also guards what crawlers are told about the
// site: canonical and og:url point at SITE_URL, every sitemap URL is on SITE_URL,
// the og:image is served, and no template leftovers (another person's domain,
// "Placeholder" text) reach the output. Exits non-zero on any failure.
//
// Usage: npm run build && npm run verify   (verify spawns and tears down its own server)

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const PORT = process.env.VERIFY_PORT || "4173";
const BASE_URL = `http://localhost:${PORT}`;
const MAX_WAIT_MS = 60_000;
// Must match the fallback in src/lib/site.ts.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ajayvishwakarma.dev";
const SITE_HOST = new URL(SITE_URL).host;
// Text that must never appear in any response: the template's original owner and
// unfinished entries.
const FORBIDDEN = [/rakeshsingh\.dev/i, /lazymonk/i, /\bPlaceholder\b/];

function readCollection(dir) {
  const full = path.join(ROOT, "content", dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(full, f), "utf8");
      const { data } = matter(raw);
      return { slug, frontmatter: data };
    });
}

async function waitForServer() {
  const start = Date.now();
  while (Date.now() - start < MAX_WAIT_MS) {
    try {
      const res = await fetch(BASE_URL);
      if (res.ok || res.status < 500) return true;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server did not respond within ${MAX_WAIT_MS}ms`);
}

function buildChecks() {
  const checks = [];

  checks.push({ path: "/", expect: "Ajay Vishwakarma" });
  checks.push({ path: "/resume", expect: "Download PDF" });
  checks.push({ path: "/side-projects", expect: "Collab Whiteboard" });
  checks.push({ path: "/blogs", expect: "Two GitLab Accounts" });
  checks.push({ path: "/writing", expect: "Technical notes" });
  checks.push({ path: "/contact", expect: "Ajay" });

  for (const p of readCollection("projects")) {
    checks.push({
      path: `/projects/${p.slug}`,
      expect: p.frontmatter.summary,
    });
  }
  for (const p of readCollection("writing")) {
    checks.push({
      path: `/writing/${p.slug}`,
      expect: p.frontmatter.summary,
    });
  }

  checks.push({ path: "/robots.txt", expect: "GPTBot" });
  checks.push({ path: "/sitemap.xml", expect: "<urlset" });
  checks.push({ path: "/llms.txt", expect: "Ajay Vishwakarma" });

  return checks;
}

function metaContent(html, attr, name) {
  const re = new RegExp(`<meta[^>]*${attr}="${name}"[^>]*content="([^"]*)"`, "i");
  return html.match(re)?.[1];
}

// Problems with how a response describes the site, as a list of messages.
function siteChecks(routePath, body) {
  const problems = [];

  for (const re of FORBIDDEN) {
    if (re.test(body)) problems.push(`contains forbidden text ${re}`);
  }

  if (routePath === "/sitemap.xml") {
    for (const [, loc] of body.matchAll(/<loc>([^<]*)<\/loc>/g)) {
      if (new URL(loc).host !== SITE_HOST) problems.push(`sitemap URL off-site: ${loc}`);
    }
  } else if (routePath === "/robots.txt" || routePath === "/llms.txt") {
    if (!body.includes(SITE_URL)) problems.push(`does not mention ${SITE_URL}`);
  } else {
    const canonical = body.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i)?.[1];
    const ogUrl = metaContent(body, "property", "og:url");
    for (const [label, value] of [["canonical", canonical], ["og:url", ogUrl]]) {
      if (!value) problems.push(`missing ${label}`);
      else if (new URL(value).host !== SITE_HOST) problems.push(`${label} off-site: ${value}`);
    }
  }

  return problems;
}

// Every page needs an og:image that is served; otherwise a shared link shows no preview.
async function ogImageCheck(html) {
  const ogImage = metaContent(html, "property", "og:image");
  if (!ogImage) return ["missing og:image"];
  const { pathname, search } = new URL(ogImage);
  const res = await fetch(`${BASE_URL}${pathname}${search}`);
  const type = res.headers.get("content-type") ?? "";
  if (!res.ok || !type.startsWith("image/")) {
    return [`og:image ${pathname}: HTTP ${res.status} ${type}`];
  }
  return [];
}

async function runChecks() {
  const checks = buildChecks();
  const failures = [];

  for (const { path: routePath, expect } of checks) {
    try {
      const res = await fetch(`${BASE_URL}${routePath}`);
      const body = await res.text();
      if (!res.ok) {
        failures.push(`${routePath}: HTTP ${res.status}`);
        continue;
      }
      const problems = siteChecks(routePath, body);
      if (!/\.(txt|xml)$/.test(routePath)) problems.push(...(await ogImageCheck(body)));
      if (!body.includes(expect)) {
        problems.unshift(`missing expected string ${JSON.stringify(expect.slice(0, 60))}`);
      }
      if (problems.length > 0) {
        failures.push(...problems.map((p) => `${routePath}: ${p}`));
      } else {
        console.log(`[verify-crawlable] OK   ${routePath}`);
      }
    } catch (err) {
      failures.push(`${routePath}: request failed (${err.message})`);
    }
  }

  return failures;
}

async function main() {
  console.log(`[verify-crawlable] starting \`next start\` on port ${PORT}...`);
  // Runs Next's CLI with node directly: spawning `npx` fails on Windows.
  const nextBin = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
  const server = spawn(process.execPath, [nextBin, "start", "-p", PORT], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env },
  });

  let serverOutput = "";
  server.stdout.on("data", (d) => (serverOutput += d.toString()));
  server.stderr.on("data", (d) => (serverOutput += d.toString()));

  const cleanup = () => {
    server.kill("SIGTERM");
  };

  process.on("exit", cleanup);
  process.on("SIGINT", () => {
    cleanup();
    process.exit(1);
  });

  try {
    await waitForServer();
    const failures = await runChecks();

    if (failures.length > 0) {
      console.error("\n[verify-crawlable] FAILED:\n");
      for (const f of failures) console.error(`  - ${f}`);
      process.exitCode = 1;
    } else {
      console.log("\n[verify-crawlable] All routes crawlable. ✔");
      process.exitCode = 0;
    }
  } catch (err) {
    console.error("[verify-crawlable] error:", err.message);
    console.error(serverOutput);
    process.exitCode = 1;
  } finally {
    cleanup();
  }
}

main();
