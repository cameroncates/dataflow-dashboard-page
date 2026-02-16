import { render, screen } from '@testing-library/react';
import ComingSoon from '../ComingSoon';

describe('ComingSoon', () => {
  it('renders title and default message', () => {
    render(<ComingSoon title="Workflows" />);
    expect(screen.getByText('Workflows')).toBeInTheDocument();
    expect(screen.getByText('Coming soon')).toBeInTheDocument();
  });

  it('renders custom message', () => {
    render(<ComingSoon title="Teams" message="In progress" />);
    expect(screen.getByText('Teams')).toBeInTheDocument();
    expect(screen.getByText('In progress')).toBeInTheDocument();
  });
});

