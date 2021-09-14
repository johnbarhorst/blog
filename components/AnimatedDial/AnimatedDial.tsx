import { motion, PanInfo } from 'framer-motion';
import { ReactElement, useState } from 'react';
import style from './AnimatedDial.module.css';

export function AnimatedDial():ReactElement {
  const [value, setValue] = useState(0);
  
  function onPan(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo):void {
    console.log(info.offset);
  }


  return (
    <motion.div 
      className={style.dial}
      onPan={onPan}  
    >
      <motion.div
        className={style.innerDial}
      >
        {value}
      </motion.div>
    </motion.div>
  );
}