import PodiumPlatform from "./PodiumPlatform";

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
    <div
      className="flex items-end justify-center gap-2 md:gap-4 py-8"
      data-testid="podium"
      role="region"
      aria-label="Competition podium showing top 3 teams"
    >
      <PodiumPlatform team={second} rank={2} animationDelay={200} />
      <PodiumPlatform team={first} rank={1} animationDelay={400} />
      <PodiumPlatform team={third} rank={3} animationDelay={0} />
    </div>
  );
}
