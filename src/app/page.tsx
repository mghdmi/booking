import { AppointmentBooking } from '@/features/appointment';

export default function Home() {
  return (
    <main className='bg-muted/30 flex min-h-screen flex-col items-center pt-15'>
      <div className='container mx-auto'>
        <h1 className='mb-8 text-center text-3xl font-bold'>
          Doctor Appointment Booking
        </h1>
        <AppointmentBooking />
      </div>
    </main>
  );
}
