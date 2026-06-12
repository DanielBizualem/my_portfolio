'use client';

import React from 'react';
import { Code2, Cpu, GraduationCap, Layout, Terminal } from 'lucide-react';
import { motion, Variants } from 'framer-motion'; // 👈 Imported Variants here

interface AboutProps {
  isDarkMode: boolean;
}

export default function AboutSection({ isDarkMode }: AboutProps) {
  const coreFocus = [
    {
      icon: Code2,
      title: 'Full-Stack Architecture',
      desc: 'Designing end-to-end applications with modern modular structures, prioritizing clean state management and efficient database paradigms.',
    },
    {
      icon: Cpu,
      title: 'Intelligent Systems',
      desc: 'Integrating practical machine learning logic and computer vision systems to bridge standard workflows with smart automations.',
    },
    {
      icon: Terminal,
      title: 'DevOps & Scalability',
      desc: 'Containerizing services and optimizing real-time sync systems to guarantee fast execution times and minor system latency.',
    },
  ];

  // 👈 Explicitly typed these as Variants to clear up the TypeScript error
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 16 },
    },
  };

  return (
    <section 
      id="about"
      className={`min-h-screen flex flex-col justify-center relative overflow-hidden font-sans antialiased p-3 sm:p-4 md:p-8 transition-colors duration-500 selection:bg-cyan-500 selection:text-slate-900 ${
        isDarkMode ? 'bg-[#06141d] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Outer border container accent matching Hero */}
      <div className={`absolute inset-0 border rounded-2xl sm:rounded-3xl pointer-events-none m-1 sm:m-2 md:m-4 z-40 transition-colors duration-500 ${
        isDarkMode ? 'border-cyan-500/20' : 'border-slate-300'
      }`}></div>

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-12 sm:py-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Side: Creative Asset Display */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start justify-center order-2 lg:order-1 relative w-full">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`w-full max-w-[350px] font-mono text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 sm:mb-6 text-center lg:text-left ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            About Me
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.93, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 60, damping: 15, delay: 0.2 }}
            className="relative w-full max-w-[350px] h-[320px] sm:h-[350px]"
          >
            {/* Ambient Blur */}
            <div className={`absolute inset-4 rounded-3xl filter blur-3xl -z-10 animate-pulse ${
              isDarkMode ? 'bg-cyan-500/10' : 'bg-blue-500/5'
            }`}></div>

            {/* Content Card Layout */}
            <div className={`w-full h-full p-5 sm:p-6 rounded-3xl border flex flex-col justify-between transition-colors duration-500 backdrop-blur-sm shadow-xl ${
              isDarkMode 
                ? 'bg-[#0a1f2c]/60 border-cyan-500/20 shadow-cyan-950/50' 
                : 'bg-white border-slate-200 shadow-slate-200/50'
            }`}>
              {/* Card Header UI Decoration */}
              <div className="flex justify-between items-center">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e11d48]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                </div>
                <Layout className={`w-4 h-4 ${isDarkMode ? 'text-cyan-500/40' : 'text-slate-400'}`} />
              </div>

              {/* Central Code Graphic Visualizer */}
              <div className={`flex-1 my-3.5 p-3.5 rounded-xl font-mono text-[11px] sm:text-xs overflow-x-auto leading-relaxed border whitespace-nowrap lg:whitespace-normal ${
                isDarkMode ? 'bg-[#06141d] border-cyan-900/40 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}>
                <p className={isDarkMode ? 'text-cyan-400' : 'text-blue-600'}>const engineer = &#123;</p>
                <p className="pl-4">name: "Daniel Bizualem",</p>
                <p className="pl-4">degree: "BSc. Software Engineering",</p>
                <p className="pl-4">graduate: "ASTU",</p>
                <p className="pl-4">focus: ["MERN", "AI Driven Solution"],</p>
                <p className="pl-4">motto: "Drive complex architecture simply"</p>
                <p className={isDarkMode ? 'text-cyan-400' : 'text-blue-600'}>&#125;;</p>
              </div>

              {/* Bottom Quick Tag */}
              <div className={`flex items-center gap-2.5 text-[11px] font-semibold tracking-wider uppercase p-0.5 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-500'
              }`}>
                <GraduationCap className={`w-4 h-4 sm:w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
                <span>Engineered for Performance</span>
              </div>
            </div>

            {/* Accent trace offset background element */}
            <motion.div 
              initial={{ rotate: 0 }}
              whileInView={{ rotate: -4 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 40, damping: 12, delay: 0.4 }}
              className={`absolute -inset-2 border rounded-3xl pointer-events-none transition-colors duration-500 -z-20 ${
                isDarkMode ? 'border-cyan-400/10' : 'border-blue-500/10'
              }`}
            ></motion.div>
          </motion.div>
        </div>

        {/* Right Side: Text & Core Matrix */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left order-1 lg:order-2 relative"
        >
          <div className="space-y-2 sm:space-y-3">
            <motion.h3 variants={itemVariants} className={`text-2xl sm:text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Hello 🖐️
            </motion.h3>
            <motion.h3 variants={itemVariants} className={`text-xl sm:text-2xl font-bold tracking-tight leading-snug ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
              I’m Daniel Bizualem, a Software Engineer from Ethiopia.
            </motion.h3>
          </div>

          <motion.div variants={itemVariants} className={`space-y-4 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <p>
              I graduated from Adama Science and Technology University with a BSc degree in Software Engineering. I specialize in full-stack web development. In addition to my academic education, I am self-taught and have more than 3 years of rigorous building and architecture experience.
            </p>
            <p>
              I aim to build powerful applications by combining modern full-stack development implementations with smart engineering toolchains to solve complex problems. Most importantly, I am a continuous learner who is highly motivated to connect and collaborate with teams worldwide.
            </p>
          </motion.div>

          {/* Interactive Feature Matrix Grid */}
          <motion.div variants={itemVariants} className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-1 pt-2">
            {coreFocus.map((focus, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.015, 
                  x: 4,
                  borderColor: isDarkMode ? 'rgba(34,211,238,0.4)' : 'rgba(59,130,246,0.4)'
                }}
                whileTap={{ scale: 0.995 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row gap-3 sm:gap-4 text-center sm:text-left items-center sm:items-start transition-colors duration-300 shadow-sm cursor-default ${
                  isDarkMode 
                    ? 'bg-[#092230]/40 border-cyan-500/10' 
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className={`p-2 h-fit rounded-lg border flex-shrink-0 ${
                  isDarkMode ? 'bg-[#06141d] border-cyan-500/20 text-cyan-400' : 'bg-slate-50 border-slate-200 text-blue-600'
                }`}>
                  <focus.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {focus.title}
                  </h4>
                  <p className={`text-xs leading-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {focus.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}