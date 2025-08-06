// Resume data types and interfaces

export interface PersonalInfo {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  profileImage?: string
  summary: string
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string | 'Present'
  description: string[]
  technologies: string[]
  achievements: string[]
  order: number
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
  honors?: string[]
  coursework?: string[]
  order: number
}

export interface Skill {
  id: string
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  category: string
  yearsOfExperience?: number
  order: number
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  startDate: string
  endDate: string | 'Present'
  url?: string
  github?: string
  highlights: string[]
  order: number
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  url?: string
  order: number
}

export interface Language {
  id: string
  name: string
  proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native'
  order: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  issuer?: string
  order: number
}

export interface Reference {
  id: string
  name: string
  title: string
  company: string
  email: string
  phone?: string
  relationship: string
  order: number
}

export interface ResumeData {
  personalInfo: PersonalInfo
  experience: WorkExperience[]
  education: Education[]
  skills: {
    technical: Skill[]
    soft: Skill[]
    languages: Language[]
  }
  projects: Project[]
  certifications: Certification[]
  achievements: Achievement[]
  references: Reference[]
  lastUpdated: string
  version: number
}

export interface ResumeTemplate {
  id: string
  name: string
  description: string
  category: 'professional' | 'creative' | 'technical' | 'executive' | 'academic' | 'minimalist'
  preview: string
  styles: TemplateStyles
  layout: TemplateLayout
  atsCompatible: boolean
  features: string[]
}

export interface TemplateStyles {
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
    border: string
  }
  fonts: {
    heading: string
    body: string
    size: {
      heading: string
      subheading: string
      body: string
      small: string
    }
  }
  spacing: {
    sections: string
    items: string
    margins: string
  }
  borders: {
    radius: string
    width: string
    style: string
  }
}

export interface TemplateLayout {
  columns: 1 | 2
  headerStyle: 'centered' | 'left' | 'right'
  sectionOrder: string[]
  showProfileImage: boolean
  showIcons: boolean
  compactMode: boolean
}

