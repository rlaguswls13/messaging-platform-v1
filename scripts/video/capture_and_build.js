const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const puppeteer = require('./node_modules/puppeteer-core');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  let filePath;
  if (reqPath.startsWith('/slides')) {
    filePath = path.join(__dirname, 'slides_template.html');
  } else {
    filePath = path.join(__dirname, '..', 'docs', reqPath === '/' ? 'index.html' : reqPath);
  }
  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(content);
    }
  });
});

async function main() {
  await new Promise(r => server.listen(4567, r));
  console.log('Static server ready on port 4567');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  // 1. Capture dedicated slides
  console.log('Capturing custom slides...');
  await page.goto('http://localhost:4567/slides', { waitUntil: 'networkidle0' });

  for (const num of [1, 2, 4, 5, 6]) {
    const el = await page.$(`#slide-${num}`);
    if (el) {
      await el.screenshot({ path: path.join(__dirname, `slide_${num}.png`) });
      console.log(`Captured slide_${num}.png`);
    }
  }

  // 2. Capture React showcase views
  console.log('Capturing React showcase screens...');
  await page.goto('http://localhost:4567/index.html', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  // Scroll to #templates (AI Demo)
  await page.evaluate(() => {
    const el = document.getElementById('templates');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(__dirname, 'slide_3_ai.png') });
  console.log('Captured slide_3_ai.png');

  // Scroll to #dashboard (Google Search Console style dashboard)
  await page.evaluate(() => {
    const el = document.getElementById('dashboard');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(__dirname, 'slide_3_dash.png') });
  console.log('Captured slide_3_dash.png');

  await browser.close();
  server.close();
  console.log('ALL_SCREENSHOTS_CAPTURED');
}

main().catch(err => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
