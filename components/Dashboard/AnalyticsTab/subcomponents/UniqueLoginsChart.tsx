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

export interface UniqueLoginsChartProps {
  data: ChartDataPoint[] | null | undefined;
  isLoading: boolean;
  onRefresh: () => void;
}

const UniqueLoginsChart: React.FC<UniqueLoginsChartProps> = ({ data, isLoading, onRefresh }) => {
  const metric = data?.reduce((acc, curr) => Math.max(acc, curr.value), 0) || 0;

  return (
    <div className="col-span-12 md:col-span-12 lg:col-span-8">
      <ChartWrapper
        title="Number of Unique Logins"
        metric={metric}
        onRefresh={onRefresh}
        isLoading={isLoading}
      >
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data || []}>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                minTickGap={30}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <Tooltip
                cursor={{ fill: '#f3f4f6' }}
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Bar dataKey="value" fill="#5ea5da" radius={[2, 2, 0, 0]} barSize={6} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartWrapper>
    </div>
  );
};

export default UniqueLoginsChart;

