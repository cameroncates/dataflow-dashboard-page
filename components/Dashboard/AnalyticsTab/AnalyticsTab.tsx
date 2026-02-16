import React from 'react';
import { AlertCircle } from 'lucide-react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from 'recharts';
import ChartWrapper from '../../ChartWrapper';
import SourceList from '../../SourceList';
import TimeRangeSelect from '../../TimeRangeSelect/TimeRangeSelect';
import { DashboardData, TimeRange } from '../../../utils/types';

export type AnalyticsChartKey = keyof DashboardData;

export interface AnalyticsTabProps {
  timeRange: TimeRange;
  data: DashboardData | null;
  error: string | null;
  isBusy: boolean;
  isGlobalLoading: boolean;
  refreshing: Partial<Record<AnalyticsChartKey, boolean>>;
  onRetryNonBlockingError: () => void;
  onTimeRangeChange: (timeRange: TimeRange) => void;
  onRefreshChart: (key: AnalyticsChartKey) => void;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  timeRange,
  data,
  error,
  isBusy,
  isGlobalLoading,
  refreshing,
  onRetryNonBlockingError,
  onTimeRangeChange,
  onRefreshChart,
}) => {
  return (
    <>
      {error && data && (
        <div className="mb-6 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-md flex items-start gap-3">
          <AlertCircle className="mt-0.5" size={18} />
          <div className="flex-1 text-sm">
            <div className="font-semibold">Some data may be stale.</div>
            <div className="opacity-90">{error}</div>
          </div>
          <button
            onClick={onRetryNonBlockingError}
            className="text-sm font-semibold text-red-700 hover:text-red-800 underline"
          >
            Retry
          </button>
        </div>
      )}

      <div className="mb-8">
        <TimeRangeSelect value={timeRange} onChange={onTimeRangeChange} disabled={isBusy} />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-12 lg:col-span-4 h-full">
          <ChartWrapper
            title="Users"
            onRefresh={() => onRefreshChart('users')}
            isLoading={Boolean(refreshing['users']) || isBusy || isGlobalLoading}
            className="h-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
              {[
                { label: 'Total Users', value: data?.users.total || 0, color: 'bg-blue-400' },
                { label: 'Active', value: data?.users.active || 0, color: 'bg-green-400' },
                { label: 'Inactive', value: data?.users.inactive || 0, color: 'bg-gray-300' },
              ].map((m, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className={`w-1 h-12 rounded-full ${m.color}`} />
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase">{m.label}</div>
                    <div className="text-2xl font-bold text-gray-800">{m.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </ChartWrapper>
        </div>

        <div className="col-span-12 md:col-span-12 lg:col-span-8">
          <ChartWrapper
            title="Number of Unique Logins"
            metric={data?.uniqueLogins.reduce((acc, curr) => Math.max(acc, curr.value), 0) || 0}
            onRefresh={() => onRefreshChart('uniqueLogins')}
            isLoading={Boolean(refreshing['uniqueLogins']) || isBusy || isGlobalLoading}
          >
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.uniqueLogins}>
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

        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <ChartWrapper
            title="Queries Executed in the Workflow"
            metric={
              ((data?.workflowQueries.reduce((sum, d) => sum + d.value, 0) || 0) / 1000).toFixed(
                1,
              ) + 'k'
            }
            onRefresh={() => onRefreshChart('workflowQueries')}
            isLoading={Boolean(refreshing['workflowQueries']) || isBusy || isGlobalLoading}
          >
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.workflowQueries}>
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

        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <ChartWrapper
            title="Queries by Source"
            onRefresh={() => onRefreshChart('sourceQueries')}
            isLoading={Boolean(refreshing['sourceQueries']) || isBusy || isGlobalLoading}
          >
            <SourceList sources={data?.sourceQueries || []} />
          </ChartWrapper>
        </div>

        <div className="col-span-12">
          <ChartWrapper
            title="Avg. Response Time – Workflow"
            metric={
              (data?.workflowResponseTime[data.workflowResponseTime.length - 1]?.value || 0).toFixed(
                1,
              ) + 's'
            }
            onRefresh={() => onRefreshChart('workflowResponseTime')}
            isLoading={Boolean(refreshing['workflowResponseTime']) || isBusy || isGlobalLoading}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.workflowResponseTime}>
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

        <div className="col-span-12 md:col-span-6">
          <ChartWrapper
            title="Firewall API Calls"
            metric={
              ((data?.firewallCalls.reduce((sum, d) => sum + d.value, 0) || 0) / 1000).toFixed(1) +
              'k'
            }
            onRefresh={() => onRefreshChart('firewallCalls')}
            isLoading={Boolean(refreshing['firewallCalls']) || isBusy || isGlobalLoading}
          >
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.firewallCalls}>
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

        <div className="col-span-12 md:col-span-6">
          <ChartWrapper
            title="Avg. Response Time - Firewall"
            metric={
              (data?.firewallResponseTime[data.firewallResponseTime.length - 1]?.value || 0).toFixed(
                2,
              ) + 's'
            }
            onRefresh={() => onRefreshChart('firewallResponseTime')}
            isLoading={Boolean(refreshing['firewallResponseTime']) || isBusy || isGlobalLoading}
          >
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.firewallResponseTime}>
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
      </div>
    </>
  );
};

export default AnalyticsTab;
