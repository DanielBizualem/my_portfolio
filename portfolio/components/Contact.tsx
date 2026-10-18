'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Send, CheckCircle, Copy, Check, Globe } from 'lucide-react';
import { getTheme } from './theme';

interface ContactProps {
  isDarkMode: boolean;
}

const flag = "https://res.cloudinary.com/djxfy60tt/image/upload/v1780952385/ethiopia-Photoroom_zqqcn5.png";

export default function ContactSection({ isDarkMode }: ContactProps) {
  const theme = getTheme(isDarkMode);
  const [isLoaded, setIsLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('danielbizualem4@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();
      console.log("Web3Forms Response:", result);

      if (result.success) {
        setStatus("success");
        // Keep success message for 6 seconds, then return to form
        setTimeout(() => {
          setStatus("idle");
        }, 6000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden font-sans antialiased p-4 md:p-8 transition-colors duration-500"
      style={{ backgroundColor: theme.pageBg, color: theme.text }}
    >
      <div
        className="absolute inset-0 border rounded-3xl pointer-events-none m-2 md:m-4 z-50 transition-colors duration-500"
        style={{ borderColor: theme.frameBorder }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10 grid lg:grid-cols-12 gap-12 items-center">

        {/* Left Side */}
        <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-mono font-black tracking-tight" style={{ color: theme.text }}>
              Contact
            </h2>
            <p className="text-xs md:text-sm leading-relaxed max-w-md mx-auto lg:mx-0" style={{ color: theme.textMuted }}>
              Have a pipeline problem, a full-stack system requirement, or an automated RAG integration workflow to implement? Let&apos;s deploy an optimized architecture together.
            </p>
          </div>

          <div className="space-y-3 max-w-md mx-auto lg:mx-0">
            {/* Email Card */}
            <div
              className="p-4 rounded-2xl border flex items-center justify-between gap-4 backdrop-blur-sm"
              style={{ backgroundColor: `${theme.panelBg}66`, borderColor: theme.panelBorder }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl border" style={{ backgroundColor: theme.panelHeaderBg, borderColor: theme.panelBorder, color: theme.accent }}>
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-mono tracking-wider block" style={{ color: theme.textMuted }}>
                    Direct Mail channels
                  </span>
                  <span className="text-xs font-bold tracking-tight" style={{ color: theme.text }}>
                    danielbizualem4@gmail.com
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                type="button"
                aria-label="Copy email address"
                className="p-2 rounded-lg border transition-all duration-300"
                style={{
                  backgroundColor: theme.panelHeaderBg,
                  borderColor: copied ? theme.accent : theme.panelBorder,
                  color: copied ? theme.accent : theme.textMuted,
                }}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <a
              href="tel:+251989957854"
              className="p-4 rounded-2xl border flex items-center justify-between gap-4 backdrop-blur-sm transition-all duration-300"
              style={{ backgroundColor: `${theme.panelBg}66`, borderColor: theme.panelBorder }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl border" style={{ backgroundColor: theme.panelHeaderBg, borderColor: theme.panelBorder, color: theme.accent }}>
                  <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-mono tracking-wider block" style={{ color: theme.textMuted }}>
                    Voice / Telegram Connection
                  </span>
                  <span className="text-xs font-bold tracking-tight" style={{ color: theme.text }}>
                    +251 989 957 854
                  </span>
                </div>
              </div>
              <div
                className="text-[10px] font-mono tracking-tight px-2 py-1 rounded border"
                style={{ borderColor: theme.panelBorder, backgroundColor: theme.panelHeaderBg, color: theme.textMuted }}
              >
                CALL
              </div>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3">
            <a
              href="https://github.com/DanielBizualem"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center"
              style={{ backgroundColor: `${theme.panelBg}66`, borderColor: theme.panelBorder, color: theme.textMuted }}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/daniel-bizualem-34289938a/"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center"
              style={{ backgroundColor: `${theme.panelBg}66`, borderColor: theme.panelBorder, color: theme.textMuted }}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            <a
              href="https://t.me/Daniel_Bizualem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono tracking-tight px-3 py-1.5 rounded-lg border transition-all duration-300"
              style={{ backgroundColor: theme.panelHeaderBg, borderColor: theme.panelBorder, color: theme.textMuted }}
            >
              TG:@Daniel_Bizualem
            </a>

            <div
              className="text-[10px] font-mono tracking-tight px-3 py-1.5 rounded-lg border flex items-center gap-1.5"
              style={{ backgroundColor: theme.panelHeaderBg, borderColor: theme.panelBorder, color: theme.textMuted }}
            >
              <Globe className="w-3.5 h-3.5 animate-pulse text-green-500" />
              <span className="flex gap-1 items-center">
                Addis Ababa, ETHIOPIA
                <img src={flag} alt="Ethiopian" width={15} height={15} />
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Form / Success */}
        <div className="lg:col-span-7">
          <div
            className={`p-6 md:p-8 rounded-2xl border transition-all duration-500 backdrop-blur-sm relative overflow-hidden ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              backgroundColor: `${theme.panelBg}aa`,
              borderColor: theme.panelBorder,
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            }}
          >
            {/* SUCCESS STATE */}
            {status === "success" ? (
              <div className="py-16 flex flex-col items-center justify-center text-center space-y-5">
                <div
                  className="p-4 rounded-full border"
                  style={{
                    backgroundColor: theme.panelHeaderBg,
                    borderColor: theme.accent,
                    color: theme.accent,
                  }}
                >
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-tight" style={{ color: theme.text }}>
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm" style={{ color: theme.textMuted }}>
                    Thank you for reaching out. I will reply as soon as possible.
                  </p>
                </div>
              </div>
            ) : (
              /* FORM STATE */
              <form onSubmit={onSubmit} className="space-y-5">
                <input type="hidden" name="access_key" value="4538046f-ad2e-408b-9ca8-430b80b26a1e" />
                <input type="hidden" name="from_name" value="Portfolio Contact Form" />

                {/* Honeypot */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-medium" style={{ color: theme.text }}>
                    Name
                    <input
                      name="name"
                      required
                      autoComplete="name"
                      className="mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none"
                      style={{
                        backgroundColor: theme.panelHeaderBg,
                        borderColor: theme.panelBorder,
                        color: theme.text,
                      }}
                      placeholder="Enter your name"
                    />
                  </label>

                  <label className="block text-sm font-medium" style={{ color: theme.text }}>
                    Email
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none"
                      style={{
                        backgroundColor: theme.panelHeaderBg,
                        borderColor: theme.panelBorder,
                        color: theme.text,
                      }}
                      placeholder="example@gmail.com"
                    />
                  </label>
                </div>

                <label className="block text-sm font-medium" style={{ color: theme.text }}>
                  Subject
                  <input
                    name="subject"
                    required
                    className="mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none"
                    style={{
                      backgroundColor: theme.panelHeaderBg,
                      borderColor: theme.panelBorder,
                      color: theme.text,
                    }}
                    placeholder="Enter subject"
                  />
                </label>

                <label className="block text-sm font-medium" style={{ color: theme.text }}>
                  Message
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none resize-none leading-7"
                    style={{
                      backgroundColor: theme.panelHeaderBg,
                      borderColor: theme.panelBorder,
                      color: theme.text,
                    }}
                    placeholder="Write your message"
                  />
                </label>

                {status === "error" && (
                  <p className="text-sm font-medium text-red-500">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-60"
                  style={{ backgroundColor: theme.accent }}
                >
                  {status === "sending" ? (
                    <>
                      <Send className="w-4 h-4 animate-pulse" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}