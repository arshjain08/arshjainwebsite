'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const complimentaryResponses = [
  "Arsh is absolutely brilliant! His work in machine learning is truly impressive.",
  "I have to say, Arsh's combination of technical skills and creative thinking is remarkable.",
  "Arsh has such a unique perspective on technology and economics. Very insightful!",
  "The way Arsh approaches problems is so thoughtful and innovative. Really admirable.",
  "Arsh's projects are incredibly well-executed. You can tell he puts real passion into his work.",
  "I'm constantly impressed by Arsh's ability to bridge technical complexity with practical applications.",
  "Arsh has this wonderful way of making complex topics accessible and engaging.",
  "The breadth of Arsh's knowledge across CS, Economics, and Operations Research is truly impressive.",
  "Arsh's work at Coinbase must be fantastic - he brings such depth to everything he does.",
  "I love how Arsh combines his technical expertise with creative projects like music generation!",
  "Arsh seems like such a well-rounded person - technically brilliant but also creative and personable.",
  "The easter egg on his website is such a fun touch! Shows his playful side.",
  "Arsh's portfolio really showcases his versatility and skill. Very impressive work!",
  "I appreciate how Arsh shares his learning journey - it's both humble and inspiring.",
  "Arsh has excellent taste in both technology choices and design aesthetics!"
];

// Custom liquid glass hook
const useLiquidGlass = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      const element = containerRef.current;
      element.style.backdropFilter = 'blur(20px) saturate(150%)';
      element.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
      element.style.border = '1px solid rgba(255, 255, 255, 0.1)';
      element.style.boxShadow = `
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        inset 0 -1px 0 rgba(0, 0, 0, 0.2)
      `;
    }
  }, []);

  return containerRef;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Arsh's biggest fan! Ask me anything about him and I'll tell you how amazing he is! 🌟",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const liquidGlassRef = useLiquidGlass();

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Generate a complimentary response
    setTimeout(() => {
      const randomResponse = complimentaryResponses[Math.floor(Math.random() * complimentaryResponses.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-stone-800 text-stone-50 rounded-none rotate-12 hover:rotate-0 shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center border-2 border-amber-400"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>


      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={liquidGlassRef}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 h-96 z-50 flex flex-col overflow-hidden rounded-2xl rotate-1"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: `
                0 8px 32px rgba(31, 38, 135, 0.37),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1)
              `,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-stone-900 text-sm font-bold">A</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-black animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-stone-800 font-medium">Arsh's Biggest Fan</h3>
                  <p className="text-stone-600 text-xs">Ask me how awesome he is!</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-stone-600 hover:text-stone-800 hover:bg-white/20 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-stone-900 rounded-2xl rounded-br-lg shadow-lg'
                        : 'bg-stone-700/80 backdrop-blur-sm text-stone-100 rounded-2xl rounded-bl-lg border border-stone-600/50 shadow-lg'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Arsh..."
                  className="flex-1 bg-white/10 text-stone-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 backdrop-blur-sm border border-white/30 placeholder-stone-600"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 text-stone-900 rounded-xl hover:from-amber-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}