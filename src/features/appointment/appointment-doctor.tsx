import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { FormDispatch, FormValues } from '@/features/appointment';
import { DOCTORS, getDoctorNameFirstLetter } from '@/lib/data';
import { Heading } from '@/features/appointment/components/heading';
import Step, { useStep } from '@/components/step';

type AppointmentDoctorProps = FormDispatch &
  Pick<FormValues, 'appointmentType' | 'doctor'>;

export function AppointmentDoctor({
  appointmentType,
  doctor,
  dispatch,
}: AppointmentDoctorProps) {
  const { nextStep, previousStep } = useStep();

  const filteredDoctors = DOCTORS.filter(
    (item) => appointmentType === item.specialty,
  );

  return (
    <>
      <Heading
        title='Choose Your Doctor'
        description={
          <>
            Select a doctor for your{' '}
            <span className='font-bold'>{appointmentType}</span> appointment
          </>
        }
      />

      <div className='grid gap-4 md:grid-cols-3'>
        {filteredDoctors.map((item) => (
          <div
            key={item.id}
            className={`flex cursor-pointer flex-col items-center space-y-2 rounded-lg border p-6 transition-all ${
              doctor?.id === item.id
                ? 'border-primary bg-primary/5'
                : 'hover:border-primary/50'
            }`}
            onClick={() =>
              dispatch({
                type: 'DOCTOR',
                payload: item,
              })
            }
          >
            <Avatar className='mb-2 h-16 w-16'>
              <AvatarFallback className='bg-primary text-primary-foreground'>
                {getDoctorNameFirstLetter(item.name)}
              </AvatarFallback>
            </Avatar>
            <Label
              htmlFor={item.name}
              className='cursor-pointer text-base font-medium'
            >
              {item.name}
            </Label>
            <p className='text-muted-foreground text-center text-sm'>
              {item.specialty}
            </p>
          </div>
        ))}
      </div>
      <Step.Action className='mt-auto pt-8'>
        <Button variant='outline' onClick={previousStep}>
          Back
        </Button>
        <Button onClick={nextStep} disabled={!doctor}>
          Next
        </Button>
      </Step.Action>
    </>
  );
}
