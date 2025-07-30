import React, { useState, useEffect } from "react";
import "./App.css";
import GameBoard from "./GameBoard";
import GameInfoPanel from "./GameInfoPanel";

// Helpers
function calculateWinner(squares) {
  // Standard Tic Tac Toe win checks
  const lines = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8], // Rows
    [0, 3, 6],[1, 4, 7],[2, 5, 8], // Cols
    [0, 4, 8],[2, 4, 6],           // Diags
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// End helpers

// PUBLIC_INTERFACE
function App() {
  // Theme toggler (optional dark mode switch if desired by user)
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Game state
  const [board, setBoard] = useState(Array(9).fill(""));
  const [current, setCurrent] = useState("X");
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);

  // PUBLIC_INTERFACE
  // Start a new round, maintaining scores
  function handleRestart() {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setDraw(false);
    setCurrent((last) => (last === "X" ? "O" : "X")); // Alternate start
  }
  // PUBLIC_INTERFACE
  // Reset all scores
  function handleResetScores() {
    setScores({ X: 0, O: 0 });
    setBoard(Array(9).fill(""));
    setWinner(null);
    setDraw(false);
    setCurrent("X");
  }
  // PUBLIC_INTERFACE
  // Handle click on a square
  function handleSquareClick(idx) {
    if (winner || board[idx] || draw) return;
    const nextBoard = board.slice();
    nextBoard[idx] = current;
    const win = calculateWinner(nextBoard);
    if (win) {
      setWinner(win);
      setScores((prev) => ({ ...prev, [win]: prev[win] + 1 }));
    } else if (nextBoard.every((x) => x)) {
      setDraw(true);
    } else {
      setCurrent((c) => (c === "X" ? "O" : "X"));
    }
    setBoard(nextBoard);
  }

  // PUBLIC_INTERFACE
  // Reset game whenever fully reset or after round
  useEffect(() => {
    if (winner || draw) {
      // Allow a small delay before disabling input for feedback
      // But for now, leave instant for simple UX
    }
  }, [winner, draw]);

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <h1 style={{
          fontWeight: 900,
          fontSize: "2.3rem",
          color: "var(--primary, #1976D2)",
          margin: "14px 0 2px 0"
        }}>
          Tic Tac Toe
        </h1>
        <p style={{ color: "#888", fontSize: "1.02rem", margin: 0 }}>
          Play with a friend on your device!
        </p>
      </header>
      <main style={{
        width: "100%",
        maxWidth: 540,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <GameInfoPanel
          playerXScore={scores.X}
          playerOScore={scores.O}
          currentPlayer={current}
          winner={winner}
          roundDraw={draw}
          onRestart={handleRestart}
          onResetScores={handleResetScores}
        />
        <GameBoard
          board={board}
          onSquareClick={handleSquareClick}
          isDisabled={!!winner || draw}
        />
      </main>
      <footer style={{
        fontSize: "0.93rem",
        color: "#888",
        margin: "40px 0 20px 0",
        letterSpacing: 0.1,
      }}>
        &copy; {new Date().getFullYear()} Tic Tac Toe &mdash; A fun React project.
      </footer>
    </div>
  );
}

export default App;
