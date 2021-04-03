import { ReactElement, useState } from 'react';
import { FadeIn } from './FadeIn';
import style from 'styles/Home.module.css';
import { motion } from 'framer-motion';

const variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      delay: .3,
      staggerChildren: .2
    }
  },
  exit: {
    opacity: 0
  }
};

const itemVariants = {
  initial: { y: 50, opacity: 0 },
  animate: { y:0, opacity: 1 }
};

const initTechArray = [
  'React.js', 
  'Next.js',
  'Node/Express',
  'Mongoose/MongoDB',
  'Framer Motion',
  'Styled Components'
];

const initDabbleArray = [
  'GraphQL',
  'TypeScript',
  'Svelte',
  'Sass'
];


export function HomePage(): ReactElement {
  const [techArray, setTechArray] = useState(initTechArray);
  const [dabbleArray, setDabbleArray] = useState(initDabbleArray);

  function shuffle(arr: string[]): string[] {
    const newArr = [...arr];
    let currentIndex = newArr.length;
    let tempValue: string, randomIndex: number;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      tempValue = newArr[currentIndex];
      newArr[currentIndex] = newArr[randomIndex];
      newArr[randomIndex] = tempValue;
    }
    return newArr;
  }

  function shuffleTech() {
    setTechArray(prev => shuffle(prev));
  }

  function shuffleDabble() {
    setDabbleArray(prev => shuffle(prev));
  }

  return (
    <FadeIn>
      <main className={style.main}>
        <h3>John Barhorst</h3>
        <p>Hi! I&apos;m John, a web developer in Minneapolis, MN.</p>
        <p>I build fast, responsive, and accessible websites and apps in exchange for money.</p>
        <div className={style.wrapper}>
          <section>
            <h4>My main tech</h4>
            <button
              type="button"
              className={style.shuffleButton}
              onClick={shuffleTech} 
            >
              <motion.ul
                variants={variants}
                initial='initial'
                animate='animate'
                layout
              >
                {techArray.map(item => (
                  <motion.li 
                    variants={itemVariants}
                    key={item}
                    layoutId={item}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </button>
          </section>
          <section>
            <h4>I like to dabble in</h4>
            <button
              type="button"
              className={style.shuffleButton}
              onClick={shuffleDabble}
            >
              <motion.ul
                variants={variants}
                initial='initial'
                animate='animate'
                layout
              >
                {dabbleArray.map(item => (
                  <motion.li 
                    variants={itemVariants}
                    key={item}
                    layoutId={item}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </button>
          </section>
        </div>
      </main>
    </FadeIn>
  );
}


