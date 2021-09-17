import { useState } from 'react';
import Square from './Square';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXCurrentPlayer, setIsXCurrentPlayer] = useState(true);

  const squareOnClickHandler = (i) => () => {
    const newSquares = squares;

    if (!newSquares[i]) {
      newSquares[i] = currentPlayer();

      setSquares(newSquares);
      setIsXCurrentPlayer(!isXCurrentPlayer);
    }
  }

  const currentPlayer = () => isXCurrentPlayer ? 'X' : 'O';

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
        Player to Play: {currentPlayer()}
      </div>
      <button data-testid="reset-btn" className="reset-btn">
        Reset Game
      </button>
    </div>
  );
}

export default Board;