import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Trophy, Flame, Zap, Star, Target, Clock, Medal, Award, Crown, Rocket } from "lucide-react";
import { forwardRef } from "react";

export type AchievementType = 
  | "champion" 
  | "on_fire" 
  | "speed_demon" 
  | "rising_star" 
  | "perfect_score" 
  | "early_bird"
  | "top_3"
  | "consistent"
  | "leader"
  | "rocket";

interface AchievementBadgeProps {
  type: AchievementType;
  size?: "sm" | "md";
}

const achievementConfig: Record<AchievementType, { 
  icon: React.ElementType; 
  label: string; 
  description: string;
  bgClass: string;
  iconClass: string;
}> = {
  champion: {
    icon: Trophy,
    label: "Champion",
    description: "Current #1 position",
    bgClass: "bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900",
    iconClass: "text-amber-900",
  },
  on_fire: {
    icon: Flame,
    label: "On Fire",
    description: "Scoring streak!",
    bgClass: "bg-gradient-to-r from-orange-500 to-red-500 text-white",
    iconClass: "text-white",
  },
  speed_demon: {
    icon: Zap,
    label: "Speed Demon",
    description: "Fastest progress",
    bgClass: "bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900",
    iconClass: "text-yellow-900",
  },
  rising_star: {
    icon: Star,
    label: "Rising Star",
    description: "Most improved",
    bgClass: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    iconClass: "text-white",
  },
  perfect_score: {
    icon: Target,
    label: "Perfect",
    description: "100% score achieved",
    bgClass: "bg-gradient-to-r from-emerald-400 to-green-500 text-emerald-900",
    iconClass: "text-emerald-900",
  },
  early_bird: {
    icon: Clock,
    label: "Early Bird",
    description: "First to submit",
    bgClass: "bg-gradient-to-r from-sky-400 to-blue-500 text-sky-900",
    iconClass: "text-sky-900",
  },
  top_3: {
    icon: Medal,
    label: "Top 3",
    description: "Podium position",
    bgClass: "bg-gradient-to-r from-slate-300 to-slate-400 text-slate-800",
    iconClass: "text-slate-800",
  },
  consistent: {
    icon: Award,
    label: "Consistent",
    description: "Steady performer",
    bgClass: "bg-gradient-to-r from-teal-400 to-cyan-500 text-teal-900",
    iconClass: "text-teal-900",
  },
  leader: {
    icon: Crown,
    label: "Leader",
    description: "Team captain",
    bgClass: "bg-gradient-to-r from-violet-500 to-purple-600 text-white",
    iconClass: "text-white",
  },
  rocket: {
    icon: Rocket,
    label: "Rocket",
    description: "Skyrocketing progress",
    bgClass: "bg-gradient-to-r from-rose-500 to-pink-600 text-white",
    iconClass: "text-white",
  },
};

const BadgeWrapper = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
);
BadgeWrapper.displayName = "BadgeWrapper";

export default function AchievementBadge({ type, size = "sm" }: AchievementBadgeProps) {
  const config = achievementConfig[type];
  const Icon = config.icon;
  
  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <BadgeWrapper className="inline-flex">
          <Badge 
            className={`${config.bgClass} gap-1 cursor-default shadow-sm`}
            variant="secondary"
          >
            <Icon className={`${iconSize} ${config.iconClass}`} />
            {size === "md" && <span>{config.label}</span>}
          </Badge>
        </BadgeWrapper>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-center">
          <p className="font-semibold">{config.label}</p>
          <p className="text-xs text-muted-foreground">{config.description}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
