import { build, $ } from "bun";
import path from "path";
import { rmSync, mkdirSync, existsSync } from "fs";

const outdir = path.join(process.cwd(), "static", "dist");

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

console.log("✅ Build complete");
