import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type StepActionProps = {
  children: ReactNode;
  className?: string;
};

export function StepAction({ children, className }: StepActionProps) {
  return (
    <div className={cn('mt-8 flex justify-between', className)}>{children}</div>
  );
}
