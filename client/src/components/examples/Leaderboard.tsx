import Leaderboard from "../Leaderboard";

export default function LeaderboardExample() {
  // todo: remove mock functionality
  const teams = [
    { id: 1, name: "Team Alpha", score: 85 },
    { id: 2, name: "Cyber Owls", score: 92 },
    { id: 3, name: "Night Coders", score: 67 },
    { id: 4, name: "Pixel Pirates", score: 40 },
    { id: 5, name: "Code Ninjas", score: 55 },
  ];

  return <Leaderboard teams={teams} />;
}
