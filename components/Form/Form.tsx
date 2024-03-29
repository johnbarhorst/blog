import { useInput } from 'hooks/useInput';
import { FormEvent, ReactElement, useEffect, useState } from 'react';
import style from './Form.module.css';

export function Form():ReactElement {
  const [name] = useInput();
  const [email] = useInput();
  const [password] = useInput();
  const [passwordMatch] = useInput();
  const [pwIsMatching, setPWisMatching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if(password.value === passwordMatch.value) {
      return setPWisMatching(true);
    }
    setPWisMatching(false);
  }, [password, passwordMatch]);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h2 className='text_center'>Sign up for this rad thing!</h2>
      <fieldset disabled={isLoading}>
        <div>
          <label htmlFor="name">Name
            <span><input type="text" {...name} /></span>
          </label>
        </div>
        <div>
          <label htmlFor="email">Email
            <span><input type="email" {...email} /></span>
          </label>
        </div>
        <div>
          <label htmlFor="password">Password
            <span><input type="password" {...password} /></span>
          </label>
        </div>
        <div>
          {!pwIsMatching && <span>Password Doesn&apos;t match!</span>}
          <label htmlFor="passwordMatch">Confirm Password
            <span><input type="password" {...passwordMatch} /></span>
          </label>
        </div>
        <div>
          <button type="submit">Sign Up!</button>
        </div>
      </fieldset>
    </form>
  );
}