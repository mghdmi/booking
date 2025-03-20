export type Appointment = 'dentist' | 'checkup' | 'eye';

export type Doctor = {
  id: string;
  name: string;
  specialty: Appointment;
};

export type Time = {
  id: string;
  time: string;
  available: boolean;
};

export type Info = {
  name: string;
  email: string;
  phone: string;
  age: string;
};
