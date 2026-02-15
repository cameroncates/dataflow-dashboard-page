import { useCallback, useEffect, useReducer, useRef } from 'react';
import { fetchDashboardData } from '../../services/api';
import { TimeRange } from '../../utils/types';
import {
  DashboardChartKey,
  DashboardNavKey,
  dashboardReducer,
  initialDashboardState,
} from './dashboardReducer';

const DEFAULT_ERROR_MESSAGE = 'Failed to fetch dashboard data. Please try again.';

export function useDashboard() {
  const [state, dispatch] = useReducer(dashboardReducer, initialDashboardState);
  const latestRequestId = useRef(0);

  const loadDashboard = useCallback(
    async (opts?: { silent?: boolean }) => {
      const requestId = ++latestRequestId.current;
      const silent = opts?.silent ?? false;

      if (!silent) dispatch({ type: 'load/start' });
      else dispatch({ type: 'error/clear' });

      try {
        const data = await fetchDashboardData(state.timeRange);
        if (requestId !== latestRequestId.current) return;
        dispatch({ type: 'load/success', data });
      } catch {
        if (requestId !== latestRequestId.current) return;
        dispatch({
          type: 'load/error',
          error: DEFAULT_ERROR_MESSAGE,
        });
      }
    },
    [state.timeRange],
  );

  const refreshChart = useCallback(
    async (key: DashboardChartKey) => {
      dispatch({ type: 'refresh/start', key });
      try {
        const data = await fetchDashboardData(state.timeRange);
        dispatch({ type: 'refresh/success', key, data: data[key] });
      } catch (err) {
        console.error(`Failed to refresh ${String(key)}`, err);
        dispatch({
          type: 'refresh/error',
          key,
          error: 'Failed to refresh chart. Please try again.',
        });
      }
    },
    [state.timeRange],
  );

  const setTimeRange = useCallback((timeRange: TimeRange) => {
    dispatch({ type: 'timeRange/set', timeRange });
  }, []);

  const setSidebarOpen = useCallback((isOpen: boolean) => {
    dispatch({ type: 'sidebar/setOpen', isOpen });
  }, []);

  const setSidebarCollapsed = useCallback((isCollapsed: boolean) => {
    dispatch({ type: 'sidebar/setCollapsed', isCollapsed });
  }, []);

  const setActiveNav = useCallback((nav: DashboardNavKey) => {
    dispatch({ type: 'nav/setActive', nav });
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const isGlobalLoading = state.status === 'loading' && !state.data;

  return {
    state,
    isGlobalLoading,
    actions: {
      loadDashboard,
      refreshChart,
      setTimeRange,
      setSidebarOpen,
      setSidebarCollapsed,
      setActiveNav,
      clearError: () => dispatch({ type: 'error/clear' }),
    },
  };
}

