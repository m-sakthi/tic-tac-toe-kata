import { useState } from 'react';
import Square from './Square';

const hasPlayerMatchedWinningIndices = (squares) => {
  const validSquaresLength = squares.filter(Boolean).length;

  if (validSquaresLength >= 5) {
    const winningIndices = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < winningIndices.length; i++) {
      const [a, b, c] = winningIndices[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return `Winner: ${squares[a]}`;
      }
    }
  }

  return validSquaresLength === 9 ? `Match Tied` : null;
}

const Board = () => {
  const initalSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initalSquares);
  const [isXCurrentPlayer, setIsXCurrentPlayer] = useState(true);
  const [result, setResult] = useState(null);

  const squareOnClickHandler = (i) => () => {
    const newSquares = squares;

    if (!newSquares[i] && !result) {
      newSquares[i] = currentPlayer();

      setSquares(newSquares);
      setIsXCurrentPlayer(!isXCurrentPlayer);
      setResult(hasPlayerMatchedWinningIndices(newSquares))
    }
  }

  const currentPlayer = () => isXCurrentPlayer ? 'X' : 'O';

  const resetGame = () => {
    setSquares(initalSquares);
    setIsXCurrentPlayer(true);
  }

  return (
    <div className="container">
      <div className="board">
        {squares.map((s, i) =>
          <Square
            key={i}
            value={s}
            id={i}
            onClick={squareOnClickHandler(i)}
          />
        )}
      </div>

      <div className="next-player">
        {
          result ? result :
            `Player to Play: ${currentPlayer()}`
        }
      </div>
      <button
        data-testid="reset-btn"
        className="reset-btn"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
}

export default Board;