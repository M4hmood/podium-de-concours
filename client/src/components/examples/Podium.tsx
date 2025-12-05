import Podium from "../Podium";

export default function PodiumExample() {
  // todo: remove mock functionality
  const teams = [
    { id: 1, name: "Team Alpha", score: 85 },
    { id: 2, name: "Cyber Owls", score: 92 },
    { id: 3, name: "Night Coders", score: 67 },
    { id: 4, name: "Pixel Pirates", score: 40 },
  ];

  return <Podium teams={teams} />;
}
