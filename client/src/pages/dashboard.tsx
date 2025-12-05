import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import HeroHeader from "@/components/HeroHeader";
import Podium from "@/components/Podium";
import Leaderboard from "@/components/Leaderboard";
import ScoreUpdateDialog from "@/components/ScoreUpdateDialog";
import ThemeToggle from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Zap, AlertCircle } from "lucide-react";
import type { Team } from "@shared/schema";

export default function Dashboard() {
  const { data: teams = [], isLoading, error } = useQuery<Team[]>({
    queryKey: ["/api/teams"],
  });

  const updateScoreMutation = useMutation({
    mutationFn: async ({ id, score }: { id: number; score: number }) => {
      const response = await apiRequest("POST", "/api/teams/update", { id, score });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teams"] });
    },
  });

  const handleUpdateScore = (teamId: number, newScore: number) => {
    updateScoreMutation.mutate({ id: teamId, score: newScore });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Failed to load teams</h2>
          <p className="text-muted-foreground">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h2 className="text-base font-bold">Nuit de l'Info</h2>
              <p className="text-xs text-muted-foreground">2025 Edition</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="hidden sm:flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live
            </Badge>
            <ScoreUpdateDialog 
              teams={teams} 
              onUpdateScore={handleUpdateScore}
              isUpdating={updateScoreMutation.isPending}
            />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        <HeroHeader />

        <section className="py-8" aria-labelledby="podium-title">
          <h2 id="podium-title" className="sr-only">Top 3 Teams</h2>
          {isLoading ? (
            <div className="flex items-end justify-center gap-3 md:gap-6 py-8">
              <Skeleton className="w-28 md:w-36 h-36 md:h-48 rounded-t-2xl" />
              <Skeleton className="w-28 md:w-36 h-48 md:h-64 rounded-t-2xl" />
              <Skeleton className="w-28 md:w-36 h-28 md:h-40 rounded-t-2xl" />
            </div>
          ) : (
            <Podium teams={teams} />
          )}
        </section>

        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-sm text-muted-foreground font-medium">
              Complete Standings
            </span>
          </div>
        </div>

        <section className="py-8 pb-16" aria-labelledby="leaderboard-title">
          <h2 id="leaderboard-title" className="sr-only">Full Leaderboard</h2>
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <Leaderboard teams={teams} />
          )}
        </section>
      </main>

      <footer className="border-t py-8 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Podium des Concours — Nuit de l'Info 2025
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Real-time competition tracking
          </p>
        </div>
      </footer>
    </div>
  );
}
