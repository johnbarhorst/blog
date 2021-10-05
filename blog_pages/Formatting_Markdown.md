---
title: 'Learning to Write and Format Markdown'
description: 'How I started learning to become the amazing and influential blogger I am today.'
---
# The Idea
One piece of advice I've heard repeated many times while learning web development, is that blogging is a great way to showcase your skills. Not only that, but it helps prove to prospective employers that you know your stuff and you're able to communicate it. Personally, writing about coding has never seemed as appealing as actually coding, but I'm going to give this a shot and see where it goes.

I don't know much about actually writing blogs. I have a tendency to pour over even the smallest things I write, trying to perfect the wording and order. It immediately turns into a painstaking process, and takes way longer than it should. 

### The Process

First order of business, write faster. "Move fast, break things", as they say.

Starting with the Animated Dial, I've been taking notes along the entire path. From the start to completion. I want to include all the missteps, the things I've learned, all of it. There's a million blogs out there cutting to the chase, showing the completed code and how to do it. While I feel like that's where the market is, because people (myself included) just want answers, I can't help but think it doesn't show the reality behind development.

During all my early self directed learnings, I'd watch videos and read pieces where the author just seemed to know exactly what to do every step of the way. While that can be the case when you're building something you've built before, most of the real projects I've undertaken have been filled with backtracking, becoming stumped and reading over documentation, refactors and complete restarts. That's the stuff I want to capture. I don't really think many will read it, but hopefully it shines some light on the real experience for someone somewhere.

Second order of business, format and display those fast things I wrote.

I'm actually writing this blog post on learning to write and format markdown, while writing and formatting the markdown for my [Building an Interactive Animated Dial](/blog/Animated_Dial) blog.

To get going on rendering this markdown I, of course, looked up one of those blogs/courses that showed me exactly what to do. Since lately I've been primarily working with [Next.js](https://nextjs.org), I've run across this [Dynamic Routes](https://nextjs.org/learn/basics/dynamic-routes) lesson from their docs a number of times.

I had some hiccups with converting things into TypeScript. I've been learning TypeScript while building this site. While most of my types have been straightforward, I had to dig a little to learn about typing promises and trying to make more flexible types to accomodate my indecision on what data I wanted to head my blogs with.


Typing a promise for TypeScript seems to actually be pretty straightforward. My understanding of it at this point is I use the type I defined before the function was async, and pass that in as an output of the Promise type.
```ts
export interface MatterData {
  title: string
  content?: string
}

export interface PostMeta extends MatterData {
  id: string,
}

export async function getPostData(id: string): Promise<PostMeta> {
    // do the stuff 
    }
```

The `PostMeta` and `MatterData` interfaces feel a little hack to me right now.

It absolutely was hacky. I thought I'd be sending things along without an id at some point. Turns out no. At least not yet, so now: 
```ts
export interface PostMeta {
  id: string,
  title: string
  content?: string
  description?: string
}
```


I'm second guessing using Remark so far. I think I'm going to want to get a little more robust with how I display code. Eyeballing MDX, and MDX has it's own Next specific package.

Found documentation on using MDX to be kind of lacking. Without a clear path forward, I started looking around a bit. React-Markdown appears to be a popular option, and can work along side the graymatter package I'm already using. One thing I like is that I don't have to use `_dangerouslySetInnerHTML`. I realize that `_dangerouslySetInnerHTML` isn't always bad, but it being named as a warning is certainly working on me.

Turns out that the current version of React-Markdown is an ES Module only package, and it does not want to play nice with Nexts compiling. Even though I'm using `import ReactMarkdown from 'react-markdown';`, it still causes an error when I try to view the page.

```
Error: Must use import to load ES Module: /Users/johnbarhorst/Projects/blog/node_modules/react-markdown/index.js
require() of ES modules is not supported.
```

My guess is that once Next compiles the code, all `import` declarations get swapped out for `require()`.

Found this issue on [Github](https://github.com/vercel/next.js/issues/25454). Seems to have some solutions for me.
Another possible route for me here is to [enable experimental ESM support in NextJS](https://nextjs.org/blog/next-11-1#es-modules-support). Gonna give that a whirl, since in Next 12 ESM support will be the default.

Upgraded from Next 10.2.3 to 11.1.2 without issues. Enabled experimental ESM support with

```js
//next.config.js
module.exports = {
  // Prefer loading of ES Modules over CommonJS
  experimental: { esmExternals: true }
};
```

It does create a warning: 
```
warn  - ./node_modules/power-assert-formatter/lib/create.js
Critical dependency: the request of a dependency is an expression
```
However after looking into it, this doesn't appear to be anything to be concerned with.

Now ReactMarkdown no longer throws errors, and everything else seems to work. Once Next v12 drops, I'll hopefully be able to upgrade into a stable version of ESM support. I wouldn't do something like this in a full blown production site. But situations like this is what I want to use this project for. Trying things out, seeing what works and what breaks.

Now that I have the parsing and displaying of markdown working within React-Markdown, time to dig in to syntax highlighting and styling of the blogs.

Trying out react-syntax-highlighter as my code formatting option. Using the example, I came up with this:

```ts
import { getAllPostIds, getPostData, PostMeta } from 'lib/posts';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';

export default function BlogPost({ postData }: {postData: PostMeta}):ReactElement {
  const { content } = postData;
  
  return (
    <main>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={dark}
                language={match[1]}
                PreTag="div"
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


> error - /Users/johnbarhorst/Projects/blog/node_modules/react-syntax-highlighter/dist/esm/styles/prism/index.js:1
export { default as coy } from './coy';
^^^^^^
SyntaxError: Unexpected token 'export'


After a few dead end searches, I came across this in the experimental esm support thread


kimbaudi
26 days ago
> @Henzelix - your issue can be resolved by changing your import statement from react-syntax-highlighter/dist/esm/styles/prism to react-syntax-highlighter/dist/cjs/styles/prism. please take a look at react-syntax-highlighter/react-syntax-highlighter#230 and possibly remarkjs/react-markdown#645.

Seems odd to me that changing from the explicit ESM version to the CommonJS version fixed the issue, considering that I'm using the ESM version of Next now. But maybe that's just part of the 'experimental' journey.

Struggled with finding the typescript types for SyntaxHighlighter. Looked it up on Github and found them [here](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-syntax-highlighter/index.d.ts).

Wasn't super happy with any of the themes for code formatting I've found so far. Looked into creating one myself, based on my prefered VSCode theme [Perfect-Dark](https://marketplace.visualstudio.com/items?itemName=richardmarks.vscode-perfect-dark-color-theme). This is turning out to be a rabbit hole though. Definitely something I want to come back to. Maybe even design my own theme from scratch. However for now I should get more productive things done.

There seems to be some issues with the styling/display of everything. My nav menu, all the text, everything is appearing much smaller than on other pages. This is despite the fact that the base styles and font size are the same as everywhere else. First thoughts are 

This websites background is not going to work well for blogs. I'm going to have to style up some blocks. Maybe having the background peek through in spots will be cool. Maybe not!
