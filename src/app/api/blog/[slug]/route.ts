import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import blogData from '../../../../../data/blog.json';

export async function GET(request: Request, { params }: any) {
  try {
    const { slug } = await params;
    const mdPath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`);

    if (fs.existsSync(mdPath)) {
      const file = fs.readFileSync(mdPath, 'utf8');
      const { content, data } = matter(file);
      return NextResponse.json({ content, frontmatter: data || {} });
    }

    const post = blogData.posts.find((p) => p.id === slug);
    if (post) {
      return NextResponse.json({ content: post.content || '', frontmatter: {} });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
} 