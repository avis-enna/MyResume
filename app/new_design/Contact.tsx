"use client";

import { useState } from "react";
import { useDarkMode } from "./DarkModeContext";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { isDarkMode } = useDarkMode();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className={`py-16 sm:py-20 md:py-24 lg:py-32 transition-colors duration-500 scroll-mt-20 ${isDarkMode ? 'bg-slate-900' : 'bg-neutral-50'}`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.08em] sm:tracking-[0.1em] mb-3 sm:mb-4 transition-colors duration-500 ${isDarkMode ? 'text-amber-50' : 'text-slate-800'}`}>
              contact
            </h2>
            <div className={`w-12 sm:w-16 md:w-20 h-[1px] mx-auto transition-colors duration-500 ${isDarkMode ? 'bg-amber-700/60' : 'bg-amber-600/40'}`}></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
            <div className="space-y-8 sm:space-y-10">
              <div>
                <h3 className={`text-lg sm:text-xl font-light tracking-wide mb-6 sm:mb-8 transition-colors duration-500 ${isDarkMode ? 'text-amber-100' : 'text-slate-700'}`}>
                  let's work together
                </h3>
                <p className={`mb-8 sm:mb-10 leading-loose text-sm sm:text-base font-light transition-colors duration-500 ${isDarkMode ? 'text-amber-200/80' : 'text-slate-600'}`}>
                  I'm always interested in hearing about new opportunities and exciting projects. 
                  Whether you have a question or just want to say hello, I'll try my best to get back to you.
                </p>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h4 className={`text-sm tracking-[0.1em] uppercase mb-2 transition-colors duration-500 ${isDarkMode ? 'text-amber-300/80' : 'text-slate-600'}`}>email</h4>
                  <a href="mailto:vsivareddy.venna@gmail.com" className={`text-sm sm:text-base font-light transition-colors duration-300 hover:tracking-wide ${isDarkMode ? 'text-amber-200 hover:text-amber-50' : 'text-slate-700 hover:text-slate-900'}`}>
                    vsivareddy.venna@gmail.com
                  </a>
                </div>
                <div>
                  <h4 className={`text-sm tracking-[0.1em] uppercase mb-2 transition-colors duration-500 ${isDarkMode ? 'text-amber-300/80' : 'text-slate-600'}`}>phone</h4>
                  <a href="tel:+919398961541" className={`text-sm sm:text-base font-light transition-colors duration-300 hover:tracking-wide ${isDarkMode ? 'text-amber-200 hover:text-amber-50' : 'text-slate-700 hover:text-slate-900'}`}>
                    +91 93989 61541
                  </a>
                </div>
                <div>
                  <h4 className={`text-sm tracking-[0.1em] uppercase mb-2 transition-colors duration-500 ${isDarkMode ? 'text-amber-300/80' : 'text-slate-600'}`}>location</h4>
                  <p className={`text-sm sm:text-base font-light transition-colors duration-500 ${isDarkMode ? 'text-amber-200' : 'text-slate-700'}`}>
                    Bengaluru, India
                  </p>
                </div>
              </div>

              <div className="pt-8 sm:pt-10">
                <div className="flex space-x-8 sm:space-x-10">
                  <a href="https://linkedin.com/in/sivavenna" target="_blank" rel="noopener noreferrer" className="group">
                    <span className={`text-xs tracking-[0.1em] uppercase transition-all duration-300 hover:tracking-[0.2em] ${isDarkMode ? 'text-amber-300/80 hover:text-amber-200' : 'text-slate-600 hover:text-slate-800'}`}>
                      linkedin
                    </span>
                  </a>
                  <a href="https://github.com/sivavenna" target="_blank" rel="noopener noreferrer" className="group">
                    <span className={`text-xs tracking-[0.1em] uppercase transition-all duration-300 hover:tracking-[0.2em] ${isDarkMode ? 'text-amber-300/80 hover:text-amber-200' : 'text-slate-600 hover:text-slate-800'}`}>
                      github
                    </span>
                  </a>
                  <a href="mailto:vsivareddy.venna@gmail.com" className="group">
                    <span className={`text-xs tracking-[0.1em] uppercase transition-all duration-300 hover:tracking-[0.2em] ${isDarkMode ? 'text-amber-300/80 hover:text-amber-200' : 'text-slate-600 hover:text-slate-800'}`}>
                      email
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
                <div>
                  <label htmlFor="name" className={`block text-xs tracking-[0.1em] uppercase mb-3 transition-colors duration-500 ${isDarkMode ? 'text-amber-300/80' : 'text-slate-600'}`}>
                    name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-0 py-3 border-0 border-b bg-transparent focus:outline-none focus:border-b-2 transition-all duration-300 font-light ${
                      isDarkMode 
                        ? 'border-amber-800/70 text-amber-100 focus:border-amber-600/40 placeholder-amber-400/60' 
                        : 'border-amber-600/30 text-slate-800 focus:border-amber-700/60 placeholder-slate-500'
                    }`}
                    placeholder="your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`block text-xs tracking-[0.1em] uppercase mb-3 transition-colors duration-500 ${isDarkMode ? 'text-amber-300/80' : 'text-slate-600'}`}>
                    email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-0 py-3 border-0 border-b bg-transparent focus:outline-none focus:border-b-2 transition-all duration-300 font-light ${
                      isDarkMode 
                        ? 'border-amber-800/70 text-amber-100 focus:border-amber-600/40 placeholder-amber-400/60' 
                        : 'border-amber-600/30 text-slate-800 focus:border-amber-700/60 placeholder-slate-500'
                    }`}
                    placeholder="your email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className={`block text-xs tracking-[0.1em] uppercase mb-3 transition-colors duration-500 ${isDarkMode ? 'text-amber-300/80' : 'text-slate-600'}`}>
                    message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-0 py-3 border-0 border-b bg-transparent focus:outline-none focus:border-b-2 transition-all duration-300 font-light resize-none ${
                      isDarkMode 
                        ? 'border-amber-800/70 text-amber-100 focus:border-amber-600/40 placeholder-amber-400/60' 
                        : 'border-amber-600/30 text-slate-800 focus:border-amber-700/60 placeholder-slate-500'
                    }`}
                    placeholder="your message"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className={`group relative px-8 py-4 border transition-all duration-700 hover:scale-[1.02] hover:shadow-lg ${
                      isDarkMode 
                        ? 'border-amber-700/60 text-amber-200 hover:border-amber-600 hover:text-amber-100 hover:shadow-amber-900/30' 
                        : 'border-amber-600/40 text-slate-800 hover:border-amber-600 hover:text-slate-900 hover:shadow-amber-200/50'
                    }`}
                  >
                    <span className="relative z-10 tracking-[0.1em] text-sm font-light uppercase">send message</span>
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 ${isDarkMode ? 'bg-amber-400' : 'bg-amber-600'}`}></div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
