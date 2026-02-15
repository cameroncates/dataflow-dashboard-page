import type { ChartDataPoint } from './chart';

export interface UserMetrics {
  total: number;
  active: number;
  inactive: number;
}

export interface SourceMetric {
  id: string;
  name: string;
  count: number;
  color: string;
  icon: string;
}

export interface DashboardData {
  users: UserMetrics;
  uniqueLogins: ChartDataPoint[];
  workflowQueries: ChartDataPoint[];
  sourceQueries: SourceMetric[];
  workflowResponseTime: ChartDataPoint[];
  firewallCalls: ChartDataPoint[];
  firewallResponseTime: ChartDataPoint[];
}

