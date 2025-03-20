import { type LucideIcon, Eye, SmileIcon, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { Appointment } from '@/lib/types';
import type { FormDispatch, FormValues } from '@/features/appointment';
import { APPOINTMENTS } from '@/lib/data';
import { Heading } from '@/features/appointment/components/heading';
import Step, { useStep } from '@/components/step';

const ICONS: Record<Appointment, LucideIcon> = {
  dentist: Stethoscope,
  checkup: SmileIcon,
  eye: Eye,
};

type AppointmentTypeProps = FormDispatch & Pick<FormValues, 'appointmentType'>;

export function AppointmentType({
  appointmentType,
  dispatch,
}: AppointmentTypeProps) {
  const { nextStep } = useStep();

  return (
    <>
      <Heading
        title='Select Your Appointment Type'
        description='Choose the type of appointment you need'
      />

      <div className='grid gap-4 md:grid-cols-3'>
        {APPOINTMENTS.map((item) => {
          const Icon = ICONS[item.type];

          return (
            <div
              key={item.type}
              className={`flex cursor-pointer flex-col items-center space-y-2 rounded-lg border p-6 transition-all ${
                appointmentType === item.type
                  ? 'border-primary bg-primary/5'
                  : 'hover:border-primary/50'
              }`}
              onClick={() => {
                dispatch({
                  type: 'APPOINTMENT_TYPE',
                  payload: item.type,
                });
              }}
            >
              <Icon className='text-primary h-8 w-8' />
              <Label
                htmlFor={item.type}
                className='cursor-pointer text-base font-medium'
              >
                {item.title}
              </Label>
              <p className='text-muted-foreground text-center text-sm'>
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
      <Step.Action className='mt-auto justify-end pt-8'>
        <Button onClick={nextStep} disabled={!appointmentType}>
          Next
        </Button>
      </Step.Action>
    </>
  );
}
