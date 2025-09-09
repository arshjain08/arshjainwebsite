'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, MapPin, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-stone-50 relative">
      {/* Subtle paper texture */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,119,198,0.1)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-stone-800 relative">
            <span className="relative z-10">AJ</span>
            <div className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-300/60 -z-10 -skew-x-12 highlight-permanent" />
          </Link>
          <div className="flex space-x-8">
            <Link href="/about" className="text-stone-700 hover:text-stone-900 transition-colors relative group">
              <span>About</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/projects" className="text-stone-700 hover:text-stone-900 transition-colors relative group">
              <span>Projects</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/blog" className="text-stone-700 hover:text-stone-900 transition-colors relative group">
              <span>Blog</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-400 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/contact" className="text-stone-900 font-medium relative">
              <span>Contact</span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Hero section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-stone-900 mb-6 relative"
          >
            Let's{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Connect</span>
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-blue-300/60 -rotate-1 -z-10 highlight-permanent" />
              <div className="absolute -bottom-1 left-1 w-full h-3 bg-green-400/40 rotate-1 -z-10 highlight-permanent" />
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed"
          >
            Have an interesting project? Want to collaborate? Or just want to say hi? 
            I'd love to hear from you!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-stone-900 mb-8 relative">
              <span className="relative z-10">Send me a message</span>
              <div className="absolute -bottom-1 left-0 w-32 h-3 bg-amber-300/40 -rotate-1 -z-10 highlight-permanent" />
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-stone-100 border border-stone-300 rounded-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-stone-100 border border-stone-300 rounded-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-stone-100 border border-stone-300 rounded-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-stone-100 border border-stone-300 rounded-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project, idea, or just say hello..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-stone-900 text-stone-50 px-8 py-4 rounded-none hover:bg-stone-800 transition-colors transform hover:scale-105 font-medium"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-8 relative">
                <span className="relative z-10">Other ways to reach me</span>
                <div className="absolute -bottom-1 left-0 w-40 h-3 bg-emerald-300/40 -rotate-1 -z-10 highlight-permanent" />
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-stone-100 border-l-4 border-blue-400 p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rotate-1 hover:rotate-0">
                <div className="flex items-center gap-4 mb-4">
                  <Mail className="w-6 h-6 text-stone-700" />
                  <h3 className="text-lg font-bold text-stone-900 font-mono">Email</h3>
                </div>
                <p className="text-stone-700 mb-2">For professional inquiries and collaborations</p>
                <a 
                  href="mailto:arsharshj@gmail.com" 
                  className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  arsharshj@gmail.com
                </a>
              </div>

              <div className="bg-stone-100 border-l-4 border-emerald-500 p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 -rotate-1 hover:rotate-0">
                <div className="flex items-center gap-4 mb-4">
                  <MapPin className="w-6 h-6 text-stone-700" />
                  <h3 className="text-lg font-bold text-stone-900 font-mono">Location</h3>
                </div>
                <p className="text-stone-700 mb-2">Currently based in</p>
                <p className="text-stone-800 font-medium">New York City, NY</p>
              </div>

              <div className="bg-stone-100 border-l-4 border-rose-400 p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rotate-1 hover:rotate-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-6 h-6 text-stone-700">🌐</div>
                  <h3 className="text-lg font-bold text-stone-900 font-mono">Social</h3>
                </div>
                <p className="text-stone-700 mb-4">Find me on these platforms</p>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/arshjain08" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/arsh-jain08/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://x.com/ArshJain08" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-stone-100 border-l-4 border-purple-500 p-6 shadow-md">
              <h3 className="text-lg font-bold text-stone-900 font-mono mb-4">Response Time</h3>
              <p className="text-stone-700 text-sm leading-relaxed">
                I typically respond to emails within 24-48 hours. For urgent matters, 
                feel free to reach out on LinkedIn for a quicker response.
              </p>
            </div>
          </motion.div>
        </div>

      </main>
    </div>
  );
}