import { ReactElement } from 'react';
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

export function HomePage(): ReactElement {
  return (
    <FadeIn>
      <main className={style.main}>
        <h3>John Barhorst</h3>
        <p>Hi! I&apos;m John, a web developer in Minneapolis, MN.</p>
        <p>I build fast, responsive, and accessible websites and apps in exchange for money.</p>
        <div className={style.wrapper}>
          <section>
            <h4>My main tech</h4>
            <motion.ul
              variants={variants}
              initial='initial'
              animate='animate'
            >
              <motion.li
                variants={itemVariants}
              >React.js</motion.li>
              <motion.li
                variants={itemVariants}
              >Next.js</motion.li>
              <motion.li
                variants={itemVariants}
              >Node/Express</motion.li>
              <motion.li
                variants={itemVariants}
              >Mongoose/MongoDB</motion.li>
              <motion.li
                variants={itemVariants}
              >Framer Motion</motion.li>
              <motion.li
                variants={itemVariants}
              >Styled Components</motion.li>
            </motion.ul>
          </section>
          <section>
            <h4>I like to dabble in</h4>
            <motion.ul
              variants={variants}
              initial='initial'
              animate='animate'
            >
              <motion.li
                variants={itemVariants}
              >Svelte</motion.li>
              <motion.li
                variants={itemVariants}
              >TypeScript</motion.li>
              <motion.li
                variants={itemVariants}
              >Sass</motion.li>
            </motion.ul>
          </section>
        </div>
      </main>
    </FadeIn>
  );
}


