import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join, extname } from "node:path";
import test from "node:test";

const root = resolve("out");
const origin = "https://www.harishraghav.dev";
const routes = ["/", "/overview/", "/projects/fault-lab/", "/projects/checkpoint/", "/projects/helpdesk/"];
const page = (route) => readFileSync(join(root, route, "index.html"), "utf8");
const all = (text, pattern) => [...text.matchAll(pattern)];

function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

test("every public page exports unique metadata and a working share image", () => {
  const titles = new Set();
  for (const route of routes) {
    const html = page(route);
    assert.match(html, /<html[^>]*lang="en"/);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title?.includes("Harish Raghav"), route);
    titles.add(title);
    assert.ok(html.includes(`rel="canonical" href="${origin}${route}"`), `${route}: canonical`);
    assert.ok(html.includes(`property="og:url" content="${origin}${route}"`), `${route}: social URL`);
    assert.ok(html.includes('name="twitter:card" content="summary_large_image"'), `${route}: share card`);
    assert.match(html, /<meta name="description" content="[^\"]{40,}"/);
    assert.equal(all(html, /<h1(?:\s|>)/g).length, 1, `${route}: one h1`);
  }
  assert.equal(titles.size, routes.length, "each route needs a distinct title");
  const png = readFileSync(join(root, "social-card.png"));
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
});

test("generated HTML has no broken local asset, navigation, or fragment links", () => {
  // This deliberately checks built HTML, including framework-emitted asset URLs.
  for (const file of filesIn(root).filter((path) => path.endsWith(".html"))) {
    const html = readFileSync(file, "utf8");
    const ids = all(html, /\bid="([^\"]+)"/g).map((match) => match[1]);
    assert.equal(ids.length, new Set(ids).size, `${file}: duplicate IDs`);
    for (const [, raw] of all(html, /\b(?:href|src)="([^\"]+)"/g)) {
      const href = raw.replaceAll("&amp;", "&");
      if (!href.startsWith("/") && !href.startsWith("#")) continue;
      const url = new URL(href, origin);
      let target = href.startsWith("#") ? file : join(root, decodeURIComponent(url.pathname));
      if (!extname(target) || (existsSync(target) && statSync(target).isDirectory())) target = join(target, "index.html");
      assert.ok(existsSync(target), `${file}: missing ${href}`);
      if (url.hash && target.endsWith(".html")) {
        const destination = readFileSync(target, "utf8");
        assert.ok(destination.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${file}: missing fragment ${href}`);
      }
    }
  }
});

test("recruiter essentials are available in the initial HTML without JavaScript", () => {
  const home = page("/");
  const overview = page("/overview/");
  for (const html of [home, overview]) {
    assert.match(html, /August 2028/);
    assert.match(html, /software engineering internship/);
    assert.match(html, /href="\/resume\/Harish-Raghav-S-Resume.pdf" download=""/);
    assert.match(html, /href="mailto:harishraghav256@gmail.com"/);
  }
  for (const repo of ["fault-lab", "checkpoint-cli", "HelpdeskEnv"]) {
    assert.ok(overview.includes(`href="https://github.com/HR5206/${repo}"`));
  }
  assert.match(home, /href="\/overview\/#projects"/);
  assert.match(home, /href="\/overview\/#contact"/);
  const resume = readFileSync(join(root, "resume/Harish-Raghav-S-Resume.pdf"));
  assert.equal(resume.subarray(0, 5).toString(), "%PDF-");
  assert.ok(resume.length > 1000, "résumé is not an empty placeholder");
});

test("crawler files list the actual public routes and the profile has real identity links", () => {
  const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
  const locations = all(sitemap, /<loc>([^<]+)<\/loc>/g).map((match) => match[1]);
  assert.deepEqual(locations.sort(), routes.map((route) => origin + route).sort());
  const robots = readFileSync(join(root, "robots.txt"), "utf8");
  assert.ok(robots.includes("Sitemap: " + origin + "/sitemap.xml"));
  assert.doesNotMatch(robots, /Disallow:\s*\//);
  const schemaText = page("/").match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
  assert.ok(schemaText, "profile structured data is present");
  const schema = JSON.parse(schemaText);
  assert.equal(schema["@type"], "ProfilePage");
  assert.equal(schema.mainEntity.name, "Harish Raghav");
  assert.equal(schema.mainEntity.url, origin + "/");
  assert.deepEqual(schema.mainEntity.sameAs, ["https://github.com/HR5206/", "https://www.linkedin.com/in/harishraghav5/"]);
  assert.match(readFileSync(join(root, "404.html"), "utf8"), /File not found/);
});
