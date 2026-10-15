// Checks the built Observatory page for external hosts it does not declare.
// Run after `npm run build`. Fails on any script or stylesheet loaded from a
// third-party host, on any stylesheet import outside STYLESHEET_HOSTS, and on
// any host not in ALLOWED_HOSTS.

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';

// Hosts the page is allowed to name, and why.
const ALLOWED_HOSTS = {
  'fonts.googleapis.com': 'stylesheet: Google Fonts (src/index.css)',
  'docs.google.com': 'data: Google Sheets CSV (src/utils/acatHelpers.ts)',
  'humanaios.ai': 'link: site navigation and footer',
  'github.com': 'link: footer repository link',
  'www.w3.org': 'namespace string in React/SVG output, not a request',
  'www.chartjs.org': 'documentation string in bundled Chart.js, not a request',
  'reactjs.org': 'documentation string in bundled React, not a request',
};

// The only hosts a stylesheet may be imported from.
const STYLESHEET_HOSTS = new Set(['fonts.googleapis.com']);

const failures = [];

const html = readFileSync(join(DIST, 'index.html'), 'utf8');

// Parse the hostname from a URL, so "https://github.com@evil.example.net/"
// is checked against evil.example.net, not github.com.
function hostOf(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

// 1. Script and stylesheet tags must be same-origin. Matches single and
// double quotes.
for (const match of html.matchAll(/<(script|link)\b[^>]*?\b(?:src|href)\s*=\s*(["'])([^"']+)\2/gi)) {
  const [, tag, , url] = match;
  if (/^https?:\/\//i.test(url) || url.startsWith('//')) {
    failures.push(`<${tag}> loads a third-party URL: ${url}`);
  }
}

// 2. Stylesheet @import rules may only name STYLESHEET_HOSTS.
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const files = [join(DIST, 'index.html'), ...walk(join(DIST, 'assets'))].filter((f) =>
  /\.(html|js|css)$/.test(f),
);

for (const file of files.filter((f) => f.endsWith('.css'))) {
  const css = readFileSync(file, 'utf8');
  for (const match of css.matchAll(/@import\s+(?:url\(\s*)?(["']?)([^"')\s;]+)\1/gi)) {
    const url = match[2];
    const host = hostOf(url);
    if (host === null || !STYLESHEET_HOSTS.has(host)) {
      failures.push(`CSS @import from an undeclared stylesheet host: ${url}`);
    }
  }
}

// 3. Every URL named anywhere in the built output must resolve to an allowed host.
const seen = new Set();
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(/https?:\/\/[^\s"'<>)\\`]+/g)) {
    const host = hostOf(match[0]);
    if (host === null) {
      failures.push(`unparseable URL in built output: ${match[0]}`);
    } else {
      seen.add(host);
    }
  }
}

for (const host of [...seen].sort()) {
  if (!ALLOWED_HOSTS[host]) {
    failures.push(`unlisted host in built output: ${host}`);
  }
}

if (failures.length > 0) {
  console.error('External host check FAILED:');
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(`External host check passed. ${seen.size} hosts seen, all declared:`);
for (const host of [...seen].sort()) {
  console.log(`  ${host}: ${ALLOWED_HOSTS[host]}`);
}
