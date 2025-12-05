import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Trophy } from "lucide-react";
import LeaderboardRow from "./LeaderboardRow";

interface Team {
  id: number;
  name: string;
  score: number;
}

interface LeaderboardProps {
  teams: Team[];
}

export default function Leaderboard({ teams }: LeaderboardProps) {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <Card className="overflow-hidden" data-testid="leaderboard">
      <CardHeader className="flex flex-row items-center gap-3 bg-gradient-to-r from-muted/50 to-transparent border-b">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
          <Trophy className="w-5 h-5 text-primary" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold">Full Rankings</CardTitle>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {teams.length} teams competing
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-16 text-center font-semibold">Rank</TableHead>
              <TableHead className="font-semibold">Team</TableHead>
              <TableHead className="w-28 text-right font-semibold">Score</TableHead>
              <TableHead className="w-52 hidden md:table-cell font-semibold">Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTeams.map((team, index) => (
              <LeaderboardRow
                key={team.id}
                team={team}
                rank={index + 1}
                animationDelay={index * 80}
              />
            ))}
          </TableBody>
        </Table>
        {sortedTeams.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            No teams to display
          </div>
        )}
      </CardContent>
    </Card>
  );
}
