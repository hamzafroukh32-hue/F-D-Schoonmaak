// Prepares the logo from src/assets/brand/logo-bron.(webp|png|jpg):
// - trims the white margin and turns the white background transparent → src/assets/brand/logo.png
// - square icon from the "F&D" mark → public/favicon.png (48), public/apple-touch-icon.png (180)
// Run after replacing the source logo: node scripts/logo.mjs
import sharp from 'sharp';
import { existsSync } from 'node:fs';

const dir = new URL('../src/assets/brand/', import.meta.url);
const pub = new URL('../public/', import.meta.url);
const toPath = (u) => decodeURIComponent(u.pathname).replace(/^\/([A-Za-z]:)/, '$1');
const src = ['logo-bron.webp', 'logo-bron.png', 'logo-bron.jpg'].map((f) => toPath(new URL(f, dir))).find(existsSync);
if (!src) throw new Error('No src/assets/brand/logo-bron.* found');

/** Turn near-white pixels transparent, with a soft edge so anti-aliasing stays clean. */
async function whiteToAlpha(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    // min 255 → fully transparent, min <= 215 → fully opaque
    const a = min >= 250 ? 0 : min <= 215 ? 255 : Math.round(((250 - min) / 35) * 255);
    data[i + 3] = Math.min(data[i + 3], a);
  }
  return sharp(data, { raw: info });
}

const trimmed = await sharp(src).trim({ threshold: 18 }).toBuffer({ resolveWithObject: true });
const { width, height } = trimmed.info;
await (await whiteToAlpha(trimmed.data)).png({ compressionLevel: 9 }).toFile(toPath(new URL('logo.png', dir)));
console.log(`logo.png ${width}x${height}`);

// Icon: the top part of the trimmed logo (the F&D letters), padded to a square on white.
// Crop the letters only: skip the sparkles (left), mop (right) and roof/wave (bottom).
const mark = await sharp(trimmed.data)
  .extract({ left: Math.round(width * 0.17), top: 0, width: Math.round(width * 0.76), height: Math.round(height * 0.5) })
  .trim({ threshold: 18 })
  .toBuffer();
const square = async (size, file) => {
  const inner = Math.round(size * 0.84);
  const resized = await sharp(mark).resize(inner, inner, { fit: 'inside' }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([{ input: resized, gravity: 'center' }])
    .png()
    .toFile(toPath(new URL(file, pub)));
  console.log(file, size);
};
await square(48, 'favicon.png');
await square(180, 'apple-touch-icon.png');
await square(512, 'icon-512.png');

// Sample brand colours for the theme tokens
const { data, info } = await sharp(trimmed.data).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const hex = (x, y) => {
  const i = (Math.round(y) * info.width + Math.round(x)) * 3;
  return '#' + [data[i], data[i + 1], data[i + 2]].map((v) => v.toString(16).padStart(2, '0')).join('');
};
console.log('samples', {
  navyF: hex(width * 0.33, height * 0.08),
  navyF2: hex(width * 0.27, height * 0.3),
  cyanTop: hex(width * 0.78, height * 0.05),
  cyanLow: hex(width * 0.62, height * 0.45),
});
