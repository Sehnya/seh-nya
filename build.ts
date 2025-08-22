import { build, $ } from "bun";
import path from "path";
import { rmSync, mkdirSync, existsSync, copyFileSync } from "fs";

const outdir = path.join(process.cwd(), "static", "dist");
const publicIndex = path.join(process.cwd(), "public", "index.html");
const distIndex = path.join(outdir, "index.html");

if (existsSync(outdir)) {
  rmSync(outdir, { recursive: true, force: true });
}
mkdirSync(outdir, { recursive: true });

console.log("Building frontend ->", outdir);

// Build Tailwind CSS via CLI (v4)
await $`bunx tailwindcss -i ./src/styles/globals.css -o ${outdir}/styles.css --minify`;

await build({
  entrypoints: ["./src/client/main.tsx"],
  outdir,
  target: "browser",
  minify: true,
  sourcemap: "external",
  publicPath: "/static/dist",
  plugins: [],
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
  },
});

// Ensure SPA shell is available at static/dist/index.html
if (existsSync(publicIndex)) {
  copyFileSync(publicIndex, distIndex);
}

console.log("✅ Build complete");
