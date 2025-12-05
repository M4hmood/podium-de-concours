import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Serve index.html for SPA routing (all non-API routes)
  try {
    const indexPath = path.join(process.cwd(), "dist", "public", "index.html");
    
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, "utf-8");
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.status(200).send(indexContent);
      return;
    }
  } catch (error) {
    console.error("[SPA Handler] Error:", error);
  }

  res.status(404).json({ error: "Not found" });
}

