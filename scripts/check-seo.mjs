// Post-build SEO checks on dist/: title ≤ 60, description ≤ 155, exactly one <h1>, unique titles/descriptions.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(p);
    else if (entry.name.endsWith('.html')) yield p;
  }
}

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x27;/g, "'");

const errors = [];
const titles = new Map();
const descs = new Map();
let count = 0;

for await (const file of htmlFiles(DIST)) {
  const html = await readFile(file, 'utf8');
  const rel = file.slice(DIST.length).replace(/\\/g, '/');
  count++;
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;

  if (!title) errors.push(`${rel}: missing <title>`);
  if ([...title].length > 60) errors.push(`${rel}: title ${[...title].length} chars > 60: "${title}"`);
  if (!desc) errors.push(`${rel}: missing meta description`);
  if ([...desc].length > 155) errors.push(`${rel}: description ${[...desc].length} chars > 155`);
  if (h1s !== 1) errors.push(`${rel}: ${h1s} <h1> elements (expected 1)`);
  if (titles.has(title)) errors.push(`${rel}: duplicate title with ${titles.get(title)}`);
  if (descs.has(desc)) errors.push(`${rel}: duplicate description with ${descs.get(desc)}`);
  titles.set(title, rel);
  descs.set(desc, rel);
}

if (errors.length) {
  console.error(`SEO check failed (${errors.length}):\n- ` + errors.join('\n- '));
  process.exit(1);
}
console.log(`SEO check passed for ${count} pages.`);
