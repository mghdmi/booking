import * as React from 'react';

import { useStep } from '@/components/step';

export function StepPanelList({ children }: { children: React.ReactNode }) {
  const { currentStep } = useStep();

  return React.Children.toArray(children)[currentStep];
}
