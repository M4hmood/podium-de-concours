import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface StatsCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  description?: string;
  color?: "amber" | "blue" | "green" | "purple";
  testId?: string;
}

export default function StatsCard({
  title,
  value,
  suffix = "",
  icon,
  description,
  color = "blue",
  testId,
}: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const stepValue = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const colorClasses = {
    amber: "from-amber-500/20 to-amber-600/5 border-amber-500/30",
    blue: "from-blue-500/20 to-blue-600/5 border-blue-500/30",
    green: "from-green-500/20 to-green-600/5 border-green-500/30",
    purple: "from-purple-500/20 to-purple-600/5 border-purple-500/30",
  }[color];

  const iconColorClasses = {
    amber: "text-amber-500",
    blue: "text-blue-500",
    green: "text-green-500",
    purple: "text-purple-500",
  }[color];

  return (
    <Card 
      className={`bg-gradient-to-br ${colorClasses} border overflow-visible`}
      data-testid={testId || `stat-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p 
              className="text-2xl md:text-3xl font-bold tabular-nums mt-1"
              data-testid={`stat-value-${title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {displayValue.toLocaleString()}
              {suffix && <span className="text-lg font-normal text-muted-foreground ml-1">{suffix}</span>}
            </p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className={`${iconColorClasses} opacity-80`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
