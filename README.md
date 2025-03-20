# Appointment Booking

A modern, user-friendly appointment booking application built with Next.js and TypeScript.
This application provides a seamless experience for patients to book medical appointments online.

## Features

- **Multi-step Appointment Booking Process**

  - Appointment Type Selection
  - Doctor Selection
  - Date and Time Selection
  - Appointment Information Collection
  - Review and Confirmation
  - Appointment Confirmation

- **Modern UI/UX**

  - Clean and intuitive interface
  - Smooth transitions and animations

- **Technical Features**
  - Built with Next.js 15
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Schema validation with Zod
  - Custom `useForm` hook for form handling
    - Type-safe form state management
    - Automatic validation using Zod schemas
    - Error handling and display
    - Form submission handling
    - Form reset functionality
  - Custom `Step` component
    - Compound component pattern for flexible composition
    - Context-based state management
    - Type-safe step navigation
    - Reusable step components
    - Customizable step panels and navigation

## Getting Started

### Prerequisites

- Node.js v20.17.0 (recommended to use nvm for version management)
- pnpm (recommended) or npm
- nvm (Node Version Manager) - [Installation Guide](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mghdmi/booking.git
cd booking
```

2. Install and use the correct Node.js version:

```bash
# If you have nvm installed
nvm use

# Or install the specific version manually
nvm install 20.17.0
```

3. Install dependencies:

```bash
pnpm install
```

4. Start the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # Reusable UI components
│   └── step/         # Step form components
├── features/         # Feature-specific components
│   └── appointment/  # Appointment booking feature
├── hooks/            # Custom React hooks
│   └── use-form.ts   # Custom form handling hook with Zod validation
└── lib/              # Utility functions and configurations
```

## Form Handling

The application uses a custom `useForm` hook for handling form state and validation. Here's a quick example of how to use it:

```typescript
import { useForm } from '@/hooks/use-form';
import { z } from 'zod';

// Define your form schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  // ... other fields
});

// Use the hook in your component
const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm({
  initialValues: {
    name: '',
    email: '',
    // ... other initial values
  },
  schema: formSchema,
  onSubmit: async (values) => {
    // Handle form submission
    console.log(values);
  },
});
```

The hook provides:

- Type-safe form state management
- Automatic validation using Zod schemas
- Error handling and display
- Form submission handling
- Form reset functionality
- Loading state during submission

## Step Layout Implementation

The application uses a custom step component built with the compound component pattern for flexible multi-step forms. Here's how to use it:

```typescript
import { Step } from '@/components/step';

function MultiStepForm() {
  return (
    <Step>
      <Step.NavigationList>
        <Step.Navigation title="Step 1" />
        <Step.Navigation title="Step 2" />
        <Step.Navigation title="Step 3" />
      </Step.NavigationList>

      <Step.PanelList>
        <Step.Panel>
          {/* Step 1 content */}
        </Step.Panel>
        <Step.Panel>
          {/* Step 2 content */}
        </Step.Panel>
        <Step.Panel>
          {/* Step 3 content */}
        </Step.Panel>
      </Step.PanelList>
    </Step>
  );
}
```

The step form provides:

- Compound component pattern for flexible composition
- Context-based state management with `useStep` hook
- Type-safe step navigation
- Reusable step components
- Customizable step panels and navigation
- Built-in step state management
- Easy integration with form validation

You can access step controls in any child component using the `useStep` hook:

```typescript
function StepContent() {
  const { currentStep, nextStep, previousStep, reset } = useStep();

  return (
    <div>
      <p>Current step: {currentStep}</p>
      <button onClick={nextStep}>Next</button>
      <button onClick={previousStep}>Previous</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```
