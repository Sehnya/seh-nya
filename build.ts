import { build } from "bun";
import tailwind from "bun-plugin-tailwind";
import path from "path";
import {
  rmSync, mkdirSync, existsSync,
  copyFileSync, readdirSync, statSync, readFileSync, writeFileSync
} from "fs";

const root = process.cwd();
const outdir = path.join(root, "static", "dist");
const publicDir = path.join(root, "public");

function cleanOutdir() {
  if (existsSync(outdir)) rmSync(outdir, { recursive: true, force: true });
  mkdirSync(outdir, { recursive: true });
}

function copyDir(src: string, dest: string) {
  if (!existsSync(src)) return;
  for (const name of readdirSync(src)) {
    const s = path.join(src, name);
    const d = path.join(dest, name);
    if (statSync(s).isDirectory()) {
      mkdirSync(d, { recursive: true });
      copyDir(s, d);
    } else {
      copyFileSync(s, d);
    }
  }
}

function rewriteIndexAssetPaths(file: string) {
  if (!existsSync(file)) return;
  let html = readFileSync(file, "utf8");
  // normalize any relative or /static/dist/* to the canonical /static/*
  html = html
    .replace(/href="(?:\.\/)?static\/dist\/styles\.css"|href="styles\.css"/, 'href="/static/styles.css"')
    .replace(/src="(?:\.\/)?static\/dist\/main\.js"|src="main\.js"/, 'src="/static/main.js"');
  writeFileSync(file, html, "utf8");
}

async function run() {
  console.log("Building frontend ->", outdir);
  cleanOutdir();

  // Bundle React entry + process Tailwind v4 (no external CLI)
  await build({
    entrypoints: [
      "./src/client/main.tsx",       // -> dist/main.js
      "./src/styles/globals.css",    // -> dist/client/styles/globals.css (plugin mirrors path)
    ],
    outdir,
    target: "browser",
    minify: true,
    sourcemap: process.env.NODE_ENV === "development" ? "external" : "none",
    plugins: [tailwind],
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
    },
    publicPath: "/static", // public URLs start with /static/*
  });

  // Ensure a root-level styles.css exists (copy from mirrored path if needed)
  const nestedCss = path.join(outdir, "client", "styles", "globals.css");
  const rootCss = path.join(outdir, "styles.css");
  if (existsSync(nestedCss)) copyFileSync(nestedCss, rootCss);

  // Copy everything in /public into the dist folder (index.html, assets, pdf, etc.)
  copyDir(publicDir, outdir);

  // Make sure index.html references /static/main.js and /static/styles.css
  rewriteIndexAssetPaths(path.join(outdir, "index.html"));

  console.log("✅ Build complete");
}

await run();
