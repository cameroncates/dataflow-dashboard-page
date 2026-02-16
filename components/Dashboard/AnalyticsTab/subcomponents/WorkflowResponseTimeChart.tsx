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

export interface WorkflowResponseTimeChartProps {
  data: ChartDataPoint[] | null | undefined;
  isLoading: boolean;
  onRefresh: () => void;
}

const WorkflowResponseTimeChart: React.FC<WorkflowResponseTimeChartProps> = ({ data, isLoading, onRefresh }) => {
  const lastValue = data?.[data.length - 1]?.value ?? 0;
  const metric = lastValue.toFixed(1) + 's';

  return (
    <div className="col-span-12">
      <ChartWrapper
        title="Avg. Response Time – Workflow"
        metric={metric}
        onRefresh={onRefresh}
        isLoading={isLoading}
      >
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data || []}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#70b162" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#70b162" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                minTickGap={60}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#70b162"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartWrapper>
    </div>
  );
};

export default WorkflowResponseTimeChart;

