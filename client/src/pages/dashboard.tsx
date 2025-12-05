import { useEffect, useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import HeroHeader from "@/components/HeroHeader";
import Podium from "@/components/Podium";
import Leaderboard from "@/components/Leaderboard";
import ScoreUpdateDialog from "@/components/ScoreUpdateDialog";
import ThemeToggle from "@/components/ThemeToggle";
import StatsCard from "@/components/StatsCard";
import CountdownTimer from "@/components/CountdownTimer";
import LiveIndicator from "@/components/LiveIndicator";
import ParticleBackground from "@/components/ParticleBackground";
import TeamCard from "@/components/TeamCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useConfetti } from "@/hooks/use-confetti";
import { 
  Zap, 
  AlertCircle, 
  Users, 
  Trophy, 
  TrendingUp, 
  BarChart3,
  Grid3X3,
  List,
  PartyPopper
} from "lucide-react";
import type { Team } from "@shared/schema";

export default function Dashboard() {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [view, setView] = useState<"cards" | "table">("table");
  const previousTeamsRef = useRef<Team[]>([]);
  const { fireConfetti, fireStars } = useConfetti();

  const { data: teams = [], isLoading, error } = useQuery<Team[]>({
    queryKey: ["/api/teams"],
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (teams.length > 0) {
      setLastUpdate(new Date());
      
      if (previousTeamsRef.current.length > 0) {
        const prevSorted = [...previousTeamsRef.current].sort((a, b) => b.score - a.score);
        const currSorted = [...teams].sort((a, b) => b.score - a.score);
        
        if (prevSorted[0]?.id !== currSorted[0]?.id) {
          fireConfetti();
        }
        
        const hasScoreIncrease = teams.some((team) => {
          const prevTeam = previousTeamsRef.current.find((t) => t.id === team.id);
          return prevTeam && team.score > prevTeam.score;
        });
        
        if (hasScoreIncrease) {
          fireStars();
        }
      }
      
      previousTeamsRef.current = teams;
    }
  }, [teams, fireConfetti, fireStars]);

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

  const handleCelebrate = () => {
    fireConfetti();
    setTimeout(() => fireStars(), 300);
  };

  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const totalScore = teams.reduce((sum, t) => sum + t.score, 0);
  const avgScore = teams.length > 0 ? Math.round(totalScore / teams.length) : 0;
  const topScore = sortedTeams[0]?.score || 0;

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" data-testid="error-state">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Failed to load teams</h2>
          <p className="text-muted-foreground">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative" data-testid="dashboard-page">
      <ParticleBackground />
      
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 border-b border-border/50" data-testid="header">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 shadow-lg shadow-orange-500/30 animate-pulse" style={{ animationDuration: "3s" }}>
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h2 className="text-base font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text" data-testid="text-app-title">Nuit de l'Info</h2>
              <p className="text-xs text-muted-foreground">2025 Edition</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <LiveIndicator lastUpdate={lastUpdate} />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleCelebrate}
              className="hidden sm:flex"
              data-testid="button-celebrate"
              aria-label="Trigger celebration effects"
            >
              <PartyPopper className="w-5 h-5 text-amber-500" />
            </Button>
            <ScoreUpdateDialog 
              teams={teams} 
              onUpdateScore={handleUpdateScore}
              isUpdating={updateScoreMutation.isPending}
            />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 relative z-10">
        <HeroHeader />

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 py-6" aria-label="Competition Statistics" data-testid="stats-section">
          <StatsCard
            title="Total Teams"
            value={teams.length}
            icon={<Users className="w-6 h-6" />}
            color="blue"
            description="Competing tonight"
            testId="stat-card-total-teams"
          />
          <StatsCard
            title="Top Score"
            value={topScore}
            suffix="pts"
            icon={<Trophy className="w-6 h-6" />}
            color="amber"
            description="Current leader"
            testId="stat-card-top-score"
          />
          <StatsCard
            title="Average"
            value={avgScore}
            suffix="pts"
            icon={<BarChart3 className="w-6 h-6" />}
            color="green"
            description="Mean score"
            testId="stat-card-average"
          />
          <StatsCard
            title="Total Points"
            value={totalScore}
            icon={<TrendingUp className="w-6 h-6" />}
            color="purple"
            description="Combined effort"
            testId="stat-card-total-points"
          />
        </section>

        <section className="py-6" aria-labelledby="podium-title" data-testid="podium-section">
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

        <div className="grid lg:grid-cols-3 gap-6 py-6">
          <div className="lg:col-span-2">
            <CountdownTimer />
          </div>
          <div className="flex flex-col justify-center">
            <Badge variant="outline" className="self-start mb-2 text-xs" data-testid="badge-pro-tip">Pro tip</Badge>
            <p className="text-sm text-muted-foreground" data-testid="text-pro-tip">
              Click on "Update Score" to modify team scores and watch the leaderboard update in real-time with celebration effects!
            </p>
          </div>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-sm text-muted-foreground font-medium flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Complete Standings
            </span>
          </div>
        </div>

        <section className="py-6 pb-16" aria-labelledby="leaderboard-title" data-testid="leaderboard-section">
          <div className="flex items-center justify-between mb-6">
            <h2 id="leaderboard-title" className="text-xl font-bold" data-testid="text-section-title">All Teams</h2>
            <Tabs value={view} onValueChange={(v) => setView(v as "cards" | "table")}>
              <TabsList data-testid="tabs-view-switcher">
                <TabsTrigger value="table" className="gap-1.5" data-testid="tab-view-table">
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">Table</span>
                </TabsTrigger>
                <TabsTrigger value="cards" className="gap-1.5" data-testid="tab-view-cards">
                  <Grid3X3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Cards</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {isLoading ? (
            <div className="space-y-3" data-testid="loading-skeleton">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-xl" />
              ))}
            </div>
          ) : view === "table" ? (
            <Leaderboard teams={teams} />
          ) : (
            <div className="grid md:grid-cols-2 gap-4" data-testid="team-cards-grid">
              {sortedTeams.map((team, index) => (
                <TeamCard key={team.id} team={team} rank={index + 1} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t py-8 bg-muted/30 relative z-10" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <p className="text-sm font-medium" data-testid="text-footer-title">
              Podium des Concours — Nuit de l'Info 2025
            </p>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xs text-muted-foreground" data-testid="text-footer-subtitle">
            Real-time competition tracking with WCAG accessibility compliance
          </p>
        </div>
      </footer>
    </div>
  );
}
