// Checks the built Observatory page for external hosts it does not declare.
// Run after `npm run build`. Fails on any script or stylesheet loaded from a
// third-party host, and on any host not in ALLOWED_HOSTS.

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

const failures = [];

const html = readFileSync(join(DIST, 'index.html'), 'utf8');

// 1. Script and stylesheet tags must be same-origin.
for (const match of html.matchAll(/<(script|link)\b[^>]*\b(?:src|href)="([^"]+)"/g)) {
  const [, tag, url] = match;
  if (/^https?:\/\//.test(url) || url.startsWith('//')) {
    failures.push(`<${tag}> loads a third-party URL: ${url}`);
  }
}

// 2. Every host named anywhere in the built output must be allowed.
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const files = [join(DIST, 'index.html'), ...walk(join(DIST, 'assets'))].filter((f) =>
  /\.(html|js|css)$/.test(f),
);

const seen = new Set();
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(/https?:\/\/([A-Za-z0-9.-]+)/g)) {
    seen.add(match[1]);
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
