import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '../../../lib/admin-auth'
import { getResumeData, updateResumeData } from '../../../lib/resume-data'

// Security headers for API responses
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

// GET - Retrieve resume data
export async function GET(request: NextRequest) {
  try {
    // Get resume data (public endpoint for now, can be restricted later)
    const resumeData = getResumeData()

    return NextResponse.json(
      {
        success: true,
        data: resumeData
      },
      { status: 200, headers: securityHeaders }
    )

  } catch (error) {
    console.error('Resume data GET error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: securityHeaders }
    )
  }
}

// PUT - Update resume data (admin only)
export async function PUT(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401, headers: securityHeaders }
      )
    }

    // Verify admin session
    const verification = await verifyAdminSession(token)
    if (!verification.valid) {
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401, headers: securityHeaders }
      )
    }

    // Parse request body
    const body = await request.json()
    const { updates } = body

    if (!updates || typeof updates !== 'object') {
      return NextResponse.json(
        { error: 'Invalid update data' },
        { status: 400, headers: securityHeaders }
      )
    }

    // Update resume data
    const updatedData = updateResumeData(updates)

    return NextResponse.json(
      {
        success: true,
        data: updatedData,
        message: 'Resume data updated successfully'
      },
      { status: 200, headers: securityHeaders }
    )

  } catch (error) {
    console.error('Resume data PUT error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: securityHeaders }
    )
  }
}

// POST - Bulk update or specific operations (admin only)
export async function POST(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401, headers: securityHeaders }
      )
    }

    // Verify admin session
    const verification = await verifyAdminSession(token)
    if (!verification.valid) {
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401, headers: securityHeaders }
      )
    }

    // Parse request body
    const body = await request.json()
    const { operation, data } = body

    if (!operation || typeof operation !== 'string') {
      return NextResponse.json(
        { error: 'Operation type required' },
        { status: 400, headers: securityHeaders }
      )
    }

    let result
    
    switch (operation) {
      case 'update_personal_info':
        if (!data || !data.personalInfo) {
          return NextResponse.json(
            { error: 'Personal info data required' },
            { status: 400, headers: securityHeaders }
          )
        }
        result = updateResumeData({ personalInfo: data.personalInfo })
        break

      case 'add_experience':
        if (!data || !data.experience) {
          return NextResponse.json(
            { error: 'Experience data required' },
            { status: 400, headers: securityHeaders }
          )
        }
        const currentData = getResumeData()
        result = updateResumeData({
          experience: [...currentData.experience, {
            ...data.experience,
            id: `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            order: currentData.experience.length + 1
          }]
        })
        break

      case 'update_experience':
        if (!data || !data.id || !data.updates) {
          return NextResponse.json(
            { error: 'Experience ID and updates required' },
            { status: 400, headers: securityHeaders }
          )
        }
        const currentExp = getResumeData()
        result = updateResumeData({
          experience: currentExp.experience.map(exp =>
            exp.id === data.id ? { ...exp, ...data.updates } : exp
          )
        })
        break

      case 'delete_experience':
        if (!data || !data.id) {
          return NextResponse.json(
            { error: 'Experience ID required' },
            { status: 400, headers: securityHeaders }
          )
        }
        const currentExpData = getResumeData()
        result = updateResumeData({
          experience: currentExpData.experience.filter(exp => exp.id !== data.id)
        })
        break

      default:
        return NextResponse.json(
          { error: 'Unknown operation' },
          { status: 400, headers: securityHeaders }
        )
    }

    return NextResponse.json(
      {
        success: true,
        data: result,
        message: `Operation '${operation}' completed successfully`
      },
      { status: 200, headers: securityHeaders }
    )

  } catch (error) {
    console.error('Resume data POST error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: securityHeaders }
    )
  }
}

// Handle other HTTP methods
export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { ...securityHeaders, 'Allow': 'GET, PUT, POST' } }
  )
}
