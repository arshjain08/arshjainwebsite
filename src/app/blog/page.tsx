import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import SiteFooter from '@/components/SiteFooter';
import blogData from '../../../data/blog.json';

export default function Blog() {
  const posts = [...blogData.posts]
    .sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="site-shell">
        <header className="section-space grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-5">
            <h1 className="display-type page-title">Some things<br /><em className="text-[var(--accent)]">I’ve been thinking about.</em></h1>
            <p className="page-lede mt-8 max-w-2xl text-[var(--muted)] sm:mt-10">Whatever is on my mind. Whether that&apos;s life, some new technology, or anything else.</p>
          </div>
        </header>

        <section className="border-t rule py-10 sm:py-16">
          {posts.map((post) => {
            return (
              <Link key={post.id} href={`/blog/${post.id}`} className="archive-row group grid gap-5 py-7 md:grid-cols-12 md:items-center">
                <div className="md:col-span-6">
                  <h2 className="display-type text-3xl leading-[1.02] sm:text-4xl">{post.title}</h2>
                </div>
                <p className="text-sm leading-relaxed text-[var(--muted)] md:col-span-3">{post.excerpt}</p>
                <div className="overflow-hidden bg-[var(--paper-deep)] md:col-span-2">
                  {post.image && <Image src={post.image} alt="" width={360} height={240} className="archive-image aspect-[3/2] w-full object-cover" />}
                </div>
                <div className="flex items-center justify-between md:col-span-1 md:block md:text-right">
                  <span className="index-label whitespace-nowrap">{post.date}</span>
                  <ArrowUpRight className="ml-auto mt-3 hidden group-hover:text-[var(--accent)] md:block" size={16} />
                </div>
              </Link>
            );
          })}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
