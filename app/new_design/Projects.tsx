"use client";

import { useState } from "react";
import { useDarkMode } from "./DarkModeContext";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { isDarkMode } = useDarkMode();

  const projects: Project[] = [
    {
      id: "log-analysis",
      title: "Log Analysis System",
      subtitle: "Real-time monitoring platform",
      description: "A comprehensive log analysis and monitoring system built with Java Spring Boot, featuring real-time log processing, pattern detection, and interactive visualizations.",
      longDescription: "Enterprise-grade log analysis platform with real-time processing capabilities. Features include pattern detection, security threat analysis, performance monitoring, and interactive dashboards. Built with microservices architecture using Spring Boot, Kafka, and Elasticsearch.",
      technologies: ["Java 17", "Spring Boot", "Kafka", "Elasticsearch", "PostgreSQL", "Docker", "React"],
      category: "Backend System",
      image: "/api/placeholder/400/300",
      githubUrl: "https://github.com/sivavenna/log-analysis-system"
    },
    {
      id: "iot-monitoring",
      title: "IoT Monitoring System",
      subtitle: "Environmental data collection",
      description: "IoT-based continuous abiotic factor monitoring system for agricultural applications with real-time data collection and analysis.",
      longDescription: "Real-time environmental monitoring system designed for agricultural applications. Integrates IoT sensors with backend services to collect and process environmental data continuously. Features responsive dashboards, alerting mechanisms, and historical data tracking.",
      technologies: ["Java", "React", "Arduino", "IoT Sensors", "MySQL", "REST APIs"],
      category: "IoT Application",
      image: "/api/placeholder/400/300",
      githubUrl: "https://github.com/sivavenna/iot-monitoring"
    },
    {
      id: "microservices-ecommerce",
      title: "Secure E-commerce Platform",
      subtitle: "Microservices architecture",
      description: "Secure e-commerce platform built with microservices architecture, featuring user authentication, product management, and payment processing.",
      longDescription: "Modern e-commerce platform designed with microservices architecture. Implements secure user authentication, product catalog management, shopping cart functionality, and integrated payment processing. Built with Spring Boot microservices and containerized with Docker.",
      technologies: ["Spring Boot", "Docker", "PostgreSQL", "Redis", "RabbitMQ", "JWT", "OAuth2"],
      category: "Web Application",
      image: "/api/placeholder/400/300",
      githubUrl: "https://github.com/sivavenna/secure-ecommerce"
    },
    {
      id: "library-management",
      title: "Library Management System",
      subtitle: "Database-driven application",
      description: "Comprehensive library management system with book cataloging, member management, and advanced search functionality.",
      longDescription: "Full-featured library management system with comprehensive book cataloging, member management, borrowing/returning functionality, and advanced search capabilities. Features automated fine calculations, reservation systems, and detailed reporting.",
      technologies: ["Python", "Flask", "SQLite", "HTML/CSS", "JavaScript", "Bootstrap"],
      category: "Management System",
      image: "/api/placeholder/400/300",
      githubUrl: "https://github.com/sivavenna/library-management"
    }
  ];

  return (
    <section id="projects" className={`min-h-screen py-12 sm:py-16 md:py-20 transition-colors duration-300 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-thin mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}>work</h2>
            <div className={`w-12 sm:w-16 h-px mx-auto transition-colors duration-300 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {projects.map((project) => (
              <div key={project.id} className="group">
                <div className={`rounded-lg overflow-hidden mb-4 sm:mb-6 transition-all duration-300 ${isDarkMode ? 'bg-gray-900/10 border border-gray-800/30 hover:bg-gray-800/20 hover:border-gray-700/50' : 'bg-gray-50 border border-gray-200 hover:shadow-lg'}`}>
                  <div className={`aspect-video flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-900/20' : 'bg-gray-100'}`}>
                    <div className="text-center">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg mx-auto mb-3 sm:mb-4 flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-800/40' : 'bg-white'}`}>
                        {project.id === 'log-analysis' && (
                          <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"/>
                          </svg>
                        )}
                        {project.id === 'iot-monitoring' && (
                          <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                          </svg>
                        )}
                        {project.id === 'microservices-ecommerce' && (
                          <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                          </svg>
                        )}
                        {project.id === 'library-management' && (
                          <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zm-5 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"/>
                          </svg>
                        )}
                      </div>
                      <h3 className={`text-lg sm:text-xl font-light transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}>{project.title}</h3>
                      <p className={`text-xs sm:text-sm opacity-70 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className={`mb-4 text-sm sm:text-base transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-gray-800/40 text-gray-300 border border-gray-700/40' : 'bg-gray-100 text-gray-700'}`}>
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-gray-800/40 text-gray-300 border border-gray-700/40' : 'bg-gray-100 text-gray-700'}`}>
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className={`transition-colors font-medium text-sm sm:text-base mobile-touch-target ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'}`}
                      >
                        see project
                      </button>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                        >
                          github
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className={`transition-colors font-medium border-b pb-1 ${isDarkMode ? 'text-white hover:text-gray-300 border-white hover:border-gray-300' : 'text-black hover:text-gray-600 border-black hover:border-gray-600'}`}>
              show more projects
            </button>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className={`rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border transition-colors duration-300 ${isDarkMode ? 'bg-gray-900/60 border-gray-800/40 backdrop-blur-sm' : 'bg-white border-gray-200'}`}>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className={`text-3xl font-light mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}>{selectedProject.title}</h3>
                  <p className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{selectedProject.subtitle}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`text-2xl transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}
                >
                  ×
                </button>
              </div>
              
              <div className={`aspect-video rounded-lg mb-6 flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-900/20' : 'bg-gray-100'}`}>
                <div className="text-center">
                  <div className={`w-20 h-20 rounded-lg mx-auto mb-4 flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-gray-800/40' : 'bg-white'}`}>
                    {selectedProject.id === 'log-analysis' && (
                      <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"/>
                      </svg>
                    )}
                    {selectedProject.id === 'iot-monitoring' && (
                      <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                      </svg>
                    )}
                    {selectedProject.id === 'microservices-ecommerce' && (
                      <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                      </svg>
                    )}
                    {selectedProject.id === 'library-management' && (
                      <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zm-5 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"/>
                      </svg>
                    )}
                  </div>
                  <h4 className={`text-2xl font-light transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}>{selectedProject.title}</h4>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className={`text-lg font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}>Description</h4>
                  <p className={`leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{selectedProject.longDescription}</p>
                </div>

                <div>
                  <h4 className={`text-lg font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}>Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className={`px-3 py-1 text-sm rounded-full border transition-colors duration-300 ${isDarkMode ? 'bg-gray-800/40 text-gray-300 border-gray-700/40' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className={`text-lg font-medium mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}>Category</h4>
                  <p className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{selectedProject.category}</p>
                </div>

                <div className="flex space-x-4 pt-6">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-6 py-3 rounded-lg transition-colors ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                    >
                      Live Demo
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-6 py-3 border rounded-lg transition-colors ${isDarkMode ? 'border-white text-white hover:bg-gray-800' : 'border-black text-black hover:bg-gray-50'}`}
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
