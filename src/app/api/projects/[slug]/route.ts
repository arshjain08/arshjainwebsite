import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import projectsData from '../../../../../data/projects.json';

export async function GET(request: Request, { params }: any) {
  try {
    const { slug } = await params;
    const mdPath = path.join(process.cwd(), 'content', 'projects', `${slug}.md`);

    if (fs.existsSync(mdPath)) {
      const file = fs.readFileSync(mdPath, 'utf8');
      const { content, data } = matter(file);
      return NextResponse.json({ content, frontmatter: data || {} });
    }

    const project = projectsData.projects.find((p) => p.id === slug);
    if (project) {
      const fallback = `# ${project.title}\n\n${project.description}`;
      return NextResponse.json({ content: fallback, frontmatter: {} });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
} 