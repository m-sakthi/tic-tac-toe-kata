import Square from './Square';

const Board = () => {
  const currentPlayer = 'X';
  const squares = Array(9).fill(null);

  return (
    <div className="container">
      <div className="board">
        {squares.map((s, i) =>
          <Square key={i} value={s} />
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