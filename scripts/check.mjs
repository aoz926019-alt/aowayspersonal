import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createServer } from "vite";

// Verify content and asset contracts before a GitHub Pages deployment.
const root = process.cwd();
const html = readFileSync(resolve(root, "dist/index.html"), "utf8");
assert.match(html, /lang="zh-CN"/, "The page needs a declared language.");
assert.match(html, /rel="canonical"/, "The public page needs its canonical URL.");
for (const [, asset] of html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g)) {
  assert.ok(existsSync(resolve(root, "dist", asset)), `Missing built asset: ${asset}`);
}

const server = await createServer({ logLevel: "silent", server: { middlewareMode: true } });
try {
  const { projects, stats, nav, experience, profile } = await server.ssrLoadModule("/src/data/content.js");
  assert.equal(new Set(projects.map((p) => p.no)).size, projects.length, "Project IDs must be unique.");
  for (const project of projects) {
    assert.ok(project.title && project.subtitle && project.desc && project.deliverable, `Incomplete project: ${project.no}`);
    assert.ok(project.w > 0 && project.h > 0, `Missing image dimensions: ${project.title}`);
    assert.ok(existsSync(resolve(root, project.image.replace(/^\//, ""))), `Missing project image: ${project.title}`);
    if (project.source) assert.equal(new URL(project.source).protocol, "https:");
  }
  assert.ok(stats.every((stat) => Number.isFinite(stat.value) && stat.value > 0), "Profile statistics must be positive numbers.");
  assert.match(profile.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid contact email.");
  const sections = ["profile", "work", "experience", "skills", "contact"];
  assert.deepEqual(nav.map((item) => item.href.slice(1)), sections, "Navigation must resolve to the page sections.");
  for (const item of experience) {
    const dates = item.period.match(/\d{4}\.\d{2}/g);
    if (dates?.length === 2) assert.ok(dates[0] <= dates[1], `Reversed dates: ${item.company}`);
  }
  console.log(`Verified ${projects.length} projects, ${stats.length} statistics, ${nav.length} navigation targets and built asset references.`);
} finally {
  await server.close();
}
