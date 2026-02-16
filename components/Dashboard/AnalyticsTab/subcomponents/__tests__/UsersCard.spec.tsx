import { render, screen, fireEvent } from '@testing-library/react';
import UsersCard from '../UsersCard';

describe('UsersCard', () => {
  it('renders user metrics', () => {
    render(
      <UsersCard
        users={{ total: 10, active: 7, inactive: 3 }}
        isLoading={false}
        onRefresh={() => {}}
      />,
    );

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onRefresh', () => {
    const onRefresh = jest.fn();
    render(<UsersCard users={null} isLoading={false} onRefresh={onRefresh} />);

    fireEvent.click(screen.getByLabelText('Refresh Users'));
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });
});

