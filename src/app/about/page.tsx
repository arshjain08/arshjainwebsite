import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import SiteFooter from '@/components/SiteFooter';
import personalData from '../../../data/personal.json';

export default function About() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="site-shell">
        <header className="section-space grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-5">
            <h1 className="display-type page-title">A little<br /><em className="text-[var(--accent)]">about me.</em></h1>
            <p className="page-lede mt-8 max-w-3xl sm:mt-10">{personalData.bio}</p>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-2 border-y rule py-3 sm:gap-3 lg:grid-cols-4">
          {personalData.photos.map((photo, index) => (
            <figure key={photo} className={index % 2 ? 'sm:mt-12' : ''}>
              <div className="aspect-[4/5] overflow-hidden bg-[var(--paper-deep)]">
                <Image src={photo} alt={`Arsh Jain, personal photograph ${index + 1}`} width={600} height={750} className="h-full w-full object-cover grayscale-[18%]" />
              </div>
            </figure>
          ))}
        </section>

        <section className="section-space grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="display-type section-title">Work</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {personalData.experiences.map((experience) => (
              <article key={`${experience.company}-${experience.title}`} className="archive-row grid gap-4 py-6 sm:grid-cols-[1fr_9rem]">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{experience.title}</h3>
                  <p className="mt-1 text-[var(--accent)]">{experience.company}</p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)]">{experience.description}</p>
                </div>
                <span className="index-label sm:text-right">{experience.duration}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section-space grid gap-12 border-t rule lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="display-type section-title">Other things I like</h2>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            <div>
              <p className="text-sm font-medium mb-5">Current interests</p>
              <ul className="space-y-0">
                {personalData.interests.map((interest) => (
                  <li key={interest} className="border-t rule py-3 text-lg">{interest}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium mb-5">A few random facts</p>
              <ol className="space-y-5">
                {personalData.funFacts.map((fact, index) => (
                  <li key={fact} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-relaxed"><span className="font-mono text-xs text-[var(--accent)]">{index + 1}.</span><span>{fact}</span></li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="section-space border-t rule text-center">
          <h2 className="display-type section-title mx-auto max-w-3xl">Here are some things I’ve built.</h2>
          <Link href="/projects" className="index-button mt-8">See my projects <ArrowUpRight size={16} /></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
