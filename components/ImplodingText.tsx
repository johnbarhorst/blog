import { motion } from 'framer-motion';
import { ReactElement } from 'react';

type Props = {
  string: string
}

export function ImplodingText({ string }: Props):ReactElement {

  function calcDirection(i: number, length: number): {x: number, y: number} {
    const direction = i >= length / 2 ? 1 : -1; 
    return {
      x: ((i + 1) * 10) * direction,
      y: -45
    };
  }
  return (
    <>
      {string.split('').map((char, i) => {
        
        return (
          <motion.span
            style={{
              // Spaces squish together when inline-block. But need inline-block to animate positionally.
              display: char === ' ' ? 'inline' : 'inline-block',
            }}
            key={i + char}
            initial={calcDirection(i, string.length)}
            animate={{
              x:0,
              y:0,
              transition: {
                duration: 1
              }
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </>
  );
}