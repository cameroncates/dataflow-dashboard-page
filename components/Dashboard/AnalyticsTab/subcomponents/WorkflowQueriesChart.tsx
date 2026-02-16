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

export interface WorkflowQueriesChartProps {
  data: ChartDataPoint[] | null | undefined;
  isLoading: boolean;
  onRefresh: () => void;
}

const WorkflowQueriesChart: React.FC<WorkflowQueriesChartProps> = ({ data, isLoading, onRefresh }) => {
  const metric =
    ((data?.reduce((sum, d) => sum + d.value, 0) || 0) / 1000).toFixed(1) + 'k';

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-6">
      <ChartWrapper
        title="Queries Executed in the Workflow"
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
              <Tooltip cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="value" fill="#70b162" radius={[2, 2, 0, 0]} barSize={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartWrapper>
    </div>
  );
};

export default WorkflowQueriesChart;

