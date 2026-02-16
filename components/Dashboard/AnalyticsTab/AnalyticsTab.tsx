import React from 'react';
import { AlertCircle } from 'lucide-react';
import TimeRangeSelect from '../../TimeRangeSelect/TimeRangeSelect';
import { DashboardData, TimeRange } from '../../../utils/types';
import {
  FirewallCallsChart,
  FirewallResponseTimeChart,
  SourceQueriesCard,
  UniqueLoginsChart,
  UsersCard,
  WorkflowQueriesChart,
  WorkflowResponseTimeChart,
} from './subcomponents';

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
  const isLoading = (key: AnalyticsChartKey) => Boolean(refreshing[key]) || isBusy || isGlobalLoading;

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
        <UsersCard users={data?.users} isLoading={isLoading('users')} onRefresh={() => onRefreshChart('users')} />

        <UniqueLoginsChart
          data={data?.uniqueLogins}
          isLoading={isLoading('uniqueLogins')}
          onRefresh={() => onRefreshChart('uniqueLogins')}
        />

        <WorkflowQueriesChart
          data={data?.workflowQueries}
          isLoading={isLoading('workflowQueries')}
          onRefresh={() => onRefreshChart('workflowQueries')}
        />

        <SourceQueriesCard
          sources={data?.sourceQueries}
          isLoading={isLoading('sourceQueries')}
          onRefresh={() => onRefreshChart('sourceQueries')}
        />

        <WorkflowResponseTimeChart
          data={data?.workflowResponseTime}
          isLoading={isLoading('workflowResponseTime')}
          onRefresh={() => onRefreshChart('workflowResponseTime')}
        />

        <FirewallCallsChart
          data={data?.firewallCalls}
          isLoading={isLoading('firewallCalls')}
          onRefresh={() => onRefreshChart('firewallCalls')}
        />

        <FirewallResponseTimeChart
          data={data?.firewallResponseTime}
          isLoading={isLoading('firewallResponseTime')}
          onRefresh={() => onRefreshChart('firewallResponseTime')}
        />
      </div>
    </>
  );
};

export default AnalyticsTab;
