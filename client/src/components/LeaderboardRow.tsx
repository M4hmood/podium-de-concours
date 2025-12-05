import { Trophy, Medal, Award, TrendingUp, Flame } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ProgressBar from "./ProgressBar";
import AchievementBadge, { type AchievementType } from "./AchievementBadge";
import { TableRow, TableCell } from "@/components/ui/table";

interface Team {
  id: number;
  name: string;
  score: number;
}

interface LeaderboardRowProps {
  team: Team;
  rank: number;
  animationDelay?: number;
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
  if (score === 100) achievements.push("perfect_score");
  if (score >= 90 && rank > 1) achievements.push("on_fire");
  return achievements.slice(0, 2);
}

export default function LeaderboardRow({ team, rank, animationDelay = 0 }: LeaderboardRowProps) {
  const isTopThree = rank <= 3;
  const achievements = getAchievements(rank, team.score);

  const getRankDisplay = () => {
    switch (rank) {
      case 1:
        return (
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 shadow-[0_0_15px_rgba(251,191,36,0.5)]">
            <Trophy className="w-4 h-4 text-amber-900" />
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 shadow-[0_0_12px_rgba(148,163,184,0.4)]">
            <Medal className="w-4 h-4 text-slate-700" />
          </div>
        );
      case 3:
        return (
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-orange-300 to-amber-500 shadow-[0_0_12px_rgba(251,146,60,0.4)]">
            <Award className="w-4 h-4 text-orange-900" />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-muted">
            <span className="text-sm font-bold text-muted-foreground">{rank}</span>
          </div>
        );
    }
  };

  const getProgressVariant = (): "default" | "gold" | "silver" | "bronze" => {
    switch (rank) {
      case 1: return "gold";
      case 2: return "silver";
      case 3: return "bronze";
      default: return "default";
    }
  };

  const rowBgClass = isTopThree
    ? rank === 1
      ? "bg-gradient-to-r from-amber-50/80 via-yellow-50/50 to-transparent dark:from-amber-950/40 dark:via-yellow-950/20 dark:to-transparent"
      : rank === 2
        ? "bg-gradient-to-r from-slate-50/80 via-slate-50/50 to-transparent dark:from-slate-900/40 dark:via-slate-900/20 dark:to-transparent"
        : "bg-gradient-to-r from-orange-50/80 via-amber-50/50 to-transparent dark:from-orange-950/40 dark:via-amber-950/20 dark:to-transparent"
    : "";

  return (
    <TableRow
      className={`
        ${rowBgClass}
        opacity-0 animate-fade-in-up
        transition-all duration-300
        hover:bg-muted/50
        group
      `}
      style={{ animationDelay: `${animationDelay}ms` }}
      data-testid={`row-team-${team.id}`}
    >
      <TableCell className="w-16" data-testid={`cell-rank-${team.id}`}>
        <div className="flex items-center justify-center">
          {getRankDisplay()}
        </div>
      </TableCell>
      <TableCell data-testid={`cell-team-${team.id}`}>
        <div className="flex items-center gap-3">
          <Avatar className={`w-8 h-8 bg-gradient-to-br ${getTeamColor(team.id)} transition-transform group-hover:scale-110`}>
            <AvatarFallback className="bg-transparent text-white text-xs font-bold">
              {team.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold" data-testid={`text-team-name-${team.id}`}>{team.name}</span>
            {rank === 1 && (
              <TrendingUp className="w-4 h-4 text-green-500 animate-bounce" style={{ animationDuration: "2s" }} />
            )}
            {team.score >= 90 && rank > 1 && (
              <Flame className="w-4 h-4 text-orange-500" />
            )}
            {achievements.map((achievement) => (
              <AchievementBadge key={achievement} type={achievement} size="sm" />
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell className="w-28 text-right" data-testid={`cell-score-${team.id}`}>
        <span className={`font-bold tabular-nums text-lg ${isTopThree ? "text-foreground" : "text-muted-foreground"}`} data-testid={`text-score-${team.id}`}>
          {team.score}
        </span>
        <span className="text-xs text-muted-foreground ml-1">pts</span>
      </TableCell>
      <TableCell className="w-56 hidden md:table-cell" data-testid={`cell-progress-${team.id}`}>
        <ProgressBar value={team.score} variant={getProgressVariant()} showLabel={false} size="md" testId={`progress-${team.id}`} />
      </TableCell>
    </TableRow>
  );
}
