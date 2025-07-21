"use client";

import { useDarkMode } from "./DarkModeContext";

export default function Footer() {
  const { isDarkMode } = useDarkMode();

  return (
    <footer className={`py-12 sm:py-16 border-t transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 border-amber-800/50' : 'bg-neutral-50 border-amber-600/20'}`}>
      <div className="container mx-auto px-6 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0">
            {/* Refined branding */}
            <div className="flex flex-col items-center sm:items-start">
              <div className={`text-xl sm:text-2xl font-light tracking-[0.2em] mb-2 transition-colors duration-500 ${isDarkMode ? 'text-amber-100' : 'text-slate-800'}`}>
                <span className="font-extralight">S</span>
                <span className="font-extralight">V</span>
                <span className="font-extralight">R</span>
              </div>
              <div className={`w-8 h-[1px] transition-colors duration-500 ${isDarkMode ? 'bg-amber-600' : 'bg-amber-300'}`}></div>
            </div>
            
            {/* Copyright and credits */}
            <div className="text-center sm:text-right space-y-1">
              <p className={`text-xs tracking-[0.1em] uppercase transition-colors duration-500 ${isDarkMode ? 'text-slate-600' : 'text-amber-400/70'}`}>
                © mmxxv
              </p>
              <p className={`text-xs tracking-[0.05em] transition-colors duration-500 ${isDarkMode ? 'text-slate-600' : 'text-amber-400/70'}`}>
                designed & built with care
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
