import puppeteer from "puppeteer-core";

const url = process.env.URL ?? "http://localhost:5173/";
const out = process.argv[2] ?? "shots/mine.png";
const width = Number(process.argv[3] ?? 1280);
const height = Number(process.argv[4] ?? 853);

const browser = await puppeteer.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--hide-scrollbars", "--font-render-hinting=none"],
});
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1800)); // let entrance animations settle
await page.screenshot({ path: out });
console.log("saved", out);
await browser.close();
