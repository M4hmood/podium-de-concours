import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../../server/storage";
import { updateTeamScoreSchema } from "@shared/schema";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    if (req.url === "/api/teams" && req.method === "GET") {
      const teams = await storage.getAllTeams();
      res.status(200).json(teams);
    } else if (req.url === "/api/teams/update" && req.method === "POST") {
      const parsed = updateTeamScoreSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          error: "Invalid request body",
          details: parsed.error.issues,
        });
      }

      const { id, score } = parsed.data;
      const updatedTeam = await storage.updateTeamScore(id, score);

      if (!updatedTeam) {
        return res.status(404).json({ error: "Team not found" });
      }

      res.status(200).json(updatedTeam);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
