"use client";

import { DarkModeProvider, useDarkMode } from "./DarkModeContext";
import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import DotMatrixBackground from "./DotMatrixBackground";

function LayoutContent({ isMobile }: { isMobile?: boolean }) {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      {/* Dot Matrix Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className={`w-full h-full ${
            isDarkMode ? 'dot-matrix-dark' : 'dot-matrix-light'
          }`}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation isMobile={isMobile} />
        <main>
          <Hero />
          <About />
          <Projects />
        </main>
      </div>
    </div>
  );
}export default function NewDesignLayout({ isMobile }: { isMobile?: boolean }) {
  return (
    <DarkModeProvider>
      <LayoutContent isMobile={isMobile} />
    </DarkModeProvider>
  );
}
