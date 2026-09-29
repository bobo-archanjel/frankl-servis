import { chromium } from 'playwright-core';
const url = process.argv[2];
const b = await chromium.launch({ channel: 'chrome' });
const out = {};
for (const [name, opts] of [['desktop', { viewport: { width: 1440, height: 900 } }], ['mobile', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }], ['reduced', { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }]]) {
  const ctx = await b.newContext(opts); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(2500);
  const r = await p.evaluate(() => {
    const v = document.querySelector('.hero__video');
    return { videoSrc: v.currentSrc.split('/').pop(), paused: v.paused, t: +v.currentTime.toFixed(2), loop: v.loop, muted: v.muted, poster: !!v.poster,
      font: document.fonts.check('800 16px "Archivo Variable"', 'ĽŠČŤŽÝÁÍÉÔ'), fontStatus: [...document.fonts].map((f) => f.status).join(',') };
  });
  // parallax: transforms before/after scrolling
  const tf = () => p.evaluate(() => ['.hero__media', '.hero__lines', '.hero__copy'].map((s) => getComputedStyle(document.querySelector(s)).transform));
  const before = await tf();
  await p.mouse.move(700, 400); for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 120); await p.waitForTimeout(60); }
  if (name === 'mobile') await p.evaluate(() => window.scrollTo(0, 400));
  await p.waitForTimeout(1500);
  const after = await tf();
  const links = await p.evaluate(() => ({
    tel: [...document.querySelectorAll('a[href^="tel:"]')].map((a) => a.getAttribute('href')),
    maps: [...document.querySelectorAll('a[href*="google.com/maps/dir"]')].length,
    blank: [...document.querySelectorAll('a[target=_blank]')].every((a) => a.rel.includes('noopener')),
  }));
  out[name] = { ...r, scrollY: await p.evaluate(() => Math.round(scrollY)), before, after, links, errs };
  await ctx.close();
}
await b.close();
console.log(JSON.stringify(out, null, 1));
