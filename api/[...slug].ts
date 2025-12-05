import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

export default function handler(req: VercelRequest, res: VercelResponse) {
  console.log("[Static Handler] URL:", req.url);
  console.log("[Static Handler] CWD:", process.cwd());
  
  // Try different possible paths for dist
  const possiblePaths = [
    path.join(process.cwd(), "dist", "public"),
    path.join(process.cwd(), ".vercel", "output", "static"),
  ];

  let distPath = possiblePaths[0];
  
  // Find which path exists
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      distPath = p;
      console.log("[Static Handler] Found dist at:", distPath);
      break;
    }
  }

  // For root path, serve index.html
  if (req.url === "/" || req.url === "") {
    try {
      const indexPath = path.join(distPath, "index.html");
      console.log("[Static Handler] Serving index.html from:", indexPath);
      const indexContent = fs.readFileSync(indexPath, "utf-8");
      res.setHeader("Content-Type", "text/html");
      res.status(200).send(indexContent);
      return;
    } catch (error) {
      console.error("[Static Handler] Error reading index.html:", error);
    }
  }

  // Try to serve requested file
  const filePath = path.join(distPath, req.url === "/" ? "index.html" : req.url);

  // Security: prevent directory traversal
  if (!filePath.startsWith(distPath)) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const content = fs.readFileSync(filePath);
      const ext = path.extname(filePath);

      // Set appropriate content type
      const contentType: Record<string, string> = {
        ".html": "text/html; charset=utf-8",
        ".css": "text/css",
        ".js": "application/javascript",
        ".mjs": "application/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
      };

      res.setHeader("Content-Type", contentType[ext] || "application/octet-stream");
      res.status(200).send(content);
      return;
    }
  } catch (error) {
    console.error("[Static Handler] Error serving file:", error);
  }

  // Fallback: serve index.html for SPA routing
  try {
    const indexPath = path.join(distPath, "index.html");
    console.log("[Static Handler] Fallback to index.html:", indexPath);
    const indexContent = fs.readFileSync(indexPath, "utf-8");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(indexContent);
  } catch (error) {
    console.error("[Static Handler] Error:", error);
    res.status(404).json({ error: "Not found", path: filePath });
  }
}
