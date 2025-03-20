import * as React from 'react';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateTimes } from '@/lib/data';
import type { Time } from '@/lib/types';
import type { FormDispatch, FormValues } from '@/features/appointment';
import { Heading } from '@/features/appointment/components/heading';
import Step, { useStep } from '@/components/step';

const disabledDays = {
  before: new Date(),
};

type AppointmentDateTimeProps = FormDispatch &
  Omit<FormValues, 'appointmentType' | 'info'>;

export function AppointmentDateTime({
  doctor,
  date,
  time,
  dispatch,
}: AppointmentDateTimeProps) {
  const { nextStep, previousStep } = useStep();
  const [times, setTimes] = React.useState<Time[]>([]);

  React.useEffect(() => {
    if (date && doctor) {
      setTimes(generateTimes(doctor.id, date));
    } else {
      setTimes([]);
    }
  }, [date, doctor]);

  return (
    <>
      <Heading
        title='Select Date & Time'
        description={
          <>
            Choose when you would like to see{' '}
            <span className='font-bold'>{doctor?.name}</span> appointment
          </>
        }
      />

      <div className='grid gap-6 md:grid-cols-2'>
        <div className='flex'>
          <Calendar
            mode='single'
            selected={date || undefined}
            onSelect={(date) => dispatch({ type: 'DATE', payload: date! })}
            disabled={disabledDays}
            className='grow rounded-md border'
          />
        </div>

        <div>
          <h3 className='mb-2 text-center font-medium'>
            {date
              ? `Available times for ${format(date, 'EEEE, MMMM d')}`
              : 'Select a date to see available times'}
          </h3>
          <ScrollArea className='h-[300px] rounded-md border p-4'>
            <div className='grid grid-cols-2 gap-2'>
              {times.map((item) => (
                <Button
                  key={item.id}
                  variant={time?.id === item.id ? 'default' : 'outline'}
                  className='justify-start'
                  disabled={!item.available}
                  onClick={() =>
                    item.available && dispatch({ type: 'TIME', payload: item })
                  }
                >
                  <Clock className='mr-2 h-4 w-4' />
                  {item.time}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <Step.Action className='mt-auto pt-6'>
        <Button variant='outline' onClick={previousStep}>
          Back
        </Button>
        <Button onClick={nextStep} disabled={!time}>
          Next
        </Button>
      </Step.Action>
    </>
  );
}
