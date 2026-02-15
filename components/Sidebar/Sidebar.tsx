import React from 'react';
import {
  ChevronRight,
  ChevronLeft,
  X,
} from 'lucide-react';
import type { DashboardNavKey } from '../../state/dashboard/dashboardReducer';
import { DASHBOARD_NAV_ITEMS } from '../../utils/constants/dashboardNav';

export interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  activeNav: DashboardNavKey;
  onNavigate: (nav: DashboardNavKey) => void;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isCollapsed,
  onClose,
  activeNav,
  onNavigate,
  onToggleCollapse,
}) => {
  const navLinkClass = (key: SidebarProps['activeNav']) =>
    key === activeNav
      ? 'flex items-center gap-3 px-4 py-2 bg-green-50 text-green-700 rounded-md font-medium'
      : 'flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors';

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
          data-testid="sidebar-overlay"
        />
      )}

      <aside
        className={`
        fixed left-0 top-0 h-screen bg-white border-r border-gray-200
        lg:sticky lg:top-0 lg:left-auto
        flex flex-col z-50 transition-[width,transform] duration-300 ease-in-out
        w-64 ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
      >
        {/* Desktop collapse/expand toggle (half-out circle) */}
        <button
          type="button"
          className="
            hidden lg:flex items-center justify-center
            absolute top-6 right-0 translate-x-1/2
            w-7 h-7 rounded-full
            bg-white border border-gray-200 shadow-sm
            text-gray-700 hover:text-gray-900
            hover:shadow transition
          "
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        <div className="p-6 flex items-center justify-between">
          <div className={`flex items-center gap-2`}>
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
              D
            </div>
            <span
              className={`
                block whitespace-nowrap text-xl font-bold text-gray-800
                lg:overflow-hidden lg:transition-[max-width,opacity] lg:duration-150 lg:delay-200
                ${isCollapsed ? 'lg:max-w-0 lg:opacity-0' : 'lg:max-w-[10rem] lg:opacity-100'}
              `}
            >
              DataFlow
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 mt-4 px-4 space-y-2">
          {DASHBOARD_NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href="#"
              className={`${navLinkClass(item.key)} ${isCollapsed ? 'lg:justify-center lg:px-0 gap-0' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.key);
                onClose();
              }}
              aria-label={item.label}
              title={item.label}
            >
              <item.Icon size={20} />
              <span
                className={`
                  whitespace-nowrap
                  lg:overflow-hidden lg:transition-[max-width,opacity] lg:duration-150 lg:delay-200
                  ${isCollapsed ? 'lg:max-w-0 lg:opacity-0' : 'lg:max-w-[12rem] lg:opacity-100'}
                `}
              >
                {item.label}
              </span>
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

