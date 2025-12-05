import { Trophy, Medal, Award } from "lucide-react";

interface Team {
  id: number;
  name: string;
  score: number;
}

interface PodiumPlatformProps {
  team: Team;
  rank: 1 | 2 | 3;
  animationDelay?: number;
}

export default function PodiumPlatform({ team, rank, animationDelay = 0 }: PodiumPlatformProps) {
  const config = {
    1: {
      height: "h-48 md:h-64",
      bgClass: "bg-gradient-to-b from-amber-400 to-yellow-500",
      textClass: "text-amber-900",
      icon: Trophy,
      iconSize: "w-10 h-10 md:w-12 md:h-12",
      label: "1st",
      shadow: "shadow-lg shadow-amber-400/30",
    },
    2: {
      height: "h-36 md:h-48",
      bgClass: "bg-gradient-to-b from-slate-300 to-slate-400",
      textClass: "text-slate-800",
      icon: Medal,
      iconSize: "w-8 h-8 md:w-10 md:h-10",
      label: "2nd",
      shadow: "shadow-md shadow-slate-400/30",
    },
    3: {
      height: "h-28 md:h-40",
      bgClass: "bg-gradient-to-b from-orange-400 to-amber-600",
      textClass: "text-orange-900",
      icon: Award,
      iconSize: "w-7 h-7 md:w-9 md:h-9",
      label: "3rd",
      shadow: "shadow-md shadow-orange-400/30",
    },
  }[rank];

  const Icon = config.icon;

  return (
    <div
      className="flex flex-col items-center"
      style={{ animationDelay: `${animationDelay}ms` }}
      data-testid={`podium-platform-${rank}`}
    >
      <div
        className="flex flex-col items-center mb-2 opacity-0 animate-fade-in-up"
        style={{ animationDelay: `${animationDelay + 400}ms` }}
      >
        <Icon className={`${config.iconSize} ${config.textClass.replace('text-', 'text-').replace('-900', '-500').replace('-800', '-400')}`} />
        <span className="text-xs md:text-sm font-bold text-muted-foreground mt-1">
          {config.label}
        </span>
      </div>

      <div
        className={`
          ${config.height} ${config.bgClass} ${config.shadow}
          w-24 md:w-32 lg:w-40
          rounded-t-xl
          flex flex-col items-center justify-start
          pt-4 md:pt-6
          origin-bottom
          opacity-0 animate-podium-rise
        `}
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        <div
          className={`
            ${config.textClass}
            text-center px-2
          `}
        >
          <p className="font-bold text-sm md:text-base lg:text-lg leading-tight mb-1 line-clamp-2">
            {team.name}
          </p>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold tabular-nums">
            {team.score}
          </p>
        </div>
      </div>
    </div>
  );
}
