import { ReactElement } from 'react';
import { FadeIn } from './FadeIn';

export function AboutMePage():ReactElement {
  return (
    <FadeIn>
      <main>
        <h2>More About Me.</h2>
        <p>It all started...</p>
      </main>
    </FadeIn>
  );
}