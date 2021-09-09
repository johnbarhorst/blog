import { ReactElement } from 'react';
import { Form } from 'components/Form';

export function FormPage():ReactElement {
  return (
    <main>
      <h1 className='text_center' >A Form of Fun</h1>
      <section>
        <Form />
      </section>
    </main>
  );
}