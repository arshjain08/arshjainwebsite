'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import blogData from '../../../../data/blog.json';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Extend Window interface for Twitter widgets
declare global {
  interface Window {
    twttr: any;
  }
}

// Twitter Embed Component
const TwitterEmbed = () => {
  const [twitterLoaded, setTwitterLoaded] = useState(false);

  useEffect(() => {
    // Load Twitter widgets script
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.onload = () => {
        setTwitterLoaded(true);
        window.twttr.widgets.load();
      };
      document.head.appendChild(script);
    } else {
      setTwitterLoaded(true);
      window.twttr.widgets.load();
    }
  }, []);

  return (
    <div className="twitter-embed-container w-full max-w-lg">
      <blockquote className="twitter-tweet" data-theme="light">
        <p lang="en" dir="ltr">
          You're shopping IRL, take a picture of any product with your glasses, and they tell you the cheapest price 
          <br/><br/>
          Another app built with MentraOS 
          <a href="https://t.co/kdXqcsFJSD">pic.twitter.com/kdXqcsFJSD</a>
        </p>
        &mdash; cayden 凯登 (@caydengineer) 
        <a href="https://twitter.com/caydengineer/status/1949509327066472453?ref_src=twsrc%5Etfw">July 27, 2025</a>
      </blockquote>
      {!twitterLoaded && (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center">
          <p className="text-gray-600">Loading tweet...</p>
        </div>
      )}
    </div>
  );
};

