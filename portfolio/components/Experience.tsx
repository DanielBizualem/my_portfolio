'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Briefcase, Users, Calendar, MapPin } from 'lucide-react';
import { getTheme, gridBackgroundStyle } from './theme';

interface TimelineItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'internship' | 'project';
  description: string[];
  highlights?: string[];
}

interface ExperienceProps {
  isDarkMode: boolean;
}

export default function ExperienceSection({ isDarkMode }: ExperienceProps) {
  const theme = getTheme(isDarkMode);

  const timelineData: TimelineItem[] = [
    {
      role: 'Software Engineer Intern',
      company: 'Adama Smart City Project',
      location: 'Adama, Ethiopia',
      period: '2025',
      type: 'internship',
      description: [
        'Contributed to real-time urban monitoring services and database optimization structures tailored for localized city metrics.',
        'Collaborated on building highly available architectural subsystems to reduce response packet weight over low-bandwidth client infrastructure.'
      ],
      highlights: ['Next.js Frameworks', 'API Optimization', 'Smart Data Architectures']
    },
    {
      role: 'Full-Stack Developer Intern',
      company: 'Appable Technology',
      location: 'Addis Ababa, Ethiopia',
      period: '2024',
      type: 'internship',
      description: [
        'Built modular components for production-grade web applications using modern MERN and Next.js technology pipelines.',
        'Refined software backlogs, integrated clean state-management logic, and reduced front-end rendering delays.'
      ],
      highlights: ['React / Node.js', 'Backlog Refinement', 'UI State Management']
    }
  ];

  const teamProjects = [
    {
      title: 'ConWise Project',
      role: 'Frontend & Integration',
      desc: 'An enterprise construction management system built to track complex on-site resource allocations and streamline multi-engineer collaboration architectures.',
    },
    {
      title: 'Oromia Tourism Management',
      role: 'Backend Development',
      desc: 'An integrated booking platform and digital location repository built for international visitors discovering points of interest throughout Oromia.',
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      }
    }
  };

  const itemLeftVariants: Variants = {
    hidden: { opacity: 0, x: -25 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  const itemRightVariants: Variants = {
    hidden: { opacity: 0, x: 25 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 90, damping: 18 }
    }
  };

  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden font-sans antialiased p-4 md:p-8 transition-colors duration-500"
      style={{ backgroundColor: theme.pageBg, color: theme.text }}
    >
      {/* Square grid background, matching the hero */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={gridBackgroundStyle(theme)} />

      {/* Outer border container accent */}
      <div
        className="absolute inset-0 border rounded-3xl pointer-events-none m-2 md:m-4 z-40 transition-colors duration-500"
        style={{ borderColor: theme.frameBorder }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
      >

        {/* Left Side: Page Sticky Header & Team Projects Grid */}
        <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-8">
          <motion.div variants={itemLeftVariants} className="space-y-3 text-center lg:text-left">
            <h2 className="text-3xl font-mono sm:text-4xl font-black tracking-tight" style={{ color: theme.text }}>
              Experience
            </h2>
            <p className="text-xs md:text-sm leading-relaxed max-w-md mx-auto lg:mx-0" style={{ color: theme.textMuted }}>
              Bridging academic rigor at ASTU with enterprise software deployment across critical hubs in Ethiopia.
            </p>
          </motion.div>

          {/* Team Projects Sub-Section Grid */}
          <motion.div variants={itemLeftVariants} className="space-y-4">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <Users className="w-4 h-4" style={{ color: theme.accent }} />
              <h3 className="text-xs font-extrabold uppercase tracking-widest">Featured Team Projects</h3>
            </div>

            <div className="grid gap-4">
              {teamProjects.map((proj) => (
                <motion.div
                  key={proj.title}
                  whileHover={{ y: -3, scale: 1.01, borderColor: theme.accent }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="p-5 rounded-xl border transition-colors duration-300 relative group"
                  style={{ backgroundColor: `${theme.panelBg}66`, borderColor: theme.panelBorder }}
                >
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h4 className="text-sm font-bold tracking-tight transition-colors" style={{ color: theme.text }}>
                      {proj.title}
                    </h4>
                    <span
                      className="text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded border whitespace-nowrap"
                      style={{ borderColor: theme.panelBorder, backgroundColor: theme.panelHeaderBg, color: theme.accent }}
                    >
                      {proj.role}
                    </span>
                  </div>
                  <p className="text-xs leading-normal" style={{ color: theme.textMuted }}>
                    {proj.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Corporate Experience Timeline Stack */}
        <div className="lg:col-span-7 space-y-8 relative pl-6 md:pl-8">

          {/* Vertical Timeline Vector Backbone Accent */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="absolute left-0 top-2 bottom-2 w-[2px]"
            style={{ backgroundColor: theme.panelBorder }}
          />

          {timelineData.map((item) => (
            <motion.div
              key={`${item.company}-${item.role}`}
              variants={itemRightVariants}
              className="relative"
            >
              {/* Timeline Hub Node Pin */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.3 }}
                className="absolute -left-[31px] md:-left-[35px] top-1.5 p-1 rounded-full border z-10"
                style={{ backgroundColor: theme.pageBg, borderColor: theme.accent, color: theme.accent }}
              >
                <Briefcase className="w-3 h-3 md:w-3.5 md:h-3.5" />
              </motion.div>

              {/* Main Card Element Block */}
              <motion.div
                whileHover={{ y: -4, borderColor: theme.accent }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="p-6 rounded-2xl border transition-colors duration-500 backdrop-blur-sm group"
                style={{ backgroundColor: `${theme.panelBg}aa`, borderColor: theme.panelBorder }}
              >
                {/* Meta Matrix Headers */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight transition-colors duration-300" style={{ color: theme.text }}>
                      {item.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs font-semibold">
                      <span style={{ color: theme.accent }}>{item.company}</span>
                      <span className="w-1 h-1 rounded-full hidden sm:inline-block" style={{ backgroundColor: theme.panelBorder }} />
                      <span className="flex items-center gap-1 font-normal" style={{ color: theme.textMuted }}>
                        <MapPin className="w-3 h-3" /> {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Year Tag Wrapper */}
                  <div
                    className="flex items-center gap-1 px-3 py-1 rounded text-xs font-mono font-bold max-w-fit self-start sm:self-center border"
                    style={{ backgroundColor: theme.panelHeaderBg, color: theme.accent, borderColor: theme.panelBorder }}
                  >
                    <Calendar className="w-3 h-3" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Bullets List Mapping */}
                <ul className="space-y-2.5 mb-5">
                  {item.description.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="text-xs md:text-sm leading-relaxed flex items-start gap-2.5"
                      style={{ color: theme.textMuted }}
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: theme.accent }} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Technical Stack Highlights Micro-Chips */}
                {item.highlights && (
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-dashed transition-colors duration-300" style={{ borderColor: theme.panelBorder }}>
                    {item.highlights.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded border"
                        style={{ backgroundColor: theme.panelHeaderBg, color: theme.textMuted, borderColor: theme.panelBorder }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}

              </motion.div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}