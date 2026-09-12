'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';

interface FloatingContactDockProps {
  isDarkMode: boolean;
}

interface ContactLink {
  label: string;
  href: string;
  icon: React.ElementType;
}

const NAVY = '#101828';

const links: ContactLink[] = [
  { label: 'GitHub', href: 'https://github.com/yourusername', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername', icon: FaLinkedin },
  { label: 'Email', href: 'mailto:danielbizualem4@gmail.com', icon: HiOutlineMail },
  { label: '+251 989 957 854', href: 'tel:+251989957854', icon: Phone },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  rest: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: 0.3 + i * 0.08,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
  hover: {
    scale: 1.05,
    transition: { duration: 0.15, ease: 'easeOut' },
  },
};

const labelVariants: Variants = {
  hidden: { width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 },
  rest: { width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 },
  hover: {
    width: 'auto',
    opacity: 1,
    paddingLeft: 18,
    paddingRight: 12,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

export default function FloatingContactDock({ isDarkMode }: FloatingContactDockProps) {
  return (
    <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-3 items-end">
      {links.map(({ label, href, icon: Icon }, idx) => {
        const isExternal = href.startsWith('http');

        return (
          <motion.a
            key={label}
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            aria-label={label}
            custom={idx}
            variants={itemVariants}
            initial="hidden"
            animate="rest"
            whileHover="hover"
            className={`flex flex-row-reverse items-center rounded-full border overflow-hidden shadow-sm ${
              isDarkMode ? 'border-white/10' : 'border-slate-200'
            }`}
            style={{ backgroundColor: isDarkMode ? '#0e1420' : '#ffffff' }}
          >
            {/* Icon */}
            <span
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full"
              style={{ backgroundColor: NAVY }}
            >
              <Icon size={17} className="text-white" strokeWidth={1.8} />
            </span>

            {/* Label */}
            <motion.span
              variants={labelVariants}
              className="whitespace-nowrap text-[13px] font-medium overflow-hidden text-right"
              style={{ color: isDarkMode ? '#e2e8f0' : '#1e293b' }}
            >
              {label}
            </motion.span>
          </motion.a>
        );
      })}
    </div>
  );
}