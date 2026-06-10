'use client';

import React from 'react';
import { Code2, Server, Database, GitBranch, Terminal } from 'lucide-react';

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: SkillItem[];
}

export default function SkillsSection({ isDarkMode = true }: { isDarkMode?: boolean }) {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Languages',
      subtitle: 'Core application building blocks',
      icon: Code2,
      skills: [
        {
          name: 'JavaScript',
          icon: (
            <svg className="w-4 h-4 text-[#f7df1e]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.561-.648-1.561-1.208 0-.496.473-.773 1.094-.773.686 0 1.224.33 1.397.94h2.113c-.198-1.74-1.366-2.564-3.51-2.564-2.3 0-3.236 1.126-3.236 2.535 0 2.436 2.312 3.105 3.528 3.63.81.36 1.485.645 1.485 1.29 0 .54-.525.885-1.32.885-.885 0-1.545-.435-1.74-1.125h-2.16c.21 2.055 1.41 2.82 3.9 2.82 2.55 0 3.48-1.005 3.48-2.992zm-11.419-.345c0 1.185-.706 1.86-1.785 1.86-.96 0-1.5-.57-1.71-1.29H5.01c.21 1.95 1.575 2.955 3.735 2.955 2.52 0 3.84-1.215 3.84-3.51V11.4h-2.16v6.531z"/>
            </svg>
          )
        },
        {
          name: 'Python',
          icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2c-5.523 0-6 4.34-6 6h4v1H4c-1.66 0-3 1.34-3 3v6c0 1.66 1.34 3 3 3h2c0-1.105.895-2 2-2h4c1.105 0 2 .895 2 2h2c1.66 0 3-1.34 3-3v-4h-4v-1h6c0-1.66-1.34-3-3-3h-2c0 1.105-.895 2-2 2H8c-1.105 0-2-.895-2-2V8c0-1.66 1.34-3 3-3h3V2z" fill="#3776AB"/>
              <path d="M16 18a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill="#FFE873"/>
            </svg>
          )
        },
        {
          name: 'TypeScript',
          icon: (
            <svg className="w-4 h-4 text-[#3178c6]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.561-.648-1.561-1.208 0-.496.473-.773 1.094-.773.686 0 1.224.33 1.397.94h2.113c-.198-1.74-1.366-2.564-3.51-2.564-2.3 0-3.236 1.126-3.236 2.535 0 2.436 2.312 3.105 3.528 3.63.81.36 1.485.645 1.485 1.29 0 .54-.525.885-1.32.885-.885 0-1.545-.435-1.74-1.125h-2.16c.21 2.055 1.41 2.82 3.9 2.82 2.55 0 3.48-1.005 3.48-2.992zM14.015 11.4h-7.62v2.16h2.61v9.9h2.4v-9.9h2.61V11.4z"/>
            </svg>
          )
        },
        {
          name: 'HTML5 / CSS3',
          icon: (
            <svg className="w-4 h-4 text-[#e34f26]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm14 13.8L15.8 11H8.5l-.2-2.5h7.8l.2-2.5H5.4l.6 7.3h7.5l-.3 3.3-2.2.7-2.2-.7-.1-1.7H6.2l.2 3.8 5.6 1.8 5.6-1.8.6-6.7z"/>
            </svg>
          )
        }
      ]
    },
    {
      title: 'Frontend Frameworks',
      subtitle: 'Component structures and architectures',
      icon: Terminal,
      skills: [
        {
          name: 'Next.js',
          icon: (
            <svg className="w-4 h-4" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="64" cy="64" r="64" fill={isDarkMode ? '#ffffff' : '#000000'} />
              <path d="M100.5 102.5L52.5 41H43V87H49.5V51L93.5 107.5C96 106 98.5 104.5 100.5 102.5Z" fill={isDarkMode ? '#000000' : '#ffffff'} />
              <path d="M81 41H87.5V87H81V41Z" fill={isDarkMode ? '#000000' : '#ffffff'} />
            </svg>
          )
        },
        {
          name: 'React.js',
          icon: (
            <svg className="w-4 h-4 text-[#61dafb]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="50" rx="8" ry="20" stroke="currentColor" strokeWidth="2.5" transform="rotate(0 50 50)" />
              <ellipse cx="50" cy="50" rx="8" ry="20" stroke="currentColor" strokeWidth="2.5" transform="rotate(60 50 50)" />
              <ellipse cx="50" cy="50" rx="8" ry="20" stroke="currentColor" strokeWidth="2.5" transform="rotate(120 50 50)" />
              <circle cx="50" cy="50" r="4" fill="currentColor" />
            </svg>
          )
        },
        {
          name: 'Tailwind CSS',
          icon: (
            <svg className="w-4 h-4 text-[#38bdf8]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6.036c-2.025 0-3.375.9-4.05 2.7-.675 1.8-.337 3.488.101 5.064.338 1.181.675 2.193.675 3.15 0 2.025-.9 3.375-2.7 4.05-1.8.675-3.488.337-5.064-.101-1.181-.338-2.193-.675-3.15-.675 2.025 0 3.375-.9 4.05-2.7.675-1.8.337-3.488-.101-5.064-.338-1.181-.675-2.193-.675-3.15 0-2.025.9-3.375 2.7-4.05 1.8-.675 3.487-.337 5.064.101 1.181.338 2.193.675 3.15.675zm6 6c-2.025 0-3.375.9-4.05 2.7-.675 1.8-.337 3.488.101 5.064.338 1.181.675 2.193.675 3.15 0 2.025-.9 3.375-2.7 4.05-1.8.675-3.488.337-5.064-.101-1.181-.338-2.193-.675-3.15-.675 2.025 0 3.375-.9 4.05-2.7.675-1.8.337-3.488-.101-5.064-.338-1.181-.675-2.193-.675-3.15 0-2.025.9-3.375 2.7-4.05 1.8-.675 3.487-.337 5.064.101 1.181.338 2.193.675 3.15.675z"/>
            </svg>
          )
        }
      ]
    },
    {
      title: 'Backend Systems',
      subtitle: 'Performant servers & communication tools',
      icon: Server,
      skills: [
        {
          name: 'Node.js',
          icon: (
            <svg className="w-4 h-4 text-[#339933]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1.041l8.847 5.108v10.216L12 21.473l-8.847-5.108V6.149L12 1.041zm0 2.14L5.352 7.026v7.712L12 18.583l6.648-3.845V7.026L12 3.181zM11.162 7.553h1.674v3.522h2.247v1.442h-3.92V7.553zm.186 6.012h1.302v3.136h-1.302v-3.136z"/>
            </svg>
          )
        },
        {
          name: 'Express.js',
          icon: (
            <span className={`text-[8px] font-black tracking-tight border px-1 py-0.5 rounded leading-none shrink-0 ${isDarkMode ? 'text-white border-white/30' : 'text-slate-900 border-slate-900/30'}`}>
              EX
            </span>
          )
        },
        {
          name: 'REST APIs',
          icon: (
            <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 20a7 7 0 0 0-7-7H4M4 13l-4-4 4-4M13 4h7a7 7 0 0 1 7 7v9"/>
            </svg>
          )
        }
      ]
    },
    {
      title: 'Database Architecture',
      subtitle: 'Schema normalization & document modeling',
      icon: Database,
      skills: [
        {
          name: 'MongoDB',
          icon: (
            <svg className="w-4 h-4 text-[#47a248]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .002c-.37 0-.74.14-1.03.41C9.06 2.19 6 6.96 6 11.66c0 4.19 2.5 7.82 6 9.87 3.5-2.05 6-5.68 6-9.87 0-4.7-3.06-9.47-4.97-11.25-.29-.27-.66-.41-1.03-.41zm0 2.5c.98 1.25 4 5.34 4 9.16 0 2.91-1.63 5.48-4 7.01-2.37-1.53-4-4.1-4-7.01 0-3.82 3.02-7.91 4-9.16z"/>
            </svg>
          )
        },
        {
          name: 'Mongoose ODM',
          icon: (
            <svg className="w-4 h-4 text-[#800]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          )
        }
      ]
    },
    {
      title: 'DevOps & Tools',
      subtitle: 'Version coordination & API pipelines',
      icon: GitBranch,
      skills: [
        {
          name: 'Git',
          icon: (
            <svg className="w-4 h-4 text-[#f05032]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.268 11.26l-10.53-10.53a1.042 1.042 0 0 0-1.477 0l-2.122 2.12 2.76 2.76a2.112 2.112 0 0 1 2.373 2.374l2.766 2.767a2.116 2.116 0 0 1 0 2.951 2.116 2.116 0 0 1-2.95 0 2.116 2.116 0 0 1 0-2.95l-2.754-2.754v4.453a2.122 2.122 0 0 1-1.393 1.986v4.301a2.114 2.114 0 1 1-1.4 0v-4.3a2.124 2.124 0 0 1-1.396-1.987V10.22a2.124 2.124 0 0 1 1.396-1.987l-2.744-2.744-7.55 7.55a1.042 1.042 0 0 0 0 1.477l10.53 10.53a1.042 1.042 0 0 0 1.477 0l10.53-10.53a1.046 1.046 0 0 0 0-1.48z"/>
            </svg>
          )
        },
        {
          name: 'GitHub',
          icon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          )
        },
        {
          name: 'Postman',
          icon: (
            <svg className="w-4 h-4 text-[#ff6c37]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.914 0a3.636 3.636 0 0 0-3.632 3.631v3.292H4.99a3.635 3.635 0 0 0-3.631 3.632v6.55A3.635 3.635 0 0 0 4.99 20.74h3.292v2.544a.717.717 0 0 0 1.222.508l2.918-2.918h4.632a3.636 3.636 0 0 0 3.631-3.632v-6.55a3.635 3.635 0 0 0-3.631-3.632h-3.292V3.63A3.636 3.636 0 0 0 11.914 0zm0 1.442c1.214 0 2.19 1.002 2.19 2.19v3.292h-4.379V3.631c0-1.187.976-2.19 2.189-2.19zm-4.11 7.115v3.292H3.424V9.99c0-1.214.976-2.19 2.19-2.19h2.191zm10.512 0c1.213 0 2.19.976 2.19 2.19v6.55a2.192 2.192 0 0 1-2.19 2.19h-5.068l-2.454 2.454v-2.454H7.804V9.99a2.191 2.191 0 0 1 2.19-2.19h7.822z"/>
            </svg>
          )
        }
      ]
    },
  ];

  return (
    <section id="skills" className={`py-24 px-4 sm:px-6 lg:px-16 transition-colors duration-500 relative overflow-hidden ${
      isDarkMode ? 'bg-[#06141d] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Decorative Gradient Background Highlights */}
      <div className={`absolute top-1/4 -left-40 w-96 h-96 rounded-full filter blur-[120px] pointer-events-none opacity-20 transition-colors ${
        isDarkMode ? 'bg-cyan-500' : 'bg-blue-400'
      }`}></div>
      <div className={`absolute bottom-1/4 -right-40 w-96 h-96 rounded-full filter blur-[120px] pointer-events-none opacity-20 transition-colors ${
        isDarkMode ? 'bg-rose-500' : 'bg-rose-300'
      }`}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center lg:text-left mb-16 space-y-3">
          <span className={`text-xs font-mono font-bold tracking-widest uppercase ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
            Capabilities
          </span>
          <h2 className={`text-3xl sm:text-4xl font-mono font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Skill & Tech Stacks
          </h2>
          <p className={`text-sm max-w-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            A collection of tools, frameworks, and engineering methodologies used to assemble complex interactive applications.
          </p>
        </div>

        {/* Skills Grid Dashboard Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`p-7 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1.5 group relative overflow-hidden flex flex-col justify-between ${
                isDarkMode 
                  ? 'bg-[#081b27]/80 border-cyan-950/40 hover:border-cyan-500/30 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.4)]' 
                  : 'bg-white border-slate-200 hover:border-blue-500/30 shadow-[0_12px_30px_rgba(59,130,246,0.04)]'
              }`}
            >
              <div>
                {/* Top Row: Category Title & Glass Accent Icon */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-xl border flex items-center justify-center transition-all duration-300 shrink-0 ${
                    isDarkMode 
                      ? 'bg-cyan-950/50 border-cyan-500/10 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950 group-hover:shadow-lg group-hover:shadow-cyan-400/20' 
                      : 'bg-blue-50 border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-600/10'
                  }`}>
                    <category.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-extrabold text-lg tracking-tight transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500">
                      {category.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400/80' : 'text-slate-500'}`}>
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                {/* Individual Badges Map with Integrated Icons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {category.skills.map((skill, sIndex) => (
                    <div
                      key={sIndex}
                      className={`text-xs font-semibold px-3 2xl:px-3.5 py-2 rounded-xl border transition-all duration-300 flex items-center gap-2.5 ${
                        isDarkMode
                          ? 'bg-[#05141d]/90 text-slate-300 border-slate-800/80 hover:border-cyan-500/40 hover:text-white hover:bg-[#092230]'
                          : 'bg-slate-100 text-slate-600 border-slate-200/60 hover:border-blue-500/40 hover:text-slate-900 hover:bg-white'
                      }`}
                    >
                      <span className="flex items-center justify-center shrink-0 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                        {skill.icon}
                      </span>
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clean Subtle Linear Decorative Accent Background Indicator */}
              <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                isDarkMode ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-blue-600 to-cyan-500'
              }`}></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}