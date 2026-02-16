import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { TimeRange } from '../../utils/types';
import { TIME_RANGE_OPTIONS } from '../../utils/constants/timeRangeOptions';

export interface TimeRangeSelectProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  disabled?: boolean;
}

const TimeRangeSelect: React.FC<TimeRangeSelectProps> = ({ value, onChange, disabled }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const selected = TIME_RANGE_OPTIONS.find((o) => o.value === value) ?? TIME_RANGE_OPTIONS[0];

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const targetNode = e.target as Node | null;
      if (!targetNode) return;
      if (buttonRef.current?.contains(targetNode)) return;
      if (menuRef.current?.contains(targetNode)) return;
      setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('touchstart', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('touchstart', onPointerDown);
    };
  }, [open]);

  return (
    <div className="relative inline-flex">
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={[
          'group inline-flex items-center overflow-hidden rounded-md border bg-white',
          'border-gray-200 shadow-sm',
          'transition-colors',
          'hover:border-gray-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/30',
          disabled ? 'opacity-60 cursor-not-allowed' : '',
        ].join(' ')}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex items-center h-10 pl-4 pr-2 text-sm font-semibold text-gray-900 leading-none">
          Time Range
        </span>

        <span className="flex items-center h-10 gap-2 pl-2 pr-4">
          <span className="text-sm font-semibold text-green-700 bg-green-50 rounded-md px-2 py-1 leading-none">
            {selected.label}
          </span>
          <ChevronDown
            size={18}
            className={[
              'text-gray-900 transition-transform',
              open ? 'rotate-180' : '',
            ].join(' ')}
            aria-hidden="true"
          />
        </span>
      </button>

      {open ? (
        <div
          ref={menuRef}
          role="listbox"
          aria-label="Time range"
          className="absolute left-0 top-[calc(100%+8px)] z-50 w-full min-w-[260px] rounded-md border border-gray-200 bg-white shadow-lg p-1"
        >
          {TIME_RANGE_OPTIONS.map((opt) => {
            const active = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={[
                  'w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-left',
                  'text-sm font-medium',
                  active ? 'bg-green-50 text-green-800' : 'text-gray-700 hover:bg-gray-50',
                ].join(' ')}
              >
                <span>{opt.label}</span>
                {active ? <Check size={16} className="text-green-600" /> : <span className="w-4" />}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default TimeRangeSelect;

