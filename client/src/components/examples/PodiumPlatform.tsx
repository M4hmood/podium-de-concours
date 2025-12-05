import PodiumPlatform from "../PodiumPlatform";

export default function PodiumPlatformExample() {
  // todo: remove mock functionality
  const team = { id: 1, name: "Cyber Owls", score: 92 };
  
  return (
    <PodiumPlatform team={team} rank={1} animationDelay={0} />
  );
}
