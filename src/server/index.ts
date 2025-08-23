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
  if (filePath.endsWith(".mjs")) return "application/javascript; charset=utf-8";
  if (filePath.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  if (filePath.endsWith(".ico")) return "image/x-icon";
  if (filePath.endsWith(".json") || filePath.endsWith(".map")) return "application/json";
  if (filePath.endsWith(".wasm")) return "application/wasm";
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
  // Built assets under /static/* (supports optional /static/dist/* as well)
if (url.pathname.startsWith("/static/")) {
  let rel = url.pathname.slice("/static/".length);
  // Normalize to avoid double "dist" when client requests /static/dist/*
  if (rel.startsWith("dist/")) rel = rel.slice("dist/".length);

  // Alias common top-level asset paths to where Bun actually outputs them
  // These help when index.html points to /static/main.js or /static/styles.css
  if (rel === "main.js") rel = path.join("client", "main.js");
  if (rel === "styles.css") rel = path.join("styles", "globals.css");

  const filePath = path.join(distDir, rel);
  if (existsSync(filePath)) return fileResponse(filePath, guessType(filePath));
  return new Response("Not Found", { status: 404 });
}


    // Optional: raw files from /public (favicon, etc.)
    const maybePublic = path.join(publicDir, url.pathname);
    if (existsSync(maybePublic) && !maybePublic.endsWith("/")) {
      return fileResponse(maybePublic, guessType(maybePublic));
    }

    // SPA fallback → serve index.html only for real navigations
    // Only return index.html when Accept includes text/html and the path has no extension
    const accept = req.headers.get("accept") || "*/*";
    const wantsHtml = accept.includes("text/html");
    const hasExtension = path.extname(url.pathname) !== "";
    if (!wantsHtml || hasExtension) {
      // Avoid returning HTML for asset-like requests to prevent MIME errors
      return new Response("Not Found", { status: 404 });
    }

    // Control which index to serve when both exist via SERVE_INDEX env var:
    //   SERVE_INDEX=public → prefer public/index.html
    //   SERVE_INDEX=dist   → prefer static/dist/index.html
    // Default: prefer built (dist) then public
    const prefer = (process.env.SERVE_INDEX || "").toLowerCase();
    const builtIndex = path.join(distDir, "index.html");
    const publicIndex = path.join(publicDir, "index.html");

    function withServedHeader(res: Response, which: string) {
      const headers = new Headers(res.headers);
      headers.set("X-Served-Index", which);
      return new Response(res.body, { status: res.status, headers });
    }

    if (prefer === "public") {
      if (existsSync(publicIndex)) {
        return withServedHeader(
          fileResponse(publicIndex, "text/html; charset=utf-8"),
          "public"
        );
      }
      if (existsSync(builtIndex)) {
        return withServedHeader(
          fileResponse(builtIndex, "text/html; charset=utf-8"),
          "dist"
        );
      }
    } else {
      if (existsSync(builtIndex)) {
        return withServedHeader(
          fileResponse(builtIndex, "text/html; charset=utf-8"),
          "dist"
        );
      }
      if (existsSync(publicIndex)) {
        return withServedHeader(
          fileResponse(publicIndex, "text/html; charset=utf-8"),
          "public"
        );
      }
    }

    return new Response("index.html not found", { status: 404 });
  },
});

console.log(`➜  Server running on 0.0.0.0:${PORT}`);
