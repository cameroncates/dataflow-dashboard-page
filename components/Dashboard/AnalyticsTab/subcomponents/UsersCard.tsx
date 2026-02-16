import React from 'react';
import ChartWrapper from '../../../ChartWrapper';
import type { DashboardData } from '../../../../utils/types';

export interface UsersCardProps {
  users: DashboardData['users'] | null | undefined;
  isLoading: boolean;
  onRefresh: () => void;
}

const UsersCard: React.FC<UsersCardProps> = ({ users, isLoading, onRefresh }) => {
  return (
    <div className="col-span-12 md:col-span-12 lg:col-span-4 h-full">
      <ChartWrapper title="Users" onRefresh={onRefresh} isLoading={isLoading} className="h-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
          {[
            { label: 'Total Users', value: users?.total || 0, color: 'bg-blue-400' },
            { label: 'Active', value: users?.active || 0, color: 'bg-green-400' },
            { label: 'Inactive', value: users?.inactive || 0, color: 'bg-gray-300' },
          ].map((metric) => (
            <div key={metric.label} className="flex gap-4 items-start">
              <div className={`w-1 h-12 rounded-full ${metric.color}`} />
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase">{metric.label}</div>
                <div className="text-2xl font-bold text-gray-800">{metric.value}</div>
              </div>
            </div>
          ))}
        </div>
      </ChartWrapper>
    </div>
  );
};

export default UsersCard;

