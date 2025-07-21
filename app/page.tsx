"use client";

// Import V1 (Classic) components
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

export default function Home() {
  // Directly render the classic design without any detection logic
  return (
    <main className="min-h-screen bg-dark-bg relative">
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
