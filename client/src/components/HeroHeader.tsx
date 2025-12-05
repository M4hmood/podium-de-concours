import { Sparkles } from "lucide-react";

export default function HeroHeader() {
  return (
    <div
      className="text-center py-12 md:py-16 px-4"
      data-testid="hero-header"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary" />
        <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Competition Leaderboard
        </span>
        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary" />
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        Podium des Concours
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
        Nuit de l'Info 2025
      </p>
      <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mt-2">
        Track team rankings, scores, and progress in real-time
      </p>
    </div>
  );
}
