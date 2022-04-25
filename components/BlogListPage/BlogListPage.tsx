import Link from 'next/link';
import { PostMeta } from 'lib/posts';
import { ReactElement } from 'react';
import style from './BlogListPage.module.css';
import { motion } from 'framer-motion';

export function BlogListPage({ allPostsMeta }: { allPostsMeta: PostMeta[] }): ReactElement {
  return (
    <main className={style.main}>
      <section className={style.banner}>
        <h1>Blog!</h1>
        <p>I thought I&apos;d give blogging a whirl. I simply haven&apos;t had the time to finish these up yet. But if you want to check them out, feel free!</p>
      </section>
      <section className={style.blog_list} >
        {/* filtering out the bit I wrote up for BI. Doesn't really belong in the list. Should've made a separate page for it. */}
        {allPostsMeta.filter(({ title }) => title !== 'BI Worldwide').map(({ id, title, description }) => (
          <Link href={`/blog/${id}`} passHref key={id}>
            <motion.a
              className={style.blog_card}
              whileHover={{
                scale: 1.01
              }}
              whileFocus={{
                scale: 1.01
              }}
              whileTap={{
                scale: .95
              }}
            >
              <h3>{title}</h3>
              <p>{description}</p>
            </motion.a>
          </Link>
        ))}
      </section>
    </main>
  );
}
