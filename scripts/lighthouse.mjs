// Mobile Lighthouse on key pages against a running preview (npm run preview).
// Usage: node scripts/lighthouse.mjs [baseUrl]
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, existsSync, rmSync } from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:4321';
const pages = [
  '/',
  '/offerte/',
  '/diensten/glasbewassing-particulier/',
  '/werkgebied/hengelo/glazenwasser/',
  '/diensten/praktijkschoonmaak/',
  '/diensten/eindschoonmaak-diepteschoonmaak/',
  '/werkgebied/hengelo/',
  '/prijzen/',
  '/contact/',
  '/projecten/',
  '/over-ons/',
  '/vacatures/',
  '/kennisbank/wat-kost-kantoorschoonmaak/',
  '/privacyverklaring/',
];
mkdirSync('lighthouse', { recursive: true });
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
let failed = false;

for (const p of pages) {
  const out = `lighthouse/${p.replace(/\//g, '_') || 'home'}.json`;
  let ok = false;
  for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
    if (existsSync(out)) rmSync(out);
    try {
      execFileSync(
        npx,
        ['-y', 'lighthouse@13', base + p, '--quiet', '--chrome-flags=--headless=new', '--form-factor=mobile', '--output=json', `--output-path=${out}`],
        { stdio: 'ignore', shell: process.platform === 'win32' },
      );
    } catch {
      /* retry */
    }
    ok = existsSync(out);
  }
  if (!ok) {
    console.log(`${p}  ERROR: lighthouse did not produce a report`);
    failed = true;
    continue;
  }
  const r = JSON.parse(readFileSync(out, 'utf8'));
  const scores = ['performance', 'accessibility', 'best-practices', 'seo'].map((k) => [k, Math.round(r.categories[k].score * 100)]);
  const low = scores.filter(([, s]) => s < 95);
  if (low.length) failed = true;
  console.log(`${p}  ${scores.map(([k, s]) => `${k}:${s}`).join('  ')}${low.length ? '  <-- below 95' : ''}`);
  if (low.length) {
    for (const [k] of low) {
      r.categories[k].auditRefs
        .map((a) => r.audits[a.id])
        .filter((a) => a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'informative')
        .forEach((a) => console.log(`    - ${a.id}: ${a.title}`));
    }
  }
}
process.exit(failed ? 1 : 0);
