'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Send, CheckCircle, Copy, Check, Terminal, Globe } from 'lucide-react';
import Axios from '../utils/Axios.js';

import summeryApi from '@/common/summeryApi'; 

interface ContactProps {
  isDarkMode: boolean;
}

const flag = "https://res.cloudinary.com/djxfy60tt/image/upload/v1780952385/ethiopia-Photoroom_zqqcn5.png";

export default function ContactSection({ isDarkMode }: ContactProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMessage,setSuccessMessage] = useState('')

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('danielbizualem@example.com'); 
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      // Ensure path starts with a single leading slash
      const cleanPath = summeryApi.message.url.startsWith('/') 
        ? summeryApi.message.url 
        : `/${summeryApi.message.url}`;

      // Execute Axios request using configuration metadata safely
      const response = await Axios({
        method: summeryApi.message.method,
        url: cleanPath, // Explicitly override with the clean root path
        data: formData,
      });

      if (response.data.success){
        setSuccessMessage(response.data.message)
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }

      setTimeout(() => {
        setFormStatus('idle');
      }, 6000);

    } catch (error) {
      console.error("Pipeline Transmission Failed:", error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <section 
      id="contact"
      className={`min-h-screen flex flex-col justify-center relative overflow-hidden font-sans antialiased p-4 md:p-8 transition-colors duration-500 selection:bg-cyan-500 selection:text-slate-900 ${
        isDarkMode ? 'bg-[#06141d] text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className={`absolute inset-0 border rounded-3xl pointer-events-none m-2 md:m-4 z-50 transition-colors duration-500 ${
        isDarkMode ? 'border-cyan-500/20' : 'border-slate-300'
      }`}></div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: System Details & Dev Node Info */}
        <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
          <div className="space-y-3">
            
             <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Contact
            </h2>
            <p className={`text-xs md:text-sm leading-relaxed max-w-md mx-auto lg:mx-0 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Have a pipeline problem, a full-stack system requirement, or an automated RAG integration workflow to implement? Let’s deploy an optimized architecture together.
            </p>
          </div>

          {/* Quick Click Clipboard & System Communication Channels */}
          <div className="space-y-3 max-w-md mx-auto lg:mx-0">
            {/* Email Node */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 backdrop-blur-sm ${
              isDarkMode ? 'bg-[#0a1f2c]/40 border-cyan-500/10' : 'bg-white border-slate-200 shadow-md shadow-slate-100'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${
                  isDarkMode ? 'bg-[#06141d] border-cyan-500/20 text-cyan-400' : 'bg-slate-50 border-slate-200 text-blue-600'
                }`}>
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className={`text-[10px] uppercase font-mono tracking-wider block ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Direct Mail channels</span>
                  <span className="text-xs font-bold tracking-tight">danielbizualem4@gmail.com</span>
                </div>
              </div>
              
              <button
                onClick={handleCopyEmail}
                type="button"
                aria-label="Copy email address"
                className={`p-2 rounded-lg border transition-all duration-300 ${
                  copied 
                    ? (isDarkMode ? 'bg-cyan-950/40 border-cyan-400 text-cyan-400' : 'bg-green-50 border-green-500 text-green-600')
                    : (isDarkMode ? 'bg-[#06141d] border-cyan-500/20 text-slate-400 hover:text-cyan-400' : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-blue-600')
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Pipeline Node */}
            <a 
              href="tel:+251989957854"
              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 backdrop-blur-sm transition-all duration-300 group ${
                isDarkMode 
                  ? 'bg-[#0a1f2c]/40 border-cyan-500/10 hover:border-cyan-500/30' 
                  : 'bg-white border-slate-200 shadow-md shadow-slate-100 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border transition-colors duration-300 ${
                  isDarkMode ? 'bg-[#06141d] border-cyan-500/20 text-cyan-400 group-hover:text-cyan-300' : 'bg-slate-50 border-slate-200 text-blue-600 group-hover:text-blue-700'
                }`}>
                  <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className={`text-[10px] uppercase font-mono tracking-wider block ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Voice / Telegram Connection</span>
                  <span className="text-xs font-bold tracking-tight">+251 989 957 854</span>
                </div>
              </div>
              <div className={`text-[10px] font-mono tracking-tight px-2 py-1 rounded border transition-colors duration-300 ${
                isDarkMode ? 'border-cyan-950 bg-[#06141d] text-slate-500 group-hover:text-cyan-400' : 'border-slate-100 bg-slate-50 text-slate-400 group-hover:text-blue-600'
              }`}>
                CALL
              </div>
            </a>
          </div>

          {/* Network Node Badges */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3">
            <a 
              href="#" 
              aria-label="GitHub Profile"
              className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center ${
                isDarkMode ? 'bg-[#092230]/40 border-cyan-500/10 text-slate-400 hover:text-cyan-400' : 'bg-white border-slate-200 text-slate-500 hover:text-blue-600'
              }`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            <a 
              href="#" 
              aria-label="LinkedIn Profile"
              className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center ${
                isDarkMode ? 'bg-[#092230]/40 border-cyan-500/10 text-slate-400 hover:text-cyan-400' : 'bg-white border-slate-200 text-slate-500 hover:text-blue-600'
              }`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            <a 
              href="https://t.me/Daniel_Bizualem"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[10px] font-mono tracking-tight px-3 py-1.5 rounded-lg border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-[#06141d] border-cyan-950 text-slate-400 hover:border-cyan-500/30 hover:text-cyan-400' 
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-blue-600'
              }`}
            >
              <span>TG:@Daniel_Bizualem</span>
            </a>

            <div className={`text-[10px] font-mono tracking-tight px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${
              isDarkMode ? 'bg-[#06141d] border-cyan-950 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}>
              <Globe className="w-3.5 h-3.5 animate-pulse text-green-500" />
              <span className='flex gap-1 items-center'>Addis Ababa, ETHIOPIA 
                <img src={flag} alt="Ethiopian" width={15} height={15}/>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Client Contact Form */}
        <div className="lg:col-span-7">
          <div className={`p-6 md:p-8 rounded-2xl border transition-all duration-500 backdrop-blur-sm relative overflow-hidden ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } ${
            isDarkMode 
              ? 'bg-[#0a1f2c]/50 border-cyan-500/10 shadow-xl shadow-cyan-950/20' 
              : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
          }`}>
            
            {formStatus === 'success' && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                <div className={`p-4 rounded-full border ${isDarkMode ? 'bg-cyan-950/40 border-cyan-400 text-cyan-400' : 'bg-green-50 border-green-200 text-green-600'}`}>
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold tracking-tight">{successMessage}</h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Thank you for your contact.I will respond to your message shortly.
                  </p>
                </div>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                <div className="p-4 rounded-full border bg-red-50 border-red-200 text-red-600">
                  <Terminal className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold tracking-tight text-red-500">Pipeline Aborted</h3>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    An issue occurred while writing to the database. Re-initializing view...
                  </p>
                </div>
              </div>
            )}

            {(formStatus === 'idle' || formStatus === 'submitting') && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className={`text-[11px] font-mono font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      disabled={formStatus === 'submitting'}
                      className={`w-full px-4 py-3 rounded-xl border text-xs font-medium transition-all duration-300 focus:outline-none focus:ring-1 ${
                        isDarkMode 
                          ? 'bg-[#06141d] border-cyan-950 text-white focus:border-cyan-400 focus:ring-cyan-400' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-blue-500'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className={`text-[11px] font-mono font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      disabled={formStatus === 'submitting'}
                      className={`w-full px-4 py-3 rounded-xl border text-xs font-medium transition-all duration-300 focus:outline-none focus:ring-1 ${
                        isDarkMode 
                          ? 'bg-[#06141d] border-cyan-950 text-white focus:border-cyan-400 focus:ring-cyan-400' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-blue-500'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className={`text-[11px] font-mono font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    disabled={formStatus === 'submitting'}
                    className={`w-full px-4 py-3 rounded-xl border text-xs font-medium transition-all duration-300 resize-none focus:outline-none focus:ring-1 ${
                      isDarkMode 
                        ? 'bg-[#06141d] border-cyan-950 text-white focus:border-cyan-400 focus:ring-cyan-400' 
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 group ${
                    isDarkMode
                      ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:bg-cyan-950/20 disabled:text-cyan-800'
                      : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400'
                  }`}
                >
                  <span>{formStatus === 'submitting' ? 'Transmitting Data...' : 'Send Message'}</span>
                  
                </button>
              </form>
            )}

            <div className={`mt-5 pt-4 border-t flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-normal ${
              isDarkMode ? 'border-cyan-900/40 text-slate-500' : 'border-slate-100 text-slate-400'
            }`}>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}