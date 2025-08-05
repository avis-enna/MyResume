import { NextRequest, NextResponse } from 'next/server'

// Security headers for API responses
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

// In-memory storage for demo (use database in production)
const analyticsStore = new Map<string, any>()
const eventStore: any[] = []

export async function POST(request: NextRequest) {
  try {
    // Get client information
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referer = request.headers.get('referer') || ''

    // Parse request body
    const body = await request.json()
    
    // Validate event data
    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json(
        { error: 'Invalid event name' },
        { status: 400, headers: securityHeaders }
      )
    }

    // Create analytics event
    const analyticsEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: body.name,
      properties: body.properties || {},
      timestamp: body.timestamp || Date.now(),
      sessionId: body.sessionId,
      userId: body.userId,
      clientInfo: {
        ip: clientIP,
        userAgent,
        referer,
        timestamp: Date.now()
      }
    }

    // Store event
    eventStore.push(analyticsEvent)
    
    // Keep only last 1000 events in memory
    if (eventStore.length > 1000) {
      eventStore.splice(0, eventStore.length - 1000)
    }

    // Process specific event types
    switch (body.name) {
      case 'page_view':
        await processPageView(analyticsEvent)
        break
      case 'performance_metric':
        await processPerformanceMetric(analyticsEvent)
        break
      case 'user_engagement':
        await processUserEngagement(analyticsEvent)
        break
      case 'form_submit':
        await processFormSubmit(analyticsEvent)
        break
      case 'javascript_error':
        await processError(analyticsEvent)
        break
    }

    // Log analytics event (in production, send to analytics service)
    console.log('📊 Analytics Event:', {
      name: analyticsEvent.name,
      sessionId: analyticsEvent.sessionId,
      timestamp: new Date(analyticsEvent.timestamp).toISOString(),
      properties: analyticsEvent.properties
    })

    return NextResponse.json(
      { 
        success: true,
        eventId: analyticsEvent.id,
        timestamp: analyticsEvent.timestamp
      },
      { status: 200, headers: securityHeaders }
    )

  } catch (error) {
    console.error('Analytics API error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: securityHeaders }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '100')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    let filteredEvents = [...eventStore]

    // Filter by date range
    if (startDate) {
      const start = new Date(startDate).getTime()
      filteredEvents = filteredEvents.filter(event => event.timestamp >= start)
    }
    
    if (endDate) {
      const end = new Date(endDate).getTime()
      filteredEvents = filteredEvents.filter(event => event.timestamp <= end)
    }

    // Filter by event type
    if (type) {
      filteredEvents = filteredEvents.filter(event => event.name === type)
    }

    // Limit results
    filteredEvents = filteredEvents.slice(-limit)

    // Generate analytics summary
    const summary = generateAnalyticsSummary(filteredEvents)

    return NextResponse.json(
      {
        events: filteredEvents,
        summary,
        total: filteredEvents.length,
        timestamp: Date.now()
      },
      { status: 200, headers: securityHeaders }
    )

  } catch (error) {
    console.error('Analytics GET error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: securityHeaders }
    )
  }
}

// Process page view events
async function processPageView(event: any) {
  const path = event.properties?.path || '/'
  const sessionId = event.sessionId
  
  // Update page view statistics
  const pageKey = `page_${path}`
  const currentViews = analyticsStore.get(pageKey) || 0
  analyticsStore.set(pageKey, currentViews + 1)
  
  // Update session information
  const sessionKey = `session_${sessionId}`
  const sessionData = analyticsStore.get(sessionKey) || {
    startTime: event.timestamp,
    pageViews: 0,
    lastActivity: event.timestamp
  }
  
  sessionData.pageViews++
  sessionData.lastActivity = event.timestamp
  analyticsStore.set(sessionKey, sessionData)
}

// Process performance metrics
async function processPerformanceMetric(event: any) {
  const metric = event.properties?.metric
  const value = event.properties?.value
  
  if (metric && typeof value === 'number') {
    const metricKey = `perf_${metric}`
    const currentMetrics = analyticsStore.get(metricKey) || []
    
    currentMetrics.push({
      value,
      timestamp: event.timestamp,
      sessionId: event.sessionId
    })
    
    // Keep only last 100 measurements
    if (currentMetrics.length > 100) {
      currentMetrics.splice(0, currentMetrics.length - 100)
    }
    
    analyticsStore.set(metricKey, currentMetrics)
  }
}

