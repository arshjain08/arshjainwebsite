'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Filter, Star, FileText } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import projectsData from '../../../data/projects.json';
import Navigation from '@/components/Navigation';
import { getProjectTldr } from '@/utils/projectTldrs';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredProjects = projectsData.projects.filter(project => {
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
    const featuredMatch = !showFeaturedOnly || project.featured;
    return categoryMatch && featuredMatch;
  });

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
              <span className="relative z-10">Projects</span>
              <div 
                className="absolute -bottom-2 left-0 w-full h-4 bg-emerald-300/60 -rotate-1 -z-10 highlight-permanent" 
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
                  backgroundColor: 'rgba(110, 231, 183, 0.6)',
                  transform: 'rotate(-1deg)',
                  zIndex: -10
                }} 
              />
              <div 
                className="absolute -bottom-1 left-1 w-full h-3 bg-amber-400/40 rotate-1 -z-10 highlight-permanent" 
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
                  backgroundColor: 'rgba(251, 191, 36, 0.4)',
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
            A collection of things I've built, learned from, and am proud of. From ML experiments to full-stack applications.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12 relative z-10">
          <div className="flex items-center gap-2 bg-stone-800 rounded-none px-4 py-2 shadow-md border-2 border-amber-400">
            <Filter className="w-4 h-4 text-stone-50" />
            <span className="text-sm font-medium text-stone-50 font-mono">Filter:</span>
          </div>
          
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-none text-sm font-medium transition-all transform hover:scale-105 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-stone-800 text-stone-50 shadow-lg border-2 border-amber-400'
                : 'bg-stone-200 text-stone-800 hover:bg-stone-300 border-2 border-stone-300'
            }`}
            type="button"
            style={{ position: 'relative', zIndex: 100, pointerEvents: 'auto' }}
          >
            All Projects
          </button>
          
          {projectsData.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-none text-sm font-medium transition-all transform hover:scale-105 border-2 cursor-pointer ${
                selectedCategory === category.id
                  ? 'bg-stone-800 text-stone-50 shadow-lg'
                  : 'bg-stone-200 text-stone-800 hover:bg-stone-300 border-stone-300'
              }`}
              style={{
                borderColor: selectedCategory === category.id ? category.color : undefined,
                position: 'relative',
                zIndex: 100,
                pointerEvents: 'auto'
              }}
              type="button"
            >
              {category.name}
            </button>
          ))}
          
          <button
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-none text-sm font-medium transition-all transform hover:scale-105 border-2 cursor-pointer ${
              showFeaturedOnly
                ? 'bg-amber-400 text-stone-900 shadow-lg border-amber-600'
                : 'bg-stone-200 text-stone-800 hover:bg-amber-100 border-stone-300'
            }`}
            type="button"
            style={{ position: 'relative', zIndex: 100, pointerEvents: 'auto' }}
          >
            <Star className="w-4 h-4" />
            Featured Only
          </button>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-stone-100 rounded-none overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-stone-300 rotate-1 hover:rotate-0"
            >
              {/* Project image */}
              <div className="aspect-video bg-gradient-to-br from-amber-100 to-stone-200 flex items-center justify-center border-b-2 border-stone-300 overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-stone-700 font-mono text-sm">{project.title}</span>
                )}
              </div>
              
              {/* Project content */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3">
                  <Link href={`/projects/${project.id}`} className="hover:text-blue-600 transition-colors">
                    <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-mono">{project.title}</h3>
                  </Link>
                  {project.featured && (
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  )}
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm sm:text-base">{getProjectTldr(project.id)}</p>
                
                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium">
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>
                
                {/* Status */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                  
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: projectsData.categories.find(c => c.id === project.category)?.color || '#6B7280'
                    }}
                  />
                </div>
                
                {/* Links */}
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">Code</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">Demo</span>
                    </a>
                  )}
                  {(project as any).slides && (
                    <a
                      href={(project as any).slides}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">
                        {(project as any).slides.includes('youtube.com') 
                          ? 'Video' 
                          : (project as any).slides.includes('docs.google.com') 
                            ? 'Slides'
                            : (project as any).slides.includes('twitter.com') || (project as any).slides.includes('x.com')
                              ? 'X Post'
                              : 'Demo'}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more projects.</p>
          </motion.div>
        )}

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-stone-800 rounded-none p-8 text-stone-50 border-4 border-amber-400 rotate-1 hover:rotate-0 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4 font-mono">Want to collaborate?</h2>
            <p className="text-stone-300 mb-6">
              I'm always open to interesting projects and new challenges. Let's build something cool together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about"
                className="bg-amber-400 text-stone-900 px-6 py-3 rounded-none font-medium hover:bg-amber-300 transition-colors transform hover:scale-105"
              >
                Get to Know Me
              </Link>
              <Link
                href="/blog"
                className="border-2 border-stone-300 text-stone-50 px-6 py-3 rounded-none font-medium hover:bg-stone-700 transition-colors transform hover:scale-105"
              >
                Read My Blog
              </Link>
              <Link
                href="/contact"
                className="bg-stone-50 text-stone-900 px-6 py-3 rounded-none font-medium hover:bg-white transition-colors transform hover:scale-105 border-2 border-stone-300"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}