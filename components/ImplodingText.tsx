import { motion } from 'framer-motion';
import { ReactElement } from 'react';

type Props = {
  string: string
}

type CustomProps = {
  index: number,
  direction: 1 | -1,
  length: number
}

const variants = {
  // This doesn't seem to actually get checked anywhere :(
  initial: ({ index, direction, length }: CustomProps) => ({
    x: ((index + 1) * 5) * direction,
    // TODO: I want this to be a larger number the closer to the middle it is.
    // Seems to take math. 
    y: -10
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
              index: i,
              length: string.length
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