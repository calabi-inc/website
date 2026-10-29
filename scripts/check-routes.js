// Build guard: every route the app serves must have its meta in scripts/routes.js and, after the build, its own
// dist/<route>/index.html so a direct load on GitHub Pages returns the page instead of a 404; dist/404.html must exist
// as the fallback for anything else. Runs after generate-meta.js in `npm run build` (postbuild). Exit 1 names the gaps.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ROUTES } from './routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const app = fs.readFileSync(path.join(rootDir, 'src', 'App.jsx'), 'utf-8');
const routes = [...app.matchAll(/path="([^"]+)"/g)].map(m => m[1]).filter(p => !p.includes(':') && p !== '/product');
const problems = [];
for (const r of routes) {
    if (!(r in ROUTES)) problems.push(`route ${r} is served by App.jsx but has no entry in scripts/routes.js`);
}
for (const r of Object.keys(ROUTES)) {
    if (!routes.includes(r)) problems.push(`scripts/routes.js lists ${r} but App.jsx does not serve it`);
    const file = r === '/' ? path.join(distDir, 'index.html') : path.join(distDir, r.replace(/^\//, ''), 'index.html');
    if (!fs.existsSync(file)) problems.push(`missing ${path.relative(rootDir, file)} (generate-meta.js should have written it)`);
}
if (!fs.existsSync(path.join(distDir, '404.html'))) problems.push('missing dist/404.html (the SPA fallback for unknown paths)');

if (problems.length) {
    console.error('check-routes: FAILED');
    for (const p of problems) console.error('  - ' + p);
    process.exit(1);
}
console.log(`check-routes: ${routes.length} routes, each with meta and a built index.html; 404.html present`);
