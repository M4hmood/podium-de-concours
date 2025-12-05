import LeaderboardRow from "../LeaderboardRow";
import { Table, TableBody } from "@/components/ui/table";

export default function LeaderboardRowExample() {
  // todo: remove mock functionality
  const team = { id: 1, name: "Team Alpha", score: 85 };

  return (
    <Table>
      <TableBody>
        <LeaderboardRow team={team} rank={1} animationDelay={0} />
      </TableBody>
    </Table>
  );
}
