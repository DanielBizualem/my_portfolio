'use client';

import React, { useEffect, useState } from 'react';
import { Layers, Puzzle, ShieldCheck, BrainCircuit, CheckCircle2 } from 'lucide-react';
import { getTheme } from './theme';

interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  badge: string;
  description: string;
  capabilities: string[];
  imageUrl?: string;
}

interface ServicesProps {
  isDarkMode: boolean;
}

export default function ServicesSection({ isDarkMode }: ServicesProps) {
  const theme = getTheme(isDarkMode);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const servicesData: ServiceItem[] = [
    {
      icon: Layers,
      title: 'Full-Stack Web Development',
      badge: 'End-to-End Systems',
      description: 'Engineering responsive front-ends paired with enterprise-ready server logic. Architecting clean database designs and fast deployment paths using Next.js, React, and modern state paradigms.',
      capabilities: ['Custom Dashboard UI', 'Robust State Pipelines', 'Scalable Database Models'],
      imageUrl: 'https://res.cloudinary.com/djxfy60tt/image/upload/v1780956222/fullstack_ifhxcl.jpg'
    },
    {
      icon: Puzzle,
      title: 'Software Integration Systems',
      badge: 'Ecosystem Synergy',
      description: 'Bridging isolated software modules into optimized, synchronized pipelines. Building custom RESTful interfaces, managing webhook handlers, and unifying multi-service tech stacks cleanly.',
      capabilities: ['API Lifecycle Architecture', 'Third-Party Webhooks', 'Decoupled Middleware Sync'],
      imageUrl: 'https://res.cloudinary.com/djxfy60tt/image/upload/v1780956240/software_integration_vufxx8.jpg'
    },
    {
      icon: ShieldCheck,
      title: 'Rigorous Software Testing',
      badge: 'Quality Assurance',
      description: 'Enforcing stability through strict automated test workflows. Isolating architectural bottlenecks, streamlining edge-case validation, and reducing post-deployment logic failure parameters.',
      capabilities: ['Unit & Integration Suites', 'Regression Verification', 'Performance Validation'],
      imageUrl: 'https://res.cloudinary.com/djxfy60tt/image/upload/v1780956240/software_testing_fkt6gt.jpg'
    },
    {
      icon: BrainCircuit,
      title: 'AI Architectures & RAG Systems',
      badge: 'Intelligent Automations',
      description: 'Developing specialized AI pipelines and Retrieval-Augmented Generation (RAG) systems. Implementing vector databases, orchestrating clean context retrieval, and fine-tuning lightweight vision or text models.',
      capabilities: ['Vector DB & Context Retrieval', 'CNN & Pattern Tracking', 'Data Pre-processing Matrix'],
      imageUrl: 'https://res.cloudinary.com/djxfy60tt/image/upload/v1780956217/RAG_no_watermark_crqslw.png'
    }
  ];

  return (
    <section
      id="services"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden font-sans antialiased p-4 md:p-8 transition-colors duration-500"
      style={{ backgroundColor: theme.pageBg, color: theme.text }}
    >
      {/* Outer border container accent matching previous modules */}
      <div
        className="absolute inset-0 border rounded-3xl pointer-events-none m-2 md:m-4 z-40 transition-colors duration-500"
        style={{ borderColor: theme.frameBorder }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10 space-y-12">

        {/* Section Header */}
        <div className="space-y-3 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-mono font-black tracking-tight" style={{ color: theme.text }}>
            Services & Solutions
          </h2>
        </div>

        {/* Services Grid Layout - Cleanly scaled across grid breakpoints */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className={`p-5 md:p-6 rounded-2xl border flex flex-col justify-between transition-all duration-500 group relative overflow-hidden backdrop-blur-sm h-full ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                backgroundColor: `${theme.panelBg}aa`,
                borderColor: theme.panelBorder,
                boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Subtle Corner Glow Accent on Hover */}
              <div
                className="absolute -right-12 -top-12 w-24 h-24 rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: theme.accent, opacity: 0.1 }}
              />

              {/* Upper Section */}
              <div className="flex flex-col flex-grow">
                {/* Service Metadata Row */}
                <div className="flex justify-between items-start mb-5">
                  <div
                    className="p-2.5 rounded-xl border transition-colors duration-300"
                    style={{ backgroundColor: theme.panelHeaderBg, borderColor: theme.panelBorder, color: theme.accent }}
                  >
                    <service.icon className="w-5 h-5" />
                  </div>
                  <span
                    className="text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded border whitespace-nowrap"
                    style={{ borderColor: theme.panelBorder, backgroundColor: theme.panelHeaderBg, color: theme.accent }}
                  >
                    {service.badge}
                  </span>
                </div>

                {/* Service Text Blocks */}
                <h3 className="text-lg font-bold tracking-tight mb-2.5 transition-colors duration-300" style={{ color: theme.text }}>
                  {service.title}
                </h3>

                <p className="text-xs leading-relaxed mb-5 flex-grow" style={{ color: theme.textMuted }}>
                  {service.description}
                </p>
              </div>

              {/* Scope Capabilities Checklists */}
              <div className="pt-4 border-t" style={{ borderColor: theme.panelBorder }}>
                <div className="grid gap-2">
                  {service.capabilities.map((cap, capIdx) => (
                    <div key={capIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: theme.accent, opacity: 0.7 }} />
                      <span className="text-xs font-medium tracking-tight" style={{ color: theme.text }}>
                        {cap}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}