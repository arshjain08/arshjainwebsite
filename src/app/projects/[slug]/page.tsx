'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Star, FileText, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import projectsData from '../../../../data/projects.json';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getProjectTldr } from '@/utils/projectTldrs';

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
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-stone-500">Loading...</div>
      </div>
    );
  }
  
  const category = projectsData.categories.find(c => c.id === project.category);

  return (
    <div className="min-h-screen bg-stone-50 relative">
      {/* Subtle paper texture */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,119,198,0.1)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>
      
      {/* Navigation */}
      <nav className="relative z-20 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-lg sm:text-xl font-bold text-stone-800 relative">
            <span className="relative z-10">AJ</span>
            <div className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-300/60 -z-10 -skew-x-12 highlight-permanent" />
          </Link>
          
          <Link 
            href="/projects"
            className="flex items-center gap-2 text-stone-700 hover:text-stone-900 transition-colors relative z-10 cursor-pointer bg-transparent border-none no-underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm sm:text-base">Back to Projects</span>
          </Link>
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
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {project.status === 'completed' ? 'Completed' : 'In Progress'}
            </span>
            
            {project.featured && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-xs sm:text-sm text-gray-600">Featured</span>
              </div>
            )}
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4 sm:mb-6 leading-tight font-mono">
            {project.title}
          </h1>
          
          <p className="text-lg sm:text-xl text-stone-700 leading-relaxed mb-6 sm:mb-8">
            {getProjectTldr(project.id)}
          </p>
          
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium border border-blue-200"
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
                {project.slides.includes('youtube.com') ? 'Watch Video' : 'View Demo'}
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
            <div className="aspect-video bg-gradient-to-br from-amber-100 to-stone-200 border-2 border-stone-300 shadow-lg overflow-hidden rounded-lg">
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
            <div className="bg-white/80 backdrop-blur-sm rounded-none border-l-4 p-4 sm:p-6 md:p-8 shadow-lg"
                 style={{ borderLeftColor: category?.color || '#6B7280' }}>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-4 sm:mb-6 font-mono">Project Overview</h2>
              {loading ? (
                <div className="text-stone-500">Loading content…</div>
              ) : (
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]} 
                  className="prose prose-lg sm:prose-lg max-w-none text-stone-700"
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
            <div className="bg-stone-100 border-l-4 border-emerald-400 p-4 sm:p-6 shadow-md">
              <h3 className="text-lg font-bold text-stone-900 mb-4 font-mono">Project Info</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-stone-500 uppercase tracking-wide">Category</div>
                  <div className="text-sm text-stone-700 font-medium">{category?.name}</div>
                </div>
                <div>
                  <div className="text-xs text-stone-500 uppercase tracking-wide">Status</div>
                  <div className="text-sm text-stone-700 font-medium">
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </div>
                </div>
                {project.featured && (
                  <div>
                    <div className="text-xs text-stone-500 uppercase tracking-wide">Featured</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-stone-700 font-medium">Yes</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation to other projects - FIXED CLICKABLE */}
        <div className="mt-12 sm:mt-16 relative z-10">
          <div className="border-t border-stone-300 pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <Link 
                href="/projects" 
                className="group no-underline block cursor-pointer" 
                style={{ textDecoration: 'none', position: 'relative', zIndex: 100, pointerEvents: 'auto' }}
              >
                <div className="bg-stone-100 border-l-4 border-amber-400 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="font-bold text-stone-900 mb-2 group-hover:text-amber-600 transition-colors text-sm sm:text-base">
                    ← All Projects
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm">
                    View my complete portfolio
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
                    Interested? Let's Talk →
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm">
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