import { AnimatedDial } from 'components/AnimatedDial';
import { motion } from 'framer-motion';
import { ReactElement, useState } from 'react';

export function StyledDial():ReactElement {
  const [value, setValue] = useState(0);
  const [sensitivity, setSensitivity] = useState(.75);

  function handleClockwise() {
    setValue(prev => prev + 1);
  }

  function handleCounterClockwise() {
    setValue(prev => prev - 1);
  }

  return (
    <AnimatedDial 
      handleClockwise={handleClockwise}
      handleCounterClockwise={handleCounterClockwise}
      sensitivity={sensitivity}
    >
      <motion.div>
        {value}
      </motion.div>
    </AnimatedDial>
  );
}