"use client";

import { useState } from "react";
import { useDarkMode } from "./DarkModeContext";

export default function Navigation({ isMobile }: { isMobile?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-500 ${
      isDarkMode ? 'bg-slate-900/80 border-b border-amber-800/30' : 'bg-neutral-50/90 border-b border-amber-600/20'
    }`}>
      <div className="container mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center py-6 sm:py-8">
          {/* Refined SVR Logo */}
          <div className={`text-xl sm:text-2xl font-extralight tracking-[0.3em] transition-colors duration-500 ${
            isDarkMode ? 'text-amber-50' : 'text-slate-800'
          }`}>
            SVR
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12 lg:space-x-16">
            <button 
              onClick={() => scrollToSection('home')}
              className={`text-sm font-light tracking-wide transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'text-amber-300/80 hover:text-amber-100' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`text-sm font-light tracking-wide transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'text-amber-300/80 hover:text-amber-100' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              about
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className={`text-sm font-light tracking-wide transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'text-amber-300/80 hover:text-amber-100' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              portfolio
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`text-sm font-light tracking-wide transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'text-amber-300/80 hover:text-amber-100' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              contact
            </button>
            
            {/* Elegant dark mode toggle */}
            <div className="flex items-center space-x-4 ml-8">
              <div className={`w-8 h-[1px] transition-colors duration-500 ${
                isDarkMode ? 'bg-amber-600' : 'bg-amber-300'
              }`}></div>
              <button 
                onClick={toggleDarkMode}
                className={`group relative w-10 h-10 rounded-full transition-all duration-500 hover:scale-110 ${
                  isDarkMode ? 'bg-slate-800/50 hover:bg-amber-700/70' : 'bg-amber-50 hover:bg-amber-100'
                }`}
                title="Toggle theme"
                aria-label="Toggle dark mode"
              >
                <div className={`absolute inset-0 rounded-full border transition-all duration-500 group-hover:border-2 ${
                  isDarkMode ? 'border-amber-800/70 group-hover:border-amber-700/60' : 'border-amber-600/30 group-hover:border-amber-600/40'
                }`}></div>
                {isDarkMode ? (
                  <svg className="w-4 h-4 text-amber-300/80 transition-colors duration-300 group-hover:text-amber-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-slate-600 transition-colors duration-300 group-hover:text-slate-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-300 ${
              isDarkMode ? 'text-amber-200 hover:text-amber-50' : 'text-slate-700 hover:text-slate-900'
            }`}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden py-6 sm:py-8 border-t transition-colors duration-500 ${
            isDarkMode ? 'border-amber-800/50' : 'border-amber-600/20'
          }`}>
            <div className="flex flex-col space-y-8">
              <button 
                onClick={() => scrollToSection('home')}
                className={`text-left py-2 text-lg font-light tracking-wide transition-colors duration-300 ${
                  isDarkMode ? 'text-amber-200 hover:text-amber-50' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`text-left py-2 text-lg font-light tracking-wide transition-colors duration-300 ${
                  isDarkMode ? 'text-amber-200 hover:text-amber-50' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                about
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className={`text-left py-2 text-lg font-light tracking-wide transition-colors duration-300 ${
                  isDarkMode ? 'text-amber-200 hover:text-amber-50' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                portfolio
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`text-left py-2 text-lg font-light tracking-wide transition-colors duration-300 ${
                  isDarkMode ? 'text-amber-200 hover:text-amber-50' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                contact
              </button>
              
              {/* Mobile dark mode toggle */}
              <div className="flex items-center justify-between pt-6 border-t border-amber-600/20 dark:border-amber-800/50">
                <span className={`text-sm font-light tracking-wide ${
                  isDarkMode ? 'text-amber-400/70' : 'text-amber-400/70'
                }`}>
                  {isDarkMode ? 'light theme' : 'dark theme'}
                </span>
                <button 
                  onClick={toggleDarkMode}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    isDarkMode ? 'bg-amber-600' : 'bg-amber-200'
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full transition-transform duration-300 ${
                    isDarkMode ? 'translate-x-6 bg-amber-50' : 'translate-x-0.5 bg-white'
                  }`}>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
