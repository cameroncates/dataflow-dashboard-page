import React from 'react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import ChartWrapper from '../../../ChartWrapper';
import type { ChartDataPoint } from '../../../../utils/types';

export interface FirewallResponseTimeChartProps {
  data: ChartDataPoint[] | null | undefined;
  isLoading: boolean;
  onRefresh: () => void;
}

const FirewallResponseTimeChart: React.FC<FirewallResponseTimeChartProps> = ({ data, isLoading, onRefresh }) => {
  const lastValue = data?.[data.length - 1]?.value ?? 0;
  const metric = lastValue.toFixed(2) + 's';

  return (
    <div className="col-span-12 md:col-span-6">
      <ChartWrapper
        title="Avg. Response Time - Firewall"
        metric={metric}
        onRefresh={onRefresh}
        isLoading={isLoading}
      >
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data || []}>
              <defs>
                <linearGradient id="colorFirewall" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5ea5da" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#5ea5da" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                minTickGap={40}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#5ea5da"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorFirewall)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartWrapper>
    </div>
  );
};

export default FirewallResponseTimeChart;

