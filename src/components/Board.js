import { useState } from 'react';
import Square from './Square';

const Board = () => {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [squares, setSquares] = useState(Array(9).fill(null));

  const squareOnClickHandler = (i) => () => {
    const newSquares = squares;
    newSquares[i] = currentPlayer;

    setSquares(squares);
    setCurrentPlayer(switchCurrentPlayer());
  }

  const switchCurrentPlayer = () => currentPlayer === 'X' ? 'O' : 'X';

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
        Player to Play: {currentPlayer}
      </div>
      <button data-testid="reset-btn" className="reset-btn">
        Reset Game
      </button>
    </div>
  );
}

export default Board;