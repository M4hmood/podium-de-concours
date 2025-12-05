import { useState } from "react";
import ScoreUpdateDialog from "../ScoreUpdateDialog";

export default function ScoreUpdateDialogExample() {
  // todo: remove mock functionality
  const [teams, setTeams] = useState([
    { id: 1, name: "Team Alpha", score: 85 },
    { id: 2, name: "Cyber Owls", score: 92 },
    { id: 3, name: "Night Coders", score: 67 },
  ]);

  const handleUpdateScore = (teamId: number, newScore: number) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, score: newScore } : t))
    );
    console.log(`Updated team ${teamId} to score ${newScore}`);
  };

  return <ScoreUpdateDialog teams={teams} onUpdateScore={handleUpdateScore} />;
}
