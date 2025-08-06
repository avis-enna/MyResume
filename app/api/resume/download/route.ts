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
        // For PDF, return HTML with print instructions
        const htmlContent = generatePrintableResume(resumeData)

        return new NextResponse(htmlContent, {
          status: 200,
          headers: {
            ...securityHeaders,
            'Content-Type': 'text/html',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        })

      case 'html':
        const htmlForDownload = generateProfessionalResume(resumeData)

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

// Generate printable resume with instructions
function generatePrintableResume(resumeData: any): string {
  const professionalHTML = generateProfessionalResume(resumeData)

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Print Resume - ${resumeData.personalInfo.fullName}</title>
    <style>
        .print-instructions {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #1e40af;
            color: white;
            padding: 1rem;
            text-align: center;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .print-instructions button {
            background: white;
            color: #1e40af;
            border: none;
            padding: 0.5rem 1rem;
            margin: 0 0.5rem;
            border-radius: 0.25rem;
            cursor: pointer;
            font-weight: 600;
        }
        .print-instructions button:hover {
            background: #f3f4f6;
        }
        .resume-content {
            margin-top: 80px;
        }
        @media print {
            .print-instructions {
                display: none !important;
            }
            .resume-content {
                margin-top: 0 !important;
            }
        }
    </style>
</head>
<body>
    <div class="print-instructions">
        <p><strong>📄 Ready to Print!</strong> Press Ctrl+P (or Cmd+P on Mac) and select "Save as PDF" to download your resume.</p>
        <button onclick="window.print()">🖨️ Print/Save as PDF</button>
        <button onclick="window.close()">❌ Close</button>
    </div>
    <div class="resume-content">
        ${professionalHTML.replace('<!DOCTYPE html>', '').replace(/<html[^>]*>/, '').replace('</html>', '').replace(/<head>[\s\S]*?<\/head>/, '').replace(/<body[^>]*>/, '').replace('</body>', '')}
    </div>
    <script>
        // Auto-focus for better UX
        window.addEventListener('load', function() {
            // Auto-print after a short delay
            setTimeout(function() {
                if (confirm('Would you like to print/save the resume as PDF now?')) {
                    window.print();
                }
            }, 1000);
        });
    </script>
</body>
</html>`
}

// Generate professional resume HTML based on your actual resume design
function generateProfessionalResume(resumeData: any): string {
  const { personalInfo, experience, education, skills, projects, certifications, achievements } = resumeData

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo.fullName} - Resume</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
        }
        @media print {
            body {
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }
            .no-print {
                display: none;
            }
        }
        .page-container {
            max-width: 8.5in;
            min-height: 11in;
            margin: auto;
            padding: 2rem;
        }
    </style>
</head>
<body class="bg-gray-100">

    <div class="page-container bg-white shadow-lg my-6 mx-auto">
        <table style="width: 100%; border-collapse: collapse;">
            <tbody>
                <tr>
                    <!-- Left Column -->
                    <td style="width: 33.33%; vertical-align: top; padding-right: 2rem;">
                        <aside class="text-gray-700">
                            <!-- Contact Info -->
                            <section class="mb-4">
                                <h1 class="text-2xl font-bold text-gray-900">${personalInfo.fullName}</h1>
                                <h2 class="text-md font-medium text-blue-600">${personalInfo.title}</h2>
                                 <div class="mt-2 space-y-1 text-xs">
                                    <div class="flex items-center">
                                        <svg class="w-3 h-3 mr-2 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        <span>${personalInfo.location}</span>
                                    </div>
                                    <div class="flex items-center">
                                        <svg class="w-3 h-3 mr-2 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                        <span>${personalInfo.phone}</span>
                                    </div>
                                    <div class="flex items-center">
                                        <svg class="w-3 h-3 mr-2 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        <a href="mailto:${personalInfo.email}" class="hover:text-blue-700 truncate">${personalInfo.email}</a>
                                    </div>
                                    ${personalInfo.linkedin ? `
                                    <div class="flex items-center">
                                        <svg class="w-3 h-3 mr-2 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                        <a href="${personalInfo.linkedin}" target="_blank" class="hover:text-blue-700">LinkedIn Profile</a>
                                    </div>
                                    ` : ''}
                                    ${personalInfo.website ? `
                                     <div class="flex items-center">
                                        <svg class="w-3 h-3 mr-2 text-blue-600 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                        </svg>
                                        <a href="${personalInfo.website}" target="_blank" class="hover:text-blue-700">Portfolio</a>
                                    </div>
                                    ` : ''}
                                </div>
                            </section>

                            <!-- Technical Skills -->
                            <section class="mb-4">
                                <h3 class="text-lg font-semibold text-gray-900 border-b-2 border-blue-100 pb-1 mb-2">Technical Skills</h3>
                                <div class="text-xs space-y-2">
                                    <div>
                                        <h4 class="font-semibold text-gray-800 text-sm">AI</h4>
                                        <p>AI Agent Development, LangChain, NLP</p>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-800 text-sm">Cloud & DevOps</h4>
                                        <p>Kubernetes, Docker, Helm, FluxCD, CI/CD</p>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-800 text-sm">Languages</h4>
                                        <p>Java, Python, JavaScript, SQL, Shell Scripting, COBOL</p>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-800 text-sm">Backend</h4>
                                        <p>Spring Boot, REST APIs, SOAP, Microservices</p>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-800 text-sm">Databases & Mainframe</h4>
                                        <p>SQL, MongoDB, IBM DB2, VSAM, JCL</p>
                                    </div>
                                     <div>
                                        <h4 class="font-semibold text-gray-800 text-sm">Networking</h4>
                                        <p>TCP/IP, HTTP, DNS, Network Device Troubleshooting</p>
                                    </div>
                                </div>
                            </section>

                            <section class="mb-4">
                                <h3 class="text-lg font-semibold text-gray-900 border-b-2 border-blue-100 pb-1 mb-2">Soft Skills</h3>
                                 <ul class="text-xs space-y-1">
                                    ${skills.soft.map(skill => `<li>• ${skill.name}</li>`).join('')}
                                </ul>
                            </section>

                            <!-- Education -->
                            <section class="mb-4">
                                <h3 class="text-lg font-semibold text-gray-900 border-b-2 border-blue-100 pb-1 mb-2">Education</h3>
                                ${education.map(edu => `
                                <div class="text-sm">
                                    <p class="font-bold">${edu.degree} in ${edu.field}</p>
                                    <p class="text-xs">${edu.institution}, ${edu.location}</p>
                                </div>
                                `).join('')}
                            </section>

                            <!-- Certifications -->
                            <section>
                                <h3 class="text-lg font-semibold text-gray-900 border-b-2 border-blue-100 pb-1 mb-2">Certifications</h3>
                                <ul class="text-xs space-y-1">
                                    ${certifications.map(cert => `<li>• ${cert.name}</li>`).join('')}
                                </ul>
                            </section>
                        </aside>
                    </td>

                    <!-- Right Column -->
                    <td style="width: 66.66%; vertical-align: top; padding-left: 2rem;">
                        <main>
                            <!-- Summary -->
                            <section class="mb-4">
                                <h3 class="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-1 mb-2">Summary</h3>
                                <p class="text-sm text-gray-700 leading-normal">
                                    ${personalInfo.summary}
                                </p>
                            </section>

                            <!-- Experience -->
                            <section class="mb-4">
                                <h3 class="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-1 mb-2">Professional Experience</h3>
                                <div class="space-y-3">
                                    ${experience.map(exp => `
                                    <div>
                                        <div class="flex justify-between items-baseline">
                                            <h4 class="text-md font-semibold text-blue-700">${exp.position}</h4>
                                            <p class="text-xs font-medium text-gray-600">${exp.startDate} – ${exp.endDate}</p>
                                        </div>
                                        <p class="text-sm font-medium text-gray-800">${exp.company}</p>
                                        <ul class="mt-1 text-sm text-gray-700 space-y-1 leading-snug">
                                            ${exp.description.map(desc => `<li>• ${desc}</li>`).join('')}
                                        </ul>
                                    </div>
                                    `).join('')}
                                </div>
                            </section>

                            <!-- Projects -->
                            <section>
                                <h3 class="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-1 mb-2">Projects & Publications</h3>
                                ${projects.map(project => `
                                 <div class="mb-2">
                                    <h4 class="text-md font-semibold text-blue-700">${project.title}</h4>
                                    <p class="text-xs font-medium text-gray-600">Technologies: ${project.technologies.join(', ')}</p>
                                    <ul class="mt-1 text-sm text-gray-700 space-y-1 leading-snug">
                                       <li>• ${project.description}</li>
                                    </ul>
                                </div>
                                `).join('')}
                                ${achievements.filter(ach => ach.title.includes('Research')).map(ach => `
                                <div>
                                     <h4 class="text-md font-semibold text-blue-700">Research Paper</h4>
                                     <p class="text-sm text-gray-700">${ach.description}</p>
                                </div>
                                `).join('')}
                            </section>
                        </main>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>`
}
