import { MouseEvent, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

type Props = {
  href: string,
  text: string
}

const anchorVariants = {
  animate: ({ isActive }) => ({
    color: isActive ? 'var(--teal)' : 'var(--link)',
    transition: {
      duration: .5
    }
  }),
  hover: {
    y: -3
  }
};

export function ActiveLink({ href, text }: Props):ReactElement {
  const router = useRouter();

  const isCurrentPath = (href: string, pathname: string) => {
    // This feels a little redundant. But it fixed a few weird bugs.
    if (href === '/' && pathname === '/') return true;
    if (href !== '/') return pathname.includes(href);
    return false;
  };

  const isActive = isCurrentPath(href, router.pathname);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      custom={{ isActive }}
      variants={anchorVariants}
      initial={false}
      animate='animate'
      whileHover='hover'
    >
      {text.split('').map((char, i) => (
        <motion.span
          style={{
            display: 'inline-block',
            whiteSpace: 'pre-wrap',
          }}
          key={char + i}
          
        >
          {char}
        </motion.span>))}
    </motion.a>
  );
}