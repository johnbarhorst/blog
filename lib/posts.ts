import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

export interface PostMeta {
  id: string,
  title: string
  content?: string
  description?: string
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
      title: matterResult.data.title,
      description: matterResult.data.description
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

export async function getPostData(id: string): Promise<PostMeta> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    title: matterResult.data.title,
    content: matterResult.content
  };
}