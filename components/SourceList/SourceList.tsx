import React from 'react';
import { SourceMetric } from '../../utils/types';

export interface SourceListProps {
  sources: SourceMetric[];
}

const SourceList: React.FC<SourceListProps> = ({ sources }) => {
  const maxCount = Math.max(...sources.map((s) => s.count));

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className="space-y-4 mt-2">
      <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
        <span>Source</span>
        <span>Queries</span>
      </div>
      {sources.map((source) => (
        <div key={source.id} className="flex items-center gap-3">
          <span className="text-lg w-6 flex justify-center">{source.icon}</span>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">{source.name}</span>
              <span className="text-sm font-bold text-gray-900">
                {formatNumber(source.count)}
              </span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(source.count / maxCount) * 100}%`,
                  backgroundColor: source.color,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SourceList;

