'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, User, Mail, Phone, MapPin, Globe, Linkedin, Github, AlertCircle, CheckCircle } from 'lucide-react'

interface PersonalInfo {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  summary: string
}

export default function AdminProfile() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
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
      
      // Load resume data
      const resumeResponse = await fetch('/api/resume/data')
      if (resumeResponse.ok) {
        const resumeData = await resumeResponse.json()
        setPersonalInfo(resumeData.data.personalInfo)
      }
      
    } catch (error) {
      console.error('Error loading profile data:', error)
      setMessage({ type: 'error', text: 'Failed to load profile data' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear messages when user starts typing
    if (message.text) setMessage({ type: '', text: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await fetch('/api/resume/data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          updates: { personalInfo }
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update profile' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mr-6"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-xl font-bold text-white">Edit Profile</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-800 rounded-lg border border-slate-700">
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center">
              <User className="h-6 w-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-bold text-white">Personal Information</h2>
            </div>
            <p className="text-slate-400 mt-2">Update your personal details and contact information.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-200 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={personalInfo.fullName}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-200 mb-2">
                  Professional Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={personalInfo.title}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-3 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Backend Developer & Cybersecurity Specialist"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-200 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-slate-200 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={personalInfo.location}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City, State, Country"
                  />
                </div>
              </div>

              {/* Website */}
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-slate-200 mb-2">
                  Website
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={personalInfo.website}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              {/* LinkedIn */}
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-slate-200 mb-2">
                  LinkedIn Profile
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Linkedin className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={personalInfo.linkedin}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>

              {/* GitHub */}
              <div>
                <label htmlFor="github" className="block text-sm font-medium text-slate-200 mb-2">
                  GitHub Profile
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Github className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    value={personalInfo.github}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mt-6">
              <label htmlFor="summary" className="block text-sm font-medium text-slate-200 mb-2">
                Professional Summary *
              </label>
              <textarea
                id="summary"
                name="summary"
                value={personalInfo.summary}
                onChange={handleInputChange}
                required
                rows={4}
                className="block w-full px-3 py-3 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Write a brief professional summary highlighting your key skills and experience..."
              />
              <p className="text-slate-400 text-sm mt-2">
                A concise overview of your professional background and key strengths.
              </p>
            </div>

            {/* Message */}
            {message.text && (
              <div className={`mt-6 flex items-center space-x-2 p-3 rounded-lg ${
                message.type === 'success' 
                  ? 'text-green-400 bg-green-500/10 border border-green-500/20' 
                  : 'text-red-400 bg-red-500/10 border border-red-500/20'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                )}
                <span className="text-sm">{message.text}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
