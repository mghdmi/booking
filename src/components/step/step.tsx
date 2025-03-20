import * as React from 'react';

type StepContextType = {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
};

type StepProps = {
  children: React.ReactNode;
  initialStep?: number;
};

const StepContext = React.createContext<StepContextType | null>(null);

export function useStep() {
  const context = React.useContext(StepContext);
  if (!context) {
    throw new Error('useStep must be used within a Step provider');
  }
  return context;
}

export default function Step({ children, initialStep = 0 }: StepProps) {
  const [currentStep, setCurrentStep] = React.useState(initialStep);

  const nextStep = React.useCallback(
    () => setCurrentStep((prevValue) => prevValue + 1),
    [setCurrentStep],
  );

  const previousStep = React.useCallback(
    () => setCurrentStep((prevValue) => prevValue - 1),
    [setCurrentStep],
  );

  const reset = React.useCallback(
    () => setCurrentStep(initialStep),
    [initialStep, setCurrentStep],
  );

  const value = React.useMemo(
    () => ({
      currentStep,
      previousStep,
      nextStep,
      reset,
    }),
    [nextStep, previousStep, currentStep, reset],
  );

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
}
