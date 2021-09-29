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

To get going on rendering this markdown I, of course, looked up one of those blogs/courses that showed me exactly what to do. Since I've been primarily working with [Next.js](https://nextjs.org) lately, I've run across this [Dynamic Routes](https://nextjs.org/learn/basics/dynamic-routes) lesson from their docs a number of times.

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


I'm second guessing using Remark so far. I think I'm going to want to get a little more robust with displays of code and such. Eyeballing MDX, and MDX has it's own Next specific package.

This websites background is not going to work well for blogs. I'm going to have to style up some blocks. Maybe having the background peek through in spots will be cool. Maybe not!