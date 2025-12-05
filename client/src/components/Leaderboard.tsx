import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users } from "lucide-react";
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
    <Card data-testid="leaderboard">
      <CardHeader className="flex flex-row items-center gap-2">
        <Users className="w-5 h-5 text-muted-foreground" />
        <CardTitle className="text-xl font-semibold">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16 text-center">Rank</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="w-24 text-right">Score</TableHead>
              <TableHead className="w-48 hidden md:table-cell">Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTeams.map((team, index) => (
              <LeaderboardRow
                key={team.id}
                team={team}
                rank={index + 1}
                animationDelay={index * 100}
              />
            ))}
          </TableBody>
        </Table>
        {sortedTeams.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No teams to display
          </div>
        )}
      </CardContent>
    </Card>
  );
}
