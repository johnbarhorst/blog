import { ReactElement } from 'react';
import { HiOutlinePhone, HiOutlineMail } from 'react-icons/hi';
import style from 'styles/Contact.module.css';

export function ContactPage():ReactElement {
  return (
    <main className={style.main}>
      <h2>Contact!</h2>
      <p>Thanks to the wonders of technology, you can get a hold of me in a variety of ways.</p>
      <ul>
        <li><a href='mailto:johnbarhorst.dev@gmail.com'><HiOutlineMail className={style.icon} />  johnbarhorst.dev@gmail.com</a></li>
        <li><a href="tel:1-651-253-2911"><HiOutlinePhone className={style.icon} />  651-253-2911</a></li>
        <li><a href='https://github.com/johnbarhorst' target="_blank" rel="noopener noreferrer"><img src='/icons/GitHub-Mark-Light-32px.png' className={style.icon} /> github.com/johnbarhorst</a></li>
      </ul>
    </main>
  );
}

