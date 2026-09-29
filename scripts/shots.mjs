import { chromium } from 'playwright-core';
const url = process.argv[2] || 'http://localhost:4173/frankl-servis/';
const scheme = process.argv[3] || 'light';
const browser = await chromium.launch({ channel: 'chrome' });
const errors = [];
for (const [name, vp, mobile] of [['desktop', { width: 1440, height: 900 }, false], ['mobile', { width: 390, height: 844 }, true]]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile, colorScheme: scheme });
  const page = await ctx.newPage();
  page.on('console', (m) => m.type() === 'error' && errors.push(`${name}: ${m.text()}`));
  page.on('pageerror', (e) => errors.push(`${name}: ${e.message}`));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `.impeccable/review/${name}-${scheme}-hero.png` });
  // walk the page so ScrollTrigger reveals run, then capture full page from the top
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += vp.height / 2) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(120); }
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(800);
  await page.screenshot({ path: scheme === 'light' ? `.impeccable/review/${name}.png` : `.impeccable/review/${name}-${scheme}.png`, fullPage: true });
  await ctx.close();
}
await browser.close();
console.log(errors.length ? errors.join('\n') : 'no console errors');
