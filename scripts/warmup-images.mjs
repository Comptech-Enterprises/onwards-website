import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const HOST = process.env.WARMUP_HOST || "http://127.0.0.1:3000";

function extractUrlsFromFile(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, "utf-8");
  const matches = content.match(/https:\/\/pub-3b83e50fb69e4560821c6dd2d4c277a1\.r2\.dev[^\s"'\`,]+/g) || [];
  return [...new Set(matches)];
}

const targetFiles = [
  path.join(rootDir, "src/data/solutions.ts"),
  path.join(rootDir, "src/data/locations.ts"),
  path.join(rootDir, "src/components/HeroSection.tsx"),
];

const allUrls = new Set();
for (const file of targetFiles) {
  extractUrlsFromFile(file).forEach((u) => allUrls.add(u));
}

const urls = Array.from(allUrls);
console.log(`Found ${urls.length} primary images to warm up.`);

const SIZES = [640, 1200];
const queue = [];

for (const u of urls) {
  for (const w of SIZES) {
    queue.push(`${HOST}/_next/image?url=${encodeURIComponent(u)}&w=${w}&q=75`);
  }
}

console.log(`Total cache targets to warm up: ${queue.length}`);

const CONCURRENCY = 6;
let completed = 0;
let errors = 0;

async function worker() {
  while (queue.length > 0) {
    const target = queue.shift();
    try {
      const res = await fetch(target, {
        headers: {
          Accept: "image/webp,image/avif,image/*,*/*;q=0.8",
          Host: "onwardworkspaces.com",
        },
      });
      if (!res.ok) {
        errors++;
      } else {
        await res.arrayBuffer();
      }
    } catch {
      errors++;
    }
    completed++;
    if (completed % 10 === 0 || completed === queue.length) {
      process.stdout.write(`\rProgress: ${completed}/${completed + queue.length} (Errors: ${errors})`);
    }
  }
}

const startTime = Date.now();
await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
console.log(`\nImage warm-up completed in ${((Date.now() - startTime) / 1000).toFixed(1)}s.`);
