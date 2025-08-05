/**
 * Comprehensive Analytics and Performance Monitoring System
 */

// Analytics event types
export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: number
  sessionId?: string
  userId?: string | null
}

// Performance metrics interface
export interface PerformanceMetrics {
  pageLoadTime: number
  domContentLoaded: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  firstInputDelay: number
  cumulativeLayoutShift: number
  timeToInteractive: number
  resourceLoadTimes: Record<string, number>
}

// User behavior tracking
export interface UserBehavior {
  scrollDepth: number
  timeOnPage: number
  clickEvents: Array<{
    element: string
    timestamp: number
    coordinates: { x: number; y: number }
  }>
  formInteractions: Array<{
    formId: string
    action: 'focus' | 'blur' | 'submit'
    timestamp: number
  }>
  pageViews: Array<{
    path: string
    timestamp: number
    referrer: string
  }>
}

// Analytics configuration
interface AnalyticsConfig {
  trackingId?: string
  enableGoogleAnalytics: boolean
  enableCustomAnalytics: boolean
  enablePerformanceMonitoring: boolean
  enableUserBehaviorTracking: boolean
  enableErrorTracking: boolean
  sampleRate: number
}

class AnalyticsManager {
  private config: AnalyticsConfig
  private sessionId: string
  private userId: string | null = null
  private events: AnalyticsEvent[] = []
  private performanceMetrics: Partial<PerformanceMetrics> = {}
  private userBehavior: Partial<UserBehavior> = {
    clickEvents: [],
    formInteractions: [],
    pageViews: []
  }
  private startTime: number = Date.now()

