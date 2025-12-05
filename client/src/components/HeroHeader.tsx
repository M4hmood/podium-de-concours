import { Sparkles, Zap, Star, Code2, Moon } from "lucide-react";

export default function HeroHeader() {
  return (
    <div
      className="relative text-center py-12 md:py-20 px-4 overflow-hidden"
      data-testid="hero-header"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-8 left-[8%] w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-16 right-[12%] w-3 h-3 bg-primary rounded-full animate-bounce opacity-40" style={{ animationDelay: "0.2s" }} />
        <div className="absolute top-12 left-[22%] w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-6 right-[28%] w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: "0.7s" }} />
        <div className="absolute bottom-16 left-[18%] w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-12 right-[22%] w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: "0.3s" }} />
        <div className="absolute top-20 left-[45%] w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: "0.8s" }} />
        <div className="absolute bottom-20 right-[40%] w-2 h-2 bg-green-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: "0.4s" }} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Moon className="w-5 h-5 md:w-6 md:h-6 text-indigo-400 animate-pulse" />
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              Live Competition
            </span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <Moon className="w-5 h-5 md:w-6 md:h-6 text-indigo-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-4">
          <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground bg-clip-text">
            Podium des
          </span>
          <br />
          <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Concours
          </span>
        </h1>
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent via-amber-400 to-amber-400" />
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: "3s" }} />
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
              Nuit de l'Info 2025
            </p>
            <Star className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: "3s", animationDirection: "reverse" }} />
          </div>
          <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent via-amber-400 to-amber-400" />
        </div>
        
        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-2">
          Track team rankings, scores, and progress in real-time
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/70">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Auto-updating every 5 seconds</span>
          <Zap className="w-4 h-4 text-amber-500" />
        </div>
      </div>
    </div>
  );
}
