'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Eye, EyeOff, Shield, AlertCircle, CheckCircle } from 'lucide-react'

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  // Check if already logged in
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/admin/verify', {
        credentials: 'include',
        cache: 'no-cache'
      })

      console.log('Login page auth check - Response status:', response.status)

      if (response.ok) {
        const data = await response.json()
        console.log('Login page auth check - Data:', { valid: data.valid })
        if (data.valid) {
          console.log('Already authenticated, redirecting to dashboard')
          router.push('/admin/dashboard')
        }
      }
    } catch (error) {
      console.log('Login page auth check failed:', error)
      // Not logged in, stay on login page
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear errors when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSuccess('Login successful! Redirecting...')
        setTimeout(() => {
          router.push('/admin/dashboard')
        }, 1000)
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoCredentials = () => {
    setFormData({
      email: 'admin@sivareddy.dev',
      password: 'SecureAdmin2024!'
    })
  }

  // Enhanced fallback script for Vercel deployment
  const fallbackScript = `
    console.log('Fallback script loaded - checking environment');

    function fillDemoCredentialsFallback() {
      console.log('Filling demo credentials via fallback');
      const emailInput = document.querySelector('input[name="email"]');
      const passwordInput = document.querySelector('input[name="password"]');
      if (emailInput) emailInput.value = 'admin@sivareddy.dev';
      if (passwordInput) passwordInput.value = 'SecureAdmin2024!';
      console.log('Demo credentials filled');
    }

    function handleLoginFallback(event) {
      console.log('Login fallback triggered');
      event.preventDefault();

      const emailInput = document.querySelector('input[name="email"]');
      const passwordInput = document.querySelector('input[name="password"]');
      const email = emailInput?.value;
      const password = passwordInput?.value;

      if (!email || !password) {
        alert('Please enter email and password');
        return;
      }

      console.log('Attempting login with fallback method');

      // Show loading state
      const submitBtn = document.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Signing in...';
      }

      fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })
      .then(response => {
        console.log('Login response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('Login response data:', data);
        if (data.success) {
          console.log('Login successful, redirecting to dashboard');
          // Force a hard redirect to avoid any React router issues
          window.location.replace('/admin/dashboard');
        } else {
          console.error('Login failed:', data.error);
          alert('Login failed: ' + (data.error || 'Unknown error'));
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign In';
          }
        }
      })
      .catch(error => {
        console.error('Login network error:', error);
        alert('Network error: ' + error.message);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Sign In';
        }
      });
    }

    // Enhanced initialization for Vercel deployment
    function initializeFallback() {
      console.log('Initializing fallback handlers');
      const form = document.querySelector('form');
      if (form) {
        console.log('Form found, attaching fallback handler');
        form.addEventListener('submit', handleLoginFallback);
      } else {
        console.log('Form not found');
      }

      const demoBtn = document.querySelector('[data-demo-btn]');
      if (demoBtn) {
        console.log('Demo button found, attaching fallback handler');
        demoBtn.addEventListener('click', fillDemoCredentialsFallback);
      } else {
        console.log('Demo button not found');
      }
    }

    // Multiple initialization strategies for different environments
    if (typeof React === 'undefined') {
      console.log('React not loaded, using fallback JavaScript');

      // Try immediate initialization
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeFallback);
      } else {
        initializeFallback();
      }

      // Also try after a short delay for Vercel
      setTimeout(initializeFallback, 100);
      setTimeout(initializeFallback, 500);
    } else {
      console.log('React is loaded, fallback not needed');
    }
  `

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-slate-400">Resume Management System</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="admin@sivareddy.dev"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="block w-full pl-10 pr-12 py-3 border border-slate-600 rounded-lg bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-center space-x-2 text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{success}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-slate-600">
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-3">Demo Credentials</p>
              <button
                type="button"
                onClick={fillDemoCredentials}
                data-demo-btn="true"
                className="text-blue-400 hover:text-blue-300 text-sm underline"
              >
                Fill Demo Credentials
              </button>
            </div>
            <div className="mt-3 text-xs text-slate-500 space-y-1">
              <div>Email: admin@sivareddy.dev</div>
              <div>Password: SecureAdmin2024!</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-400 text-sm">
            Secure admin access for resume management
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-slate-500">
            <span>🔒 Encrypted</span>
            <span>🛡️ Secure</span>
            <span>⚡ Fast</span>
          </div>
        </div>
      </div>

      {/* Fallback script for when React doesn't load */}
      <script dangerouslySetInnerHTML={{ __html: fallbackScript }} />
    </div>
  )
}
