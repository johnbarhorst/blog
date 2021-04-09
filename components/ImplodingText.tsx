import { motion } from 'framer-motion';
import { ReactElement } from 'react';

type Props = {
  string: string
}

const variants = {
  initial: ({ length, direction }: {length: number, direction: number}) => ({
    x: ((length + 1) * 10) * direction,
    y: -45
  }),
  animate: {
    x:0,
    y:0,
    transition: {
      duration: 1
    }
  }
};

export function ImplodingText({ string }: Props):ReactElement {

  return (
    <>
      {string.split('').map((char, i) => {
        
        return (
          <motion.span
            style={{
              display: 'inline-block',
              whiteSpace: 'pre-wrap'
            }}
            key={i + char}
            custom={{
              direction: i >= string.length / 2 ? 1 : -1,
              length: i
            }}
            variants={variants}
            initial='initial'
            animate='animate'
          >
            {char}
          </motion.span>
        );
      })}
    </>
  );
}