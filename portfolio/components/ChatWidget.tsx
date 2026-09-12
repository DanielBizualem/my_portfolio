'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import Axios from '@/utils/Axios';
import summeryApi from '@/common/summeryApi';

interface ChatWidgetProps {
  isDarkMode: boolean;
}

interface Message {
  role: 'user' | 'ai';
  text: string;
}

// Restrained, single-accent palette — no gradients, no glow.
const NAVY = '#101828';
const ACCENT = '#3E6D8E';

function Badge({ size = 28 }: { size?: number }) {
  return (
    <div
      className="flex-shrink-0 rounded-md flex items-center justify-center"
      style={{ width: size, height: size, backgroundColor: ACCENT }}
    >
      <MessageSquare size={size * 0.5} className="text-white" strokeWidth={2} />
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"
          style={{ animationDelay: `${i * 0.2}s`, animationDuration: '1.2s' }}
        />
      ))}
    </div>
  );
}

export default function ChatWidget({ isDarkMode }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hello. I'm Daniel's assistant — happy to answer questions about his experience, projects, or skills." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await Axios({
        ...summeryApi.chat,
        data: { message: userMessage }
      });

      setMessages((prev) => [...prev, { role: 'ai', text: response.data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'ai', text: "Something went wrong on our end. Please try again shortly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end font-sans antialiased">

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`mb-3 w-[calc(100vw-32px)] sm:w-[380px] h-[72vh] sm:h-[520px] max-h-[calc(100vh-120px)] flex flex-col rounded-lg overflow-hidden border origin-bottom-right animate-in fade-in slide-in-from-bottom-1 duration-150 ${
            isDarkMode
              ? 'bg-[#0e1420] border-white/10 shadow-xl shadow-black/50'
              : 'bg-white border-slate-200 shadow-xl shadow-slate-900/10'
          }`}
        >
          {/* Header */}
          <div className="px-5 py-4 flex items-center gap-3 flex-shrink-0" style={{ backgroundColor: NAVY }}>
            <Badge size={32} />
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] font-medium text-white truncate">
                Daniel's Assistant
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                Answers questions about his work
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close chat window"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin ${isDarkMode ? 'bg-[#0e1420]' : 'bg-slate-50'}`}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 text-[13px] leading-relaxed rounded-lg border ${
                    msg.role === 'user'
                      ? 'text-white border-transparent'
                      : isDarkMode
                        ? 'bg-white/[0.04] border-white/10 text-slate-200'
                        : 'bg-white border-slate-200 text-slate-700'
                  }`}
                  style={msg.role === 'user' ? { backgroundColor: ACCENT } : undefined}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className={`px-3.5 py-3 rounded-lg border ${
                    isDarkMode ? 'bg-white/[0.04] border-white/10 text-slate-400' : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className={`p-3 flex-shrink-0 flex gap-2 items-center ${
              isDarkMode ? 'bg-[#0e1420] border-t border-white/10' : 'bg-white border-t border-slate-200'
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Type your question..."
              className={`flex-1 px-3.5 py-2.5 rounded-md border text-[13px] outline-none transition-colors disabled:opacity-50 ${
                isDarkMode
                  ? 'bg-white/[0.04] border-white/10 text-white placeholder-slate-500 focus:border-white/25'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-400'
              }`}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-3.5 py-2.5 rounded-md flex items-center justify-center flex-shrink-0 text-white transition-opacity disabled:opacity-30"
              style={{ backgroundColor: NAVY }}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-150 hover:opacity-90 shadow-lg"
        style={{ backgroundColor: NAVY, boxShadow: '0 6px 20px -6px rgba(16, 24, 40, 0.5)' }}
      >
        {isOpen ? (
          <X size={20} className="text-white" />
        ) : (
          <MessageSquare size={20} className="text-white" strokeWidth={2} />
        )}
      </button>

    </div>
  );
}