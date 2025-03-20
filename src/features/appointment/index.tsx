'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';

import Step from '@/components/step';
import type { Doctor, Time, Appointment, Info } from '@/lib/types';

import { AppointmentType } from './appointment-type';
import { AppointmentDoctor } from './appointment-doctor';
import { AppointmentDateTime } from './appointment-date-time';
import { AppointmentInfo } from './appointment-info';
import { AppointmentReview } from './appointment-review';
import { AppointmentConfirmed } from './appointment-confirmed';

type FormAction =
  | { type: 'APPOINTMENT_TYPE'; payload: Appointment }
  | { type: 'DOCTOR'; payload: Doctor }
  | { type: 'DATE'; payload: Date }
  | { type: 'TIME'; payload: Time }
  | { type: 'INFO'; payload: Info }
  | { type: 'RESET' };

export type FormValues = {
  appointmentType: Appointment | null;
  doctor: Doctor | null;
  date: Date | null;
  time: Time | null;
  info: Info;
};

export type FormDispatch = {
  dispatch: React.ActionDispatch<[action: FormAction]>;
};

const initialState: FormValues = {
  appointmentType: null,
  doctor: null,
  date: null,
  time: null,
  info: {
    name: '',
    email: '',
    phone: '',
    age: '',
  },
};

function reducer(state: FormValues, action: FormAction): FormValues {
  if (action.type === 'APPOINTMENT_TYPE') {
    return {
      ...state,
      appointmentType: action.payload,
      doctor: null,
    };
  }

  if (action.type === 'DOCTOR') {
    return {
      ...state,
      doctor: action.payload,
    };
  }

  if (action.type === 'DATE') {
    return {
      ...state,
      date: action.payload,
      time: null,
    };
  }

  if (action.type === 'TIME') {
    return {
      ...state,
      time: action.payload,
    };
  }

  if (action.type === 'INFO') {
    return {
      ...state,
      info: {
        ...state.info,
        ...action.payload,
      },
    };
  }

  if (action.type === 'RESET') {
    return initialState;
  }

  return state;
}

export function AppointmentBooking() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const STEPS = {
    Type: (
      <AppointmentType
        appointmentType={state.appointmentType}
        dispatch={dispatch}
      />
    ),
    Doctor: (
      <AppointmentDoctor
        appointmentType={state.appointmentType}
        doctor={state.doctor}
        dispatch={dispatch}
      />
    ),
    Date: (
      <AppointmentDateTime
        doctor={state.doctor}
        time={state.time}
        date={state.date}
        dispatch={dispatch}
      />
    ),
    Info: <AppointmentInfo info={state.info} dispatch={dispatch} />,
    Review: <AppointmentReview values={state} />,
  };

  return (
    <div className='container mx-auto max-w-3xl p-4'>
      <Card className='w-full pt-9'>
        <CardContent className='flex min-h-[500px] flex-col'>
          <Step>
            <Step.NavigationList>
              {Object.keys(STEPS).map((title, index) => (
                <Step.Navigation key={index} title={title} />
              ))}
            </Step.NavigationList>
            <Step.PanelList>
              {Object.values(STEPS).map((step, index) => (
                <Step.Panel className='flex grow flex-col pt-10' key={index}>
                  {step}
                </Step.Panel>
              ))}
              <Step.Panel>
                <AppointmentConfirmed dispatch={dispatch} />
              </Step.Panel>
            </Step.PanelList>
          </Step>
        </CardContent>
      </Card>
    </div>
  );
}
