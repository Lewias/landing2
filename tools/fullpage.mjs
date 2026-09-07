import puppeteer from "puppeteer-core";
const url = process.env.URL ?? "http://localhost:5173/";
const out = process.argv[2] ?? "shots/full.png";
const width = Number(process.argv[3] ?? 1440);
const height = Number(process.argv[4] ?? 900);
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true, args: ["--hide-scrollbars", "--font-render-hinting=none"],
});
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 1 });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.goto(url, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
// scroll through so every whileInView reveal fires, then return to the top
await page.evaluate(async () => {
  const step = window.innerHeight * 0.5;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 320));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 600));
});
await new Promise((r) => setTimeout(r, 1200));
const metrics = await page.evaluate(() => ({
  scrollH: document.documentElement.scrollHeight,
  scrollW: document.documentElement.scrollWidth,
  clientW: document.documentElement.clientWidth,
  sections: [...document.querySelectorAll("main > section, main > div")].map((s) => ({
    id: s.id || s.tagName.toLowerCase(),
    top: Math.round(s.getBoundingClientRect().top + window.scrollY),
    h: Math.round(s.getBoundingClientRect().height),
  })),
  hidden: [...document.querySelectorAll("main *, footer *")].filter(
    (el) => getComputedStyle(el).opacity === "0",
  ).length,
}));
console.log(JSON.stringify(metrics, null, 1));
if (errors.length) console.log("PAGE ERRORS:", errors.slice(0, 5));
await page.screenshot({ path: out, fullPage: true });
console.log("saved", out);
await browser.close();
