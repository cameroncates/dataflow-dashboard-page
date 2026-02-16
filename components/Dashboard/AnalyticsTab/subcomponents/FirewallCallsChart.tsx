import React from 'react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import ChartWrapper from '../../../ChartWrapper';
import type { ChartDataPoint } from '../../../../utils/types';

export interface FirewallCallsChartProps {
  data: ChartDataPoint[] | null | undefined;
  isLoading: boolean;
  onRefresh: () => void;
}

const FirewallCallsChart: React.FC<FirewallCallsChartProps> = ({ data, isLoading, onRefresh }) => {
  const metric = ((data?.reduce((sum, d) => sum + d.value, 0) || 0) / 1000).toFixed(1) + 'k';

  return (
    <div className="col-span-12 md:col-span-6">
      <ChartWrapper title="Firewall API Calls" metric={metric} onRefresh={onRefresh} isLoading={isLoading}>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data || []}>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                minTickGap={40}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <Tooltip cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="value" fill="#5ea5da" radius={[2, 2, 0, 0]} barSize={6} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartWrapper>
    </div>
  );
};

export default FirewallCallsChart;

