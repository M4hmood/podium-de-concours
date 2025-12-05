import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Team {
  id: number;
  name: string;
  score: number;
}

interface ScoreUpdateDialogProps {
  teams: Team[];
  onUpdateScore: (teamId: number, newScore: number) => void;
  isUpdating?: boolean;
}

export default function ScoreUpdateDialog({ teams, onUpdateScore, isUpdating }: ScoreUpdateDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const [newScore, setNewScore] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = () => {
    const teamId = parseInt(selectedTeamId);
    const score = parseInt(newScore);

    if (!selectedTeamId || isNaN(score)) {
      toast({
        title: "Invalid input",
        description: "Please select a team and enter a valid score.",
        variant: "destructive",
      });
      return;
    }

    if (score < 0 || score > 100) {
      toast({
        title: "Invalid score",
        description: "Score must be between 0 and 100.",
        variant: "destructive",
      });
      return;
    }

    onUpdateScore(teamId, score);
    toast({
      title: "Score updated",
      description: `Team score has been updated to ${score}.`,
    });
    setOpen(false);
    setSelectedTeamId("");
    setNewScore("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" data-testid="button-update-score">
          <Settings className="w-4 h-4 mr-2" />
          Update Score
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Team Score</DialogTitle>
          <DialogDescription>
            Select a team and enter their new score (0-100).
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="team-select">Team</Label>
            <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
              <SelectTrigger id="team-select" data-testid="select-team">
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id.toString()}>
                    {team.name} (Current: {team.score})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="score-input">New Score</Label>
            <Input
              id="score-input"
              type="number"
              min={0}
              max={100}
              placeholder="Enter new score"
              value={newScore}
              onChange={(e) => setNewScore(e.target.value)}
              data-testid="input-score"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} data-testid="button-cancel-score">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isUpdating} data-testid="button-submit-score">
            {isUpdating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              "Update"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
