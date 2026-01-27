'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = '' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const links = [
    { href: '/about', label: 'About', colorClass: 'bg-amber-400' },
    { href: '/projects', label: 'Projects', colorClass: 'bg-emerald-500' },
    { href: '/blog', label: 'Blog', colorClass: 'bg-rose-400' },
    { href: '/contact', label: 'Contact', colorClass: 'bg-blue-400' }
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  return (
    <nav className={`relative z-50 ${className}`}>
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
        
        {/* Desktop Navigation */}
        <div className="hidden sm:flex space-x-6 md:space-x-8">
          {links.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`transition-colors relative group ${
                isDark ? 'text-slate-300 hover:text-slate-50' : 'text-stone-700 hover:text-stone-900'
              } ${isActiveLink(link.href) ? (isDark ? 'text-slate-50 font-medium' : 'text-stone-900 font-medium') : ''}`}
            >
              <span>{link.label}</span>
              <div 
                className={`absolute -bottom-1 left-0 h-0.5 ${link.colorClass} ${
                  isActiveLink(link.href) 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full transition-all duration-300'
                }`}
              />
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`sm:hidden p-2 transition-colors ${
              isDark ? 'text-slate-200 hover:text-slate-50' : 'text-stone-700 hover:text-stone-900'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`sm:hidden overflow-hidden border-t shadow-lg ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <div className="px-4 py-4 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 px-4 rounded-lg transition-all ${
                    isDark
                      ? 'text-slate-300 hover:text-slate-50 hover:bg-slate-900'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  } ${
                    isActiveLink(link.href)
                      ? isDark
                        ? 'text-slate-50 font-medium bg-slate-900'
                        : 'text-stone-900 font-medium bg-stone-100'
                      : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}