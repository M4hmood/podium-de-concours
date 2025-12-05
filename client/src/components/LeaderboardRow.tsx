import { Trophy, Medal, Award } from "lucide-react";
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

  const getRankIcon = () => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-slate-400" />;
      case 3:
        return <Award className="w-5 h-5 text-orange-500" />;
      default:
        return <span className="text-sm font-medium text-muted-foreground">{rank}</span>;
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
      ? "bg-amber-50/50 dark:bg-amber-950/20"
      : rank === 2
        ? "bg-slate-50/50 dark:bg-slate-950/20"
        : "bg-orange-50/50 dark:bg-orange-950/20"
    : "";

  return (
    <TableRow
      className={`
        ${rowBgClass}
        opacity-0 animate-fade-in-up
        hover-elevate
      `}
      style={{ animationDelay: `${animationDelay}ms` }}
      data-testid={`leaderboard-row-${team.id}`}
    >
      <TableCell className="w-16 text-center">
        <div className="flex items-center justify-center">{getRankIcon()}</div>
      </TableCell>
      <TableCell className="font-medium">{team.name}</TableCell>
      <TableCell className="w-24 text-right font-bold tabular-nums">{team.score}</TableCell>
      <TableCell className="w-48 hidden md:table-cell">
        <ProgressBar value={team.score} variant={getProgressVariant()} showLabel={false} size="sm" />
      </TableCell>
    </TableRow>
  );
}
