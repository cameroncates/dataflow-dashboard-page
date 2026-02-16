import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TimeRangeSelect from '../TimeRangeSelect';

describe('TimeRangeSelect', () => {
  it('renders the current selection', () => {
    render(<TimeRangeSelect value="90" onChange={() => {}} />);
    expect(screen.getByRole('button', { name: /time range/i })).toBeInTheDocument();
    expect(screen.getByText('Last 90 days')).toBeInTheDocument();
  });

  it('opens and selects an option', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(<TimeRangeSelect value="90" onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /time range/i }));
    expect(screen.getByRole('listbox', { name: /time range/i })).toBeInTheDocument();

    await user.click(screen.getByRole('option', { name: 'Last 7 days' }));
    expect(onChange).toHaveBeenCalledWith('7');
    expect(screen.queryByRole('listbox', { name: /time range/i })).not.toBeInTheDocument();
  });

  it('closes on escape', async () => {
    const user = userEvent.setup();
    render(<TimeRangeSelect value="90" onChange={() => {}} />);

    await user.click(screen.getByRole('button', { name: /time range/i }));
    expect(screen.getByRole('listbox', { name: /time range/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('listbox', { name: /time range/i })).not.toBeInTheDocument();
  });

  it('closes on outside click', async () => {
    const user = userEvent.setup();
    render(<TimeRangeSelect value="90" onChange={() => {}} />);

    await user.click(screen.getByRole('button', { name: /time range/i }));
    expect(screen.getByRole('listbox', { name: /time range/i })).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('listbox', { name: /time range/i })).not.toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<TimeRangeSelect value="90" onChange={() => {}} disabled={true} />);

    const button = screen.getByRole('button', { name: /time range/i });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(screen.queryByRole('listbox', { name: /time range/i })).not.toBeInTheDocument();
  });
});

