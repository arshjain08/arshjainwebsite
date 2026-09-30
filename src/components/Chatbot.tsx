'use client';

import { ArrowUp, MessageSquare, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'intro', text: 'Welcome to the Arsh appreciation zone 😎 Ask me anything about this absolute legend.', sender: 'bot' },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    const message = inputValue.trim();
    if (!message || isLoading) return;
    setMessages((current) => [...current, { id: `${Date.now()}-user`, text: message, sender: 'user' }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setMessages((current) => [...current, {
        id: `${Date.now()}-bot`,
        text: response.ok ? data.text : data.error || 'The archive is unavailable right now.',
        sender: 'bot',
      }]);
    } catch {
      setMessages((current) => [...current, { id: `${Date.now()}-error`, text: 'The archive is unavailable right now.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 border border-[var(--ink)] bg-[var(--paper)] px-3 py-2 text-xs font-medium shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
      >
        <MessageSquare size={15} /> Ask the GlazeBot
      </button>
    );
  }

  return (
    <section className="fixed bottom-4 right-4 z-50 flex h-[min(520px,calc(100dvh-2rem))] w-[min(390px,calc(100vw-2rem))] flex-col border border-[var(--ink)] bg-[var(--paper)] shadow-[6px_6px_0_var(--ink)] sm:bottom-6 sm:right-6 sm:shadow-[8px_8px_0_var(--ink)]">
      <header className="flex items-center justify-between border-b rule px-4 py-3">
        <div>
          <p className="text-xs text-[var(--muted)]">Unbiased reporting*</p>
          <h2 className="text-sm font-semibold">Arsh GlazeBot</h2>
        </div>
        <button onClick={() => setIsOpen(false)} aria-label="Close chat"><X size={18} /></button>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto p-4 text-sm">
        {messages.map((message) => (
          <div key={message.id} className={message.sender === 'user' ? 'ml-10' : 'mr-8'}>
            <p className="mb-1 text-xs text-[var(--muted)]">{message.sender === 'user' ? 'You' : 'Assistant'}</p>
            <p className={message.sender === 'user' ? 'border-l-2 border-[var(--accent)] pl-3' : 'font-serif text-base leading-relaxed'}>{message.text}</p>
          </div>
        ))}
        {isLoading && <p className="text-xs text-[var(--muted)] animate-pulse">Thinking…</p>}
        <div ref={endRef} />
      </div>

      <div className="border-t rule p-3">
        <div className="flex items-end gap-2">
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
            placeholder="What are you looking for?"
            className="index-field flex-1 text-sm"
          />
          <button onClick={sendMessage} disabled={!inputValue.trim() || isLoading} className="grid h-10 w-10 place-items-center bg-[var(--ink)] text-[var(--paper)] disabled:opacity-30" aria-label="Send message">
            <ArrowUp size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
