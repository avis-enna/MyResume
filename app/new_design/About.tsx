"use client";

import { useDarkMode } from "./DarkModeContext";
import { useState } from "react";

export default function About() {
  const { isDarkMode } = useDarkMode();
  const [imageError, setImageError] = useState(false);

  return (
    <section id="about" className={`min-h-screen py-20 sm:py-24 md:py-28 lg:py-32 transition-colors duration-500 scroll-mt-20 ${
      isDarkMode ? 'bg-slate-900' : 'bg-neutral-50'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Refined section header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extralight tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-6 transition-colors duration-500 ${
              isDarkMode ? 'text-amber-50' : 'text-slate-800'
            }`}>
              about
            </h2>
            <div className={`w-16 sm:w-20 md:w-28 h-[1px] mx-auto transition-colors duration-500 ${
              isDarkMode ? 'bg-amber-700/60' : 'bg-amber-600/40'
            }`}></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-start">
            {/* Profile Section */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className={`w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[28rem] mx-auto lg:mx-0 mb-8 sm:mb-12 relative overflow-hidden transition-colors duration-500 ${
                isDarkMode 
                  ? 'bg-slate-800/20 border border-amber-800/30' 
                  : 'bg-amber-50/50 border border-amber-600/20'
              }`} style={{clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)'}}>
                {!imageError ? (
                  <img
                    src="/profile-photo.png"
                    alt="Venna Venkata Siva Reddy"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      console.error('Profile image failed to load:', e);
                      setImageError(true);
                    }}
                    onLoad={() => console.log('Profile image loaded successfully')}
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center text-6xl transition-colors duration-500 ${
                    isDarkMode ? 'text-slate-700' : 'text-amber-300/80'
                  }`}>
                    👤
                  </div>
                )}
              </div>
              
              {/* Personal details with elegant styling */}
              <div className="space-y-6">
                <h3 className={`text-xl sm:text-2xl font-light mb-4 transition-colors duration-500 ${
                  isDarkMode ? 'text-amber-100' : 'text-slate-800'
                }`}>
                  Venna Venkata Siva Reddy
                </h3>
                <p className={`text-xs sm:text-sm tracking-[0.15em] uppercase mb-6 transition-colors duration-500 ${
                  isDarkMode ? 'text-amber-300/80' : 'text-slate-600'
                }`}>
                  Network Engineer & Software Developer
                </p>
                
                {/* Sophisticated social links */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-8 sm:gap-10">
                  <a 
                    href="https://linkedin.com/in/sivavenna" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`group text-xs tracking-[0.1em] uppercase transition-all duration-300 hover:scale-105 ${
                      isDarkMode ? 'text-amber-300/80 hover:text-amber-200' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <span className="border-b border-transparent group-hover:border-current transition-all duration-300">
                      linkedin
                    </span>
                  </a>
                  <a 
                    href="https://github.com/sivavenna" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`group text-xs tracking-[0.1em] uppercase transition-all duration-300 hover:scale-105 ${
                      isDarkMode ? 'text-amber-300/80 hover:text-amber-200' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <span className="border-b border-transparent group-hover:border-current transition-all duration-300">
                      github
                    </span>
                  </a>
                  <a 
                    href="mailto:vsivareddy.venna@gmail.com" 
                    className={`group text-xs tracking-[0.1em] uppercase transition-all duration-300 hover:scale-105 ${
                      isDarkMode ? 'text-amber-300/80 hover:text-amber-200' : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <span className="border-b border-transparent group-hover:border-current transition-all duration-300">
                      email
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className="lg:col-span-3 space-y-8 sm:space-y-12">
              <div className="space-y-6">
                <p className={`text-lg sm:text-xl font-light leading-relaxed transition-colors duration-500 ${
                  isDarkMode ? 'text-amber-200' : 'text-slate-700'
                }`}>
                  Experienced Network Engineer with expertise in network operations, backend development, 
                  and system automation. Currently serving as a Software Engineer Trainee at Cisco Systems 
                  with CCNA and CCCA certifications.
                </p>
                
                <p className={`text-base sm:text-lg font-light leading-loose transition-colors duration-500 ${
                  isDarkMode ? 'text-amber-300/80' : 'text-slate-600'
                }`}>
                  Strong foundation in TCP/IP, routing, switching, and Linux system administration. 
                  Proven track record in developing REST APIs, network troubleshooting, and automation scripting. 
                  Passionate about building scalable, secure, and reliable enterprise systems.
                </p>
              </div>

              {/* Technical Skills with refined presentation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 mt-12">
                <div className="space-y-4">
                  <h4 className={`text-sm tracking-[0.15em] uppercase font-light transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-300/80' : 'text-slate-600'
                  }`}>
                    Networking & Security
                  </h4>
                  <div className={`w-12 h-[1px] transition-colors duration-500 ${
                    isDarkMode ? 'bg-amber-600' : 'bg-amber-300'
                  }`}></div>
                  <ul className={`space-y-3 text-sm font-light transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-300/80' : 'text-slate-600'
                  }`}>
                    <li>TCP/IP, ARP, OSPF, BGP, VLANs</li>
                    <li>ACLs, IP Tables, NAT, Routing & Switching</li>
                    <li>Network Security & Troubleshooting</li>
                    <li>Wireshark, Cisco Packet Tracer, GNS3</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className={`text-sm tracking-[0.15em] uppercase font-light transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-300/80' : 'text-slate-600'
                  }`}>
                    Development & Systems
                  </h4>
                  <div className={`w-12 h-[1px] transition-colors duration-500 ${
                    isDarkMode ? 'bg-amber-600' : 'bg-amber-300'
                  }`}></div>
                  <ul className={`space-y-3 text-sm font-light transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-300/80' : 'text-slate-600'
                  }`}>
                    <li>Java Spring Boot, React, REST APIs</li>
                    <li>Python, C/C++, Shell Scripting</li>
                    <li>Linux, Windows Server, z/OS</li>
                    <li>MongoDB, DB2, Git, DevOps</li>
                  </ul>
                </div>
              </div>

              {/* Philosophy or approach */}
              <div className="mt-12 pt-8 border-t border-amber-600/20 dark:border-amber-800/50">
                <blockquote className={`text-base sm:text-lg font-light italic leading-loose transition-colors duration-500 ${
                  isDarkMode ? 'text-amber-300/80' : 'text-slate-600'
                }`}>
                  "Excellence in engineering emerges from the harmonious balance of 
                  technical precision and innovative thinking."
                </blockquote>
              </div>
            </div>
          </div>
          
          {/* Professional Experience Section */}
          <div className="mt-24 sm:mt-32">
            <div className="text-center mb-16 sm:mb-20">
              <h3 className={`text-2xl sm:text-3xl font-extralight tracking-[0.1em] mb-4 transition-colors duration-500 ${
                isDarkMode ? 'text-amber-100' : 'text-slate-800'
              }`}>
                experience
              </h3>
              <div className={`w-16 sm:w-20 h-[1px] mx-auto transition-colors duration-500 ${
                isDarkMode ? 'bg-amber-500' : 'bg-amber-300'
              }`}></div>
            </div>
            
            <div className="space-y-12 sm:space-y-16">
              {/* Current Position */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                <div className="lg:col-span-1">
                  <div className={`text-xs tracking-[0.15em] uppercase transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-400/70' : 'text-amber-400/70'
                  }`}>
                    aug 2024 — present
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <h4 className={`text-lg sm:text-xl font-light mb-2 transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-100' : 'text-slate-800'
                  }`}>
                    Software Engineer Trainee
                  </h4>
                  <p className={`text-sm tracking-[0.05em] uppercase mb-4 transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-400/70' : 'text-amber-400/70'
                  }`}>
                    Cisco Systems
                  </p>
                  <p className={`text-base font-light leading-relaxed mb-4 transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-300/80' : 'text-slate-600'
                  }`}>
                    Monitor and support enterprise-level networks ensuring high availability and low latency 
                    across distributed systems. Develop and secure REST APIs for internal network automation 
                    tools using Java and Spring Boot frameworks. Perform comprehensive packet analysis and 
                    network issue resolution using Wireshark and advanced CLI tools.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Network Monitoring', 'REST APIs', 'Java Spring Boot', 'Packet Analysis', 'Security Configuration'].map((skill) => (
                      <span key={skill} className={`text-xs px-2 py-1 border transition-colors duration-300 ${
                        isDarkMode ? 'border-amber-800/70 text-amber-400/70' : 'border-amber-600/30 text-slate-600'
                      }`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Previous Experience */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                <div className="lg:col-span-1">
                  <div className={`text-xs tracking-[0.15em] uppercase transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-400/70' : 'text-amber-400/70'
                  }`}>
                    nov 2023 — may 2024
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <h4 className={`text-lg sm:text-xl font-light mb-2 transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-100' : 'text-slate-800'
                  }`}>
                    Trainee
                  </h4>
                  <p className={`text-sm tracking-[0.05em] uppercase mb-4 transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-400/70' : 'text-amber-400/70'
                  }`}>
                    Cognizant Technology Solutions
                  </p>
                  <p className={`text-base font-light leading-relaxed mb-4 transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-300/80' : 'text-slate-600'
                  }`}>
                    Completed comprehensive training in IBM Mainframe environments including z/OS, JCL, COBOL, 
                    and DB2. Contributed to process automation initiatives in legacy systems to enhance performance 
                    and reduce manual overhead. Gained expertise in enterprise system workflows and mainframe 
                    application development.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['IBM Mainframe', 'z/OS', 'JCL', 'COBOL', 'DB2', 'Process Automation'].map((skill) => (
                      <span key={skill} className={`text-xs px-2 py-1 border transition-colors duration-300 ${
                        isDarkMode ? 'border-amber-800/70 text-amber-400/70' : 'border-amber-600/30 text-slate-600'
                      }`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Education Section */}
          <div className="mt-24 sm:mt-32">
            <div className="text-center mb-16 sm:mb-20">
              <h3 className={`text-2xl sm:text-3xl font-extralight tracking-[0.1em] mb-4 transition-colors duration-500 ${
                isDarkMode ? 'text-amber-100' : 'text-slate-800'
              }`}>
                education
              </h3>
              <div className={`w-16 sm:w-20 h-[1px] mx-auto transition-colors duration-500 ${
                isDarkMode ? 'bg-amber-500' : 'bg-amber-300'
              }`}></div>
            </div>
            
            <div className="space-y-12 sm:space-y-16">
              {/* Primary Degree */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                <div className="lg:col-span-1">
                  <div className={`text-xs tracking-[0.15em] uppercase transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-400/70' : 'text-amber-400/70'
                  }`}>
                    bachelor's degree
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <h4 className={`text-lg sm:text-xl font-light mb-2 transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-100' : 'text-slate-800'
                  }`}>
                    Bachelor of Engineering (B.E.)
                  </h4>
                  <p className={`text-sm tracking-[0.05em] uppercase mb-2 transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-400/70' : 'text-amber-400/70'
                  }`}>
                    Electronics and Telecommunication Engineering
                  </p>
                  <p className={`text-sm font-light mb-4 transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-400/70' : 'text-amber-400/70'
                  }`}>
                    Sir M Visvesvaraya Institute of Technology, Bengaluru
                  </p>
                  <p className={`text-base font-light leading-relaxed mb-4 transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-300/80' : 'text-slate-600'
                  }`}>
                    Comprehensive foundation in electronics, telecommunications, and computer engineering principles. 
                    Specialized coursework in network technologies, signal processing, embedded systems, 
                    and telecommunications protocols.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Network Technologies', 'Signal Processing', 'Embedded Systems', 'Telecommunications'].map((subject) => (
                      <span key={subject} className={`text-xs px-2 py-1 border transition-colors duration-300 ${
                        isDarkMode ? 'border-amber-800/70 text-amber-400/70' : 'border-amber-600/30 text-slate-600'
                      }`}>
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Professional Certifications */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                <div className="lg:col-span-1">
                  <div className={`text-xs tracking-[0.15em] uppercase transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-400/70' : 'text-amber-400/70'
                  }`}>
                    certifications
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <h4 className={`text-lg sm:text-xl font-light mb-4 transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-100' : 'text-slate-800'
                  }`}>
                    Professional Certifications
                  </h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className={`p-4 border transition-colors duration-300 ${
                        isDarkMode ? 'border-amber-800/70 bg-slate-800/10' : 'border-amber-600/30 bg-neutral-50'
                      }`}>
                        <h5 className={`text-sm font-light mb-1 transition-colors duration-500 ${
                          isDarkMode ? 'text-amber-200' : 'text-slate-700'
                        }`}>
                          Cisco Certified Network Associate (CCNA)
                        </h5>
                        <p className={`text-xs transition-colors duration-500 ${
                          isDarkMode ? 'text-amber-400/70' : 'text-amber-400/70'
                        }`}>
                          Active • Network fundamentals and routing & switching
                        </p>
                      </div>
                      <div className={`p-4 border transition-colors duration-300 ${
                        isDarkMode ? 'border-amber-800/70 bg-slate-800/10' : 'border-amber-600/30 bg-neutral-50'
                      }`}>
                        <h5 className={`text-sm font-light mb-1 transition-colors duration-500 ${
                          isDarkMode ? 'text-amber-200' : 'text-slate-700'
                        }`}>
                          Cisco Certified Cybersecurity Associate (CCCA)
                        </h5>
                        <p className={`text-xs transition-colors duration-500 ${
                          isDarkMode ? 'text-amber-400/70' : 'text-amber-400/70'
                        }`}>
                          Active • Security operations and threat analysis
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className={`p-4 border transition-colors duration-300 ${
                        isDarkMode ? 'border-amber-800/70 bg-slate-800/10' : 'border-amber-600/30 bg-neutral-50'
                      }`}>
                        <h5 className={`text-sm font-light mb-1 transition-colors duration-500 ${
                          isDarkMode ? 'text-amber-200' : 'text-slate-700'
                        }`}>
                          Microsoft Certified: Security, Compliance & Identity
                        </h5>
                        <p className={`text-xs transition-colors duration-500 ${
                          isDarkMode ? 'text-amber-400/70' : 'text-amber-400/70'
                        }`}>
                          Identity and access management
                        </p>
                      </div>
                      <div className={`p-4 border transition-colors duration-300 ${
                        isDarkMode ? 'border-amber-800/70 bg-slate-800/10' : 'border-amber-600/30 bg-neutral-50'
                      }`}>
                        <h5 className={`text-sm font-light mb-1 transition-colors duration-500 ${
                          isDarkMode ? 'text-amber-200' : 'text-slate-700'
                        }`}>
                          Cisco Certified DevNet Associate (DEVASC)
                        </h5>
                        <p className={`text-xs transition-colors duration-500 ${
                          isDarkMode ? 'text-amber-400/70' : 'text-amber-400/70'
                        }`}>
                          Currently Pursuing • Network automation and programmability
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Research Publication */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                <div className="lg:col-span-1">
                  <div className={`text-xs tracking-[0.15em] uppercase transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-400/70' : 'text-amber-400/70'
                  }`}>
                    publication
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <h4 className={`text-lg sm:text-xl font-light mb-2 transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-100' : 'text-slate-800'
                  }`}>
                    Research Publication
                  </h4>
                  <p className={`text-sm tracking-[0.05em] uppercase mb-2 transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-400/70' : 'text-amber-400/70'
                  }`}>
                    IJFMR, May–June 2023
                  </p>
                  <p className={`text-base font-light leading-relaxed transition-colors duration-500 ${
                    isDarkMode ? 'text-amber-300/80' : 'text-slate-600'
                  }`}>
                    "IoT-Based Continuous Abiotic Factor Monitoring" — Research paper focusing on real-time 
                    environmental monitoring systems for agricultural applications using IoT sensors and 
                    data analytics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
