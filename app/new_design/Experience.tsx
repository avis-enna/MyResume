"use client";

import { useDarkMode } from "./DarkModeContext";

export default function Experience() {
  const { isDarkMode } = useDarkMode();

  const experiences = [
    {
      company: "Cisco Systems",
      position: "Software Engineer",
      duration: "Aug 2024 – Present",
      location: "Bengaluru, India",
      achievements: [
        "Led the migration of the IoT Control Center's core services from Docker to a scalable Kubernetes (k8s) architecture, significantly improving service reliability and deployment velocity.",
        "Managed Kubernetes applications using Helm charts for packaging and deployed a GitOps workflow with FluxCD for automated, declarative continuous delivery.",
        "Developed and maintained resilient Java Spring Boot microservices for the HLR-level network service, designing and exposing both REST and SOAP APIs.",
        "Implemented Single Sign-On (SSO) for new services using Duo, enhancing security and streamlining user access.",
        "Built and supported frontend modules in React for internal service management dashboards.",
        "Leveraged CCNA certification to collaborate with the network engineering team on troubleshooting and configuring network devices, bridging the gap between software and infrastructure.",
        "Developed a data analytics tool by integrating with Jira APIs to pull, model, and visualize project data, enabling predictive insights into team productivity and project progress."
      ],
      technologies: ["Java", "Spring Boot", "Kubernetes", "Docker", "Helm", "FluxCD", "React", "REST APIs", "SOAP", "GitOps", "Duo SSO"]
    },
    {
      company: "Cognizant Technology Solutions",
      position: "Trainee",
      duration: "Nov 2023 – May 2024",
      location: "Bengaluru, India",
      achievements: [
        "Maintained and enhanced a large-scale mainframe banking application, gaining deep experience in enterprise-level systems.",
        "Developed and modified COBOL programs to implement new business logic and functionality changes.",
        "Automated and optimized batch processing jobs using JCL, debugged JCL failures, and implemented changes to system-generated reports.",
        "Worked extensively with core mainframe technologies including DB2 for database management and VSAM for indexed data storage."
      ],
      technologies: ["COBOL", "JCL", "DB2", "VSAM", "Mainframe", "Batch Processing"]
    }
  ];

  return (
    <section id="experience" className={`min-h-screen py-20 transition-colors duration-300 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-thin mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}>experience</h2>
            <div className={`w-16 h-px mx-auto transition-colors duration-300 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative pl-8 border-l-2 transition-colors duration-300 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                {/* Timeline dot */}
                <div className={`absolute -left-2 top-6 w-4 h-4 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
                
                <div className={`bg-transparent border rounded-lg p-8 transition-colors duration-300 ${isDarkMode ? 'border-gray-800/30' : 'border-gray-200'}`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className={`text-2xl font-light mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        {exp.position}
                      </h3>
                      <h4 className={`text-xl font-medium mb-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {exp.company}
                      </h4>
                      <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {exp.location}
                      </p>
                    </div>
                    <div className={`mt-4 md:mt-0 text-sm font-medium px-4 py-2 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-gray-900/50 text-gray-300 border border-gray-800' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
                      {exp.duration}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start space-x-3">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 transition-colors duration-300 ${isDarkMode ? 'bg-gray-400' : 'bg-gray-600'}`}></div>
                        <p className={`text-sm leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className={`text-xs px-3 py-1 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-gray-900/30 text-gray-400 border border-gray-800/50' : 'bg-gray-50 text-gray-600 border border-gray-200'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
