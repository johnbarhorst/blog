import { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';

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

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={isCurrentPath(href, router.pathname) ? 'isActive' : null}>
      {children}
    </a>
  );
}