import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import Navigation from '@/components/Navigation';
import SiteFooter from '@/components/SiteFooter';
import projectsData from '../../../../data/projects.json';
import { getProjectTldr } from '@/utils/projectTldrs';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: string;
  status: string;
  featured: boolean;
  github?: string;
  demo?: string;
  slides?: string;
  blog?: string;
  image?: string;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsData.projects.find((item) => item.id === slug) as Project | undefined;
  if (!project) notFound();

  const category = projectsData.categories.find((item) => item.id === project.category);
  const markdownPath = path.join(process.cwd(), 'content', 'projects', `${slug}.md`);
  const markdown = fs.existsSync(markdownPath)
    ? matter(fs.readFileSync(markdownPath, 'utf8')).content.replace(/^# .+\n\n?/m, '').trim()
    : project.description;

  const links = [
    project.github && { label: 'Source code', href: project.github },
    project.demo && { label: 'Live demo', href: project.demo },
    project.slides && { label: project.slides.includes('youtube.com') ? 'Watch video' : 'Supporting material', href: project.slides },
    project.blog && { label: 'Related note', href: project.blog },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="site-shell">
        <div className="py-6">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm hover:text-[var(--accent)]"><ArrowLeft size={15} /> Project archive</Link>
        </div>

        <header className="grid gap-8 border-t rule py-10 sm:py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-3">
            <p className="text-sm text-[var(--muted)]">{category?.name}<br />{project.status}<br />{project.featured ? 'Selected work' : 'Archive entry'}</p>
          </div>
          <div className="lg:col-span-9">
            <h1 className="display-type detail-title max-w-5xl">{project.title}</h1>
            <p className="page-lede mt-8 max-w-3xl text-[var(--muted)] sm:mt-10">{getProjectTldr(project.id)}</p>
            {links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {links.map((link, index) => (
                  <a key={link.label} href={link.href} target={link.href.startsWith('/') ? undefined : '_blank'} rel={link.href.startsWith('/') ? undefined : 'noreferrer'} className={`index-button ${index > 0 ? 'secondary' : ''}`}>
                    {link.label} <ArrowUpRight size={15} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </header>

        {project.image && (
          <figure className="border-y rule py-3">
            <div className="overflow-hidden bg-[var(--paper-deep)]">
              <Image src={project.image} alt={project.title} width={1600} height={900} priority className="max-h-[70svh] w-full object-contain" />
            </div>
          </figure>
        )}

        <section className="section-space grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <p className="text-sm font-medium mb-5">Built with</p>
            <ul className="border-t rule">
              {project.tech.map((technology) => <li key={technology} className="border-b rule py-2.5 text-sm">{technology}</li>)}
            </ul>
          </aside>
          <article className="prose-index lg:col-span-7 lg:col-start-5">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </article>
        </section>

        <section className="grid gap-8 border-t rule py-12 sm:grid-cols-2 sm:py-16 lg:py-20">
          <Link href="/projects" className="group">
            <p className="display-type text-3xl group-hover:text-[var(--accent)] sm:text-4xl">← More projects</p>
          </Link>
          <Link href="/contact" className="group sm:text-right">
            <p className="display-type text-3xl group-hover:text-[var(--accent)] sm:text-4xl">Want to talk about it? →</p>
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
