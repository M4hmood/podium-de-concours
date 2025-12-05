import { useEffect, useState } from "react";

interface ProgressBarProps {
  value: number;
  maxValue?: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "gold" | "silver" | "bronze";
}

export default function ProgressBar({
  value,
  maxValue = 100,
  showLabel = true,
  size = "md",
  variant = "default",
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
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-3.5",
  }[size];

  const bgGradient = {
    default: "bg-primary",
    gold: "bg-gradient-to-r from-amber-400 to-yellow-500",
    silver: "bg-gradient-to-r from-slate-300 to-slate-400",
    bronze: "bg-gradient-to-r from-orange-400 to-amber-600",
  }[variant];

  return (
    <div className="flex items-center gap-3 w-full" data-testid="progress-bar">
      <div
        className={`flex-1 ${heightClass} bg-muted rounded-full overflow-hidden`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={maxValue}
        aria-label={`Progress: ${value} out of ${maxValue}`}
      >
        <div
          className={`${heightClass} ${bgGradient} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${animatedWidth}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-semibold tabular-nums text-muted-foreground min-w-[3rem] text-right">
          {value}%
        </span>
      )}
    </div>
  );
}
