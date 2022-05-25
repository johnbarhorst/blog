import React from 'react';
import { Form } from './Form';

import style from './DynamicFormPage.module.css';

export function DynamicFormPage():JSX.Element {
  return (
    <main className={style.main}>
      <Form />
    </main>
  );
}