export default function BlogPost({ params }: any) {
  const [resolvedParams, setResolvedParams] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (resolvedParams?.slug) {
      setLoading(false);
    }
  }, [resolvedParams]);

  if (!resolvedParams) return <div>Loading...</div>;

  const post = blogData.posts.find(p => p.id === resolvedParams.slug);
  
  if (!post) {
    notFound();
    return null;
  }

  const ensuredPost = post!;
  const category = blogData.categories.find(c => c.id === ensuredPost.category);

  // Simple content processor
  const processContent = (content: string) => {
    // Handle Twitter embeds for Mentra post
    if (content.includes('&lt;blockquote class=&quot;twitter-tweet&quot;&gt;')) {
      const beforeTwitter = content.substring(0, content.indexOf('&lt;blockquote'));
      const afterTwitter = content.substring(content.indexOf('&lt;/script&gt;') + '&lt;/script&gt;'.length);
      
      return (
        <div className="text-stone-900" style={{ userSelect: 'text', WebkitUserSelect: 'text' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {beforeTwitter}
          </ReactMarkdown>
          <div className="my-10 flex justify-center">
            <TwitterEmbed />
          </div>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {afterTwitter}
          </ReactMarkdown>
        </div>
      );
    }
    
    // Check if content has HTML divs (like YouTube embeds)
    if (content.includes('&lt;div class=&quot;my-10&quot;&gt;')) {
      // Find the HTML embed and split content around it
      const htmlStart = content.indexOf('&lt;div class=&quot;my-10&quot;&gt;');
      const htmlEnd = content.indexOf('&lt;/div&gt;&lt;/div&gt;') + '&lt;/div&gt;&lt;/div&gt;'.length;
      
      const beforeHtml = content.substring(0, htmlStart);
      const htmlContent = content.substring(htmlStart, htmlEnd);
      const afterHtml = content.substring(htmlEnd);
      
      // Decode the HTML content
      const decodedHtml = htmlContent
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&');
      
      return (
        <div className="text-stone-900" style={{ userSelect: 'text', WebkitUserSelect: 'text' }}>
          {beforeHtml && (
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {beforeHtml}
            </ReactMarkdown>
          )}
          
          <div dangerouslySetInnerHTML={{ __html: decodedHtml }} />
          
          {afterHtml && (
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {afterHtml}
            </ReactMarkdown>
          )}
        </div>
      );
    }
    
    // Regular markdown content
    return (
      <div className="text-stone-900" style={{ userSelect: 'text', WebkitUserSelect: 'text' }}>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]} 
          components={markdownComponents}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  };

  // Consistent markdown components
  const markdownComponents = {
    h1: ({ children }: any) => (
      <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mt-16 mb-10 first:mt-8 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-16 mb-8 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl sm:text-3xl font-semibold text-stone-900 mt-12 mb-6 leading-tight">
        {children}
      </h3>
    ),
    p: ({ children }: any) => (
      <p className="text-xl leading-8 text-stone-900 mb-7 font-normal tracking-wide">
        {children}
      </p>
    ),
    a: ({ href, children }: any) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors font-medium"
      >
        {children}
      </a>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc ml-8 space-y-4 text-xl text-stone-900 mb-8 leading-8">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal ml-8 space-y-4 text-xl text-stone-900 mb-8 leading-8">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="leading-8 tracking-wide text-stone-900">
        {children}
      </li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-stone-400 pl-8 my-12 text-xl italic text-stone-700 font-light leading-8 tracking-wide">
        {children}
      </blockquote>
    ),
    code: ({ children, className }: any) => {
      const isInline = !className;
      return isInline ? (
        <code className="bg-stone-100 text-stone-800 px-2 py-1 rounded text-sm font-mono">
          {children}
        </code>
      ) : (
        <code className="block bg-stone-900 text-stone-100 p-6 rounded-lg overflow-x-auto text-sm font-mono my-8">
          {children}
        </code>
      );
    },
    strong: ({ children }: any) => (
      <strong className="font-bold text-stone-900">
        {children}
      </strong>
    ),
    img: ({ src, alt }: any) => (
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        className="w-full h-auto rounded-lg shadow-lg my-8 mx-auto block"
      />
    ),
  };

  return (
    <div className="min-h-screen bg-stone-50 relative">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,119,198,0.1)_1px,transparent_0)] bg-[length:20px_20px] pointer-events-none" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-lg sm:text-xl font-bold text-stone-800 relative">
            <span className="relative z-10">AJ</span>
            <div className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-300/60 -z-10 -skew-x-12" />
          </Link>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-stone-700 hover:text-stone-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div 
              className="px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: category?.color || '#6B7280' }}
            >
              {category?.name || 'Blog'}
            </div>
            <span className="text-stone-500">•</span>
            <div className="flex items-center gap-2 text-stone-600">
              <Calendar className="w-4 h-4" />
              <span>{ensuredPost.date}</span>
            </div>
            <span className="text-stone-500">•</span>
            <div className="flex items-center gap-2 text-stone-600">
              <Clock className="w-4 h-4" />
              <span>{ensuredPost.readTime}</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6 leading-tight">
            {ensuredPost.title}
          </h1>

          <p className="text-lg sm:text-xl text-stone-700 leading-relaxed mb-6 sm:mb-8">
            {ensuredPost.excerpt}
          </p>

          {/* Featured Image */}
          {ensuredPost.image && (
            <div className="mb-12">
              <Image
                src={ensuredPost.image}
                alt={ensuredPost.title}
                width={800}
                height={448}
                className="w-full h-80 sm:h-96 md:h-[28rem] object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
        </motion.div>

        {/* Article content */}
        <article
          className="max-w-4xl mx-auto"
          style={{ userSelect: 'text', WebkitUserSelect: 'text', pointerEvents: 'auto' }}
        >
          {loading ? (
            <div className="text-stone-500 text-center py-12">Loading content…</div>
          ) : (
            processContent(ensuredPost.content)
          )}
        </article>

        {/* Navigation to other posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-stone-200"
        >
          <h3 className="text-lg font-bold text-stone-900 mb-6">What's Next?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <Link 
              href="/blog" 
              className="group no-underline block cursor-pointer" 
              style={{ textDecoration: 'none', position: 'relative', zIndex: 100, pointerEvents: 'auto' }}
            >
              <div className="bg-stone-100 border-l-4 border-amber-400 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="font-bold text-stone-900 mb-2 group-hover:text-amber-600 transition-colors text-sm sm:text-base">
                  ← All Blog Posts
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm">
                  View all my thoughts and writings
                </p>
              </div>
            </Link>
            
            <Link 
              href="/contact" 
              className="group no-underline block cursor-pointer" 
              style={{ textDecoration: 'none', position: 'relative', zIndex: 100, pointerEvents: 'auto' }}
            >
              <div className="bg-stone-100 border-l-4 border-emerald-400 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="font-bold text-stone-900 mb-2 group-hover:text-emerald-600 transition-colors text-sm sm:text-base">
                  Let's Connect →
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm">
                  Have thoughts on this post? I'd love to hear them!
                </p>
              </div>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}