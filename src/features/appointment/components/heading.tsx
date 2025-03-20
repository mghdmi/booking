import * as React from 'react';

type HeadingProps = {
  title: string;
  description: React.ReactNode;
};

export function Heading({ title, description }: HeadingProps) {
  return (
    <header className='mb-6 text-center'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <p className='text-muted-foreground mt-1'>{description}</p>
    </header>
  );
}
