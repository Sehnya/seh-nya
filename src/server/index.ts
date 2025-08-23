// src/server/index.ts
import { serve } from "bun";
import path from "path";
import { existsSync, statSync } from "fs";

const PORT = Number(process.env.PORT ?? 3000);
const distDir = path.join(process.cwd(), "static", "dist");

function send(file: string, type: string, cache: "static" | "html" = "static") {
  const stat = statSync(file);
  const isHtml = cache === "html";
  return new Response(Bun.file(file), {
    headers: {
      "content-type": type,
      "content-length": String(stat.size),
      "x-content-type-options": "nosniff",
      "cache-control": isHtml ? "no-cache" : "public, max-age=31536000, immutable",
    },
  });
}

function guessType(filePath: string) {
  const lower = filePath.toLowerCase();
  if (lower.endsWith(".html")) return "text/html; charset=utf-8";
  if (lower.endsWith(".mjs") || lower.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (lower.endsWith(".css")) return "text/css; charset=utf-8";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  if (lower.endsWith(".ico")) return "image/x-icon";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".avif")) return "image/avif";
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".json")) return "application/json; charset=utf-8";
  if (lower.endsWith(".wasm")) return "application/wasm";
  if (lower.endsWith(".map")) return "application/octet-stream";
  return "application/octet-stream";
}

// Ensure a path is within distDir to avoid path traversal
function isWithinDist(p: string) {
  const resolved = path.resolve(p);
  const base = path.resolve(distDir);
  return resolved === base || resolved.startsWith(base + path.sep);
}

serve({
  port: PORT,
  hostname: "0.0.0.0",
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/api/hello") {
      return Response.json({ message: "Hello from Bun" });
    }

    // Serve explicit /static/dist/* paths (back-compat)
    if (url.pathname.startsWith("/static/dist/")) {
      const rel = url.pathname.replace("/static/dist/", "");
      const file = path.join(distDir, rel);
      if (existsSync(file) && isWithinDist(file)) {
        return send(file, guessType(file), "static");
      }
      return new Response("Not found", { status: 404 });
    }

    // Serve any file that exists within distDir for its URL path (e.g., /assets/*, /avatar-me.png, /resume.pdf)
    if (path.extname(url.pathname)) {
      const rel = url.pathname.replace(/^\/+/, ""); // drop leading slash
      const file = path.join(distDir, rel);
      if (existsSync(file) && isWithinDist(file) && statSync(file).isFile()) {
        return send(file, guessType(file), "static");
      }
    }

    // SPA fallback to index.html
    if (url.pathname === "/" || !path.extname(url.pathname)) {
      const index = path.join(distDir, "index.html");
      if (existsSync(index)) return send(index, "text/html; charset=utf-8", "html");
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`➜ Server running on http://0.0.0.0:${PORT}`);
