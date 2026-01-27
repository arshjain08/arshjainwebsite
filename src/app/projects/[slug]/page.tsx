'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Star, FileText, BookOpen, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import projectsData from '../../../../data/projects.json';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getProjectTldr } from '@/utils/projectTldrs';
import { useTheme } from '@/components/ThemeProvider';

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

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    async function resolveParams() {
      const resolved = await params;
      setResolvedParams(resolved);
      const foundProject = projectsData.projects.find(p => p.id === resolved.slug) as Project;
      setProject(foundProject);
    }
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!resolvedParams || !project) return;
    
    let isMounted = true;
    async function loadMarkdown() {
      try {
        const res = await fetch(`/api/projects/${resolvedParams!.slug}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setMarkdown(data.content || '');
            setLoading(false);
          }
        } else {
          if (isMounted) {
            setMarkdown(`# ${project!.title}\n\n${project!.description}`);
            setLoading(false);
          }
        }
      } catch {
        if (isMounted) {
          setMarkdown(`# ${project!.title}\n\n${project!.description}`);
          setLoading(false);
        }
      }
    }
    loadMarkdown();
    return () => { isMounted = false; };
  }, [resolvedParams, project]);
  
  if (!resolvedParams || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={isDark ? 'text-slate-300' : 'text-stone-500'}>Loading...</div>
      </div>
    );
  }
  
  const category = projectsData.categories.find(c => c.id === project.category);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-20 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className={`text-lg sm:text-xl font-bold relative ${
              isDark ? 'text-slate-100' : 'text-stone-800'
            }`}
          >
            <span className="relative z-10">AJ</span>
            <div
              className={`absolute -bottom-1 left-0 w-full h-2 -z-10 -skew-x-12 highlight-permanent ${
                isDark ? 'bg-violet-400/50' : 'bg-yellow-300/60'
              }`}
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              className={`flex items-center gap-2 transition-colors relative z-10 cursor-pointer bg-transparent border-none no-underline ${
                isDark ? 'text-slate-300 hover:text-slate-50' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm sm:text-base">Back to Projects</span>
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              className={`inline-flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${
                isDark
                  ? 'border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800'
                  : 'border-stone-200 bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Project header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <span
              className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-white"
              style={{ backgroundColor: category?.color || '#6B7280' }}
            >
              {category?.name}
            </span>
            
            <span
              className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                project.status === 'completed'
                  ? isDark
                    ? 'bg-emerald-900/40 text-emerald-200 border border-emerald-700/50'
                    : 'bg-green-100 text-green-700'
                  : isDark
                    ? 'bg-amber-900/40 text-amber-200 border border-amber-700/50'
                    : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {project.status === 'completed' ? 'Completed' : 'In Progress'}
            </span>
            
            {project.featured && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                  Featured
                </span>
              </div>
            )}
          </div>
          
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight font-mono ${
              isDark ? 'text-slate-50' : 'text-stone-900'
            }`}
          >
            {project.title}
          </h1>
          
          <p className={`text-lg sm:text-xl leading-relaxed mb-6 sm:mb-8 ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
            {getProjectTldr(project.id)}
          </p>
          
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium border ${
                  isDark
                    ? 'bg-blue-950/40 text-blue-200 border-blue-800/50'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 relative z-[9999]" style={{ position: 'relative', zIndex: 9999, pointerEvents: 'auto' }}>
            {project.github && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(project.github, '_blank', 'noopener,noreferrer');
                }}
                className="inline-flex items-center gap-2 bg-stone-900 text-stone-50 px-4 sm:px-6 py-2 sm:py-3 rounded-none hover:bg-stone-800 transition-all transform hover:scale-105 text-sm sm:text-base cursor-pointer border-none"
                style={{ position: 'relative', zIndex: 10000, pointerEvents: 'auto' }}
              >
                <Github className="w-4 h-4" />
                View Code
              </button>
            )}
            {project.demo && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(project.demo, '_blank', 'noopener,noreferrer');
                }}
                className="inline-flex items-center gap-2 bg-amber-400 text-stone-900 px-4 sm:px-6 py-2 sm:py-3 rounded-none hover:bg-amber-300 transition-all transform hover:scale-105 text-sm sm:text-base font-medium cursor-pointer border-none"
                style={{ position: 'relative', zIndex: 10000, pointerEvents: 'auto' }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </button>
            )}
            {project.slides && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(project.slides, '_blank', 'noopener,noreferrer');
                }}
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-none hover:bg-blue-600 transition-all transform hover:scale-105 text-sm sm:text-base font-medium cursor-pointer border-none"
                style={{ position: 'relative', zIndex: 10000, pointerEvents: 'auto' }}
              >
                <FileText className="w-4 h-4" />
                {project.slides.includes('youtube.com') 
                  ? 'Watch Video' 
                  : (project.slides.includes('docs.google.com') || project.slides.includes('drive.google.com'))
                    ? 'Read Writeup'
                    : 'View Link'}
              </button>
            )}
            {project.blog && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(project.blog!);
                }}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-none hover:bg-green-700 transition-all transform hover:scale-105 text-sm sm:text-base font-medium cursor-pointer border-none"
                style={{ position: 'relative', zIndex: 10000, pointerEvents: 'auto' }}
              >
                <BookOpen className="w-4 h-4" />
                Read Blog Post
              </button>
            )}
          </div>
        </motion.div>

        {/* Project image */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            <div
              className={`aspect-video border-2 shadow-lg overflow-hidden rounded-lg ${
                isDark
                  ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700'
                  : 'bg-gradient-to-br from-amber-100 to-stone-200 border-stone-300'
              }`}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Project details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {/* Main content */}
          <div className="lg:col-span-2">
            <div
              className={`rounded-none border-l-4 p-4 sm:p-6 md:p-8 shadow-lg ${
                isDark ? 'bg-slate-950/70 backdrop-blur-sm border-slate-700' : 'bg-white/80 backdrop-blur-sm'
              }`}
              style={{ borderLeftColor: category?.color || '#6B7280' }}
            >
              <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 font-mono ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                Project Overview
              </h2>
              {loading ? (
                <div className={isDark ? 'text-slate-300' : 'text-stone-500'}>Loading content…</div>
              ) : (
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]} 
                  className={`prose prose-lg sm:prose-lg max-w-none ${
                    isDark ? 'prose-invert text-slate-300' : 'text-stone-700'
                  }`}
                >
                  {/* Remove duplicate title from markdown */}
                  {markdown.replace(/^# .+\n\n?/m, '').trim()}
                </ReactMarkdown>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <div
              className={`border-l-4 border-emerald-400 p-4 sm:p-6 shadow-md ${
                isDark ? 'bg-slate-950/70 border-slate-700' : 'bg-stone-100'
              }`}
            >
              <h3 className={`text-lg font-bold mb-4 font-mono ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                Project Info
              </h3>
              <div className="space-y-3">
                <div>
                  <div className={`text-xs uppercase tracking-wide ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                    Category
                  </div>
                  <div className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-stone-700'}`}>
                    {category?.name}
                  </div>
                </div>
                <div>
                  <div className={`text-xs uppercase tracking-wide ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                    Status
                  </div>
                  <div className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-stone-700'}`}>
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </div>
                </div>
                {project.featured && (
                  <div>
                    <div className={`text-xs uppercase tracking-wide ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                      Featured
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-stone-700'}`}>
                        Yes
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation to other projects - FIXED CLICKABLE */}
        <div className="mt-12 sm:mt-16 relative z-10">
          <div className={`border-t pt-8 ${isDark ? 'border-slate-700' : 'border-stone-300'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <Link 
                href="/projects" 
                className="group no-underline block cursor-pointer" 
                style={{ textDecoration: 'none', position: 'relative', zIndex: 100, pointerEvents: 'auto' }}
              >
                <div
                  className={`border-l-4 border-amber-400 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                    isDark ? 'bg-slate-950/70' : 'bg-stone-100'
                  }`}
                >
                  <h3 className={`font-bold mb-2 transition-colors text-sm sm:text-base ${
                    isDark ? 'text-slate-100 group-hover:text-amber-300' : 'text-stone-900 group-hover:text-amber-600'
                  }`}>
                    ← All Projects
                  </h3>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                    View my complete portfolio
                  </p>
                </div>
              </Link>
              
              <Link 
                href="/contact" 
                className="group no-underline block cursor-pointer" 
                style={{ textDecoration: 'none', position: 'relative', zIndex: 100, pointerEvents: 'auto' }}
              >
                <div
                  className={`border-l-4 border-emerald-400 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                    isDark ? 'bg-slate-950/70' : 'bg-stone-100'
                  }`}
                >
                  <h3 className={`font-bold mb-2 transition-colors text-sm sm:text-base ${
                    isDark ? 'text-slate-100 group-hover:text-emerald-300' : 'text-stone-900 group-hover:text-emerald-600'
                  }`}>
                    Interested? Let's Talk →
                  </h3>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                    I'd love to discuss this project with you
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
