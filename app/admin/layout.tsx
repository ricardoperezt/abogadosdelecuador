'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      // Si estamos en /admin (página de login), no verificar auth
      if (pathname === '/admin') {
        setLoading(false)
        return
      }

      // Verificar sesión en localStorage
      const savedSession = localStorage.getItem('adminSession')
      if (!savedSession) {
        router.push('/admin')
      } else {
        // Opcional: verificar si la sesión no está expirada (24 horas)
        const session = JSON.parse(savedSession)
        const now = Date.now()
        const sessionAge = now - session.timestamp
        
        if (sessionAge > 24 * 60 * 60 * 1000) { // 24 horas
          localStorage.removeItem('adminSession')
          router.push('/admin')
        } else {
          setLoading(false)
        }
      }
    }

    checkAuth()
  }, [router, pathname])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
        <div className="text-foreground">Cargando...</div>
      </div>
    )
  }

  return <>{children}</>
}
