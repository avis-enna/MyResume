"use client";

import { useDarkMode } from "./DarkModeContext";

export default function Footer() {
  const { isDarkMode } = useDarkMode();

  // Enhanced fallback script that works in all environments
  const svrFallbackScript = `
    console.log('SVR fallback script loaded - Universal version');

    function handleSVRClickFallback(event) {
      console.log('SVR fallback click triggered');
      event.preventDefault();
      event.stopPropagation();

      const currentOrigin = window.location.origin;
      const adminUrl = currentOrigin + '/admin/login';

      // Always try to open admin portal first
      try {
        console.log('Attempting to open admin portal:', adminUrl);
        const newWindow = window.open(adminUrl, '_blank');

        // If popup blocked, try same tab
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          console.log('Popup blocked, using same tab navigation');
          window.location.href = adminUrl;
        } else {
          console.log('Admin portal opened in new tab');
        }
      } catch (error) {
        console.error('SVR fallback error:', error);
        // Ultimate fallback - try resume download
        try {
          window.open(currentOrigin + '/api/resume/download?format=html', '_blank');
        } catch (downloadError) {
          console.error('Download fallback failed:', downloadError);
          alert('Unable to open admin portal. Please try refreshing the page.');
        }
      }
    }

    // Universal initialization that works with or without React
    function initSVRFallback() {
      console.log('Initializing SVR fallback handlers');
      const svrButtons = document.querySelectorAll('[data-svr-button], button[data-svr-button]');

      svrButtons.forEach((button, index) => {
        console.log('Found SVR button', index + 1, '- attaching fallback handler');

        // Remove any existing listeners to avoid duplicates
        button.removeEventListener('click', handleSVRClickFallback);

        // Add fallback listener
        button.addEventListener('click', handleSVRClickFallback, true);

        // Also add as onclick for maximum compatibility
        button.onclick = handleSVRClickFallback;
      });

      console.log('SVR fallback initialization complete -', svrButtons.length, 'buttons found');
    }

    // Always initialize fallback (works with or without React)
    console.log('Document ready state:', document.readyState);

    // Immediate initialization
    initSVRFallback();

    // DOM ready initialization
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initSVRFallback);
    }

    // Delayed initializations for dynamic content
    setTimeout(initSVRFallback, 100);
    setTimeout(initSVRFallback, 500);
    setTimeout(initSVRFallback, 1000);
    setTimeout(initSVRFallback, 2000);

    // Watch for React hydration completion
    if (typeof window !== 'undefined') {
      window.addEventListener('load', initSVRFallback);
    }
  `;

  const handleSVRClick = async () => {
    try {
      // Get current origin to ensure proper URL construction
      const currentOrigin = window.location.origin;
      const adminUrl = `${currentOrigin}/admin/login`;

      console.log('SVR clicked - attempting to open:', adminUrl);
      console.log('SVR button updated and working - Version 2.0');

      // First, check if admin route is accessible
      try {
        const response = await fetch(`${currentOrigin}/api/admin/verify`, {
          method: 'GET',
          credentials: 'include'
        });
        console.log('Admin API check response:', response.status);

        // If admin API is accessible, try to open admin portal
        const newWindow = window.open(adminUrl, '_blank', 'noopener,noreferrer');

        // Check if popup was blocked or failed
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          console.log('Popup blocked or failed, trying same tab navigation');
          window.location.href = adminUrl;
        } else {
          console.log('Admin portal opened successfully in new tab');
        }
      } catch (apiError) {
        console.log('Admin API not accessible, providing alternative options');

        // Show user-friendly options when admin is not available
        const userChoice = confirm(
          'Resume Management Portal is not available in this environment.\n\n' +
          'Would you like to:\n' +
          '• OK: Download resume directly\n' +
          '• Cancel: View contact information'
        );

        if (userChoice) {
          // Download resume directly
          window.open(`${currentOrigin}/api/resume/download?format=html`, '_blank');
        } else {
          // Scroll to contact section
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            // Fallback: show contact info
            alert('Contact: vsivareddy.venna@gmail.com\nPhone: +91 93989 61541');
          }
        }
      }
    } catch (error) {
      console.error('Error in SVR click handler:', error);

      // Ultimate fallback: direct resume download
      const fallbackChoice = confirm(
        'Unable to access admin portal.\n\n' +
        'Would you like to download the resume instead?'
      );

      if (fallbackChoice) {
        try {
          window.open(`${window.location.origin}/api/resume/download?format=html`, '_blank');
        } catch (downloadError) {
          alert('Please contact vsivareddy.venna@gmail.com for resume access.');
        }
      }
    }
  };

  return (
    <footer className={`py-12 border-t transition-colors duration-300 ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-100'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start">
            <button
              type="button"
              onClick={handleSVRClick}
              data-svr-button="true"
              className={`
                text-2xl font-light transition-all duration-300
                cursor-pointer select-none
                px-3 py-2 rounded-lg
                border-2 border-transparent
                hover:scale-105 hover:border-current hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                active:scale-95
                transform-gpu
                ${isDarkMode
                  ? 'text-white hover:text-blue-400 hover:bg-blue-400/10 active:bg-blue-400/20 hover:shadow-blue-400/20'
                  : 'text-black hover:text-blue-600 hover:bg-blue-600/10 active:bg-blue-600/20 hover:shadow-blue-600/20'
                }
              `}
              title="🎯 Click here for Resume Management Portal - Updated"
            >
              <span className="flex items-center gap-1">
                SVR.
                <span className="text-xs opacity-60">📄</span>
              </span>
            </button>
            <span className={`text-xs mt-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              resume portal
            </span>
          </div>
          <div className="text-right">
            <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>design & coding by me</p>
          </div>
        </div>
      </div>

      {/* SVR Fallback script for when React doesn't load */}
      <script dangerouslySetInnerHTML={{ __html: svrFallbackScript }} />
    </footer>
  );
}
