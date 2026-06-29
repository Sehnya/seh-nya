import { watch } from "fs";
import { spawn } from "bun";
import path from "path";

const srcDir = path.join(process.cwd(), "src");

let building = false;
let queued = false;

async function build() {
  if (building) {
    queued = true;
    return;
  }
  building = true;
  console.log("\x1b[36m[watch]\x1b[0m Rebuilding...");
  const start = Date.now();
  const proc = spawn(["bun", "run", "build.ts"], { cwd: process.cwd(), stdout: "inherit", stderr: "inherit" });
  await proc.exited;
  console.log(`\x1b[32m[watch]\x1b[0m Done in ${Date.now() - start}ms`);
  building = false;
  if (queued) {
    queued = false;
    build();
  }
}

// Initial build
await build();

// Watch src/ and public/
let debounce: ReturnType<typeof setTimeout> | null = null;

for (const dir of [srcDir]) {
  watch(dir, { recursive: true }, (_event, filename) => {
    // Ignore non-source files
    if (!filename) return;
    if (filename.includes("node_modules")) return;
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(() => {
      console.log(`\x1b[33m[watch]\x1b[0m Changed: ${filename}`);
      build();
    }, 300);
  });
}

console.log("\x1b[36m[watch]\x1b[0m Watching src/ for changes...");
