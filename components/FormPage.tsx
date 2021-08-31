import { ReactElement } from 'react';
import { Form } from './Form';

export function FormPage():ReactElement {
  return (
    <main>
      <h1>Form for Fun!</h1>
      <section>
        <Form />
      </section>
    </main>
  );
}