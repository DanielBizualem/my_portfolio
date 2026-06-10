'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Sun, Moon, Menu, X } from 'lucide-react';
import Link from 'next/link';

interface Stat {
  number: string;
  label: string;
}

interface HeroProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeroSection({ isDarkMode, setIsDarkMode }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Typewriter effect state
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ['Full Stack Developer', 'Software Engineer'];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Typewriter effect logic
  useEffect(() => {
    const handleType = () => {
      const currentWordIndex = loopNum % words.length;
      const fullWord = words[currentWordIndex];

      if (isDeleting) {
        setTypedText(fullWord.substring(0, typedText.length - 1));
        setTypingSpeed(50);
      } else {
        setTypedText(fullWord.substring(0, typedText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && typedText === fullWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed]);

  // Integrated Smooth Scroll Engine
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.toLowerCase());
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // Update browser history hash without a harsh layout jump
      window.history.pushState(null, '', `#${targetId.toLowerCase()}`);
    }
  };

  const stats: Stat[] = [
    { number: '3+', label: 'Years of experience' },
    { number: '6+', label: 'Projects completed' },
    { number: '12+', label: 'Technologies mastered' },
  ];

  const GitHubIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );

  const LinkedInIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );

  const InstagramIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );

  const socialLinks = [
    { icon: GitHubIcon, href: 'https://github.com/DanielBizualem', label: 'GitHub' },
    { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/daniel-bizualem-34289938a/', label: 'Linkedin' },
    { icon: InstagramIcon, href: 'https://www.instagram.com/daniel_bizualem/', label: 'Instagram' },
  ];

  const navLinks = ['Home', 'About', 'Skills', 'Services', 'Projects', 'Contact'];

  return (
    <div className={`min-h-screen flex flex-col justify-between relative overflow-x-hidden font-sans antialiased p-3 sm:p-4 md:p-8 transition-colors duration-500 selection:bg-cyan-500 selection:text-slate-900 ${
      isDarkMode ? 'bg-[#06141d] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Outer border container accent */}
      <div className={`absolute inset-0 border rounded-2xl sm:rounded-3xl pointer-events-none m-1 sm:m-2 md:m-4 z-40 transition-colors duration-500 ${
        isDarkMode ? 'border-cyan-500/20' : 'border-slate-300'
      }`}></div>

      {/* Decorative Dot Matrices */}
      <div 
        className={`absolute top-20 left-6 sm:left-10 w-32 h-32 sm:w-48 sm:h-48 pointer-events-none z-0 opacity-25 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]`}
        style={{ backgroundImage: `radial-gradient(${isDarkMode ? 'rgba(34,211,238,0.15)' : 'rgba(59,130,246,0.15)'} 1.5px, transparent 1.5px)`, backgroundSize: '16px 16px' }}
      ></div>

      {/* Header / Navbar */}
      <nav className="w-full max-w-7xl mx-auto flex justify-between items-center px-3 sm:px-4 md:px-8 py-4 sm:py-5 relative z-50">
        <div className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1">
          Portfolio
          <span className={`w-2 h-2 rounded-full inline-block ${isDarkMode ? 'bg-cyan-400' : 'bg-blue-600'}`}></span>
        </div>

        {/* Navigation Links - Desktop Only */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium tracking-wide">
          {navLinks.map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleScroll(e, item)}
              className={`transition-colors duration-300 ${
                index === 0 
                  ? (isDarkMode ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : 'text-blue-600 border-b-2 border-blue-600 pb-1') 
                  : (isDarkMode ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-600 hover:text-blue-600')
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Theme Toggle Button & CV CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Functional Light / Dark switch */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle Theme"
            className={`flex items-center rounded-full p-1 w-12 sm:w-14 h-6 sm:h-7 cursor-pointer transition-colors duration-300 relative border ${
              isDarkMode ? 'bg-[#0a2230] border-cyan-900/50' : 'bg-slate-200 border-slate-300'
            }`}
          >
            <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all duration-300 transform shadow-md ${
              isDarkMode ? 'bg-cyan-400 translate-x-6 sm:translate-x-7' : 'bg-white translate-x-0'
            }`}>
              {isDarkMode ? (
                <Moon className="w-2.5 h-2.5 text-slate-950" fill="currentColor" />
              ) : (
                <Sun className="w-2.5 h-2.5 text-amber-500" fill="currentColor" />
              )}
            </div>
          </button>

          <a
            href="/CV.pdf" 
            download="Daniel_Bizualem_CV.pdf" 
            className="hidden sm:flex px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-[#e11d48] hover:bg-[#be123c] text-white font-semibold text-xs tracking-wide uppercase transition-all duration-300 items-center gap-2 shadow-lg shadow-rose-900/20 no-underline cursor-pointer"
          >
            <span>CV</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </a>

          {/* Mobile Menu Toggle button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-1.5 rounded-lg border transition-colors ${
              isDarkMode ? 'border-slate-800 bg-slate-900/50 text-slate-300' : 'border-slate-200 bg-white text-slate-700'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu Layer */}
      <div className={`md:hidden fixed inset-0 z-40 bg-opacity-50 backdrop-blur-md transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`w-full max-w-sm absolute top-20 right-4 p-6 rounded-2xl border shadow-xl flex flex-col gap-4 transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'
        } ${isDarkMode ? 'bg-[#092230] border-cyan-950 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleScroll(e, item);
              }}
              className={`text-sm font-semibold py-2 px-3 rounded-lg hover:bg-opacity-10 transition-colors ${
                isDarkMode ? 'hover:bg-cyan-400/10 hover:text-cyan-400' : 'hover:bg-blue-600/5 hover:text-blue-600'
              }`}
            >
              {item}
            </a>
          ))}
          <a 
            href="/CV.pdf"
            download="Daniel_Bizualem_CV.pdf"
            className="w-full mt-2 px-4 py-3 rounded-xl bg-[#e11d48] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 no-underline"
          >
            Download CV
          </a>
        </div>
      </div>

      {/* Main Layout Grid */}
      <main className="w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center px-3 sm:px-4 md:px-8 py-6 sm:py-8 relative z-10">
        
        {/* Content Box */}
        <div 
          className={`lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left order-2 lg:order-1 transition-all duration-1000 delay-200 relative ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Subtle background dot matrix anchored behind text layout */}
          <div 
            className="absolute -top-10 -left-6 w-32 h-32 pointer-events-none -z-10 opacity-40 hidden lg:block"
            style={{ backgroundImage: `radial-gradient(${isDarkMode ? '#22d3ee' : '#3b82f6'} 1px, transparent 1px)`, backgroundSize: '12px 12px' }}
          ></div>

          <div className="space-y-1.5 sm:space-y-2">
            <span className={`text-xs sm:text-sm font-semibold tracking-wider uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} font-mono`}>Hello 🖐️, I'm</span>
            
            <h1 className={`text-3xl sm:text-5xl md:text-6xl font-mono font-extrabold tracking-tight leading-tight bg-clip-text text-transparent pb-1 transition-all duration-500 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-white via-slate-200 to-cyan-400' 
                : 'bg-gradient-to-r from-slate-900 via-slate-800 to-blue-600'
            }`}>
              Daniel Bizualem
            </h1>
            
            {/* Animated Typing Header */}
            <div className={`text-lg sm:text-xl md:text-2xl font-bold min-h-[40px] flex items-center justify-center lg:justify-start ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
              <span>And I'm a&nbsp;</span>
              <span className={`inline-flex items-center tracking-wide font-extrabold ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                {typedText}
                <span className={`w-0.5 h-6 ml-1 inline-block animate-blink ${isDarkMode ? 'bg-cyan-400' : 'bg-blue-600'}`}></span>
              </span>
            </div>
          </div>

          <p className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            AI-Driven Full-Stack Engineer | BSc in Software Engineering (ASTU). Building intelligent, scalable web applications from frontend to backend.
          </p>

          {/* Social Icons Link Matrix */}
          <div className="flex justify-center lg:justify-start gap-3 pt-1">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                href={social.href}
                aria-label={social.label}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded flex items-center justify-center transition-all duration-300 transform hover:-translate-y-0.5 shadow-md border ${
                  isDarkMode 
                    ? 'bg-[#092230] border-cyan-500/20 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400 hover:text-slate-950' 
                    : 'bg-white border-slate-200 text-blue-600 hover:border-blue-600 hover:bg-blue-600 hover:text-white'
                }`}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
            <Link
              href="/hire"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto px-6 py-3 rounded font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-[0.98] ${
                isDarkMode
                  ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/10'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/10'
              }`}
            >
              Hire Me
            </Link>
            <a 
              href="#contact"
              onClick={(e) => handleScroll(e, 'contact')}
              className={`w-full sm:w-auto px-6 py-3 rounded border font-bold text-sm tracking-wide text-center transition-all duration-300 cursor-pointer ${
                isDarkMode ? 'border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10' : 'border-blue-600/40 text-blue-600 hover:bg-blue-50/50'
              }`}
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Avatar Image with Active Border Animation */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 relative py-4 lg:py-0">
          
          {/* Avatar Dot Matrix Accent */}
          <div 
            className="absolute -top-2 -right-2 sm:-top-6 sm:-right-6 w-24 h-24 sm:w-36 sm:h-36 pointer-events-none z-0 opacity-50"
            style={{ backgroundImage: `radial-gradient(${isDarkMode ? '#22d3ee' : '#3b82f6'} 1.5px, transparent 1.5px)`, backgroundSize: '14px 14px' }}
          ></div>

          <div 
            className={`relative w-60 h-60 sm:w-72 sm:h-72 md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px] transition-all duration-1000 transform z-10 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            {/* Ambient Back Blur Light matching context theme */}
            <div className={`absolute inset-4 rounded-full filter blur-3xl -z-10 animate-pulse ${
              isDarkMode ? 'bg-cyan-500/20' : 'bg-blue-500/10'
            }`}></div>

            {/* Profile Frame with Continuous Animated Gradient Rotating Conic Border */}
            <div className={`w-full h-full p-1 blob-shape overflow-hidden relative flex items-center justify-center shadow-2xl ${
              isDarkMode ? 'bg-slate-900/40' : 'bg-slate-100'
            }`}>
              {/* Spinning gradient ring wrapper */}
              <div className="absolute w-[150%] h-[150%] animate-spin-slow -z-10 opacity-90 rounded-full bg-[conic-gradient(from_0deg,transparent_20%,#22d3ee_40%,#3b82f6_60%,transparent_80%,#e11d48_100%)]"></div>
              
              <div className={`w-full h-full blob-shape overflow-hidden relative flex items-center justify-center transition-colors duration-500 ${
                isDarkMode ? 'bg-[#0a1f2c]' : 'bg-white'
              }`}>
                <img
                  src="https://res.cloudinary.com/djxfy60tt/image/upload/v1781121755/dani_copy_tbndsm.webp"
                  alt="Daniel Bizualem"
                  className="w-[93%] h-[93%] object-cover blob-shape object-top z-10"
                />
              </div>
            </div>

            {/* Asymmetrical Accent Trace Outer Ring */}
            <div className={`absolute -inset-2 border blob-shape pointer-events-none transform rotate-6 transition-colors duration-500 ${
              isDarkMode ? 'border-cyan-400/30' : 'border-blue-500/20'
            }`}></div>
          </div>
        </div>

      </main>

      {/* Footer System Metrics/Stats Section */}
      <footer className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-8 pt-8 lg:pt-12 pb-4">
        <div className={`border-t grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-y-8 py-6 sm:py-8 items-center text-center transition-colors duration-500 ${
          isDarkMode ? 'border-cyan-900/60' : 'border-slate-200'
        }`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              } ${
                index !== 3 ? (isDarkMode ? 'lg:border-r lg:border-cyan-900/40' : 'lg:border-r lg:border-slate-200') : ''
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              <div className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {stat.number}
              </div>
              <div className={`text-[10px] sm:text-xs uppercase tracking-widest font-medium max-w-[120px] text-center md:text-left leading-tight ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </footer>

      {/* Custom Keyframes Injections */}
      <style jsx global>{`
        .blob-shape {
          border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }
      `}</style>
    </div>
  );
}