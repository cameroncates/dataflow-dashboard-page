import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Sparkles } from 'lucide-react';

export interface ComingSoonProps {
  title: string;
  Icon?: LucideIcon;
  message?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title, Icon = Sparkles, message = 'Coming soon' }) => {
  return (
    <section className="w-full">
      <div className="bg-white border border-gray-200 rounded-md shadow-sm min-h-[420px] flex items-center justify-center p-10">
        <div className="text-center max-w-md">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
            <Icon size={28} className="text-green-600" />
          </div>
          <h2 className="mt-5 text-xl font-semibold text-gray-900">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">{message}</p>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;

