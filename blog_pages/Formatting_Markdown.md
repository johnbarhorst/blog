---
title: 'Learning to Write and Format Markdown'
description: 'How I started learning to become the amazing and influential blogger I am today.'
---

## Learning How to Write and Format Markdown

One piece of advice I've heard repeated many times while learning web development, is that blogging is a great way to showcase your skills. Not only that, but it also helps prove to prospective employers that you know your stuff and you're able to communicate it.

Personally, writing about coding has never seemed as appealing as actually writing code, but I'm going to give this a shot. It'll probably end up being a lot like those recipe pages. Not so much about how my grandmother used to make the best code, and memories of how the smells of it would fill her home. But just as much "Yeah, I get it! Get to the point!"

I don't know much about actually writing blogs. I have a tendency to pour over even the smallest things I write, trying to perfect the wording and order. It immediately turns into a painstaking process, and takes way longer than it should.

### The Process

#### First order of business, write faster. "Move fast, break things", as they say

Starting with the Animated Dial, I've been taking notes during the whole process. From the start to completion, I want to include all the missteps and the things I've learned. There's a million blogs out there cutting to the chase, showing the completed code and how to do it. While I feel like that's where the market is, because most people (myself included) just want answers, those blogs don't show the reality behind development.

During all my early self directed learning, I'd watch videos and read blogs where the author just seemed to know exactly what to do every step of the way. While that can be the case when you're building something you've built before, most of the real projects I've undertaken have been filled with backtracking, becoming stumped and reading over documentation, refactors and complete restarts. That's the stuff I want to capture. I don't really think many will read it, but hopefully it shines some light on the real experience for someone, somewhere.

#### Second order of business, format and display those fast things I wrote

I'm writing this blog post on learning to write and format markdown, while writing and formatting the markdown for my blog ["Building an Interactive Animated Dial"](/blog/Animated_Dial).

