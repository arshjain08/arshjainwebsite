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
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-stone-900 mb-10 relative"
          >
            Hi, I'm{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Arsh</span>
              <div className="absolute -bottom-3 left-0 w-full h-6 bg-amber-300/60 -rotate-1 -z-10 highlight-permanent" />
              <div className="absolute -bottom-2 left-1 w-full h-4 bg-emerald-400/40 rotate-1 -z-10 highlight-permanent" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-stone-700 mb-12 max-w-5xl mx-auto leading-relaxed px-4"
          >
            Senior at{' '}
            <span className="font-semibold text-stone-900 relative">
              Rice University
              <span className="absolute -bottom-1 left-0 w-full h-2 bg-blue-400/50 block" />
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

      </main>
    </div>
  );
}