import sharp from "sharp";

/** Measures the same landmarks on the reference and on a render, side by side. */
async function load(f) {
  const { data, info } = await sharp(f).raw().toBuffer({ resolveWithObject: true });
  return { data, W: info.width, H: info.height, C: info.channels };
}
const px = (im, x, y) => {
  const i = (y * im.W + x) * im.C;
  return [im.data[i], im.data[i + 1], im.data[i + 2]];
};
const lum = (p) => 0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2];
const white = (p) => lum(p) > 85;
const lime = (p) => p[1] > 45 && p[1] - p[0] > 12 && p[1] - p[2] > 18;
const dim = (p) => p[1] > 25 && p[1] - p[0] > 8 && p[1] - p[2] > 10;

function bbox(im, [x0, y0, x1, y1], test) {
  let a = [9e9, 9e9, -1, -1];
  for (let y = y0; y < y1; y++)
    for (let x = x0; x < x1; x++)
      if (test(px(im, x, y))) {
        a[0] = Math.min(a[0], x); a[1] = Math.min(a[1], y);
        a[2] = Math.max(a[2], x); a[3] = Math.max(a[3], y);
      }
  return a[2] < 0 ? null : { x: a[0], y: a[1], w: a[2] - a[0] + 1, h: a[3] - a[1] + 1 };
}

/** Vertical bands of content in the left copy column. */
function bands(im, xMax = 540, y0 = 105, y1 = 853) {
  const out = [];
  let cur = null;
  for (let y = y0; y < y1; y++) {
    let n = 0, minx = 9e9;
    for (let x = 0; x < xMax; x++)
      if (white(px(im, x, y))) { n++; minx = Math.min(minx, x); }
    if (n > 3) cur = cur ? { ...cur, y1: y, x: Math.min(cur.x, minx) } : { y0: y, y1: y, x: minx };
    else if (cur) { if (cur.y1 - cur.y0 > 4) out.push(cur); cur = null; }
  }
  if (cur && cur.y1 - cur.y0 > 4) out.push(cur);
  return out;
}

const LANDMARKS = {
  "hdr brand":   [[30, 20, 600, 60], white],
  "hdr tagline": [[30, 60, 600, 88], (p) => lum(p) > 60],
  "hdr ig box":  [[1000, 15, 1075, 85], dim],
  "h1 line1":    [[30, 165, 540, 232], white],
  "h1 into":     [[30, 236, 210, 294], white],
  "h1 lime":     [[205, 236, 540, 294], lime],
  "h1 line3":    [[30, 298, 540, 358], white],
  "offer box":   [[30, 462, 520, 592], dim],
  "cta":         [[30, 580, 520, 664], white],
  "microcopy":   [[30, 660, 520, 694], (p) => lum(p) > 60],
  "stat1 icon":  [[30, 730, 125, 825], dim],
  "stat1 text":  [[120, 730, 340, 825], white],
};

const ref = await load(process.argv[2] ?? "design/reference-full.jpg");
const mine = await load(process.argv[3] ?? "shots/mine.png");

const fmt = (b) => (b ? `x${String(b.x).padStart(4)} y${String(b.y).padStart(4)} w${String(b.w).padStart(4)} h${String(b.h).padStart(3)}` : "        —  none");
console.log("landmark".padEnd(13), "reference".padEnd(28), "render".padEnd(28), "Δx  Δy  Δw  Δh");
for (const [name, [rect, test]] of Object.entries(LANDMARKS)) {
  const a = bbox(ref, rect, test);
  const b = bbox(mine, rect, test);
  const d = a && b ? `${String(b.x - a.x).padStart(3)} ${String(b.y - a.y).padStart(3)} ${String(b.w - a.w).padStart(3)} ${String(b.h - a.h).padStart(3)}` : "";
  console.log(name.padEnd(13), fmt(a).padEnd(28), fmt(b).padEnd(28), d);
}

console.log("\ncopy-column bands (y0..y1, left edge)");
const ba = bands(ref), bb = bands(mine);
for (let i = 0; i < Math.max(ba.length, bb.length); i++) {
  const a = ba[i], b = bb[i];
  const s = (v) => (v ? `${String(v.y0).padStart(3)}..${String(v.y1).padStart(3)} x${v.x}` : "     —   ");
  console.log(String(i).padStart(2), s(a).padEnd(16), s(b).padEnd(16), a && b ? `Δy0 ${b.y0 - a.y0}` : "");
}
