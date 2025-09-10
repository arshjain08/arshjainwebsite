'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Heart, Zap, Move } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import personalData from '../../../data/personal.json';
import Navigation from '@/components/Navigation';

export default function About() {
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragRef.current) return;
    
    const rect = dragRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setBallPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    
    // Check if ball is on the "slope" (bottom right area)
    if (x > 80 && y > 80) {
      setShowGame(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 relative">
      {/* Subtle paper texture */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,119,198,0.1)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>
      {/* Navigation */}
      <Navigation className="p-6" />

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-stone-900 mb-6 relative"
          >
            Hey there, I'm{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Arsh</span>
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
                className="absolute -bottom-1 left-1 w-full h-3 bg-yellow-400/40 rotate-1 -z-10 highlight-permanent" 
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
            className="text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed"
          >
            {personalData.bio}
          </motion.p>
        </div>

        {/* Photo gallery and info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Photo gallery with Easter egg */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div 
              ref={dragRef}
              className="grid grid-cols-2 gap-4 relative cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {personalData.photos.map((photo, index) => (
                <div
                  key={index}
                  className="aspect-square bg-stone-200 rounded-none overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-stone-300 rotate-1 hover:rotate-0"
                >
                  <Image
                    src={photo}
                    alt={`Arsh photo ${index + 1}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-amber-100 to-stone-200 flex items-center justify-center text-stone-600 font-mono text-sm">Photo ${index + 1}</div>`;
                      }
                    }}
                  />
                </div>
              ))}
              
              {/* Easter egg ball */}
              <div
                className="absolute w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg cursor-grab active:cursor-grabbing z-10 transition-all duration-100"
                style={{
                  left: `${ballPosition.x}%`,
                  top: `${ballPosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseDown={handleMouseDown}
              >
                <Move className="w-3 h-3 text-white/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              
              {/* Slope indicator */}
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tr from-transparent via-gray-300/20 to-gray-400/40 rounded-tl-full pointer-events-none" />
            </div>
            
            <p className="text-sm text-gray-500 mt-2 text-center">
              Drag the little ball to the slope in the bottom right... 👀
            </p>
          </motion.div>

          {/* Personal info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-stone-100 border-l-4 border-amber-400 p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rotate-1 hover:rotate-0">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-stone-700" />
                <h3 className="text-lg font-bold text-stone-900 font-mono">Based in</h3>
              </div>
              <p className="text-stone-700">{personalData.location}</p>
              <div className="mt-4 text-xs text-stone-500 font-mono">CURRENT LOCATION</div>
            </div>

            <div className="bg-stone-100 border-l-4 border-emerald-500 p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 -rotate-1 hover:rotate-0">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-stone-700" />
                <h3 className="text-lg font-bold text-stone-900 font-mono">What I'm into</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {personalData.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-stone-200 text-stone-800 px-3 py-1 rounded-none text-sm font-medium border border-stone-300"
                  >
                    {interest}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-xs text-stone-500 font-mono">CURRENT OBSESSIONS</div>
            </div>

            <div className="bg-stone-100 border-l-4 border-rose-400 p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rotate-1 hover:rotate-0">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-5 h-5 text-stone-700" />
                <h3 className="text-lg font-bold text-stone-900 font-mono">Random facts</h3>
              </div>
              <ul className="space-y-2">
                {personalData.funFacts.map((fact, index) => (
                  <li key={index} className="text-stone-700 flex items-start gap-2 text-sm">
                    <span className="text-rose-400 mt-1 font-bold">•</span>
                    {fact}
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-xs text-stone-500 font-mono">QUIRKY DETAILS</div>
            </div>
          </motion.div>
        </div>

        {/* Experience section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-stone-900 mb-8 text-center relative">
            <span className="relative z-10">Recent Stuff I've Done</span>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-3 bg-yellow-300/60 -rotate-1 -z-10" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personalData.experiences.map((exp, index) => (
              <div
                key={index}
                className={`bg-stone-100 border-l-4 p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                  index % 3 === 0 ? 'border-amber-400 rotate-1 hover:rotate-0' : 
                  index % 3 === 1 ? 'border-emerald-500 -rotate-1 hover:rotate-0' : 
                  'border-rose-400 rotate-1 hover:rotate-0'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-stone-700" />
                  <span className="text-sm font-medium text-stone-600 font-mono">{exp.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2 font-mono">{exp.title}</h3>
                <p className="text-stone-800 font-medium mb-3">{exp.company}</p>
                <p className="text-stone-700 text-sm leading-relaxed">{exp.description}</p>
                <div className="mt-4 text-xs text-stone-500 font-mono">
                  {exp.type.toUpperCase()} EXPERIENCE
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-stone-800 rounded-none p-8 text-stone-50 border-4 border-amber-400 rotate-1 hover:rotate-0 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4 font-mono">Want to work together?</h2>
            <p className="text-stone-300 mb-6">
              I'm always interested in new opportunities and collaborations. Let's build something amazing!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="bg-amber-400 text-stone-900 px-6 py-3 rounded-none font-medium hover:bg-amber-300 transition-colors transform hover:scale-105"
              >
                View My Work
              </Link>
              <Link
                href="/blog"
                className="border-2 border-stone-300 text-stone-50 px-6 py-3 rounded-none font-medium hover:bg-stone-700 transition-colors transform hover:scale-105"
              >
                Read My Thoughts
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

      {/* Game Modal */}
      {showGame && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">You found the Easter egg! 🎉</h2>
              <button
                onClick={() => setShowGame(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src="https://storage.y8.com/y8-studio/unity/joll/slope/?key=9757549&value=80527"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Slope Game"
                className="w-full h-full"
              />
            </div>
            <p className="text-gray-600 mt-4 text-center">
              Enjoy the game! Click the X to close when you're done.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}