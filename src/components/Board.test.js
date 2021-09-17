import { render, screen, fireEvent, queryByAttribute, within } from '@testing-library/react';
import Board from './Board';

let board;
const X = 'X';
const O = 'O';
const NEXT_PLAYER_X = /Player to Play: X/;
const NEXT_PLAYER_O = /Player to Play: O/;
const WINNER_X = /Winner: X/;
const WINNER_O = /Winner: O/;
const TIED = /Match Tied/;

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

  it('should show winner if any one of the player has won by matching X', () => {
    squareOnClickExpectation(0, X);
    expectScreenToHave(NEXT_PLAYER_O);

    squareOnClickExpectation(3, O);
    expectScreenToHave(NEXT_PLAYER_X);

    squareOnClickExpectation(1, X);
    expectScreenToHave(NEXT_PLAYER_O);

    squareOnClickExpectation(4, O);
    expectScreenToHave(NEXT_PLAYER_X);

    squareOnClickExpectation(2, X);
    expectScreenToHave(WINNER_X);
  });

  it('should show winner if any one of the player has won by matching O', () => {
    squareOnClickExpectation(0, X);
    expectScreenToHave(NEXT_PLAYER_O);

    squareOnClickExpectation(3, O);
    expectScreenToHave(NEXT_PLAYER_X);

    squareOnClickExpectation(1, X);
    expectScreenToHave(NEXT_PLAYER_O);

    squareOnClickExpectation(4, O);
    expectScreenToHave(NEXT_PLAYER_X);

    squareOnClickExpectation(6, X);
    expectScreenToHave(NEXT_PLAYER_O);

    squareOnClickExpectation(5, O);
    expectScreenToHave(WINNER_O);
  });

  it('should show match tied if winning indices are not matched for by both players', () => {
    squareOnClickExpectation(0, X);
    expectScreenToHave(NEXT_PLAYER_O);

    squareOnClickExpectation(1, O);
    expectScreenToHave(NEXT_PLAYER_X);

    squareOnClickExpectation(2, X);
    expectScreenToHave(NEXT_PLAYER_O);

    squareOnClickExpectation(3, O);
    expectScreenToHave(NEXT_PLAYER_X);

    squareOnClickExpectation(4, X);
    expectScreenToHave(NEXT_PLAYER_O);

    squareOnClickExpectation(6, O);
    expectScreenToHave(NEXT_PLAYER_X);

    squareOnClickExpectation(7, X);
    expectScreenToHave(NEXT_PLAYER_O);

    squareOnClickExpectation(8, O);
    expectScreenToHave(NEXT_PLAYER_X);

    squareOnClickExpectation(5, X);
    expectScreenToHave(TIED);
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