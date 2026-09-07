/**
 * Regenerates public/phones.* from the original artwork.
 * The crop trims the empty left half of the source and keeps the cluster's
 * pure-black background, which lets the image sit seamlessly on the page.
 */
import sharp from "sharp";

const SRC = "design/phones-source.jpg";
const CROP = { left: 530, top: 40, width: 750, height: 660 };

await sharp(SRC).extract(CROP).webp({ quality: 88 }).toFile("public/phones.webp");
await sharp(SRC).extract(CROP).jpeg({ quality: 90 }).toFile("public/phones.jpg");
console.log("wrote public/phones.webp and public/phones.jpg");
