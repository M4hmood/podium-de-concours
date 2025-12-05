import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Try to serve static files from dist/public
  const filePath = path.join(process.cwd(), "dist", "public", req.url);

  // Security: prevent directory traversal
  if (!filePath.startsWith(path.join(process.cwd(), "dist", "public"))) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  // Check if file exists
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const content = fs.readFileSync(filePath);
    const ext = path.extname(filePath);

    // Set appropriate content type
    const contentType: Record<string, string> = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
    };

    res.setHeader("Content-Type", contentType[ext] || "application/octet-stream");
    res.status(200).send(content);
    return;
  }

  // Serve index.html for SPA routing
  try {
    const indexPath = path.join(process.cwd(), "dist", "public", "index.html");
    const indexContent = fs.readFileSync(indexPath, "utf-8");
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(indexContent);
  } catch (error) {
    res.status(404).json({ error: "Not found" });
  }
}
