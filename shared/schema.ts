import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Team schema for the competition
export const teams = pgTable("teams", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  score: integer("score").notNull().default(0),
});

export const insertTeamSchema = createInsertSchema(teams).omit({ id: true });
export const updateTeamScoreSchema = z.object({
  id: z.number(),
  score: z.number().min(0).max(100),
});

export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type UpdateTeamScore = z.infer<typeof updateTeamScoreSchema>;
export type Team = typeof teams.$inferSelect;
