'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import blogData from '../../../../data/blog.json';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogPost({ params }: any) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<any>(null);
  const [post, setPost] = useState<any>(null);
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    async function resolveParams() {
      const resolved = await params;
      setResolvedParams(resolved);
      const foundPost = blogData.posts.find(p => p.id === resolved.slug);
      setPost(foundPost);
    }
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!resolvedParams || !post) return;
    
    let isMounted = true;
    async function loadMarkdown() {
      try {
        const res = await fetch(`/api/blog/${resolvedParams.slug}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setMarkdown(data.content || '');
        } else {
          if (isMounted) setMarkdown(post.content || '');
        }
      } catch {
        if (isMounted) setMarkdown(post.content || '');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadMarkdown();
    return () => { isMounted = false; };
  }, [resolvedParams, post]);
  
  if (!resolvedParams || !post) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-stone-500">Loading...</div>
      </div>
    );
  }
  
  const ensuredPost = post;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const category = blogData.categories.find(c => c.id === post.category);

  return (
    <div className="min-h-screen bg-stone-50 relative">
      {/* Subtle paper texture */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,119,198,0.1)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>
      
      {/* Navigation */}
      <nav className="relative z-20 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-lg sm:text-xl font-bold text-stone-800 relative">
            <span className="relative z-10">AJ</span>
            <div className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-300/60 -z-10 -skew-x-12 highlight-permanent" />
          </Link>
          
          <button 
            onClick={() => {
              console.log('Back to Blog button clicked!');
              router.push('/blog');
            }}
            className="flex items-center gap-2 text-stone-700 hover:text-stone-900 transition-colors relative z-10 cursor-pointer bg-transparent border-none"
            type="button"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm sm:text-base">Back to Blog</span>
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Article header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <span
              className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                ensuredPost.category === 'technical'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-purple-100 text-purple-700'
              }`}
            >
              {category?.name}
            </span>
            
            <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              {formatDate(ensuredPost.date)}
            </div>
            
            <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              {ensuredPost.readTime}
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4 sm:mb-6 leading-tight">
            {ensuredPost.title}
          </h1>
          
          <p className="text-lg sm:text-xl text-stone-700 leading-relaxed mb-6 sm:mb-8">
            {ensuredPost.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {ensuredPost.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-stone-200 text-stone-700 px-2 sm:px-3 py-1 rounded-none text-xs sm:text-sm border border-stone-300"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Article image */}
        {ensuredPost.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="w-full h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={ensuredPost.image}
                alt={ensuredPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Article content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
          style={{ userSelect: 'text', WebkitUserSelect: 'text', pointerEvents: 'auto' }}
        >
          {loading ? (
            <div className="text-stone-500 text-center py-12">Loading content…</div>
          ) : (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              className="text-stone-900"
              style={{ userSelect: 'text', WebkitUserSelect: 'text' }}
                  components={{
                    // Custom heading styles
                    h1: ({ children }) => (
                      <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mt-16 mb-10 first:mt-8 leading-tight">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mt-16 mb-8 leading-tight">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-2xl sm:text-3xl font-semibold text-stone-900 mt-12 mb-6 leading-tight">
                        {children}
                      </h3>
                    ),
                    // Custom paragraph styles with embed detection
                    p: ({ children }) => {
                      const text = children?.toString() || '';
                      
                      // Check for YouTube links
                      const youtubeMatch = text.match(/https:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)(?:[&\?][^&\s]*)?/);
                      if (youtubeMatch) {
                        return (
                          <div className="my-10">
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                              <iframe
                                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                                src={`https://www.youtube.com/embed/${youtubeMatch[1]}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        );
                      }
                      
                      // Check for X/Twitter links
                      const twitterMatch = text.match(/https:\/\/(?:x\.com|twitter\.com)\/[a-zA-Z0-9_]+\/status\/([0-9]+)/);
                      if (twitterMatch) {
                        return (
                          <div className="my-10 flex justify-center">
                            <div 
                              dangerouslySetInnerHTML={{
                                __html: `
                                  <blockquote class="twitter-tweet" data-theme="light" data-width="550">
                                    <a href="${text.trim()}"></a>
                                  </blockquote>
                                  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                                `
                              }}
                            />
                          </div>
                        );
                      }
                      
                      return (
                        <p className="text-xl leading-8 text-stone-900 mb-7 font-normal tracking-wide">
                          {children}
                        </p>
                      );
                    },
                    // Custom link styles
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors font-medium"
                      >
                        {children}
                      </a>
                    ),
                    // Custom list styles
                    ul: ({ children }) => (
                      <ul className="list-disc ml-8 space-y-4 text-xl text-stone-900 mb-8 leading-8">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal ml-8 space-y-4 text-xl text-stone-900 mb-8 leading-8">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="leading-8 tracking-wide">
                        {children}
                      </li>
                    ),
                    // Custom blockquote styles
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-stone-400 pl-8 my-12 text-xl italic text-stone-700 font-light leading-8 tracking-wide">
                        {children}
                      </blockquote>
                    ),
                    // Custom code styles
                    code: ({ children, className }) => {
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
                    // Custom strong/bold styles  
                    strong: ({ children }) => (
                      <strong className="font-bold text-stone-900">
                        {children}
                      </strong>
                    )
                  }}
                >
                  {markdown || ensuredPost.content || ''}
                </ReactMarkdown>
              )}
        </motion.article>

        {/* Navigation to other posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16"
        >
          <div className="border-t border-stone-300 pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <a 
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
              </a>
              
              <a 
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
              </a>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}