import { render, screen } from '@testing-library/react';
import SourceList from '../SourceList';

describe('SourceList', () => {
  it('renders headers', () => {
    render(<SourceList sources={[]} />);
    expect(screen.getByText('Source')).toBeInTheDocument();
    expect(screen.getByText('Queries')).toBeInTheDocument();
  });

  it('renders sources with icons and formatted counts', () => {
    render(
      <SourceList
        sources={[
          {
            id: '1',
            name: 'Slack',
            count: 171000,
            color: '#4ADE80',
            icon: '/icons/slack.png',
          },
          {
            id: '2',
            name: 'Oracle',
            count: 987,
            color: '#FB923C',
            icon: '/icons/oracle.png',
          },
        ]}
      />,
    );

    expect(screen.getByText('Slack')).toBeInTheDocument();
    expect(screen.getByText('Oracle')).toBeInTheDocument();

    expect(screen.getByText('171.0k')).toBeInTheDocument();
    expect(screen.getByText('987')).toBeInTheDocument();

    expect(screen.getByAltText('Slack logo')).toBeInTheDocument();
    expect(screen.getByAltText('Oracle logo')).toBeInTheDocument();
  });
});

