import { ReactElement, ReactNode } from 'react';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import style from './Icons.module.css';


export function EmailLinkIcon({ children }: {children?: ReactNode}):ReactElement {
  return (
    <a href='mailto:john@johnbarhorst.com'><HiOutlineMail className={style.icon} />{children}</a>
  );
}

export function PhoneLinkIcon({ children }: {children?: ReactNode}):ReactElement {
  return (
    <a href="tel:1-651-253-2911"><HiOutlinePhone className={style.icon} />{children}</a>
  );
}
export function GithubLinkIcon({ children }: {children?: ReactNode}):ReactElement {
  return (
    <a href='https://github.com/johnbarhorst' target="_blank" rel="noopener noreferrer"><img src='/icons/GitHub-Mark-Light-32px.png' className={style.icon} />{children}</a>
  );
}