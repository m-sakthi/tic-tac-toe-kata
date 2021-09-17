import { render, screen, fireEvent, queryByAttribute, within } from '@testing-library/react';
import Board from './Board';

describe('Board component', () => {
  let board;

  beforeEach(() => {
    board = render(<Board />);
  });

  it('should render properly', () => {
    expect(screen.getAllByTestId(/square/).length).toBe(9);
  });

  it('should render Player to Play as X initially', () => {
    expect(screen.getByText(/Player to Play: X/i)).toBeInTheDocument();
  });

  it('should render Reset Game button', () => {
    expect(screen.getByTestId('reset-btn')).toBeInTheDocument();
    expect(screen.getByText(/Reset Game/i)).toBeInTheDocument();
  });

  it('should assign X when one of the Squares is clicked first', () => {
    const firstBtn = board.getByTestId('square-1');

    fireEvent.click(firstBtn);
    within(firstBtn).getByText('X');

    expect(screen.getByText(/Player to Play: O/i)).toBeInTheDocument();
  });

  it('should assign X and O reqpextively any two of the Squares is clicked one after another', () => {
    const firstBtn = board.getByTestId('square-1');

    fireEvent.click(firstBtn);
    within(firstBtn).getByText('X');
    expect(screen.getByText(/Player to Play: O/i)).toBeInTheDocument();

    const secondBtn = board.getByTestId('square-2');

    fireEvent.click(secondBtn);
    within(secondBtn).getByText('O');
    expect(screen.getByText(/Player to Play: X/i)).toBeInTheDocument();
  })
});