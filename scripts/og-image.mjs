// Generates public/og-default.png (1200x630): the logo on white, the promise on navy.
// Run after changing the logo: node scripts/og-image.mjs
import sharp from 'sharp';

const toPath = (u) => decodeURIComponent(u.pathname).replace(/^\/([A-Za-z]:)/, '$1');
const logo = await sharp(toPath(new URL('../src/assets/brand/logo.png', import.meta.url)))
  .resize(470, 420, { fit: 'inside' })
  .toBuffer();

const panel = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <path d="M600 0H1200V630H520C580 520 640 420 600 300C565 190 560 90 600 0Z" fill="#043168"/>
  <text x="660" y="250" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="800" fill="#ffffff">Snel antwoord.</text>
  <text x="660" y="325" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="800" fill="#ffffff">Vaste prijs vooraf.</text>
  <text x="660" y="400" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#ffffffcc">Schoonmaakbedrijf in Twente</text>
  <rect x="660" y="440" width="240" height="8" rx="4" fill="#1ec0dd"/>
</svg>`;

await sharp(Buffer.from(panel))
  .composite([{ input: logo, left: 60, top: 105 }])
  .png({ compressionLevel: 9 })
  .toFile(toPath(new URL('../public/og-default.png', import.meta.url)));
console.log('public/og-default.png written');
