import { ReactElement } from 'react';
import style from './Contact.module.css';
import { EmailLinkIcon, GithubLinkIcon, PhoneLinkIcon } from 'components/Icons';

export function ContactPage():ReactElement {
  return (
    <main className={style.main}>
      <h1 className='text_center'>Contact!</h1>
      <p>Thanks to the wonders of technology, you can get a hold of me in a variety of ways.</p>
      <ul>
        <li><EmailLinkIcon>&nbsp;john@johnbarhorst.com</EmailLinkIcon></li>
        <li><PhoneLinkIcon>&nbsp;651-253-2911</PhoneLinkIcon></li>
        <li><GithubLinkIcon>&nbsp;github.com/johnbarhorst</GithubLinkIcon></li>
      </ul>
    </main>
  );
}