export interface ResumeSettings {
  selectedTemplate: string
  customStyles?: Partial<TemplateStyles>
  sectionVisibility: Record<string, boolean>
  pageSize: 'A4' | 'Letter' | 'Legal'
  margins: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface DownloadAnalytics {
  id: string
  timestamp: string
  format: 'pdf' | 'docx' | 'txt' | 'html' | 'json'
  template: string
  userAgent: string
  ipAddress: string
  referrer?: string
  sessionId: string
}

export interface AdminUser {
  id: string
  email: string
  passwordHash: string
  role: 'admin' | 'editor'
  lastLogin?: string
  loginAttempts: number
  lockedUntil?: string
  twoFactorEnabled: boolean
  twoFactorSecret?: string
}

export interface AdminSession {
  id: string
  userId: string
  token: string
  expiresAt: string
  ipAddress: string
  userAgent: string
  isActive: boolean
}

// Default resume data
export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Venna Venkata Siva Reddy',
    title: 'Software Engineer',
    email: 'vsivareddy.venna@gmail.com',
    phone: '+91 93989 61541',
    location: 'Bengaluru, India',
    website: 'https://my-resume-eight-beta.vercel.app/',
    linkedin: 'https://linkedin.com/in/sivavenna',
    github: 'https://github.com/avis-enna',
    summary: 'A results-driven Software Engineer experienced in migrating legacy systems to modern, cloud-native environments. Skilled in backend (Java/Spring Boot), and DevOps with Kubernetes, Docker, and GitOps using Helm and FluxCD. Cross-functional knowledge in network engineering and analytics, passionate about scalable, mission-critical systems.'
  },
  experience: [
    {
      id: '1',
      company: 'Cisco Systems',
      position: 'Software Engineer',
      location: 'Bengaluru, India',
      startDate: 'Aug 2024',
      endDate: 'Present',
      description: [
        'Orchestrated the migration of IoT Control Center\'s core services from Docker to Kubernetes, significantly improving service reliability and deployment velocity',
        'As an individual contributor, delivered 7+ Proofs of Concept (POCs) for new features, leveraging AI tools to accelerate the development and validation process',
        'Managed Kubernetes workloads using Helm and implemented GitOps pipelines via FluxCD for automated, declarative delivery',
        'Engineered and maintained robust Java Spring Boot microservices for network operations, exposing REST and SOAP APIs',
        'Implemented Duo-based SSO for secure access control across all internal microservices',
        'Built and maintained React dashboards for monitoring system metrics and service health',
        'Fostered collaboration with network engineers to troubleshoot device configurations using CCNA-level skills',
        'Architected a Jira-integrated analytics tool to model and visualize sprint trends, helping leadership predict team output'
      ],
      technologies: ['Java', 'Spring Boot', 'Kubernetes', 'Docker', 'Helm', 'FluxCD', 'React', 'REST APIs', 'SOAP'],
      achievements: [
        'Successfully migrated core IoT services to Kubernetes improving reliability',
        'Delivered 7+ POCs accelerating feature development',
        'Implemented GitOps pipelines for automated deployment'
      ],
      order: 1
    },
    {
      id: '2',
      company: 'Cognizant Technology Solutions',
      position: 'Trainee',
      location: 'India',
      startDate: 'Nov 2023',
      endDate: 'May 2024',
      description: [
        'Maintained enterprise mainframe systems with COBOL and JCL',
        'Automated batch jobs and system reports using JCL enhancements',
        'Worked with DB2 and VSAM for backend data access and indexing'
      ],
      technologies: ['COBOL', 'JCL', 'DB2', 'VSAM', 'Mainframe'],
      achievements: [
        'Automated batch job processing improving efficiency',
        'Enhanced system reports with JCL optimizations'
      ],
      order: 2
    }
  ],
  education: [
    {
      id: '1',
      institution: 'Sir M Visvesvaraya Institute of Technology',
      degree: 'Bachelor of Engineering',
      field: 'Electronics & Telecommunication',
      location: 'Bengaluru, India',
      startDate: '2019',
      endDate: '2023',
      gpa: '',
      honors: [],
      coursework: ['Digital Signal Processing', 'Communication Systems', 'Network Engineering', 'Embedded Systems'],
      order: 1
    }
  ],
  skills: {
    technical: [
      { id: '1', name: 'Java', level: 'Advanced', category: 'Languages', yearsOfExperience: 2, order: 1 },
      { id: '2', name: 'Python', level: 'Advanced', category: 'Languages', yearsOfExperience: 3, order: 2 },
      { id: '3', name: 'JavaScript', level: 'Intermediate', category: 'Languages', yearsOfExperience: 2, order: 3 },
      { id: '4', name: 'Spring Boot', level: 'Advanced', category: 'Backend', yearsOfExperience: 2, order: 4 },
      { id: '5', name: 'Kubernetes', level: 'Advanced', category: 'Cloud & DevOps', yearsOfExperience: 1, order: 5 },
      { id: '6', name: 'Docker', level: 'Advanced', category: 'Cloud & DevOps', yearsOfExperience: 2, order: 6 },
      { id: '7', name: 'Helm', level: 'Intermediate', category: 'Cloud & DevOps', yearsOfExperience: 1, order: 7 },
      { id: '8', name: 'FluxCD', level: 'Intermediate', category: 'Cloud & DevOps', yearsOfExperience: 1, order: 8 },
      { id: '9', name: 'REST APIs', level: 'Advanced', category: 'Backend', yearsOfExperience: 2, order: 9 },
      { id: '10', name: 'SOAP', level: 'Intermediate', category: 'Backend', yearsOfExperience: 1, order: 10 },
      { id: '11', name: 'SQL', level: 'Advanced', category: 'Databases', yearsOfExperience: 3, order: 11 },
      { id: '12', name: 'MongoDB', level: 'Intermediate', category: 'Databases', yearsOfExperience: 1, order: 12 },
      { id: '13', name: 'DB2', level: 'Intermediate', category: 'Databases', yearsOfExperience: 1, order: 13 },
      { id: '14', name: 'COBOL', level: 'Intermediate', category: 'Languages', yearsOfExperience: 1, order: 14 },
      { id: '15', name: 'LangChain', level: 'Intermediate', category: 'AI', yearsOfExperience: 1, order: 15 },
      { id: '16', name: 'TCP/IP', level: 'Advanced', category: 'Networking', yearsOfExperience: 2, order: 16 }
    ],
    soft: [
      { id: '1', name: 'Agile Methodologies', level: 'Advanced', category: 'Process', order: 1 },
      { id: '2', name: 'Problem-Solving', level: 'Expert', category: 'Analytical', order: 2 },
      { id: '3', name: 'Cross-Functional Collaboration', level: 'Advanced', category: 'Interpersonal', order: 3 },
      { id: '4', name: 'Technical Leadership', level: 'Advanced', category: 'Management', order: 4 }
    ],
    languages: [
      { id: '1', name: 'English', proficiency: 'Fluent', order: 1 },
      { id: '2', name: 'Hindi', proficiency: 'Native', order: 2 },
      { id: '3', name: 'Telugu', proficiency: 'Native', order: 3 }
    ]
  },
  projects: [
    {
      id: '1',
      title: 'AI Customer Support Chatbot',
      description: 'Architected a conversational AI agent using LangChain to orchestrate calls to the OpenAI API for intelligent, context-aware responses',
      technologies: ['LangChain', 'Python', 'OpenAI', 'Django'],
      startDate: '2024-01',
      endDate: '2024-03',
      url: '',
      github: '',
      highlights: [
        'Built intelligent conversational AI using LangChain',
        'Integrated OpenAI API for context-aware responses',
        'Implemented Django backend for chat management'
      ],
      order: 1
    },
    {
      id: '2',
      title: 'CVE Lookup Module – NetSecureX Toolkit',
      description: 'Designed and implemented an async Python module for real-time CVE enumeration, featuring Lucene-based search, CVSS scoring, and severity filtering',
      technologies: ['Python', 'Asyncio', 'REST APIs', 'Vulners API', 'NVD API', 'JSON'],
      startDate: '2023-08',
      endDate: '2023-12',
      url: '',
      github: '',
      highlights: [
        'Implemented async Python module for CVE enumeration',
        'Integrated Lucene-based search functionality',
        'Added CVSS scoring and severity filtering'
      ],
      order: 2
    },
    {
      id: '3',
      title: 'Portfolio Website',
      description: 'Interactive portfolio website with analytics and performance monitoring',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      startDate: '2024-07',
      endDate: 'Present',
      url: 'https://my-resume-eight-beta.vercel.app/',
      github: 'https://github.com/avis-enna/MyResume',
      highlights: [
        'Implemented comprehensive analytics system',
        'Achieved 95+ Lighthouse performance score',
        'Built responsive design for all devices'
      ],
      order: 3
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
      issuer: 'Microsoft',
      issueDate: '2023-08',
      expiryDate: '',
      credentialId: '',
      url: 'https://learn.microsoft.com/en-us/certifications/azure-fundamentals/',
      order: 1
    },
    {
      id: '2',
      name: 'Cisco Certified DevNet Associate (DEVASC)',
      issuer: 'Cisco',
      issueDate: '2023-10',
      expiryDate: '2026-10',
      credentialId: '',
      url: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/devnet-associate.html',
      order: 2
    },
    {
      id: '3',
      name: 'Cisco Certified Network Associate (CCNA)',
      issuer: 'Cisco',
      issueDate: '2023-12',
      expiryDate: '2026-12',
      credentialId: '',
      url: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html',
      order: 3
    },
    {
      id: '4',
      name: 'Cisco Certified Cybersecurity Associate (CCCA)',
      issuer: 'Cisco',
      issueDate: '2024-02',
      expiryDate: '2027-02',
      credentialId: '',
      url: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/cybersecurity-associate.html',
      order: 4
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'Research Paper Publication',
      description: '"IoT-Based Continuous Abiotic Factor Monitoring" – Published in IJFMR, May-June 2023',
      date: '2023-06',
      issuer: 'International Journal For Multidisciplinary Research (IJFMR)',
      order: 1
    },
    {
      id: '2',
      title: 'Kubernetes Migration Success',
      description: 'Successfully migrated IoT Control Center core services from Docker to Kubernetes improving reliability and deployment velocity',
      date: '2024-10',
      issuer: 'Cisco Systems',
      order: 2
    }
  ],
  references: [
    {
      id: '1',
      name: 'John Smith',
      title: 'Senior Engineering Manager',
      company: 'Tech Solutions Inc.',
      email: 'john.smith@techsolutions.com',
      phone: '+91-98765-43210',
      relationship: 'Direct Manager',
      order: 1
    }
  ],
  lastUpdated: new Date().toISOString(),
  version: 1
}

// All types are already exported above with their interface declarations
