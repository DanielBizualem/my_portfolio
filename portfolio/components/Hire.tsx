'use client';

import React, { useState } from 'react';
import { User, Mail, Briefcase, MessageSquare, CheckCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import CountryPhoneInput from './CountryPhoneInput';
import Axios from '../utils/Axios.js';
import summeryApi from '@/common/summeryApi';

interface HireMeFormProps {
  isDarkMode?: boolean;
}

export default function HireMeForm({ isDarkMode = true }: HireMeFormProps) {
  const initialFormState = {
    name: '',
    email: '',
    countryCode: '+251', 
    phone: '',
    project_scope: 'Full-Stack Development',
    message: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await Axios({
        ...summeryApi.hire,
        data: {
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode}${formData.phone}`,
          project_scope: formData.project_scope,
          message: formData.message,
        },
      });

      if (response.data.success) {
        // Grab confirmation string from API response and set state to replace form layout
        setSuccessMessage(response.data.message || 'Proposal sent successfully!');
        
        // Reset inputs behind the scenes
        setFormData(initialFormState);
      } else {
        alert(response.data.message || 'Failed to submit proposal.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert(error instanceof Error ? error.message : 'Failed to connect to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetForm = () => {
    setSuccessMessage(null);
  };

  return (
    <section id="hire-me" className={`px-6 lg:px-16 transition-colors duration-500 relative ${
      isDarkMode ? 'bg-[#06141d] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-2">
          <span className={`text-xs uppercase tracking-widest font-bold ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
            Collaborate
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Let's Build Something Great
          </h2>
          <p className={`text-sm max-w-md mx-auto mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Have a project in mind or a position to fill? Drop the details below and let's coordinate.
          </p>
          <div className={`w-12 h-1 rounded-full mx-auto mt-4 ${isDarkMode ? 'bg-cyan-400' : 'bg-blue-600'}`}></div>
        </div>

        {/* Card Frame Context */}
        <div className={`p-6 md:p-10 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
          isDarkMode 
            ? 'bg-[#092230] border-cyan-950/40 shadow-[0_4px_30px_rgba(0,0,0,0.4)]' 
            : 'bg-white border-slate-200 shadow-[0_4px_30px_rgba(0,0,0,0.05)]'
        }`}>
          
          {successMessage ? (
            /* Elegant high-contrast placeholder rendering on success */
            <div className="py-10 text-center space-y-6 max-w-md mx-auto animate-fadeIn">
              <div className="flex justify-center">
                <div className={`p-4 rounded-full ${isDarkMode ? 'bg-cyan-950/50 text-cyan-400' : 'bg-blue-50 text-blue-600'}`}>
                  <CheckCircle className="w-12 h-12" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-black tracking-tight">
                  {successMessage}
                </h3>
                
              </div>

              {/* Action Routes Navigation Footnotes */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full">
                <Link
                  href="/"
                  className={`w-full sm:w-auto text-xs uppercase font-bold tracking-wider px-5 py-3 rounded-xl flex items-center justify-center gap-2 border transition-all ${
                    isDarkMode 
                      ? 'border-slate-800 bg-slate-900/40 hover:bg-slate-900 text-slate-300 hover:text-white' 
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Portfolio
                </Link>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className={`w-full sm:w-auto text-xs uppercase font-bold tracking-wider px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    isDarkMode 
                      ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            /* Default Unlocked Native Core Form Layout Section */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Input Row: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name Field */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Your Name
                  </label>
                  <div className="relative flex items-center">
                    <User className={`w-4 h-4 absolute left-4 ${isDarkMode ? 'text-cyan-500/70' : 'text-blue-500/70'}`} />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full text-sm pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 outline-none ${
                        isDarkMode
                          ? 'bg-slate-900/60 border-slate-800/80 text-white placeholder-slate-600 focus:border-cyan-500/60 focus:bg-slate-900'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500/60 focus:bg-white'
                      }`}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className={`w-4 h-4 absolute left-4 ${isDarkMode ? 'text-cyan-500/70' : 'text-blue-500/70'}`} />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="johndoe@example.com"
                      className={`w-full text-sm pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 outline-none ${
                        isDarkMode
                          ? 'bg-slate-900/60 border-slate-800/80 text-white placeholder-slate-600 focus:border-cyan-500/60 focus:bg-slate-900'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500/60 focus:bg-white'
                      }`}
                    />
                  </div>
                </div>

              </div>

              {/* Input Row: Phone Number & Project Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">

                <CountryPhoneInput
                  isDarkMode={isDarkMode}
                  phone={formData.phone}
                  selectedCode={formData.countryCode}
                  onChange={({ phone, countryCode }) => setFormData({ ...formData, phone, countryCode })}
                />
                
                {/* Project Category Select */}
                <div className="space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Project Scope
                  </label>
                  <div className="relative flex items-center">
                    <Briefcase className={`w-4 h-4 absolute left-4 ${isDarkMode ? 'text-cyan-500/70' : 'text-blue-500/70'}`} />
                    <select
                      name="project_scope"
                      value={formData.project_scope}
                      onChange={handleChange}
                      className={`w-full text-sm pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 outline-none appearance-none cursor-pointer ${
                        isDarkMode
                          ? 'bg-slate-900/60 border-slate-800/80 text-white focus:border-cyan-500/60 focus:bg-slate-900'
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500/60 focus:bg-white'
                      }`}
                    >
                      <option value="Full-Stack Development">Full-Stack Development</option>
                      <option value="Frontend Engineering">Frontend development</option>
                      <option value="Backend Systems & APIs">Backend development</option>
                      <option value="Software Testing">Software Testing & QA</option>
                      <option value="Long-term Partnership">Other</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Message / Project Brief Field */}
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Project Details
                </label>
                <div className="relative flex items-start">
                  <MessageSquare className={`w-4 h-4 absolute left-4 top-3.5 ${isDarkMode ? 'text-cyan-500/70' : 'text-blue-500/70'}`} />
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Outline your structural goals, target timeline, or project specifications..."
                    className={`w-full text-sm pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 outline-none resize-none ${
                      isDarkMode
                        ? 'bg-slate-900/60 border-slate-800/80 text-white placeholder-slate-600 focus:border-cyan-500/60 focus:bg-slate-900'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500/60 focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              {/* Action Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-[0.98] ${
                  isDarkMode
                    ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/10 disabled:bg-cyan-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/10 disabled:bg-blue-400'
                } disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Send Proposal</span>
                  </div>
                )}
              </button>

            </form>
          )}

          {/* Decorative Bottom Linear Highlight */}
          <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${
            isDarkMode ? 'bg-cyan-400' : 'bg-blue-600'
          }`}></div>
        </div>

      </div>
    </section>
  );
}