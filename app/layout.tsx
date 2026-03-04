import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Abogados del Ecuador - Directorio de Profesionales del Derecho",
  description:
    "Directorio informativo de profesionales del derecho en Ecuador. Un espacio de encuentro entre personas que buscan asesoria legal y abogados.",
}

export const viewport: Viewport = {
  themeColor: "#0f1419",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[#0f1419] font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
