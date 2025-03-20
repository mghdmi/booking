import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FormDispatch } from '@/features/appointment';
import { useStep } from '@/components/step';

export function AppointmentConfirmed({ dispatch }: FormDispatch) {
  const { reset } = useStep();

  return (
    <>
      <div className='flex flex-col items-center justify-center py-10 text-center'>
        <div className='mb-6 rounded-full bg-blue-500/10 p-3'>
          <CheckCircle className='h-12 w-12 text-blue-500' />
        </div>

        <h2 className='mb-2 text-2xl font-bold'>Appointment Confirmed!</h2>
        <p className='text-muted-foreground mb-6 max-w-md'>
          Your appointment has been successfully scheduled. We've sent a
          confirmation email with all the details.
        </p>

        <div className='space-y-6'>
          <p className='text-sm'>
            If you need to reschedule or cancel your appointment, please contact
            us at least 24 hours in advance.
          </p>
          <Button
            onClick={() => {
              dispatch({ type: 'RESET' });
              reset();
            }}
          >
            Book Another Appointment
          </Button>
        </div>
      </div>
    </>
  );
}
