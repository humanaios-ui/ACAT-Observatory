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

// The browser decodes character references and \u escapes before it reads a
// URL, so the scan must too. Otherwise "https&#58;//host" or "https\u003a//host"
// hides the host from the regex.

/**
 * Decode HTML numeric character references and named colon entities.
 * @param {string} text - Raw HTML text.
 * @returns {string} Text with references replaced by their characters.
 */
function decodeEntities(text) {
  return text
    .replace(/&(?:#x0*([0-9a-f]+)|#0*(\d+));?/gi, (_, hex, dec) => {
      const codePoint = parseInt(hex ?? dec, hex ? 16 : 10);
      return codePoint > 0x10ffff ? '\ufffd' : String.fromCodePoint(codePoint);
    })
    .replace(/&colon;?/gi, ':');
}

/**
 * Decode \\uXXXX escapes, as used in JS and CSS strings.
 * @param {string} text - Raw JS or CSS text.
 * @returns {string} Text with escapes replaced by their characters.
 */
function decodeEscapes(text) {
  return text.replace(/\\u([0-9a-f]{4})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

/**
 * Normalize file text according to its type, so hidden URLs become visible.
 * @param {string} file - Path of the file; decides HTML or JS/CSS handling.
 * @param {string} text - Raw file contents.
 * @returns {string} Normalized contents.
 */
/**
 * Decode CSS hex escapes (\69, \3a, with an optional trailing space) and
 * backslash-escaped characters, as the CSS tokenizer does.
 * @param {string} text - Raw CSS text.
 * @returns {string} CSS text with escapes replaced by their characters.
 */
function decodeCssEscapes(text) {
  return text
    .replace(/\\([0-9a-f]{1,6})(?:\r\n|[ \t\r\n\f])?/gi, (_, hex) => {
      const codePoint = parseInt(hex, 16);
      return codePoint === 0 || codePoint > 0x10ffff || (codePoint >= 0xd800 && codePoint <= 0xdfff)
        ? '�'
        : String.fromCodePoint(codePoint);
    })
    .replace(/\\([^\r\n\f])/g, '$1');
}

function normalize(file, text) {
  if (file.endsWith('.html')) return decodeEntities(text);
  if (file.endsWith('.css')) return decodeCssEscapes(text);
  return decodeEscapes(text);
}

const indexFile = join(DIST, 'index.html');
const html = normalize(indexFile, readFileSync(indexFile, 'utf8'));

// Parse the hostname from a URL, so "https://github.com@evil.example.net/"
// is checked against evil.example.net, not github.com.
/**
 * Return the parsed hostname of a URL, or null if it cannot be parsed.
 * @param {string} url - Absolute URL to parse.
 * @returns {string|null} Hostname, or null.
 */
function hostOf(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

// 1. Script and stylesheet tags must be same-origin. Matches single and
// double quotes.
for (const match of html.matchAll(
  /<(script|link)\b[^>]*?\b(?:src|href)\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s"'`=<>]+))/gi,
)) {
  const [, tag, doubleQuoted, singleQuoted, unquoted] = match;
  const url = doubleQuoted ?? singleQuoted ?? unquoted;
  if (/^https?:\/\//i.test(url) || url.startsWith('//')) {
    failures.push(`<${tag}> loads a third-party URL: ${url}`);
  }
}

// 2. Stylesheet @import rules may only name STYLESHEET_HOSTS.
/**
 * List every file under a directory, recursively.
 * @param {string} dir - Directory to walk.
 * @returns {string[]} Paths of all files found.
 */
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const files = [indexFile, ...walk(join(DIST, 'assets'))].filter((f) =>
  /\.(html|js|css)$/.test(f),
);

for (const file of files.filter((f) => f.endsWith('.css'))) {
  const css = normalize(file, readFileSync(file, 'utf8'));
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
  const text = normalize(file, readFileSync(file, 'utf8'));
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
