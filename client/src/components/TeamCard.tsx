import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ProgressBar from "./ProgressBar";
import AchievementBadge, { type AchievementType } from "./AchievementBadge";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";

interface Team {
  id: number;
  name: string;
  score: number;
}

interface TeamCardProps {
  team: Team;
  rank: number;
  showAchievements?: boolean;
}

function getTeamColor(id: number): string {
  const colors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-violet-500",
    "from-teal-500 to-green-500",
    "from-rose-500 to-pink-500",
    "from-amber-500 to-orange-500",
  ];
  return colors[id % colors.length];
}

function getAchievements(rank: number, score: number): AchievementType[] {
  const achievements: AchievementType[] = [];
  
  if (rank === 1) achievements.push("champion");
  if (rank <= 3) achievements.push("top_3");
  if (score === 100) achievements.push("perfect_score");
  if (score >= 90) achievements.push("on_fire");
  if (score >= 80 && rank > 3) achievements.push("rising_star");
  
  return achievements.slice(0, 3);
}

export default function TeamCard({ team, rank, showAchievements = true }: TeamCardProps) {
  const isTopThree = rank <= 3;
  const achievements = getAchievements(rank, team.score);
  
  const getRankIcon = () => {
    switch (rank) {
      case 1:
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 shadow-lg shadow-amber-500/30">
            <Trophy className="w-5 h-5 text-amber-900" />
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 shadow-lg shadow-slate-400/30">
            <Medal className="w-5 h-5 text-slate-700" />
          </div>
        );
      case 3:
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-amber-500 shadow-lg shadow-orange-400/30">
            <Award className="w-5 h-5 text-orange-900" />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
            <span className="text-lg font-bold text-muted-foreground">{rank}</span>
          </div>
        );
    }
  };

  const borderClass = isTopThree
    ? rank === 1
      ? "border-amber-400/50 shadow-lg shadow-amber-500/10"
      : rank === 2
        ? "border-slate-400/50 shadow-lg shadow-slate-400/10"
        : "border-orange-400/50 shadow-lg shadow-orange-400/10"
    : "";

  return (
    <Card 
      className={`overflow-visible transition-all duration-300 hover:scale-[1.02] ${borderClass}`}
      data-testid={`card-team-${team.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div data-testid={`rank-indicator-${team.id}`}>{getRankIcon()}</div>
          
          <Avatar className={`w-12 h-12 bg-gradient-to-br ${getTeamColor(team.id)}`} data-testid={`avatar-team-${team.id}`}>
            <AvatarFallback className="bg-transparent text-white font-bold">
              {team.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold truncate" data-testid={`text-team-name-${team.id}`}>{team.name}</h3>
              {rank === 1 && (
                <TrendingUp className="w-4 h-4 text-green-500 animate-bounce flex-shrink-0" style={{ animationDuration: "2s" }} />
              )}
            </div>
            
            {showAchievements && achievements.length > 0 && (
              <div className="flex gap-1 mt-1 flex-wrap" data-testid={`achievements-${team.id}`}>
                {achievements.map((achievement) => (
                  <AchievementBadge key={achievement} type={achievement} size="sm" />
                ))}
              </div>
            )}
          </div>

          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-bold tabular-nums" data-testid={`text-score-${team.id}`}>{team.score}</p>
            <p className="text-xs text-muted-foreground">points</p>
          </div>
        </div>

        <div className="mt-4">
          <ProgressBar 
            value={team.score} 
            variant={rank === 1 ? "gold" : rank === 2 ? "silver" : rank === 3 ? "bronze" : "default"}
            size="md"
            showLabel={false}
            testId={`card-progress-${team.id}`}
          />
        </div>
      </CardContent>
    </Card>
  );
}
