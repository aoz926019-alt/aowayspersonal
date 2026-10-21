import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

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
  const { projects, projectCategories, stats, nav, experience, profile, education, leadership } = await server.ssrLoadModule("/src/data/content.js");
  const english = await server.ssrLoadModule("/src/data/content.en.js");
  const { messages, formatMessage } = await server.ssrLoadModule("/src/data/messages.js");
  assert.deepEqual(Object.keys(messages.en).sort(), Object.keys(messages.zh).sort(), "Both languages need every interface message.");
  const noChinese = (value, path = "English") => {
    if (typeof value === "string") assert.doesNotMatch(value, /\p{Script=Han}/u, `Untranslated text in ${path}`);
    else if (value && typeof value === "object") Object.entries(value).forEach(([key, child]) => noChinese(child, `${path}.${key}`));
  };
  noChinese(english);
  noChinese(messages.en);
  assert.deepEqual(english.projects.map(item => item.no), projects.map(item => item.no), "Translations must preserve project IDs and order.");
  assert.deepEqual(english.stats.map(item => item.value), stats.map(item => item.value), "Translations must preserve profile statistics.");
  assert.equal(english.experience.length, experience.length);
  for (const [index, item] of experience.entries()) {
    assert.ok(item.workflow?.length === 3 && item.workflow.every(step => typeof step === "string" && step.trim()), `Incomplete workflow: ${item.company}`);
    assert.equal(english.experience[index].workflow.length, item.workflow.length, "Translated workflows must preserve the steps.");
  }
  assert.equal(english.leadership.length, leadership.length);
  for (const [key, value] of Object.entries(messages.en)) {
    assert.deepEqual([...value.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort(),
      [...messages.zh[key].matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort(), `Mismatched placeholders in ${key}`);
  }
  assert.deepEqual(english.projects.map(project => [project.image, project.w, project.h]),
    projects.map(project => [project.image, project.w, project.h]), "Both languages must use the same original project images and dimensions.");
  const { default: FlexCarousel } = await server.ssrLoadModule("/src/reactbits/FlexCarousel.jsx");
  const carouselMarkup = renderToStaticMarkup(createElement(FlexCarousel, {
    items: projects.map((project) => ({ src: project.image, alt: project.subtitle, title: project.title })),
    labels: { region: messages.zh.carouselLabel, open: title => formatMessage("zh", "openOverview", { title }),
      status: (title, index, count) => formatMessage("zh", "carouselStatus", { title, index, count }) },
  }));
  assert.match(carouselMarkup, /aria-roledescription="carousel"/, "The project carousel needs an accessible region.");
  assert.ok(carouselMarkup.includes(projects[0].title) && carouselMarkup.includes(`共 ${projects.length} 个项目`), "The carousel must announce the current project and total.");
  assert.equal(renderToStaticMarkup(createElement(FlexCarousel, { items: [] })), "", "An empty carousel must not substitute stock images.");
  const englishCarousel = renderToStaticMarkup(createElement(FlexCarousel, {
    items: english.projects.map(project => ({ src: project.image, alt: project.subtitle, title: project.title })),
  }));
  assert.doesNotMatch(englishCarousel, /\p{Script=Han}/u, "English carousel accessibility labels must also be translated.");
  assert.ok(englishCarousel.includes(`project 1 of ${projects.length}`));
  assert.ok(existsSync(resolve(root, "dist/licenses/React-Bits-FlexCarousel.txt")), "The carousel license must ship with the website.");
  assert.ok(existsSync(resolve(root, "dist/licenses/React-Bits.txt")), "The decorative effects license must ship with the website.");
  assert.equal(new Set(projects.map((p) => p.no)).size, projects.length, "Project IDs must be unique.");
  const categoryIds = new Set(projectCategories.map((category) => category.id));
  assert.equal(categoryIds.size, projectCategories.length, "Project categories must be unique.");
  assert.ok(categoryIds.has("all"), "The full project list must remain accessible.");
  for (const project of projects) {
    assert.ok(project.title && project.subtitle && project.teaser && project.desc && project.deliverable, `Incomplete project: ${project.no}`);
    assert.ok(categoryIds.has(project.category) && project.category !== "all", `Invalid project category: ${project.title}`);
    if (project.image) {
      assert.ok(project.w > 0 && project.h > 0, `Missing image dimensions: ${project.title}`);
      assert.ok(existsSync(resolve(root, project.image.replace(/^\//, ""))), `Missing project image: ${project.title}`);
    } else {
      assert.ok(project.summary?.label && project.summary?.title && project.summary?.footer, `Missing research summary: ${project.title}`);
      assert.ok(project.summary.metrics?.length || project.summary.steps?.length, `Empty research summary: ${project.title}`);
    }
    if (project.source) assert.equal(new URL(project.source).protocol, "https:");
    if (project.demo) assert.equal(new URL(project.demo).protocol, "https:");
  }
  for (const category of projectCategories.filter((item) => item.id !== "all")) {
    assert.ok(projects.some((project) => project.category === category.id), `Empty project category: ${category.label}`);
  }
  assert.ok(stats.every((stat) => Number.isFinite(stat.value) && stat.value > 0), "Profile statistics must be positive numbers.");
  assert.match(profile.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid contact email.");
  const sections = ["profile", "work", "experience", "skills", "contact"];
  assert.deepEqual(nav.map((item) => item.href.slice(1)), sections, "Navigation must resolve to the page sections.");
  for (const item of experience) {
    const dates = item.period.match(/\d{4}\.\d{2}/g);
    if (dates?.length === 2) assert.ok(dates[0] <= dates[1], `Reversed dates: ${item.company}`);
  }
  assert.ok(education.every((item) => item.school && item.program && item.period), "Incomplete education record.");
  assert.ok(leadership.every((item) => item.title && item.role && item.period && item.desc), "Incomplete leadership record.");
  console.log(`Verified ${projects.length} projects, ${stats.length} statistics, ${nav.length} navigation targets, complete English copy and matching original images.`);
} finally {
  await server.close();
}
