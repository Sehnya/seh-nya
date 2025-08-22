from __future__ import annotations

import os
from pathlib import Path
from flask import Flask, jsonify, send_from_directory, Response

# Paths
ROOT_DIR = Path(__file__).parent.resolve()
PUBLIC_DIR = ROOT_DIR / "public"
STATIC_DIST_DIR = ROOT_DIR / "static" / "dist"

# Flask configured to serve /static/dist/* from STATIC_DIST_DIR
app = Flask(
    __name__,
    static_folder=str(STATIC_DIST_DIR),
    static_url_path="/static/dist",
)


@app.get("/api/hello")
def api_hello() -> Response:
    return jsonify({"message": "Hello from Flask"})


# SPA + public assets handler
# - If the requested path is an existing file inside /public, serve it
# - Otherwise, return index.html to allow React Router to handle the route
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def spa_or_public(path: str):
    # Avoid intercepting the API namespace here
    if path.startswith("api/"):
        return ("Not Found", 404)

    # Serve files that exist in /public (e.g., /favicon.ico, /robots.txt)
    public_candidate = (PUBLIC_DIR / path).resolve()
    # Ensure the file is within PUBLIC_DIR to avoid path traversal
    try:
        public_candidate.relative_to(PUBLIC_DIR)
    except Exception:
        public_candidate = None

    if path and public_candidate and public_candidate.is_file():
        return send_from_directory(str(PUBLIC_DIR), path)

    # Fallback to the SPA shell
    return send_from_directory(str(PUBLIC_DIR), "index.html")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "3000"))
    # Using Flask's built-in server for simplicity
    # Ensure frontend is built first: `bun run build`
    print(f"➜  Flask server running on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port)
