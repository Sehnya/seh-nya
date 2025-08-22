import { serve } from "bun";
import path from "path";
import { statSync, existsSync } from "fs";

const PORT = Number(process.env.PORT ?? 3000);
const HOST = "0.0.0.0";
const root = process.cwd();
const publicDir = path.join(root, "public");
const distDir = path.join(root, "static", "dist");

function fileResponse(filePath: string, contentType = "text/plain") {
  try {
    const stat = statSync(filePath);
    return new Response(Bun.file(filePath), {
      headers: {
        "content-type": contentType,
        "content-length": String(stat.size),
        "cache-control": filePath.includes("/static/") ? "public, max-age=31536000, immutable" : "no-cache",
      },
    });
  } catch (e) {
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
  hostname: HOST,
  async fetch(req) {
    const url = new URL(req.url);

    // API routes
    if (url.pathname.startsWith("/api/")) {
      if (url.pathname === "/api/hello") {
        return Response.json({ message: "Hello from Bun" });
      }
      return new Response("Not Found", { status: 404 });
    }

    // Serve static assets from /static/dist
    if (url.pathname.startsWith("/static/")) {
      const rel = url.pathname.replace("/static/", "");
      const filePath = path.join(distDir, rel);
      if (existsSync(filePath)) {
        return fileResponse(filePath, guessType(filePath));
      }
      return new Response("Not Found", { status: 404 });
    }

    // Serve public files (e.g., favicon)
    const maybePublic = path.join(publicDir, url.pathname);
    if (existsSync(maybePublic) && !maybePublic.endsWith("/")) {
      return fileResponse(maybePublic, guessType(maybePublic));
    }

    // SPA fallback -> static/dist/index.html
    const indexHtml = path.join(distDir, "index.html");
    return fileResponse(indexHtml, "text/html; charset=utf-8");
  },
});

console.log(`➜  Server running on ${HOST}:${PORT}`);
