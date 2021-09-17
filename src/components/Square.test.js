import { render, screen, fireEvent } from '@testing-library/react';
import Square from './Square';

describe('Square component', () => {
  let onClick;

  beforeEach(() => {
    onClick = jest.fn();
    render(<Square value={'X'} onClick={onClick} />);
  });

  it('should render properly', () => {
    expect(screen.getByText('X')).toBeInTheDocument();
  });

  it('should run onClick handler when clicked', () => {
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
