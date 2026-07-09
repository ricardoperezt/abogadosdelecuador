import { SignJWT, jwtVerify } from 'jose'

const COOKIE_NAME = 'admin_session'
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 horas

function getSecretKey(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET
  if (!secret) {
    throw new Error('ADMIN_JWT_SECRET no está configurada. Revisa .env.local')
  }
  return new TextEncoder().encode(secret)
}

// Autenticación de admin usando variables de entorno
export function validateAdminUser(username: string, password: string): boolean {
  const adminUsers = process.env.ADMIN_USERS
  
  if (!adminUsers) {
    return false
  }
  
  const users = adminUsers.split(',').map(userEntry => {
    const [user, ...rest] = userEntry.split(':')
    return { username: user?.trim(), password: rest.join(':').trim() }
  })
  
  return users.some(user => user.username === username.trim() && user.password === password)
}

export async function createSessionToken(username: string): Promise<string> {
  return await new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getSecretKey())
}

export async function verifySessionToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    return { username: payload.username as string }
  } catch {
    return null
  }
}

export function getAdminUsers(): Array<{username: string, password: string}> {
  const adminUsers = process.env.ADMIN_USERS
  
  if (!adminUsers) {
    return []
  }
  
  return adminUsers.split(',').map(userEntry => {
    const [user, pass] = userEntry.split(':')
    return { username: user, password: pass }
  })
}

export { COOKIE_NAME, SESSION_DURATION }
