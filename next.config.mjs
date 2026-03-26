import { fileURLToPath } from 'url'
/** @type {import('next').NextConfig} */
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Configuración para Turbopack - reducir consumo de CPU
  turbopack: {
    root: __dirname,
  },
  // Optimizaciones para Next.js 16
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Paquetes externos para servidor
  serverExternalPackages: ['@supabase/supabase-js'],
  // Reducir consumo de recursos en desarrollo
  devIndicators: {
    buildActivity: false,
  },
}

export default nextConfig
