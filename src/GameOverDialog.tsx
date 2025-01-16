import React from "react";
import { PartyPopper, Share2, Timer } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatTime, generateShareText } from "./daily-puzzle-utils";

interface GameOverDialogProps {
  isOpen: boolean;
  onClose: () => void;
  puzzleNumber: number;
  timeMs: number;
}

const GameOverDialog: React.FC<GameOverDialogProps> = ({
  isOpen,
  onClose,
  puzzleNumber,
  timeMs,
}) => {
  const handleShare = async () => {
    const shareText = generateShareText(puzzleNumber, timeMs);
    // TODO show a toast notification here
    await navigator.clipboard.writeText(shareText);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PartyPopper className="h-5 w-5 text-green-500" />
            Puzzle Complete!
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">
              Daily Puzzle #{puzzleNumber}
            </div>
            <div className="flex items-center justify-center gap-2 text-2xl font-mono mt-2">
              <Timer className="h-5 w-5" />
              {formatTime(timeMs)}
            </div>
          </div>

          <Button className="w-full" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share Score
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameOverDialog;
