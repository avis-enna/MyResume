'use client'

import { useEffect, useState } from 'react'
import { getAnalytics } from '../lib/analytics'
import { Activity, Zap, Clock, Eye, Users, TrendingUp, BarChart3, Globe, Smartphone } from 'lucide-react'

interface PerformanceMetrics {
  loadTime: number
  domContentLoaded: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
  memoryUsage?: number
  connectionType?: string
}

interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  averageSessionTime: number
  bounceRate: number
  topPages: Array<{ path: string; views: number }>
  recentEvents: Array<{ name: string; timestamp: number; properties?: any; sessionId?: string; userId?: string | null }>
  deviceTypes: { desktop: number; mobile: number; tablet: number }
  topCountries: Array<{ country: string; visitors: number }>
}

export default function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<'performance' | 'analytics' | 'realtime'>('performance')
  const [realtimeData, setRealtimeData] = useState({
    currentUsers: 0,
    eventsPerMinute: 0,
    errorRate: 0,
    averageLoadTime: 0
  })

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
      return
    }

    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      const newMetrics: PerformanceMetrics = {
        loadTime: navigation.loadEventEnd - navigation.fetchStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0,
        firstInputDelay: 0,
      }

      // Get paint metrics
      const paintEntries = performance.getEntriesByType('paint')
      paintEntries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          newMetrics.firstContentfulPaint = entry.startTime
        }
      })

      // Get memory usage if available
      if ('memory' in performance) {
        const memory = (performance as any).memory
        newMetrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024 // MB
      }

      // Get connection info if available
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        newMetrics.connectionType = connection.effectiveType
      }

      setMetrics(newMetrics)
    }

    // Load analytics data
    const loadAnalyticsData = () => {
      const analytics = getAnalytics()
      if (analytics) {
        const events = analytics.getEvents()
        const pageViews = events.filter(e => e.name === 'page_view')
        const uniqueVisitors = new Set(events.map(e => e.sessionId)).size
        
        // Simulate device type data
        const deviceTypes = {
          desktop: Math.floor(Math.random() * 60) + 40,
          mobile: Math.floor(Math.random() * 40) + 30,
          tablet: Math.floor(Math.random() * 20) + 10
        }

        // Simulate country data
        const topCountries = [
          { country: 'United States', visitors: Math.floor(Math.random() * 100) + 50 },
          { country: 'India', visitors: Math.floor(Math.random() * 80) + 40 },
          { country: 'United Kingdom', visitors: Math.floor(Math.random() * 60) + 30 },
          { country: 'Germany', visitors: Math.floor(Math.random() * 50) + 25 },
          { country: 'Canada', visitors: Math.floor(Math.random() * 40) + 20 }
        ]
        
        setAnalyticsData({
          pageViews: pageViews.length,
          uniqueVisitors,
          averageSessionTime: Math.floor(Math.random() * 300) + 120, // 2-7 minutes
          bounceRate: Math.floor(Math.random() * 30) + 20, // 20-50%
          topPages: [
            { path: '/', views: Math.floor(Math.random() * 100) + 50 },
            { path: '/new-design', views: Math.floor(Math.random() * 50) + 25 },
            { path: '/#projects', views: Math.floor(Math.random() * 40) + 20 },
            { path: '/#contact', views: Math.floor(Math.random() * 30) + 15 }
          ],
          recentEvents: events.slice(-10).reverse().map(event => ({
            ...event,
            timestamp: event.timestamp || Date.now()
          })),
          deviceTypes,
          topCountries
        })
      }
    }

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance()
      loadAnalyticsData()
    } else {
      window.addEventListener('load', () => {
        measurePerformance()
        loadAnalyticsData()
      })
    }

    // Update realtime data periodically
    const realtimeInterval = setInterval(() => {
      setRealtimeData(prev => ({
        currentUsers: Math.floor(Math.random() * 10) + 1,
        eventsPerMinute: Math.floor(Math.random() * 50) + 10,
        errorRate: Math.random() * 2,
        averageLoadTime: 800 + Math.random() * 400
      }))
    }, 5000)

    return () => {
      clearInterval(realtimeInterval)
    }
  }, [])

  // Don't render in production
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const formatTime = (time: number) => {
    return `${Math.round(time)}ms`
  }

  const formatBytes = (bytes: number) => {
    return `${bytes.toFixed(1)}MB`
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const getScoreColor = (time: number, thresholds: { good: number; needs_improvement: number }) => {
    if (time <= thresholds.good) return 'text-green-400'
    if (time <= thresholds.needs_improvement) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getPerformanceScore = () => {
    if (!metrics) return 0
    let score = 100
    
    // Deduct points based on metrics
    if (metrics.loadTime > 2500) score -= 20
    else if (metrics.loadTime > 1000) score -= 10
    
    if (metrics.firstContentfulPaint > 3000) score -= 15
    else if (metrics.firstContentfulPaint > 1800) score -= 8
    
    if (metrics.domContentLoaded > 1800) score -= 15
    else if (metrics.domContentLoaded > 800) score -= 8
    
    return Math.max(0, score)
  }

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Analytics Toggle Button */}
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="bg-purple-500/20 border border-purple-500/30 text-purple-400 px-3 py-2 rounded-lg text-sm font-mono hover:bg-purple-500/30 transition-colors flex items-center space-x-2"
      >
        <BarChart3 className="w-4 h-4" />
        <span>Analytics</span>
        {metrics && (
          <span className={`text-xs ${getScoreColor(getPerformanceScore(), { good: 90, needs_improvement: 70 })}`}>
            {getPerformanceScore()}
          </span>
        )}
      </button>

      {/* Enhanced Analytics Panel */}
      {isVisible && (
        <div className="absolute bottom-12 right-0 w-96 bg-black/95 border border-gray-700 rounded-lg shadow-2xl backdrop-blur-sm max-h-96 overflow-hidden">
          {/* Header with tabs */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics Dashboard
              </h3>
              <button
                type="button"
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1">
              {[
                { id: 'performance', label: 'Performance', icon: Zap },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                { id: 'realtime', label: 'Real-time', icon: Eye }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id as any)}
                  className={`px-3 py-1 rounded text-xs flex items-center space-x-1 transition-colors ${
                    activeTab === id
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 overflow-y-auto max-h-80">
            {activeTab === 'performance' && metrics && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Performance Score</span>
                  <span className={`text-lg font-bold ${getScoreColor(getPerformanceScore(), { good: 90, needs_improvement: 70 })}`}>
                    {getPerformanceScore()}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300 text-sm">Page Load</span>
                    <span className={`text-sm font-mono ${getScoreColor(metrics.loadTime, { good: 1000, needs_improvement: 2500 })}`}>
                      {formatTime(metrics.loadTime)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-300 text-sm">DOM Content Loaded</span>
                    <span className={`text-sm font-mono ${getScoreColor(metrics.domContentLoaded, { good: 800, needs_improvement: 1800 })}`}>
                      {formatTime(metrics.domContentLoaded)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-300 text-sm">First Contentful Paint</span>
                    <span className={`text-sm font-mono ${getScoreColor(metrics.firstContentfulPaint, { good: 1800, needs_improvement: 3000 })}`}>
                      {formatTime(metrics.firstContentfulPaint)}
                    </span>
                  </div>

                  {metrics.memoryUsage && (
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Memory Usage</span>
                      <span className="text-sm font-mono text-blue-400">
                        {formatBytes(metrics.memoryUsage)}
                      </span>
                    </div>
                  )}

                  {metrics.connectionType && (
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Connection</span>
                      <span className="text-sm font-mono text-green-400 capitalize">
                        {metrics.connectionType}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="pt-2 border-t border-gray-700">
                  <div className="text-xs text-gray-400">
                    🟢 Good • 🟡 Needs Improvement • 🔴 Poor
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && analyticsData && (
              <div className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Eye className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-gray-300">Page Views</span>
                    </div>
                    <div className="text-lg font-bold text-blue-400">{analyticsData.pageViews}</div>
                  </div>
                  
                  <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-gray-300">Visitors</span>
                    </div>
                    <div className="text-lg font-bold text-green-400">{analyticsData.uniqueVisitors}</div>
                  </div>
                  
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-gray-300">Avg. Session</span>
                    </div>
                    <div className="text-lg font-bold text-yellow-400">{formatDuration(analyticsData.averageSessionTime)}</div>
                  </div>
                  
                  <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-red-400" />
                      <span className="text-xs text-gray-300">Bounce Rate</span>
                    </div>
                    <div className="text-lg font-bold text-red-400">{analyticsData.bounceRate}%</div>
                  </div>
                </div>

                {/* Device Types */}
                <div>
                  <h4 className="text-white text-sm font-medium mb-2 flex items-center">
                    <Smartphone className="w-4 h-4 mr-1" />
                    Device Types
                  </h4>
                  <div className="space-y-1">
                    {Object.entries(analyticsData.deviceTypes).map(([device, count]) => (
                      <div key={device} className="flex justify-between text-sm">
                        <span className="text-gray-300 capitalize">{device}</span>
                        <span className="text-gray-400">{count}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Pages */}
                <div>
                  <h4 className="text-white text-sm font-medium mb-2">Top Pages</h4>
                  <div className="space-y-1">
                    {analyticsData.topPages.slice(0, 4).map((page, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-300 truncate">{page.path}</span>
                        <span className="text-gray-400">{page.views}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'realtime' && (
              <div className="space-y-4">
                {/* Real-time Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-300">Active Users</span>
                    </div>
                    <div className="text-lg font-bold text-green-400">{realtimeData.currentUsers}</div>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Activity className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-gray-300">Events/min</span>
                    </div>
                    <div className="text-lg font-bold text-blue-400">{realtimeData.eventsPerMinute}</div>
                  </div>
                  
                  <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs text-gray-300">Error Rate</span>
                    </div>
                    <div className="text-lg font-bold text-red-400">{realtimeData.errorRate.toFixed(2)}%</div>
                  </div>
                  
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-gray-300">Avg Load</span>
                    </div>
                    <div className="text-lg font-bold text-purple-400">{Math.round(realtimeData.averageLoadTime)}ms</div>
                  </div>
                </div>

                {/* Recent Events */}
                {analyticsData && (
                  <div>
                    <h4 className="text-white text-sm font-medium mb-2">Recent Events</h4>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {analyticsData.recentEvents.slice(0, 5).map((event, index) => (
                        <div key={index} className="flex justify-between text-xs">
                          <span className="text-gray-300 truncate">{event.name}</span>
                          <span className="text-gray-500">
                            {new Date(event.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
