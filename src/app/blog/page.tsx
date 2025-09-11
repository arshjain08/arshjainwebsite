'use client';

import { motion } from 'framer-motion';
import { Calendar, Filter } from 'lucide-react';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import blogData from '../../../data/blog.json';
import Navigation from '@/components/Navigation';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleCategoryChange = useCallback((category: string) => {
    console.log('Button clicked! Changing category to:', category);
    setSelectedCategory(category);
  }, []);

  const filteredPosts = blogData.posts
    .filter(post => {
      if (selectedCategory === 'all') return true;
      return post.category === selectedCategory;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 relative">
      {/* Subtle paper texture */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,119,198,0.1)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>
      {/* Navigation */}
      <Navigation className="p-4 sm:p-6" />

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-stone-900 mb-6 relative"
          >
            My{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Thoughts</span>
              <div 
                className="absolute -bottom-2 left-0 w-full h-4 bg-rose-300/60 -rotate-1 -z-10 highlight-permanent" 
                style={{ 
                  animation: 'none !important', 
                  transition: 'none !important', 
                  opacity: 1, 
                  visibility: 'visible',
                  display: 'block',
                  position: 'absolute',
                  bottom: '-0.5rem',
                  left: 0,
                  width: '100%',
                  height: '1rem',
                  backgroundColor: 'rgba(252, 165, 165, 0.6)',
                  transform: 'rotate(-1deg)',
                  zIndex: -10
                }} 
              />
              <div 
                className="absolute -bottom-1 left-1 w-full h-3 bg-purple-400/40 rotate-1 -z-10 highlight-permanent" 
                style={{ 
                  animation: 'none !important', 
                  transition: 'none !important', 
                  opacity: 1, 
                  visibility: 'visible',
                  display: 'block',
                  position: 'absolute',
                  bottom: '-0.25rem',
                  left: '0.25rem',
                  width: '100%',
                  height: '0.75rem',
                  backgroundColor: 'rgba(196, 181, 253, 0.4)',
                  transform: 'rotate(1deg)',
                  zIndex: -10
                }} 
              />
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Random thoughts about technology, life, and honestly anything that I find cool :)
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12 relative z-10">
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-300">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
          </div>
          
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
            }`}
            type="button"
          >
            All Posts
          </button>
          
          {blogData.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
              }`}
              type="button"
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Blog posts */}
        <div className="space-y-8">
          {filteredPosts.map((post, index) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <motion.article
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-stone-100 border-l-4 border-stone-300 p-4 sm:p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rotate-1 hover:rotate-0 cursor-pointer"
                style={{
                  borderLeftColor: post.category === 'technical' ? '#10B981' : '#EF4444'
                }}
              >
              <div className="flex items-center gap-4 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    post.category === 'technical'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  {blogData.categories.find(c => c.id === post.category)?.name}
                </span>
                
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </div>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-3 font-mono">
                {post.title}
              </h2>
              
              <p className="text-stone-700 mb-4 leading-relaxed text-sm sm:text-base">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-stone-200 text-stone-700 px-3 py-1 rounded-none text-xs border border-stone-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-stone-600 font-medium text-sm">
                  Read more →
                </span>
                
                <div className="text-xs text-stone-500 font-mono">
                  {formatDate(post.date)}
                </div>
              </div>
            </motion.article>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more posts.</p>
          </motion.div>
        )}

      </main>
    </div>
  );
}