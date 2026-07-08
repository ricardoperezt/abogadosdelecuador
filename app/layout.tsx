import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import {
  OrganizationStructuredData,
  WebSiteStructuredData,
  LegalServiceStructuredData,
} from "@/components/StructuredData"
import GoogleAnalytics from "@/components/GoogleAnalytics"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://abogadosdelecuador.com"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Abogados del Ecuador - Directorio de Profesionales del Derecho",
    template: "%s | Abogados del Ecuador",
  },
  description:
    "Directorio informativo de profesionales del derecho en Ecuador. Un espacio de encuentro entre personas que buscan asesoría legal y abogados.",
  keywords: [
    "abogados Ecuador",
    "directorio de abogados",
    "abogados Quito",
    "abogados Guayaquil",
    "asesoría legal Ecuador",
    "derecho Ecuador",
    "abogados penalistas Ecuador",
    "abogados laboralistas Ecuador",
  ],
  authors: [{ name: "Abogados del Ecuador" }],
  creator: "Abogados del Ecuador",
  publisher: "Abogados del Ecuador",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: BASE_URL,
    siteName: "Abogados del Ecuador",
    title: "Abogados del Ecuador - Directorio de Profesionales del Derecho",
    description:
      "Directorio informativo de profesionales del derecho en Ecuador. Un espacio de encuentro entre personas que buscan asesoría legal y abogados.",
    images: [
      {
        url: "/logo-cicero.png",
        width: 512,
        height: 512,
        alt: "Abogados del Ecuador",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "legal",
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
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
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#0f1419] font-sans antialiased">
        <OrganizationStructuredData />
        <WebSiteStructuredData />
        <LegalServiceStructuredData />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
