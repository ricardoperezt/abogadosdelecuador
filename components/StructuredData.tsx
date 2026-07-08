const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://abogadosdelecuador.com'

export function OrganizationStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Abogados del Ecuador',
    description:
      'Directorio informativo de profesionales del derecho en Ecuador. Un espacio de encuentro entre personas que buscan asesoría legal y abogados.',
    url: BASE_URL,
    logo: `${BASE_URL}/logo-cicero.png`,
    email: 'info@abogadosdelecuador.com',
    areaServed: 'EC',
    knowsAbout: 'Derecho, Abogados, Asesoría legal, Directorio jurídico',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function WebSiteStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Abogados del Ecuador',
    description:
      'Directorio informativo de profesionales del derecho en Ecuador.',
    url: BASE_URL,
    inLanguage: 'es-EC',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function LegalServiceStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Abogados del Ecuador',
    description:
      'Directorio informativo de profesionales del derecho en Ecuador.',
    url: BASE_URL,
    image: `${BASE_URL}/logo-cicero.png`,
    email: 'info@abogadosdelecuador.com',
    areaServed: {
      '@type': 'Country',
      name: 'Ecuador',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EC',
    },
    openingHours: 'Mo-Fr 08:00-18:00',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
