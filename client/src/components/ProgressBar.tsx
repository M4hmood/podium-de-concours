import { useEffect, useState } from "react";

interface ProgressBarProps {
  value: number;
  maxValue?: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "gold" | "silver" | "bronze";
  testId?: string;
}

export default function ProgressBar({
  value,
  maxValue = 100,
  showLabel = true,
  size = "md",
  variant = "default",
  testId,
}: ProgressBarProps) {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const percentage = Math.min((value / maxValue) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const heightClass = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  }[size];

  const bgGradient = {
    default: "bg-gradient-to-r from-primary via-primary to-primary/80",
    gold: "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500",
    silver: "bg-gradient-to-r from-slate-300 via-slate-200 to-slate-400",
    bronze: "bg-gradient-to-r from-orange-400 via-amber-500 to-orange-500",
  }[variant];

  const glowClass = {
    default: "",
    gold: "shadow-[0_0_12px_rgba(251,191,36,0.6)]",
    silver: "shadow-[0_0_10px_rgba(148,163,184,0.5)]",
    bronze: "shadow-[0_0_10px_rgba(251,146,60,0.5)]",
  }[variant];

  return (
    <div className="flex items-center gap-3 w-full" data-testid={testId || "progress-bar"}>
      <div
        className={`flex-1 ${heightClass} bg-muted/50 rounded-full overflow-hidden relative`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={maxValue}
        aria-label={`Progress: ${value} out of ${maxValue}`}
        data-testid={testId ? `${testId}-track` : "progress-bar-track"}
      >
        <div
          className={`${heightClass} ${bgGradient} ${glowClass} rounded-full transition-all duration-1000 ease-out relative`}
          style={{ width: `${animatedWidth}%` }}
          data-testid={testId ? `${testId}-fill` : "progress-bar-fill"}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full" />
          {variant !== "default" && (
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent to-white/30 rounded-full" />
          )}
        </div>
      </div>
      {showLabel && (
        <span 
          className="text-sm font-bold tabular-nums text-foreground min-w-[3rem] text-right"
          data-testid={testId ? `${testId}-value` : "progress-bar-value"}
        >
          {value}%
        </span>
      )}
    </div>
  );
}
