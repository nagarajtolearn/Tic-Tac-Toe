import "./App.css";
import { useState, useEffect } from "react";
import Square from "./components/Square";
import { Patterns } from "./patterns";
import Confetti from "react-confetti";

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({ winner: "none", state: "none" });

  useEffect(() => {
    checkTie();
    checkWin();

    if (player == "X") {
      setPlayer("O");
    } else setPlayer("X");
  }, [board]);

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;
      let foundWinningPattern = true;
      currPattern.forEach((index) => {
        if (board[index] != firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        setResult({ winner: player, state: "Won" });
      }
    });
  };

  const checkTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });
    if (filled) {
      setResult({ winner: "no-one", state: "Tie" });
    }
  };

  const selectedSquare = (squareIndex) => {
    if (result.winner == "none") {
      setBoard(
        board.map((val, index) => {
          if (index == squareIndex && val == "") {
            return player;
          }
          return val;
        })
      );
    }
  };

  const newGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setResult({ winner: "none", state: "none" });
    setPlayer("O");
  };

  return (
    <div className="App">
      {result.state === "Won" && <Confetti />}
      {result.state === "Won" ? (
        <h1>{`Player ${result.winner}`} Won!</h1>
      ) : result.state === "Tie" ? (
        <h1>{`It's a ${result.state}`}!</h1>
      ) : (
        <h1>Tic-Tac-Toe</h1>
      )}

      <div className="board">
        <div className="row">
          <Square
            value={board[0]}
            selectedSquare={() => {
              selectedSquare(0);
            }}
          />
          <Square
            value={board[1]}
            selectedSquare={() => {
              selectedSquare(1);
            }}
          />
          <Square
            value={board[2]}
            selectedSquare={() => {
              selectedSquare(2);
            }}
          />
        </div>
        <div className="row">
          <Square
            value={board[3]}
            selectedSquare={() => {
              selectedSquare(3);
            }}
          />
          <Square
            value={board[4]}
            selectedSquare={() => {
              selectedSquare(4);
            }}
          />
          <Square
            value={board[5]}
            selectedSquare={() => {
              selectedSquare(5);
            }}
          />
        </div>
        <div className="row">
          <Square
            value={board[6]}
            selectedSquare={() => {
              selectedSquare(6);
            }}
          />
          <Square
            value={board[7]}
            selectedSquare={() => {
              selectedSquare(7);
            }}
          />
          <Square
            value={board[8]}
            selectedSquare={() => {
              selectedSquare(8);
            }}
          />
        </div>
      </div>
      <button className="newGame-btn" onClick={newGame}>
        New Game
      </button>
    </div>
  );
}

export default App;
