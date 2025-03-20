'use client';

import * as React from 'react';
import { z } from 'zod';

type FieldErrors<T> = {
  [K in keyof T]?: string;
};

type FormState<T> = {
  values: T;
  errors: FieldErrors<T>;
  isSubmitting: boolean;
  isValid: boolean;
};

type FormOptions<T> = {
  initialValues: T;
  schema: z.ZodType<T>;
  onSubmit: (values: T) => Promise<void> | void;
};

export function useForm<T>({
  initialValues,
  schema,
  onSubmit,
}: FormOptions<T>) {
  const [formState, setFormState] = React.useState<FormState<T>>({
    values: initialValues,
    errors: {},
    isSubmitting: false,
    isValid: true,
  });

  const validateForm = React.useCallback(() => {
    try {
      schema.parse(formState.values);
      return { valid: true, errors: {} as FieldErrors<T> };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce((acc, curr) => {
          const key = curr.path[0] as keyof T;
          if (!acc[key]) {
            acc[key] = curr.message;
          }
          return acc;
        }, {} as FieldErrors<T>);
        return { valid: false, errors };
      }
      return { valid: false, errors: {} as FieldErrors<T> };
    }
  }, [schema, formState.values]);

  const handleChange = React.useCallback((name: keyof T, value: unknown) => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));
  }, []);

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const { valid, errors } = validateForm();

      setFormState((prev) => ({
        ...prev,
        isSubmitting: true,
        errors,
        isValid: valid,
      }));

      if (valid) {
        try {
          await onSubmit(formState.values);
        } catch (error) {
          console.error('Form submission error:', error);
        }
      }

      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
      }));
    },
    [formState.values, onSubmit, validateForm],
  );

  const reset = React.useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      isSubmitting: false,
      isValid: true,
    });
  }, [initialValues]);

  return {
    values: formState.values,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    handleChange,
    handleSubmit,
    reset,
  };
}
