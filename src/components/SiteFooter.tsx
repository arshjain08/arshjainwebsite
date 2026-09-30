import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-shell mt-24 border-t rule py-6 sm:mt-36">
      <div className="grid gap-6 sm:grid-cols-3 sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium">Arsh Jain :)</p>
          <p className="max-w-sm text-sm text-[var(--muted)]">
            Machine learning, software, and other things I find interesting.
          </p>
        </div>
        <div className="flex gap-5 text-sm sm:justify-center">
          <a className="accent-link underline" href="https://github.com/arshjain08" target="_blank" rel="noreferrer">GitHub</a>
          <a className="accent-link underline" href="https://www.linkedin.com/in/arsh-jain08/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="accent-link underline" href="https://x.com/arshjain" target="_blank" rel="noreferrer">X</a>
        </div>
        <div className="text-sm sm:text-right">
          <Link href="/contact" className="accent-link underline">Start a conversation →</Link>
        </div>
      </div>
    </footer>
  );
}
