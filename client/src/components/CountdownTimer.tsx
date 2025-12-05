import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate?: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = targetDate || new Date(Date.now() + 8 * 60 * 60 * 1000);

    const calculateTimeLeft = () => {
      const difference = target.getTime() - Date.now();
      
      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      
      return { hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBlock = ({ value, label, testId }: { value: number; label: string; testId: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-b from-muted to-muted/50 rounded-lg px-3 py-2 min-w-[3.5rem] border border-border/50">
        <span className="text-2xl md:text-3xl font-bold tabular-nums" data-testid={testId}>
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">{label}</span>
    </div>
  );

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20" data-testid="countdown-timer">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold text-muted-foreground">Time Remaining</span>
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-4" role="timer" aria-label="Competition countdown timer">
          <TimeBlock value={timeLeft.hours} label="Hours" testId="timer-hours" />
          <span className="text-2xl font-bold text-muted-foreground animate-pulse" aria-hidden="true">:</span>
          <TimeBlock value={timeLeft.minutes} label="Min" testId="timer-minutes" />
          <span className="text-2xl font-bold text-muted-foreground animate-pulse" aria-hidden="true">:</span>
          <TimeBlock value={timeLeft.seconds} label="Sec" testId="timer-seconds" />
        </div>
      </CardContent>
    </Card>
  );
}
