'use client';

import { ArrowUpRight } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import Navigation from '@/components/Navigation';
import SiteFooter from '@/components/SiteFooter';

export default function Contact() {
  const [state, handleSubmit] = useForm('xwpnyqvb');

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="site-shell">
        <header className="section-space grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-5">
            <h1 className="display-type page-title">Say hi :)</h1>
            <p className="page-lede mt-8 max-w-2xl text-[var(--muted)] sm:mt-10">Have an interesting idea, want to work together, or just feel like chatting? Send me a message.</p>
          </div>
        </header>

        <section className="grid gap-16 border-t rule py-16 sm:py-24 lg:grid-cols-12">
          <aside className="space-y-10 lg:col-span-4">
            <div>
              <p className="text-sm font-medium mb-3">Email</p>
              <a className="accent-link text-lg underline" href="mailto:arsharshj@gmail.com">arsharshj@gmail.com</a>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">Location</p>
              <p>Palo Alto, California</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">Elsewhere</p>
              <div className="flex flex-col items-start gap-2">
                <a className="accent-link underline" href="https://github.com/arshjain08" target="_blank" rel="noreferrer">GitHub ↗</a>
                <a className="accent-link underline" href="https://www.linkedin.com/in/arsh-jain08/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a className="accent-link underline" href="https://x.com/arshjain" target="_blank" rel="noreferrer">X ↗</a>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            {state.succeeded ? (
              <div className="border-y rule py-12">
                <h2 className="display-type text-5xl">Thanks. I’ll be in touch.</h2>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm">Your name</span>
                    <input className="index-field" id="name" name="name" required placeholder="Name" />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                  </label>
                  <label className="block">
                    <span className="text-sm">Your email</span>
                    <input className="index-field" id="email" name="email" type="email" required placeholder="Email address" />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </label>
                </div>
                <label className="block">
                  <span className="text-sm">Subject</span>
                  <input className="index-field" id="subject" name="subject" required placeholder="What’s this about?" />
                  <ValidationError prefix="Subject" field="subject" errors={state.errors} />
                </label>
                <label className="block">
                  <span className="text-sm">Message</span>
                  <textarea className="index-field min-h-40 resize-y" id="message" name="message" required placeholder="Tell me more." />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </label>
                <button type="submit" disabled={state.submitting} className="index-button disabled:opacity-40">
                  {state.submitting ? 'Sending…' : 'Send message'} <ArrowUpRight size={16} />
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
