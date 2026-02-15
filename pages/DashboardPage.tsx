import React from 'react';
import { Menu, RefreshCcw } from 'lucide-react';
import { DashboardData, TimeRange } from '../utils/types';
import AnalyticsTab, { AnalyticsChartKey } from '../components/Dashboard/AnalyticsTab';
import type { DashboardNavKey } from '../state/dashboard/dashboardReducer';
import { DASHBOARD_NAV_ITEMS } from '../utils/constants/dashboardNav';

export interface DashboardPageProps {
  timeRange: TimeRange;
  data: DashboardData | null;
  error: string | null;
  isBusy: boolean;
  isGlobalLoading: boolean;
  refreshing: Partial<Record<keyof DashboardData, boolean>>;
  activeNav: DashboardNavKey;
  onOpenSidebar: () => void;
  onRefreshDashboard: () => void;
  onRetryNonBlockingError: () => void;
  onTimeRangeChange: (timeRange: TimeRange) => void;
  onRefreshChart: (key: keyof DashboardData) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  timeRange,
  data,
  error,
  isBusy,
  isGlobalLoading,
  refreshing,
  activeNav,
  onOpenSidebar,
  onRefreshDashboard,
  onRetryNonBlockingError,
  onTimeRangeChange,
  onRefreshChart,
}) => {
  const activeItem = DASHBOARD_NAV_ITEMS.find((i) => i.key === activeNav) ?? DASHBOARD_NAV_ITEMS[0];
  const title = activeItem.title;

  return (
    <main
      className="w-full lg:flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-6 lg:py-8"
    >
      {/* Mobile Header Toggle */}
      <div className="lg:hidden flex items-center justify-between mb-6 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
            D
          </div>
          <span className="font-bold text-gray-800">DataFlow</span>
        </div>
        <button
          onClick={onOpenSidebar}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <button
          onClick={onRefreshDashboard}
          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 shadow-sm"
        >
          <RefreshCcw size={16} className={isBusy ? 'animate-spin' : ''} />
          Refresh Dashboard
        </button>
      </div>

      {activeNav === 'analytics' && (
        <AnalyticsTab
          timeRange={timeRange}
          data={data}
          error={error}
          isBusy={isBusy}
          isGlobalLoading={isGlobalLoading}
          refreshing={refreshing}
          onRetryNonBlockingError={onRetryNonBlockingError}
          onTimeRangeChange={onTimeRangeChange}
          onRefreshChart={(key: AnalyticsChartKey) => onRefreshChart(key)}
        />
      )}
    </main>
  );
};

export default DashboardPage;

