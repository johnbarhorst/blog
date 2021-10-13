import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostMeta {
  id: string,
  title: string
  content?: string
  description?: string
}

// Get list of all blogs (markdown files)
// path to directory containing the blogs
const postsDirectory = path.join(process.cwd(), 'blog_pages');
// array of each file name in './blog_pages', with the file extension still on it.
const fileNames = fs.readdirSync(postsDirectory);

// remove the .md from each file in the array, and send to getStaticPaths() in the 
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

export function getPosts(): PostMeta[] {
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      description: matterResult.data.description
    };
  });

  return allPostsData;
}

export function getPostData(id: string):PostMeta {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  const matterResult = matter(fileContents);
  return {
    id,
    title: matterResult.data.title,
    content: matterResult.content
  };
}