'use client'

/// <reference path="../../types/react.d.ts" />

import { AlertCircle } from 'lucide-react'

export default function DirectorioFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold mb-2">Directorio no disponible</h2>
      <p className="text-muted-foreground text-center max-w-md">
        No se pudo cargar el directorio de abogados en este momento. Por favor, intente nuevamente más tarde.
      </p>
    </div>
  )
}
