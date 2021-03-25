import { ReactElement } from 'react';
import styles from 'styles/Footer.module.css';


export function Footer(): ReactElement {
  return (
    <footer className={styles.footer}>
      <p>&copy; John Barhorst 2021</p>      
    </footer>
  );
}
