'use client';

import React, { useEffect, useState } from 'react';
import { FolderGit2, ExternalLink, Play, BarChart3 } from 'lucide-react';

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categories = ['All', 'Full-Stack', 'AI / CV', 'Architecture'];

  const projectsData: Project[] = [
    {
      title: 'Sovereign Exec Management Dashboard',
      category: 'Full-Stack',
      description: 'A minimalist enterprise admin architecture built with the MERN stack and Next.js. Features complex task tracking systems, granular user management metrics, and robust pipeline issue tracking.',
      tags: ['Next.js', 'React', 'MongoDB', 'Node.js'],
      metrics: 'Optimized Real-Time Sync',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60',
      videoUrl: '#',
      liveUrl: '#'
    },
    {
      title: 'Intelligent Image Edge Visualizer',
      category: 'AI / CV',
      description: 'A high-performance computer vision tool optimizing complex Canny Edge Detection and image classification workflows using custom CNN and SVM models without processing bottlenecks.',
      tags: ['Python', 'OpenCV', 'CNN', 'TensorFlow'],
      metrics: '94.2% Frame Accuracy',
      imageUrl: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=600&auto=format&fit=crop&q=60',
      videoUrl: '#',
      liveUrl: '#'
    },
    {
      title: 'High-Scale Africa Urban Data Module',
      category: 'Architecture',
      description: 'A decoupled full-stack ecosystem engineered to mitigate community information gaps across developing urban centers. Handles offline capability and manages data packet compression.',
      tags: ['React', 'Docker', 'REST API', 'PostgreSQL'],
      metrics: '60% Latency Reduction',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=60',
      videoUrl: '#',
      liveUrl: '#'
    },
    {
      title: 'Core Workflow Project Engine',
      category: 'Full-Stack',
      description: 'A backend-driven role synchronization tool allowing project managers to securely allocate backlogs, streamline branch tracking workflows, and generate dynamic database reports.',
      tags: ['TypeScript', 'Express', 'MongoDB', 'Tailwind'],
      metrics: 'Client PDF Streaming',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60',
      videoUrl: '#',
      liveUrl: '#'
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <section 
      id="portfolio"
      className={`min-h-screen flex flex-col justify-center relative overflow-hidden font-sans antialiased p-4 md:p-8 transition-colors duration-500 selection:bg-cyan-500 selection:text-slate-900 ${
        isDarkMode ? 'bg-[#06141d] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Outer border container accent */}
      <div className={`absolute inset-0 border rounded-3xl pointer-events-none m-2 md:m-4 z-40 transition-colors duration-500 ${
        isDarkMode ? 'border-cyan-500/20' : 'border-slate-300'
      }`}></div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10 space-y-12">
        
        {/* Section Header Text & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Projects
            </h2>
          </div>

          {/* Filter System Chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all duration-300 border ${
                  activeFilter === cat
                    ? (isDarkMode ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'bg-blue-600 text-white border-blue-600')
                    : (isDarkMode ? 'bg-[#092230]/40 border-cyan-500/10 text-slate-400 hover:border-cyan-500/30' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300')
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={index}
              className={`p-4 md:p-5 rounded-2xl border flex flex-col justify-between transition-all duration-500 group relative overflow-hidden backdrop-blur-sm h-full ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${
                isDarkMode 
                  ? 'bg-[#0a1f2c]/50 border-cyan-500/10 hover:border-cyan-400/30 shadow-xl shadow-cyan-950/20' 
                  : 'bg-white border-slate-200 hover:border-blue-300 shadow-lg shadow-slate-100'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Background Glow Ring Effect on Hover */}
              <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                isDarkMode ? 'bg-cyan-500/10' : 'bg-blue-500/5'
              }`}></div>

              {/* Upper Section */}
              <div className="flex flex-col flex-grow">
                {/* 1. Project Image Preview Container */}
                <div className={`w-full aspect-video rounded-xl overflow-hidden mb-5 relative border group-hover:border-transparent transition-all duration-300 ${
                  isDarkMode ? 'border-cyan-950/50 bg-[#06141d]' : 'border-slate-200 bg-slate-100'
                }`}>
                  <img 
                    src={project.imageUrl} 
                    alt={`${project.title} Preview`}
                    className="w-full h-full object-cover transform group-hover:scale-[1.04] transition-transform duration-500 object-center"
                    loading="lazy"
                  />
                </div>

                {/* Card Header metadata mapping */}
                <div className="flex justify-between items-center mb-4">
                  <div className={`p-2 rounded-lg border ${
                    isDarkMode ? 'bg-[#06141d] border-cyan-500/20 text-cyan-400' : 'bg-slate-50 border-slate-200 text-blue-600'
                  }`}>
                    <FolderGit2 className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded border ${
                    isDarkMode ? 'border-cyan-500/20 bg-cyan-950/40 text-cyan-400' : 'border-blue-100 bg-blue-50 text-blue-600'
                  }`}>
                    {project.category}
                  </span>
                </div>

                {/* Info block definitions */}
                <h3 className={`text-lg font-bold tracking-tight mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-blue-600'
                }`}>
                  {project.title}
                </h3>
                
                <p className={`text-xs leading-relaxed mb-5 flex-grow ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
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
                      className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded ${
                        isDarkMode ? 'bg-[#06141d] text-slate-400 border border-cyan-950' : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Bottom action area system metrics & links */}
                <div className={`pt-4 border-t flex items-center justify-between ${
                  isDarkMode ? 'border-cyan-900/40' : 'border-slate-100'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <BarChart3 className={`w-3.5 h-3.5 ${isDarkMode ? 'text-cyan-500/60' : 'text-slate-400'}`} />
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {project.metrics}
                    </span>
                  </div>

                  {/* Links Row */}
                  <div className="flex items-center gap-3">
                    {project.videoUrl && (
                      <a 
                        href={project.videoUrl} 
                        title="Watch Demo Video"
                        aria-label="Watch project demonstration video"
                        className={`flex items-center gap-1 text-xs font-bold transition-colors duration-300 ${
                          isDarkMode ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-500 hover:text-blue-600'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span className="text-[11px] font-medium tracking-tight">Demo</span>
                      </a>
                    )}
                    
                    <a 
                      href={project.liveUrl} 
                      title="View Live App"
                      aria-label="Live Demo link"
                      className={`transition-colors duration-300 ${isDarkMode ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-500 hover:text-blue-600'}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}