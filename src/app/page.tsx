'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 relative overflow-hidden">
      {/* Subtle paper texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,119,198,0.1)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-4 h-4 bg-amber-400/60 rotate-45 transition-all duration-[3s] ease-out"
          style={{
            left: mousePosition.x * 0.1 + 200,
            top: mousePosition.y * 0.1 + 100,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-6 h-6 border-2 border-emerald-600/40 rounded-full animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 left-1/5 w-8 h-1 bg-rose-500/50 animate-pulse" style={{ animationDuration: '3s' }} />
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-4 sm:p-6"
      >
        <Navigation />
      </motion.div>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-block relative mb-8">
              <span className="text-sm font-medium text-stone-600 bg-stone-100 px-4 py-2 rounded-full border border-stone-200">
                Welcome to my corner of the internet
              </span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-stone-900 mb-6 relative"
          >
            Hi, I'm{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Arsh</span>
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-amber-300/60 -rotate-1 -z-10 highlight-permanent" />
              <div className="absolute -bottom-1 left-1 w-full h-3 bg-emerald-400/40 rotate-1 -z-10 highlight-permanent" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-stone-700 mb-8 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Senior at{' '}
            <span className="font-semibold text-stone-900 relative">
              Rice University
              <span className="absolute -bottom-0.5 left-0 w-full h-1 bg-blue-400/50 block" />
            </span>{' '}passionate about solving world's hardest problems.
            <br />
            <span className="text-stone-600">Previous SWE Intern at Coinbase and SLB.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 bg-stone-900 text-stone-50 px-8 py-4 rounded-none skew-x-[-2deg] hover:skew-x-0 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="skew-x-[2deg]">Get to know me</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 skew-x-[2deg]" />
            </Link>
            
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 bg-amber-400 text-stone-900 px-8 py-4 rounded-none rotate-1 hover:rotate-0 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
            >
              <span>View my work</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Interest cards with newspaper-style layout */}
        <div className="mt-16 sm:mt-24 md:mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-stone-100 border-l-4 border-amber-400 p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rotate-1 hover:rotate-0"
          >
            <div className="text-3xl mb-4 filter grayscale">🧠</div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-2 font-mono">Machine Learning</h3>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Building intelligent systems that learn and adapt, from crypto trading bots to music generators.
            </p>
            <div className="mt-4 text-xs text-stone-500 font-mono">EST. 2021</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-stone-100 border-l-4 border-emerald-500 p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 -rotate-1 hover:rotate-0"
          >
            <div className="text-3xl mb-4 filter grayscale">📊</div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-2 font-mono">Finance & Economics</h3>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Applying behavioral economics and operations research to solve complex financial problems.
            </p>
            <div className="mt-4 text-xs text-stone-500 font-mono">EST. 2020</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-stone-100 border-l-4 border-rose-400 p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rotate-1 hover:rotate-0"
          >
            <div className="text-3xl mb-4 filter grayscale">🎵</div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-2 font-mono">Creative Projects</h3>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Exploring the intersection of technology and creativity through music, art, and experimental projects.
            </p>
            <div className="mt-4 text-xs text-stone-500 font-mono">EST. 2019</div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}