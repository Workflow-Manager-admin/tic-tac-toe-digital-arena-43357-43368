import React from "react";
import "./GameInfoPanel.css";

/**
 * PUBLIC_INTERFACE
 * Score and status display bar for Tic Tac Toe
 *
 * Props:
 *   playerXScore: number
 *   playerOScore: number
 *   currentPlayer: "X" or "O"
 *   winner: "X" | "O" | null
 *   roundDraw: boolean
 *   onRestart: function
 *   onResetScores: function
 */
function GameInfoPanel({
  playerXScore,
  playerOScore,
  currentPlayer,
  winner,
  roundDraw,
  onRestart,
  onResetScores,
}) {
  let status;
  if (winner) {
    status = (
      <span className="ttt-status-win" data-testid="status-win">
        🎉 Player <strong>{winner}</strong> wins!
      </span>
    );
  } else if (roundDraw) {
    status = (
      <span className="ttt-status-draw" data-testid="status-draw">
        🤝 It's a draw!
      </span>
    );
  } else {
    status = (
      <span className="ttt-status-turn" data-testid="status-turn">
        Next: <span className="ttt-current-turn">Player {currentPlayer} ({currentPlayer === "X" ? "❌" : "⭕"})</span>
      </span>
    );
  }

  return (
    <section className="ttt-info-panel">
      <div className="ttt-scores">
        <span>
          <span className="ttt-score-label">X:</span>{" "}
          <span className="ttt-score-x">{playerXScore}</span>
        </span>
        <span>
          <span className="ttt-score-label">O:</span>{" "}
          <span className="ttt-score-o">{playerOScore}</span>
        </span>
      </div>
      <div className="ttt-status">{status}</div>
      <div className="ttt-controls">
        <button
          className="btn ttt-btn-accent"
          onClick={onRestart}
          type="button"
          data-testid="btn-restart"
        >
          New Round
        </button>
        <button
          className="btn ttt-btn-outline"
          onClick={onResetScores}
          type="button"
          data-testid="btn-reset-scores"
        >
          Reset Scores
        </button>
      </div>
    </section>
  );
}

export default GameInfoPanel;
