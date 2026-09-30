import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navigation from '@/components/Navigation';
import SiteFooter from '@/components/SiteFooter';
import blogData from '../../../../data/blog.json';

function cleanEmbeddedContent(content: string) {
  return content
    .replace(/&lt;blockquote class=&quot;twitter-tweet&quot;&gt;[\s\S]*?&lt;\/script&gt;/, '\n\n[Watch PricePal in action on X](https://x.com/caydengineer/status/1949509327066472453)\n\n')
    .replace(/&lt;div class=&quot;my-10&quot;&gt;[\s\S]*?&lt;\/div&gt;&lt;\/div&gt;/, '\n\n[Watch the WattsonAI demo on YouTube](https://www.youtube.com/watch?v=XDzWh5-onb0)\n\n');
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogData.posts.find((item) => item.id === slug);
  if (!post) notFound();
  const category = blogData.categories.find((item) => item.id === post.category);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="site-shell">
        <div className="py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm hover:text-[var(--accent)]"><ArrowLeft size={15} /> Writing archive</Link>
        </div>

        <header className="grid gap-8 border-t rule py-10 sm:py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-3">
            <p className="text-sm leading-relaxed text-[var(--muted)]">{category?.name}<br />{post.date}<br />{post.readTime}</p>
          </div>
          <div className="lg:col-span-9">
            <h1 className="display-type detail-title max-w-5xl">{post.title}</h1>
            <p className="page-lede mt-8 max-w-3xl text-[var(--muted)] sm:mt-9">{post.excerpt}</p>
          </div>
        </header>

        {post.image && (
          <figure className="border-y rule py-3">
            <div className="overflow-hidden bg-[var(--paper-deep)]">
              <Image src={post.image} alt={post.title} width={1600} height={900} priority className="max-h-[70svh] w-full object-cover" />
            </div>
          </figure>
        )}

        <section className="section-space grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <p className="text-sm font-medium mb-5">Topics</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => <span key={tag} className="border rule px-2 py-1 font-mono text-[10px] uppercase tracking-wider">{tag}</span>)}
            </div>
          </aside>
          <article className="prose-index lg:col-span-7 lg:col-start-5">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{cleanEmbeddedContent(post.content)}</ReactMarkdown>
          </article>
        </section>

        <section className="grid gap-8 border-t rule py-12 sm:grid-cols-2 sm:py-16 lg:py-20">
          <Link href="/blog" className="group">
            <p className="display-type text-3xl group-hover:text-[var(--accent)] sm:text-4xl">← More writing</p>
          </Link>
          <Link href="/contact" className="group sm:text-right">
            <p className="display-type text-3xl group-hover:text-[var(--accent)] sm:text-4xl">Want to chat about it? →</p>
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
