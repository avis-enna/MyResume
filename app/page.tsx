"use client";

import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// Import V1 components
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import InteractiveTerminal from "./components/InteractiveTerminal";
import NewDesignLayout from "./new_design/NewDesignLayout";
// VersionDisplay is now integrated into Footer component

export default function Home() {
  const [currentUI, setCurrentUI] = useState<'new' | 'v1' | 'v2'>('new');
  const [isMobile, setIsMobile] = useState<boolean | null>(null); // null initially to prevent race condition
  const [isInitialized, setIsInitialized] = useState(false);

  // Detect mobile device and screen size
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isSmallScreen = window.innerWidth < 768; // Less than md breakpoint
      const mobileDetected = isMobileDevice || isSmallScreen;
      
      setIsMobile(mobileDetected);
      
      // Initialize UI mode only after mobile detection is complete
      if (!isInitialized) {
        if (mobileDetected) {
          // Force modern design on mobile
          setCurrentUI('new');
        } else {
          // Random selection only on desktop
          const modes: ('new' | 'v1' | 'v2')[] = ['new', 'v1', 'v2'];
          const randomMode = modes[Math.floor(Math.random() * modes.length)];
          setCurrentUI(randomMode);
        }
        setIsInitialized(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isInitialized]);

  const toggleUI = () => {
    // Prevent UI switching on mobile or if mobile detection is not complete
    if (isMobile === null || isMobile) {
      return;
    }

    if (currentUI === 'new') {
      setCurrentUI('v1');
    } else if (currentUI === 'v1') {
      setCurrentUI('v2');
    } else {
      setCurrentUI('new');
    }
  };

  // Show loading state while detecting mobile
  if (isMobile === null || !isInitialized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-light text-gray-600">SVR.</div>
          <div className="text-sm text-gray-400 mt-2">Detecting device...</div>
          <div className="text-xs text-gray-300 mt-1">
            {typeof window !== 'undefined' ? `Screen: ${window.innerWidth}px` : 'Initializing...'}
          </div>
        </div>
      </div>
    );
  }

  // New Design - Clean modern design (Default)
  if (currentUI === 'new') {
    return (
      <div className="relative">
        {/* Hide UI toggle on mobile devices */}
        {isMobile === false && (
          <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-[9999]">
            <button
              onClick={toggleUI}
              className="text-gray-600 hover:text-black transition-all duration-300 text-xs sm:text-sm border border-gray-200 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full hover:border-gray-300 hover:bg-white shadow-lg touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center no-select"
              title="Switch UI Version (Desktop Only)"
            >
              <span className="hidden sm:inline">classic_mode</span>
              <span className="sm:hidden">UI</span>
            </button>
          </div>
        )}
        <NewDesignLayout isMobile={isMobile} />
      </div>
    );
  }

  // V1 UI - Original beautiful design
  if (currentUI === 'v1') {
    return (
      <main className="min-h-screen bg-dark-bg relative">
        {/* V1 - V2 - New Toggle Button - Hidden on mobile */}
        {isMobile === false && (
          <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-[9999]">
            <button
              onClick={toggleUI}
              className="text-cyber-blue hover:text-cyber-purple transition-all duration-300 font-cyber text-xs sm:text-sm border border-cyber-blue/20 bg-dark-bg/90 backdrop-blur-sm px-3 py-2 rounded-full hover:border-cyber-purple/40 hover:bg-dark-bg shadow-lg touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center no-select"
              title="Switch UI Version (Desktop Only)"
            >
              <span className="hidden sm:inline">terminal_mode</span>
              <span className="sm:hidden">T</span>
            </button>
          </div>
        )}
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Timeline />
        <Projects />
        <Contact />
        <Footer />
        <ChatBot />
      </main>
    );
  }

  // V2 UI - Terminal design
  return (
    <div className="relative">
      <div className="bg-black text-green-400 min-h-screen font-mono relative">
        {/* V2 Terminal Mode Toggle Button - Hidden on mobile */}
        {isMobile === false && (
          <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-[9999]">
            <button
              onClick={toggleUI}
              className="text-green-400 hover:text-green-300 transition-all duration-300 font-mono text-xs sm:text-sm border border-green-400/20 bg-black/90 backdrop-blur-sm px-3 py-2 rounded-full hover:border-green-300/40 hover:bg-black shadow-lg touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center no-select"
              title="Switch UI Version (Desktop Only)"
            >
              <span className="hidden sm:inline">modern_mode</span>
              <span className="sm:hidden">M</span>
            </button>
          </div>
        )}
        <InteractiveTerminal onToggleUI={toggleUI} />
      </div>
    </div>
  );
}
