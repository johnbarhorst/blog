import { MouseEvent, ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import style from 'styles/ActiveLink.module.css';

type Props = {
  href: string,
  children: ReactNode
}

export function ActiveLink({ href, children }: Props):ReactElement {
  const router = useRouter();

  const isCurrentPath = (href: string, pathname: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/') return pathname.includes(href);
    return false;
  };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <motion.a 
      href={href}
      onClick={handleClick}
      className={isCurrentPath(href, router.pathname) ? style.isActive : null}
      whileHover={{
        scale: 1.1
      }}
    >
      {children}
    </motion.a>
  );
}