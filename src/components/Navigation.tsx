'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';

const links = [
  { href: '/about', label: 'About', number: '01' },
  { href: '/projects', label: 'Projects', number: '02' },
  { href: '/blog', label: 'Writing', number: '03' },
  { href: '/contact', label: 'Contact', number: '04' },
];

export default function Navigation({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={`relative z-40 ${className}`}>
      <nav className="site-shell border-b rule py-4">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="group flex items-baseline gap-3">
            <span className="display-type text-2xl">Arsh Jain</span>
          </Link>

          <div className="hidden items-center gap-5 md:flex lg:gap-6">
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href} className={`group flex items-baseline gap-1.5 text-sm ${active ? 'text-[var(--accent)]' : ''}`}>
                  <span className="font-mono text-[10px] text-[var(--muted)]">{link.number}</span>
                  <span className="group-hover:text-[var(--accent)]">{link.label}</span>
                </Link>
              );
            })}
            <button onClick={toggleTheme} className="grid h-9 w-9 place-items-center text-[var(--muted)] hover:text-[var(--accent)]" aria-label={isDark ? 'Use light theme' : 'Use dark theme'}>
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="grid h-10 w-10 place-items-center md:hidden" aria-label="Toggle navigation">
            {isOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {isOpen && (
          <div className="grid grid-cols-2 gap-px border-t rule mt-4 pt-4 md:hidden">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="flex gap-2 py-3 text-lg">
                <span className="font-mono text-[10px] text-[var(--muted)]">{link.number}</span>
                {link.label}
              </Link>
            ))}
            <button onClick={toggleTheme} className="flex items-center gap-2 py-3 text-left text-lg">
              {isDark ? <Sun size={17} /> : <Moon size={17} />} {isDark ? 'Light' : 'Dark'}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
