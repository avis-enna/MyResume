import { NextRequest, NextResponse } from 'next/server'
import { getResumeData, trackDownload } from '../../../lib/resume-data'
import { generatePDFContent } from '../../../lib/pdf-generator'
import { ResumeTemplate } from '../../../lib/resume-types'

// Security headers for API responses
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

// Default modern professional template
const defaultTemplate: ResumeTemplate = {
  id: 'modern-professional',
  name: 'Modern Professional',
  description: 'Clean, ATS-friendly design perfect for most industries',
  category: 'professional',
  preview: '/templates/modern-professional.png',
  atsCompatible: true,
  features: ['ATS-friendly', 'Clean design', 'Professional layout'],
  styles: {
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#3b82f6',
      text: '#1e293b',
      background: '#ffffff',
      border: '#e2e8f0'
    },
    fonts: {
      heading: 'Inter, system-ui, sans-serif',
      body: 'Inter, system-ui, sans-serif',
      size: {
        heading: '2rem',
        subheading: '1.25rem',
        body: '0.875rem',
        small: '0.75rem'
      }
    },
    spacing: {
      sections: '1.5rem',
      items: '1rem',
      margins: '1rem'
    },
    borders: {
      radius: '0.25rem',
      width: '1px',
      style: 'solid'
    }
  },
  layout: {
    columns: 1,
    headerStyle: 'centered',
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
    showProfileImage: false,
    showIcons: true,
    compactMode: false
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'pdf'
    const template = searchParams.get('template') || 'modern-professional'
    
    // Get client information for analytics
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referrer = request.headers.get('referer')

    // Validate format
    const validFormats = ['pdf', 'html', 'json', 'txt']
    if (!validFormats.includes(format)) {
      return NextResponse.json(
        { error: 'Invalid format. Supported formats: pdf, html, json, txt' },
        { status: 400, headers: securityHeaders }
      )
    }

    // Get resume data
    const resumeData = getResumeData()
    
    // Track download
    trackDownload(
      format as 'pdf' | 'html' | 'json' | 'txt',
      template,
      userAgent,
      clientIP,
      referrer || undefined
    )

    // Generate content based on format
    switch (format) {
      case 'pdf':
        // For PDF, we'll return HTML that can be converted to PDF on the client side
        const htmlContent = generatePDFContent(resumeData, defaultTemplate)
        
        return new NextResponse(htmlContent, {
          status: 200,
          headers: {
            ...securityHeaders,
            'Content-Type': 'text/html',
            'Content-Disposition': `attachment; filename="${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.html"`,
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        })

      case 'html':
        const htmlForDownload = generatePDFContent(resumeData, defaultTemplate)
        
        return new NextResponse(htmlForDownload, {
          status: 200,
          headers: {
            ...securityHeaders,
            'Content-Type': 'text/html',
            'Content-Disposition': `attachment; filename="${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.html"`,
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        })

      case 'json':
        const jsonContent = JSON.stringify(resumeData, null, 2)
        
        return new NextResponse(jsonContent, {
          status: 200,
          headers: {
            ...securityHeaders,
            'Content-Type': 'application/json',
            'Content-Disposition': `attachment; filename="${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.json"`,
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        })

      case 'txt':
        const textContent = generateTextResume(resumeData)
        
        return new NextResponse(textContent, {
          status: 200,
          headers: {
            ...securityHeaders,
            'Content-Type': 'text/plain',
            'Content-Disposition': `attachment; filename="${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.txt"`,
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        })

      default:
        return NextResponse.json(
          { error: 'Unsupported format' },
          { status: 400, headers: securityHeaders }
        )
    }

  } catch (error) {
    console.error('Resume download error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: securityHeaders }
    )
  }
}

// Generate plain text resume (ATS-friendly)
function generateTextResume(resumeData: any): string {
  const { personalInfo, experience, education, skills, projects, certifications } = resumeData
  
  let textContent = ''
  
  // Header
  textContent += `${personalInfo.fullName}\n`
  textContent += `${personalInfo.title}\n`
  textContent += `\n`
  textContent += `Email: ${personalInfo.email}\n`
  textContent += `Phone: ${personalInfo.phone}\n`
  textContent += `Location: ${personalInfo.location}\n`
  
  if (personalInfo.website) {
    textContent += `Website: ${personalInfo.website}\n`
  }
  if (personalInfo.linkedin) {
    textContent += `LinkedIn: ${personalInfo.linkedin}\n`
  }
  if (personalInfo.github) {
    textContent += `GitHub: ${personalInfo.github}\n`
  }
  
  textContent += `\n${'='.repeat(80)}\n\n`
  
  // Professional Summary
  if (personalInfo.summary) {
    textContent += `PROFESSIONAL SUMMARY\n`
    textContent += `${'-'.repeat(20)}\n`
    textContent += `${personalInfo.summary}\n\n`
  }
  
  // Work Experience
  if (experience.length > 0) {
    textContent += `WORK EXPERIENCE\n`
    textContent += `${'-'.repeat(15)}\n`
    
    experience.sort((a, b) => a.order - b.order).forEach(exp => {
      textContent += `${exp.position}\n`
      textContent += `${exp.company} | ${exp.location}\n`
      textContent += `${exp.startDate} - ${exp.endDate}\n\n`
      
      if (exp.description.length > 0) {
        exp.description.forEach(desc => {
          textContent += `• ${desc}\n`
        })
        textContent += `\n`
      }
      
      if (exp.technologies.length > 0) {
        textContent += `Technologies: ${exp.technologies.join(', ')}\n\n`
      }
      
      if (exp.achievements.length > 0) {
        textContent += `Key Achievements:\n`
        exp.achievements.forEach(ach => {
          textContent += `• ${ach}\n`
        })
        textContent += `\n`
      }
    })
  }
  
  // Education
  if (education.length > 0) {
    textContent += `EDUCATION\n`
    textContent += `${'-'.repeat(9)}\n`
    
    education.sort((a, b) => a.order - b.order).forEach(edu => {
      textContent += `${edu.degree} in ${edu.field}\n`
      textContent += `${edu.institution} | ${edu.location}\n`
      textContent += `${edu.startDate} - ${edu.endDate}\n`
      
      if (edu.gpa) {
        textContent += `GPA: ${edu.gpa}\n`
      }
      
      if (edu.honors && edu.honors.length > 0) {
        textContent += `Honors: ${edu.honors.join(', ')}\n`
      }
      
      textContent += `\n`
    })
  }
  
  // Skills
  if (skills.technical.length > 0 || skills.soft.length > 0) {
    textContent += `SKILLS\n`
    textContent += `${'-'.repeat(6)}\n`
    
    if (skills.technical.length > 0) {
      textContent += `Technical Skills:\n`
      const techSkills = skills.technical.sort((a, b) => a.order - b.order)
        .map(skill => `${skill.name}${skill.level ? ` (${skill.level})` : ''}`)
      textContent += `${techSkills.join(', ')}\n\n`
    }
    
    if (skills.soft.length > 0) {
      textContent += `Soft Skills:\n`
      const softSkills = skills.soft.sort((a, b) => a.order - b.order)
        .map(skill => skill.name)
      textContent += `${softSkills.join(', ')}\n\n`
    }
    
    if (skills.languages.length > 0) {
      textContent += `Languages:\n`
      const languages = skills.languages.sort((a, b) => a.order - b.order)
        .map(lang => `${lang.name} (${lang.proficiency})`)
      textContent += `${languages.join(', ')}\n\n`
    }
  }
  
  // Projects
  if (projects.length > 0) {
    textContent += `PROJECTS\n`
    textContent += `${'-'.repeat(8)}\n`
    
    projects.sort((a, b) => a.order - b.order).forEach(project => {
      textContent += `${project.title}\n`
      textContent += `${project.startDate} - ${project.endDate}\n`
      textContent += `${project.description}\n`
      
      if (project.technologies.length > 0) {
        textContent += `Technologies: ${project.technologies.join(', ')}\n`
      }
      
      if (project.highlights.length > 0) {
        project.highlights.forEach(highlight => {
          textContent += `• ${highlight}\n`
        })
      }
      
      if (project.url) {
        textContent += `URL: ${project.url}\n`
      }
      
      if (project.github) {
        textContent += `GitHub: ${project.github}\n`
      }
      
      textContent += `\n`
    })
  }
  
  // Certifications
  if (certifications.length > 0) {
    textContent += `CERTIFICATIONS\n`
    textContent += `${'-'.repeat(14)}\n`
    
    certifications.sort((a, b) => a.order - b.order).forEach(cert => {
      textContent += `${cert.name}\n`
      textContent += `${cert.issuer}\n`
      textContent += `Issued: ${cert.issueDate}`
      
      if (cert.expiryDate) {
        textContent += ` | Expires: ${cert.expiryDate}`
      }
      
      textContent += `\n`
      
      if (cert.credentialId) {
        textContent += `Credential ID: ${cert.credentialId}\n`
      }
      
      textContent += `\n`
    })
  }
  
  return textContent
}

// Handle other HTTP methods
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { ...securityHeaders, 'Allow': 'GET' } }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { ...securityHeaders, 'Allow': 'GET' } }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { ...securityHeaders, 'Allow': 'GET' } }
  )
}
