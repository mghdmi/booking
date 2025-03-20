import * as React from 'react';
import { useStep } from '@/components/step';

type StepNavigationContext = {
  index: number;
};

type StepNavigationListProps = {
  children: React.ReactNode;
};

type NavigationProviderProps = {
  index: number;
  children: React.ReactNode;
};

const NavigationContext = React.createContext<StepNavigationContext | null>(
  null,
);

const NavigationProvider = ({ index, children }: NavigationProviderProps) => {
  const value = React.useMemo(() => ({ index }), [index]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export function useStepNavigation() {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error(
      'useStepNavigation must be used within a Navigation provider',
    );
  }
  return context;
}

export function StepNavigationList({ children }: StepNavigationListProps) {
  const { currentStep } = useStep();
  const stepCount = React.Children.count(children);
  const progress = Math.floor((currentStep / stepCount) * 100);

  return (
    <header>
      <div className='flex items-center'>
        {React.Children.map(children, (child, index) => (
          <div className='grow'>
            <NavigationProvider index={index}>{child}</NavigationProvider>
          </div>
        ))}
      </div>
      <div className='bg-muted relative mt-3 h-1 w-full overflow-hidden rounded-full'>
        <div
          className={`absolute top-0 left-0 h-full w-full -translate-x-full transition duration-500 ${true ? 'bg-blue-500' : 'bg-muted'}`}
          style={{ transform: `translateX(${progress}%)` }}
        />
      </div>
    </header>
  );
}
