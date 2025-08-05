import { ResumeData, ResumeTemplate } from './resume-types'

// PDF generation using jsPDF (client-side)
export function generatePDFContent(resumeData: ResumeData, template: ResumeTemplate): string {
  const { personalInfo, experience, education, skills, projects, certifications } = resumeData
  
  // Generate HTML content for PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${personalInfo.fullName} - Resume</title>
      <style>
        ${getPDFStyles(template)}
      </style>
    </head>
    <body>
      <div class="resume-container">
        <!-- Header Section -->
        <header class="header">
          <div class="header-content">
            <h1 class="name">${personalInfo.fullName}</h1>
            <h2 class="title">${personalInfo.title}</h2>
            <div class="contact-info">
              <div class="contact-item">
                <span class="icon">📧</span>
                <span>${personalInfo.email}</span>
              </div>
              <div class="contact-item">
                <span class="icon">📱</span>
                <span>${personalInfo.phone}</span>
              </div>
              <div class="contact-item">
                <span class="icon">📍</span>
                <span>${personalInfo.location}</span>
              </div>
              ${personalInfo.website ? `
                <div class="contact-item">
                  <span class="icon">🌐</span>
                  <span>${personalInfo.website}</span>
                </div>
              ` : ''}
              ${personalInfo.linkedin ? `
                <div class="contact-item">
                  <span class="icon">💼</span>
                  <span>${personalInfo.linkedin}</span>
                </div>
              ` : ''}
              ${personalInfo.github ? `
                <div class="contact-item">
                  <span class="icon">💻</span>
                  <span>${personalInfo.github}</span>
                </div>
              ` : ''}
            </div>
          </div>
        </header>

        <!-- Professional Summary -->
        ${personalInfo.summary ? `
          <section class="section">
            <h3 class="section-title">Professional Summary</h3>
            <div class="section-content">
              <p class="summary">${personalInfo.summary}</p>
            </div>
          </section>
        ` : ''}

        <!-- Work Experience -->
        ${experience.length > 0 ? `
          <section class="section">
            <h3 class="section-title">Work Experience</h3>
            <div class="section-content">
              ${experience.sort((a, b) => a.order - b.order).map(exp => `
                <div class="experience-item">
                  <div class="experience-header">
                    <h4 class="position">${exp.position}</h4>
                    <div class="company-info">
                      <span class="company">${exp.company}</span>
                      <span class="location">${exp.location}</span>
                    </div>
                    <div class="date-range">
                      ${exp.startDate} - ${exp.endDate}
                    </div>
                  </div>
                  <div class="experience-content">
                    ${exp.description.length > 0 ? `
                      <ul class="description-list">
                        ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
                      </ul>
                    ` : ''}
                    ${exp.technologies.length > 0 ? `
                      <div class="technologies">
                        <strong>Technologies:</strong> ${exp.technologies.join(', ')}
                      </div>
                    ` : ''}
                    ${exp.achievements.length > 0 ? `
                      <div class="achievements">
                        <strong>Key Achievements:</strong>
                        <ul>
                          ${exp.achievements.map(ach => `<li>${ach}</li>`).join('')}
                        </ul>
                      </div>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- Education -->
        ${education.length > 0 ? `
          <section class="section">
            <h3 class="section-title">Education</h3>
            <div class="section-content">
              ${education.sort((a, b) => a.order - b.order).map(edu => `
                <div class="education-item">
                  <div class="education-header">
                    <h4 class="degree">${edu.degree} in ${edu.field}</h4>
                    <div class="institution">${edu.institution}</div>
                    <div class="date-range">${edu.startDate} - ${edu.endDate}</div>
                  </div>
                  ${edu.gpa ? `<div class="gpa">GPA: ${edu.gpa}</div>` : ''}
                  ${edu.honors && edu.honors.length > 0 ? `
                    <div class="honors">
                      <strong>Honors:</strong> ${edu.honors.join(', ')}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- Skills -->
        ${(skills.technical.length > 0 || skills.soft.length > 0) ? `
          <section class="section">
            <h3 class="section-title">Skills</h3>
            <div class="section-content">
              ${skills.technical.length > 0 ? `
                <div class="skills-category">
                  <h4 class="skills-category-title">Technical Skills</h4>
                  <div class="skills-list">
                    ${skills.technical.sort((a, b) => a.order - b.order).map(skill => `
                      <span class="skill-item">
                        ${skill.name}
                        ${skill.level ? `<span class="skill-level">(${skill.level})</span>` : ''}
                      </span>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              ${skills.soft.length > 0 ? `
                <div class="skills-category">
                  <h4 class="skills-category-title">Soft Skills</h4>
                  <div class="skills-list">
                    ${skills.soft.sort((a, b) => a.order - b.order).map(skill => `
                      <span class="skill-item">${skill.name}</span>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              ${skills.languages.length > 0 ? `
                <div class="skills-category">
                  <h4 class="skills-category-title">Languages</h4>
                  <div class="skills-list">
                    ${skills.languages.sort((a, b) => a.order - b.order).map(lang => `
                      <span class="skill-item">
                        ${lang.name} <span class="skill-level">(${lang.proficiency})</span>
                      </span>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </section>
        ` : ''}

        <!-- Projects -->
        ${projects.length > 0 ? `
          <section class="section">
            <h3 class="section-title">Projects</h3>
            <div class="section-content">
              ${projects.sort((a, b) => a.order - b.order).map(project => `
                <div class="project-item">
                  <div class="project-header">
                    <h4 class="project-title">${project.title}</h4>
                    <div class="date-range">${project.startDate} - ${project.endDate}</div>
                  </div>
                  <p class="project-description">${project.description}</p>
                  ${project.technologies.length > 0 ? `
                    <div class="technologies">
                      <strong>Technologies:</strong> ${project.technologies.join(', ')}
                    </div>
                  ` : ''}
                  ${project.highlights.length > 0 ? `
                    <ul class="project-highlights">
                      ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                    </ul>
                  ` : ''}
                  ${project.url || project.github ? `
                    <div class="project-links">
                      ${project.url ? `<span class="project-link">🌐 ${project.url}</span>` : ''}
                      ${project.github ? `<span class="project-link">💻 ${project.github}</span>` : ''}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- Certifications -->
        ${certifications.length > 0 ? `
          <section class="section">
            <h3 class="section-title">Certifications</h3>
            <div class="section-content">
              ${certifications.sort((a, b) => a.order - b.order).map(cert => `
                <div class="certification-item">
                  <div class="certification-header">
                    <h4 class="certification-name">${cert.name}</h4>
                    <div class="certification-issuer">${cert.issuer}</div>
                    <div class="date-range">
                      ${cert.issueDate}${cert.expiryDate ? ` - ${cert.expiryDate}` : ''}
                    </div>
                  </div>
                  ${cert.credentialId ? `
                    <div class="credential-id">Credential ID: ${cert.credentialId}</div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}
      </div>
    </body>
    </html>
  `
  
  return htmlContent
}

// Generate CSS styles for PDF based on template
function getPDFStyles(template: ResumeTemplate): string {
  const { colors, fonts, spacing } = template.styles
  
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: ${fonts.body};
      font-size: ${fonts.size.body};
      line-height: 1.6;
      color: ${colors.text};
      background: ${colors.background};
    }
    
    .resume-container {
      max-width: 8.5in;
      margin: 0 auto;
      padding: ${spacing.margins};
      background: white;
    }
    
    .header {
      text-align: center;
      margin-bottom: ${spacing.sections};
      padding-bottom: ${spacing.items};
      border-bottom: 2px solid ${colors.primary};
    }
    
    .name {
      font-family: ${fonts.heading};
      font-size: ${fonts.size.heading};
      color: ${colors.primary};
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    
    .title {
      font-size: ${fonts.size.subheading};
      color: ${colors.secondary};
      margin-bottom: 1rem;
      font-weight: normal;
    }
    
    .contact-info {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: ${fonts.size.small};
    }
    
    .icon {
      font-size: 0.9rem;
    }
    
    .section {
      margin-bottom: ${spacing.sections};
      page-break-inside: avoid;
    }
    
    .section-title {
      font-family: ${fonts.heading};
      font-size: 1.2rem;
      color: ${colors.primary};
      margin-bottom: ${spacing.items};
      padding-bottom: 0.25rem;
      border-bottom: 1px solid ${colors.border};
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .section-content {
      margin-left: 0.5rem;
    }
    
    .summary {
      text-align: justify;
      margin-bottom: 1rem;
    }
    
    .experience-item,
    .education-item,
    .project-item,
    .certification-item {
      margin-bottom: ${spacing.items};
      page-break-inside: avoid;
    }
    
    .experience-header,
    .education-header,
    .project-header,
    .certification-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
      flex-wrap: wrap;
    }
    
    .position,
    .degree,
    .project-title,
    .certification-name {
      font-weight: bold;
      color: ${colors.secondary};
      font-size: 1.1rem;
    }
    
    .company,
    .institution,
    .certification-issuer {
      font-weight: 600;
      color: ${colors.text};
    }
    
    .location,
    .date-range {
      color: ${colors.secondary};
      font-size: ${fonts.size.small};
      font-style: italic;
    }
    
    .description-list,
    .project-highlights {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
    }
    
    .description-list li,
    .project-highlights li {
      margin-bottom: 0.25rem;
    }
    
    .technologies,
    .achievements,
    .gpa,
    .honors,
    .credential-id {
      margin: 0.5rem 0;
      font-size: ${fonts.size.small};
    }
    
    .technologies strong,
    .achievements strong {
      color: ${colors.secondary};
    }
    
    .skills-category {
      margin-bottom: 1rem;
    }
    
    .skills-category-title {
      font-weight: bold;
      color: ${colors.secondary};
      margin-bottom: 0.5rem;
    }
    
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .skill-item {
      background: ${colors.accent}20;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: ${fonts.size.small};
      border: 1px solid ${colors.border};
    }
    
    .skill-level {
      color: ${colors.secondary};
      font-size: 0.8rem;
    }
    
    .project-links {
      margin-top: 0.5rem;
      display: flex;
      gap: 1rem;
    }
    
    .project-link {
      font-size: ${fonts.size.small};
      color: ${colors.secondary};
    }
    
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      
      .resume-container {
        margin: 0;
        padding: 0.5in;
      }
      
      .section {
        page-break-inside: avoid;
      }
      
      .experience-item,
      .education-item,
      .project-item,
      .certification-item {
        page-break-inside: avoid;
      }
    }
  `
}
