import * as React from 'react';

type StepPanelProps = {
  children: React.ReactNode;
  className?: string;
};

export function StepPanel({ children, className }: StepPanelProps) {
  return <div className={className}>{children}</div>;
}