To get going on rendering this markdown, I of course, looked up one of those blogs/courses that showed me exactly what to do. Since I've been working with [Next.js](https://nextjs.org) a lot lately, I've run across this [Dynamic Routes](https://nextjs.org/learn/basics/dynamic-routes) lesson from their docs a number of times. It shows how to get up and running using [Remark](https://www.npmjs.com/package/remark) to parse the markdown files, and then generate statically generated pages with that data.

After first writing some markdown based blogs, the next step is to get a list of all the blogs in the directory.

```ts
// lib/posts.ts
import fs from 'fs';
import path from 'path';
// GET A LIST OF ALL BLOGS (each markdown file in the directory)

// path to directory containing the blogs
const postsDirectory = path.join(process.cwd(), 'blog_pages');
// array of each file name in '../blog_pages', with the file extension still on it.
const fileNames = fs.readdirSync(postsDirectory);

// remove the .md from each string in the array, and send to getStaticPaths() in the 
// dynamic route page './pages/blog/[id].tsx' to generate a page for each blog post.
// Whenever I write a new blog, this will automatically add another path at build time.
export function getAllPostIds(): {params:{id:string}}[] {
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    };
  });
}
```

This part was pretty straight forward to adapt from the Next.js docs. The only real changes I had to make were the directory path and adding the TypeScript types.

Then in `'./pages/blog/[id].tsx'` we can give Next our array of paths, and Next will use that to fetch data serverside, and statically generate all our pages ahead of time.

```ts
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
};
```

I'm not thrilled with using an arrow function here. I have nothing against using arrow functions, mind you, they used to be my primary way of writing functions. Lately though, I've been moving back to function declarations, and nearly every other function in this project is a function declaration. I'm also learning TypeScript while I work on this site, however, and I was having a rough go of figuring out how to apply the type of `GetStaticPaths` to this thing as a function declaration. It is still something I want to figure out. There's obviously something about how typing functions works that hasn't clicked for me yet. Rather than bang my head against the wall, I opted to use an arrow function for now and keep on building.

Things to note:

- The Next.js functions `getStaticPaths()`, `getStaticProps()`, and `getServerSideProps()` can only work on a 'page' file in Next. That is to say a file in the './pages' directory, which is how Next knows that file is a valid route. These functions get exported from the page file, and are compiled (transpiled? I still don't totally get these things) as serverside code. You can't throw one of these functions into a separate component file, hoping to make some statically generated components. It doesn't work that way.

- The `getStaticPaths()` function is used to create a list of possible routes within a dynamic route. Then at build time, Next takes those routes, uses the parameters to fetch the required data, and builds each page into a static html file. You could then still go off and fetch dynamic data on each page if you had to, using `useEffect()` or a library like [SWR](https://swr.vercel.app/), but that's not what I'm up to here.

- I set `fallback: false` to ensure any requests to an invalid '/blog' path will result in a 404 page being served. Which reminds me, I need to create a custom 404 page.

- There are `fallback: true` and `fallback: blocking` options if I were ever in a situation where I wanted to be able to add blog pages without rebuilding the whole site. But since this is deployed on Vercel, and every push to production triggers a full build anyway, this is completely unneccesary at the moment.

- Either way, you need to include one of those fallback settings.

#### Implementing react-markdown

There are a lot of options when it comes to choosing a library to render markdown. Using just the previous set up with Remark, I could process the markdown file into HTML and feed it into a jsx element using `_dangerouslySetInnerHTML`. I realize that `_dangerouslySetInnerHTML` isn't always bad, but it being named as a warning makes me want to avoid it. I guess that's the whole point.

My initial plan was to use [mdx](https://v2.mdxjs.com/docs/getting-started/). However there's a warning banner on the top of the page saying that the docs are for an upcoming release of mdx, not for what's out now. Rather than wrestle with the version/documentation discrepencies, I opted to try out [react-markdown](https://www.npmjs.com/package/react-markdown).

React-markdown not only works well with Remark, but it even talks about the whole `_dangerouslySetInnerHTML` thing right there in the sales pitch. Seems like these folks are on the same page that I am.

After installing react-markdown, I ran immediately into a hurdle. It turns out that the current version of react-markdown is an ES Module only package, and it does not want to play nice with Nexts compiling. I thought that was ok since I'm using `import ReactMarkdown from 'react-markdown';`, and not `const react-markdown = require(react-markdown);`, it still causes the following error in my terminal:

```none
Error: Must use import to load ES Module: .../blog/node_modules/react-markdown/index.js
require() of ES modules is not supported.
```

My first thought is that once Next compiles the code, all `import` declarations must get swapped out for `require()`.

According to this issue on [github](https://github.com/vercel/next.js/issues/25454), the problem stems from Next not yet fully supporting ES Modules. There are some solutions in here to try out, but a lot of them feel hacky and potentially error prone. Another possible route for me here is to [enable experimental ESM support in NextJS](https://nextjs.org/blog/next-11-1#es-modules-support). I chose to give that a whirl, since in Next 12 ESM support will be the default.

I was able to upgrade from Next 10.2.3 to 11.1.2 without any issues. I then enabled experimental ESM support with a `next.js.config` file in my root directory.

```js
//next.config.js
module.exports = {
  // Prefer loading of ES Modules over CommonJS
  experimental: { esmExternals: true }
};
```

Running the dev environment now does create a warning:

```none
warn  - ./node_modules/power-assert-formatter/lib/create.js
Critical dependency: the request of a dependency is an expression
```

However after researching this warning, it doesn't appear to be anything I need to be concerned with.

Now react-markdown loads up, and everything seems to be working splendidly. Once Next v12 is available, I'll hopefully be able to upgrade into a stable version of ESM support. I probably wouldn't do something like this in a full blown production site, unless I fully understood the ramifications. But situations like this is what I want to use this project for. Trying things out, seeing what works and what breaks.

#### Rendering the markdown and Generating Links

With react-markdown properly installed, I now need to make a component to render the files to a page. I can also generate links directly to each blog page by parsing the files in `./blog_posts`.

First, using the lessons learned in the Next docs, I parse meta data from the blogs themselves using gray-matter:

```ts
// ./lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


// path to directory containing the blogs
const postsDirectory = path.join(process.cwd(), 'blog_pages');
// array of each file name in './blog_pages', with the file extension still on it.
const fileNames = fs.readdirSync(postsDirectory);


export function getPosts(): PostMeta[] {
  const allPostsMeta = fileNames.map(fileName => {
    // create the id by stripping '.md' off each file name in './blog_pages'.
    const id = fileName.replace(/\.md$/, '');
    // create a string of the full path with current working directory + 'blog_pages' + fileName.
    const fullPath = path.join(postsDirectory, fileName);
    // parse the file itself into a string with gray-matter.
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      description: matterResult.data.description
    };
  });

  return allPostsMeta;
}
```

I already have `./pages/blog/[id].js` partially set up with the `getStaticPaths()` function. Fleshing that out further, I can prefetch all the blog content to be rendered by react-markdown.

```tsx
import { BlogPage } from 'components/BlogPage';
import { getAllPostIds, getPostData, PostMeta } from 'lib/posts';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ReactElement } from 'react';


export default function BlogPost({ postData }: {postData: PostMeta}):ReactElement {
  const { content } = postData;
  
  return <BlogPage content={content} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if(typeof(params.id) === 'string') {
    const postData = getPostData(params.id);
    return {
      props: {
        postData
      }
    };
  }
  throw new Error(`id paramater must be a string, instead got ${typeof(params.id)}`);
};
```

Trying out react-syntax-highlighter as my code formatting option. Using the example, I came up with this:

```tsx
import { getAllPostIds, getPostData, PostMeta } from 'lib/posts';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';

export default function BlogPost({ postData }: {postData: PostMeta}):ReactElement {
  const { content } = postData;
  
  return (
    <main>
      <ReactMarkdown
        components={{
          code({ inline, className, children, ...props }): SyntaxHighlighterProps {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={darcula}
                language={match[1]}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      >{content}</ReactMarkdown>
    </main>
  );
}
```

Unfortunately I immediately ran into the following error in my terminal.

```none
error - /Users/johnbarhorst/Projects/blog/node_modules/react-syntax-highlighter/dist/esm/styles/prism/index.js:1
export { default as darcula } from './darcula';
^^^^^^
SyntaxError: Unexpected token 'export'
```

After a few dead end searches, I came across this in the experimental esm support thread

kimbaudi
26 days ago
> @Henzelix - your issue can be resolved by changing your import statement from react-syntax-highlighter/dist/esm/styles/prism to react-syntax-highlighter/dist/cjs/styles/prism. please take a look at react-syntax-highlighter/react-syntax-highlighter#230 and possibly remarkjs/react-markdown#645.

Seems odd to me that changing from the explicit ESM version to the CommonJS version fixed the issue, considering that I'm using the ESM version of Next now. But maybe that's just part of the 'experimental' journey.

Struggled with finding the typescript types for SyntaxHighlighter. Looked it up on Github and found them [here](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-syntax-highlighter/index.d.ts).

Wasn't super happy with any of the themes for code formatting I've found so far. Looked into creating one myself, based on my prefered VSCode theme [Perfect-Dark](https://marketplace.visualstudio.com/items?itemName=richardmarks.vscode-perfect-dark-color-theme). This is turning out to be a rabbit hole though. Definitely something I want to come back to. Maybe even design my own theme from scratch. However for now I should get more productive things done.

There seems to be some issues with the styling/display on any rendered blog page. My nav menu, all the text, everything is appearing much smaller than on other pages when in mobile testing view on chrome. This is despite the fact that the base styles and font size are the same as everywhere else.

I've poured through all the styles on the page. None of the elements generated by the ReactMarkdown component have any styling applied whatsoever. Even looked up the `<main>` tag on [w3schools](https://www.w3schools.com/cssref/css_default_values.asp) to double check that it doesn't have something default going on. It literally has nothing going on.

Level Up Tutorials has a nice and helpful community. I shared my woes there and they saw the same problem. While I learned that applying `overflow-x: hidden;` fixes the issue, I am no closer to discovering the root cause.

I've tried removing react-syntax-highlighter, still get the same problem. Replaced the ReactMarkdown component with a bunch of lorem ipsum, and had no issues. So it lies somewhere within the ReactMarkdown component. For now, I'm going to take the quick fix of `overflow-x: hidden;`, and if I ever figure it out, I'll come back to this.

With that figured out it's time to throw back in the syntax highlighting! Reintroducing syntax highlighting has finally shown me where the layout issues where coming from. My code blocks are wrapped in `<pre>` tags, so all the white space is getting preserved. This is causing the page to spread out horizontally. Or, with the `overflow-x: hidden;` applied, means that not all my code shows up on the page. Using the `<SyntaxHighlighter>` component, these code blocks get wrapped in additional `<pre>` tags with some css sauce and get horizontal scroll now instead.

Digging into some styling of the blog itself now. Starting off with mobile of course. First and foremost, the font I'm using on the rest of my site is not very good for readability when there's that much text. I'm not going to try and reinvent the blog wheel just yet, so I went with the ever popular Roboto from Google fonts.

I tried a few different ways of displaying error messages. First I thought to use block quotes, but I didn't feel like they stood out like I wanted them to. I dug through all the supported languages that Prism offers, and thought Python was going to be the best bet without writing all the styles myself. But then I found out you can actually specify 'none' as the language. This gives all the formatting and background without any key words or phrases getting weirdly highlighted.

Got myself a linter! [markdownlint by David Anson](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint).
