import React from 'react';
import ChartWrapper from '../../../ChartWrapper';
import SourceList from '../../../SourceList';
import type { SourceMetric } from '../../../../utils/types';

export interface SourceQueriesCardProps {
  sources: SourceMetric[] | null | undefined;
  isLoading: boolean;
  onRefresh: () => void;
}

const SourceQueriesCard: React.FC<SourceQueriesCardProps> = ({ sources, isLoading, onRefresh }) => {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-6">
      <ChartWrapper title="Queries by Source" onRefresh={onRefresh} isLoading={isLoading}>
        <SourceList sources={sources || []} />
      </ChartWrapper>
    </div>
  );
};

export default SourceQueriesCard;

