import type { DashboardNavKey } from '../../state/dashboard/dashboardReducer';
import type { LucideIcon } from 'lucide-react';
import { BarChart2, LayoutDashboard, Users } from 'lucide-react';

export interface DashboardNavItem {
  key: DashboardNavKey;
  label: string;
  title: string;
  Icon: LucideIcon;
}

export const DASHBOARD_NAV_ITEMS: readonly DashboardNavItem[] = [
  { key: 'analytics', label: 'Analytics', title: 'Analytics', Icon: BarChart2 },
  { key: 'workflows', label: 'Workflows', title: 'Workflows', Icon: LayoutDashboard },
  { key: 'teams', label: 'Teams', title: 'Teams', Icon: Users },
] as const;

