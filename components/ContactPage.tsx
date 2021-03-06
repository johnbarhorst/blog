import { ReactElement } from 'react';
import style from 'styles/Contact.module.css';
import { EmailLinkIcon, GithubLinkIcon, PhoneLinkIcon } from './Icons';

export function ContactPage():ReactElement {
  return (
    <main className={style.main}>
      <h2>Contact!</h2>
      <p>Thanks to the wonders of technology, you can get a hold of me in a variety of ways.</p>
      <ul>
        <li><EmailLinkIcon>&nbsp;johnbarhorst.dev@gmail.com</EmailLinkIcon></li>
        <li><PhoneLinkIcon>&nbsp;651-253-2911</PhoneLinkIcon></li>
        <li><GithubLinkIcon>&nbsp;github.com/johnbarhorst</GithubLinkIcon></li>
      </ul>
    </main>
  );
}

