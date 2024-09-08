const puppeteer = require('puppeteer');
const url = 'https://example.com/';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(url);
  await page.screenshot({ path: 'images/default.png' });

  const devices = [
    { name: 'iPhone SE', fileName: 'iphone-se.png' },
    { name: 'iPhone 13 Pro', fileName: 'iphone-13-pro.png' },
    { name: 'iPad Pro 11', fileName: 'ipad-pro-11.png' },
  ];
  for (const device of devices) {
    const dev = puppeteer.KnownDevices[device.name];
    await page.emulate(dev);
    await page.goto(url);
    await page.screenshot(
      { path: 'images/' + device.fileName, fullPage: true }
    );
  }

  await browser.close();
})();
