const Square = ({ value, onClick, id }) => {
  return (
    <button data-testid={`square-${id}`} className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;