// build.ts
import { build } from "bun";
import tailwind from "bun-plugin-tailwind";
import path from "path";
import { existsSync, copyFileSync, writeFileSync, rmSync, mkdirSync, readdirSync, lstatSync } from "fs";

const outdir = path.join(process.cwd(), "static", "dist");

// Clean output
if (existsSync(outdir)) rmSync(outdir, { recursive: true });
mkdirSync(outdir, { recursive: true });

// @ts-ignore
await build({
  entrypoints: ["./src/client/main.tsx", "./src/styles/globals.css"],
  outdir: "static/dist",
  target: "browser",
  minify: true,
  sourcemap: "none",
  plugins: [tailwind],
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
});

// Support old layout
const nestedCssA = path.join(outdir, "client", "styles", "globals.css");
const nestedCssB = path.join(outdir, "styles", "globals.css");
const rootCss = path.join(outdir, "globals.css");
if (existsSync(nestedCssA)) {
  copyFileSync(nestedCssA, rootCss);
} else if (existsSync(nestedCssB)) {
  copyFileSync(nestedCssB, rootCss);
}

// Normalize client bundle to static/dist/main.js
const nestedJsA = path.join(outdir, "client", "main.js");
const nestedJsB = path.join(outdir, "client", "main.mjs");
const rootJs = path.join(outdir, "main.js");
if (existsSync(nestedJsA)) {
  copyFileSync(nestedJsA, rootJs);
} else if (existsSync(nestedJsB)) {
  copyFileSync(nestedJsB, rootJs);
}

// Emit exactly one index.html referencing built assets
const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>seh-nya</title>
<link rel="stylesheet" href="/static/dist/globals.css"/>
</head>
<body class="min-h-screen"><div id="root"></div>
<script type="module" src="/static/dist/main.js"></script>
</body></html>`;
writeFileSync(path.join(outdir, "index.html"), html);

// Copy everything from public/ into static/dist so links like /resume.pdf or /avatar-me.png work at runtime
const publicDir = path.join(process.cwd(), "public");
function copyDir(src: string, dest: string) {
  if (!existsSync(src)) return;
  if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    // Do not overwrite the built index.html
    if (entry.toLowerCase() === "index.html") continue;
    const s = path.join(src, entry);
    const d = path.join(dest, entry);
    const stat = lstatSync(s);
    if (stat.isDirectory()) {
      copyDir(s, d);
    } else if (stat.isFile()) {
      copyFileSync(s, d);
    }
  }
}
copyDir(publicDir, outdir);
