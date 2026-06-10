'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/Hero';
import Skills from '@/components/Skills';
import HireMeForm from '@/components/Hire';
import AboutSection from '@/components/About';
import ProjectsSection from '@/components/Projects';
import ExperienceSection from '@/components/Experience';
import ServicesSection from '@/components/Services';
import ContactSection from '@/components/Contact';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
// Import your other sections here too (e.g., About, Projects, Contact)

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Sync state with Tailwind's dark selector class if you want to use standard tailwind variants later
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`transition-colors duration-500 ${isDarkMode ? 'bg-[#06141d]' : 'bg-slate-50'}`}>
      <HeroSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <AboutSection isDarkMode={isDarkMode}/>
      <Skills isDarkMode={isDarkMode} />
      <ProjectsSection isDarkMode={isDarkMode}/>
      <ExperienceSection isDarkMode={isDarkMode}/>
      <ServicesSection isDarkMode={isDarkMode}/>
      <ContactSection isDarkMode={isDarkMode}/>
      <Footer isDarkMode={isDarkMode}/>
      <ChatWidget isDarkMode={isDarkMode}/>
    </div>
  );
}