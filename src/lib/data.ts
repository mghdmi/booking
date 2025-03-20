import type { Appointment, Doctor, Time } from '@/lib/types';

export const DOCTORS = [
  { id: '1', name: 'Dr. Smith', specialty: 'checkup' },
  { id: '2', name: 'Dr. Johnson', specialty: 'checkup' },
  { id: '3', name: 'Dr. Lee', specialty: 'checkup' },
  { id: '4', name: 'Dr. Patel', specialty: 'dentist' },
  { id: '5', name: 'Dr. Garcia', specialty: 'dentist' },
  { id: '6', name: 'Dr. Chen', specialty: 'dentist' },
  { id: '7', name: 'Dr. Wilson', specialty: 'eye' },
  { id: '8', name: 'Dr. Brown', specialty: 'eye' },
  { id: '9', name: 'Dr. Taylor', specialty: 'eye' },
] satisfies Doctor[];

export function getDoctorNameFirstLetter(name: string) {
  return name.split(' ').at(1)?.at(0);
}

export const APPOINTMENTS = [
  {
    type: 'checkup',
    title: 'Checkup',
    description: 'Regular health examination',
  },
  {
    type: 'dentist',
    title: 'Dentist',
    description: 'Dental care and treatment',
  },
  {
    type: 'eye',
    title: 'Eye',
    description: 'Vision testing and eye health',
  },
] satisfies Array<{ type: Appointment; title: string; description: string }>;

export const generateTimes = (doctorId: string, date: Date): Time[] => {
  const times: Time[] = [];

  // generate slots from 9 AM to 5 PM
  for (let hour = 9; hour < 17; hour++) {
    // morning
    times.push({
      id: `${doctorId}-${date.toISOString()}-${hour}:00`,
      time: `${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`,
      available: Math.random() > 0.3, // randomly mark as unavailable
    });

    // afternoon (30 min intervals)
    times.push({
      id: `${doctorId}-${date.toISOString()}-${hour}:30`,
      time: `${hour}:30 ${hour < 12 ? 'AM' : 'PM'}`,
      available: Math.random() > 0.3,
    });
  }

  return times;
};
