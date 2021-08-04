import { ReactElement, useEffect, useState } from 'react';
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

const rotatingTitles = [
  'Web Developer',
  'Dog Dad',
  'Hearthstone Player',
  'React Developer'
];

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

const wrapNumber = (min:number, max:number, num:number): number => {
  const rangeSize = max - min;
  return ((((num - min) % rangeSize) + rangeSize) % rangeSize) + min;
};


export function HomePage(): ReactElement {
  const [techArray, setTechArray] = useState(initTechArray);
  const [dabbleArray, setDabbleArray] = useState(initDabbleArray);
  const [rotatingTitle, setRotatingTitle] = useState(0);

  useEffect(() => {
    const changeTitle = setTimeout(() => {
      setRotatingTitle(prev => wrapNumber(0, rotatingTitles.length - 1, prev));
    }, 3000);
    return () => {
      clearTimeout(changeTitle);
    };
  }, [rotatingTitle]);

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
    <main className={style.main}>
      <section className={style.hero}>
        <div className={style.banner}>
          <h2>John Barhorst</h2><span>|</span><motion.h3>{rotatingTitles[rotatingTitle]}</motion.h3>
        </div>
      </section>
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
  );
}


