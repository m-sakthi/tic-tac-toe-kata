import { render, screen } from '@testing-library/react';
import Board from './Board';

describe('Board component', () => {
  beforeEach(() => {
    render(<Board />);
  });

  it('should render properly', () => {
    expect(screen.getAllByTestId('square').length).toBe(9);
  });

  it('should render Player to Play as X initially', () => {
    expect(screen.getByText(/Player to Play: X/i)).toBeInTheDocument();
  });

  it('should render Reset Game button', () => {
    expect(screen.getByTestId('reset-btn')).toBeInTheDocument();
    expect(screen.getByText(/Reset Game/i)).toBeInTheDocument();
  });
});