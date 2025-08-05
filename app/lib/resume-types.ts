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
    title: 'Backend Developer & Cybersecurity Specialist',
    email: 'vsivareddy.venna@gmail.com',
    phone: '+91-93989-61541',
    location: 'Bengaluru, Karnataka, India',
    website: 'https://sivareddy.dev',
    linkedin: 'https://linkedin.com/in/sivareddy-venna',
    github: 'https://github.com/avis-enna',
    summary: 'Experienced Backend Developer and Cybersecurity Specialist with expertise in Node.js, Python, PostgreSQL, and network security. Passionate about building secure, scalable solutions and protecting digital infrastructure.'
  },
  experience: [
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      position: 'Senior Backend Developer',
      location: 'Bengaluru, India',
      startDate: '2022-01',
      endDate: 'Present',
      description: [
        'Led development of secure backend systems serving 100K+ users',
        'Implemented robust security measures reducing vulnerabilities by 80%',
        'Optimized database performance improving response times by 60%'
      ],
      technologies: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
      achievements: [
        'Reduced system downtime by 95% through proactive monitoring',
        'Mentored 5 junior developers in security best practices'
      ],
      order: 1
    }
  ],
  education: [
    {
      id: '1',
      institution: 'Indian Institute of Technology',
      degree: 'Bachelor of Technology',
      field: 'Computer Science and Engineering',
      location: 'India',
      startDate: '2018',
      endDate: '2022',
      gpa: '8.5/10',
      honors: ['Dean\'s List', 'Academic Excellence Award'],
      coursework: ['Data Structures', 'Algorithms', 'Database Systems', 'Network Security'],
      order: 1
    }
  ],
  skills: {
    technical: [
      { id: '1', name: 'Node.js', level: 'Expert', category: 'Backend', yearsOfExperience: 4, order: 1 },
      { id: '2', name: 'Python', level: 'Advanced', category: 'Backend', yearsOfExperience: 3, order: 2 },
      { id: '3', name: 'PostgreSQL', level: 'Advanced', category: 'Database', yearsOfExperience: 4, order: 3 },
      { id: '4', name: 'React', level: 'Intermediate', category: 'Frontend', yearsOfExperience: 2, order: 4 }
    ],
    soft: [
      { id: '1', name: 'Leadership', level: 'Advanced', category: 'Management', order: 1 },
      { id: '2', name: 'Problem Solving', level: 'Expert', category: 'Analytical', order: 2 },
      { id: '3', name: 'Communication', level: 'Advanced', category: 'Interpersonal', order: 3 }
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
      title: 'Portfolio Website',
      description: 'Interactive portfolio website with analytics and performance monitoring',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      startDate: '2024-07',
      endDate: 'Present',
      url: 'https://sivareddy.dev',
      github: 'https://github.com/avis-enna/MyResume',
      highlights: [
        'Implemented comprehensive analytics system',
        'Achieved 95+ Lighthouse performance score',
        'Built responsive design for all devices'
      ],
      order: 1
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2023-06',
      expiryDate: '2026-06',
      credentialId: 'AWS-CSA-2023-001',
      url: 'https://aws.amazon.com/certification/',
      order: 1
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'Best Security Implementation Award',
      description: 'Recognized for implementing industry-leading security measures',
      date: '2023-12',
      issuer: 'Tech Solutions Inc.',
      order: 1
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
