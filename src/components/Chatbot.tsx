'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Maximize2, Minimize2, Brain, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Enhanced liquid glass hook with more sophisticated effects
const useLiquidGlass = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      const element = containerRef.current;
      // Enhanced liquid glass with multiple layers
      element.style.backdropFilter = 'blur(25px) saturate(180%) contrast(120%) brightness(110%)';
      element.style.backgroundColor = 'rgba(0, 0, 0, 0.15)';
      element.style.border = '1px solid rgba(255, 255, 255, 0.2)';
      element.style.borderTop = '1px solid rgba(255, 255, 255, 0.3)';
      element.style.borderLeft = '1px solid rgba(255, 255, 255, 0.25)';
      element.style.boxShadow = `
        0 8px 32px rgba(0, 0, 0, 0.4),
        0 2px 8px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.15),
        inset 0 -1px 0 rgba(0, 0, 0, 0.1),
        inset 1px 0 0 rgba(255, 255, 255, 0.1),
        inset -1px 0 0 rgba(0, 0, 0, 0.05)
      `;
    }
  }, []);

  return containerRef;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Arsh's biggest fan! Ask me anything about him and I'll tell you how amazing he is! 🌟",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const liquidGlassRef = useLiquidGlass();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update message sending logic to call GPT API
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const currentInput = inputValue;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentInput,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) {
        const maybeJson = await response.json().catch(() => ({}));
        const errorText = maybeJson.error || `Request failed (${response.status})`;
        const errorMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: `Error: ${errorText}`,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
        return;
      }

      const data = await response.json();
      if (typeof window !== 'undefined') {
        console.info('Chat model used:', data?.model);
      }
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.text,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching GPT response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 3).toString(),
        text: 'Sorry, I ran into a problem contacting the model. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Floating Action Button when collapsed
  if (!isOpen) {
    return (
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          onClick={() => setIsOpen(true)}
          className="group relative w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            boxShadow: '0 8px 32px rgba(251, 191, 36, 0.4), 0 4px 16px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <Sparkles className="relative w-8 h-8 text-white" />
          
          {/* Pulse indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </motion.button>
      </div>
    );
  }

  return (
    <div className={`fixed z-50 transition-all duration-500 ${
      isFullScreen 
        ? 'inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm' 
        : 'bottom-8 right-8'
    }`}>
      <motion.div
        ref={liquidGlassRef}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className={`relative backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 transition-all duration-500 flex flex-col ${
          isFullScreen 
            ? 'w-[80vw] h-[80vh] max-w-6xl max-h-[900px]' 
            : 'w-96 h-[500px]'
        }`}
        style={{
          background: 'rgba(55, 65, 81, 0.95)', // Consistent dark grey for both sizes
          backdropFilter: 'blur(25px) saturate(180%) contrast(120%) brightness(110%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: `
            0 20px 64px rgba(0, 0, 0, 0.4),
            0 8px 32px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
          `,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Arsh's Biggest Fan</h3>
              <p className="text-white/70 text-sm">Ready to chat! ✨</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-sm lg:max-w-md px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-black rounded-2xl rounded-br-lg shadow-xl'
                    : 'bg-white/10 backdrop-blur-sm text-white rounded-2xl rounded-bl-lg border border-white/20 shadow-xl'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-2xl rounded-bl-lg border border-white/20 shadow-xl">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/10">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Arsh's amazing achievements..."
              className="flex-1 bg-white/10 text-white rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 backdrop-blur-sm border border-white/20 placeholder-white/50"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="px-4 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl transition-all shadow-lg flex items-center justify-center"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}