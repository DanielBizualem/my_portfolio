'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon, Menu, X, Play, Terminal, GitBranch, Cloud, Braces, Bot, Workflow } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants, useReducedMotion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';

interface Stat {
  value: string;
  label: string;
}

interface HeroProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ROLES = ['Full Stack Developer', 'Software Engineer'];

const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Services', 'Contact'];

const stats: Stat[] = [
  { value: '3+ Years', label: 'experience' },
  { value: '6+', label: 'Projects' },
  { value: '12+', label: 'technologies' },
];

export default function HeroSection({ isDarkMode, setIsDarkMode }: HeroProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);

  // Theme tokens — modelled on GitHub's own editor palette, since the
  // hero itself is dressed as a code editor. Keeps the accent story
  // grounded in the subject instead of an arbitrary brand color.
  const theme = isDarkMode
    ? {
        pageBg: '#05080B',
        panelBg: '#0D1117',
        panelHeaderBg: '#151B23',
        panelBorder: '#21262D',
        frameBorder: 'rgba(48,54,61,0.55)',
        text: '#E6EDF3',
        textMuted: '#7D8590',
        comment: '#8B949E',
        keyword: '#FF7B72',
        string: '#A5D6FF',
        fn: '#D2A8FF',
        prop: '#79C0FF',
        accent: '#D2A8FF',
        accentText: '#05080B',
        dot: 'rgba(230,237,243,0.055)',
        grid: 'rgba(255,255,255,0.07)',
        nameStroke: '#FBBF24',
      }
    : {
        pageBg: '#FFFFFF',
        panelBg: '#F6F8FA',
        panelHeaderBg: '#EAEEF2',
        panelBorder: '#D0D7DE',
        frameBorder: 'rgba(31,35,40,0.12)',
        text: '#1F2328',
        textMuted: '#59636E',
        comment: '#6E7781',
        keyword: '#CF222E',
        string: '#0A3069',
        fn: '#8250DF',
        prop: '#0550AE',
        accent: '#8250DF',
        accentText: '#FFFFFF',
        dot: 'rgba(31,35,40,0.07)',
        grid: 'rgba(31,35,40,0.08)',
        nameStroke: '#1F2328',
      };

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
      const currentWordIndex = loopNum % ROLES.length;
      const fullWord = ROLES[currentWordIndex];

      if (isDeleting) {
        setTypedText(fullWord.substring(0, typedText.length - 1));
        setTypingSpeed(45);
      } else {
        setTypedText(fullWord.substring(0, typedText.length + 1));
        setTypingSpeed(110);
      }

      if (!isDeleting && typedText === fullWord) {
        setTimeout(() => setIsDeleting(true), 1600);
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

  return (
    <div
      id="home"
      className="min-h-screen flex flex-col justify-between relative overflow-x-hidden font-sans antialiased p-3 sm:p-4 md:p-8 transition-colors duration-500"
      style={{ backgroundColor: theme.pageBg }}
    >
      {/* Square grid background — static, no per-frame JS */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${theme.grid} 1px, transparent 1px), linear-gradient(90deg, ${theme.grid} 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 35%, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 35%, black 40%, transparent 90%)',
        }}
      />

      <div
        className="absolute inset-0 border rounded-2xl sm:rounded-3xl pointer-events-none m-1 sm:m-2 md:m-4 z-40 transition-colors duration-500"
        style={{ borderColor: theme.frameBorder }}
      />

      {/* NAVIGATION */}
      <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 w-full px-5 sm:px-8 md:px-16 pointer-events-none">
        <header
          className="w-full max-w-7xl mx-auto rounded-md backdrop-blur-md border pointer-events-auto shadow-lg transition-colors duration-500"
          style={{ backgroundColor: `${theme.panelBg}c0`, borderColor: theme.panelBorder }}
        >
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-between items-center px-4 sm:px-6 md:px-8 py-4"
          >
            <div className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-1.5 font-mono" style={{ color: theme.text }}>
            <span className="inline-flex items-center gap-2 text-base not-italic" style={{ WebkitTextStroke: '0px', color: theme.textMuted }}>
              <a 
                href="https://github.com/DanielBizualem" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="transition-colors duration-150 hover:opacity-80"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/daniel-bizualem-34289938a/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="transition-colors duration-150 hover:opacity-80"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://danielbizualem4@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="TikTok Profile"
                className="transition-colors duration-150 hover:opacity-80"
              >
                <HiOutlineMail className="w-5 h-5" />
              </a>
            </span>
            </div>

            <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
              {navLinks.map((item) => {
                const isCurrent = activeSection === item.toLowerCase();
                return (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleScroll(e, item)}
                    className="relative pb-1 transition-colors duration-300 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                    style={{ color: isCurrent ? theme.accent : theme.textMuted, outlineColor: theme.accent }}
                  >
                    {item}
                    {isCurrent && (
                      <motion.div
                        layoutId="activeUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                        style={{ backgroundColor: theme.accent }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                aria-label="Toggle theme"
                className="flex items-center rounded-full p-1 w-11 sm:w-12 h-6 cursor-pointer transition-colors duration-300 relative border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: theme.panelHeaderBg, borderColor: theme.panelBorder, outlineColor: theme.accent }}
              >
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${isDarkMode ? 'ml-auto' : 'mr-auto'}`}
                  style={{ backgroundColor: theme.accent }}
                >
                  {isDarkMode ? (
                    <Moon className="w-2.5 h-2.5" style={{ color: theme.accentText }} fill="currentColor" />
                  ) : (
                    <Sun className="w-2.5 h-2.5" style={{ color: theme.accentText }} fill="currentColor" />
                  )}
                </motion.div>
              </button>

              <a
                href="/Daniel-FullStack CV.pdf"
                download="Daniel_Bizualem_CV.pdf"
                className="hidden sm:flex px-4 py-2 sm:px-5 sm:py-2.5 rounded-md font-medium text-xs tracking-wide transition-colors duration-300 items-center gap-2 border no-underline cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ color: theme.text, borderColor: theme.panelBorder, outlineColor: theme.accent }}
              >
                Resume
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1.5 rounded-lg border"
                style={{ borderColor: theme.panelBorder, color: theme.text }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </motion.nav>
        </header>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm absolute top-24 right-4 p-4 rounded-2xl border shadow-xl flex flex-col gap-1"
              style={{ backgroundColor: theme.panelBg, borderColor: theme.panelBorder }}
            >
              {navLinks.map((item) => {
                const isCurrent = activeSection === item.toLowerCase();
                return (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      handleScroll(e, item);
                    }}
                    className="text-sm font-medium py-2.5 px-3 rounded-lg transition-colors"
                    style={{
                      color: isCurrent ? theme.accent : theme.text,
                      backgroundColor: isCurrent ? theme.panelHeaderBg : 'transparent',
                    }}
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
      <main className="w-full max-w-7xl mx-auto flex-1 flex items-center px-3 sm:px-4 md:px-8 pt-24 pb-12 relative z-10">
        <motion.div
          variants={heroTextContainer}
          initial="hidden"
          animate="visible"
          className="w-full max-w-2xl flex flex-col items-start text-left relative"
        >
          <motion.span variants={heroTextItem} className="text-[11px] sm:text-xs font-medium mb-3" style={{ color: theme.textMuted }}>
            Addis Abeba, Ethiopia
          </motion.span>

          <motion.p variants={heroTextItem} className="text-2xl sm:text-3xl font-bold" style={{ color: theme.text }}>
            Hi! I&apos;m
          </motion.p>

          <DevIllustration theme={theme} />

          <motion.h1
            variants={heroTextItem}
            className="text-6xl sm:text-6xl md:text-7xl font-black leading-[0.92] tracking-tight select-none"
            style={{ WebkitTextStroke: `2px ${theme.nameStroke}`, color: 'transparent' }}
          >
            <span className='mr-10 tracking-widest'>
              Daniel
              <br />
              Bizualem
            </span>
            
          </motion.h1>

          <p className="mt-4 font-mono text-sm sm:text-base font-medium" style={{ color: theme.accent }}>
            Full-Stack Web developer | AI Automation Engineer
            <span
              className="inline-block w-[2px] h-[0.95em]  ml-[2px]"
              style={{ backgroundColor: theme.accent }}
            />
          </p>

          <motion.p
            variants={heroTextItem}
            className="mt-4 text-sm sm:text-base leading-relaxed max-w-sxl"
            style={{ color: theme.textMuted }}
          >
            I build secure, reliable, and scalable software solutions. I don’t just focus on only writing a code, I take the time to understand your business, choose the right architecture and technologies.
          </motion.p>

          <motion.div variants={heroTextItem} className="mt-8 flex flex-wrap items-center gap-4">
            

            <a
              onClick={(e) => handleScroll(e, 'contact')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border font-semibold text-sm cursor-pointer transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ borderColor: theme.panelBorder, color: theme.text, backgroundColor: 'transparent', outlineColor: theme.accent }}
            >
              Let&apos;s Collaborate ↗
            </a>
          </motion.div>
         
        </motion.div>
      </main>

      {/* STATS FOOTER */}
      <footer className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-8 pt-6 pb-4 relative z-10 justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="border-t flex flex-wrap justify-center gap-x-10 gap-y-3 py-6 font-mono text-[12px] sm:text-[33px]"
          style={{ borderColor: theme.panelBorder }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col justify-between gap-2 items-center">
              <p className="font-semibold" style={{ color: theme.accent }}>
                {stat.value}
              </p>
              <p style={{ color: theme.textMuted }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </footer>

      <style jsx global>{`
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 0.9s step-end infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-blink {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

function DevIllustration({ theme }: { theme: Record<string, string> }) {
  const reduceMotion = useReducedMotion();

  const codeBars: [number, string][] = [
    [0.9, theme.keyword],
    [0.6, theme.prop],
    [0.75, theme.string],
    [0.4, theme.comment],
    [0.85, theme.fn],
    [0.55, theme.prop],
  ];

  const badges = [
    { Icon: Terminal, top: '-10%', left: '-12%', delay: 0 },
    { Icon: Bot, top: '-14%', left: '42%', delay: 0.8 },
    { Icon: Cloud, top: '-10%', left: '94%', delay: 1.4 },
    { Icon: Workflow, top: '38%', left: '100%', delay: 0.4 },
    { Icon: Braces, top: '96%', left: '86%', delay: 1.0 },
    { Icon: GitBranch, top: '96%', left: '-12%', delay: 1.7 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.35, ease: 'easeOut' }}
      className="hidden lg:block absolute top-20 left-[calc(100%+2rem)] xl:left-[calc(100%+3rem)] z-20"
      aria-hidden
    >
      {/* ambient glow behind the device */}
      <motion.div
        animate={reduceMotion ? undefined : { opacity: [0.4, 0.75, 0.4], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-10 rounded-full blur-3xl"
        style={{ backgroundColor: theme.accent, opacity: 0.16 }}
      />

      {/* mini "device" showing abstracted code */}
      <div
        className="relative w-[220px] xl:w-[280px] xl:h-[200px] rounded-xl border shadow-2xl overflow-hidden"
        style={{ backgroundColor: theme.panelBg, borderColor: theme.panelBorder }}
      >
        <div
          className="flex items-center gap-1.5 px-3 py-2 border-b"
          style={{ backgroundColor: theme.panelHeaderBg, borderColor: theme.panelBorder }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#FF5F56' }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#27C93F' }} />
        </div>
        <div className="p-3.5 space-y-2">
          {codeBars.map(([w, c], i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, delay: 0.75 + i * 0.07, ease: 'easeOut' }}
              className="h-1.5 rounded-full origin-left"
              style={{ width: `${w * 100}%`, backgroundColor: c, opacity: 0.85 }}
            />
          ))}
        </div>

        {/* engineer, peeking up from behind the panel */}
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-6 right-3 w-11 h-12 translate-y-1/2"
        >
          <EngineerFigure accent={theme.accent} />
        </motion.div>
      </div>

      {/* orbiting tech badges */}
      {badges.map(({ Icon, top, left, delay }, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 rounded-lg border flex items-center justify-center shadow-lg"
          style={{ top, left, backgroundColor: theme.panelHeaderBg, borderColor: theme.panelBorder }}
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: theme.accent }} />
        </motion.div>
      ))}
    </motion.div>
  );
}


function EngineerFigure({ accent }: { accent: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 104 120"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="relative"
    >
      {/* hoodie / shoulders */}
      <path d="M4 120C4 90 22 74 52 74C82 74 100 90 100 120Z" fill="#161B22" />
      {/* zip line */}
      <line x1="52" y1="80" x2="52" y2="118" stroke="#0D1117" strokeWidth="2" />
      {/* neck */}
      <rect x="42" y="58" width="20" height="22" rx="6" fill="#2B3440" />
      {/* head */}
      <circle cx="52" cy="40" r="24" fill="#30363D" />
      {/* hair */}
      <path d="M28 34C28 17 39 6 52 6C65 6 78 17 78 34C78 28 68 22 52 22C36 22 28 28 28 34Z" fill="#161B22" />
      {/* glasses */}
      <rect x="31" y="38" width="15" height="10" rx="4" fill="none" stroke={accent} strokeWidth="2.5" />
      <rect x="58" y="38" width="15" height="10" rx="4" fill="none" stroke={accent} strokeWidth="2.5" />
      <line x1="46" y1="43" x2="58" y2="43" stroke={accent} strokeWidth="2.5" />
    </svg>
  );
}

const heroTextContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const heroTextItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};