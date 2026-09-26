/* Optional integration suite: npm install --no-save playwright@1.62.1 axe-core@4.10.3
 * Start the static server, then: node scripts/browser_smoke.cjs
 * BROWSER_CHANNEL=chrome can use installed Chrome instead of bundled Chromium.
 */
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const origin = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
const routes = [...fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
function assert(condition, label) { if (!condition) throw new Error(label); }
(async () => {
  const browser = await chromium.launch({headless: true, ...(process.env.BROWSER_CHANNEL ? {channel: process.env.BROWSER_CHANNEL} : {})});
  try {
    const page = await browser.newPage({viewport: {width: 390, height: 844}, reducedMotion: 'reduce'});
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({width, height: 900});
      for (const route of routes) {
        await page.goto(origin + route, {waitUntil: 'networkidle'});
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${route}: overflow at ${width}`);
        if (width === 390) {
          await page.addScriptTag({path: require.resolve('axe-core/axe.min.js')});
          const violations = await page.evaluate(async () => (await axe.run(document, {runOnly: {type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']}})).violations);
          assert(violations.length === 0, `${route}: ${JSON.stringify(violations.map(v => v.id))}`);
        }
      }
    }
    await page.goto(origin);
    await page.locator('#compass-tab-literacy').focus();
    await page.keyboard.press('ArrowDown');
    assert(await page.locator('#compass-foresight').isVisible(), 'Desktop compass keyboard selection');
    await page.locator('#story-tab-memory').focus();
    await page.keyboard.press('ArrowRight');
    assert(await page.locator('#story-imagination').isVisible(), 'Story keyboard selection');
    assert(await page.locator('[data-pause]').textContent() === 'Play', 'Reduced motion must start paused');
    await page.setViewportSize({width: 390, height: 844});
    await page.locator('.menu-toggle').click();
    assert(await page.locator('.site-nav').isVisible(), 'Mobile menu open');
    await page.keyboard.press('Escape');
    assert(!(await page.locator('.site-nav').isVisible()), 'Mobile menu closes on Escape');
    await page.goto(origin + '/futures-practice/');
    await page.locator('#ft-topic').fill('Education in Karachi');
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#ft-download').click()]);
    assert(download.suggestedFilename() === 'futures-practice-worksheet.txt', 'Worksheet download');
    const plain = await browser.newPage({javaScriptEnabled: false});
    await plain.goto(origin);
    assert(await plain.locator('.compass-panel:visible').count() === 5, 'No-JS compass content');
    assert(await plain.locator('.story-panel:visible').count() === 3, 'No-JS story content');
    console.log(`PASS: ${routes.length} routes, four widths, accessibility and primary interactions.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
