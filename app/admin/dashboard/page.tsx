'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderOpen, 
  Award, 
  Download, 
  BarChart3, 
  Settings, 
  LogOut,
  Edit,
  Eye,
  FileText,
  Calendar,
  TrendingUp
} from 'lucide-react'

interface AdminUser {
  id: string
  email: string
  role: string
  lastLogin?: string
}

interface ResumeData {
  personalInfo: {
    fullName: string
    title: string
    email: string
  }
  experience: any[]
  education: any[]
  skills: {
    technical: any[]
    soft: any[]
    languages: any[]
  }
  projects: any[]
  certifications: any[]
  lastUpdated: string
  version: number
}

export default function AdminDashboard() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalDownloads: 0,
    thisMonth: 0,
    mostPopularTemplate: 'Modern Professional',
    lastUpdated: ''
  })
  const router = useRouter()

  useEffect(() => {
    checkAuthAndLoadData()
  }, [])

  const checkAuthAndLoadData = async () => {
    try {
      // Check authentication
      const authResponse = await fetch('/api/admin/verify', {
        credentials: 'include'
      })
      
      if (!authResponse.ok) {
        router.push('/admin/login')
        return
      }
      
      const authData = await authResponse.json()
      if (!authData.valid) {
        router.push('/admin/login')
        return
      }
      
      setUser(authData.user)
      
      // Load resume data
      const resumeResponse = await fetch('/api/resume/data')
      if (resumeResponse.ok) {
        const resumeData = await resumeResponse.json()
        setResumeData(resumeData.data)
        
        // Update stats
        setStats(prev => ({
          ...prev,
          lastUpdated: new Date(resumeData.data.lastUpdated).toLocaleDateString()
        }))
      }
      
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      router.push('/admin/login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include'
      })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleDownloadResume = async (format: string) => {
    try {
      const response = await fetch(`/api/resume/download?format=${format}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${resumeData?.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.${format}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Download error:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-400 mr-3" />
              <h1 className="text-xl font-bold text-white">Resume Management</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-slate-300">Welcome, {user?.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center">
              <Download className="h-8 w-8 text-blue-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-400">Total Downloads</p>
                <p className="text-2xl font-bold text-white">{stats.totalDownloads}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-400">This Month</p>
                <p className="text-2xl font-bold text-white">{stats.thisMonth}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-yellow-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-400">Popular Template</p>
                <p className="text-lg font-bold text-white">{stats.mostPopularTemplate}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-400">Last Updated</p>
                <p className="text-lg font-bold text-white">{stats.lastUpdated}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/admin/profile')}
              className="flex items-center space-x-3 p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Edit className="h-5 w-5 text-white" />
              <span className="text-white font-medium">Edit Profile</span>
            </button>
            
            <button
              onClick={() => router.push('/admin/experience')}
              className="flex items-center space-x-3 p-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <Briefcase className="h-5 w-5 text-white" />
              <span className="text-white font-medium">Update Experience</span>
            </button>
            
            <button
              onClick={() => handleDownloadResume('pdf')}
              className="flex items-center space-x-3 p-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              <Download className="h-5 w-5 text-white" />
              <span className="text-white font-medium">Download Resume</span>
            </button>
          </div>
        </div>

        {/* Resume Overview */}
        {resumeData && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Resume Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Personal Information</h3>
                <div className="space-y-2 text-slate-300">
                  <p><strong>Name:</strong> {resumeData.personalInfo.fullName}</p>
                  <p><strong>Title:</strong> {resumeData.personalInfo.title}</p>
                  <p><strong>Email:</strong> {resumeData.personalInfo.email}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Content Summary</h3>
                <div className="space-y-2 text-slate-300">
                  <p><strong>Experience:</strong> {resumeData.experience.length} positions</p>
                  <p><strong>Education:</strong> {resumeData.education.length} entries</p>
                  <p><strong>Projects:</strong> {resumeData.projects.length} projects</p>
                  <p><strong>Certifications:</strong> {resumeData.certifications.length} certifications</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Personal Info */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center mb-4">
              <User className="h-6 w-6 text-blue-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">Personal Info</h3>
            </div>
            <p className="text-slate-400 mb-4">Manage your personal information and contact details.</p>
            <button
              onClick={() => router.push('/admin/profile')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Edit Profile
            </button>
          </div>

          {/* Work Experience */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center mb-4">
              <Briefcase className="h-6 w-6 text-green-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">Experience</h3>
            </div>
            <p className="text-slate-400 mb-4">Add, edit, or remove work experience entries.</p>
            <button
              onClick={() => router.push('/admin/experience')}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Manage Experience
            </button>
          </div>

          {/* Education */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-6 w-6 text-purple-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">Education</h3>
            </div>
            <p className="text-slate-400 mb-4">Manage your educational background and qualifications.</p>
            <button
              onClick={() => router.push('/admin/education')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Edit Education
            </button>
          </div>

          {/* Skills */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center mb-4">
              <Code className="h-6 w-6 text-yellow-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">Skills</h3>
            </div>
            <p className="text-slate-400 mb-4">Update your technical and soft skills.</p>
            <button
              onClick={() => router.push('/admin/skills')}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Manage Skills
            </button>
          </div>

          {/* Projects */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center mb-4">
              <FolderOpen className="h-6 w-6 text-indigo-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">Projects</h3>
            </div>
            <p className="text-slate-400 mb-4">Showcase your projects and achievements.</p>
            <button
              onClick={() => router.push('/admin/projects')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Edit Projects
            </button>
          </div>

          {/* Analytics */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-6 w-6 text-red-400 mr-3" />
              <h3 className="text-lg font-semibold text-white">Analytics</h3>
            </div>
            <p className="text-slate-400 mb-4">View download statistics and analytics.</p>
            <button
              onClick={() => router.push('/admin/analytics')}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              View Analytics
            </button>
          </div>
        </div>

        {/* Download Options */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mt-8">
          <h2 className="text-xl font-bold text-white mb-4">Download Resume</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => handleDownloadResume('pdf')}
              className="flex items-center justify-center space-x-2 p-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <FileText className="h-5 w-5 text-white" />
              <span className="text-white">PDF</span>
            </button>
            
            <button
              onClick={() => handleDownloadResume('html')}
              className="flex items-center justify-center space-x-2 p-3 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
            >
              <FileText className="h-5 w-5 text-white" />
              <span className="text-white">HTML</span>
            </button>
            
            <button
              onClick={() => handleDownloadResume('txt')}
              className="flex items-center justify-center space-x-2 p-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FileText className="h-5 w-5 text-white" />
              <span className="text-white">Text</span>
            </button>
            
            <button
              onClick={() => handleDownloadResume('json')}
              className="flex items-center justify-center space-x-2 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <FileText className="h-5 w-5 text-white" />
              <span className="text-white">JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
