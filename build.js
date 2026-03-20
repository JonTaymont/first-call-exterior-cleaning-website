#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const INCLUDES_DIR = path.join(ROOT, 'includes');

/* ── Load include partials ── */
const includes = {};
for (const file of fs.readdirSync(INCLUDES_DIR)) {
  if (file.endsWith('.html')) {
    includes[file.replace('.html', '')] = fs.readFileSync(path.join(INCLUDES_DIR, file), 'utf8');
  }
}

/* ── Recursively find .html files ── */
function findHtml(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(findHtml(full));
    else if (entry.name.endsWith('.html')) results.push(full);
  }
  return results;
}

/* ── Build each source file ── */
const srcFiles = findHtml(SRC);
console.log(`Building ${srcFiles.length} pages...\n`);

let built = 0;
for (const srcFile of srcFiles) {
  const relPath = path.relative(SRC, srcFile).replace(/\\/g, '/');
  const outPath = path.join(ROOT, relPath);
  const depth = relPath.split('/').length - 1;
  const base = depth > 0 ? '../'.repeat(depth) : '';
  const pageId = path.basename(relPath, '.html').replace(/[^a-z0-9]/gi, '-');

  let html = fs.readFileSync(srcFile, 'utf8');

  // Replace {{include:name}} with partial content
  html = html.replace(/\{\{include:([\w-]+)\}\}/g, function (match, name) {
    if (includes[name]) return includes[name];
    console.warn('  Warning: include "' + name + '" not found in ' + relPath);
    return match;
  });

  // Replace template variables
  html = html.replace(/\{\{BASE\}\}/g, base);
  html = html.replace(/\{\{PAGE_ID\}\}/g, pageId);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  built++;
  console.log('  \u2713 ' + relPath);
}

console.log('\nBuild complete: ' + built + ' pages generated.');
