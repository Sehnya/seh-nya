// build.ts
import { build } from "bun";
import tailwind from "bun-plugin-tailwind";
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

await build({
  entrypoints: ["./src/client/main.tsx", "./src/styles/globals.css"],
  outdir,
  target: "browser",
  minify: true,
  sourcemap: "external",
  plugins: [tailwind],
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
  },
});

// Copy index.html
if (existsSync(publicIndex)) {
  copyFileSync(publicIndex, distIndex);
}

console.log("✅ Build complete");
