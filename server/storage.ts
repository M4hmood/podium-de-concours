import { type User, type InsertUser, type Team, type InsertTeam } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Team methods
  getAllTeams(): Promise<Team[]>;
  getTeam(id: number): Promise<Team | undefined>;
  createTeam(team: InsertTeam & { id: number }): Promise<Team>;
  updateTeamScore(id: number, score: number): Promise<Team | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private teams: Map<number, Team>;

  constructor() {
    this.users = new Map();
    this.teams = new Map();
    
    // Initialize with mock teams
    const initialTeams: Team[] = [
      { id: 1, name: "Team Alpha", score: 85 },
      { id: 2, name: "Cyber Owls", score: 92 },
      { id: 3, name: "Night Coders", score: 67 },
      { id: 4, name: "Pixel Pirates", score: 40 },
      { id: 5, name: "Code Ninjas", score: 55 },
      { id: 6, name: "Binary Blazers", score: 78 },
      { id: 7, name: "Data Dragons", score: 63 },
      { id: 8, name: "Tech Titans", score: 71 },
    ];
    
    initialTeams.forEach(team => this.teams.set(team.id, team));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllTeams(): Promise<Team[]> {
    return Array.from(this.teams.values());
  }

  async getTeam(id: number): Promise<Team | undefined> {
    return this.teams.get(id);
  }

  async createTeam(team: InsertTeam & { id: number }): Promise<Team> {
    const newTeam: Team = { ...team };
    this.teams.set(team.id, newTeam);
    return newTeam;
  }

  async updateTeamScore(id: number, score: number): Promise<Team | undefined> {
    const team = this.teams.get(id);
    if (!team) return undefined;
    
    const updatedTeam: Team = { ...team, score };
    this.teams.set(id, updatedTeam);
    return updatedTeam;
  }
}

export const storage = new MemStorage();
