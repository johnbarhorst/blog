import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostMeta {
  id: string,
  title: string
  description?: string
}

export interface PostWithContent extends PostMeta{
  content: string
}

// path to directory containing the blogs
const postsDirectory = path.join(process.cwd(), 'blog_pages');
// array of each file name in './blog_pages', with the file extension still on it.
const fileNames = fs.readdirSync(postsDirectory);

// GET A LIST OF ALL BLOGS (each markdown file in the directory)

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

// GET META DATA FOR EACH BLOG

// Using gray matter, parse all the meta data from each blog and send to './pages/blog/index.tsx'
// to map over and create links to each blog page.
export function getPosts(): PostMeta[] {
  const allPostsMeta = fileNames.map(fileName => {
    // create the id by stripping '.md' off each file name in './blog_pages'
    const id = fileName.replace(/\.md$/, '');
    // create a string of the full path with current working directory + 'blog_pages' + fileName
    const fullPath = path.join(postsDirectory, fileName);
    // parse the file itself into a string with gray-matter
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    // returns the meta data from a blog page under data,
    // as well as the body of the markdown as a string under matterResults.content
    const matterResults = matter(fileContents);
    const { title, description } = matterResults.data;

    return {
      id,
      title,
      description
    };
  });

  return allPostsMeta;
}

export function getPostData(id: string):PostWithContent {
  // re-attach the '.md' to the end of the id to make a complete path
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  // returns the meta data from a blog page under data,
  // as well as the body of the markdown as a string under matterResults.content
  const matterResult = matter(fileContents);
  return {
    id,
    title: matterResult.data.title,
    content: matterResult.content
  };
}