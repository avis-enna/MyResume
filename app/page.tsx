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
import LoadingScreen from "./components/LoadingScreen";
import Blog from "./components/Blog";
import ResumeDownload from "./components/ResumeDownload";
// VersionDisplay is now integrated into Footer component

export default function Home() {
  const [currentUI, setCurrentUI] = useState<'new' | 'v1' | 'v2'>('new');
  const [isLoading, setIsLoading] = useState(true);

  const toggleUI = () => {
    if (currentUI === 'new') {
      setCurrentUI('v1');
    } else if (currentUI === 'v1') {
      setCurrentUI('v2');
    } else {
      setCurrentUI('new');
    }
  };

  // Show loading screen on first visit
  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} duration={2500} />;
  }

  // Contact Form Disclaimer Component
  const ContactDisclaimer = ({ isDark = false }: { isDark?: boolean }) => (
    <div className={`fixed top-0 left-0 right-0 z-[9998] ${
      isDark
        ? 'bg-yellow-900/90 border-b border-yellow-500/30 text-yellow-300'
        : 'bg-yellow-50/95 border-b border-yellow-300 text-yellow-800'
    } backdrop-blur-sm`}>
      <div className="container mx-auto px-4 py-2 text-center">
        <p className="text-sm">
          ⚠️ <strong>Notice:</strong> Contact form is currently not working. Please email me directly at{' '}
          <a
            href="mailto:vsivareddy.venna@gmail.com"
            className={`underline font-medium ${
              isDark ? 'text-yellow-200 hover:text-white' : 'text-yellow-900 hover:text-yellow-700'
            }`}
          >
            vsivareddy.venna@gmail.com
          </a>
          {' '}or call{' '}
          <a
            href="tel:+919398961541"
            className={`underline font-medium ${
              isDark ? 'text-yellow-200 hover:text-white' : 'text-yellow-900 hover:text-yellow-700'
            }`}
          >
            +91 93989 61541
          </a>
        </p>
      </div>
    </div>
  );

  // New Design - Clean modern design (Default)
  if (currentUI === 'new') {
    return (
      <div className="relative">
        <ContactDisclaimer />
        <div className="fixed bottom-6 left-6 z-[9999]">
          <button
            onClick={toggleUI}
            className="text-gray-600 hover:text-black transition-all duration-300 text-xs border border-gray-200 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full hover:border-gray-300 hover:bg-white shadow-lg"
            title="Switch UI Version"
          >
            classic_mode
          </button>
        </div>
        <div className="pt-12">
          <NewDesignLayout />
        </div>
      </div>
    );
  }

  // V1 UI - Original beautiful design
  if (currentUI === 'v1') {
    return (
      <main className="min-h-screen bg-dark-bg relative">
        <ContactDisclaimer isDark={true} />
        {/* V1 - V2 - New Toggle Button - Blended with navigation */}
        <div className="fixed bottom-6 left-6 z-[9999]">
          <button
            onClick={toggleUI}
            className="text-cyber-blue hover:text-cyber-purple transition-all duration-300 font-cyber text-xs border border-cyber-blue/20 bg-dark-bg/90 backdrop-blur-sm px-3 py-2 rounded-full hover:border-cyber-purple/40 hover:bg-dark-bg shadow-lg"
            title="Switch UI Version"
          >
            terminal_mode
          </button>
        </div>
        <div className="pt-12">
          <Navigation />
          <Hero />
          <About />
          <Skills />
          <Timeline />
          <Projects />
          <Blog />
          <ResumeDownload />
          <Contact />
          <Footer />
          <ChatBot />
        </div>
      </main>
    );
  }

  // V2 UI - Terminal design
  return (
    <div className="relative">
      <ContactDisclaimer isDark={true} />
      <div className="fixed bottom-6 left-6 z-[9999]">
        <button
          onClick={toggleUI}
          className="text-green-400 hover:text-green-300 transition-all duration-300 font-mono text-xs border border-green-400/20 bg-black/90 backdrop-blur-sm px-3 py-2 rounded-full hover:border-green-300/40 hover:bg-black shadow-lg"
          title="Switch UI Version"
        >
          modern_mode
        </button>
      </div>
      <div className="pt-12">
        <InteractiveTerminal onToggleUI={toggleUI} />
      </div>
    </div>
  );
}
