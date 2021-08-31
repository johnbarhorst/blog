import { useInput } from 'hooks/useInput';
import { ReactElement } from 'react';

export function Form():ReactElement {
  const [name, resetName] = useInput();
  return (
    <form>
      <fieldset>
        <label htmlFor="name">Name:
          <input type="text" {...name} />
        </label>
      </fieldset>
    </form>
  );
}