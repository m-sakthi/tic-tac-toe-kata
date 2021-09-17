import { render, screen, fireEvent, queryByAttribute, within } from '@testing-library/react';
import Board from './Board';

let board;
const X = 'X';
const O = 'O';
const NEXT_PLAYER_X = /Player to Play: X/;
const NEXT_PLAYER_O = /Player to Play: O/;

describe('Board component', () => {

  beforeEach(() => {
    board = render(<Board />);
  });

  it('should render properly', () => {
    expect(screen.getAllByTestId(/square/).length).toBe(9);
  });

  it('should render Player to Play as X initially', () => {
    expectScreenToHave(NEXT_PLAYER_X);
  });

  it('should render Reset Game button', () => {
    expect(screen.getByTestId('reset-btn')).toBeInTheDocument();
    expectScreenToHave(/Reset Game/i);
  });

  it('should assign X when one of the Squares is clicked first', () => {
    squareOnClickExpectation(1, X);
    expectScreenToHave(NEXT_PLAYER_O);
  });

  it('should assign X and O respectively any two of the Squares is clicked one after another', () => {
    squareOnClickExpectation(1, X);
    expectScreenToHave(NEXT_PLAYER_O);

    squareOnClickExpectation(2, O);
    expectScreenToHave(NEXT_PLAYER_X);
  })

  it('should not change value if same square is clicked twice', () => {
    squareOnClickExpectation(1, X);
    expectScreenToHave(NEXT_PLAYER_O);

    squareOnClickExpectation(1, X);
    expectScreenToHave(NEXT_PLAYER_O);
  });
});

const squareOnClickExpectation = (id, expectedTxt) => {
  const square = board.getByTestId(`square-${id}`);

  fireEvent.click(square);
  within(square).getByText(expectedTxt);
}

const expectScreenToHave = (regex) => {
  expect(screen.getByText(regex)).toBeInTheDocument();
}