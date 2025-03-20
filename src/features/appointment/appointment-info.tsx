import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { FormDispatch, FormValues } from '@/features/appointment';
import { useForm } from '@/hooks/use-form';
import { Heading } from '@/features/appointment/components/heading';
import Step, { useStep } from '@/components/step';

const schema = z.object({
  name: z.string().nonempty('Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z
    .string()
    .nonempty('Please enter your phone number')
    .min(10, 'Phone number must be at least 10 digits'),
  age: z.string().nonempty('Please enter your age'),
});

type AppointmentInfoProps = FormDispatch & Pick<FormValues, 'info'>;

export function AppointmentInfo({ info, dispatch }: AppointmentInfoProps) {
  const { nextStep, previousStep } = useStep();
  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm({
    schema,
    initialValues: {
      name: info.name,
      email: info.email,
      phone: info.phone,
      age: info.age,
    },
    async onSubmit(values) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      dispatch({ type: 'INFO', payload: values });
      toast.success('Information validated successfully');
      nextStep();
    },
  });

  return (
    <>
      <Heading
        title='Patient Information'
        description='Please provide your contact details'
      />

      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            placeholder='John Doe'
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && (
            <p className='text-destructive text-sm'>{errors.name}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            placeholder='johndoe@example.com'
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className='text-destructive text-sm'>{errors.email}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='phone'>Phone Number</Label>
          <Input
            id='phone'
            type='tel'
            value={values.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder='123456789'
            className={errors.phone ? 'border-destructive' : ''}
          />
          {errors.phone && (
            <p className='text-destructive text-sm'>{errors.phone}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='age'>Age</Label>
          <Input
            id='age'
            name='age'
            type='number'
            placeholder='24'
            value={values.age}
            onChange={(e) => handleChange('age', e.target.value)}
            className={errors.age ? 'border-destructive' : ''}
          />
          {errors.age && (
            <p className='text-destructive text-sm'>{errors.age}</p>
          )}
        </div>
      </div>

      <Step.Action className='mt-auto pt-8'>
        <Button
          variant='outline'
          onClick={() => {
            dispatch({ type: 'INFO', payload: values });
            previousStep();
          }}
        >
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              Checking <Loading />
            </>
          ) : (
            'Next'
          )}
        </Button>
      </Step.Action>
    </>
  );
}

function Loading() {
  return (
    <svg
      className='h-4 w-4 animate-spin text-current'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      ></circle>
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      ></path>
    </svg>
  );
}
