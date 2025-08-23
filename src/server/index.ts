import { serve } from "bun";
import path from "path";
import { statSync, existsSync } from "fs";

const PORT = Number(process.env.PORT ?? 3000);
const root = process.cwd();
const publicDir = path.join(root, "public");
const distDir = path.join(root, "static", "dist");

function fileResponse(filePath: string, contentType = "application/octet-stream") {
  try {
    const stat = statSync(filePath);
    return new Response(Bun.file(filePath), {
      headers: {
        "content-type": contentType,
        "content-length": String(stat.size),
        "x-content-type-options": "nosniff",
        "cache-control": filePath.includes(`${path.sep}static${path.sep}`)
          ? "public, max-age=31536000, immutable"
          : "no-cache",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
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
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".json") || lower.endsWith(".map")) return "application/json";
  if (lower.endsWith(".wasm")) return "application/wasm";
  return "application/octet-stream";
}

serve({
  port: PORT,
  hostname: "0.0.0.0",
  async fetch(req) {
    const url = new URL(req.url);

    // API
    if (url.pathname.startsWith("/api/")) {
      if (url.pathname === "/api/hello") {
        return Response.json({ message: "Hello from Bun" });
      }
      return new Response("Not Found", { status: 404 });
    }

    // Static assets: /static/* -> static/dist/*
    if (url.pathname.startsWith("/static/")) {
      let rel = url.pathname.slice("/static/".length);
      // normalize if client requested /static/dist/*
      if (rel.startsWith("dist/")) rel = rel.slice("dist/".length);
      const filePath = path.join(distDir, rel);
      if (existsSync(filePath)) return fileResponse(filePath, guessType(filePath));
      return new Response("Not Found", { status: 404 });
    }

    // Direct files from /public (favicon, pdf, etc.)
    const maybePublic = path.join(publicDir, url.pathname);
    if (existsSync(maybePublic) && !maybePublic.endsWith(path.sep)) {
      return fileResponse(maybePublic, guessType(maybePublic));
    }

    // SPA fallback (serve index.html for real navigations)
    const accept = req.headers.get("accept") || "*/*";
    const wantsHtml = accept.includes("text/html") || accept === "*/*";
    const hasExtension = path.extname(url.pathname) !== "";

    // If it's "/" always serve HTML
    if (url.pathname === "/") {
      const prefer = (process.env.SERVE_INDEX || "").toLowerCase();
      const builtIndex = path.join(distDir, "index.html");
      const publicIndex = path.join(publicDir, "index.html");

      if (prefer === "public") {
        if (existsSync(publicIndex)) return fileResponse(publicIndex, "text/html; charset=utf-8");
        if (existsSync(builtIndex)) return fileResponse(builtIndex, "text/html; charset=utf-8");
      } else {
        if (existsSync(builtIndex)) return fileResponse(builtIndex, "text/html; charset=utf-8");
        if (existsSync(publicIndex)) return fileResponse(publicIndex, "text/html; charset=utf-8");
      }
      return new Response("index.html not found", { status: 404 });
    }

    if (!wantsHtml || hasExtension) {
      return new Response("Not Found", { status: 404 });
    }

    const builtIndex = path.join(distDir, "index.html");
    if (existsSync(builtIndex)) return fileResponse(builtIndex, "text/html; charset=utf-8");
    const publicIndex = path.join(publicDir, "index.html");
    if (existsSync(publicIndex)) return fileResponse(publicIndex, "text/html; charset=utf-8");

    return new Response("index.html not found", { status: 404 });
  },
});

console.log(`➜  Server running on 0.0.0.0:${PORT}`);
