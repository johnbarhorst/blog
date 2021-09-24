import { AnimatedDial } from 'components/AnimatedDial';
import { motion, Variants } from 'framer-motion';
import { ReactElement, useState } from 'react';
import style from './StyledDial.module.css';

export function StyledDial():ReactElement {
  const [value, setValue] = useState(0);
  const [sensitivity, setSensitivity] = useState(.75);

  function handleClockwise() {
    setValue(prev => prev + sensitivity * 100);
  }

  function handleCounterClockwise() {
    setValue(prev => prev - sensitivity * 100);
  }

  return (
    <div className={style.wrapper}>
      <AnimatedDial 
        handleClockwise={handleClockwise}
        handleCounterClockwise={handleCounterClockwise}
        sensitivity={sensitivity}
      >
        <motion.div
          className={style.dialEdge}
          custom={value}
          animate='animate'
          variants={dialVariants}
        >
        </motion.div>
      </AnimatedDial>
    </div>
  );
}

const dialVariants:Variants = {
  animate: (value) => ({
    rotate: value,

  })
};