'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { supabaseServer } from '@/lib/supabase-server'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    abogados: 0,
    especialidades: 0,
    posgrados: 0,
    subespecialidades: 0
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [abogadosCount, especialidadesCount, posgradosCount, subespecialidadesCount] = await Promise.all([
        supabaseServer.from('abogados').select('*', { count: 'exact', head: true }),
        supabaseServer.from('especialidades').select('*', { count: 'exact', head: true }),
        supabaseServer.from('posgrados').select('*', { count: 'exact', head: true }),
        supabaseServer.from('subespecialidades').select('*', { count: 'exact', head: true })
      ])

      setStats({
        abogados: abogadosCount.count || 0,
        especialidades: especialidadesCount.count || 0,
        posgrados: posgradosCount.count || 0,
        subespecialidades: subespecialidadesCount.count || 0
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminSession')
    router.push('/admin')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
        <div className="text-foreground">Cargando dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f1419] p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <Button 
          onClick={handleLogout}
          variant="outline"
          className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419] w-full sm:w-auto"
        >
          Cerrar Sesión
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card className="bg-[#1a1f2e] border-[#c9a227]/20 py-4 sm:py-6">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-[#c9a227] text-sm sm:text-base">Abogados</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl sm:text-3xl font-bold text-foreground">{stats.abogados}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1f2e] border-[#c9a227]/20 py-4 sm:py-6">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-[#c9a227] text-sm sm:text-base">Especialidades</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl sm:text-3xl font-bold text-foreground">{stats.especialidades}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1f2e] border-[#c9a227]/20 py-4 sm:py-6">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-[#c9a227] text-sm sm:text-base">Posgrados</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl sm:text-3xl font-bold text-foreground">{stats.posgrados}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1f2e] border-[#c9a227]/20 py-4 sm:py-6">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-[#c9a227] text-sm sm:text-base">Subespecialidades</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl sm:text-3xl font-bold text-foreground">{stats.subespecialidades}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Button 
          onClick={() => router.push('/admin/dashboard/abogados')}
          className="bg-[#c9a227] text-[#0f1419] hover:bg-[#e8d5a3] text-sm sm:text-base h-12 sm:h-auto"
        >
          Gestionar Abogados
        </Button>
        <Button 
          onClick={() => router.push('/admin/dashboard/especialidades')}
          className="bg-[#c9a227] text-[#0f1419] hover:bg-[#e8d5a3] text-sm sm:text-base h-12 sm:h-auto"
        >
          Gestionar Especialidades
        </Button>
        <Button 
          onClick={() => router.push('/admin/dashboard/posgrados')}
          className="bg-[#c9a227] text-[#0f1419] hover:bg-[#e8d5a3] text-sm sm:text-base h-12 sm:h-auto"
        >
          Gestionar Posgrados
        </Button>
        <Button 
          onClick={() => router.push('/admin/dashboard/subespecialidades')}
          className="bg-[#c9a227] text-[#0f1419] hover:bg-[#e8d5a3] text-sm sm:text-base h-12 sm:h-auto"
        >
          Gestionar Subespecialidades
        </Button>
      </div>
    </div>
  )
}
