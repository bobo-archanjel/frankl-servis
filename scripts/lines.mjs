import sharp from 'sharp';
const { data, info } = await sharp('.assets-src/brake-lines.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const a = data[i + 3];
  data[i] = data[i + 1] = data[i + 2] = 0;
  data[i + 3] = a < 48 ? 0 : Math.min(255, Math.round((a - 48) * 255 / 160));
}
const clean = await sharp(data, { raw: info }).png().toBuffer();
const trimmed = await sharp(clean).trim({ threshold: 1 }).toBuffer();
const m = await sharp(trimmed).metadata(); console.log('trimmed', m.width, m.height);
for (const w of [900, 1600]) {
  await sharp(trimmed).resize({ width: w }).webp({ quality: 60, alphaQuality: 85, effort: 6 }).toFile(`public/media/brake-exploded-${w}.webp`);
}
// preview on paper for a visual check
await sharp({ create: { width: m.width, height: m.height, channels: 3, background: '#EDEFEC' } })
  .composite([{ input: trimmed }]).png().toFile('.assets-src/lines-preview.png');
