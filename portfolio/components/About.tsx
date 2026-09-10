'use client';

import React from 'react';
import { Code2, Cpu, GraduationCap, Layout, Terminal } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { getTheme } from './theme';

interface AboutProps {
  isDarkMode: boolean;
}

export default function AboutSection({ isDarkMode }: AboutProps) {
  const theme = getTheme(isDarkMode);

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
      className="min-h-screen flex flex-col justify-center relative overflow-hidden font-sans antialiased p-3 sm:p-4 md:p-8 transition-colors duration-500"
      style={{ backgroundColor: theme.pageBg, color: theme.text }}
    >
      {/* Outer border container accent matching Hero */}
      <div
        className="absolute inset-0 border rounded-2xl sm:rounded-3xl pointer-events-none m-1 sm:m-2 md:m-4 z-40 transition-colors duration-500"
        style={{ borderColor: theme.frameBorder }}
      />

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-12 sm:py-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* Left Side: Creative Asset Display */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start justify-center order-2 lg:order-1 relative w-full">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-[350px] font-mono text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 sm:mb-6 text-center lg:text-left"
            style={{ color: theme.text }}
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
            <div
              className="absolute inset-4 rounded-3xl filter blur-3xl -z-10 animate-pulse"
              style={{ backgroundColor: theme.accent, opacity: 0.12 }}
            />

            {/* Content Card Layout */}
            <div
              className="w-full h-full p-5 sm:p-6 rounded-3xl border flex flex-col justify-between transition-colors duration-500 backdrop-blur-sm shadow-xl"
              style={{ backgroundColor: `${theme.panelBg}c0`, borderColor: theme.panelBorder }}
            >
              {/* Card Header UI Decoration */}
              <div className="flex justify-between items-center">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FF5F56' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#27C93F' }} />
                </div>
                <Layout className="w-4 h-4" style={{ color: theme.textMuted }} />
              </div>

              {/* Central Code Graphic Visualizer */}
              <div
                className="flex-1 my-3.5 p-3.5 rounded-xl font-mono text-[11px] sm:text-xs overflow-x-auto leading-relaxed border whitespace-nowrap lg:whitespace-normal"
                style={{ backgroundColor: theme.panelHeaderBg, borderColor: theme.panelBorder, color: theme.textMuted }}
              >
                <p>
                  <span style={{ color: theme.keyword }}>const</span> engineer = {'{'}
                </p>
                <p className="pl-4">
                  <span style={{ color: theme.prop }}>name</span>:{' '}
                  <span style={{ color: theme.string }}>&quot;Daniel Bizualem&quot;</span>,
                </p>
                <p className="pl-4">
                  <span style={{ color: theme.prop }}>degree</span>:{' '}
                  <span style={{ color: theme.string }}>&quot;BSc. Software Engineering&quot;</span>,
                </p>
                <p className="pl-4">
                  <span style={{ color: theme.prop }}>graduate</span>:{' '}
                  <span style={{ color: theme.string }}>&quot;ASTU&quot;</span>,
                </p>
                <p className="pl-4">
                  <span style={{ color: theme.prop }}>focus</span>: [
                  <span style={{ color: theme.string }}>&quot;MERN&quot;</span>,{' '}
                  <span style={{ color: theme.string }}>&quot;AI Driven Solution&quot;</span>],
                </p>
                <p className="pl-4">
                  <span style={{ color: theme.prop }}>motto</span>:{' '}
                  <span style={{ color: theme.string }}>&quot;Drive complex architecture simply&quot;</span>
                </p>
                <p style={{ color: theme.keyword }}>{'}'};</p>
              </div>

              {/* Bottom Quick Tag */}
              <div className="flex items-center gap-2.5 text-[11px] font-semibold tracking-wider uppercase p-0.5" style={{ color: theme.textMuted }}>
                <GraduationCap className="w-4 h-4 sm:w-5 h-5" style={{ color: theme.accent }} />
                <span>Engineered for Performance</span>
              </div>
            </div>

            {/* Accent trace offset background element */}
            <motion.div
              initial={{ rotate: 0 }}
              whileInView={{ rotate: -4 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 40, damping: 12, delay: 0.4 }}
              className="absolute -inset-2 border rounded-3xl pointer-events-none transition-colors duration-500 -z-20"
              style={{ borderColor: theme.accent, opacity: 0.15 }}
            />
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
            <motion.h3 variants={itemVariants} className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: theme.text }}>
              Hello,
            </motion.h3>
            <motion.h3 variants={itemVariants} className="text-xl sm:text-2xl font-bold tracking-tight leading-snug" style={{ color: theme.text }}>
              I&apos;m Daniel Bizualem, a Software Engineer from Ethiopia.
            </motion.h3>
          </div>

          <motion.div variants={itemVariants} className="space-y-4 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0" style={{ color: theme.textMuted }}>
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
                  borderColor: theme.accent,
                }}
                whileTap={{ scale: 0.995 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="p-4 rounded-xl border flex flex-col sm:flex-row gap-3 sm:gap-4 text-center sm:text-left items-center sm:items-start transition-colors duration-300 shadow-sm cursor-default"
                style={{ backgroundColor: `${theme.panelBg}66`, borderColor: theme.panelBorder }}
              >
                <div className="p-2 h-fit rounded-lg border flex-shrink-0" style={{ backgroundColor: theme.panelHeaderBg, borderColor: theme.panelBorder, color: theme.accent }}>
                  <focus.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold tracking-tight" style={{ color: theme.text }}>
                    {focus.title}
                  </h4>
                  <p className="text-xs leading-normal" style={{ color: theme.textMuted }}>
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