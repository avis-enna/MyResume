import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin, createAdminSession, checkRateLimit } from '../../../lib/admin-auth'

// Security headers for API responses
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

export async function POST(request: NextRequest) {
  try {
    // Get client information
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Check rate limiting
    const rateLimit = checkRateLimit(clientIP)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many login attempts. Please try again later.',
          retryAfter: rateLimit.retryAfter 
        },
        { 
          status: 429, 
          headers: {
            ...securityHeaders,
            'Retry-After': rateLimit.retryAfter?.toString() || '900'
          }
        }
      )
    }

    // Parse request body
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400, headers: securityHeaders }
      )
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input format' },
        { status: 400, headers: securityHeaders }
      )
    }

    // Authenticate user
    const authResult = await authenticateAdmin(email, password)
    
    if (!authResult.success || !authResult.user) {
      return NextResponse.json(
        { error: authResult.error || 'Authentication failed' },
        { status: 401, headers: securityHeaders }
      )
    }

    // Create session
    const { token, session } = await createAdminSession(
      authResult.user.id,
      clientIP,
      userAgent
    )

    // Set secure cookie
    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: authResult.user.id,
          email: authResult.user.email,
          role: authResult.user.role,
          lastLogin: authResult.user.lastLogin
        },
        sessionId: session.id
      },
      { status: 200, headers: securityHeaders }
    )

    // Set HTTP-only cookie for token
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    }

    console.log('Setting cookie with options:', cookieOptions)
    response.cookies.set('admin-token', token, cookieOptions as any)

    return response

  } catch (error) {
    console.error('Admin login error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: securityHeaders }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { ...securityHeaders, 'Allow': 'POST' } }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { ...securityHeaders, 'Allow': 'POST' } }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { ...securityHeaders, 'Allow': 'POST' } }
  )
}
