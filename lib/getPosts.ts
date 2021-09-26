import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type PostsList = {
  id: string,
  title: string
}

const postsDirectory = path.join(process.cwd(), 'blog_pages');

export function getPosts(): PostsList[] {
  const fileNames = fs.readdirSync(postsDirectory);
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