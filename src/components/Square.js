const Square = ({ value, onClick }) => {
  return (
    <button data-testid="square" className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;