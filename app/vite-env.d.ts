/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY: string
  // más variables de entorno aquí...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
