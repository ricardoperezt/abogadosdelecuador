import { NextRequest, NextResponse } from 'next/server'
import { validateAdminUser, createSessionToken, COOKIE_NAME, SESSION_DURATION } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    
    const isValid = validateAdminUser(username, password)
    
    if (isValid) {
      const token = await createSessionToken(username)
      
      const response = NextResponse.json({ success: true })
      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: SESSION_DURATION / 1000,
      })
      
      return response
    } else {
      return NextResponse.json({ success: false, error: 'Credenciales incorrectas' }, { status: 401 })
    }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ success: false, error: 'Error del servidor' }, { status: 500 })
  }
}
