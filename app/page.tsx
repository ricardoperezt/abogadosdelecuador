import type { Metadata } from "next"
import HomeClient from "@/components/HomeClient"

export const metadata: Metadata = {
  title: "Abogados del Ecuador - Directorio de Profesionales del Derecho",
  description:
    "Directorio informativo de profesionales del derecho en Ecuador. Encuentra abogados por especialidad: derecho penal, laboral, administrativo, civil, familiar y más.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abogados del Ecuador - Directorio de Profesionales del Derecho",
    description:
      "Directorio informativo de profesionales del derecho en Ecuador. Encuentra abogados por especialidad.",
    type: "website",
  },
}

export default function Home() {
  return <HomeClient />
}