  constructor(config: AnalyticsConfig) {
    this.config = config
    this.sessionId = this.generateSessionId()
    this.initializeAnalytics()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private initializeAnalytics() {
    if (typeof window === 'undefined') return

    // Initialize Google Analytics if enabled
    if (this.config.enableGoogleAnalytics && this.config.trackingId) {
      this.initializeGoogleAnalytics()
    }

    // Initialize performance monitoring
    if (this.config.enablePerformanceMonitoring) {
      this.initializePerformanceMonitoring()
    }

    // Initialize user behavior tracking
    if (this.config.enableUserBehaviorTracking) {
      this.initializeUserBehaviorTracking()
    }

    // Initialize error tracking
    if (this.config.enableErrorTracking) {
      this.initializeErrorTracking()
    }
  }

  private initializeGoogleAnalytics() {
    // Load Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.trackingId}`
    document.head.appendChild(script)

    // Initialize gtag
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).gtag = function() {
      ;(window as any).dataLayer.push(arguments)
    }
    ;(window as any).gtag('js', new Date())
    ;(window as any).gtag('config', this.config.trackingId, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: { custom_parameter: 'portfolio_analytics' }
    })
  }

  private initializePerformanceMonitoring() {
    // Web Vitals monitoring
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        this.performanceMetrics.largestContentfulPaint = lastEntry.startTime
        this.trackEvent('performance_metric', {
          metric: 'largest_contentful_paint',
          value: lastEntry.startTime
        })
      }).observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          this.performanceMetrics.firstInputDelay = entry.processingStart - entry.startTime
          this.trackEvent('performance_metric', {
            metric: 'first_input_delay',
            value: entry.processingStart - entry.startTime
          })
        })
      }).observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift
      new PerformanceObserver((list) => {
        let clsValue = 0
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        this.performanceMetrics.cumulativeLayoutShift = clsValue
        this.trackEvent('performance_metric', {
          metric: 'cumulative_layout_shift',
          value: clsValue
        })
      }).observe({ entryTypes: ['layout-shift'] })
    }

    // Navigation timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        this.performanceMetrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart
        this.performanceMetrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart
        
        this.trackEvent('page_performance', {
          page_load_time: this.performanceMetrics.pageLoadTime,
          dom_content_loaded: this.performanceMetrics.domContentLoaded,
          dns_lookup: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcp_connection: navigation.connectEnd - navigation.connectStart,
          server_response: navigation.responseEnd - navigation.requestStart
        })
      }, 0)
    })
  }

  private initializeUserBehaviorTracking() {
    // Scroll depth tracking
    let maxScrollDepth = 0
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent
        this.userBehavior.scrollDepth = maxScrollDepth
        
        // Track milestone scroll depths
        if ([25, 50, 75, 90, 100].includes(scrollPercent)) {
          this.trackEvent('scroll_depth', { depth: scrollPercent })
        }
      }
    }

    window.addEventListener('scroll', trackScrollDepth, { passive: true })

    // Click tracking
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      const elementInfo = {
        tagName: target.tagName,
        className: target.className,
        id: target.id,
        textContent: target.textContent?.substring(0, 50) || ''
      }

      this.userBehavior.clickEvents?.push({
        element: `${elementInfo.tagName}${elementInfo.id ? '#' + elementInfo.id : ''}${elementInfo.className ? '.' + elementInfo.className.split(' ')[0] : ''}`,
        timestamp: Date.now(),
        coordinates: { x: event.clientX, y: event.clientY }
      })

      this.trackEvent('click', {
        element: elementInfo,
        coordinates: { x: event.clientX, y: event.clientY }
      })
    })

    // Form interaction tracking
    document.addEventListener('focusin', (event) => {
      const target = event.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        const form = target.closest('form')
        if (form) {
          this.userBehavior.formInteractions?.push({
            formId: form.id || 'unnamed_form',
            action: 'focus',
            timestamp: Date.now()
          })
          this.trackEvent('form_interaction', { action: 'focus', field: target.getAttribute('name') })
        }
      }
    })

    // Time on page tracking
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Date.now() - this.startTime
      this.userBehavior.timeOnPage = timeOnPage
      this.trackEvent('session_end', { 
        time_on_page: timeOnPage,
        scroll_depth: this.userBehavior.scrollDepth
      })
    })
  }

  private initializeErrorTracking() {
    // JavaScript error tracking
    window.addEventListener('error', (event) => {
      this.trackEvent('javascript_error', {
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack
      })
    })

    // Promise rejection tracking
    window.addEventListener('unhandledrejection', (event) => {
      this.trackEvent('promise_rejection', {
        reason: event.reason?.toString(),
        stack: event.reason?.stack
      })
    })
  }

  // Public methods
  public trackEvent(name: string, properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId
    }

    this.events.push(event)

    // Send to Google Analytics if enabled
    if (this.config.enableGoogleAnalytics && (window as any).gtag) {
      ;(window as any).gtag('event', name, properties)
    }

    // Send to custom analytics endpoint
    if (this.config.enableCustomAnalytics) {
      this.sendToCustomAnalytics(event)
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event)
    }
  }

  public trackPageView(path: string, title?: string) {
    this.userBehavior.pageViews?.push({
      path,
      timestamp: Date.now(),
      referrer: document.referrer
    })

    this.trackEvent('page_view', {
      path,
      title: title || document.title,
      referrer: document.referrer,
      user_agent: navigator.userAgent
    })
  }

  public setUserId(userId: string) {
    this.userId = userId
    this.trackEvent('user_identified', { user_id: userId })
  }

  public getPerformanceMetrics(): Partial<PerformanceMetrics> {
    return { ...this.performanceMetrics }
  }

  public getUserBehavior(): Partial<UserBehavior> {
    return { ...this.userBehavior }
  }

  public getEvents(): AnalyticsEvent[] {
    return [...this.events]
  }

  private async sendToCustomAnalytics(event: AnalyticsEvent) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      })
    } catch (error) {
      console.warn('Failed to send analytics event:', error)
    }
  }
}

// Default configuration
const defaultConfig: AnalyticsConfig = {
  trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
  enableGoogleAnalytics: !!process.env.NEXT_PUBLIC_GA_TRACKING_ID,
  enableCustomAnalytics: true,
  enablePerformanceMonitoring: true,
  enableUserBehaviorTracking: true,
  enableErrorTracking: true,
  sampleRate: 1.0
}

// Global analytics instance
let analyticsInstance: AnalyticsManager | null = null

export function initializeAnalytics(config?: Partial<AnalyticsConfig>): AnalyticsManager {
  if (typeof window === 'undefined') {
    return {} as AnalyticsManager
  }

  if (!analyticsInstance) {
    analyticsInstance = new AnalyticsManager({ ...defaultConfig, ...config })
  }
  
  return analyticsInstance
}

export function getAnalytics(): AnalyticsManager | null {
  return analyticsInstance
}

// Convenience functions
export function trackEvent(name: string, properties?: Record<string, any>) {
  analyticsInstance?.trackEvent(name, properties)
}

export function trackPageView(path: string, title?: string) {
  analyticsInstance?.trackPageView(path, title)
}

export function setUserId(userId: string) {
  analyticsInstance?.setUserId(userId)
}
