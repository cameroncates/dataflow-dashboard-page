
import { DashboardData, TimeRange, ChartDataPoint } from '../utils/types';

const generateTimeData = (days: number, baseValue: number, volatility: number): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const randomFactor = Math.random() * volatility - (volatility / 2);
    data.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.max(0, Math.floor(baseValue + randomFactor))
    });
  }
  return data;
};

export const fetchDashboardData = async (range: TimeRange): Promise<DashboardData> => {
  const days = parseInt(range);
  
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    users: {
      total: 500 + Math.floor(Math.random() * 200),
      active: 450 + Math.floor(Math.random() * 150),
      inactive: 20 + Math.floor(Math.random() * 50),
    },
    uniqueLogins: generateTimeData(days, 350, 150),
    workflowQueries: generateTimeData(days, 300, 200),
    sourceQueries: [
      { id: '1', name: 'Slack', count: 171000, color: '#4ADE80', icon: '/icons/slack.png' },
      { id: '2', name: 'Microsoft Teams', count: 21000, color: '#60A5FA', icon: '/icons/teams.png' },
      { id: '3', name: 'AWS Cloud', count: 7800, color: '#FBBF24', icon: '/icons/aws.png' },
      { id: '4', name: 'Google Cloud', count: 2100, color: '#EF4444', icon: '/icons/google-cloud.png' },
      { id: '5', name: 'Oracle', count: 987, color: '#FB923C', icon: '/icons/oracle.png' },
      { id: '6', name: 'G Suite Gmail', count: 809, color: '#A78BFA', icon: '/icons/gmail.png' },
    ].map(s => ({ ...s, count: Math.floor(s.count * (0.8 + Math.random() * 0.4)) })),
    workflowResponseTime: generateTimeData(days, 10, 5),
    firewallCalls: generateTimeData(days, 12000, 5000),
    firewallResponseTime: generateTimeData(days, 2.5, 1.5),
  };
};
