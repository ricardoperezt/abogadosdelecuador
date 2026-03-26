'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AdminPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    // Verificar si hay sesión guardada en localStorage
    const savedSession = localStorage.getItem('adminSession')
    if (savedSession) {
      setIsLoggedIn(true)
      router.push('/admin/dashboard')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log("🔍 Login attempt:", { username, password: "***" })

    try {
      // Validar usuario via API route (server-side)
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      
      const data = await response.json()
      console.log("🔍 API response:", data)
      
      if (data.success) {
        // Guardar sesión en localStorage
        localStorage.setItem('adminSession', JSON.stringify({ username, timestamp: Date.now() }))
        console.log("✅ Session saved, redirecting to dashboard")
        setIsLoggedIn(true)
        router.push('/admin/dashboard')
      } else {
        console.log("❌ Invalid credentials")
        setError(data.error || 'Credenciales incorrectas')
      }
    } catch (error) {
      console.error("❌ Login error:", error)
      setError('Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
        <div className="text-foreground">Redirigiendo al dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f1419] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#1a1f2e] border-[#c9a227]/20 py-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-foreground">
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert className="bg-red-900/20 border-red-500/50">
                <AlertDescription className="text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Usuario
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="bg-[#0f1419] border-[#c9a227]/30 text-foreground"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Contraseña
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#0f1419] border-[#c9a227]/30 text-foreground"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#c9a227] text-[#0f1419] hover:bg-[#e8d5a3]"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>
          
          <div className="mt-6 pt-4 border-t border-[#c9a227]/20">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/')}
              className="w-full border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419]"
            >
              Volver a Página de Inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
