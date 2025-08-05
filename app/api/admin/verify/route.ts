import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '../../../lib/admin-auth'

// Security headers for API responses
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.json(
        { valid: false, error: 'No token provided' },
        { status: 401, headers: securityHeaders }
      )
    }

    // Verify session
    const verification = await verifyAdminSession(token)

    if (!verification.valid || !verification.user) {
      return NextResponse.json(
        { valid: false, error: 'Invalid or expired session' },
        { status: 401, headers: securityHeaders }
      )
    }

    // Return user information
    return NextResponse.json(
      {
        valid: true,
        user: {
          id: verification.user.id,
          email: verification.user.email,
          role: verification.user.role,
          lastLogin: verification.user.lastLogin
        },
        session: {
          id: verification.session?.id,
          expiresAt: verification.session?.expiresAt
        }
      },
      { status: 200, headers: securityHeaders }
    )

  } catch (error) {
    console.error('Admin verify error:', error)
    
    return NextResponse.json(
      { valid: false, error: 'Internal server error' },
      { status: 500, headers: securityHeaders }
    )
  }
}

// Handle other HTTP methods
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { ...securityHeaders, 'Allow': 'GET' } }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { ...securityHeaders, 'Allow': 'GET' } }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { ...securityHeaders, 'Allow': 'GET' } }
  )
}
