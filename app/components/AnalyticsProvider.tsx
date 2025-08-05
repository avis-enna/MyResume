'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { initializeAnalytics, getAnalytics, trackEvent, trackPageView } from '../lib/analytics'

interface AnalyticsContextType {
  trackEvent: (name: string, properties?: Record<string, any>) => void
  trackPageView: (path: string, title?: string) => void
  setUserId: (userId: string) => void
  isInitialized: boolean
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

interface AnalyticsProviderProps {
  children: ReactNode
  config?: {
    trackingId?: string
    enableGoogleAnalytics?: boolean
    enableCustomAnalytics?: boolean
    enablePerformanceMonitoring?: boolean
    enableUserBehaviorTracking?: boolean
    enableErrorTracking?: boolean
  }
}

export function AnalyticsProvider({ children, config }: AnalyticsProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Initialize analytics on client side
    if (typeof window !== 'undefined') {
      initializeAnalytics(config)
      setIsInitialized(true)
      
      // Track initial page view
      trackPageView(pathname || '/', document.title)
    }
  }, [config, pathname])

  // Track route changes
  useEffect(() => {
    if (isInitialized) {
      trackPageView(pathname || '/', document.title)
    }
  }, [pathname, isInitialized])

  const contextValue: AnalyticsContextType = {
    trackEvent: (name: string, properties?: Record<string, any>) => {
      if (isInitialized) {
        trackEvent(name, properties)
      }
    },
    trackPageView: (path: string, title?: string) => {
      if (isInitialized) {
        trackPageView(path, title)
      }
    },
    setUserId: (userId: string) => {
      if (isInitialized) {
        getAnalytics()?.setUserId(userId)
      }
    },
    isInitialized
  }

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

// Hook for tracking component interactions
export function useTrackInteraction(componentName: string) {
  const { trackEvent } = useAnalytics()

  return {
    trackClick: (elementName: string, properties?: Record<string, any>) => {
      trackEvent('component_interaction', {
        component: componentName,
        element: elementName,
        action: 'click',
        ...properties
      })
    },
    trackHover: (elementName: string, properties?: Record<string, any>) => {
      trackEvent('component_interaction', {
        component: componentName,
        element: elementName,
        action: 'hover',
        ...properties
      })
    },
    trackView: (properties?: Record<string, any>) => {
      trackEvent('component_view', {
        component: componentName,
        ...properties
      })
    },
    trackFormSubmit: (formName: string, properties?: Record<string, any>) => {
      trackEvent('form_submit', {
        component: componentName,
        form: formName,
        ...properties
      })
    }
  }
}

// Hook for tracking performance metrics
export function usePerformanceTracking() {
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    // Track component mount time
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      trackEvent('component_performance', {
        mount_time: endTime - startTime
      })
    }
  }, [trackEvent])

  const trackCustomMetric = (metricName: string, value: number, properties?: Record<string, any>) => {
    trackEvent('custom_performance_metric', {
      metric: metricName,
      value,
      ...properties
    })
  }

  return { trackCustomMetric }
}

// Hook for tracking user engagement
export function useEngagementTracking() {
  const { trackEvent } = useAnalytics()
  const [startTime] = useState(Date.now())

  useEffect(() => {
    let isActive = true
    let lastActivity = Date.now()

    const trackActivity = () => {
      lastActivity = Date.now()
    }

    const checkEngagement = () => {
      if (!isActive) return

      const now = Date.now()
      const timeSinceLastActivity = now - lastActivity
      const totalTime = now - startTime

      // Track engagement every 30 seconds if user is active
      if (timeSinceLastActivity < 5000) { // 5 seconds of inactivity threshold
        trackEvent('user_engagement', {
          total_time: totalTime,
          is_active: true
        })
      }
    }

    // Track user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    events.forEach(event => {
      document.addEventListener(event, trackActivity, { passive: true })
    })

    // Check engagement every 30 seconds
    const engagementInterval = setInterval(checkEngagement, 30000)

    return () => {
      isActive = false
      events.forEach(event => {
        document.removeEventListener(event, trackActivity)
      })
      clearInterval(engagementInterval)
      
      // Track final engagement on unmount
      trackEvent('session_engagement', {
        total_time: Date.now() - startTime,
        final_activity: lastActivity
      })
    }
  }, [trackEvent, startTime])
}

// Hook for A/B testing
export function useABTesting() {
  const { trackEvent } = useAnalytics()
  const [variant, setVariant] = useState<string | null>(null)

  useEffect(() => {
    // Simple A/B test implementation
    const savedVariant = localStorage.getItem('ab_test_variant')
    if (savedVariant) {
      setVariant(savedVariant)
    } else {
      const newVariant = Math.random() < 0.5 ? 'A' : 'B'
      setVariant(newVariant)
      localStorage.setItem('ab_test_variant', newVariant)
      
      trackEvent('ab_test_assignment', {
        variant: newVariant,
        test_name: 'default_test'
      })
    }
  }, [trackEvent])

  const trackConversion = (conversionName: string, properties?: Record<string, any>) => {
    trackEvent('ab_test_conversion', {
      variant,
      conversion: conversionName,
      ...properties
    })
  }

  return { variant, trackConversion }
}

// Hook for error boundary analytics
export function useErrorTracking() {
  const { trackEvent } = useAnalytics()

  const trackError = (error: Error, errorInfo?: any) => {
    trackEvent('react_error', {
      message: error.message,
      stack: error.stack,
      component_stack: errorInfo?.componentStack,
      error_boundary: true
    })
  }

  return { trackError }
}

// Analytics Error Boundary
interface AnalyticsErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface AnalyticsErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class AnalyticsErrorBoundary extends React.Component<
  AnalyticsErrorBoundaryProps,
  AnalyticsErrorBoundaryState
> {
  constructor(props: AnalyticsErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): AnalyticsErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Track error with analytics
    getAnalytics()?.trackEvent('react_error_boundary', {
      message: error.message,
      stack: error.stack,
      component_stack: errorInfo.componentStack
    })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 border border-red-500 rounded-lg bg-red-500/10">
          <h2 className="text-red-400 font-medium mb-2">Something went wrong</h2>
          <p className="text-gray-300 text-sm">
            An error occurred while rendering this component. The error has been logged.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

// React import for class component
import React from 'react'
