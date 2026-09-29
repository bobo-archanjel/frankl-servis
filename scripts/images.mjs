import sharp from 'sharp';
const src = '.assets-src/', out = 'public/media/';
// Workshop close-up plate
for (const w of [480, 896]) {
  const img = sharp(src + 'hands.png').resize({ width: w });
  await img.clone().avif({ quality: 52, effort: 6 }).toFile(`${out}plate-torque-${w}.avif`);
  await img.clone().webp({ quality: 78 }).toFile(`${out}plate-torque-${w}.webp`);
}
// Exploded brake line drawing: trim transparent margin, keep alpha (used as CSS mask)
const trimmed = await sharp(src + 'brake-lines.png').trim({ threshold: 1 }).toBuffer();
for (const w of [900, 1600]) {
  await sharp(trimmed).resize({ width: w }).webp({ quality: 82, alphaQuality: 90 }).toFile(`${out}brake-exploded-${w}.webp`);
}
const m = await sharp(trimmed).metadata(); console.log('brake trimmed', m.width, m.height);
// Icons from the favicon mark
const svg = await (await import('node:fs/promises')).readFile('public/favicon.svg');
for (const s of [180, 192, 512]) await sharp(svg, { density: 600 }).resize(s, s).png().toFile(`public/icons/icon-${s}.png`);
// Maskable icon: mark on full-bleed spot square with safe-zone padding
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#1F45D6' } })
  .composite([{ input: await sharp(svg, { density: 600 }).resize(360, 360).png().toBuffer(), gravity: 'center' }])
  .png().toFile('public/icons/icon-maskable-512.png');
console.log('ok');
