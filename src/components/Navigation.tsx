'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = '' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const pathname = usePathname();

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
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg sm:text-xl font-bold text-stone-800 relative">
          <span className="relative z-10">AJ</span>
          <div className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-300/60 -z-10 -skew-x-12 highlight-permanent" />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden sm:flex space-x-6 md:space-x-8">
          {links.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`text-stone-700 hover:text-stone-900 transition-colors relative group ${
                isActiveLink(link.href) ? 'text-stone-900 font-medium' : ''
              }`}
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
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden p-2 text-stone-700 hover:text-stone-900 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden overflow-hidden bg-stone-50 border-t border-stone-200 shadow-lg"
          >
            <div className="px-4 py-4 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 px-4 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-all ${
                    isActiveLink(link.href) ? 'text-stone-900 font-medium bg-stone-100' : ''
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