import * as React from 'react';
import { Check } from 'lucide-react';

import { useStep } from '@/components/step';
import { useStepNavigation } from './step-navigation-list';

type StepNavigationProps = {
  title: string;
};

export function StepNavigation({ title }: StepNavigationProps) {
  const { currentStep } = useStep();
  const { index } = useStepNavigation();

  return (
    <div className='flex flex-col items-center'>
      <div
        className={`flex h-10 w-10 transform items-center justify-center rounded-full transition duration-300 ${
          index < currentStep
            ? 'scale-105 bg-blue-500 text-white ring-4 ring-blue-500/30'
            : currentStep === index
              ? 'text-primary-foreground bg-primary ring-primary/20 ring-4'
              : 'bg-muted text-muted-foreground ring-primary/10 ring-4'
        }`}
      >
        {currentStep > index ? (
          <Check className='animate-fadeIn h-5 w-5' />
        ) : (
          index + 1 // show steps from 1,2,3 ...
        )}
      </div>
      <span
        className={`mt-3 hidden text-xs transition-colors duration-300 sm:block ${
          index <= currentStep
            ? 'text-primary font-medium'
            : 'text-muted-foreground'
        }`}
      >
        {title}
      </span>
    </div>
  );
}