// Process user engagement events
async function processUserEngagement(event: any) {
  const sessionId = event.sessionId
  const totalTime = event.properties?.total_time
  
  if (sessionId && totalTime) {
    const engagementKey = `engagement_${sessionId}`
    analyticsStore.set(engagementKey, {
      totalTime,
      lastUpdate: event.timestamp,
      isActive: event.properties?.is_active || false
    })
  }
}

// Process form submissions
async function processFormSubmit(event: any) {
  const formName = event.properties?.form || 'unknown'
  const formKey = `form_${formName}`
  
  const currentSubmissions = analyticsStore.get(formKey) || 0
  analyticsStore.set(formKey, currentSubmissions + 1)
}

// Process error events
async function processError(event: any) {
  const errorKey = 'errors'
  const currentErrors = analyticsStore.get(errorKey) || []
  
  currentErrors.push({
    message: event.properties?.message,
    stack: event.properties?.stack,
    timestamp: event.timestamp,
    sessionId: event.sessionId,
    url: event.properties?.filename
  })
  
  // Keep only last 50 errors
  if (currentErrors.length > 50) {
    currentErrors.splice(0, currentErrors.length - 50)
  }
  
  analyticsStore.set(errorKey, currentErrors)
}

// Generate analytics summary
function generateAnalyticsSummary(events: any[]) {
  const now = Date.now()
  const last24Hours = now - (24 * 60 * 60 * 1000)
  const last7Days = now - (7 * 24 * 60 * 60 * 1000)
  
  const recentEvents = events.filter(e => e.timestamp >= last24Hours)
  const weeklyEvents = events.filter(e => e.timestamp >= last7Days)
  
  // Page views
  const pageViews = events.filter(e => e.name === 'page_view')
  const uniqueSessions = new Set(pageViews.map(e => e.sessionId)).size
  
  // Performance metrics
  const performanceEvents = events.filter(e => e.name === 'performance_metric')
  const avgLoadTime = performanceEvents
    .filter(e => e.properties?.metric === 'page_load_time')
    .reduce((sum, e, _, arr) => sum + (e.properties?.value || 0) / arr.length, 0)
  
  // Error rate
  const errorEvents = events.filter(e => e.name === 'javascript_error' || e.name === 'promise_rejection')
  const errorRate = pageViews.length > 0 ? (errorEvents.length / pageViews.length) * 100 : 0
  
  // Top pages
  const pageViewCounts = pageViews.reduce((acc: any, event) => {
    const path = event.properties?.path || '/'
    acc[path] = (acc[path] || 0) + 1
    return acc
  }, {})
  
  const topPages = Object.entries(pageViewCounts)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 10)
    .map(([path, views]) => ({ path, views }))
  
  // Device types (simulated based on user agent)
  const deviceTypes = events.reduce((acc: any, event) => {
    const userAgent = event.clientInfo?.userAgent || ''
    if (userAgent.includes('Mobile')) {
      acc.mobile = (acc.mobile || 0) + 1
    } else if (userAgent.includes('Tablet')) {
      acc.tablet = (acc.tablet || 0) + 1
    } else {
      acc.desktop = (acc.desktop || 0) + 1
    }
    return acc
  }, {})
  
  return {
    totalEvents: events.length,
    recentEvents: recentEvents.length,
    weeklyEvents: weeklyEvents.length,
    pageViews: pageViews.length,
    uniqueSessions,
    avgLoadTime: Math.round(avgLoadTime),
    errorRate: Math.round(errorRate * 100) / 100,
    topPages,
    deviceTypes,
    lastUpdated: now
  }
}

// Handle other HTTP methods
export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { ...securityHeaders, 'Allow': 'GET, POST' } }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { ...securityHeaders, 'Allow': 'GET, POST' } }
  )
}
