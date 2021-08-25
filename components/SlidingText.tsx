import { AnimatePresence, motion } from 'framer-motion';
import { ReactElement, useEffect, useState } from 'react';

type Props = {
  textArray: string[]
}

const wrapNumber = (min:number, max:number, num:number): number => {
  const rangeSize = max - min;
  return ((((num - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function SlidingText({ textArray }: Props):ReactElement {
  const [rotatingTitle, setRotatingTitle] = useState(0);

  useEffect(() => {
    const changeTitle = setTimeout(() => {
      setRotatingTitle(prev => wrapNumber(0, textArray.length, prev + 1));
    }, 5000);
    return () => {
      clearTimeout(changeTitle);
    };
  });

  return (
    <div style={{ overflow: 'hidden' }}>
      <AnimatePresence exitBeforeEnter>
        {textArray
          .filter((_, i) => i === rotatingTitle)
          .map((text, i) => 
            <motion.h4
              key={i + text}
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x:-300, opacity: 0 }}
            >{text}</motion.h4>
          )
        }
      </AnimatePresence>
    </div>
  );
}