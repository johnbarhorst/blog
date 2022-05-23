import { motion } from 'framer-motion';
import { ReactElement, ReactNode } from 'react';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import style from './Icons.module.css';


export function EmailLinkIcon({ children }: {children?: ReactNode}):ReactElement {
  return (
    <motion.a
      href='mailto:john@johnbarhorst.com'
      whileHover={{ scale: 1.2 }}
      className={style.anchor}
    >
      <HiOutlineMail className={style.icon} />
      {children}
    </motion.a>
  );
}

export function PhoneLinkIcon({ children }: {children?: ReactNode}):ReactElement {
  return (
    <motion.a
      href="tel:1-651-253-2911"
      whileHover={{ scale: 1.2 }}
      className={style.anchor}
    >
      <HiOutlinePhone className={style.icon} />
      {children}
    </motion.a>
  );
}
export function GithubLinkIcon({ children }: {children?: ReactNode}):ReactElement {
  return (
    <motion.a
      href='https://github.com/johnbarhorst'
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      className={style.anchor}
    >
      <img src='/icons/GitHub-Mark-Light-32px.png' className={style.icon} />
      {children}
    </motion.a>
  );
}