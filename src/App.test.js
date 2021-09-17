import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('should render properly', () => {
    render(<App />);
    expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
  });
});