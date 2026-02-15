import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../Sidebar';

describe('Sidebar', () => {
  it('renders navigation items', () => {
    render(
      <Sidebar
        isOpen={true}
        isCollapsed={false}
        onClose={() => {}}
        activeNav="analytics"
        onNavigate={() => {}}
        onToggleCollapse={() => {}}
      />,
    );

    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Workflows')).toBeInTheDocument();
    expect(screen.getByText('Teams')).toBeInTheDocument();
  });

  it('calls onClose when the overlay is clicked', () => {
    const onClose = jest.fn();
    render(
      <Sidebar
        isOpen={true}
        isCollapsed={false}
        onClose={onClose}
        activeNav="analytics"
        onNavigate={() => {}}
        onToggleCollapse={() => {}}
      />,
    );

    fireEvent.click(screen.getByTestId('sidebar-overlay'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render the overlay when closed', () => {
    render(
      <Sidebar
        isOpen={false}
        isCollapsed={false}
        onClose={() => {}}
        activeNav="analytics"
        onNavigate={() => {}}
        onToggleCollapse={() => {}}
      />,
    );
    expect(screen.queryByTestId('sidebar-overlay')).not.toBeInTheDocument();
  });
});

