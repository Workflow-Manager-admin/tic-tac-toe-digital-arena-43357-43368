import React from "react";
import "./GameBoard.css";

/**
 * PUBLIC_INTERFACE
 * Tic Tac Toe Board component
 * Props:
 *   board: array of 9 strings ("X", "O", or "")
 *   onSquareClick: function(index) -> void
 *   isDisabled: boolean, disables moves when true
 */
function GameBoard({ board, onSquareClick, isDisabled }) {
  return (
    <div className="ttt-board" data-testid="game-board">
      {board.map((cell, idx) => (
        <button
          key={idx}
          className="ttt-square"
          onClick={() => !isDisabled && onSquareClick(idx)}
          aria-label={`Cell ${idx} - ${cell || "empty"}`}
          disabled={!!cell || isDisabled}
          data-testid={`square-${idx}`}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}

export default GameBoard;
