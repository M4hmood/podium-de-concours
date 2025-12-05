import type { VercelRequest, VercelResponse } from "@vercel/node";

// Import the production server
let server: any;

async function handler(req: VercelRequest, res: VercelResponse) {
  if (!server) {
    // Load the bundled server on first request
    server = require("../dist/index.cjs");
  }

  // Handle the request through the Express app
  return server.default(req, res);
}

export default handler;
