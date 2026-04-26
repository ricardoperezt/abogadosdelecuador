import { NextRequest, NextResponse } from 'next/server'

import { EstudioJuridico } from '@/lib/types'
import { createClient } from '@supabase/supabase-js'

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

  if (!supabaseUrl) {
    throw new Error('Falta NEXT_PUBLIC_SUPABASE_URL')
  }

  if (!supabaseAnonKey) {
    throw new Error('Falta NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY')
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

export async function GET() {
  try {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from('estudios_juridicos')
      .select('*')
      .order('orden', { ascending: true })
      .order('nombre', { ascending: true })

    if (error) {
      console.error('Error obteniendo estudios jurídicos para admin:', error)
      return NextResponse.json({ success: false, error: 'Error obteniendo estudios jurídicos' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: (data || []) as EstudioJuridico[]
    })
  } catch (error) {
    console.error('Error en GET /api/admin/estudios:', error)
    return NextResponse.json({ success: false, error: getErrorMessage(error, 'Error interno del servidor') }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseClient()
    const body = await request.json()

    const requiredFields = ['nombre', 'descripcion', 'ubicacion', 'telefono', 'email', 'web', 'imagen', 'logo']
    const missingField = requiredFields.find((field) => !body?.[field])

    if (missingField) {
      return NextResponse.json(
        { success: false, error: `Falta el campo requerido: ${missingField}` },
        { status: 400 }
      )
    }

    const estudioData = {
      nombre: String(body.nombre).trim(),
      descripcion: String(body.descripcion).trim(),
      ubicacion: String(body.ubicacion).trim(),
      telefono: String(body.telefono).trim(),
      email: String(body.email).trim(),
      web: String(body.web).trim(),
      abogados: Number(body.abogados) || 0,
      especialidades: Array.isArray(body.especialidades) ? body.especialidades : [],
      imagen: String(body.imagen).trim(),
      logo: String(body.logo).trim(),
      orden: Number(body.orden) || 0,
      activo: Boolean(body.activo),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabaseAdmin
      .from('estudios_juridicos')
      .insert(estudioData)
      .select('*')
      .single()

    if (error) {
      console.error('Error creando estudio jurídico:', error)
      return NextResponse.json({ success: false, error: getErrorMessage(error, 'Error creando el estudio jurídico') }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: data as EstudioJuridico })
  } catch (error) {
    console.error('Error en POST /api/admin/estudios:', error)
    return NextResponse.json({ success: false, error: getErrorMessage(error, 'Error interno del servidor') }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseClient()
    const body = await request.json()

    if (!body?.id) {
      return NextResponse.json({ success: false, error: 'Falta el id del estudio jurídico' }, { status: 400 })
    }

    const estudioData = {
      nombre: String(body.nombre).trim(),
      descripcion: String(body.descripcion).trim(),
      ubicacion: String(body.ubicacion).trim(),
      telefono: String(body.telefono).trim(),
      email: String(body.email).trim(),
      web: String(body.web).trim(),
      abogados: Number(body.abogados) || 0,
      especialidades: Array.isArray(body.especialidades) ? body.especialidades : [],
      imagen: String(body.imagen).trim(),
      logo: String(body.logo).trim(),
      orden: Number(body.orden) || 0,
      activo: Boolean(body.activo),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabaseAdmin
      .from('estudios_juridicos')
      .update(estudioData)
      .eq('id', body.id)
      .select('*')
      .single()

    if (error) {
      console.error('Error actualizando estudio jurídico:', error)
      return NextResponse.json({ success: false, error: getErrorMessage(error, 'Error actualizando el estudio jurídico') }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: data as EstudioJuridico })
  } catch (error) {
    console.error('Error en PUT /api/admin/estudios:', error)
    return NextResponse.json({ success: false, error: getErrorMessage(error, 'Error interno del servidor') }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseClient()
    const body = await request.json()

    if (!body?.id) {
      return NextResponse.json({ success: false, error: 'Falta el id del estudio jurídico' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('estudios_juridicos')
      .delete()
      .eq('id', body.id)

    if (error) {
      console.error('Error eliminando estudio jurídico:', error)
      return NextResponse.json({ success: false, error: getErrorMessage(error, 'Error eliminando el estudio jurídico') }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error en DELETE /api/admin/estudios:', error)
    return NextResponse.json({ success: false, error: getErrorMessage(error, 'Error interno del servidor') }, { status: 500 })
  }
}
