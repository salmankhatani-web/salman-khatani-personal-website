// Publish only website files; keep source tooling and audit records out of hosting.
import { appendFileSync, cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'dist');
rmSync(output, { recursive: true, force: true });
mkdirSync(output);
for (const entry of readdirSync(root, { withFileTypes: true })) {
  const publicDirectory = entry.isDirectory() &&
    (['assets', 'css', 'js'].includes(entry.name) || existsSync(join(root, entry.name, 'index.html')) || entry.name === 'book');
  const publicFile = entry.isFile() && (entry.name.endsWith('.html') || ['robots.txt', 'sitemap.xml', 'llms.txt', '.nojekyll'].includes(entry.name));
  if (publicDirectory || publicFile) cpSync(join(root, entry.name), join(output, entry.name), { recursive: true });
}

// Keep small, dated responsive corrections reviewable without growing the core stylesheet.
const uxFixes = join(root, 'css', 'ux-fixes-2026-10-03.css');
const builtStyles = join(output, 'css', 'site.css');
if (existsSync(uxFixes) && existsSync(builtStyles)) {
  appendFileSync(builtStyles, `\n${readFileSync(uxFixes, 'utf8')}\n`);
}

console.log('Static website packaged in dist/');
