import { ReactElement } from 'react';
import { FadeIn } from './FadeIn';

export function AboutMePage():ReactElement {
  return (
    <FadeIn>
      <main>
        <h1>More About Me.</h1>
        <p>It all started...</p>
      </main>
    </FadeIn>
  );
}