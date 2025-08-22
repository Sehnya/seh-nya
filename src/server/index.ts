// src/server/index.ts (or wherever your server file is)
import { serve } from "bun";
import path from "path";
import { statSync, existsSync } from "fs";

const PORT = Number(process.env.PORT ?? 3000);
const root = process.cwd();
const publicDir = path.join(root, "public");      // optional
const distDir = path.join(root, "static", "dist");

function fileResponse(filePath: string, contentType = "text/plain") {
  try {
    const stat = statSync(filePath);
    return new Response(Bun.file(filePath), {
      headers: {
        "content-type": contentType,
        "content-length": String(stat.size),
        "cache-control": filePath.includes("/static/")
          ? "public, max-age=31536000, immutable"
          : "no-cache",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

function guessType(filePath: string) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  if (filePath.endsWith(".ico")) return "image/x-icon";
  if (filePath.endsWith(".json")) return "application/json";
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

    // Built assets under /static/dist/*
    if (url.pathname.startsWith("/static/dist/")) {
      const rel = url.pathname.slice("/static/dist/".length);
      const filePath = path.join(distDir, rel);
      if (existsSync(filePath)) return fileResponse(filePath, guessType(filePath));
      return new Response("Not Found", { status: 404 });
    }

    // Optional: raw files from /public (favicon, etc.)
    const maybePublic = path.join(publicDir, url.pathname);
    if (existsSync(maybePublic) && !maybePublic.endsWith("/")) {
      return fileResponse(maybePublic, guessType(maybePublic));
    }

    // SPA fallback → serve index.html (prefer built, fallback to public)
    const builtIndex = path.join(distDir, "index.html");
    if (existsSync(builtIndex)) {
      return fileResponse(builtIndex, "text/html; charset=utf-8");
    }
    const publicIndex = path.join(publicDir, "index.html");
    if (existsSync(publicIndex)) {
      return fileResponse(publicIndex, "text/html; charset=utf-8");
    }
    return new Response("index.html not found", { status: 404 });
  },
});

console.log(`➜  Server running on 0.0.0.0:${PORT}`);
