import { Dispatch, SetStateAction, useState } from 'react';

type ToggleHook = {
  isToggled: boolean,
  setToggle: Dispatch<SetStateAction<boolean>>,
  toggle: () => void
}

export default function useToggle(initial: boolean): ToggleHook {
  const [isToggled, setToggle] = useState(initial);
  const toggle = () => setToggle(prev => !prev);
  return { isToggled, setToggle, toggle };
}
