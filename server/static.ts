import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // In production (Vercel), static files are in the dist directory
  // When bundled by esbuild, __dirname will be the dist folder
  let distPath = path.resolve(__dirname, "public");
  
  // Fallback for different deployment environments
  if (!fs.existsSync(distPath)) {
    distPath = path.resolve(process.cwd(), "dist", "public");
  }
  
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath, { maxAge: "1h" }));

  // fall through to index.html if the file doesn't exist (for SPA routing)
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
