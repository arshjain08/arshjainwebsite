import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import SiteFooter from '@/components/SiteFooter';
import projectsData from '../../../data/projects.json';
import { getProjectTldr } from '@/utils/projectTldrs';

export default function Projects() {
  const projects = projectsData.projects;

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="site-shell">
        <header className="section-space grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-5">
            <h1 className="display-type page-title">Some things<br /><em className="text-[var(--accent)]">I’ve built :)</em></h1>
            <p className="page-lede mt-8 max-w-2xl text-[var(--muted)] sm:mt-10">Some random ideas I had, hackathon projects, etc.</p>
          </div>
        </header>

        <section className="border-t rule py-10 sm:py-16">
          {projects.map((project) => {
            return (
              <Link key={project.id} href={`/projects/${project.id}`} className="archive-row group grid gap-5 py-7 md:grid-cols-12 md:items-center">
                <div className="md:col-span-5">
                  <h2 className="display-type text-3xl leading-[1.02] sm:text-4xl">{project.title}</h2>
                </div>
                <p className="text-sm leading-relaxed text-[var(--muted)] md:col-span-4">{getProjectTldr(project.id)}</p>
                <div className="overflow-hidden bg-[var(--paper-deep)] md:col-span-3">
                  {project.image && <Image src={project.image} alt="" width={480} height={300} className="archive-image aspect-[8/5] w-full object-cover" />}
                </div>
              </Link>
            );
          })}
        </section>

        <section className="section-space border-t rule">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7 lg:col-start-6">
              <h2 className="display-type section-title">I’d love to hear about it.</h2>
              <Link href="/contact" className="index-button mt-8">Say hi <ArrowUpRight size={16} /></Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
