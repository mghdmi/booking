import { format } from 'date-fns';
import {
  Check,
  Calendar,
  Clock,
  User,
  Mail,
  Hourglass,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FormValues } from '@/features/appointment';
import { Heading } from '@/features/appointment/components/heading';
import Step, { useStep } from '@/components/step';

type AppointmentReviewProps = {
  values: FormValues;
};

export function AppointmentReview({ values }: AppointmentReviewProps) {
  const { nextStep, previousStep } = useStep();

  return (
    <>
      <Heading
        title='Review Your Appointment'
        description='Please confirm your appointment details'
      />

      <div className='space-y-6'>
        <div className='grid gap-4 md:grid-cols-2'>
          <div className='space-y-4 rounded-lg border p-4'>
            <h3 className='flex items-center text-lg font-semibold'>
              <Check className='text-primary mr-2 h-5 w-5' />
              Appointment Details
            </h3>

            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Type:</span>
                <span className='font-medium'>{values.appointmentType}</span>
              </div>

              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Doctor:</span>
                <span className='font-medium'>{values.doctor?.name}</span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground flex items-center'>
                  <Calendar className='mr-1 h-4 w-4' />
                  Date:
                </span>
                <span className='font-medium'>
                  {values.date && format(values.date, 'EEEE, MMMM d, yyyy')}
                </span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground flex items-center'>
                  <Clock className='mr-1 h-4 w-4' />
                  Time:
                </span>
                <span className='font-medium'>{values.time?.time}</span>
              </div>
            </div>
          </div>

          <div className='space-y-4 rounded-lg border p-4'>
            <h3 className='flex items-center text-lg font-semibold'>
              <User className='text-primary mr-2 h-5 w-5' />
              Patient Information
            </h3>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground flex items-center'>
                  <User className='text-muted-foreground mr-2 h-4 w-4' />
                  Name:
                </span>
                <span className='font-medium'>{values.info.name}</span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground flex items-center'>
                  <Mail className='text-muted-foreground mr-2 h-4 w-4' />
                  Email:
                </span>
                <span className='font-medium'>{values.info.email}</span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground flex items-center'>
                  <Phone className='text-muted-foreground mr-2 h-4 w-4' />
                  Phone Number:
                </span>
                <span className='font-medium'>{values.info.phone}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-muted-foreground flex items-center'>
                  <Hourglass className='text-muted-foreground mr-2 h-4 w-4' />
                  Age:
                </span>
                <span className='font-medium'>{values.info.age}</span>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-muted rounded-lg p-4 text-sm'>
          <p>
            By confirming, you will receive a confirmation email with details
            about your appointment.
          </p>
        </div>
      </div>

      <Step.Action className='mt-auto pt-8'>
        <Button variant='outline' onClick={previousStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Confirm</Button>
      </Step.Action>
    </>
  );
}
