import { render, screen, fireEvent } from '@testing-library/react';
import SourceQueriesCard from '../SourceQueriesCard';

describe('SourceQueriesCard', () => {
  it('renders a list of sources', () => {
    render(
      <SourceQueriesCard
        sources={[
          { id: '1', name: 'Slack', count: 1000, color: '#4ADE80', icon: '/icons/slack.png' },
          { id: '2', name: 'Teams', count: 500, color: '#60A5FA', icon: '/icons/teams.png' },
        ]}
        isLoading={false}
        onRefresh={() => {}}
      />,
    );

    expect(screen.getByText('Queries by Source')).toBeInTheDocument();
    expect(screen.getByText('Slack')).toBeInTheDocument();
    expect(screen.getByText('Teams')).toBeInTheDocument();
  });

  it('calls onRefresh', () => {
    const onRefresh = jest.fn();
    render(<SourceQueriesCard sources={[]} isLoading={false} onRefresh={onRefresh} />);

    fireEvent.click(screen.getByLabelText('Refresh Queries by Source'));
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });
});

