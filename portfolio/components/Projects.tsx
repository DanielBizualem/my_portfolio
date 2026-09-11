'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, ExternalLink, Play, BarChart3 } from 'lucide-react';
import { getTheme } from './theme';

interface Project {
  title: string;
  category: 'Full-Stack' | 'AI / CV' | 'Architecture';
  description: string;
  tags: string[];
  metrics: string;
  imageUrl: string;
  videoUrl?: string;
  liveUrl: string;
}

interface ProjectsProps {
  isDarkMode: boolean;
}

export default function ProjectsSection({ isDarkMode }: ProjectsProps) {
  const theme = getTheme(isDarkMode);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Full-Stack', 'AI / CV', 'Architecture'];

  const projectsData: Project[] = [
    {
      title: 'High School Enterprise Management System',
      category: 'Full-Stack',
      description: 'A minimalist enterprise admin architecture built with the MERN stack and Next.js. Features complex task tracking systems, granular user management metrics, and robust pipeline issue tracking.',
      tags: ['Next.js', 'React', 'MongoDB', 'Node.js'],
      metrics: 'Optimized Real-Time Sync',
      imageUrl: 'https://res.cloudinary.com/djxfy60tt/image/upload/v1788813588/school_ERP_racvej.png',
      videoUrl: '#',
      liveUrl: 'https://onesmosnesib.vercel.app'
    },
    {
      title: 'Jaba Printing and Advert ',
      category: 'Full-Stack',
      description: 'A high-performance computer vision tool optimizing complex Canny Edge Detection and image classification workflows using custom CNN and SVM models without processing bottlenecks.',
      tags: ['Python', 'OpenCV', 'CNN', 'TensorFlow'],
      metrics: '94.2% Frame Accuracy',
      imageUrl: 'https://res.cloudinary.com/djxfy60tt/image/upload/v1788813711/jabaa_Graphics_kl3rtb.png',
      videoUrl: '#',
      liveUrl: 'https://jabadvert.vercel.app'
    },
    {
      title: 'Chatbot using Gemini API',
      category: 'Architecture',
      description: 'A decoupled full-stack ecosystem engineered to mitigate community information gaps across developing urban centers. Handles offline capability and manages data packet compression.',
      tags: ['React', 'Docker', 'REST API', 'PostgreSQL'],
      metrics: '60% Latency Reduction',
      imageUrl: 'https://res.cloudinary.com/djxfy60tt/image/upload/v1788814012/ChatGPT_Image_Sep_7_2026_11_46_33_PM_zkwwig.png',
      videoUrl: '#',
      liveUrl: 'https://echochat1.vercel.app/'
    },
    {
      title: 'Constration management and collaboration System',
      category: 'Full-Stack',
      description: 'A backend-driven role synchronization tool allowing project managers to securely allocate backlogs, streamline branch tracking workflows, and generate dynamic database reports.',
      tags: ['TypeScript', 'Express', 'MongoDB', 'Tailwind'],
      metrics: 'Client PDF Streaming',
      imageUrl: 'https://res.cloudinary.com/djxfy60tt/image/upload/v1788814538/ChatGPT_Image_Sep_7_2026_11_55_03_PM_sograj.png',
      videoUrl: '#',
      liveUrl: 'https://conwise.vercel.app/'
    }
  ];

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden font-sans antialiased p-4 md:p-8 transition-colors duration-500"
      style={{ backgroundColor: theme.pageBg, color: theme.text }}
    >
      {/* Outer border container accent */}
      <div
        className="absolute inset-0 border rounded-3xl pointer-events-none m-2 md:m-4 z-40 transition-colors duration-500"
        style={{ borderColor: theme.frameBorder }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10 space-y-12">

        {/* Section Header Text & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-3 text-center md:text-left"
          >
            <h2 className="text-3xl sm:text-4xl font-mono font-black tracking-tight" style={{ color: theme.text }}>
              Projects
            </h2>
          </motion.div>

          {/* Filter System Chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all duration-300 border relative overflow-hidden"
                  style={{
                    color: isActive ? theme.accentText : theme.textMuted,
                    borderColor: isActive ? theme.accent : theme.panelBorder,
                    backgroundColor: isActive ? 'transparent' : `${theme.panelBg}66`,
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 z-0"
                      style={{ backgroundColor: theme.accent }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Project Cards Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{
                  opacity: { duration: 0.3 },
                  layout: { type: 'spring', stiffness: 400, damping: 38 },
                  scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
                }}
                whileHover={{ y: -6, borderColor: theme.accent }}
                className="p-4 md:p-5 rounded-2xl border flex flex-col justify-between transition-colors duration-500 group relative overflow-hidden backdrop-blur-sm h-full"
                style={{ backgroundColor: `${theme.panelBg}aa`, borderColor: theme.panelBorder, boxShadow: '0 12px 30px rgba(0,0,0,0.15)' }}
              >
                {/* Background Glow Ring Effect on Hover */}
                <div
                  className="absolute -right-16 -top-16 w-32 h-32 rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: theme.accent, opacity: 0.1 }}
                />

                {/* Upper Section */}
                <div className="flex flex-col flex-grow">
                  {/* 1. Project Image Preview Container */}
                  <div
                    className="w-full aspect-video rounded-xl overflow-hidden mb-5 relative border group-hover:border-transparent transition-all duration-300"
                    style={{ borderColor: theme.panelBorder, backgroundColor: theme.panelHeaderBg }}
                  >
                    <img
                      src={project.imageUrl}
                      alt={`${project.title} Preview`}
                      className="w-full h-full object-cover transform group-hover:scale-[1.04] transition-transform duration-500 object-center"
                      loading="lazy"
                    />
                  </div>

                  {/* Card Header metadata mapping */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="p-2 rounded-lg border" style={{ backgroundColor: theme.panelHeaderBg, borderColor: theme.panelBorder, color: theme.accent }}>
                      <FolderGit2 className="w-4 h-4" />
                    </div>
                    <span
                      className="text-[10px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded border"
                      style={{ borderColor: theme.panelBorder, backgroundColor: theme.panelHeaderBg, color: theme.accent }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Info block definitions */}
                  <h3 className="text-lg font-bold tracking-tight mb-2 transition-colors duration-300" style={{ color: theme.text }}>
                    {project.title}
                  </h3>

                  <p className="text-xs leading-relaxed mb-5 flex-grow" style={{ color: theme.textMuted }}>
                    {project.description}
                  </p>
                </div>

                {/* Lower Section (Keeps elements fixed to bottom) */}
                <div className="mt-auto">
                  {/* Tag badges map array */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded border"
                        style={{ backgroundColor: theme.panelHeaderBg, color: theme.textMuted, borderColor: theme.panelBorder }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Card Bottom action area system metrics & links */}
                  <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: theme.panelBorder }}>
                    <div className="flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5" style={{ color: theme.textMuted }} />
                      <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: theme.textMuted }}>
                        {project.metrics}
                      </span>
                    </div>

                    {/* Links Row */}
                    <div className="flex items-center gap-3">
                      

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View Live App"
                        aria-label="Live Demo link"
                        className="flex transition-opacity duration-300 hover:opacity-70 items-center gap-1"
                        style={{ color: theme.textMuted }}
                      >
                        <span className='text-sm'>Live</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}