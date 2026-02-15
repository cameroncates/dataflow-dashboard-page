import { DashboardData, TimeRange } from '../../utils/types';

export type DashboardStatus = 'idle' | 'loading' | 'success' | 'error';
export type DashboardChartKey = keyof DashboardData;
export type DashboardNavKey = 'analytics' | 'workflows' | 'teams';

export interface DashboardState {
  timeRange: TimeRange;
  data: DashboardData | null;
  status: DashboardStatus;
  error: string | null;
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  refreshing: Partial<Record<DashboardChartKey, boolean>>;
  activeNav: DashboardNavKey;
}

export const initialDashboardState: DashboardState = {
  timeRange: '90',
  data: null,
  status: 'idle',
  error: null,
  isSidebarOpen: false,
  isSidebarCollapsed: false,
  refreshing: {},
  activeNav: 'analytics',
};

export type DashboardAction =
  | { type: 'timeRange/set'; timeRange: TimeRange }
  | { type: 'sidebar/setOpen'; isOpen: boolean }
  | { type: 'sidebar/setCollapsed'; isCollapsed: boolean }
  | { type: 'nav/setActive'; nav: DashboardNavKey }
  | { type: 'load/start' }
  | { type: 'load/success'; data: DashboardData }
  | { type: 'load/error'; error: string }
  | { type: 'error/clear' }
  | { type: 'refresh/start'; key: DashboardChartKey }
  | { type: 'refresh/success'; key: DashboardChartKey; data: DashboardData[DashboardChartKey] }
  | { type: 'refresh/error'; key: DashboardChartKey; error: string };

export function dashboardReducer(
  state: DashboardState,
  action: DashboardAction,
): DashboardState {
  switch (action.type) {
    case 'timeRange/set':
      return { ...state, timeRange: action.timeRange };
    case 'sidebar/setOpen':
      return { ...state, isSidebarOpen: action.isOpen };
    case 'sidebar/setCollapsed':
      return { ...state, isSidebarCollapsed: action.isCollapsed };
    case 'nav/setActive':
      return { ...state, activeNav: action.nav };

    case 'load/start':
      return { ...state, status: 'loading', error: null };
    case 'load/success':
      return { ...state, status: 'success', data: action.data, error: null };
    case 'load/error':
      return { ...state, status: 'error', error: action.error };
    case 'error/clear':
      return { ...state, error: null };

    case 'refresh/start':
      return {
        ...state,
        refreshing: { ...state.refreshing, [action.key]: true },
      };
    case 'refresh/success':
      return {
        ...state,
        refreshing: { ...state.refreshing, [action.key]: false },
        data: state.data ? { ...state.data, [action.key]: action.data } : state.data,
      };
    case 'refresh/error':
      return {
        ...state,
        refreshing: { ...state.refreshing, [action.key]: false },
        error: action.error,
      };
    default:
      return state;
  }
}

