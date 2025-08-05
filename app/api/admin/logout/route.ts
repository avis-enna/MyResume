import { NextRequest, NextResponse } from 'next/server'
import { logoutAdminSession } from '../../../lib/admin-auth'

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
    // Get token from cookie
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'No active session found' },
        { status: 401, headers: securityHeaders }
      )
    }

    // Logout session
    const success = await logoutAdminSession(token)

    // Create response
    const response = NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200, headers: securityHeaders }
    )

    // Clear the cookie
    response.cookies.set('admin-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/admin'
    })

    return response

  } catch (error) {
    console.error('Admin logout error:', error)
    
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
