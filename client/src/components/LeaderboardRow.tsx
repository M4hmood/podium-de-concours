import { Trophy, Medal, Award, TrendingUp } from "lucide-react";
import ProgressBar from "./ProgressBar";
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

export default function LeaderboardRow({ team, rank, animationDelay = 0 }: LeaderboardRowProps) {
  const isTopThree = rank <= 3;

  const getRankDisplay = () => {
    switch (rank) {
      case 1:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 shadow-[0_0_12px_rgba(251,191,36,0.5)]">
            <Trophy className="w-4 h-4 text-amber-900" />
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 shadow-[0_0_10px_rgba(148,163,184,0.4)]">
            <Medal className="w-4 h-4 text-slate-700" />
          </div>
        );
      case 3:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-orange-300 to-amber-500 shadow-[0_0_10px_rgba(251,146,60,0.4)]">
            <Award className="w-4 h-4 text-orange-900" />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
            <span className="text-sm font-bold text-muted-foreground">{rank}</span>
          </div>
        );
    }
  };

  const getProgressVariant = (): "default" | "gold" | "silver" | "bronze" => {
    switch (rank) {
      case 1:
        return "gold";
      case 2:
        return "silver";
      case 3:
        return "bronze";
      default:
        return "default";
    }
  };

  const rowBgClass = isTopThree
    ? rank === 1
      ? "bg-gradient-to-r from-amber-50/80 via-yellow-50/50 to-transparent dark:from-amber-950/30 dark:via-yellow-950/20 dark:to-transparent border-l-4 border-l-amber-400"
      : rank === 2
        ? "bg-gradient-to-r from-slate-50/80 via-slate-50/50 to-transparent dark:from-slate-900/30 dark:via-slate-900/20 dark:to-transparent border-l-4 border-l-slate-400"
        : "bg-gradient-to-r from-orange-50/80 via-amber-50/50 to-transparent dark:from-orange-950/30 dark:via-amber-950/20 dark:to-transparent border-l-4 border-l-orange-400"
    : "border-l-4 border-l-transparent";

  return (
    <TableRow
      className={`
        ${rowBgClass}
        opacity-0 animate-fade-in-up
        transition-all duration-300
        hover:bg-muted/50
      `}
      style={{ animationDelay: `${animationDelay}ms` }}
      data-testid={`leaderboard-row-${team.id}`}
    >
      <TableCell className="w-16 text-center">
        {getRankDisplay()}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{team.name}</span>
          {rank === 1 && (
            <TrendingUp className="w-4 h-4 text-green-500 animate-bounce" style={{ animationDuration: "2s" }} />
          )}
        </div>
      </TableCell>
      <TableCell className="w-28 text-right">
        <span className={`font-bold tabular-nums text-lg ${isTopThree ? "text-foreground" : "text-muted-foreground"}`}>
          {team.score}
        </span>
        <span className="text-xs text-muted-foreground ml-1">pts</span>
      </TableCell>
      <TableCell className="w-52 hidden md:table-cell">
        <ProgressBar value={team.score} variant={getProgressVariant()} showLabel={false} size="md" />
      </TableCell>
    </TableRow>
  );
}
