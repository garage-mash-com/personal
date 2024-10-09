const puppeteer = require('puppeteer');
const urls = [
  'https://garage-mash.com/',
  'https://garage-mash.com/#about',
  'https://garage-mash.com/#services',
  'https://garage-mash.com/#portfolio',
  'https://garage-mash.com/#contact',
  'https://garage-mash.com/notfound',
  'https://garage-mash.com/notfound/',
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  let index = 0;
  for (const url of urls) {
    await page.goto(url);
    await page.screenshot({ path: 'screenshots/' + index + '_default.png' });

    const devices = [
      { name: 'iPhone SE', fileName: index + '_iphone-se.png' },
      { name: 'iPhone 13 Pro', fileName: index + '_iphone-13-pro.png' },
      { name: 'iPad Pro 11', fileName: index + '_ipad-pro-11.png' },
    ];
    for (const device of devices) {
      const dev = puppeteer.KnownDevices[device.name];
      await page.emulate(dev);
      await page.goto(url);
      await page.screenshot(
        { path: 'screenshots/' + device.fileName, fullPage: true }
      );
    }

    index = index + 1
  }

  await browser.close();
})();
