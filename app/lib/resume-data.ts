import { ResumeData, defaultResumeData, WorkExperience, Education, Skill, Project, Certification, Achievement, Reference, PersonalInfo, DownloadAnalytics } from './resume-types'
import fs from 'fs'
import path from 'path'

// File-based storage for persistence
const RESUME_DATA_FILE = path.join(process.cwd(), '.resume-data.json')
const ANALYTICS_FILE = path.join(process.cwd(), '.download-analytics.json')

// Load resume data from file
function loadResumeData(): ResumeData {
  try {
    if (fs.existsSync(RESUME_DATA_FILE)) {
      const data = fs.readFileSync(RESUME_DATA_FILE, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading resume data:', error)
  }
  return { ...defaultResumeData }
}

// Save resume data to file
function saveResumeData(data: ResumeData): void {
  try {
    fs.writeFileSync(RESUME_DATA_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error saving resume data:', error)
  }
}

// Load analytics from file
function loadAnalytics(): DownloadAnalytics[] {
  try {
    if (fs.existsSync(ANALYTICS_FILE)) {
      const data = fs.readFileSync(ANALYTICS_FILE, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading analytics:', error)
  }
  return []
}

// Save analytics to file
function saveAnalytics(analytics: DownloadAnalytics[]): void {
  try {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(analytics, null, 2))
  } catch (error) {
    console.error('Error saving analytics:', error)
  }
}

// Initialize data
let currentResumeData: ResumeData = loadResumeData()
let downloadAnalytics: DownloadAnalytics[] = loadAnalytics()

// Get current resume data
export function getResumeData(): ResumeData {
  return { ...currentResumeData }
}

// Update resume data
export function updateResumeData(updates: Partial<ResumeData>): ResumeData {
  currentResumeData = {
    ...currentResumeData,
    ...updates,
    lastUpdated: new Date().toISOString(),
    version: currentResumeData.version + 1
  }
  saveResumeData(currentResumeData)
  return { ...currentResumeData }
}

// Update personal information
export function updatePersonalInfo(personalInfo: PersonalInfo): ResumeData {
  return updateResumeData({ personalInfo })
}

// Work Experience Management
export function addWorkExperience(experience: Omit<WorkExperience, 'id' | 'order'>): ResumeData {
  const newExperience: WorkExperience = {
    ...experience,
    id: `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    order: currentResumeData.experience.length + 1
  }
  
  return updateResumeData({
    experience: [...currentResumeData.experience, newExperience]
  })
}

export function updateWorkExperience(id: string, updates: Partial<WorkExperience>): ResumeData {
  const experience = currentResumeData.experience.map(exp =>
    exp.id === id ? { ...exp, ...updates } : exp
  )
  return updateResumeData({ experience })
}

export function deleteWorkExperience(id: string): ResumeData {
  const experience = currentResumeData.experience.filter(exp => exp.id !== id)
  return updateResumeData({ experience })
}

export function reorderWorkExperience(experienceIds: string[]): ResumeData {
  const experience = experienceIds.map((id, index) => {
    const exp = currentResumeData.experience.find(e => e.id === id)
    return exp ? { ...exp, order: index + 1 } : null
  }).filter(Boolean) as WorkExperience[]
  
  return updateResumeData({ experience })
}

// Education Management
export function addEducation(education: Omit<Education, 'id' | 'order'>): ResumeData {
  const newEducation: Education = {
    ...education,
    id: `edu_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    order: currentResumeData.education.length + 1
  }
  
  return updateResumeData({
    education: [...currentResumeData.education, newEducation]
  })
}

export function updateEducation(id: string, updates: Partial<Education>): ResumeData {
  const education = currentResumeData.education.map(edu =>
    edu.id === id ? { ...edu, ...updates } : edu
  )
  return updateResumeData({ education })
}

export function deleteEducation(id: string): ResumeData {
  const education = currentResumeData.education.filter(edu => edu.id !== id)
  return updateResumeData({ education })
}

// Skills Management
export function addSkill(skill: Omit<Skill, 'id' | 'order'>, type: 'technical' | 'soft'): ResumeData {
  const newSkill: Skill = {
    ...skill,
    id: `skill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    order: currentResumeData.skills[type].length + 1
  }
  
  const skills = {
    ...currentResumeData.skills,
    [type]: [...currentResumeData.skills[type], newSkill]
  }
  
  return updateResumeData({ skills })
}

export function updateSkill(id: string, updates: Partial<Skill>, type: 'technical' | 'soft'): ResumeData {
  const skills = {
    ...currentResumeData.skills,
    [type]: currentResumeData.skills[type].map(skill =>
      skill.id === id ? { ...skill, ...updates } : skill
    )
  }
  return updateResumeData({ skills })
}

export function deleteSkill(id: string, type: 'technical' | 'soft'): ResumeData {
  const skills = {
    ...currentResumeData.skills,
    [type]: currentResumeData.skills[type].filter(skill => skill.id !== id)
  }
  return updateResumeData({ skills })
}

// Projects Management
export function addProject(project: Omit<Project, 'id' | 'order'>): ResumeData {
  const newProject: Project = {
    ...project,
    id: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    order: currentResumeData.projects.length + 1
  }
  
  return updateResumeData({
    projects: [...currentResumeData.projects, newProject]
  })
}

export function updateProject(id: string, updates: Partial<Project>): ResumeData {
  const projects = currentResumeData.projects.map(proj =>
    proj.id === id ? { ...proj, ...updates } : proj
  )
  return updateResumeData({ projects })
}

export function deleteProject(id: string): ResumeData {
  const projects = currentResumeData.projects.filter(proj => proj.id !== id)
  return updateResumeData({ projects })
}

// Certifications Management
export function addCertification(certification: Omit<Certification, 'id' | 'order'>): ResumeData {
  const newCertification: Certification = {
    ...certification,
    id: `cert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    order: currentResumeData.certifications.length + 1
  }
  
  return updateResumeData({
    certifications: [...currentResumeData.certifications, newCertification]
  })
}

export function updateCertification(id: string, updates: Partial<Certification>): ResumeData {
  const certifications = currentResumeData.certifications.map(cert =>
    cert.id === id ? { ...cert, ...updates } : cert
  )
  return updateResumeData({ certifications })
}

export function deleteCertification(id: string): ResumeData {
  const certifications = currentResumeData.certifications.filter(cert => cert.id !== id)
  return updateResumeData({ certifications })
}

// Achievements Management
export function addAchievement(achievement: Omit<Achievement, 'id' | 'order'>): ResumeData {
  const newAchievement: Achievement = {
    ...achievement,
    id: `ach_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    order: currentResumeData.achievements.length + 1
  }
  
  return updateResumeData({
    achievements: [...currentResumeData.achievements, newAchievement]
  })
}

export function updateAchievement(id: string, updates: Partial<Achievement>): ResumeData {
  const achievements = currentResumeData.achievements.map(ach =>
    ach.id === id ? { ...ach, ...updates } : ach
  )
  return updateResumeData({ achievements })
}

export function deleteAchievement(id: string): ResumeData {
  const achievements = currentResumeData.achievements.filter(ach => ach.id !== id)
  return updateResumeData({ achievements })
}

// References Management
export function addReference(reference: Omit<Reference, 'id' | 'order'>): ResumeData {
  const newReference: Reference = {
    ...reference,
    id: `ref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    order: currentResumeData.references.length + 1
  }
  
  return updateResumeData({
    references: [...currentResumeData.references, newReference]
  })
}

export function updateReference(id: string, updates: Partial<Reference>): ResumeData {
  const references = currentResumeData.references.map(ref =>
    ref.id === id ? { ...ref, ...updates } : ref
  )
  return updateResumeData({ references })
}

export function deleteReference(id: string): ResumeData {
  const references = currentResumeData.references.filter(ref => ref.id !== id)
  return updateResumeData({ references })
}

// Download Analytics
export function trackDownload(
  format: 'pdf' | 'docx' | 'txt' | 'html' | 'json',
  template: string,
  userAgent: string,
  ipAddress: string,
  referrer?: string,
  sessionId?: string
): void {
  const analytics: DownloadAnalytics = {
    id: `download_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    format,
    template,
    userAgent,
    ipAddress,
    referrer,
    sessionId: sessionId || 'anonymous'
  }
  
  downloadAnalytics.push(analytics)

  // Keep only last 1000 downloads
  if (downloadAnalytics.length > 1000) {
    downloadAnalytics.splice(0, downloadAnalytics.length - 1000)
  }

  // Save analytics to file
  saveAnalytics(downloadAnalytics)
}

// Get download analytics
export function getDownloadAnalytics(limit?: number): DownloadAnalytics[] {
  const analytics = [...downloadAnalytics].reverse()
  return limit ? analytics.slice(0, limit) : analytics
}

// Get download statistics
export function getDownloadStatistics() {
  const now = new Date()
  const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  
  const recent24h = downloadAnalytics.filter(d => new Date(d.timestamp) >= last24Hours)
  const recent7d = downloadAnalytics.filter(d => new Date(d.timestamp) >= last7Days)
  const recent30d = downloadAnalytics.filter(d => new Date(d.timestamp) >= last30Days)
  
  // Format statistics
  const formatCounts = downloadAnalytics.reduce((acc, d) => {
    acc[d.format] = (acc[d.format] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const templateCounts = downloadAnalytics.reduce((acc, d) => {
    acc[d.template] = (acc[d.template] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return {
    total: downloadAnalytics.length,
    last24Hours: recent24h.length,
    last7Days: recent7d.length,
    last30Days: recent30d.length,
    formatBreakdown: formatCounts,
    templateBreakdown: templateCounts,
    mostPopularFormat: Object.entries(formatCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'pdf',
    mostPopularTemplate: Object.entries(templateCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'modern'
  }
}

// Export/Import functionality
export function exportResumeData(): string {
  return JSON.stringify(currentResumeData, null, 2)
}

export function importResumeData(jsonData: string): { success: boolean; error?: string } {
  try {
    const data = JSON.parse(jsonData) as ResumeData
    
    // Basic validation
    if (!data.personalInfo || !data.personalInfo.fullName) {
      return { success: false, error: 'Invalid resume data: missing personal information' }
    }
    
    currentResumeData = {
      ...data,
      lastUpdated: new Date().toISOString(),
      version: currentResumeData.version + 1
    }
    
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Invalid JSON format' }
  }
}

// Reset to default data
export function resetToDefaultData(): ResumeData {
  currentResumeData = {
    ...defaultResumeData,
    lastUpdated: new Date().toISOString(),
    version: 1
  }
  return { ...currentResumeData }
}
