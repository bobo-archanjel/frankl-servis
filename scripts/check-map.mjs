import { chromium } from 'playwright-core';
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:4173/frankl-servis/', { waitUntil: 'networkidle' });
await p.locator('.map').scrollIntoViewIfNeeded();
await p.waitForTimeout(5000);
await p.locator('.map').screenshot({ path: '.assets-src/map.png' });
console.log(p.frames().map((f) => f.url()).join('\n'));
await b.close();
