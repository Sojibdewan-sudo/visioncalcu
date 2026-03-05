import React from 'react';
import { cn } from '../lib/utils';
import { ADS_ENABLED } from '../config';

interface AdPlaceholderProps {
  className?: string;
  text?: string;
}

export function AdPlaceholder({ className, text = 'Advertisement' }: AdPlaceholderProps) {
  if (!ADS_ENABLED) return null;

  return (
    <div
      className={cn(
        'ad-container my-8 text-center flex items-center justify-center bg-slate-200 text-slate-400 rounded-xl border border-dashed border-slate-300',
        className
      )}
    >
      <span className="text-sm font-medium tracking-wider uppercase">{text}</span>
    </div>
  );
}

