import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { updateTeamScoreSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // GET all teams
  app.get("/api/teams", async (req, res) => {
    try {
      const teams = await storage.getAllTeams();
      res.json(teams);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch teams" });
    }
  });

  // POST update team score
  app.post("/api/teams/update", async (req, res) => {
    try {
      const parsed = updateTeamScoreSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Invalid request body",
          details: parsed.error.issues 
        });
      }
      
      const { id, score } = parsed.data;
      const updatedTeam = await storage.updateTeamScore(id, score);
      
      if (!updatedTeam) {
        return res.status(404).json({ error: "Team not found" });
      }
      
      res.json(updatedTeam);
    } catch (error) {
      res.status(500).json({ error: "Failed to update team score" });
    }
  });

  return httpServer;
}
