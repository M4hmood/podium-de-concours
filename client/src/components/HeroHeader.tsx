import { Sparkles, Zap, Star } from "lucide-react";

export default function HeroHeader() {
  return (
    <div
      className="relative text-center py-12 md:py-20 px-4 overflow-hidden"
      data-testid="hero-header"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-[10%] w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-20 right-[15%] w-3 h-3 bg-primary rounded-full animate-bounce opacity-40" style={{ animationDelay: "0.2s" }} />
        <div className="absolute top-16 left-[25%] w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-8 right-[30%] w-2 h-2 bg-slate-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: "0.7s" }} />
        <div className="absolute bottom-20 left-[20%] w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-16 right-[25%] w-1.5 h-1.5 bg-primary rounded-full animate-bounce opacity-40" style={{ animationDelay: "0.3s" }} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Zap className="w-5 h-5 md:w-6 md:h-6 text-amber-500 animate-pulse" />
          <div className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-primary">
              Live Competition
            </span>
            <Star className="w-4 h-4 text-primary" />
          </div>
          <Zap className="w-5 h-5 md:w-6 md:h-6 text-amber-500 animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text">
          Podium des Concours
        </h1>
        
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-amber-400" />
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500">
            Nuit de l'Info 2025
          </p>
          <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-amber-400" />
        </div>
        
        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
          Track team rankings, scores, and progress in real-time
        </p>
      </div>
    </div>
  );
}
