import { ReactElement } from 'react';
import styles from './Footer.module.css';
import { EmailLinkIcon, GithubLinkIcon, PhoneLinkIcon } from 'components/Icons';


export function Footer(): ReactElement {
  return (
    <footer className={styles.footer}>
      <p>&copy; John Barhorst 2021</p>
      <p><EmailLinkIcon/> <PhoneLinkIcon /> <GithubLinkIcon /></p>     
    </footer>
  );
}
