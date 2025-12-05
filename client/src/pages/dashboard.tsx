import { useState } from "react";
import HeroHeader from "@/components/HeroHeader";
import Podium from "@/components/Podium";
import Leaderboard from "@/components/Leaderboard";
import ScoreUpdateDialog from "@/components/ScoreUpdateDialog";
import ThemeToggle from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

// todo: remove mock functionality - this will be replaced with API data
const initialTeams = [
  { id: 1, name: "Team Alpha", score: 85 },
  { id: 2, name: "Cyber Owls", score: 92 },
  { id: 3, name: "Night Coders", score: 67 },
  { id: 4, name: "Pixel Pirates", score: 40 },
  { id: 5, name: "Code Ninjas", score: 55 },
  { id: 6, name: "Binary Blazers", score: 78 },
  { id: 7, name: "Data Dragons", score: 63 },
  { id: 8, name: "Tech Titans", score: 71 },
];

export default function Dashboard() {
  // todo: remove mock functionality - replace with useQuery
  const [teams, setTeams] = useState(initialTeams);

  const handleUpdateScore = (teamId: number, newScore: number) => {
    // todo: remove mock functionality - replace with mutation
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, score: newScore } : t))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h2 className="text-base font-bold">Nuit de l'Info</h2>
              <p className="text-xs text-muted-foreground">2025 Edition</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="hidden sm:flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live
            </Badge>
            <ScoreUpdateDialog teams={teams} onUpdateScore={handleUpdateScore} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        <HeroHeader />

        <section className="py-8" aria-labelledby="podium-title">
          <h2 id="podium-title" className="sr-only">Top 3 Teams</h2>
          <Podium teams={teams} />
        </section>

        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-sm text-muted-foreground font-medium">
              Complete Standings
            </span>
          </div>
        </div>

        <section className="py-8 pb-16" aria-labelledby="leaderboard-title">
          <h2 id="leaderboard-title" className="sr-only">Full Leaderboard</h2>
          <Leaderboard teams={teams} />
        </section>
      </main>

      <footer className="border-t py-8 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Podium des Concours — Nuit de l'Info 2025
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Real-time competition tracking
          </p>
        </div>
      </footer>
    </div>
  );
}
