import { useState } from 'react';
import { ReactElement } from 'react';

interface Props {
  placeHolder?: string
}

export function TextInput({ placeHolder }: Props):ReactElement {
  const [value, setValue] = useState('');


  return (
    <input 
      type='text'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeHolder ? placeHolder : null}
    />
  );
}