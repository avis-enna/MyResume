import { AdminUser, AdminSession } from './resume-types'
import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'

// In-memory storage for demo (use database in production)
const adminUsers: AdminUser[] = [
  {
    id: 'admin-1',
    email: 'admin@sivareddy.dev',
    passwordHash: '', // Will be set on first run
    role: 'admin',
    loginAttempts: 0,
    twoFactorEnabled: false
  }
]

const adminSessions: AdminSession[] = []

// JWT secret (use environment variable in production)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
)

// Default admin password
const DEFAULT_ADMIN_PASSWORD = 'SecureAdmin2024!'

// Initialize admin user with hashed password
export async function initializeAdminUser() {
  if (!adminUsers[0].passwordHash) {
    const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 12)
    adminUsers[0].passwordHash = hashedPassword
  }
}

// Authenticate admin user
export async function authenticateAdmin(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  await initializeAdminUser()
  
  const user = adminUsers.find(u => u.email === email)
  
  if (!user) {
    return { success: false, error: 'Invalid credentials' }
  }
  
  // Check if account is locked
  if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
    return { success: false, error: 'Account temporarily locked due to too many failed attempts' }
  }
  
  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.passwordHash)
  
  if (!isValidPassword) {
    // Increment login attempts
    user.loginAttempts += 1
    
    // Lock account after 5 failed attempts for 15 minutes
    if (user.loginAttempts >= 5) {
      user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString()
    }
    
    return { success: false, error: 'Invalid credentials' }
  }
  
  // Reset login attempts on successful login
  user.loginAttempts = 0
  user.lockedUntil = undefined
  user.lastLogin = new Date().toISOString()
  
  return { success: true, user }
}

// Create admin session
export async function createAdminSession(
  userId: string, 
  ipAddress: string, 
  userAgent: string
): Promise<{ token: string; session: AdminSession }> {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
  
  // Create JWT token
  const token = await new SignJWT({ 
    sessionId, 
    userId, 
    role: 'admin' 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET)
  
  const session: AdminSession = {
    id: sessionId,
    userId,
    token,
    expiresAt,
    ipAddress,
    userAgent,
    isActive: true
  }
  
  adminSessions.push(session)
  
  // Clean up expired sessions
  cleanupExpiredSessions()
  
  return { token, session }
}

// Verify admin session
export async function verifyAdminSession(token: string): Promise<{ valid: boolean; user?: AdminUser; session?: AdminSession }> {
  try {
    // Verify JWT token
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const sessionId = payload.sessionId as string
    const userId = payload.userId as string
    
    // Find session
    const session = adminSessions.find(s => s.id === sessionId && s.isActive)
    if (!session || new Date(session.expiresAt) < new Date()) {
      return { valid: false }
    }
    
    // Find user
    const user = adminUsers.find(u => u.id === userId)
    if (!user) {
      return { valid: false }
    }
    
    return { valid: true, user, session }
  } catch (error) {
    return { valid: false }
  }
}

// Logout admin session
export async function logoutAdminSession(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const sessionId = payload.sessionId as string
    
    const session = adminSessions.find(s => s.id === sessionId)
    if (session) {
      session.isActive = false
      return true
    }
    
    return false
  } catch (error) {
    return false
  }
}

// Clean up expired sessions
function cleanupExpiredSessions() {
  const now = new Date()
  for (let i = adminSessions.length - 1; i >= 0; i--) {
    if (new Date(adminSessions[i].expiresAt) < now) {
      adminSessions.splice(i, 1)
    }
  }
}

// Get admin user by ID
export function getAdminUser(userId: string): AdminUser | undefined {
  return adminUsers.find(u => u.id === userId)
}

// Update admin user
export async function updateAdminUser(userId: string, updates: Partial<AdminUser>): Promise<boolean> {
  const userIndex = adminUsers.findIndex(u => u.id === userId)
  if (userIndex === -1) return false
  
  // Hash password if provided
  if (updates.passwordHash) {
    updates.passwordHash = await bcrypt.hash(updates.passwordHash, 12)
  }
  
  adminUsers[userIndex] = { ...adminUsers[userIndex], ...updates }
  return true
}

// Get all active sessions for a user
export function getActiveSessionsForUser(userId: string): AdminSession[] {
  const now = new Date()
  return adminSessions.filter(s => 
    s.userId === userId && 
    s.isActive && 
    new Date(s.expiresAt) > now
  )
}

// Revoke all sessions for a user
export function revokeAllSessionsForUser(userId: string): number {
  let revokedCount = 0
  adminSessions.forEach(session => {
    if (session.userId === userId && session.isActive) {
      session.isActive = false
      revokedCount++
    }
  })
  return revokedCount
}

// Change admin password
export async function changeAdminPassword(
  userId: string, 
  currentPassword: string, 
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const user = adminUsers.find(u => u.id === userId)
  if (!user) {
    return { success: false, error: 'User not found' }
  }
  
  // Verify current password
  const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash)
  if (!isValidPassword) {
    return { success: false, error: 'Current password is incorrect' }
  }
  
  // Hash new password
  const hashedNewPassword = await bcrypt.hash(newPassword, 12)
  user.passwordHash = hashedNewPassword
  
  // Revoke all existing sessions to force re-login
  revokeAllSessionsForUser(userId)
  
  return { success: true }
}

// Validate password strength
export function validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return { valid: errors.length === 0, errors }
}

// Rate limiting for login attempts
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()

export function checkRateLimit(ipAddress: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const attempts = loginAttempts.get(ipAddress)
  
  if (!attempts) {
    loginAttempts.set(ipAddress, { count: 1, lastAttempt: now })
    return { allowed: true }
  }
  
  // Reset counter if last attempt was more than 15 minutes ago
  if (now - attempts.lastAttempt > 15 * 60 * 1000) {
    loginAttempts.set(ipAddress, { count: 1, lastAttempt: now })
    return { allowed: true }
  }
  
  // Allow up to 5 attempts per 15 minutes
  if (attempts.count >= 5) {
    const retryAfter = Math.ceil((15 * 60 * 1000 - (now - attempts.lastAttempt)) / 1000)
    return { allowed: false, retryAfter }
  }
  
  attempts.count++
  attempts.lastAttempt = now
  return { allowed: true }
}

// Clean up old rate limit entries
setInterval(() => {
  const now = Date.now()
  for (const [ip, data] of loginAttempts.entries()) {
    if (now - data.lastAttempt > 15 * 60 * 1000) {
      loginAttempts.delete(ip)
    }
  }
}, 5 * 60 * 1000) // Clean up every 5 minutes
