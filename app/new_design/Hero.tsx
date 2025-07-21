"use client";

import { useState, useEffect } from "react";
import { useDarkMode } from "./DarkModeContext";

export default function Hero() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const { isDarkMode } = useDarkMode();
  
  const titles = [
    "network engineer",
    "software engineer trainee",
    "backend developer", 
    "system administrator"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 4000); // Slower, more deliberate
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={`h-screen flex flex-col justify-center items-center relative transition-colors duration-700 ${isDarkMode ? 'bg-slate-900' : 'bg-neutral-50'} pt-20 sm:pt-24`}>
      {/* Sophisticated background texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-700 ${isDarkMode ? 'from-amber-900/20 via-transparent to-amber-800/10' : 'from-amber-50 via-transparent to-amber-100/50'}`}></div>
      </div>

      {/* Elegant container */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center relative z-10 max-w-5xl py-20">
        
        {/* Refined SVR monogram */}
        <div className="mb-16 sm:mb-20 md:mb-28">
          <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight tracking-[0.2em] sm:tracking-[0.4em] mb-6 sm:mb-10 transition-all duration-700 ${isDarkMode ? 'text-amber-50' : 'text-slate-900'}`}>
            <span className="inline-block hover:tracking-[0.25em] sm:hover:tracking-[0.45em] transition-all duration-700 hover:text-amber-600">S</span>
            <span className="inline-block hover:tracking-[0.25em] sm:hover:tracking-[0.45em] transition-all duration-700 delay-100 hover:text-amber-600">V</span>
            <span className="inline-block hover:tracking-[0.25em] sm:hover:tracking-[0.45em] transition-all duration-700 delay-200 hover:text-amber-600">R</span>
          </h1>
          <div className={`w-20 sm:w-32 h-[1px] mx-auto transition-all duration-700 ${isDarkMode ? 'bg-amber-700/60' : 'bg-amber-600/40'}`}></div>
        </div>
        
        {/* Elegant name presentation */}
        <div className="mb-16 sm:mb-20 md:mb-24">
          <p className={`text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.35em] uppercase font-light transition-all duration-700 ${isDarkMode ? 'text-amber-200/70' : 'text-slate-600'}`}>
            venna venkata siva reddy
          </p>
          <div className={`w-12 sm:w-20 h-[0.5px] mx-auto mt-3 sm:mt-4 transition-all duration-700 ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-500/30'}`}></div>
        </div>
        
        {/* Sophisticated role presentation */}
        <div className="mb-16 sm:mb-20 md:mb-24">
          <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.05em] sm:tracking-[0.08em] leading-relaxed transition-all duration-700 ${isDarkMode ? 'text-amber-100' : 'text-slate-800'}`}>
            {titles[currentTitle]}
          </h2>
          <div className={`w-8 sm:w-12 h-[0.5px] mx-auto mt-4 sm:mt-6 transition-all duration-700 ${isDarkMode ? 'bg-amber-700/60' : 'bg-amber-600/40'}`}></div>
        </div>

        {/* Refined description */}
        <div className="max-w-xl sm:max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <p className={`text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose font-light tracking-[0.01em] transition-all duration-700 ${isDarkMode ? 'text-amber-200/80' : 'text-slate-700'}`}>
            Distinguished network engineer specializing in infrastructure design and system automation. 
            Currently advancing expertise at Cisco Systems with professional certifications in CCNA and CCCA.
          </p>
        </div>

        {/* Luxurious call-to-action buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 md:gap-20">
          <button 
            onClick={() => scrollToSection('projects')}
            className={`group relative px-8 sm:px-12 py-3 sm:py-5 border transition-all duration-700 hover:scale-[1.02] hover:shadow-xl ${
              isDarkMode 
                ? 'border-amber-700/60 text-amber-200 hover:border-amber-600 hover:text-amber-100 hover:shadow-amber-900/30' 
                : 'border-amber-600/40 text-slate-800 hover:border-amber-600 hover:text-slate-900 hover:shadow-amber-200/50'
            }`}
          >
            <span className="relative z-10 tracking-[0.08em] sm:tracking-[0.12em] text-xs sm:text-sm font-light uppercase">view portfolio</span>
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 ${isDarkMode ? 'bg-amber-400' : 'bg-amber-600'}`}></div>
          </button>
          
          <button 
            onClick={() => scrollToSection('about')}
            className={`group relative transition-all duration-700 hover:scale-[1.02] ${
              isDarkMode 
                ? 'text-amber-300/80 hover:text-amber-200' 
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <span className="relative tracking-[0.08em] sm:tracking-[0.12em] text-xs sm:text-sm font-light uppercase border-b border-transparent group-hover:border-current transition-all duration-500">
              learn more
            </span>
            <div className={`absolute -bottom-1 left-0 w-0 group-hover:w-full h-[0.5px] transition-all duration-500 ${isDarkMode ? 'bg-amber-300' : 'bg-slate-700'}`}></div>
          </button>
        </div>
      </div>

      {/* Elegant side notation */}
      <div className="hidden xl:block fixed right-12 top-1/2 transform -translate-y-1/2 rotate-90 origin-center">
        <div className="flex items-center justify-center space-x-8">
          <div className={`w-20 h-[0.5px] transition-all duration-700 ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-600/30'}`}></div>
          <span className={`text-xs tracking-[0.3em] uppercase font-light transition-all duration-700 ${isDarkMode ? 'text-amber-300/60' : 'text-slate-500'}`}>
            portfolio mmxxv
          </span>
          <div className={`w-20 h-[0.5px] transition-all duration-700 ${isDarkMode ? 'bg-amber-800/50' : 'bg-amber-600/30'}`}></div>
        </div>
      </div>

      {/* Refined scroll indicator */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          <div className={`w-[1px] h-12 sm:h-16 transition-all duration-700 ${isDarkMode ? 'bg-amber-800/60' : 'bg-amber-600/40'}`}></div>
          <div className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full animate-pulse transition-all duration-700 ${isDarkMode ? 'bg-amber-700/80' : 'bg-amber-600/60'}`}></div>
        </div>
      </div>
    </section>
  );
}
