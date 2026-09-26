// Publish only website files; keep source tooling and audit records out of hosting.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
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
console.log('Static website packaged in dist/');
