import { useInput } from 'hooks/useInput';
import { FormEvent, ReactElement, useState } from 'react';
import style from 'styles/Form.module.css';

export function Form():ReactElement {
  const [name] = useInput();
  const [email] = useInput();
  const [password] = useInput();
  const [passwordMatch] = useInput();
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h2 className='text_center'>Sign up for this rad thing!</h2>
      <fieldset disabled={isLoading}>
        <div>
          <label htmlFor="name">Name
            <input type="text" {...name} />
          </label>
        </div>
        <div>
          <label htmlFor="email">Email
            <input type="email" {...email} />
          </label>
        </div>
        <div>
          <label htmlFor="password">Password
            <input type="password" {...password} />
          </label>
        </div>
        <div>
          <label htmlFor="passwordMatch">Confirm Password
            <input type="password" {...passwordMatch} />
          </label>
        </div>
        <div>
          <button type="submit">Sign Up!</button>
        </div>
      </fieldset>
    </form>
  );
}