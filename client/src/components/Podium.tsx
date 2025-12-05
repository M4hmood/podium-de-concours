import PodiumPlatform from "./PodiumPlatform";
import { Crown } from "lucide-react";

interface Team {
  id: number;
  name: string;
  score: number;
}

interface PodiumProps {
  teams: Team[];
}

export default function Podium({ teams }: PodiumProps) {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score).slice(0, 3);

  if (sortedTeams.length < 3) {
    return (
      <div className="text-center text-muted-foreground py-12">
        Not enough teams to display podium
      </div>
    );
  }

  const [first, second, third] = sortedTeams;

  return (
    <div className="relative" data-testid="podium" role="region" aria-label="Competition podium showing top 3 teams">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-gradient-to-b from-amber-400/5 via-transparent to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="flex items-center justify-center gap-2 mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
        <Crown className="w-6 h-6 text-amber-500" />
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Champions</span>
        <Crown className="w-6 h-6 text-amber-500" />
      </div>

      <div className="flex items-end justify-center gap-3 md:gap-6 py-8 relative z-10">
        <PodiumPlatform team={second} rank={2} animationDelay={200} />
        <PodiumPlatform team={first} rank={1} animationDelay={400} />
        <PodiumPlatform team={third} rank={3} animationDelay={0} />
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-md h-4 bg-gradient-to-t from-muted/50 to-transparent rounded-t-full blur-sm" />
    </div>
  );
}
