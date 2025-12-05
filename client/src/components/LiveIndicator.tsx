import { Badge } from "@/components/ui/badge";
import { Radio } from "lucide-react";

interface LiveIndicatorProps {
  lastUpdate?: Date;
}

export default function LiveIndicator({ lastUpdate }: LiveIndicatorProps) {
  return (
    <Badge 
      variant="secondary" 
      className="gap-1.5 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
      data-testid="badge-live-indicator"
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <Radio className="w-3 h-3" aria-hidden="true" />
      <span className="hidden sm:inline">Live</span>
      {lastUpdate && (
        <span className="text-xs opacity-70 hidden md:inline" data-testid="text-last-update">
          {lastUpdate.toLocaleTimeString()}
        </span>
      )}
    </Badge>
  );
}
