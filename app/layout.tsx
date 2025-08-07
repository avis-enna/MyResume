import './globals.css'
import type { Metadata, Viewport } from 'next'
import PerformanceMonitor from './components/PerformanceMonitor'
import { AnalyticsProvider } from './components/AnalyticsProvider'
import AnalyticsDashboard from './components/AnalyticsDashboard'

export const metadata: Metadata = {
  metadataBase: new URL('https://my-resume-o2do89dyl-sivavennas-projects.vercel.app'),
  title: 'Venna Venkata Siva Reddy - Backend Developer & Cybersecurity Specialist | Bengaluru',
  description: 'Experienced Backend Developer and Cybersecurity Specialist from Bengaluru, India. Expert in Node.js, Python, PostgreSQL, React, and network security. Available for full-time opportunities and freelance projects.',
  keywords: [
    'backend developer',
    'cybersecurity specialist',
    'software engineer',
    'Node.js developer',
    'Python developer',
    'PostgreSQL expert',
    'React developer',
    'full stack developer',
    'network security',
    'Bengaluru developer',
    'India software engineer',
    'web development',
    'API development',
    'database design',
    'secure coding',
    'portfolio'
  ],
  authors: [{ name: 'Venna Venkata Siva Reddy', url: 'https://my-resume-o2do89dyl-sivavennas-projects.vercel.app' }],
  creator: 'Venna Venkata Siva Reddy',
  publisher: 'Venna Venkata Siva Reddy',
  category: 'Technology',
  openGraph: {
    title: 'Venna Venkata Siva Reddy - Backend Developer & Cybersecurity Specialist',
    description: 'Experienced Backend Developer and Cybersecurity Specialist from Bengaluru, India. Expert in Node.js, Python, PostgreSQL, and network security.',
    url: 'https://my-resume-o2do89dyl-sivavennas-projects.vercel.app',
    siteName: 'Venna Venkata Siva Reddy - Professional Portfolio',
    images: [
      {
        url: '/profile-photo.png',
        width: 1200,
        height: 630,
        alt: 'Venna Venkata Siva Reddy - Backend Developer and Cybersecurity Specialist',
      },
    ],
    locale: 'en_US',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Venna Venkata Siva Reddy - Backend Developer & Cybersecurity Specialist',
    description: 'Experienced Backend Developer and Cybersecurity Specialist from Bengaluru, India. Expert in Node.js, Python, PostgreSQL, and network security.',
    images: ['/profile-photo.png'],
    creator: '@sivavenna',
    site: '@sivavenna',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00f5ff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Venna Venkata Siva Reddy",
    "jobTitle": "Backend Developer & Cybersecurity Specialist",
    "description": "Experienced Backend Developer and Cybersecurity Specialist specializing in Node.js, Python, PostgreSQL, and network security solutions.",
    "url": "https://my-resume-o2do89dyl-sivavennas-projects.vercel.app",
    "image": "https://my-resume-o2do89dyl-sivavennas-projects.vercel.app/profile-photo.png",
    "email": "vsivareddy.venna@gmail.com",
    "telephone": "+91-93989-61541",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "addressCountry": "India"
    },
    "sameAs": [
      "https://linkedin.com/in/sivavenna",
      "https://github.com/avis-enna"
    ],
    "knowsAbout": [
      "Backend Development",
      "Cybersecurity",
      "Node.js",
      "Python",
      "PostgreSQL",
      "React",
      "Network Security",
      "API Development",
      "Database Design",
      "Web Development"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance Developer"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="overflow-x-hidden">
        <AnalyticsProvider config={{
          enableGoogleAnalytics: true,
          enableCustomAnalytics: true,
          enablePerformanceMonitoring: true,
          enableUserBehaviorTracking: true,
          enableErrorTracking: true
        }}>
          {children}
          <PerformanceMonitor />
          <AnalyticsDashboard />
        </AnalyticsProvider>

        {/* Static HTML injection script for buttons - works regardless of React */}
        <script dangerouslySetInnerHTML={{ __html: `
          console.log('🚀 Static button injection script loaded');

          function createResumeButton() {
            console.log('Creating resume button');

            // Find navigation area
            const nav = document.querySelector('nav') || document.querySelector('[role="navigation"]');
            if (!nav) {
              console.log('Navigation not found, will retry');
              return false;
            }

            // Check if resume button already exists
            if (document.querySelector('[data-static-resume-btn]')) {
              console.log('Resume button already exists');
              return true;
            }

            // Find the navigation links container
            const navLinks = nav.querySelector('.hidden.md\\\\:flex') || nav.querySelector('.flex');
            if (!navLinks) {
              console.log('Navigation links container not found');
              return false;
            }

            // Create resume button
            const resumeBtn = document.createElement('button');
            resumeBtn.setAttribute('data-static-resume-btn', 'true');
            resumeBtn.type = 'button';
            resumeBtn.className = 'text-xs font-light tracking-[0.15em] uppercase transition-colors duration-300 text-blue-600 hover:text-blue-700 border-b border-transparent hover:border-blue-700 cursor-pointer';
            resumeBtn.textContent = 'resume';
            resumeBtn.style.cssText = 'background: none; border: none; padding: 0; margin: 0 0 0 2.5rem; font-family: inherit;';

            resumeBtn.onclick = function(e) {
              e.preventDefault();
              console.log('Static resume button clicked');
              const currentOrigin = window.location.origin;
              const adminUrl = currentOrigin + '/admin/login';

              try {
                const newWindow = window.open(adminUrl, '_blank');
                if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                  window.location.href = adminUrl;
                }
              } catch (error) {
                console.error('Resume button error:', error);
                window.open(currentOrigin + '/api/resume/download?format=html', '_blank');
              }
            };

            navLinks.appendChild(resumeBtn);
            console.log('✅ Resume button created and added');
            return true;
          }

          function createSVRButton() {
            console.log('Creating SVR button');

            // Find footer
            const footer = document.querySelector('footer') || document.querySelector('[role="contentinfo"]');
            if (!footer) {
              console.log('Footer not found, will retry');
              return false;
            }

            // Check if SVR button already exists
            if (document.querySelector('[data-static-svr-btn]')) {
              console.log('SVR button already exists');
              return true;
            }

            // Find or create the footer content container
            let footerContainer = footer.querySelector('.container') || footer.querySelector('.mx-auto');
            if (!footerContainer) {
              footerContainer = document.createElement('div');
              footerContainer.className = 'container mx-auto px-6 py-12';
              footer.appendChild(footerContainer);
            }

            // Create SVR button container
            const svrContainer = document.createElement('div');
            svrContainer.className = 'flex justify-between items-center';
            svrContainer.innerHTML = \`
              <div class="flex flex-col items-start">
                <button
                  data-static-svr-btn="true"
                  type="button"
                  class="text-2xl font-light transition-all duration-300 cursor-pointer select-none px-3 py-2 rounded-lg border-2 border-transparent hover:scale-105 hover:border-current hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:scale-95 transform-gpu text-black hover:text-blue-600 hover:bg-blue-600/10 active:bg-blue-600/20 hover:shadow-blue-600/20"
                  title="🎯 Click here for Resume Management Portal"
                  style="background: none; font-family: inherit;"
                >
                  <span style="display: flex; align-items: center; gap: 0.25rem;">
                    SVR.
                    <span style="font-size: 0.75rem; opacity: 0.6;">📄</span>
                  </span>
                </button>
                <span class="text-xs mt-1 transition-colors duration-300 text-gray-400">resume portal</span>
              </div>
              <div class="text-right">
                <p class="text-sm transition-colors duration-300 text-gray-500">design & coding by me</p>
              </div>
            \`;

            // Add click handler to SVR button
            const svrBtn = svrContainer.querySelector('[data-static-svr-btn]');
            svrBtn.onclick = function(e) {
              e.preventDefault();
              console.log('Static SVR button clicked');
              const currentOrigin = window.location.origin;
              const adminUrl = currentOrigin + '/admin/login';

              try {
                const newWindow = window.open(adminUrl, '_blank');
                if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                  window.location.href = adminUrl;
                }
              } catch (error) {
                console.error('SVR button error:', error);
                window.open(currentOrigin + '/api/resume/download?format=html', '_blank');
              }
            };

            // Clear existing footer content and add our container
            footerContainer.innerHTML = '';
            footerContainer.appendChild(svrContainer);

            console.log('✅ SVR button created and added');
            return true;
          }

          function injectButtons() {
            console.log('🔄 Attempting to inject buttons');
            let resumeSuccess = false;
            let svrSuccess = false;

            try {
              resumeSuccess = createResumeButton();
            } catch (error) {
              console.error('Error creating resume button:', error);
            }

            try {
              svrSuccess = createSVRButton();
            } catch (error) {
              console.error('Error creating SVR button:', error);
            }

            if (resumeSuccess && svrSuccess) {
              console.log('🎉 Both buttons successfully injected!');
              return true;
            } else {
              console.log('⏳ Some buttons not ready, will retry. Resume:', resumeSuccess, 'SVR:', svrSuccess);
              return false;
            }
          }

          // Multiple injection attempts
          let attempts = 0;
          const maxAttempts = 20;

          function tryInject() {
            attempts++;
            console.log('Injection attempt', attempts);

            if (injectButtons() || attempts >= maxAttempts) {
              if (attempts >= maxAttempts) {
                console.log('⚠️ Max injection attempts reached');
              }
              return;
            }

            // Retry with increasing delays
            const delay = Math.min(attempts * 200, 2000);
            setTimeout(tryInject, delay);
          }

          // Start injection immediately
          tryInject();

          // Also try on DOM events
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', tryInject);
          }

          window.addEventListener('load', tryInject);

          // Final attempts after longer delays
          setTimeout(tryInject, 3000);
          setTimeout(tryInject, 5000);
          setTimeout(tryInject, 10000);
        ` }} />
      </body>
    </html>
  )
}
