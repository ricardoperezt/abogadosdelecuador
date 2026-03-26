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
    <div className="min-h-screen bg-[#0f1419] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <Button 
          onClick={handleLogout}
          variant="outline"
          className="border-[#c9a227]/50 text-[#c9a227] hover:bg-[#c9a227] hover:text-[#0f1419]"
        >
          Cerrar Sesión
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-[#1a1f2e] border-[#c9a227]/20">
          <CardHeader>
            <CardTitle className="text-[#c9a227]">Abogados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.abogados}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1f2e] border-[#c9a227]/20">
          <CardHeader>
            <CardTitle className="text-[#c9a227]">Especialidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.especialidades}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1f2e] border-[#c9a227]/20">
          <CardHeader>
            <CardTitle className="text-[#c9a227]">Posgrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.posgrados}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1f2e] border-[#c9a227]/20">
          <CardHeader>
            <CardTitle className="text-[#c9a227]">Subespecialidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.subespecialidades}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          onClick={() => router.push('/admin/dashboard/abogados')}
          className="bg-[#c9a227] text-[#0f1419] hover:bg-[#e8d5a3]"
        >
          Gestionar Abogados
        </Button>
        <Button 
          onClick={() => router.push('/admin/dashboard/especialidades')}
          className="bg-[#c9a227] text-[#0f1419] hover:bg-[#e8d5a3]"
        >
          Gestionar Especialidades
        </Button>
        <Button 
          onClick={() => router.push('/admin/dashboard/posgrados')}
          className="bg-[#c9a227] text-[#0f1419] hover:bg-[#e8d5a3]"
        >
          Gestionar Posgrados
        </Button>
        <Button 
          onClick={() => router.push('/admin/dashboard/subespecialidades')}
          className="bg-[#c9a227] text-[#0f1419] hover:bg-[#e8d5a3]"
        >
          Gestionar Subespecialidades
        </Button>
      </div>
    </div>
  )
}
