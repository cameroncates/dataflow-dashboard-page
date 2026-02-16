import { render, screen, fireEvent } from '@testing-library/react';
import ChartWrapper from '../ChartWrapper';

describe('ChartWrapper', () => {
  it('renders title and children', () => {
    render(
      <ChartWrapper title="My Chart" onRefresh={() => {}}>
        <div>Chart body</div>
      </ChartWrapper>,
    );

    expect(screen.getByText('My Chart')).toBeInTheDocument();
    expect(screen.getByText('Chart body')).toBeInTheDocument();
  });

  it('renders metric when provided', () => {
    render(
      <ChartWrapper title="My Chart" metric="123" onRefresh={() => {}}>
        <div>Chart body</div>
      </ChartWrapper>,
    );

    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('calls onRefresh when refresh button clicked', () => {
    const onRefresh = jest.fn();
    render(
      <ChartWrapper title="My Chart" onRefresh={onRefresh}>
        <div>Chart body</div>
      </ChartWrapper>,
    );

    fireEvent.click(screen.getByLabelText('Refresh My Chart'));
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it('disables refresh and hides children while loading', () => {
    const onRefresh = jest.fn();
    render(
      <ChartWrapper title="My Chart" onRefresh={onRefresh} isLoading={true}>
        <div>Chart body</div>
      </ChartWrapper>,
    );

    expect(screen.getByLabelText('Refresh My Chart')).toBeDisabled();
    expect(screen.queryByText('Chart body')).not.toBeInTheDocument();
  });
});

