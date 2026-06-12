'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface Stat {
  number: string;
  label: string;
}

interface HeroProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5; 
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 1.3 + 1.1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > this.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.height) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function HeroSection({ isDarkMode, setIsDarkMode }: HeroProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ['Full Stack Developer', 'Software Engineer'];
  const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Services', 'Contact'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const maxParticles = width < 768 ? 80 : 150;
    const particles: Particle[] = [];

    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle(width, height));
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles.forEach(p => { p.width = width; p.height = height; });
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const nodeColor = isDarkMode ? 'rgba(34, 211, 238, 0.7)' : 'rgba(37, 99, 235, 0.6)';
      const rawColorStr = isDarkMode ? '34, 211, 238' : '37, 99, 235';

      particles.forEach((p) => {
        p.update();
        p.draw(ctx, nodeColor);
      });

      const maxLinkDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxLinkDist) {
            const alpha = (1 - distance / maxLinkDist) * 0.15;
            ctx.strokeStyle = `rgba(${rawColorStr}, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    navLinks.forEach((link) => {
      const element = document.getElementById(link.toLowerCase());
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(targetId.toLowerCase());
      window.history.pushState(null, '', `#${targetId.toLowerCase()}`);
    }
  };

  const stats: Stat[] = [
    { number: '3+', label: 'Years of experience' },
    { number: '6+', label: 'Projects completed' },
    { number: '12+', label: 'Technologies mastered' },
  ];

  return (
    <div id="home" className={`min-h-screen flex flex-col justify-between relative overflow-x-hidden font-sans antialiased p-3 sm:p-4 md:p-8 transition-colors duration-500 selection:bg-cyan-500 selection:text-slate-900 ${
      isDarkMode ? 'bg-[#06141d]' : 'bg-slate-50'
    }`}>
      
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      <div className={`absolute inset-0 border rounded-2xl sm:rounded-3xl pointer-events-none m-1 sm:m-2 md:m-4 z-40 transition-colors duration-500 ${
        isDarkMode ? 'border-cyan-500/20' : 'border-slate-300'
      }`}></div>

      {/* FIXED NAVIGATION HEADER */}
      <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 w-full px-5 sm:px-8 md:px-16 pointer-events-none">
        <header className={`w-full max-w-7xl mx-auto rounded-xl transition-all duration-300 backdrop-blur-md border pointer-events-auto shadow-lg ${
          isDarkMode ? 'bg-[#06141d]/75 border-cyan-500/10 shadow-cyan-950/20' : 'bg-slate-50/75 border-slate-200 shadow-slate-200/50'
        }`}>
          <motion.nav initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full flex justify-between items-center px-4 sm:px-6 md:px-8 py-4">
            {/* FIXED DB LOGO VISIBILITY BELOW */}
            <div className={`text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1 transition-colors duration-500 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              DB<span className={`w-2 h-2 rounded-full inline-block ${isDarkMode ? 'bg-cyan-400' : 'bg-blue-600'}`}></span>
            </div>

            <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium tracking-wide">
              {navLinks.map((item) => {
                const isCurrent = activeSection === item.toLowerCase();
                return (
                  <motion.a whileHover={{ y: -2 }} whileTap={{ y: 0 }} key={item} href={`#${item.toLowerCase()}`} onClick={(e) => handleScroll(e, item)}
                    className={`transition-all duration-300 relative pb-1 ${
                      isCurrent ? (isDarkMode ? 'text-cyan-400 font-bold' : 'text-blue-600 font-bold') : (isDarkMode ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-600 hover:text-blue-600')
                    }`}
                  >
                    {item}
                    {isCurrent && (
                      <motion.div layoutId="activeUnderline" className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${isDarkMode ? 'bg-cyan-400' : 'bg-blue-600'}`} transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                    )}
                  </motion.a>
                );
              })}
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button onClick={() => setIsDarkMode(!isDarkMode)} aria-label="Toggle Theme" className={`flex items-center rounded-full p-1 w-12 sm:w-14 h-6 sm:h-7 cursor-pointer transition-colors duration-300 relative border ${isDarkMode ? 'bg-[#0a2230] border-cyan-900/50' : 'bg-slate-200 border-slate-300'}`}>
                <motion.div layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-md ${isDarkMode ? 'bg-cyan-400 ml-auto' : 'bg-white mr-auto'}`}>
                  {isDarkMode ? <Moon className="w-2.5 h-2.5 text-slate-950" fill="currentColor" /> : <Sun className="w-2.5 h-2.5 text-amber-500" fill="currentColor" />}
                </motion.div>
              </button>

              <motion.a whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.98 }} href="/CV.pdf" download="Daniel_Bizualem_CV.pdf" className={`hidden sm:flex px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold text-xs tracking-wide transition-all duration-300 items-center gap-2 shadow-lg no-underline cursor-pointer ${isDarkMode ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                <span>Resume</span>
              </motion.a>

              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`md:hidden p-1.5 rounded-lg border ${isDarkMode ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'}`}>
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </motion.nav>
        </header>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="md:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`w-full max-w-sm absolute top-24 right-4 p-6 rounded-2xl border shadow-xl flex flex-col gap-4 ${isDarkMode ? 'bg-[#092230] border-cyan-950 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
              {navLinks.map((item) => {
                const isCurrent = activeSection === item.toLowerCase();
                return (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={(e) => { setIsMobileMenuOpen(false); handleScroll(e, item); }}
                    className={`text-sm font-semibold py-2 px-3 rounded-lg ${isCurrent ? 'bg-cyan-400/10 text-cyan-400' : 'hover:bg-blue-600/5'}`}
                  >
                    {item}
                  </a>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO CONTENT */}
      <main className="w-full max-w-7xl mx-auto flex-1 flex items-center justify-center px-3 sm:px-4 md:px-8 pt-28 pb-12 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-3xl mx-auto space-y-6 text-center flex flex-col items-center justify-center relative">
          <motion.div variants={itemVariants} className="space-y-2 w-full flex flex-col items-center">
            <span className={`text-xs sm:text-sm font-semibold tracking-wider uppercase block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} font-mono`}>Hello 🖐️, I'm</span>
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-extrabold tracking-tight leading-tight bg-clip-text text-transparent pb-1 ${
              isDarkMode ? 'bg-gradient-to-r from-white via-slate-200 to-cyan-400' : 'bg-gradient-to-r from-slate-900 via-slate-800 to-blue-600'
            }`}>
              Daniel Bizualem
            </h1>
            <div className={`text-lg sm:text-xl md:text-2xl font-bold min-h-[40px] flex items-center justify-center ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
              <span>And I'm a&nbsp;</span>
              <span className={`inline-flex items-center tracking-wide font-extrabold ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                {typedText}
                <span className={`w-0.5 h-6 ml-1 inline-block animate-blink ${isDarkMode ? 'bg-cyan-400' : 'bg-blue-600'}`}></span>
              </span>
            </div>
          </motion.div>

          <motion.p variants={itemVariants} className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-xl text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            AI-Driven Full-Stack Engineer | BSc in Software Engineering (ASTU). Building intelligent, scalable web applications from frontend to backend.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <Link href="/hire" className={`w-full sm:w-40 px-6 py-3 rounded font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${isDarkMode ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>Hire Me</Link>
            <a onClick={(e) => handleScroll(e, 'contact')} className={`w-full sm:w-40 px-6 py-3 rounded border font-bold text-sm tracking-wide text-center transition-all duration-300 cursor-pointer flex items-center justify-center ${isDarkMode ? 'border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10' : 'border-blue-600/40 text-blue-600'}`}>Contact Me</a>
          </motion.div>
        </motion.div>
      </main>

      {/* STATS FOOTER */}
      <footer className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-8 pt-8 pb-4">
        <div className={`border-t grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 py-6 items-center text-center transition-colors duration-500 ${isDarkMode ? 'border-cyan-900/60' : 'border-slate-200'}`}>
          {stats.map((stat, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 ${index !== 3 ? (isDarkMode ? 'lg:border-r lg:border-cyan-900/40' : 'lg:border-r lg:border-slate-200') : ''}`}>
              <div className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{stat.number}</div>
              <div className={`text-[10px] sm:text-xs uppercase tracking-widest font-medium max-w-[120px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </footer>

      <style jsx global>{`
        @keyframes blink { 50% { opacity: 0; } }
        .animate-blink { animation: blink 0.8s step-end infinite; }
      `}</style>
    </div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};