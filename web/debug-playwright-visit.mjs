import { chromium } from '@playwright/test';
(async ()=>{
  try{
    const browser = await chromium.launch();
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    page.on('console', m=>console.log('PAGE_LOG:', m.type(), m.text()));
    page.on('pageerror', e=>console.log('PAGE_ERROR:', e));
    await page.goto('http://localhost:5174/');
    await page.waitForTimeout(500);
    console.log('HTML_SNIPPET:\n', (await page.content()).slice(0,1200));
    await browser.close();
  }catch(e){console.error('ERR',e); process.exit(1)}
})();
