
import React from 'react';
import { AlertCircle } from 'lucide-react';
import Sidebar from './components/Sidebar';
import { useDashboard } from './state/dashboard/useDashboard';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
  const {
    state: { timeRange, data, error, isSidebarOpen, isSidebarCollapsed, refreshing, status, activeNav },
    isGlobalLoading,
    actions: {
      loadDashboard,
      refreshChart,
      setTimeRange,
      setSidebarOpen,
      setSidebarCollapsed,
      setActiveNav,
      clearError,
    },
  } = useDashboard();

  const isBusy = status === 'loading';

  if (error && !data) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg border border-red-100 shadow-sm max-w-md text-center">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => loadDashboard()}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] lg:flex">
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        activeNav={activeNav}
        onNavigate={(nav) => setActiveNav(nav)}
        onToggleCollapse={() => setSidebarCollapsed(!isSidebarCollapsed)}
      />
      <DashboardPage
        timeRange={timeRange}
        data={data}
        error={error}
        isBusy={isBusy}
        isGlobalLoading={isGlobalLoading}
        refreshing={refreshing}
        activeNav={activeNav}
        onOpenSidebar={() => {
          // On mobile: open drawer; on desktop (when collapsed): expand
          setSidebarOpen(true);
          setSidebarCollapsed(false);
        }}
        onRefreshDashboard={() => loadDashboard()}
        onRetryNonBlockingError={() => {
          clearError();
          loadDashboard({ silent: true });
        }}
        onTimeRangeChange={(next) => setTimeRange(next)}
        onRefreshChart={(key) => refreshChart(key)}
      />
    </div>
  );
};

export default App;
