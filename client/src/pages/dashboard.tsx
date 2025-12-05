import { useState } from "react";
import HeroHeader from "@/components/HeroHeader";
import Podium from "@/components/Podium";
import Leaderboard from "@/components/Leaderboard";
import ScoreUpdateDialog from "@/components/ScoreUpdateDialog";
import ThemeToggle from "@/components/ThemeToggle";
import { Separator } from "@/components/ui/separator";

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
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Nuit de l'Info 2025</h2>
          <div className="flex items-center gap-2">
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

        <Separator className="my-8" />

        <section className="py-8 pb-16" aria-labelledby="leaderboard-title">
          <h2 id="leaderboard-title" className="sr-only">Full Leaderboard</h2>
          <Leaderboard teams={teams} />
        </section>
      </main>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>Podium des Concours — Nuit de l'Info 2025</p>
      </footer>
    </div>
  );
}
