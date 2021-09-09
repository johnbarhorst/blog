import { FormEvent, useState } from 'react';

type Controls = [{
  value: string,
  onChange: (e:FormEvent<HTMLInputElement>) => void
},
  () => void
]

export function useInput(initialValue = ''): Controls {
  const [value, setValue] = useState(initialValue);
  // return an array, first value being an object with the controls, second being an input reset function.
  return [
    {
      value,
      onChange: e => setValue(e.currentTarget.value)
    },
    () => setValue(initialValue)
  ];

}