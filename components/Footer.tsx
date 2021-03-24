import { ReactElement } from 'react';
import styles from 'styles/Home.module.css';


export function Footer(): ReactElement {
  return (
    <footer className={styles.footer}>
      <p>&copy; John Barhorst 2021</p>      
    </footer>
  );
}
