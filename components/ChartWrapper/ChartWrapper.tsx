import React from 'react';
import { RotateCcw, Loader2 } from 'lucide-react';

export interface ChartWrapperProps {
  title: string;
  metric?: string | number;
  onRefresh: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({
  title,
  metric,
  onRefresh,
  isLoading,
  children,
  className = '',
}) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-md p-6 relative flex flex-col min-h-[300px] ${className}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="text-sm font-extrabold text-gray-700 uppercase tracking-wider">
            {title}
          </h3>
          {metric && (
            <div className="text-3xl font-bold text-gray-900 mt-1">{metric}</div>
          )}
        </div>
        <button
          onClick={onRefresh}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          disabled={isLoading}
          aria-label={`Refresh ${title}`}
        >
          <RotateCcw size={16} className={isLoading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="flex-1 w-full mt-4">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-50/50 rounded-md">
            <Loader2 className="animate-spin text-green-500" size={32} />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default ChartWrapper;

