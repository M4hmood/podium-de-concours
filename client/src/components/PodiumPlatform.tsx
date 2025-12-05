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
      bgClass: "bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500",
      glowClass: "shadow-[0_0_60px_rgba(251,191,36,0.5)]",
      textClass: "text-amber-900",
      iconClass: "text-amber-600 drop-shadow-lg",
      icon: Trophy,
      iconSize: "w-12 h-12 md:w-16 md:h-16",
      label: "1st",
      pulseClass: "animate-pulse",
      ringClass: "ring-4 ring-yellow-300/50",
    },
    2: {
      height: "h-36 md:h-48",
      bgClass: "bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400",
      glowClass: "shadow-[0_0_40px_rgba(148,163,184,0.4)]",
      textClass: "text-slate-800",
      iconClass: "text-slate-500 drop-shadow-lg",
      icon: Medal,
      iconSize: "w-10 h-10 md:w-12 md:h-12",
      label: "2nd",
      pulseClass: "",
      ringClass: "ring-2 ring-slate-300/50",
    },
    3: {
      height: "h-28 md:h-40",
      bgClass: "bg-gradient-to-b from-orange-300 via-orange-400 to-amber-600",
      glowClass: "shadow-[0_0_40px_rgba(251,146,60,0.4)]",
      textClass: "text-orange-900",
      iconClass: "text-orange-600 drop-shadow-lg",
      icon: Award,
      iconSize: "w-9 h-9 md:w-11 md:h-11",
      label: "3rd",
      pulseClass: "",
      ringClass: "ring-2 ring-orange-300/50",
    },
  }[rank];

  const Icon = config.icon;

  return (
    <div
      className="flex flex-col items-center group"
      style={{ animationDelay: `${animationDelay}ms` }}
      data-testid={`podium-platform-${rank}`}
    >
      <div
        className="flex flex-col items-center mb-3 opacity-0 animate-fade-in-up"
        style={{ animationDelay: `${animationDelay + 400}ms` }}
      >
        <div className={`relative ${config.pulseClass}`}>
          <Icon className={`${config.iconSize} ${config.iconClass}`} />
          {rank === 1 && (
            <div className="absolute inset-0 animate-ping">
              <Icon className={`${config.iconSize} text-yellow-400 opacity-30`} />
            </div>
          )}
        </div>
        <span className="text-sm md:text-base font-bold text-muted-foreground mt-2 tracking-wide">
          {config.label}
        </span>
      </div>

      <div
        className={`
          ${config.height} ${config.bgClass} ${config.glowClass} ${config.ringClass}
          w-28 md:w-36 lg:w-44
          rounded-t-2xl
          flex flex-col items-center justify-start
          pt-5 md:pt-7
          origin-bottom
          opacity-0 animate-podium-rise
          transition-all duration-300
          group-hover:scale-105 group-hover:brightness-110
          relative overflow-hidden
        `}
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent" />
        
        <div className={`${config.textClass} text-center px-3 relative z-10`}>
          <p className="font-bold text-base md:text-lg lg:text-xl leading-tight mb-2 line-clamp-2 drop-shadow-sm">
            {team.name}
          </p>
          <div className="relative">
            <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold tabular-nums drop-shadow-sm">
              {team.score}
            </p>
            <p className="text-xs md:text-sm font-semibold opacity-70 mt-1">points</p>
          </div>
        </div>
      </div>
    </div>
  );
}
