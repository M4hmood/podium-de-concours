import type { VercelRequest, VercelResponse } from "@vercel/node";

// Import the production server
let server: any;

async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("[Vercel API] Request:", req.method, req.url);
  
  try {
    if (!server) {
      console.log("[Vercel API] Loading bundled server...");
      // Load the bundled server on first request
      server = require("../dist/index.cjs");
      console.log("[Vercel API] Server loaded successfully");
    }

    // Handle the request through the Express app
    console.log("[Vercel API] Routing to Express app");
    return server.default(req, res);
  } catch (error) {
    console.error("[Vercel API] Error:", error);
    res.status(500).json({ error: "Internal Server Error", message: String(error) });
  }
}

export default handler;
