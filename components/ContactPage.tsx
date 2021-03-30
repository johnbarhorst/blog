import { ReactElement } from 'react';
import { FadeIn } from './FadeIn';



export function ContactPage():ReactElement {
  return (
    <FadeIn>
      <main>
        <h1>Contact!</h1>
        <p>Thanks to the wonders of technology, you can get a hold of me in a variety of ways.</p>
        <ul>
          <li>Email</li>
          <li>Phone</li>
          <li>Contact Form</li>
        </ul>
      </main>
    </FadeIn>
  );
}