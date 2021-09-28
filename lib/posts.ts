import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MatterData {
  title: string
  content?: string
}

export interface PostMeta extends MatterData {
  id: string,
}

const postsDirectory = path.join(process.cwd(), 'blog_pages');
const fileNames = fs.readdirSync(postsDirectory);

export function getPosts(): PostMeta[] {
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title
    };
  });

  return allPostsData;
}

export function getAllPostIds(): {params:{id:string}}[] {
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    };
  });
}

export  function getPostData(id: string): PostMeta {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  const matterResult = matter(fileContents);
  console.log('matter res',matterResult);
  const { title } = matterResult.data;
  
  return {
    id,
    title,
    content: matterResult.content
  };
}