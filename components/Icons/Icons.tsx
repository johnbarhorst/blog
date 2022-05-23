import { motion } from 'framer-motion';
import { ReactElement, ReactNode } from 'react';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { GoMarkGithub } from 'react-icons/go';
import style from './Icons.module.css';


export function EmailLinkIcon({ children }: {children?: ReactNode}):ReactElement {
  return (
    <motion.a
      href='mailto:john@johnbarhorst.com'
      whileHover={{ scale: 1.2 }}
      className={style.anchor}
      title='email'
    >
      <HiOutlineMail className={style.icon} />
      <span className="sr_only">email me</span>
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
      title='call'
    >
      <HiOutlinePhone className={style.icon} />
      <span className="sr_only">call me</span>
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
      title='github'
    >
      <GoMarkGithub className={style.icon} />
      <span className="sr_only">Github (opens in new tab)</span>
      {children}
    </motion.a>
  );
}