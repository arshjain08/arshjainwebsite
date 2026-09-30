import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import SiteFooter from '@/components/SiteFooter';
import projectsData from '../../data/projects.json';
import blogData from '../../data/blog.json';
import { getProjectTldr } from '@/utils/projectTldrs';

export default function Home() {
  const selectedProjects = projectsData.projects.filter((project) => project.featured).slice(0, 4);
  const recentPosts = [...blogData.posts]
    .sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="site-shell">
        <section className="home-hero grid gap-12 py-10 sm:gap-16 sm:py-14 lg:min-h-[min(700px,calc(100svh-90px))] lg:grid-cols-12 lg:content-between lg:py-16">
          <div className="lg:col-span-9">
            <h1 className="display-type page-title max-w-4xl">
              hey! i&apos;m arsh!
              <span className="mt-[0.28em] block w-fit whitespace-nowrap text-[0.72em] sm:text-[0.78em]">（＾－＾）</span>
            </h1>
          </div>

          <div className="grid gap-8 border-t rule pt-5 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-12">
            <p className="max-w-xl text-lg font-medium leading-relaxed tracking-[0.03em] sm:text-xl lg:col-span-6">
              i train ai/llms, take photos, (try to) make music, and build software. currently at spacexai working on grok imagine modeling.
            </p>
            <div className="space-y-2 text-sm text-[var(--muted)] lg:col-span-3 lg:col-start-9">
              <p className="text-xs uppercase tracking-wider">Right now</p>
              <p>Palo Alto, California</p>
            </div>
            <Link href="/about" className="group flex items-start justify-between text-sm lg:col-span-2">
              More about me <ArrowDownRight className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" size={18} />
            </Link>
          </div>
        </section>

        <section className="section-space">
          <div className="mb-10 flex items-end justify-between border-b rule pb-4">
            <div>
              <h2 className="display-type section-title">Some things I’ve built</h2>
            </div>
            <Link href="/projects" className="hidden items-center gap-2 text-sm hover:text-[var(--accent)] sm:flex">Full archive <ArrowUpRight size={15} /></Link>
          </div>

          <div>
            {selectedProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="archive-row group grid gap-5 py-6 md:grid-cols-12 md:items-center">
                <div className="md:col-span-6">
                  <h3 className="display-type text-3xl leading-none sm:text-4xl">{project.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-[var(--muted)] md:col-span-4">{getProjectTldr(project.id)}</p>
                <div className="overflow-hidden bg-[var(--paper-deep)] md:col-span-2">
                  {project.image && <Image src={project.image} alt="" width={360} height={220} className="archive-image aspect-[3/2] h-full w-full object-cover" />}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section-space grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="display-type section-title">Things I’ve written</h2>
            <p className="mt-6 max-w-sm leading-relaxed text-[var(--muted)]">Mostly technology, hackathons, and whatever else I can’t stop thinking about.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="archive-row group grid gap-3 py-6 sm:grid-cols-[1fr_auto]">
                <div>
                  <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{post.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{post.excerpt}</p>
                </div>
                <span className="index-label whitespace-nowrap">{post.date}</span>
              </Link>
            ))}
            <Link href="/blog" className="mt-8 inline-flex items-center gap-2 text-sm hover:text-[var(--accent)]">Browse all notes <ArrowUpRight size={15} /></Link>
          </div>
        </section>

        <section className="section-space grid items-end gap-8 border-t rule lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden bg-[var(--paper-deep)]">
              <Image src="/images/arsh-2.JPG" alt="Arsh Jain" width={900} height={1125} className="h-full w-full object-cover grayscale-[20%]" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="display-type section-title">I do other stuff too :)</p>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-[var(--muted)]">Photography, board games, music, mechanical keyboards, travel, and the occasional project that begins as a bad idea at a hackathon.</p>
            <Link href="/about" className="index-button mt-8">A little more about me <ArrowUpRight size={16} /></Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
