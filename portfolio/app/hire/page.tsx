'use client';

import React, { useState } from 'react';
import HireMeForm from '@/components/Hire';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

export default function HirePage() {
  // Maintaining a local dark mode toggle state if this page sits outside your main layout context
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <main className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? 'bg-[#06141d]' : 'bg-slate-50'
    }`}>
      
      {/* Minimal Sticky Utilities Bar */}
      <nav className={`max-w-7xl mx-auto px-6 py-4 flex items-center justify-between border-b ${
        isDarkMode ? 'border-cyan-950/40' : 'border-slate-200'
      }`}>
        <Link 
          href="/"
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${
            isDarkMode ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-600 hover:text-blue-600'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        {/* Quick Theme Switcher for Standalone UX */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-lg border transition-all ${
            isDarkMode 
              ? 'bg-cyan-950/30 border-cyan-500/20 text-cyan-400 hover:bg-cyan-950/60' 
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </nav>

      {/* Render Form Container */}
      <div className="py-8">
        <HireMeForm isDarkMode={isDarkMode} />
      </div>

    </main>
  );
}