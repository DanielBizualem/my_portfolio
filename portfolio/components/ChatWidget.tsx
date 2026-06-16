'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import Axios from '@/utils/Axios';
import summeryApi from '@/common/summeryApi';

interface ChatWidgetProps {
  isDarkMode: boolean;
}

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export default function ChatWidget({ isDarkMode }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hi! I'm Daniel's AI assistant. Ask me anything about his experience, projects, or skills!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      }
      );

      setMessages((prev) => [...prev, { role: 'ai', text: response.data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'ai', text: "Network error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end font-sans antialiased">
      
      {/* The Chat Window */}
      {isOpen && (
        <div 
          className={`mb-4 w-[calc(100vw-32px)] sm:w-96 h-[75vh] sm:h-[500px] max-h-[calc(100vh-120px)] flex flex-col rounded-2xl shadow-2xl overflow-hidden border transition-all duration-300 transform origin-bottom-right animate-in fade-in slide-in-from-bottom-4 duration-200 ${
            isDarkMode ? 'bg-[#0a1f2c] border-cyan-500/10 shadow-cyan-950/40' : 'bg-white border-slate-200 shadow-slate-300/50'
          }`}
        >
          {/* Chat Header */}
          <div className={`p-4 flex justify-between items-center ${
            isDarkMode ? 'bg-[#0e293a] border-b border-cyan-500/10 text-white' : 'bg-blue-600 text-white'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDarkMode ? 'bg-cyan-400' : 'bg-emerald-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isDarkMode ? 'bg-cyan-400' : 'bg-emerald-400'}`}></span>
              </div>
              <div>
                <h3 className="font-bold text-xs md:text-sm tracking-wide">Portfolio Assistant</h3>
                <p className={`text-[10px] opacity-80 font-medium ${isDarkMode ? 'text-cyan-400' : 'text-blue-100'}`}>RAG Pipeline Active</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors duration-200"
              aria-label="Close chat window"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin ${isDarkMode ? 'bg-[#06141d]' : 'bg-slate-50'}`}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs md:text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? (isDarkMode ? 'bg-cyan-500 text-slate-950 rounded-br-none font-medium' : 'bg-blue-600 text-white rounded-br-none font-medium')
                      : (isDarkMode ? 'bg-[#0a1f2c] text-slate-200 rounded-bl-none border border-cyan-950' : 'bg-white text-slate-700 rounded-bl-none border border-slate-100')
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`rounded-2xl px-4 py-3 rounded-bl-none border ${
                  isDarkMode ? 'bg-[#0a1f2c] border-cyan-950 text-cyan-400' : 'bg-white border-slate-100 text-blue-600 shadow-sm'
                }`}>
                  <Loader2 size={16} className="animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form 
            onSubmit={handleSend} 
            className={`p-3 border-t flex gap-2 items-center ${isDarkMode ? 'bg-[#0a1f2c] border-cyan-500/10' : 'bg-white border-slate-100'}`}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, experience..."
              className={`flex-1 px-4 py-2.5 rounded-xl text-xs md:text-sm outline-none transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-[#06141d] text-white placeholder-slate-500 border border-cyan-950 focus:border-cyan-500/40' 
                  : 'bg-slate-100 text-slate-900 placeholder-slate-400 border border-transparent focus:bg-white focus:border-blue-500/30'
              }`}
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                isDarkMode 
                  ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:opacity-30 disabled:hover:bg-cyan-500 shadow-lg shadow-cyan-500/10' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-30 disabled:hover:bg-blue-600 shadow-lg shadow-blue-600/10'
              }`}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Premium Multi-Layer Toggle Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Portfolio Chat" : "Open Portfolio Chat"}
        className={`w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 group relative shadow-2xl ${
          isDarkMode 
            ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/20' 
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30'
        }`}
      >
        {/* Ambient Pulsing Halo Overlay when closed */}
        {!isOpen && (
          <span className={`absolute inset-0 rounded-full animate-ping opacity-25 scale-105 transition-colors duration-300 ${
            isDarkMode ? 'bg-cyan-400' : 'bg-blue-500'
          }`} style={{ animationDuration: '3s' }}></span>
        )}

        {/* Smooth rotative icon transition overlay */}
        <div className="transition-transform duration-300 transform group-hover:rotate-6">
          {isOpen ? <X size={22} className="animate-in fade-in zoom-in-75 duration-200" /> : <MessageSquare size={22} className="animate-in fade-in zoom-in-75 duration-200" />}
        </div>
      </button>

    </div>
  );
}